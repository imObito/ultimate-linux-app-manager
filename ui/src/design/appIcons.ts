// High-Fidelity Vector SVG Icon Engine for Linux Applications & System Packages

// Dedicated Brand & Application SVGs (100% Vector, Offline, Zero-Latency)
const APP_VECTOR_SVGS: Record<string, string> = {
  steam: `<svg viewBox="0 0 24 24" fill="currentColor" class="text-[#1da1f2] drop-shadow-sm"><path d="M11.979 0C5.632 0 .445 4.93.031 11.196l6.637 2.74a3.606 3.606 0 0 1 2.05-.633c.12 0 .237.012.355.023l3.05-4.423a4.817 4.817 0 0 1-.093-.935c0-2.67 2.173-4.836 4.854-4.836 2.68 0 4.853 2.166 4.853 4.836 0 2.67-2.173 4.835-4.853 4.835-.119 0-.236-.008-.353-.02l-4.38 3.093c.01.12.02.24.02.36 0 1.998-1.626 3.62-3.633 3.62-1.616 0-2.986-1.061-3.46-2.525L.137 15.11C1.042 20.17 5.485 24 11.979 24c6.627 0 12-5.373 12-12s-5.373-12-12-12zM7.55 18.067a2.02 2.02 0 1 0 0-4.04 2.02 2.02 0 0 0 0 4.04zm9.333-11.3a3.224 3.224 0 1 0 0 6.447 3.224 3.224 0 0 0 0-6.447z"/></svg>`,
  
  lutris: `<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-sm"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  
  discord: `<svg viewBox="0 0 24 24" fill="#5865F2" class="drop-shadow-sm"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
  
  vscode: `<svg viewBox="0 0 24 24" fill="#007ACC" class="drop-shadow-sm"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.276A1 1 0 0 0 .324 8.71L4.89 12 .324 15.29a1 1 0 0 0 .004 1.436l1.323 1.216a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>`,
  
  firefox: `<svg viewBox="0 0 24 24" fill="none" class="drop-shadow-sm"><circle cx="12" cy="12" r="10" fill="#FF7139"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79.09-.39.46-.65.86-.61.39.05.7.35.73.74.07.97.43 1.87 1.01 2.61.27.35.77.41 1.12.14.35-.27.41-.77.14-1.12a5.9 5.9 0 0 1-.87-2.37c-.06-.43.25-.82.68-.88.43-.06.82.25.88.68.16 1.15.65 2.18 1.4 2.99.3.32.79.34 1.11.05.32-.3.34-.79.05-1.11a7.84 7.84 0 0 1-1.42-3.69c-.06-.44.27-.84.71-.9.44-.06.84.27.9.71.18 1.42.75 2.71 1.62 3.75.29.35.8.39 1.14.1.35-.29.39-.8.1-1.14a9.92 9.92 0 0 1-1.74-4.8c-.04-.44.3-.82.74-.86.44-.04.82.3.86.74.24 2.45 1.34 4.64 3.01 6.24.33.32.84.31 1.15-.02.32-.33.31-.84-.02-1.15a11.9 11.9 0 0 1-2.45-5.11c-.08-.43.22-.84.66-.92.43-.08.84.22.92.66.4 2.24 1.46 4.28 3 5.86.32.33.83.34 1.16.03.33-.32.34-.83.03-1.16A13.8 13.8 0 0 1 19 8.27V12c0 4.41-3.59 8-8 8z" fill="#FFF"/></svg>`,
  
  vlc: `<svg viewBox="0 0 24 24" fill="#FF8800" class="drop-shadow-sm"><path d="M12 2L8 10h8L12 2zm-5 9l-2 5h14l-2-5H7zm-3 6l-2 4a1 1 0 0 0 .9 1h16.2a1 1 0 0 0 .9-1l-2-4H4z"/></svg>`,
  
  rpcs3: `<svg viewBox="0 0 24 24" fill="#003791" class="drop-shadow-sm"><circle cx="12" cy="12" r="10" fill="#003791"/><path d="M6 12l4-4v3h4V8l4 4-4 4v-3h-4v3l-4-4z" fill="#00d2ff"/></svg>`,
  
  arduino: `<svg viewBox="0 0 24 24" fill="#00979D" class="drop-shadow-sm"><path d="M16.5 6A5.5 5.5 0 0 0 12 8.76 5.5 5.5 0 1 0 7.5 17c2.14 0 3.97-1.22 4.87-3 .24.49.56.93.93 1.3A5.5 5.5 0 1 0 16.5 6zm-9 9a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm9 0a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/><rect x="5.5" y="11.25" width="4" height="1.5" rx="0.5" fill="#FFF"/><rect x="14.5" y="11.25" width="4" height="1.5" rx="0.5" fill="#FFF"/><rect x="15.75" y="10" width="1.5" height="4" rx="0.5" fill="#FFF"/></svg>`,
  
  missioncenter: `<svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-sm"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  
  tlpui: `<svg viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-sm"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  
  protonup: `<svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-sm"><path d="m18 15-6-6-6 6"/><rect width="18" height="18" x="3" y="3" rx="4"/></svg>`,
  
  goverlay: `<svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-sm"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="12" r="5"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`,
  
  cachyos: `<svg viewBox="0 0 24 24" fill="#00d2ff" class="drop-shadow-sm"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V18h-2v-1.07A6 6 0 0 1 6.07 12H5v-2h1.07A6 6 0 0 1 11 4.93V4h2v.93A6 6 0 0 1 17.93 10H19v2h-1.07A6 6 0 0 1 13 16.93zM12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5z"/></svg>`,
  
  wine: `<svg viewBox="0 0 24 24" fill="#e11d48" class="drop-shadow-sm"><path d="M8 3h8a1 1 0 0 1 1 1v4c0 3.866-3.134 7-7 7s-7-3.134-7-7V4a1 1 0 0 1 1-1zm3 12v5H8v2h8v-2h-3v-5c3.5-0.5 6-3 6-7V4H5v4c0 4 2.5 6.5 6 7z"/></svg>`,
  
  whatsapp: `<svg viewBox="0 0 24 24" fill="#25D366" class="drop-shadow-sm"><path d="M12.004 2c-5.517 0-9.99 4.475-9.99 9.993 0 1.763.458 3.486 1.33 5.002L2 22l5.13-1.346a9.96 9.96 0 0 0 4.874 1.258h.005c5.517 0 9.99-4.475 9.99-9.993A9.94 9.94 0 0 0 12.004 2zm5.834 14.156c-.244.685-1.42 1.309-1.968 1.393-.518.08-1.196.113-1.927-.12a14.77 14.77 0 0 1-5.007-3.088 11.23 11.23 0 0 1-2.478-3.078c-.62-.977-.02-1.503.27-1.792.26-.26.57-.61.85-.92.22-.24.29-.41.44-.69.15-.27.08-.52-.04-.75-.12-.24-1.07-2.58-1.47-3.53-.39-.93-.78-.8-1.07-.82-.28-.01-.6-.02-.92-.02-.32 0-.85.12-1.3.6-.44.48-1.7 1.66-1.7 4.05 0 2.39 1.74 4.7 1.98 5.02.24.32 3.37 5.37 8.31 7.33 3.99 1.58 4.8 1.26 5.67 1.18.87-.08 2.8-1.14 3.2-2.25.4-1.1.4-2.05.28-2.25-.12-.2-.44-.32-.92-.56z"/></svg>`,
  
  youtube: `<svg viewBox="0 0 24 24" fill="#FF0000" class="drop-shadow-sm"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,

  powerpoint: `<svg viewBox="0 0 24 24" fill="#D24726" class="drop-shadow-sm"><rect width="20" height="20" x="2" y="2" rx="3"/><path d="M8 7h4.5a3 3 0 1 1 0 6H10v4H8V7zm2 4.5h2.5a1.5 1.5 0 1 0 0-3H10v3z" fill="#FFF"/></svg>`,

  word: `<svg viewBox="0 0 24 24" fill="#2B579A" class="drop-shadow-sm"><rect width="20" height="20" x="2" y="2" rx="3"/><path d="M6 7l2.5 10h2L12 11l1.5 6h2L18 7h-2l-1.5 7L13 7h-2l-1.5 7L8 7H6z" fill="#FFF"/></svg>`,

  slides: `<svg viewBox="0 0 24 24" fill="#F4B400" class="drop-shadow-sm"><rect width="20" height="16" x="2" y="4" rx="2"/><rect width="12" height="8" x="6" y="8" fill="#FFF" rx="1"/></svg>`,

  proteus: `<svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-sm"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><circle cx="6" cy="18" r="3"/><line x1="6" x2="6" y1="9" y2="15"/><line x1="9" x2="15" y1="18" y2="18"/><line x1="8.5" x2="15.5" y1="8.5" y2="15.5"/></svg>`,

  gamepad: `<svg viewBox="0 0 24 24" fill="none" stroke="#ec4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-sm"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="6"/></svg>`,

  ai_brain: `<svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-sm"><path d="M12 2a4 4 0 0 0-4 4v1a3 3 0 0 0-3 3 3 3 0 0 0 1 2.22A4 4 0 0 0 5 16a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4 4 4 0 0 0-1-3.78A3 3 0 0 0 19 10a3 3 0 0 0-3-3V6a4 4 0 0 0-4-4z"/><line x1="12" x2="12" y1="12" y2="16"/><line x1="9" x2="15" y1="14" y2="14"/></svg>`
};

// System Tool & Category Vector SVGs
const CATEGORY_SVGS: Record<string, string> = {
  terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  display: `<svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
  nvidia: `<svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 0-7.07 17.07l2.12-2.12A7 7 0 1 1 12 19v3a10 10 0 0 0 0-20z"/><path d="M12 6a6 6 0 1 0 4.24 10.24l2.12-2.12A3 3 0 1 1 12 9v-3z"/></svg>`,
  disk: `<svg viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="3" rx="2"/><rect width="20" height="8" x="2" y="13" rx="2"/><line x1="6" x2="6.01" y1="7" y2="7"/><line x1="6" x2="6.01" y1="17" y2="17"/></svg>`,
  power: `<svg viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" x2="12" y1="2" y2="12"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  keyboard: `<svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="6" x2="6.01" y1="9" y2="9"/><line x1="10" x2="10.01" y1="9" y2="9"/><line x1="14" x2="14.01" y1="9" y2="9"/><line x1="18" x2="18.01" y1="9" y2="9"/><line x1="6" x2="6.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="13" y2="13"/><line x1="10" x2="14" y1="13" y2="13"/></svg>`,
  mouse: `<svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="7"/><line x1="12" x2="12" y1="6" y2="10"/></svg>`,
  game: `<svg viewBox="0 0 24 24" fill="none" stroke="#ec4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="6"/></svg>`,
  multimedia: `<svg viewBox="0 0 24 24" fill="none" stroke="#fb7185" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  internet: `<svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  dev: `<svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  office: `<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`,
  kde: `<svg viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 8 8 8"/><path d="m16 8-8 8"/><path d="M12 3v18"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>`,
  accessibility: `<svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2"/><path d="m5 9 14-2"/><path d="m5 9 3 12"/><path d="m19 7-3 14"/><path d="M12 9v8"/></svg>`,
  audio: `<svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  driver: `<svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><circle cx="7" cy="10" r="2"/><line x1="12" x2="17" y1="10" y2="10"/></svg>`,
  generic: `<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="4"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/></svg>`
};

export function getAppIconSvg(appId: string, name: string, category: string): string {
  const cleanId = (appId || '').toLowerCase();
  const cleanName = (name || '').toLowerCase();
  const cleanCat = (category || '').toLowerCase();

  // 1. Direct App Matches
  if (cleanId === 'steam' || cleanName === 'steam') return APP_VECTOR_SVGS.steam;
  if (cleanId.includes('lutris') || cleanName.includes('lutris')) return APP_VECTOR_SVGS.lutris;
  if (cleanId.includes('discord') || cleanName.includes('discord') || cleanId.includes('424004941485572097')) return APP_VECTOR_SVGS.discord;
  if (cleanId.includes('code') || cleanName.includes('code') || cleanId.includes('vscode')) return APP_VECTOR_SVGS.vscode;
  if (cleanId.includes('firefox') || cleanName.includes('firefox')) return APP_VECTOR_SVGS.firefox;
  if (cleanId.includes('vlc') || cleanName.includes('vlc')) return APP_VECTOR_SVGS.vlc;
  if (cleanId.includes('rpcs3') || cleanName.includes('rpcs3')) return APP_VECTOR_SVGS.rpcs3;
  if (cleanId.includes('arduino') || cleanName.includes('arduino')) return APP_VECTOR_SVGS.arduino;
  if (cleanId.includes('missioncenter') || cleanId.includes('mission-center') || cleanName.includes('mission center')) return APP_VECTOR_SVGS.missioncenter;
  if (cleanId.includes('tlp') || cleanName.includes('tlp')) return APP_VECTOR_SVGS.tlpui;
  if (cleanId.includes('pupgui') || cleanName.includes('protonup')) return APP_VECTOR_SVGS.protonup;
  if (cleanId.includes('goverlay') || cleanName.includes('goverlay')) return APP_VECTOR_SVGS.goverlay;
  if (cleanId.includes('cachyos') || cleanName.includes('cachyos')) return APP_VECTOR_SVGS.cachyos;
  if (cleanId.includes('wine') || cleanName.includes('wine') || cleanId.includes('winetricks') || cleanName.includes('protontricks')) return APP_VECTOR_SVGS.wine;
  if (cleanId.includes('whatsapp') || cleanName.includes('whatsapp')) return APP_VECTOR_SVGS.whatsapp;
  if (cleanId.includes('youtube') || cleanName.includes('youtube')) return APP_VECTOR_SVGS.youtube;
  if (cleanId.includes('powerpoint') || cleanName.includes('powerpoint')) return APP_VECTOR_SVGS.powerpoint;
  if (cleanId.includes('word') || cleanName.includes('word')) return APP_VECTOR_SVGS.word;
  if (cleanId.includes('slides') || cleanName.includes('slides')) return APP_VECTOR_SVGS.slides;
  if (cleanId.includes('proteus') || cleanName.includes('proteus') || cleanName.includes('ares') || cleanName.includes('isis') || cleanName.includes('vsm')) return APP_VECTOR_SVGS.proteus;
  if (cleanId.includes('deepseek') || cleanId.includes('open-webui') || cleanId.includes('claude') || cleanId.includes('opencode')) return APP_VECTOR_SVGS.ai_brain;
  if (cleanName.includes('wreckfest') || cleanName.includes('drift legends') || cleanName.includes('call of duty') || cleanName.includes('game')) return APP_VECTOR_SVGS.gamepad;

  // 2. System & Hardware Specific Matches
  if (cleanId.includes('konsole') || cleanId.includes('terminal') || cleanName.includes('terminal') || cleanName.includes('console') || cleanName.includes('micro') || cleanName.includes('btop')) {
    return CATEGORY_SVGS.terminal;
  }
  if (cleanId.includes('nvidia') || cleanName.includes('nvidia') || cleanId.includes('gpu')) {
    return CATEGORY_SVGS.nvidia;
  }
  if (cleanId.includes('partition') || cleanId.includes('disk') || cleanName.includes('disk') || cleanName.includes('partition') || cleanName.includes('btrfs')) {
    return CATEGORY_SVGS.disk;
  }
  if (cleanId.includes('display') || cleanId.includes('screen') || cleanName.includes('display') || cleanName.includes('screen') || cleanId.includes('monitor') || cleanId.includes('kscreen')) {
    return CATEGORY_SVGS.display;
  }
  if (cleanId.includes('power') || cleanId.includes('energy') || cleanName.includes('power') || cleanName.includes('energy') || cleanId.includes('battery') || cleanId.includes('powerdevil')) {
    return CATEGORY_SVGS.power;
  }
  if (cleanId.includes('wallet') || cleanId.includes('auth') || cleanId.includes('keyring') || cleanId.includes('password') || cleanId.includes('pinentry') || cleanName.includes('wallet') || cleanName.includes('policykit')) {
    return CATEGORY_SVGS.lock;
  }
  if (cleanId.includes('keyboard') || cleanId.includes('key') || cleanName.includes('keyboard') || cleanName.includes('shortcut')) {
    return CATEGORY_SVGS.keyboard;
  }
  if (cleanId.includes('mouse') || cleanName.includes('mouse') || cleanId.includes('touchpad')) {
    return CATEGORY_SVGS.mouse;
  }
  if (cleanId.includes('driver') || cleanName.includes('driver') || cleanName.includes('usb') || cleanName.includes('bonjour')) {
    return CATEGORY_SVGS.driver;
  }
  if (cleanId.includes('access') || cleanName.includes('accessibility')) {
    return CATEGORY_SVGS.accessibility;
  }
  if (cleanId.includes('search') || cleanName.includes('search') || cleanId.includes('find') || cleanId.includes('baloo')) {
    return CATEGORY_SVGS.search;
  }
  if (cleanId.includes('info') || cleanId.includes('about') || cleanName.includes('about') || cleanName.includes('info') || cleanId.includes('kinfocenter')) {
    return CATEGORY_SVGS.info;
  }
  if (cleanId.includes('kde') || cleanId.includes('plasma') || cleanName.includes('kde') || cleanId.includes('kdialog') || cleanId.includes('kmenu')) {
    return CATEGORY_SVGS.kde;
  }
  if (cleanId.includes('settings') || cleanName.includes('settings') || cleanId.includes('kcm_') || cleanId.includes('config') || cleanCat.includes('settings')) {
    return CATEGORY_SVGS.settings;
  }
  if (cleanCat.includes('multimedia') || cleanCat.includes('audio') || cleanCat.includes('video') || cleanName.includes('haruna') || cleanName.includes('mpv')) {
    return CATEGORY_SVGS.multimedia;
  }
  if (cleanCat.includes('development') || cleanCat.includes('programming') || cleanId.includes('protoflow') || cleanName.includes('meld') || cleanName.includes('kicad')) {
    return CATEGORY_SVGS.dev;
  }
  if (cleanCat.includes('internet') || cleanCat.includes('network') || cleanCat.includes('web') || cleanName.includes('browser') || cleanName.includes('animepahe')) {
    return CATEGORY_SVGS.internet;
  }
  if (cleanCat.includes('office') || cleanCat.includes('document') || cleanName.includes('libreoffice')) {
    return CATEGORY_SVGS.office;
  }

  return CATEGORY_SVGS.generic;
}
