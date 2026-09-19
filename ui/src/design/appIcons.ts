// High-Fidelity SVG Icon Map & System Icon Resolver

export const APP_LOGOS: Record<string, string> = {
  firefox: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/firefox.svg`,
  'visual-studio-code-bin': `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/vscode.svg`,
  code: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/vscode.svg`,
  vlc: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/vlc.svg`,
  'com.discordapp.Discord': `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/discord.svg`,
  discord: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/discord.svg`,
  'com.valvesoftware.Steam': `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/steam.svg`,
  steam: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/steam.svg`,
  'org.libreoffice.LibreOffice': `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/libreoffice.svg`,
  libreoffice: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/libreoffice.svg`,
  'obs-studio': `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/obs.svg`,
  obs: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/obs.svg`,
  kicad: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/kicad.svg`,
  gimp: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/gimp.svg`,
  chromium: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/chromium.svg`,
  youtube: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/youtube.svg`,
  whatsapp: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/whatsapp.svg`,
  'google-slides': `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-slides.svg`,
  haruna: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/mpv.svg`,
  mpv: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/mpv.svg`,
  rpcs3: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/playstation.svg`,
  pcsx2: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/playstation.svg`
};

export function getAppIconUrl(appId: string, name: string): string {
  const cleanId = appId.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  for (const [key, url] of Object.entries(APP_LOGOS)) {
    const cleanKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleanId.includes(cleanKey) || cleanName.includes(cleanKey)) {
      return url;
    }
  }

  // Fallback to high-definition unpkg simple-icons SVG by normalized brand name
  return `https://cdn.simpleicons.org/${cleanName.split(' ')[0] || 'linux'}/f59e0b`;
}
