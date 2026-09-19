# XENO Uninstaller — Security & Safety Model

## 1. Zero-Trust File System Deletion
XENO Uninstaller strictly prohibits naive string matching or greedy regex file deletion (e.g. `rm -rf /.../*name*`).

### Guardrail Principles
1. **Never Run Full GUI as Root**:
   - The application runs exclusively with standard unprivileged user permissions.
   - Privileged operations (like system-level `pacman -Rns`) are delegated to `pkexec` (Polkit) on a per-action basis.
   - User-level package operations (Flatpak `--user`, user config cleanup) run strictly within the user's `$HOME`.

2. **System Core Blacklist (Hard Protected)**:
   The following system packages and critical components can **never** be uninstalled via XENO Uninstaller:
   - Kernel & Boot: `linux`, `linux-cachyos`, `linux-zen`, `systemd`, `grub`, `dracut`, `mkinitcpio`, `efibootmgr`
   - Core C / Base: `glibc`, `coreutils`, `bash`, `filesystem`, `archlinux-keyring`, `pacman`, `polkit`, `dbus`
   - Display & Audio Base: `wayland`, `xorg-server`, `pipewire`, `wireplumber`
   - Desktop Shell Essentials: `hyprland`, `kwin`, `mutter`, `gnome-shell`, `plasma-desktop`
   - XENO System: `xeno`, `xeno-core`, `xeno-uninstaller`

3. **Protected Path Whitelist / Blacklist Matrix**:
   - **Strictly Protected (Forbidden to remove/touch as residual)**:
     - `/`, `/bin`, `/sbin`, `/usr`, `/usr/bin`, `/usr/lib`, `/lib`, `/lib64`
     - `/boot`, `/dev`, `/proc`, `/sys`, `/etc`, `/var` (unless specific verified app subdirectory)
     - `~`, `~/.ssh`, `~/.gnupg`, `~/.bashrc`, `~/.zshrc`, `~/.profile`, `~/Desktop`, `~/Documents`, `~/Downloads`, `~/Pictures`
   - **Allowed Residual Scanning Targets**:
     - `~/.config/<app-identifier>`
     - `~/.cache/<app-identifier>`
     - `~/.local/share/<app-identifier>`
     - `~/.local/state/<app-identifier>`
     - `~/.var/app/<app-id>` (Flatpak sandbox leftovers)
     - `~/.config/autostart/<app-identifier>.desktop`
     - `~/.config/systemd/user/<app-identifier>.service`

4. **Forensic Confidence Scores**:
   - `VERIFIED (100%)`: Path registered in pacman database or Flatpak application manifest.
   - `DETECTED (85%)`: Path matches reverse-DNS format (`org.mozilla.firefox`) or exact executable name with existing application desktop entry.
   - `POSSIBLE (50%)`: Requires explicit user checkbox opting in; marked with warning badge.
   - `UNKNOWN (<30%)`: Ignored completely and omitted from residual cleaner.

5. **Programmatic AI Invocation Security (XENO Agent)**:
   - Tool calls from AI cannot bypass the safety validator.
   - Every uninstall action requires a two-phase handshake:
     `preview_uninstall(app_id)` -> returns `confirmation_token` with itemized blast radius -> `uninstall(app_id, token)`.
