# Core System Blacklist (Never allow uninstall)
PROTECTED_SYSTEM_PACKAGES = {
    'linux',
    'linux-cachyos',
    'linux-zen',
    'linux-lts',
    'linux-firmware',
    'glibc',
    'systemd',
    'systemd-libs',
    'bash',
    'coreutils',
    'filesystem',
    'archlinux-keyring',
    'cachyos-keyring',
    'pacman',
    'polkit',
    'dbus',
    'shadow',
    'util-linux',
    'grub',
    'efibootmgr',
    'pipewire',
    'wireplumber',
    'wayland',
    'xorg-server',
    'hyprland',
    'kwin',
    'mutter',
    'gnome-shell',
    'plasma-desktop',
    'xeno',
    'xeno-core',
    'xeno-uninstaller'
}

PROTECTED_PATHS = [
    '/',
    '/bin',
    '/sbin',
    '/usr',
    '/usr/bin',
    '/usr/lib',
    '/lib',
    '/lib64',
    '/boot',
    '/dev',
    '/proc',
    '/sys',
    '/etc',
    '/var',
    '/home',
    '/root'
]

class SafetyValidator:
    @staticmethod
    def is_protected_package(package_id: str) -> bool:
        return package_id.lower().strip() in PROTECTED_SYSTEM_PACKAGES

    @staticmethod
    def is_safe_residual_path(target_path: str) -> bool:
        normalized = target_path.strip().rstrip('/')
        if not normalized or normalized in PROTECTED_PATHS:
            return False
            
        allowed_roots = [
            '~/.config/',
            '~/.cache/',
            '~/.local/share/',
            '~/.local/state/',
            '~/.var/app/'
        ]
        return any(normalized.startswith(r) for r in allowed_roots)
