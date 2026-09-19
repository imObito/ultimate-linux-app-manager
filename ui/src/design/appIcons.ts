// High-Fidelity Vector SVG Icon Engine for Linux Applications & System Tools

const CATEGORY_SVGS: Record<string, string> = {
  terminal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  display: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
  nvidia: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 0-7.07 17.07l2.12-2.12A7 7 0 1 1 12 19v3a10 10 0 0 0 0-20z"/><path d="M12 6a6 6 0 1 0 4.24 10.24l2.12-2.12A3 3 0 1 1 12 9v-3z"/></svg>`,
  disk: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="3" rx="2"/><rect width="20" height="8" x="2" y="13" rx="2"/><line x1="6" x2="6.01" y1="7" y2="7"/><line x1="6" x2="6.01" y1="17" y2="17"/></svg>`,
  power: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" x2="12" y1="2" y2="12"/></svg>`,
  lock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  keyboard: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="6" x2="6.01" y1="9" y2="9"/><line x1="10" x2="10.01" y1="9" y2="9"/><line x1="14" x2="14.01" y1="9" y2="9"/><line x1="18" x2="18.01" y1="9" y2="9"/><line x1="6" x2="6.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="13" y2="13"/><line x1="10" x2="14" y1="13" y2="13"/></svg>`,
  mouse: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="7"/><line x1="12" x2="12" y1="6" y2="10"/></svg>`,
  game: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ec4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="6"/></svg>`,
  multimedia: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fb7185" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  internet: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  dev: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  office: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`,
  kde: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 8 8 8"/><path d="m16 8-8 8"/><path d="M12 3v18"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>`,
  accessibility: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2"/><path d="m5 9 14-2"/><path d="m5 9 3 12"/><path d="m19 7-3 14"/><path d="M12 9v8"/></svg>`,
  generic: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 8 6 4-6 4Z"/></svg>`
};

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
  slides: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-slides.svg`,
  haruna: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/mpv.svg`,
  mpv: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/mpv.svg`,
  rpcs3: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/playstation.svg`,
  pcsx2: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/playstation.svg`,
  spotify: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/spotify.svg`,
  blender: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/blender.svg`,
  brave: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/brave.svg`,
  chrome: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-chrome.svg`,
  lutris: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/lutris.svg`,
  bottles: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/bottles.svg`,
  telegram: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/telegram.svg`,
  obsidian: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/obsidian.svg`
};

export function getAppIconSvg(appId: string, name: string, category: string): string {
  const cleanId = (appId || '').toLowerCase();
  const cleanName = (name || '').toLowerCase();
  const cleanCat = (category || '').toLowerCase();

  // 1. Direct Web Brand logos if available
  for (const [key, url] of Object.entries(APP_LOGOS)) {
    if (cleanId.includes(key) || cleanName.includes(key)) {
      return `<img src="${url}" alt="${name}" class="w-full h-full object-contain" onerror="this.parentElement.innerHTML='${CATEGORY_SVGS.generic.replace(/'/g, "\\'")}';" />`;
    }
  }

  // 2. Specific System Tool Mapping
  if (cleanId.includes('konsole') || cleanId.includes('terminal') || cleanName.includes('terminal') || cleanName.includes('console') || cleanName.includes('prompt')) {
    return CATEGORY_SVGS.terminal;
  }
  if (cleanId.includes('nvidia') || cleanName.includes('nvidia') || cleanId.includes('gpu')) {
    return CATEGORY_SVGS.nvidia;
  }
  if (cleanId.includes('partition') || cleanId.includes('disk') || cleanName.includes('disk') || cleanName.includes('partition')) {
    return CATEGORY_SVGS.disk;
  }
  if (cleanId.includes('display') || cleanId.includes('screen') || cleanName.includes('display') || cleanName.includes('screen') || cleanId.includes('monitor')) {
    return CATEGORY_SVGS.display;
  }
  if (cleanId.includes('power') || cleanId.includes('energy') || cleanName.includes('power') || cleanName.includes('energy') || cleanId.includes('battery')) {
    return CATEGORY_SVGS.power;
  }
  if (cleanId.includes('wallet') || cleanId.includes('auth') || cleanId.includes('keyring') || cleanId.includes('password') || cleanName.includes('wallet') || cleanName.includes('auth')) {
    return CATEGORY_SVGS.lock;
  }
  if (cleanId.includes('keyboard') || cleanId.includes('key') || cleanName.includes('keyboard') || cleanName.includes('shortcut')) {
    return CATEGORY_SVGS.keyboard;
  }
  if (cleanId.includes('mouse') || cleanName.includes('mouse') || cleanId.includes('touchpad')) {
    return CATEGORY_SVGS.mouse;
  }
  if (cleanId.includes('game') || cleanName.includes('game') || cleanId.includes('steam') || cleanName.includes('call of duty') || cleanId.includes('drift')) {
    return CATEGORY_SVGS.game;
  }
  if (cleanId.includes('access') || cleanName.includes('accessibility')) {
    return CATEGORY_SVGS.accessibility;
  }
  if (cleanId.includes('search') || cleanName.includes('search') || cleanId.includes('find') || cleanId.includes('baloo')) {
    return CATEGORY_SVGS.search;
  }
  if (cleanId.includes('info') || cleanId.includes('about') || cleanName.includes('about') || cleanName.includes('info')) {
    return CATEGORY_SVGS.info;
  }
  if (cleanId.includes('kde') || cleanId.includes('plasma') || cleanName.includes('kde')) {
    return CATEGORY_SVGS.kde;
  }
  if (cleanId.includes('settings') || cleanName.includes('settings') || cleanId.includes('kcm_') || cleanId.includes('config') || cleanCat.includes('settings')) {
    return CATEGORY_SVGS.settings;
  }
  if (cleanCat.includes('multimedia') || cleanCat.includes('audio') || cleanCat.includes('video')) {
    return CATEGORY_SVGS.multimedia;
  }
  if (cleanCat.includes('development') || cleanCat.includes('programming')) {
    return CATEGORY_SVGS.dev;
  }
  if (cleanCat.includes('internet') || cleanCat.includes('network') || cleanCat.includes('web')) {
    return CATEGORY_SVGS.internet;
  }
  if (cleanCat.includes('office') || cleanCat.includes('document')) {
    return CATEGORY_SVGS.office;
  }

  // Fallback category generic
  return CATEGORY_SVGS.generic;
}
