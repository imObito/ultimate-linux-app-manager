// Mock Dataset for Safe Development & Real Testing

export interface AppPackage {
  id: string;
  name: string;
  source: 'pacman' | 'flatpak' | 'appimage';
  category: string;
  version: string;
  sizeBytes: number;
  sizeFormatted: string;
  isUserApp: boolean;
  isSystemProtected: boolean;
  isOrphan: boolean;
  description: string;
  execPath: string;
  dependencies: string[];
  reverseDependencies: string[];
  residuals: {
    type: 'config' | 'cache' | 'data' | 'systemd';
    path: string;
    sizeFormatted: string;
    confidence: 'VERIFIED' | 'DETECTED' | 'POSSIBLE';
  }[];
}

export const MOCK_APPS: AppPackage[] = [
  {
    id: 'firefox',
    name: 'Firefox',
    source: 'pacman',
    category: 'Internet',
    version: '128.0.3-1',
    sizeBytes: 245 * 1024 * 1024,
    sizeFormatted: '245 MB',
    isUserApp: true,
    isSystemProtected: false,
    isOrphan: false,
    description: 'Fast, Private & Safe Web Browser',
    execPath: '/usr/bin/firefox',
    dependencies: ['gtk3', 'nss', 'libpulse', 'ffmpeg'],
    reverseDependencies: [],
    residuals: [
      { type: 'config', path: '~/.mozilla/firefox', sizeFormatted: '18 MB', confidence: 'VERIFIED' },
      { type: 'cache', path: '~/.cache/mozilla/firefox', sizeFormatted: '142 MB', confidence: 'VERIFIED' },
      { type: 'data', path: '~/.local/share/applications/firefox.desktop', sizeFormatted: '4 KB', confidence: 'VERIFIED' }
    ]
  },
  {
    id: 'visual-studio-code-bin',
    name: 'Visual Studio Code',
    source: 'pacman',
    category: 'Development',
    version: '1.92.2-1',
    sizeBytes: 380 * 1024 * 1024,
    sizeFormatted: '380 MB',
    isUserApp: true,
    isSystemProtected: false,
    isOrphan: false,
    description: 'Code editing. Redefined.',
    execPath: '/usr/bin/code',
    dependencies: ['electron', 'libxkbfile', 'gnome-keyring'],
    reverseDependencies: [],
    residuals: [
      { type: 'config', path: '~/.config/Code', sizeFormatted: '34 MB', confidence: 'VERIFIED' },
      { type: 'cache', path: '~/.cache/vscode-cache', sizeFormatted: '512 MB', confidence: 'DETECTED' },
      { type: 'data', path: '~/.vscode/extensions', sizeFormatted: '1.4 GB', confidence: 'POSSIBLE' }
    ]
  },
  {
    id: 'vlc',
    name: 'VLC Media Player',
    source: 'pacman',
    category: 'Multimedia',
    version: '3.0.21-2',
    sizeBytes: 112 * 1024 * 1024,
    sizeFormatted: '112 MB',
    isUserApp: true,
    isSystemProtected: false,
    isOrphan: false,
    description: 'Multi-platform MPEG, VCD/DVD, and DivX player',
    execPath: '/usr/bin/vlc',
    dependencies: ['qt5-base', 'ffmpeg', 'liba52', 'libmad'],
    reverseDependencies: [],
    residuals: [
      { type: 'config', path: '~/.config/vlc', sizeFormatted: '2.1 MB', confidence: 'VERIFIED' },
      { type: 'cache', path: '~/.cache/vlc', sizeFormatted: '12 MB', confidence: 'VERIFIED' }
    ]
  },
  {
    id: 'com.discordapp.Discord',
    name: 'Discord',
    source: 'flatpak',
    category: 'Communication',
    version: '0.0.60',
    sizeBytes: 280 * 1024 * 1024,
    sizeFormatted: '280 MB',
    isUserApp: true,
    isSystemProtected: false,
    isOrphan: false,
    description: 'All-in-one voice and text chat for gamers',
    execPath: '/var/lib/flatpak/exports/bin/com.discordapp.Discord',
    dependencies: ['org.freedesktop.Platform//23.08'],
    reverseDependencies: [],
    residuals: [
      { type: 'config', path: '~/.var/app/com.discordapp.Discord/config/discord', sizeFormatted: '45 MB', confidence: 'VERIFIED' },
      { type: 'cache', path: '~/.var/app/com.discordapp.Discord/cache', sizeFormatted: '230 MB', confidence: 'VERIFIED' }
    ]
  },
  {
    id: 'com.valvesoftware.Steam',
    name: 'Steam',
    source: 'flatpak',
    category: 'Games',
    version: '1.0.0.79',
    sizeBytes: 850 * 1024 * 1024,
    sizeFormatted: '850 MB',
    isUserApp: true,
    isSystemProtected: false,
    isOrphan: false,
    description: 'Launcher for the Steam software distribution service',
    execPath: '/var/lib/flatpak/exports/bin/com.valvesoftware.Steam',
    dependencies: ['org.freedesktop.Platform//23.08', 'org.freedesktop.Platform.Compat.i386//23.08'],
    reverseDependencies: [],
    residuals: [
      { type: 'data', path: '~/.var/app/com.valvesoftware.Steam/data/Steam', sizeFormatted: '14.2 GB', confidence: 'VERIFIED' },
      { type: 'config', path: '~/.var/app/com.valvesoftware.Steam/config', sizeFormatted: '5.4 MB', confidence: 'VERIFIED' }
    ]
  },
  {
    id: 'org.libreoffice.LibreOffice',
    name: 'LibreOffice',
    source: 'flatpak',
    category: 'Office',
    version: '24.2.5.2',
    sizeBytes: 620 * 1024 * 1024,
    sizeFormatted: '620 MB',
    isUserApp: true,
    isSystemProtected: false,
    isOrphan: false,
    description: 'Productivity suite compatible with Microsoft Office',
    execPath: '/var/lib/flatpak/exports/bin/org.libreoffice.LibreOffice',
    dependencies: ['org.gnome.Platform//46'],
    reverseDependencies: [],
    residuals: [
      { type: 'config', path: '~/.var/app/org.libreoffice.LibreOffice/config/libreoffice', sizeFormatted: '1.8 MB', confidence: 'VERIFIED' }
    ]
  },
  {
    id: 'obs-studio',
    name: 'OBS Studio',
    source: 'pacman',
    category: 'Multimedia',
    version: '30.2.2-1',
    sizeBytes: 95 * 1024 * 1024,
    sizeFormatted: '95 MB',
    isUserApp: true,
    isSystemProtected: false,
    isOrphan: false,
    description: 'Free and open source software for video recording and live streaming',
    execPath: '/usr/bin/obs',
    dependencies: ['ffmpeg', 'qt6-base', 'pipewire', 'libxcomposite'],
    reverseDependencies: [],
    residuals: [
      { type: 'config', path: '~/.config/obs-studio', sizeFormatted: '14 MB', confidence: 'VERIFIED' }
    ]
  },
  {
    id: 'kicad',
    name: 'KiCad EDA',
    source: 'pacman',
    category: 'Development',
    version: '8.0.4-1',
    sizeBytes: 1200 * 1024 * 1024,
    sizeFormatted: '1.2 GB',
    isUserApp: true,
    isSystemProtected: false,
    isOrphan: false,
    description: 'Electronic schematic and PCB design software',
    execPath: '/usr/bin/kicad',
    dependencies: ['wxwidgets-gtk3', 'python', 'opencascade'],
    reverseDependencies: [],
    residuals: [
      { type: 'config', path: '~/.config/kicad', sizeFormatted: '8.4 MB', confidence: 'VERIFIED' },
      { type: 'cache', path: '~/.cache/kicad', sizeFormatted: '64 MB', confidence: 'DETECTED' }
    ]
  },
  {
    id: 'linux-cachyos',
    name: 'Linux CachyOS Kernel',
    source: 'pacman',
    category: 'System',
    version: '7.2.6-1',
    sizeBytes: 180 * 1024 * 1024,
    sizeFormatted: '180 MB',
    isUserApp: false,
    isSystemProtected: true,
    isOrphan: false,
    description: 'The Linux CachyOS kernel and modules with BORE scheduler',
    execPath: '/boot/vmlinuz-linux-cachyos',
    dependencies: ['coreutils', 'kmod', 'initramfs'],
    reverseDependencies: ['nvidia-cachyos', 'zfs-cachyos'],
    residuals: []
  },
  {
    id: 'glibc',
    name: 'GNU C Library',
    source: 'pacman',
    category: 'System',
    version: '2.39-1',
    sizeBytes: 45 * 1024 * 1024,
    sizeFormatted: '45 MB',
    isUserApp: false,
    isSystemProtected: true,
    isOrphan: false,
    description: 'Core GNU C libraries for the entire operating system',
    execPath: '/usr/lib/libc.so.6',
    dependencies: ['linux-api-headers', 'tzdata', 'filesystem'],
    reverseDependencies: ['bash', 'systemd', 'coreutils', 'pacman', 'firefox', 'vlc'],
    residuals: []
  },
  {
    id: 'systemd',
    name: 'systemd init & service manager',
    source: 'pacman',
    category: 'System',
    version: '256.4-1',
    sizeBytes: 32 * 1024 * 1024,
    sizeFormatted: '32 MB',
    isUserApp: false,
    isSystemProtected: true,
    isOrphan: false,
    description: 'System and Service Manager',
    execPath: '/usr/lib/systemd/systemd',
    dependencies: ['glibc', 'libcap', 'util-linux', 'shadow'],
    reverseDependencies: ['polkit', 'dbus', 'pipewire'],
    residuals: []
  },
  {
    id: 'gimp',
    name: 'GIMP',
    source: 'appimage',
    category: 'Graphics',
    version: '2.10.38',
    sizeBytes: 240 * 1024 * 1024,
    sizeFormatted: '240 MB',
    isUserApp: true,
    isSystemProtected: false,
    isOrphan: false,
    description: 'GNU Image Manipulation Program Standalone',
    execPath: '~/Applications/GIMP-2.10.38-x86_64.AppImage',
    dependencies: [],
    reverseDependencies: [],
    residuals: [
      { type: 'config', path: '~/.config/GIMP/2.10', sizeFormatted: '28 MB', confidence: 'VERIFIED' },
      { type: 'cache', path: '~/.cache/gimp', sizeFormatted: '45 MB', confidence: 'VERIFIED' }
    ]
  }
];
