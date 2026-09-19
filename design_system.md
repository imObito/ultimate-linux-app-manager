# XENO Design System — Uninstaller Utility Spec

## 1. Design Philosophy
- **High Information Density**: System utility first, not a marketing landing page. Structured tables, compact metadata, collapsible inspector panels.
- **XENO Amber Accent**: Restrained dark matte surfaces with precise XENO Gold/Amber highlights (`#f59e0b` / `#fbbf24`).
- **Zero AI-Glow Clutter**: No psychedelic gradients, no oversized bubbly cards, no useless decorative shadows.
- **Collapsible / Hideable Panels**: Both Sidebar navigation and App Inspector panel are toggleable with smooth spring/cubic-bezier drawer transitions.

---

## 2. Color Palette Tokens

```css
:root {
  /* Backgrounds */
  --bg-app: #0c0d0e;
  --bg-sidebar: #111315;
  --bg-surface: #16181b;
  --bg-surface-elevated: #1e2126;
  --bg-surface-hover: #262a30;
  --bg-surface-active: #2f343c;

  /* Borders & Dividers */
  --border-subtle: rgba(255, 255, 255, 0.07);
  --border-medium: rgba(255, 255, 255, 0.12);
  --border-focus: rgba(245, 158, 11, 0.4);

  /* Typography */
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --text-muted: #6b7280;
  --text-disabled: #4b5563;

  /* XENO Accent (Amber/Gold) */
  --accent-primary: #f59e0b;
  --accent-secondary: #d97706;
  --accent-subtle: rgba(245, 158, 11, 0.12);
  --accent-hover: #fbbf24;

  /* Semantic Feedback */
  --color-success: #10b981;
  --color-success-subtle: rgba(16, 185, 129, 0.12);
  --color-warning: #f59e0b;
  --color-warning-subtle: rgba(245, 158, 11, 0.12);
  --color-danger: #ef4444;
  --color-danger-subtle: rgba(239, 68, 68, 0.12);
  --color-info: #06b6d4;
  --color-info-subtle: rgba(6, 182, 212, 0.12);

  /* Elevation & Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.6);
  --shadow-modal: 0 20px 40px rgba(0, 0, 0, 0.85);

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-full: 9999px;

  /* Spacing Scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;

  /* Transitions & Animation Curves */
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --transition-fast: 150ms var(--ease-spring);
  --transition-normal: 240ms var(--ease-spring);
  --transition-panel: 320ms cubic-bezier(0.2, 0.9, 0.3, 1);
}
```

---

## 3. Typography & Hierarchy
- **Font Stack**: System UI / Inter, Segoe UI, Roboto, Ubuntu, Cantarell, sans-serif. Monospace for paths and package IDs (`JetBrains Mono`, `Fira Code`, monospace).
- **Type Scale**:
  - Display / Title: `15px`, 600 weight (No oversized 32px titles in desktop utilities)
  - Heading: `13px`, 600 weight, uppercase with subtle letter-spacing for section headers
  - Body: `13px`, 400 weight, regular text
  - Secondary / Meta: `12px`, 400 weight, secondary color
  - Badge / Micro: `11px`, 500 weight
  - Monospace Data: `12px`, 400 weight, for paths, sizes, versions

---

## 4. Component Patterns
1. **Layout**:
   - Header Bar: Window controls, Global search (`Ctrl+F`), Quick filter pills, Refresh button, Panel toggles.
   - Collapsible Left Navigation (Sidebar): Category filters, Provider filters (Pacman, Flatpak, Snap, AppImage), History, Settings.
   - Center Data Grid / List: Dense table with columns (App Name & Icon, Category, Source, Version, Size, Action Trigger).
   - Collapsible Right Inspector: Detailed package forensic tree (Exec path, dependencies, reverse deps, residual folders breakdown).
2. **Modal / Drawer Dialogs**:
   - Uninstall Preview Modal: Displays itemized list of components to remove, warnings for shared libraries, total disk space freed, and confirmation safety button.
3. **Animations**:
   - Smooth slide-out / collapse for sidebar and inspector.
   - Micro-state transitions on table hover and badge pills.
