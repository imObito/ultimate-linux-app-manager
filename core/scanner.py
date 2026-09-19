import os
import subprocess
from typing import List, Dict, Any, Optional

def parse_desktop_file(filepath: str) -> Optional[Dict[str, Any]]:
    if not os.path.exists(filepath):
        return None
    try:
        data = {}
        in_desktop_entry = False
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith('#'):
                    continue
                if line.startswith('[') and line.endswith(']'):
                    sec_name = line[1:-1].strip().lower()
                    in_desktop_entry = (sec_name == 'desktop entry')
                    continue
                if in_desktop_entry and '=' in line:
                    k, v = line.split('=', 1)
                    # Don't overwrite if primary English key is already present
                    k_clean = k.strip().lower()
                    if k_clean not in data:
                        data[k_clean] = v.strip()
                    
        app_type = data.get('type', 'Application')
        if app_type.lower() != 'application':
            return None
            
        filename = os.path.basename(filepath)
        app_id = filename.replace('.desktop', '')
        
        name = data.get('name', app_id)
        generic_name = data.get('genericname', '')
        comment = data.get('comment', '')
        exec_cmd = data.get('exec', '')
        icon = data.get('icon', 'application-x-executable')
        categories_raw = data.get('categories', '')
        categories = [c.strip() for c in categories_raw.split(';') if c.strip()]
        
        # Classification
        fn_lower = filename.lower()
        is_pwa = (
            fn_lower.startswith('chrome-') or 
            fn_lower.startswith('brave-') or 
            fn_lower.startswith('msedge-') or 
            '--app-id=' in exec_cmd or 
            '--app=' in exec_cmd or 
            'webapps' in filepath.lower()
        )
        is_flatpak = 'flatpak' in filepath.lower() or '/var/lib/flatpak' in filepath.lower()
        is_appimage = '.appimage' in exec_cmd.lower() or 'appimage' in filepath.lower()
        is_wine = 'wine' in filepath.lower() or 'wine-extension' in filepath.lower()
        
        source = 'native'
        category_label = 'Utilities'
        
        # Standard XDG main category resolution
        cat_map = {
            'AudioVideo': 'Multimedia',
            'Audio': 'Multimedia',
            'Video': 'Multimedia',
            'Player': 'Multimedia',
            'Midi': 'Multimedia',
            'Network': 'Internet',
            'WebBrowser': 'Internet',
            'Email': 'Internet',
            'Chat': 'Internet',
            'Development': 'Development',
            'IDE': 'Development',
            'Building': 'Development',
            'Debugger': 'Development',
            'Office': 'Office',
            'WordProcessor': 'Office',
            'Spreadsheet': 'Office',
            'Graphics': 'Graphics',
            '2DGraphics': 'Graphics',
            'RasterGraphics': 'Graphics',
            'VectorGraphics': 'Graphics',
            'Game': 'Games',
            'ActionGame': 'Games',
            'Emulator': 'Games',
            'System': 'System',
            'Settings': 'Settings',
            'Utility': 'Utilities',
            'Help': 'Help & Documentation'
        }
        
        for c in categories:
            if c in cat_map:
                category_label = cat_map[c]
                break
                
        if is_pwa:
            source = 'webapp'
            category_label = 'Web Application'
        elif is_flatpak:
            source = 'flatpak'
        elif is_appimage:
            source = 'appimage'
        elif is_wine:
            source = 'wine'
            category_label = 'Wine / Windows'
            
        return {
            'id': app_id,
            'name': name,
            'genericName': generic_name,
            'comment': comment,
            'exec': exec_cmd,
            'icon': icon,
            'category': category_label,
            'categories': categories,
            'source': source,
            'desktopFile': filepath,
            'isUser': filepath.startswith(os.path.expanduser('~'))
        }
    except Exception as e:
        return None

def scan_all_desktop_apps() -> List[Dict[str, Any]]:
    search_dirs = [
        os.path.expanduser('~/.local/share/applications'),
        '/usr/share/applications',
        '/usr/local/share/applications',
        '/var/lib/flatpak/exports/share/applications',
        os.path.expanduser('~/.local/share/flatpak/exports/share/applications'),
        '/var/lib/snapd/desktop/applications',
        '/opt'
    ]
    
    seen_ids = set()
    apps = []
    
    for sdir in search_dirs:
        if not os.path.exists(sdir):
            continue
        try:
            for root, dirs, files in os.walk(sdir):
                for item in files:
                    if item.endswith('.desktop'):
                        if 'wine-extension-' in item or 'mimeinfo.cache' in item:
                            continue
                        full_path = os.path.join(root, item)
                        parsed = parse_desktop_file(full_path)
                        if parsed and parsed['id'] not in seen_ids:
                            seen_ids.add(parsed['id'])
                            apps.append(parsed)
        except Exception:
            pass
            
    return apps

def scan_pacman_packages() -> List[Dict[str, Any]]:
    try:
        res = subprocess.run(['pacman', '-Qi'], capture_output=True, text=True, errors='replace')
        if res.returncode != 0:
            return []
            
        blocks = res.stdout.strip().split('\n\n')
        packages = []
        
        for block in blocks:
            lines = block.split('\n')
            pkg = {}
            for line in lines:
                if ' : ' in line:
                    key, val = line.split(' : ', 1)
                    pkg[key.strip()] = val.strip()
            
            pkg_name = pkg.get('Name')
            if not pkg_name:
                continue
                
            version = pkg.get('Version', '')
            desc = pkg.get('Description', '')
            size_str = pkg.get('Installed Size', '0 B')
            reason = pkg.get('Install Reason', '')
            url = pkg.get('URL', '')
            required_by_raw = pkg.get('Required By', 'None')
            req_by = [r.strip() for r in required_by_raw.split() if r.strip() and r.strip() != 'None']
            depends_raw = pkg.get('Depends On', 'None')
            depends = [d.strip() for d in depends_raw.split() if d.strip() and d.strip() != 'None']
            
            is_explicit = 'Explicitly installed' in reason
            
            packages.append({
                'id': pkg_name,
                'name': pkg_name,
                'version': version,
                'description': desc,
                'sizeFormatted': size_str,
                'url': url,
                'source': 'pacman',
                'category': 'Package' if not is_explicit else 'Explicit Package',
                'isExplicit': is_explicit,
                'depends': depends,
                'requiredBy': req_by,
                'isOrphan': not req_by and not is_explicit
            })
            
        return packages
    except Exception as e:
        print("Pacman scan error:", e)
        return []

def scan_flatpak_apps() -> List[Dict[str, Any]]:
    try:
        res = subprocess.run(
            ['flatpak', 'list', '--app', '--columns=application,name,version,size,origin,installation'],
            capture_output=True, text=True, errors='replace'
        )
        if res.returncode != 0:
            return []
            
        apps = []
        for line in res.stdout.strip().split('\n'):
            if not line.strip():
                continue
            parts = line.split('\t')
            if len(parts) >= 3:
                app_id = parts[0].strip()
                name = parts[1].strip() or app_id
                version = parts[2].strip() or 'Latest'
                size = parts[3].strip() if len(parts) > 3 else 'Unknown'
                origin = parts[4].strip() if len(parts) > 4 else 'flathub'
                inst = parts[5].strip() if len(parts) > 5 else 'system'
                
                apps.append({
                    'id': app_id,
                    'name': name,
                    'version': version,
                    'sizeFormatted': size,
                    'source': 'flatpak',
                    'category': 'Flatpak App',
                    'origin': origin,
                    'installation': inst,
                    'description': f'Flatpak application from {origin}',
                    'isUser': inst == 'user'
                })
        return apps
    except Exception as e:
        print("Flatpak scan error:", e)
        return []
