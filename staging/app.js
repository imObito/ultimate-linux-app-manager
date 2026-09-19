(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(t){if(t.ep)return;t.ep=!0;const i=e(t);fetch(t.href,i)}})();const v=[{id:"firefox",name:"Firefox",source:"pacman",category:"Internet",version:"128.0.3-1",sizeBytes:245*1024*1024,sizeFormatted:"245 MB",isUserApp:!0,isSystemProtected:!1,isOrphan:!1,description:"Fast, Private & Safe Web Browser",execPath:"/usr/bin/firefox",dependencies:["gtk3","nss","libpulse","ffmpeg"],reverseDependencies:[],residuals:[{type:"config",path:"~/.mozilla/firefox",sizeFormatted:"18 MB",confidence:"VERIFIED"},{type:"cache",path:"~/.cache/mozilla/firefox",sizeFormatted:"142 MB",confidence:"VERIFIED"},{type:"data",path:"~/.local/share/applications/firefox.desktop",sizeFormatted:"4 KB",confidence:"VERIFIED"}]},{id:"visual-studio-code-bin",name:"Visual Studio Code",source:"pacman",category:"Development",version:"1.92.2-1",sizeBytes:380*1024*1024,sizeFormatted:"380 MB",isUserApp:!0,isSystemProtected:!1,isOrphan:!1,description:"Code editing. Redefined.",execPath:"/usr/bin/code",dependencies:["electron","libxkbfile","gnome-keyring"],reverseDependencies:[],residuals:[{type:"config",path:"~/.config/Code",sizeFormatted:"34 MB",confidence:"VERIFIED"},{type:"cache",path:"~/.cache/vscode-cache",sizeFormatted:"512 MB",confidence:"DETECTED"},{type:"data",path:"~/.vscode/extensions",sizeFormatted:"1.4 GB",confidence:"POSSIBLE"}]},{id:"vlc",name:"VLC Media Player",source:"pacman",category:"Multimedia",version:"3.0.21-2",sizeBytes:112*1024*1024,sizeFormatted:"112 MB",isUserApp:!0,isSystemProtected:!1,isOrphan:!1,description:"Multi-platform MPEG, VCD/DVD, and DivX player",execPath:"/usr/bin/vlc",dependencies:["qt5-base","ffmpeg","liba52","libmad"],reverseDependencies:[],residuals:[{type:"config",path:"~/.config/vlc",sizeFormatted:"2.1 MB",confidence:"VERIFIED"},{type:"cache",path:"~/.cache/vlc",sizeFormatted:"12 MB",confidence:"VERIFIED"}]},{id:"com.discordapp.Discord",name:"Discord",source:"flatpak",category:"Communication",version:"0.0.60",sizeBytes:280*1024*1024,sizeFormatted:"280 MB",isUserApp:!0,isSystemProtected:!1,isOrphan:!1,description:"All-in-one voice and text chat for gamers",execPath:"/var/lib/flatpak/exports/bin/com.discordapp.Discord",dependencies:["org.freedesktop.Platform//23.08"],reverseDependencies:[],residuals:[{type:"config",path:"~/.var/app/com.discordapp.Discord/config/discord",sizeFormatted:"45 MB",confidence:"VERIFIED"},{type:"cache",path:"~/.var/app/com.discordapp.Discord/cache",sizeFormatted:"230 MB",confidence:"VERIFIED"}]},{id:"com.valvesoftware.Steam",name:"Steam",source:"flatpak",category:"Games",version:"1.0.0.79",sizeBytes:850*1024*1024,sizeFormatted:"850 MB",isUserApp:!0,isSystemProtected:!1,isOrphan:!1,description:"Launcher for the Steam software distribution service",execPath:"/var/lib/flatpak/exports/bin/com.valvesoftware.Steam",dependencies:["org.freedesktop.Platform//23.08","org.freedesktop.Platform.Compat.i386//23.08"],reverseDependencies:[],residuals:[{type:"data",path:"~/.var/app/com.valvesoftware.Steam/data/Steam",sizeFormatted:"14.2 GB",confidence:"VERIFIED"},{type:"config",path:"~/.var/app/com.valvesoftware.Steam/config",sizeFormatted:"5.4 MB",confidence:"VERIFIED"}]},{id:"org.libreoffice.LibreOffice",name:"LibreOffice",source:"flatpak",category:"Office",version:"24.2.5.2",sizeBytes:620*1024*1024,sizeFormatted:"620 MB",isUserApp:!0,isSystemProtected:!1,isOrphan:!1,description:"Productivity suite compatible with Microsoft Office",execPath:"/var/lib/flatpak/exports/bin/org.libreoffice.LibreOffice",dependencies:["org.gnome.Platform//46"],reverseDependencies:[],residuals:[{type:"config",path:"~/.var/app/org.libreoffice.LibreOffice/config/libreoffice",sizeFormatted:"1.8 MB",confidence:"VERIFIED"}]},{id:"obs-studio",name:"OBS Studio",source:"pacman",category:"Multimedia",version:"30.2.2-1",sizeBytes:95*1024*1024,sizeFormatted:"95 MB",isUserApp:!0,isSystemProtected:!1,isOrphan:!1,description:"Free and open source software for video recording and live streaming",execPath:"/usr/bin/obs",dependencies:["ffmpeg","qt6-base","pipewire","libxcomposite"],reverseDependencies:[],residuals:[{type:"config",path:"~/.config/obs-studio",sizeFormatted:"14 MB",confidence:"VERIFIED"}]},{id:"kicad",name:"KiCad EDA",source:"pacman",category:"Development",version:"8.0.4-1",sizeBytes:1200*1024*1024,sizeFormatted:"1.2 GB",isUserApp:!0,isSystemProtected:!1,isOrphan:!1,description:"Electronic schematic and PCB design software",execPath:"/usr/bin/kicad",dependencies:["wxwidgets-gtk3","python","opencascade"],reverseDependencies:[],residuals:[{type:"config",path:"~/.config/kicad",sizeFormatted:"8.4 MB",confidence:"VERIFIED"},{type:"cache",path:"~/.cache/kicad",sizeFormatted:"64 MB",confidence:"DETECTED"}]},{id:"linux-cachyos",name:"Linux CachyOS Kernel",source:"pacman",category:"System",version:"7.2.6-1",sizeBytes:180*1024*1024,sizeFormatted:"180 MB",isUserApp:!1,isSystemProtected:!0,isOrphan:!1,description:"The Linux CachyOS kernel and modules with BORE scheduler",execPath:"/boot/vmlinuz-linux-cachyos",dependencies:["coreutils","kmod","initramfs"],reverseDependencies:["nvidia-cachyos","zfs-cachyos"],residuals:[]},{id:"glibc",name:"GNU C Library",source:"pacman",category:"System",version:"2.39-1",sizeBytes:45*1024*1024,sizeFormatted:"45 MB",isUserApp:!1,isSystemProtected:!0,isOrphan:!1,description:"Core GNU C libraries for the entire operating system",execPath:"/usr/lib/libc.so.6",dependencies:["linux-api-headers","tzdata","filesystem"],reverseDependencies:["bash","systemd","coreutils","pacman","firefox","vlc"],residuals:[]},{id:"systemd",name:"systemd init & service manager",source:"pacman",category:"System",version:"256.4-1",sizeBytes:32*1024*1024,sizeFormatted:"32 MB",isUserApp:!1,isSystemProtected:!0,isOrphan:!1,description:"System and Service Manager",execPath:"/usr/lib/systemd/systemd",dependencies:["glibc","libcap","util-linux","shadow"],reverseDependencies:["polkit","dbus","pipewire"],residuals:[]},{id:"gimp",name:"GIMP",source:"appimage",category:"Graphics",version:"2.10.38",sizeBytes:240*1024*1024,sizeFormatted:"240 MB",isUserApp:!0,isSystemProtected:!1,isOrphan:!1,description:"GNU Image Manipulation Program Standalone",execPath:"~/Applications/GIMP-2.10.38-x86_64.AppImage",dependencies:[],reverseDependencies:[],residuals:[{type:"config",path:"~/.config/GIMP/2.10",sizeFormatted:"28 MB",confidence:"VERIFIED"},{type:"cache",path:"~/.cache/gimp",sizeFormatted:"45 MB",confidence:"VERIFIED"}]}],c={all:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',desktop:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>',webapp:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',internet:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>',multimedia:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6v12Z"/><circle cx="12" cy="12" r="10"/></svg>',dev:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',games:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="6"/></svg>',office:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>',flatpak:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/></svg>',appimage:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',wine:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/></svg>',pacman:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>'},x={firefox:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/firefox.svg","visual-studio-code-bin":"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/vscode.svg",code:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/vscode.svg",vlc:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/vlc.svg","com.discordapp.Discord":"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/discord.svg",discord:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/discord.svg","com.valvesoftware.Steam":"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/steam.svg",steam:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/steam.svg","org.libreoffice.LibreOffice":"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/libreoffice.svg",libreoffice:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/libreoffice.svg","obs-studio":"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/obs.svg",obs:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/obs.svg",kicad:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/kicad.svg",gimp:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/gimp.svg",chromium:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/chromium.svg",youtube:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/youtube.svg",whatsapp:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/whatsapp.svg","google-slides":"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-slides.svg",haruna:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/mpv.svg",mpv:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/mpv.svg",rpcs3:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/playstation.svg",pcsx2:"https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/playstation.svg"};function g(f,s){const e=f.toLowerCase().replace(/[^a-z0-9]/g,""),n=s.toLowerCase().replace(/[^a-z0-9]/g,"");for(const[t,i]of Object.entries(x)){const o=t.toLowerCase().replace(/[^a-z0-9]/g,"");if(e.includes(o)||n.includes(o))return i}return`https://cdn.simpleicons.org/${n.split(" ")[0]||"linux"}/f59e0b`}class b{constructor(){this.apps=[],this.selectedApp=null,this.currentFilter="ALL",this.searchQuery="",this.currentSort="name-asc",this.apps=[...v],this.initSidebarNavigation(),this.initEventListeners(),this.render()}initSidebarNavigation(){const s=document.getElementById("nav-categories-container"),e=document.getElementById("nav-sources-container"),n=[{id:"ALL",label:"All Software",icon:c.all},{id:"DESKTOP",label:"Desktop Apps",icon:c.desktop},{id:"WEBAPP",label:"WebApps & PWAs",icon:c.webapp},{id:"CAT_INTERNET",label:"Internet & Web",icon:c.internet},{id:"CAT_MULTIMEDIA",label:"Multimedia & Audio",icon:c.multimedia},{id:"CAT_DEV",label:"Development Tools",icon:c.dev},{id:"CAT_GAMES",label:"Games & Emulators",icon:c.games},{id:"CAT_OFFICE",label:"Office & Productivity",icon:c.office}],t=[{id:"PACMAN",label:"Pacman Native",icon:c.pacman},{id:"FLATPAK",label:"Flatpak Sandbox",icon:c.flatpak},{id:"APPIMAGE",label:"AppImages",icon:c.appimage},{id:"WINE",label:"Windows / Wine",icon:c.wine}];s&&(s.innerHTML=n.map(i=>`
        <button data-filter="${i.id}" class="nav-btn flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all ${i.id==="ALL"?"bg-xeno-gold/15 text-xeno-gold font-semibold shadow-sm border border-xeno-gold/25":""}">
          <div class="flex items-center gap-3">
            <span class="opacity-80">${i.icon}</span>
            <span>${i.label}</span>
          </div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-500" id="badge-${i.id}">0</span>
        </button>
      `).join("")),e&&(e.innerHTML=t.map(i=>`
        <button data-filter="${i.id}" class="nav-btn flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all">
          <div class="flex items-center gap-3">
            <span class="opacity-80">${i.icon}</span>
            <span>${i.label}</span>
          </div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-500" id="badge-${i.id}">0</span>
        </button>
      `).join("")),document.querySelectorAll(".nav-btn").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".nav-btn").forEach(o=>{o.classList.remove("bg-xeno-gold/15","text-xeno-gold","font-semibold","shadow-sm","border","border-xeno-gold/25"),o.classList.add("text-slate-400")}),i.classList.add("bg-xeno-gold/15","text-xeno-gold","font-semibold","shadow-sm","border","border-xeno-gold/25"),i.classList.remove("text-slate-400"),this.currentFilter=i.getAttribute("data-filter")||"ALL",this.renderDeck()})})}initEventListeners(){var m,u,r,h;const s=document.getElementById("global-search-input"),e=document.getElementById("spotlight-dim-overlay");s==null||s.addEventListener("focus",()=>{e==null||e.classList.add("active")}),s==null||s.addEventListener("blur",()=>{e==null||e.classList.remove("active")}),s==null||s.addEventListener("input",a=>{this.searchQuery=a.target.value.trim().toLowerCase(),this.renderDeck()}),e==null||e.addEventListener("click",()=>{s==null||s.blur(),e.classList.remove("active")});const n=document.getElementById("btn-toggle-sidebar"),t=document.getElementById("sidebar-nav");n==null||n.addEventListener("click",()=>{t==null||t.classList.toggle("-ml-64")});const i=document.getElementById("btn-toggle-inspector"),o=document.getElementById("btn-close-sheet"),d=document.getElementById("inspector-sheet"),l=()=>{d==null||d.classList.toggle("hidden")};i==null||i.addEventListener("click",l),o==null||o.addEventListener("click",l);const p=document.getElementById("sort-dropdown");p==null||p.addEventListener("change",()=>{this.currentSort=p.value,this.renderDeck()}),(m=document.getElementById("btn-refresh"))==null||m.addEventListener("click",()=>{this.render()}),window.addEventListener("keydown",a=>{(a.ctrlKey||a.metaKey)&&(a.key.toLowerCase()==="k"||a.key.toLowerCase()==="f")&&(a.preventDefault(),s==null||s.focus(),e==null||e.classList.add("active")),(a.ctrlKey||a.metaKey)&&a.key.toLowerCase()==="b"&&(a.preventDefault(),n==null||n.click()),(a.ctrlKey||a.metaKey)&&a.key.toLowerCase()==="i"&&(a.preventDefault(),i==null||i.click()),a.key==="Escape"&&(s==null||s.blur(),e==null||e.classList.remove("active"),this.closeModal())}),(u=document.getElementById("btn-close-modal"))==null||u.addEventListener("click",()=>this.closeModal()),(r=document.getElementById("btn-modal-cancel"))==null||r.addEventListener("click",()=>this.closeModal()),(h=document.getElementById("btn-modal-confirm"))==null||h.addEventListener("click",()=>this.executeUninstall())}getFilteredApps(){let s=this.apps.filter(e=>{const n=e.source.toUpperCase(),t=e.category.toLowerCase();if(this.currentFilter!=="ALL"&&(this.currentFilter==="DESKTOP"&&n!=="PACMAN"&&n!=="NATIVE"||this.currentFilter==="WEBAPP"&&n!=="WEBAPP"||this.currentFilter==="FLATPAK"&&n!=="FLATPAK"||this.currentFilter==="APPIMAGE"&&n!=="APPIMAGE"||this.currentFilter==="WINE"&&n!=="WINE"||this.currentFilter==="PACMAN"&&n!=="PACMAN"||this.currentFilter==="CAT_INTERNET"&&!t.includes("internet")&&!t.includes("network")||this.currentFilter==="CAT_MULTIMEDIA"&&!t.includes("multimedia")&&!t.includes("audio")&&!t.includes("video")||this.currentFilter==="CAT_DEV"&&!t.includes("development")||this.currentFilter==="CAT_GAMES"&&!t.includes("game")||this.currentFilter==="CAT_OFFICE"&&!t.includes("office")))return!1;if(this.searchQuery){const i=e.name.toLowerCase().includes(this.searchQuery),o=e.id.toLowerCase().includes(this.searchQuery),d=e.category.toLowerCase().includes(this.searchQuery);return i||o||d}return!0});return s.sort((e,n)=>this.currentSort==="name-asc"?e.name.localeCompare(n.name):this.currentSort==="name-desc"?n.name.localeCompare(e.name):this.currentSort==="source"?e.source.localeCompare(n.source):this.currentSort==="category"?e.category.localeCompare(n.category):0),s}updateCounts(){const s={ALL:this.apps.length,DESKTOP:this.apps.filter(e=>e.source==="pacman"||e.isUserApp).length,WEBAPP:this.apps.filter(e=>e.source==="flatpak"||e.category.includes("Web")).length,CAT_INTERNET:this.apps.filter(e=>e.category.toLowerCase().includes("internet")).length,CAT_MULTIMEDIA:this.apps.filter(e=>e.category.toLowerCase().includes("multimedia")).length,CAT_DEV:this.apps.filter(e=>e.category.toLowerCase().includes("development")).length,CAT_GAMES:this.apps.filter(e=>e.category.toLowerCase().includes("game")).length,CAT_OFFICE:this.apps.filter(e=>e.category.toLowerCase().includes("office")).length,PACMAN:this.apps.filter(e=>e.source==="pacman").length,FLATPAK:this.apps.filter(e=>e.source==="flatpak").length,APPIMAGE:this.apps.filter(e=>e.source==="appimage").length,WINE:0};for(const[e,n]of Object.entries(s)){const t=document.getElementById(`badge-${e}`);t&&(t.innerText=n.toString())}}render(){this.updateCounts(),this.renderDeck(),!this.selectedApp&&this.apps.length>0&&this.selectApp(this.apps[0])}renderDeck(){const s=document.getElementById("app-card-grid"),e=document.getElementById("empty-state"),n=document.getElementById("deck-view-title"),t=document.getElementById("deck-view-count");if(!s)return;const i=this.getFilteredApps();if(s.innerHTML="",t&&(t.innerText=`Showing ${i.length} of ${this.apps.length} applications`),n&&(n.innerText=this.currentFilter==="ALL"?"All Installed Software":this.currentFilter.replace("CAT_","")),i.length===0){e==null||e.classList.remove("hidden"),e==null||e.classList.add("flex");return}else e==null||e.classList.add("hidden"),e==null||e.classList.remove("flex");i.forEach((o,d)=>{var a;const l=document.createElement("div"),p=((a=this.selectedApp)==null?void 0:a.id)===o.id,m=Math.min(d*25,250);l.className=`glass-card p-6 cursor-pointer flex flex-col justify-between gap-4 animate-card-enter ${p?"glass-card-selected":""}`,l.style.animationDelay=`${m}ms`;const u=`tag-${o.source.toLowerCase()}`,r=g(o.id,o.name),h=o.name.substring(0,2).toUpperCase();l.innerHTML=`
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center p-2 shadow-inner shrink-0 backdrop-blur-sm overflow-hidden">
              <img src="${r}" alt="${o.name}" class="w-full h-full object-contain" onerror="this.onerror=null; this.parentElement.innerHTML='<span class=\\'font-bold text-xeno-gold text-sm\\'>${h}</span>';" />
            </div>
            <div class="overflow-hidden">
              <h4 class="text-base font-bold text-white tracking-tight truncate">${o.name}</h4>
              <p class="text-[11px] font-mono text-slate-400/90 truncate mt-0.5">${o.id}</p>
            </div>
          </div>
          <span class="capsule-pill ${u} shrink-0">
            ${o.source}
          </span>
        </div>

        <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed font-normal">
          ${o.description||"Linux application package"}
        </p>

        <div class="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
          <span class="bg-white/[0.04] px-2.5 py-1 rounded-md text-slate-300 font-medium text-[11px] border border-white/[0.04]">${o.category}</span>
          <span class="font-mono text-slate-400 text-[11px]">${o.sizeFormatted}</span>
        </div>
      `,l.addEventListener("click",()=>{this.selectApp(o)}),s.appendChild(l)})}selectApp(s){this.selectedApp=s;const e=document.getElementById("ambient-backdrop");e&&(e.className=`glow-${s.source.toLowerCase()}`),this.renderDeck(),this.renderInspector()}renderInspector(){var u;const s=document.getElementById("inspector-body"),e=document.getElementById("btn-action-uninstall"),n=document.getElementById("uninstall-btn-label");if(!s||!this.selectedApp)return;const t=this.selectedApp;e&&(e.disabled=t.isSystemProtected,e.className=`w-full h-12 btn-uninstall-motion ${t.isSystemProtected?"bg-white/[0.04] text-slate-600 border border-white/[0.05]":"bg-rose-600 hover:bg-rose-500 text-white"} font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50`),n&&(n.innerText=t.isSystemProtected?"System Protected (Cannot Remove)":`Uninstall ${t.name}`);const i=g(t.id,t.name),o=t.name.substring(0,2).toUpperCase(),d=Math.round(t.sizeBytes/(1024*1024)),l=Math.min(Math.round(d/1200*100),100),p=Math.min(t.dependencies.length*15,100),m=t.isSystemProtected?100:t.reverseDependencies.length>0?55:98;s.className="flex-1 overflow-y-auto p-6 space-y-6 animate-inspector-refresh",s.innerHTML=`
      <!-- App Header Profile Glass Card -->
      <div class="inspector-glass-card p-5 rounded-2xl space-y-4">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.12] flex items-center justify-center p-2.5 shadow-md shrink-0">
            <img src="${i}" alt="${t.name}" class="w-full h-full object-contain" onerror="this.onerror=null; this.parentElement.innerHTML='<span class=\\'font-extrabold text-xeno-gold text-lg\\'>${o}</span>';" />
          </div>
          <div class="overflow-hidden">
            <h3 class="text-lg font-bold text-white tracking-tight truncate">${t.name}</h3>
            <span class="text-xs font-mono text-slate-400">${t.id}</span>
          </div>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">${t.description}</p>
      </div>

      <!-- 2. FORENSIC TELEMETRY GAUGES -->
      <div class="space-y-3">
        <div class="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase px-1">TELEMETRY & FOOTPRINT</div>
        <div class="inspector-glass-card p-4 rounded-xl space-y-3.5">
          <!-- Disk Footprint Bar -->
          <div>
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-slate-400 font-medium">Disk Footprint</span>
              <span class="font-mono text-xeno-gold font-bold">${t.sizeFormatted}</span>
            </div>
            <div class="telemetry-bar-bg">
              <div class="telemetry-bar-fill bg-gradient-to-r from-amber-500 to-yellow-400" style="width: ${l}%"></div>
            </div>
          </div>

          <!-- Dependency Weight Bar -->
          <div>
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-slate-400 font-medium">Dependency Footprint</span>
              <span class="font-mono text-cyan-400 font-bold">${t.dependencies.length} Packages</span>
            </div>
            <div class="telemetry-bar-bg">
              <div class="telemetry-bar-fill bg-gradient-to-r from-blue-500 to-cyan-400" style="width: ${p}%"></div>
            </div>
          </div>

          <!-- Safety Confidence Metric -->
          <div>
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-slate-400 font-medium">Safety Score</span>
              <span class="font-mono ${t.isSystemProtected?"text-rose-400":"text-emerald-400"} font-bold">${m}% Confidence</span>
            </div>
            <div class="telemetry-bar-bg">
              <div class="telemetry-bar-fill ${t.isSystemProtected?"bg-rose-500":"bg-emerald-400"}" style="width: ${m}%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Metadata Telemetry Matrix -->
      <div class="space-y-2.5">
        <div class="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase px-1">PACKAGE METRICS</div>
        <div class="inspector-glass-card rounded-xl divide-y divide-white/[0.05] text-xs">
          <div class="flex items-center justify-between p-3"><span class="text-slate-400">Source Provider</span><span class="font-bold text-xeno-gold uppercase">${t.source}</span></div>
          <div class="flex items-center justify-between p-3"><span class="text-slate-400">Classification</span><span class="text-slate-200">${t.category}</span></div>
          <div class="flex items-center justify-between p-3"><span class="text-slate-400">Release Version</span><span class="font-mono text-slate-200">${t.version}</span></div>
        </div>
      </div>

      <!-- Executable & System Targets -->
      <div class="space-y-2.5">
        <div class="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase px-1">SYSTEM TARGETS</div>
        <div class="inspector-glass-card p-4 rounded-xl space-y-2 text-xs">
          <div>
            <span class="text-slate-400 text-[11px]">Launch Executable:</span>
            <div class="mt-1.5 font-mono text-[11px] text-slate-200 bg-black/40 px-3 py-2 rounded-lg border border-white/[0.08] break-all select-text">
              ${t.execPath}
            </div>
          </div>
        </div>
      </div>

      <!-- Direct Dependencies -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between px-1">
          <span class="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">DIRECT DEPENDENCIES</span>
          <span class="text-[10px] font-mono text-slate-500">${t.dependencies.length} packages</span>
        </div>
        <div class="space-y-1.5 max-h-36 overflow-y-auto">
          ${t.dependencies.length>0?t.dependencies.map(r=>`
                <div class="flex items-center justify-between p-2.5 bg-white/[0.02] hover:bg-white/[0.04] rounded-lg border border-white/[0.04] text-xs transition-colors">
                  <span class="font-mono text-slate-300 text-[11px]">${r}</span>
                  <span class="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">Required</span>
                </div>
              `).join(""):'<div class="text-xs text-slate-500 p-2.5">No required dependencies</div>'}
        </div>
      </div>

      <!-- Residuals Footprint Breakdown -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between px-1">
          <span class="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">RESIDUAL FOOTPRINT</span>
          <span class="text-[10px] font-mono text-slate-500">${t.residuals.length} targets</span>
        </div>
        <div class="space-y-2">
          ${t.residuals.length>0?t.residuals.map(r=>`
                <div class="p-3 bg-white/[0.02] rounded-xl border border-white/[0.05] flex items-center justify-between text-xs">
                  <div>
                    <div class="font-mono text-[11px] text-slate-200 select-text">${r.path}</div>
                    <div class="text-[10px] text-slate-500 uppercase mt-0.5">${r.type} • ${r.sizeFormatted}</div>
                  </div>
                  <span class="capsule-pill ${r.confidence==="VERIFIED"?"text-emerald-300 bg-emerald-500/10 border-emerald-500/30":"text-amber-300 bg-amber-500/10 border-amber-500/30"}">
                    ${r.confidence}
                  </span>
                </div>
              `).join(""):'<div class="text-xs text-slate-500 p-3">No residual directories detected</div>'}
        </div>
      </div>
    `,(u=document.getElementById("btn-action-uninstall"))==null||u.addEventListener("click",()=>{this.openUninstallModal(t)})}openUninstallModal(s){if(s.isSystemProtected)return;const e=document.getElementById("uninstall-modal"),n=document.getElementById("modal-app-title"),t=document.getElementById("modal-plan-content");if(n&&(n.innerText=`${s.name} (${s.id})`),t){const i=s.residuals.map((o,d)=>`
        <label class="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-pointer hover:bg-white/[0.06] transition-colors">
          <input type="checkbox" checked id="chk-res-${d}" class="mt-0.5 accent-xeno-gold rounded" />
          <div class="overflow-hidden">
            <div class="font-mono text-slate-200 text-[11px] truncate">${o.path}</div>
            <div class="text-[10px] text-slate-500 uppercase mt-0.5">${o.type} • ${o.sizeFormatted} (Confidence: ${o.confidence})</div>
          </div>
        </label>
      `).join("");t.innerHTML=`
        <div class="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between">
          <div>
            <div class="font-bold text-white text-xs">Main Application Package</div>
            <div class="text-[11px] text-slate-400 font-mono mt-0.5">${s.source.toUpperCase()} • ${s.version}</div>
          </div>
          <span class="font-mono text-slate-200 font-bold">${s.sizeFormatted}</span>
        </div>

        <div>
          <div class="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase mb-2">RESIDUAL USER DATA & CACHE CLEANUP</div>
          <div class="space-y-2">
            ${i||'<div class="text-xs text-slate-500">No leftover folders detected.</div>'}
          </div>
        </div>

        <div class="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl flex items-center gap-2.5 text-emerald-400 text-xs font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span>Safety validation passed. System core files protected.</span>
        </div>
      `}e==null||e.classList.remove("hidden"),e==null||e.classList.add("flex")}closeModal(){const s=document.getElementById("uninstall-modal");s==null||s.classList.add("hidden"),s==null||s.classList.remove("flex")}executeUninstall(){if(!this.selectedApp)return;const s=this.selectedApp.id;this.apps=this.apps.filter(e=>e.id!==s),this.closeModal(),this.selectedApp=this.apps[0]||null,this.render()}}window.addEventListener("DOMContentLoaded",()=>{new b});
