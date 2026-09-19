# XENO Uninstaller — Architecture Specification

## 1. Executive Overview
XENO Uninstaller is a high-reliability, safety-first Linux desktop software manager and forensic uninstaller. It provides:
- Fast multi-source package inventory discovery (Pacman/ALPM, Flatpak, Snap, AppImage, native desktop entries).
- Forensic residual footprint discovery and classification (Cache, Config, User Data, Logs, Systemd units).
- Dependency and reverse-dependency safety graph analysis.
- Multi-stage transactional uninstall engine with dry-run/preview, uninstallation execution, and post-removal verification.
- Autonomous XENO tool capability endpoints exposing safe, programmatic APIs (`list_apps`, `inspect_app`, `preview_uninstall`, `uninstall`, `list_residuals`).
- Desktop UI built with modern web technologies packaged as a native desktop utility featuring hideable panels, smooth spring animations, and high information density.

---

## 2. Component Hierarchy

```
xeno-uninstaller/
├── core/
│   ├── inventory/         # Package discovery & multi-provider aggregator
│   ├── providers/         # Source-specific providers (Pacman, Flatpak, Snap, AppImage)
│   ├── dependency/        # Dependency graph, reverse-deps & orphan analyzer
│   ├── safety/            # Protected system packages, path blacklists, risk scoring
│   ├── residuals/         # Conservative path heuristics & filesystem scanner
│   ├── transactions/      # Action plan generation, rollback records, history journal
│   ├── verification/      # Post-uninstall verification & leftover audit
│   └── api/               # XENO AI tool endpoints & IPC interface
├── ui/                    # Frontend client (Vanilla CSS + TS / Web Components)
│   ├── src/
│   │   ├── design/        # Tokens, themes, animations
│   │   ├── components/    # Layout, AppList, Inspector, PreviewModal, History
│   │   └── state/         # Store, IPC bridges, Mock engine
│   └── index.html
└── tests/                 # Unit, integration, mock-mode and safety suites
```

---

## 3. Package Management Providers

1. **Pacman Provider (Arch/CachyOS)**:
   - Queries `pacman -Qie`, `pacman -Ql`, `pacman -Qii` or ALPM lib.
   - Computes required dependencies (`pacman -Qi <pkg> | grep "Required By"`).
   - Execution command uses `pkexec pacman -Rns <pkg>` (or `-R` depending on safety settings).

2. **Flatpak Provider**:
   - Queries `flatpak list --app --columns=application,name,version,size,origin,installation`.
   - Distinguishes user vs. system installations.
   - Uninstalls via `flatpak uninstall -y --delete-data <app_id>`.

3. **Snap Provider**:
   - Queries `snap list` if daemon is active.

4. **AppImage & Standalone Desktop Entries**:
   - Scans `~/.local/share/applications`, `/usr/share/applications`, `~/.local/bin`, `~/Applications`.
   - Analyzes `.desktop` file exec paths and associated local folders.

---

## 4. Residual Scanner Architecture
The residual scanner analyzes application traces without blind wildcard string matches:
- **XDG Base Dirs**:
  - Config: `~/.config/<app>`, `/etc/<app>`
  - Cache: `~/.cache/<app>`, `/var/cache/<app>`
  - Data: `~/.local/share/<app>`, `/var/lib/<app>`
  - State: `~/.local/state/<app>`
- **Runtime & Daemons**:
  - Systemd user units: `~/.config/systemd/user/<app>*.service`
  - Autostart entries: `~/.config/autostart/<app>*.desktop`
- **Classification Categories**:
  - `VERIFIED`: Exact bundle ID / XDG match recorded in desktop entry or package metadata.
  - `DETECTED`: Highly specific folder match with application metadata.
  - `POSSIBLE`: Shared or vendor folder requiring user inspection.
  - `PROTECTED`: Blacklisted directories (e.g., `~`, `/usr`, `/boot`, `/etc/pam.d`, `~/.ssh`).

---

## 5. Transaction & Execution Lifecycle

```
1. Request (UI / AI)
      ↓
2. Inspect & Resolve Dependencies
      ↓
3. Safety Check & Policy Validation (Blocked if protected system component)
      ↓
4. Generate Uninstall Plan (Package + Selected Residuals)
      ↓
5. Preview & Mandatory User Confirmation (Token generated)
      ↓
6. Execute (Polkit/pkexec for native pkgs; user space for Flatpak user/local files)
      ↓
7. Post-Execution Verification (Verify binary removal, journal update)
      ↓
8. Real-time Inventory Cache Invalidation & Event Broadcast
```

---

## 6. Mock Architecture (`MOCK_MODE=true`)
In mock mode:
- Returns realistic dataset (Firefox, VS Code, Discord, Steam, VLC, LibreOffice, GIMP, OBS Studio, etc.).
- Simulates dependency trees, simulated system packages (e.g. `glibc`, `systemd`, `linux-cachyos` marked as protected).
- Allows safe testing of destructive actions without altering host packages.
