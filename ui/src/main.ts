import { MOCK_APPS, AppPackage } from './state/mockData';
import { ICONS } from './design/icons';
import { getAppIconSvg } from './design/appIcons';

class UltimateAppManager {
  private apps: AppPackage[] = [];
  private selectedApp: AppPackage | null = null;
  private contextMenuApp: AppPackage | null = null;
  private currentFilter: string = 'ALL';
  private searchQuery: string = '';
  private currentTab: string = 'applications';
  private currentTheme: string = 'theme-obsidian';

  constructor() {
    this.apps = [...MOCK_APPS];
    this.loadPersistedSettings();
    this.initTopNavigation();
    this.initQuickTip();
    this.initSidebarNavigation();
    this.initThemeSelector();
    this.initCleanupActions();
    this.initContextMenu();
    this.initEventListeners();
    this.render();
  }

  private loadPersistedSettings() {
    const savedTheme = localStorage.getItem('uam_theme') || 'theme-obsidian';
    this.setTheme(savedTheme);

    const tipDismissed = localStorage.getItem('uam_tip_dismissed');
    if (tipDismissed === 'true') {
      const banner = document.getElementById('quick-tip-banner');
      if (banner) banner.style.display = 'none';
    }
  }

  private setTheme(themeName: string) {
    this.currentTheme = themeName;
    document.body.className = `${themeName} text-gray-100 flex flex-col h-screen w-screen overflow-hidden antialiased relative`;
    localStorage.setItem('uam_theme', themeName);

    document.querySelectorAll('.theme-card').forEach(card => {
      const cardTheme = card.getAttribute('data-theme');
      const badge = card.querySelector('span:last-child');
      if (cardTheme === themeName) {
        card.className = "theme-card p-4 rounded-xl border border-amber-500/50 bg-white/[0.05] cursor-pointer transition-all hover:scale-[1.02] flex flex-col gap-2.5";
        if (badge) {
          badge.textContent = "Active";
          badge.className = "text-amber-400 font-bold";
        }
      } else {
        card.className = "theme-card p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer transition-all hover:scale-[1.02] flex flex-col gap-2.5";
        if (badge) {
          badge.textContent = "Select";
          badge.className = "text-slate-500 text-[10px]";
        }
      }
    });
  }

  private initTopNavigation() {
    const tabs = document.querySelectorAll('.top-nav-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        if (!targetTab) return;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        this.switchTab(targetTab);
      });
    });
  }

  private switchTab(tabId: string) {
    this.currentTab = tabId;

    const views = ['applications', 'cleanup', 'settings', 'about'];
    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) {
        if (v === tabId) {
          el.classList.remove('hidden');
          if (v === 'applications') {
            el.classList.add('flex');
          } else {
            el.classList.add('block');
          }
        } else {
          el.classList.add('hidden');
          el.classList.remove('flex', 'block');
        }
      }
    });
  }

  private initQuickTip() {
    const btnDismiss = document.getElementById('btn-dismiss-tip');
    const banner = document.getElementById('quick-tip-banner');

    btnDismiss?.addEventListener('click', () => {
      if (banner) {
        banner.style.opacity = '0';
        banner.style.transition = 'opacity 0.2s ease';
        setTimeout(() => {
          banner.style.display = 'none';
        }, 200);
      }
      localStorage.setItem('uam_tip_dismissed', 'true');
    });
  }

  private initThemeSelector() {
    document.querySelectorAll('.theme-card').forEach(card => {
      card.addEventListener('click', () => {
        const theme = card.getAttribute('data-theme');
        if (theme) {
          this.setTheme(theme);
        }
      });
    });
  }

  private initCleanupActions() {
    document.getElementById('btn-run-full-clean')?.addEventListener('click', () => {
      const btn = document.getElementById('btn-run-full-clean') as HTMLButtonElement;
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>⚡ Optimizing Caches & Orphans...</span>';
        
        setTimeout(() => {
          btn.innerHTML = '<span>✅ System Cleaned (2.27 GB Freed)</span>';
          btn.className = "px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all";
          
          setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = '⚡ 1-Click Optimize System';
            btn.className = "px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg shadow-amber-500/25 transition-all";
          }, 4000);
        }, 1200);
      }
    });
  }

  private initSidebarNavigation() {
    const categoriesContainer = document.getElementById('nav-categories-container');
    const sourcesContainer = document.getElementById('nav-sources-container');

    const categories = [
      { id: 'ALL', label: 'All Software', icon: ICONS.all },
      { id: 'DESKTOP', label: 'Desktop Apps', icon: ICONS.desktop },
      { id: 'WEBAPP', label: 'WebApps & PWAs', icon: ICONS.webapp },
      { id: 'CAT_INTERNET', label: 'Internet & Web', icon: ICONS.internet },
      { id: 'CAT_MULTIMEDIA', label: 'Multimedia & Audio', icon: ICONS.multimedia },
      { id: 'CAT_DEV', label: 'Development Tools', icon: ICONS.dev },
      { id: 'CAT_GAMES', label: 'Games & Emulators', icon: ICONS.games },
      { id: 'CAT_OFFICE', label: 'Office & Productivity', icon: ICONS.office },
    ];

    const sources = [
      { id: 'PACMAN', label: 'Pacman Native', icon: ICONS.pacman },
      { id: 'FLATPAK', label: 'Flatpak Sandbox', icon: ICONS.flatpak },
      { id: 'APPIMAGE', label: 'AppImages', icon: ICONS.appimage },
      { id: 'WINE', label: 'Windows / Wine', icon: ICONS.wine },
    ];

    if (categoriesContainer) {
      categoriesContainer.innerHTML = categories.map(cat => `
        <button data-filter="${cat.id}" class="nav-btn flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all ${cat.id === 'ALL' ? 'bg-amber-500/15 text-amber-400 font-semibold shadow-sm border border-amber-500/25' : ''}">
          <div class="flex items-center gap-2.5">
            <span class="opacity-80">${cat.icon}</span>
            <span>${cat.label}</span>
          </div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-500" id="badge-${cat.id}">0</span>
        </button>
      `).join('');
    }

    if (sourcesContainer) {
      sourcesContainer.innerHTML = sources.map(src => `
        <button data-filter="${src.id}" class="nav-btn flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all">
          <div class="flex items-center gap-2.5">
            <span class="opacity-80">${src.icon}</span>
            <span>${src.label}</span>
          </div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-500" id="badge-${src.id}">0</span>
        </button>
      `).join('');
    }

    // Attach click events
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => {
          b.classList.remove('bg-amber-500/15', 'text-amber-400', 'font-semibold', 'shadow-sm', 'border', 'border-amber-500/25');
          b.classList.add('text-slate-400');
        });
        btn.classList.add('bg-amber-500/15', 'text-amber-400', 'font-semibold', 'shadow-sm', 'border', 'border-amber-500/25');
        btn.classList.remove('text-slate-400');

        this.currentFilter = btn.getAttribute('data-filter') || 'ALL';
        this.renderDeck();
      });
    });
  }

  private initEventListeners() {
    const searchInput = document.getElementById('global-search-input') as HTMLInputElement;
    const spotlightOverlay = document.getElementById('spotlight-dim-overlay');

    searchInput?.addEventListener('focus', () => {
      spotlightOverlay?.classList.add('active');
    });

    searchInput?.addEventListener('blur', () => {
      spotlightOverlay?.classList.remove('active');
    });

    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = (e.target as HTMLInputElement).value.trim().toLowerCase();
      this.renderDeck();
    });

    spotlightOverlay?.addEventListener('click', () => {
      searchInput?.blur();
      spotlightOverlay.classList.remove('active');
    });

    const btnCloseSheet = document.getElementById('btn-close-sheet');
    const inspectorSheet = document.getElementById('inspector-sheet');

    btnCloseSheet?.addEventListener('click', () => {
      inspectorSheet?.classList.toggle('hidden');
    });

    document.getElementById('btn-refresh')?.addEventListener('click', () => {
      this.render();
    });

    document.getElementById('btn-add-app')?.addEventListener('click', () => {
      const name = prompt('Enter custom application or binary name to register:');
      if (name) {
        this.apps.unshift({
          id: name.toLowerCase().replace(/\s+/g, '-'),
          name: name,
          version: '1.0.0-custom',
          description: 'Manually registered Linux application executable',
          sizeBytes: 450 * 1024 * 1024,
          sizeFormatted: '450.0 MB',
          category: 'Games & Emulators',
          source: 'appimage',
          isSystemProtected: false,
          isUserApp: true,
          isOrphan: false,
          dependencies: [],
          reverseDependencies: [],
          execPath: `/usr/local/bin/${name.toLowerCase().replace(/\s+/g, '-')}`,
          residuals: [
            { path: `~/.config/${name.toLowerCase()}`, type: 'config', sizeFormatted: '1.0 MB', confidence: 'VERIFIED' }
          ]
        });
        this.render();
      }
    });

    document.getElementById('btn-scan-folder')?.addEventListener('click', () => {
      alert(`Scanned system directories:\n• /usr/share/applications\n• ~/.local/share/applications\n• /var/lib/flatpak/exports\n\nFound all ${this.apps.length} applications.`);
    });

    // Global Hotkeys
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'k' || e.key.toLowerCase() === 'f')) {
        e.preventDefault();
        searchInput?.focus();
        spotlightOverlay?.classList.add('active');
      }
      if (e.key === 'Escape') {
        searchInput?.blur();
        spotlightOverlay?.classList.remove('active');
        this.closeModal();
      }
    });

    document.getElementById('btn-close-modal')?.addEventListener('click', () => this.closeModal());
    document.getElementById('btn-modal-cancel')?.addEventListener('click', () => this.closeModal());
    document.getElementById('btn-modal-confirm')?.addEventListener('click', () => this.executeUninstall());
  }

  private initContextMenu() {
    // Action: Launch Application
    document.getElementById('ctx-action-launch')?.addEventListener('click', () => {
      if (this.contextMenuApp) {
        this.showToast(`Launching ${this.contextMenuApp.name}...`, '🚀');
      }
      this.closeContextMenu();
    });

    // Action: Open Location
    document.getElementById('ctx-action-location')?.addEventListener('click', () => {
      if (this.contextMenuApp) {
        const path = this.contextMenuApp.execPath || `/usr/share/applications/${this.contextMenuApp.id}.desktop`;
        this.showToast(`Binary Location: ${path}`, '📂');
      }
      this.closeContextMenu();
    });

    // Action: Inspect & About Details
    document.getElementById('ctx-action-inspect')?.addEventListener('click', () => {
      if (this.contextMenuApp) {
        this.selectApp(this.contextMenuApp);
        const sheet = document.getElementById('inspector-sheet');
        if (sheet) sheet.classList.remove('hidden');
        this.showToast(`Viewing forensic telemetry for ${this.contextMenuApp.name}`, 'ℹ️');
      }
      this.closeContextMenu();
    });

    // Action: Copy Executable Path
    document.getElementById('ctx-action-copy-path')?.addEventListener('click', () => {
      if (this.contextMenuApp) {
        const path = this.contextMenuApp.execPath || `/usr/bin/${this.contextMenuApp.id}`;
        navigator.clipboard?.writeText(path);
        this.showToast(`Copied executable path!`, '📋');
      }
      this.closeContextMenu();
    });

    // Action: Copy Package ID
    document.getElementById('ctx-action-copy-id')?.addEventListener('click', () => {
      if (this.contextMenuApp) {
        navigator.clipboard?.writeText(this.contextMenuApp.id);
        this.showToast(`Copied ID: ${this.contextMenuApp.id}`, '📋');
      }
      this.closeContextMenu();
    });

    // Action: Clean Residual Cache
    document.getElementById('ctx-action-clean-cache')?.addEventListener('click', () => {
      if (this.contextMenuApp) {
        const appName = this.contextMenuApp.name;
        this.showToast(`Cleaned residual cache for ${appName}!`, '✨');
      }
      this.closeContextMenu();
    });

    // Action: Uninstall
    document.getElementById('ctx-action-uninstall')?.addEventListener('click', () => {
      if (this.contextMenuApp) {
        this.openUninstallModal(this.contextMenuApp);
      }
      this.closeContextMenu();
    });

    // Global listener to close context menu when clicking outside or resizing/scrolling
    window.addEventListener('click', (e) => {
      const menu = document.getElementById('app-context-menu');
      if (menu && !menu.contains(e.target as Node)) {
        this.closeContextMenu();
      }
    });

    window.addEventListener('scroll', () => this.closeContextMenu(), true);
    window.addEventListener('resize', () => this.closeContextMenu());
  }

  private openContextMenu(e: MouseEvent, app: AppPackage) {
    this.contextMenuApp = app;
    const menu = document.getElementById('app-context-menu');
    if (!menu) return;

    const nameEl = document.getElementById('ctx-app-name');
    const sourceEl = document.getElementById('ctx-app-source');
    const iconEl = document.getElementById('ctx-app-icon');

    if (nameEl) nameEl.innerText = app.name;
    if (sourceEl) sourceEl.innerText = (app.source || 'native').toUpperCase();
    if (iconEl) iconEl.innerHTML = getAppIconSvg(app.id, app.name, app.category);

    menu.classList.remove('hidden');

    const menuWidth = 240;
    const menuHeight = 290;
    let x = e.clientX;
    let y = e.clientY;

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 12;
    }
    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 12;
    }

    menu.style.left = `${Math.max(10, x)}px`;
    menu.style.top = `${Math.max(10, y)}px`;
  }

  private closeContextMenu() {
    const menu = document.getElementById('app-context-menu');
    if (menu) menu.classList.add('hidden');
  }

  private showToast(message: string, icon: string = 'ℹ️') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = "flex items-center gap-2.5 px-4 py-2.5 bg-obsidian-900/95 backdrop-blur-2xl border border-white/[0.14] rounded-xl shadow-2xl text-xs text-white animate-fade-in pointer-events-auto transition-all duration-300";
    toast.innerHTML = `<span class="text-sm shrink-0">${icon}</span><span class="font-medium truncate max-w-[280px]">${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(6px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  private getFilteredApps(): AppPackage[] {
    let list = this.apps.filter(app => {
      const src = (app.source || '').toUpperCase();
      const cat = (app.category || '').toLowerCase();
      const name = (app.name || '').toLowerCase();
      const id = (app.id || '').toLowerCase();

      if (this.currentFilter !== 'ALL') {
        if (this.currentFilter === 'DESKTOP' && src !== 'PACMAN' && src !== 'NATIVE' && !app.isUserApp) return false;
        if (this.currentFilter === 'WEBAPP' && src !== 'WEBAPP' && !cat.includes('web') && !id.includes('chrome') && !id.includes('brave')) return false;
        if (this.currentFilter === 'FLATPAK' && src !== 'FLATPAK') return false;
        if (this.currentFilter === 'APPIMAGE' && src !== 'APPIMAGE') return false;
        if (this.currentFilter === 'WINE' && src !== 'WINE' && !cat.includes('wine')) return false;
        if (this.currentFilter === 'PACMAN' && src !== 'PACMAN' && src !== 'NATIVE') return false;
        if (this.currentFilter === 'CAT_INTERNET' && !cat.includes('internet') && !cat.includes('network') && !cat.includes('web')) return false;
        if (this.currentFilter === 'CAT_MULTIMEDIA' && !cat.includes('multimedia') && !cat.includes('audio') && !cat.includes('video') && !cat.includes('graphics')) return false;
        if (this.currentFilter === 'CAT_DEV' && !cat.includes('development') && !cat.includes('programming')) return false;
        if (this.currentFilter === 'CAT_GAMES' && !cat.includes('game') && !cat.includes('emulator') && !name.includes('steam') && !name.includes('wine')) return false;
        if (this.currentFilter === 'CAT_OFFICE' && !cat.includes('office') && !cat.includes('document') && !cat.includes('productivity')) return false;
      }

      if (this.searchQuery) {
        const matchesName = name.includes(this.searchQuery);
        const matchesId = id.includes(this.searchQuery);
        const matchesCat = cat.includes(this.searchQuery);
        return matchesName || matchesId || matchesCat;
      }

      return true;
    });

    return list;
  }

  private updateCounts() {
    const counts: Record<string, number> = {
      ALL: this.apps.length,
      DESKTOP: this.apps.filter(a => a.source === 'pacman' || a.source === 'native' || a.isUserApp).length,
      WEBAPP: this.apps.filter(a => a.source === 'webapp' || a.category.toLowerCase().includes('web') || a.id.includes('chrome') || a.id.includes('brave')).length,
      CAT_INTERNET: this.apps.filter(a => a.category.toLowerCase().includes('internet') || a.category.toLowerCase().includes('network')).length,
      CAT_MULTIMEDIA: this.apps.filter(a => a.category.toLowerCase().includes('multimedia') || a.category.toLowerCase().includes('audio') || a.category.toLowerCase().includes('video') || a.category.toLowerCase().includes('graphics')).length,
      CAT_DEV: this.apps.filter(a => a.category.toLowerCase().includes('development') || a.category.toLowerCase().includes('programming')).length,
      CAT_GAMES: this.apps.filter(a => a.category.toLowerCase().includes('game') || a.category.toLowerCase().includes('emulator') || a.name.toLowerCase().includes('steam')).length,
      CAT_OFFICE: this.apps.filter(a => a.category.toLowerCase().includes('office') || a.category.toLowerCase().includes('document')).length,
      PACMAN: this.apps.filter(a => a.source === 'pacman' || a.source === 'native').length,
      FLATPAK: this.apps.filter(a => a.source === 'flatpak').length,
      APPIMAGE: this.apps.filter(a => a.source === 'appimage').length,
      WINE: this.apps.filter(a => a.source === 'wine' || a.category.toLowerCase().includes('wine')).length
    };

    for (const [key, count] of Object.entries(counts)) {
      const el = document.getElementById(`badge-${key}`);
      if (el) el.innerText = count.toString();
    }

    const appsBadge = document.getElementById('tab-apps-badge');
    if (appsBadge) appsBadge.innerText = `${this.apps.length}`;
  }

  private render() {
    this.updateCounts();
    this.renderDeck();
    if (!this.selectedApp && this.apps.length > 0) {
      this.selectApp(this.apps[0]);
    }
  }

  private renderDeck() {
    const emptyState = document.getElementById('empty-state');
    const titleLabel = document.getElementById('deck-view-title');
    const countLabel = document.getElementById('deck-view-count');

    const filtered = this.getFilteredApps();

    if (countLabel) countLabel.innerText = `${filtered.length} applications found`;
    if (titleLabel) titleLabel.innerText = this.currentFilter === 'ALL' ? 'Applications' : this.currentFilter.replace('CAT_', '');

    if (filtered.length === 0) {
      emptyState?.classList.remove('hidden');
      emptyState?.classList.add('flex');
    } else {
      emptyState?.classList.add('hidden');
      emptyState?.classList.remove('flex');
    }

    // Categorize
    const gamingApps = filtered.filter(a => a.category.toLowerCase().includes('game') || a.category.toLowerCase().includes('emulator') || a.name.toLowerCase().includes('steam') || a.id.includes('rpcs3'));
    const flatpakApps = filtered.filter(a => a.source === 'flatpak');
    const webApps = filtered.filter(a => a.source === 'webapp' || a.category.toLowerCase().includes('web') || a.id.includes('chrome-') || a.id.includes('brave-'));
    
    // Remaining Native/System/Desktop
    const nativeApps = filtered.filter(a => !gamingApps.includes(a) && !flatpakApps.includes(a) && !webApps.includes(a));

    // Update section counters
    const countGamingEl = document.getElementById('count-gaming');
    if (countGamingEl) countGamingEl.innerText = `${gamingApps.length}`;

    const countFlatpakEl = document.getElementById('count-flatpak');
    if (countFlatpakEl) countFlatpakEl.innerText = `${flatpakApps.length}`;

    const countNativeEl = document.getElementById('count-native');
    if (countNativeEl) countNativeEl.innerText = `${nativeApps.length}`;

    const countWebappEl = document.getElementById('count-webapp');
    if (countWebappEl) countWebappEl.innerText = `${webApps.length}`;

    // Hide or show sections based on whether they contain items
    const secGaming = document.getElementById('section-gaming');
    const secFlatpak = document.getElementById('section-flatpak');
    const secNative = document.getElementById('section-native');
    const secWebapp = document.getElementById('section-webapp');

    if (secGaming) secGaming.style.display = gamingApps.length > 0 ? 'block' : 'none';
    if (secFlatpak) secFlatpak.style.display = flatpakApps.length > 0 ? 'block' : 'none';
    if (secNative) secNative.style.display = nativeApps.length > 0 ? 'block' : 'none';
    if (secWebapp) secWebapp.style.display = webApps.length > 0 ? 'block' : 'none';

    // Render cards into respective grids
    this.renderGrid('grid-gaming', gamingApps);
    this.renderGrid('grid-flatpak', flatpakApps);
    this.renderGrid('grid-native', nativeApps);
    this.renderGrid('grid-webapp', webApps);
  }

  private renderGrid(gridId: string, apps: AppPackage[]) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = '';

    apps.forEach((app, index) => {
      const card = document.createElement('div');
      const isSelected = this.selectedApp?.id === app.id;
      
      const staggerDelay = Math.min(index * 15, 180);
      card.className = `glass-card p-3.5 cursor-pointer flex flex-col justify-between gap-2.5 animate-card-enter min-h-[140px] overflow-hidden ${isSelected ? 'glass-card-selected' : ''}`;
      card.style.animationDelay = `${staggerDelay}ms`;
      
      const tagClass = `tag-${(app.source || 'native').toLowerCase()}`;
      const iconMarkup = getAppIconSvg(app.id, app.name, app.category);

      card.innerHTML = `
        <div class="flex items-start justify-between gap-2 min-w-0">
          <div class="flex items-center gap-2.5 min-w-0 flex-1">
            <div class="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center p-1.5 shadow-inner shrink-0 backdrop-blur-sm overflow-hidden">
              ${iconMarkup}
            </div>
            <div class="overflow-hidden min-w-0 flex-1">
              <h4 class="text-xs font-bold text-white tracking-tight truncate" title="${app.name}">${app.name}</h4>
              <p class="text-[10px] font-mono text-slate-400 truncate mt-0.5" title="${app.id}">${app.id}</p>
            </div>
          </div>
          <span class="capsule-pill ${tagClass} shrink-0">
            ${app.source}
          </span>
        </div>

        <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-normal overflow-hidden h-7">
          ${app.description || 'Linux application package'}
        </p>

        <div class="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-400 mt-auto">
          <span class="bg-white/[0.04] px-2 py-0.5 rounded-md text-slate-300 font-medium truncate max-w-[130px]">${app.category}</span>
          <span class="font-mono text-slate-400 shrink-0 font-medium">${app.sizeFormatted}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        this.selectApp(app);
      });

      card.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.selectApp(app);
        this.openContextMenu(e, app);
      });

      grid.appendChild(card);
    });
  }

  private selectApp(app: AppPackage) {
    this.selectedApp = app;
    
    // Update Ambient Backdrop Glow container dynamically
    const backdrop = document.getElementById('ambient-backdrop');
    if (backdrop) {
      backdrop.className = `glow-${(app.source || 'native').toLowerCase()}`;
    }

    this.renderDeck();
    this.renderInspector();
  }

  private renderInspector() {
    const body = document.getElementById('inspector-body');
    const uninstallBtn = document.getElementById('btn-action-uninstall') as HTMLButtonElement;
    const btnLabel = document.getElementById('uninstall-btn-label');

    if (!body || !this.selectedApp) return;
    const app = this.selectedApp;

    if (uninstallBtn) {
      uninstallBtn.disabled = app.isSystemProtected;
      uninstallBtn.className = `w-full h-12 btn-uninstall-motion ${app.isSystemProtected ? 'bg-white/[0.04] text-slate-600 border border-white/[0.05]' : 'bg-rose-600 hover:bg-rose-500 text-white'} font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50`;
    }
    if (btnLabel) {
      btnLabel.innerText = app.isSystemProtected ? 'System Protected (Cannot Remove)' : `Uninstall ${app.name}`;
    }

    const iconMarkup = getAppIconSvg(app.id, app.name, app.category);

    const sizeMb = Math.round(app.sizeBytes / (1024 * 1024));
    const sizePercent = Math.min(Math.round((sizeMb / 1200) * 100), 100);
    const depsPercent = Math.min(app.dependencies.length * 15, 100);
    const safetyScore = app.isSystemProtected ? 100 : (app.reverseDependencies.length > 0 ? 55 : 98);

    body.className = "flex-1 overflow-y-auto p-6 space-y-6 animate-inspector-refresh";

    body.innerHTML = `
      <!-- App Header Profile Glass Card -->
      <div class="inspector-glass-card p-5 rounded-2xl space-y-4">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.12] flex items-center justify-center p-2.5 shadow-md shrink-0 overflow-hidden">
            ${iconMarkup}
          </div>
          <div class="overflow-hidden">
            <h3 class="text-lg font-bold text-white tracking-tight truncate">${app.name}</h3>
            <span class="text-xs font-mono text-slate-400">${app.id}</span>
          </div>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">${app.description}</p>
      </div>

      <!-- FORENSIC TELEMETRY GAUGES -->
      <div class="space-y-3">
        <div class="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase px-1">TELEMETRY & FOOTPRINT</div>
        <div class="inspector-glass-card p-4 rounded-xl space-y-3.5">
          <!-- Disk Footprint Bar -->
          <div>
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-slate-400 font-medium">Disk Footprint</span>
              <span class="font-mono text-amber-400 font-bold">${app.sizeFormatted}</span>
            </div>
            <div class="telemetry-bar-bg">
              <div class="telemetry-bar-fill bg-gradient-to-r from-amber-500 to-yellow-400" style="width: ${sizePercent}%"></div>
            </div>
          </div>

          <!-- Dependency Weight Bar -->
          <div>
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-slate-400 font-medium">Dependency Footprint</span>
              <span class="font-mono text-cyan-400 font-bold">${app.dependencies.length} Packages</span>
            </div>
            <div class="telemetry-bar-bg">
              <div class="telemetry-bar-fill bg-gradient-to-r from-blue-500 to-cyan-400" style="width: ${depsPercent}%"></div>
            </div>
          </div>

          <!-- Safety Confidence Metric -->
          <div>
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-slate-400 font-medium">Safety Score</span>
              <span class="font-mono ${app.isSystemProtected ? 'text-rose-400' : 'text-emerald-400'} font-bold">${safetyScore}% Confidence</span>
            </div>
            <div class="telemetry-bar-bg">
              <div class="telemetry-bar-fill ${app.isSystemProtected ? 'bg-rose-500' : 'bg-emerald-400'}" style="width: ${safetyScore}%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Metadata Telemetry Matrix -->
      <div class="space-y-2.5">
        <div class="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase px-1">PACKAGE METRICS</div>
        <div class="inspector-glass-card rounded-xl divide-y divide-white/[0.05] text-xs">
          <div class="flex items-center justify-between p-3"><span class="text-slate-400">Source Provider</span><span class="font-bold text-amber-400 uppercase">${app.source}</span></div>
          <div class="flex items-center justify-between p-3"><span class="text-slate-400">Classification</span><span class="text-slate-200">${app.category}</span></div>
          <div class="flex items-center justify-between p-3"><span class="text-slate-400">Release Version</span><span class="font-mono text-slate-200">${app.version}</span></div>
        </div>
      </div>

      <!-- Executable & System Targets -->
      <div class="space-y-2.5">
        <div class="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase px-1">SYSTEM TARGETS</div>
        <div class="inspector-glass-card p-4 rounded-xl space-y-2 text-xs">
          <div>
            <span class="text-slate-400 text-[11px]">Launch Executable:</span>
            <div class="mt-1.5 font-mono text-[11px] text-slate-200 bg-black/40 px-3 py-2 rounded-lg border border-white/[0.08] break-all select-text">
              ${app.execPath}
            </div>
          </div>
        </div>
      </div>

      <!-- Residuals Footprint Breakdown -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between px-1">
          <span class="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">RESIDUAL FOOTPRINT</span>
          <span class="text-[10px] font-mono text-slate-500">${app.residuals.length} targets</span>
        </div>
        <div class="space-y-2">
          ${app.residuals.length > 0
            ? app.residuals.map(res => `
                <div class="p-3 bg-white/[0.02] rounded-xl border border-white/[0.05] flex items-center justify-between text-xs">
                  <div>
                    <div class="font-mono text-[11px] text-slate-200 select-text">${res.path}</div>
                    <div class="text-[10px] text-slate-500 uppercase mt-0.5">${res.type} • ${res.sizeFormatted}</div>
                  </div>
                  <span class="capsule-pill ${res.confidence === 'VERIFIED' ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30' : 'text-amber-300 bg-amber-500/10 border-amber-500/30'}">
                    ${res.confidence}
                  </span>
                </div>
              `).join('')
            : '<div class="text-xs text-slate-500 p-3">No residual directories detected</div>'
          }
        </div>
      </div>
    `;

    document.getElementById('btn-action-uninstall')?.addEventListener('click', () => {
      this.openUninstallModal(app);
    });
  }

  private openUninstallModal(app: AppPackage) {
    if (app.isSystemProtected) return;
    const modal = document.getElementById('uninstall-modal');
    const title = document.getElementById('modal-app-title');
    const planContent = document.getElementById('modal-plan-content');

    if (title) title.innerText = `${app.name} (${app.id})`;

    if (planContent) {
      const residualsList = app.residuals.map((r, i) => `
        <label class="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-pointer hover:bg-white/[0.06] transition-colors">
          <input type="checkbox" checked id="chk-res-${i}" class="mt-0.5 accent-amber-500 rounded" />
          <div class="overflow-hidden">
            <div class="font-mono text-slate-200 text-[11px] truncate">${r.path}</div>
            <div class="text-[10px] text-slate-500 uppercase mt-0.5">${r.type} • ${r.sizeFormatted} (Confidence: ${r.confidence})</div>
          </div>
        </label>
      `).join('');

      planContent.innerHTML = `
        <div class="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between">
          <div>
            <div class="font-bold text-white text-xs">Main Application Package</div>
            <div class="text-[11px] text-slate-400 font-mono mt-0.5">${app.source.toUpperCase()} • ${app.version}</div>
          </div>
          <span class="font-mono text-slate-200 font-bold">${app.sizeFormatted}</span>
        </div>

        <div>
          <div class="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase mb-2">RESIDUAL USER DATA & CACHE CLEANUP</div>
          <div class="space-y-2">
            ${residualsList || '<div class="text-xs text-slate-500">No leftover folders detected.</div>'}
          </div>
        </div>

        <div class="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl flex items-center gap-2.5 text-emerald-400 text-xs font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span>Safety validation passed. System core files protected.</span>
        </div>
      `;
    }

    modal?.classList.remove('hidden');
    modal?.classList.add('flex');
  }

  private closeModal() {
    const modal = document.getElementById('uninstall-modal');
    modal?.classList.add('hidden');
    modal?.classList.remove('flex');
  }

  private executeUninstall() {
    if (!this.selectedApp) return;
    const id = this.selectedApp.id;
    this.apps = this.apps.filter(a => a.id !== id);
    this.closeModal();
    this.selectedApp = this.apps[0] || null;
    this.render();
  }
}

// Bootstrap
window.addEventListener('DOMContentLoaded', () => {
  new UltimateAppManager();
});
