import { MOCK_APPS, AppPackage } from './state/mockData';
import { ICONS } from './design/icons';
import { getAppIconUrl } from './design/appIcons';

class XenoUninstallerModernApp {
  private apps: AppPackage[] = [];
  private selectedApp: AppPackage | null = null;
  private currentFilter: string = 'ALL';
  private searchQuery: string = '';
  private currentSort: string = 'name-asc';

  constructor() {
    this.apps = [...MOCK_APPS];
    this.initSidebarNavigation();
    this.initEventListeners();
    this.render();
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
        <button data-filter="${cat.id}" class="nav-btn flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all ${cat.id === 'ALL' ? 'bg-xeno-gold/15 text-xeno-gold font-semibold shadow-sm border border-xeno-gold/25' : ''}">
          <div class="flex items-center gap-3">
            <span class="opacity-80">${cat.icon}</span>
            <span>${cat.label}</span>
          </div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-500" id="badge-${cat.id}">0</span>
        </button>
      `).join('');
    }

    if (sourcesContainer) {
      sourcesContainer.innerHTML = sources.map(src => `
        <button data-filter="${src.id}" class="nav-btn flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all">
          <div class="flex items-center gap-3">
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
          b.classList.remove('bg-xeno-gold/15', 'text-xeno-gold', 'font-semibold', 'shadow-sm', 'border', 'border-xeno-gold/25');
          b.classList.add('text-slate-400');
        });
        btn.classList.add('bg-xeno-gold/15', 'text-xeno-gold', 'font-semibold', 'shadow-sm', 'border', 'border-xeno-gold/25');
        btn.classList.remove('text-slate-400');

        this.currentFilter = btn.getAttribute('data-filter') || 'ALL';
        this.renderDeck();
      });
    });
  }

  private initEventListeners() {
    const searchInput = document.getElementById('global-search-input') as HTMLInputElement;
    const spotlightOverlay = document.getElementById('spotlight-dim-overlay');

    // 3. Spotlight CMD+K Search Overlay Interaction
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

    // Close spotlight on overlay click
    spotlightOverlay?.addEventListener('click', () => {
      searchInput?.blur();
      spotlightOverlay.classList.remove('active');
    });

    const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
    const sidebarNav = document.getElementById('sidebar-nav');
    btnToggleSidebar?.addEventListener('click', () => {
      sidebarNav?.classList.toggle('-ml-64');
    });

    const btnToggleInspector = document.getElementById('btn-toggle-inspector');
    const btnCloseSheet = document.getElementById('btn-close-sheet');
    const inspectorSheet = document.getElementById('inspector-sheet');

    const toggleSheet = () => {
      inspectorSheet?.classList.toggle('hidden');
    };
    btnToggleInspector?.addEventListener('click', toggleSheet);
    btnCloseSheet?.addEventListener('click', toggleSheet);

    const sortDropdown = document.getElementById('sort-dropdown') as HTMLSelectElement;
    sortDropdown?.addEventListener('change', () => {
      this.currentSort = sortDropdown.value;
      this.renderDeck();
    });

    document.getElementById('btn-refresh')?.addEventListener('click', () => {
      this.render();
    });

    // 3. CMD+K / Global Hotkeys
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'k' || e.key.toLowerCase() === 'f')) {
        e.preventDefault();
        searchInput?.focus();
        spotlightOverlay?.classList.add('active');
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        btnToggleSidebar?.click();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        btnToggleInspector?.click();
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

  private getFilteredApps(): AppPackage[] {
    let list = this.apps.filter(app => {
      const src = app.source.toUpperCase();
      const cat = app.category.toLowerCase();

      if (this.currentFilter !== 'ALL') {
        if (this.currentFilter === 'DESKTOP' && src !== 'PACMAN' && src !== 'NATIVE') return false;
        if (this.currentFilter === 'WEBAPP' && src !== 'WEBAPP') return false;
        if (this.currentFilter === 'FLATPAK' && src !== 'FLATPAK') return false;
        if (this.currentFilter === 'APPIMAGE' && src !== 'APPIMAGE') return false;
        if (this.currentFilter === 'WINE' && src !== 'WINE') return false;
        if (this.currentFilter === 'PACMAN' && src !== 'PACMAN') return false;
        if (this.currentFilter === 'CAT_INTERNET' && !cat.includes('internet') && !cat.includes('network')) return false;
        if (this.currentFilter === 'CAT_MULTIMEDIA' && !cat.includes('multimedia') && !cat.includes('audio') && !cat.includes('video')) return false;
        if (this.currentFilter === 'CAT_DEV' && !cat.includes('development')) return false;
        if (this.currentFilter === 'CAT_GAMES' && !cat.includes('game')) return false;
        if (this.currentFilter === 'CAT_OFFICE' && !cat.includes('office')) return false;
      }

      if (this.searchQuery) {
        const matchesName = app.name.toLowerCase().includes(this.searchQuery);
        const matchesId = app.id.toLowerCase().includes(this.searchQuery);
        const matchesCat = app.category.toLowerCase().includes(this.searchQuery);
        return matchesName || matchesId || matchesCat;
      }

      return true;
    });

    list.sort((a, b) => {
      if (this.currentSort === 'name-asc') return a.name.localeCompare(b.name);
      if (this.currentSort === 'name-desc') return b.name.localeCompare(a.name);
      if (this.currentSort === 'source') return a.source.localeCompare(b.source);
      if (this.currentSort === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

    return list;
  }

  private updateCounts() {
    const counts: Record<string, number> = {
      ALL: this.apps.length,
      DESKTOP: this.apps.filter(a => a.source === 'pacman' || a.isUserApp).length,
      WEBAPP: this.apps.filter(a => a.source === 'flatpak' || a.category.includes('Web')).length,
      CAT_INTERNET: this.apps.filter(a => a.category.toLowerCase().includes('internet')).length,
      CAT_MULTIMEDIA: this.apps.filter(a => a.category.toLowerCase().includes('multimedia')).length,
      CAT_DEV: this.apps.filter(a => a.category.toLowerCase().includes('development')).length,
      CAT_GAMES: this.apps.filter(a => a.category.toLowerCase().includes('game')).length,
      CAT_OFFICE: this.apps.filter(a => a.category.toLowerCase().includes('office')).length,
      PACMAN: this.apps.filter(a => a.source === 'pacman').length,
      FLATPAK: this.apps.filter(a => a.source === 'flatpak').length,
      APPIMAGE: this.apps.filter(a => a.source === 'appimage').length,
      WINE: 0
    };

    for (const [key, count] of Object.entries(counts)) {
      const el = document.getElementById(`badge-${key}`);
      if (el) el.innerText = count.toString();
    }
  }

  private render() {
    this.updateCounts();
    this.renderDeck();
    if (!this.selectedApp && this.apps.length > 0) {
      this.selectApp(this.apps[0]);
    }
  }

  private renderDeck() {
    const grid = document.getElementById('app-card-grid');
    const emptyState = document.getElementById('empty-state');
    const titleLabel = document.getElementById('deck-view-title');
    const countLabel = document.getElementById('deck-view-count');

    if (!grid) return;

    const filtered = this.getFilteredApps();
    grid.innerHTML = '';

    if (countLabel) countLabel.innerText = `Showing ${filtered.length} of ${this.apps.length} applications`;
    if (titleLabel) titleLabel.innerText = this.currentFilter === 'ALL' ? 'All Installed Software' : this.currentFilter.replace('CAT_', '');

    if (filtered.length === 0) {
      emptyState?.classList.remove('hidden');
      emptyState?.classList.add('flex');
      return;
    } else {
      emptyState?.classList.add('hidden');
      emptyState?.classList.remove('flex');
    }

    filtered.forEach((app, index) => {
      const card = document.createElement('div');
      const isSelected = this.selectedApp?.id === app.id;
      
      const staggerDelay = Math.min(index * 25, 250);
      card.className = `glass-card p-6 cursor-pointer flex flex-col justify-between gap-4 animate-card-enter ${isSelected ? 'glass-card-selected' : ''}`;
      card.style.animationDelay = `${staggerDelay}ms`;
      
      const tagClass = `tag-${app.source.toLowerCase()}`;
      const iconUrl = getAppIconUrl(app.id, app.name);
      const initials = app.name.substring(0, 2).toUpperCase();

      // 1. Real System Icons with fallback
      card.innerHTML = `
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center p-2 shadow-inner shrink-0 backdrop-blur-sm overflow-hidden">
              <img src="${iconUrl}" alt="${app.name}" class="w-full h-full object-contain" onerror="this.onerror=null; this.parentElement.innerHTML='<span class=\\'font-bold text-xeno-gold text-sm\\'>${initials}</span>';" />
            </div>
            <div class="overflow-hidden">
              <h4 class="text-base font-bold text-white tracking-tight truncate">${app.name}</h4>
              <p class="text-[11px] font-mono text-slate-400/90 truncate mt-0.5">${app.id}</p>
            </div>
          </div>
          <span class="capsule-pill ${tagClass} shrink-0">
            ${app.source}
          </span>
        </div>

        <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed font-normal">
          ${app.description || 'Linux application package'}
        </p>

        <div class="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
          <span class="bg-white/[0.04] px-2.5 py-1 rounded-md text-slate-300 font-medium text-[11px] border border-white/[0.04]">${app.category}</span>
          <span class="font-mono text-slate-400 text-[11px]">${app.sizeFormatted}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        this.selectApp(app);
      });

      grid.appendChild(card);
    });
  }

  private selectApp(app: AppPackage) {
    this.selectedApp = app;
    
    // 4. Update Ambient Backdrop Glow container dynamically
    const backdrop = document.getElementById('ambient-backdrop');
    if (backdrop) {
      backdrop.className = `glow-${app.source.toLowerCase()}`;
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

    const iconUrl = getAppIconUrl(app.id, app.name);
    const initials = app.name.substring(0, 2).toUpperCase();

    // 2. Compute visual telemetry ratios
    const sizeMb = Math.round(app.sizeBytes / (1024 * 1024));
    const sizePercent = Math.min(Math.round((sizeMb / 1200) * 100), 100);
    const depsPercent = Math.min(app.dependencies.length * 15, 100);
    const safetyScore = app.isSystemProtected ? 100 : (app.reverseDependencies.length > 0 ? 55 : 98);

    body.className = "flex-1 overflow-y-auto p-6 space-y-6 animate-inspector-refresh";

    body.innerHTML = `
      <!-- App Header Profile Glass Card -->
      <div class="inspector-glass-card p-5 rounded-2xl space-y-4">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.12] flex items-center justify-center p-2.5 shadow-md shrink-0">
            <img src="${iconUrl}" alt="${app.name}" class="w-full h-full object-contain" onerror="this.onerror=null; this.parentElement.innerHTML='<span class=\\'font-extrabold text-xeno-gold text-lg\\'>${initials}</span>';" />
          </div>
          <div class="overflow-hidden">
            <h3 class="text-lg font-bold text-white tracking-tight truncate">${app.name}</h3>
            <span class="text-xs font-mono text-slate-400">${app.id}</span>
          </div>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">${app.description}</p>
      </div>

      <!-- 2. FORENSIC TELEMETRY GAUGES -->
      <div class="space-y-3">
        <div class="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase px-1">TELEMETRY & FOOTPRINT</div>
        <div class="inspector-glass-card p-4 rounded-xl space-y-3.5">
          <!-- Disk Footprint Bar -->
          <div>
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-slate-400 font-medium">Disk Footprint</span>
              <span class="font-mono text-xeno-gold font-bold">${app.sizeFormatted}</span>
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
          <div class="flex items-center justify-between p-3"><span class="text-slate-400">Source Provider</span><span class="font-bold text-xeno-gold uppercase">${app.source}</span></div>
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

      <!-- Direct Dependencies -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between px-1">
          <span class="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">DIRECT DEPENDENCIES</span>
          <span class="text-[10px] font-mono text-slate-500">${app.dependencies.length} packages</span>
        </div>
        <div class="space-y-1.5 max-h-36 overflow-y-auto">
          ${app.dependencies.length > 0 
            ? app.dependencies.map(d => `
                <div class="flex items-center justify-between p-2.5 bg-white/[0.02] hover:bg-white/[0.04] rounded-lg border border-white/[0.04] text-xs transition-colors">
                  <span class="font-mono text-slate-300 text-[11px]">${d}</span>
                  <span class="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">Required</span>
                </div>
              `).join('')
            : '<div class="text-xs text-slate-500 p-2.5">No required dependencies</div>'
          }
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
          <input type="checkbox" checked id="chk-res-${i}" class="mt-0.5 accent-xeno-gold rounded" />
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
  new XenoUninstallerModernApp();
});
