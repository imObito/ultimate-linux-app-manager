import { describe, it } from 'node:test';
import assert from 'node:assert';

const PROTECTED_SYSTEM_PACKAGES = new Set([
  'linux',
  'linux-cachyos',
  'linux-zen',
  'glibc',
  'systemd',
  'bash',
  'coreutils',
  'filesystem',
  'archlinux-keyring',
  'pacman',
  'polkit',
  'dbus',
  'xeno'
]);

const PROTECTED_PATHS = [
  '/',
  '/bin',
  '/usr',
  '/boot',
  '/etc',
  '/var',
  '~',
  '~/.ssh',
  '~/.gnupg',
  '~/Desktop',
  '~/Documents',
  '~/Downloads'
];

function isSafeResidualPath(targetPath) {
  const norm = targetPath.trim().replace(/\/+$/, '');
  if (PROTECTED_PATHS.includes(norm) || norm.startsWith('~/.ssh') || norm.startsWith('~/.gnupg')) {
    return false;
  }
  return norm.startsWith('~/.config/') || norm.startsWith('~/.cache/') || norm.startsWith('~/.local/share/') || norm.startsWith('~/.var/app/');
}

describe('Safety Engine Suite', () => {
  it('should strictly block core system packages', () => {
    assert.strictEqual(PROTECTED_SYSTEM_PACKAGES.has('glibc'), true);
    assert.strictEqual(PROTECTED_SYSTEM_PACKAGES.has('linux-cachyos'), true);
    assert.strictEqual(PROTECTED_SYSTEM_PACKAGES.has('systemd'), true);
    assert.strictEqual(PROTECTED_SYSTEM_PACKAGES.has('firefox'), false);
  });

  it('should block dangerous filesystem deletion targets', () => {
    for (const p of PROTECTED_PATHS) {
      assert.strictEqual(isSafeResidualPath(p), false, `Path ${p} should be blocked`);
    }
  });

  it('should permit verified XDG app paths for cleanup', () => {
    const validPaths = ['~/.config/vlc', '~/.cache/vlc', '~/.var/app/com.discordapp.Discord'];
    for (const p of validPaths) {
      assert.strictEqual(isSafeResidualPath(p), true, `Path ${p} should be allowed`);
    }
  });
});
