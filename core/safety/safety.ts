// Protected System Packages Blacklist (Never allow uninstall)
export const PROTECTED_SYSTEM_PACKAGES = new Set([
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
]);

// Protected Path Roots for Residual Cleanup (Never allow deletion)
export const PROTECTED_SYSTEM_PATHS = [
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
];

export const PROTECTED_USER_PATHS = [
  '',
  '/',
  '~',
  '~/',
  '~/.ssh',
  '~/.gnupg',
  '~/.bashrc',
  '~/.zshrc',
  '~/.profile',
  '~/Desktop',
  '~/Documents',
  '~/Downloads',
  '~/Pictures',
  '~/Music',
  '~/Videos'
];

export interface SafetyCheckResult {
  isSafe: boolean;
  isSystemProtected: boolean;
  hasReverseDependencies: boolean;
  warningMessage?: string;
  riskLevel: 'SAFE' | 'WARNING' | 'CRITICAL_BLOCKED';
}

export class SafetyValidator {
  static validatePackage(packageId: string, reverseDeps: string[] = []): SafetyCheckResult {
    const normalizedId = packageId.toLowerCase().trim();

    if (PROTECTED_SYSTEM_PACKAGES.has(normalizedId)) {
      return {
        isSafe: false,
        isSystemProtected: true,
        hasReverseDependencies: reverseDeps.length > 0,
        warningMessage: `Package '${packageId}' is a critical system component and cannot be uninstalled.`,
        riskLevel: 'CRITICAL_BLOCKED'
      };
    }

    if (reverseDeps.length > 0) {
      return {
        isSafe: true,
        isSystemProtected: false,
        hasReverseDependencies: true,
        warningMessage: `The following packages depend on '${packageId}': ${reverseDeps.join(', ')}. Removing it may cause instability.`,
        riskLevel: 'WARNING'
      };
    }

    return {
      isSafe: true,
      isSystemProtected: false,
      hasReverseDependencies: false,
      riskLevel: 'SAFE'
    };
  }

  static validateResidualPath(targetPath: string): boolean {
    const normalized = targetPath.trim().replace(/\/+$/, '');
    if (!normalized || PROTECTED_SYSTEM_PATHS.includes(normalized) || PROTECTED_USER_PATHS.includes(normalized)) {
      return false;
    }

    // Must be within recognized XDG locations or app bundles
    const isAllowedLocation = 
      normalized.startsWith('~/.config/') ||
      normalized.startsWith('~/.cache/') ||
      normalized.startsWith('~/.local/share/') ||
      normalized.startsWith('~/.local/state/') ||
      normalized.startsWith('~/.var/app/') ||
      normalized.startsWith('/var/lib/flatpak/app/') ||
      normalized.startsWith('/etc/');

    return isAllowedLocation;
  }
}
