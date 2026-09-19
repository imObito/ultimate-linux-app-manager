import sys
import os
import subprocess
from PyQt6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
    QLineEdit, QScrollArea, QLabel, QPushButton, QGridLayout,
    QSplitter, QFrame, QMessageBox, QDialog, QCheckBox, QGraphicsDropShadowEffect
)
from PyQt6.QtCore import Qt, QThread, pyqtSignal, QSize
from PyQt6.QtGui import QFont, QColor, QKeySequence, QShortcut, QPalette, QCursor

from core.scanner import scan_all_desktop_apps, scan_pacman_packages, scan_flatpak_apps
from core.safety.safety import PROTECTED_SYSTEM_PACKAGES, SafetyValidator

class ScanWorker(QThread):
    finished = pyqtSignal(list)

    def run(self):
        desktop_apps = scan_all_desktop_apps()
        flatpaks = scan_flatpak_apps()
        pacman_pkgs = scan_pacman_packages()

        all_items = []
        desktop_ids = {d['id'].lower() for d in desktop_apps}

        # 1. Desktop & WebApps
        for d in desktop_apps:
            all_items.append({
                'id': d['id'],
                'name': d['name'],
                'source': d['source'].upper(),
                'category': d['category'],
                'version': d.get('version', 'Installed'),
                'size': d.get('sizeFormatted', '—'),
                'raw': d
            })

        # 2. Flatpaks
        for f in flatpaks:
            if f['id'].lower() not in desktop_ids:
                all_items.append({
                    'id': f['id'],
                    'name': f['name'],
                    'source': 'FLATPAK',
                    'category': f['category'],
                    'version': f['version'],
                    'size': f['sizeFormatted'],
                    'raw': f
                })

        # 3. Pacman packages
        for p in pacman_pkgs:
            all_items.append({
                'id': p['id'],
                'name': p['name'],
                'source': 'PACMAN',
                'category': p['category'],
                'version': p['version'],
                'size': p['sizeFormatted'],
                'raw': p
            })

        self.finished.emit(all_items)

class ModernAppCard(QFrame):
    clicked = pyqtSignal(dict)

    def __init__(self, item, is_selected=False, parent=None):
        super().__init__(parent)
        self.item = item
        self.is_selected = is_selected
        self.setObjectName("AppCard")
        if is_selected:
            self.setProperty("selected", True)
        self.setCursor(QCursor(Qt.CursorShape.PointingHandCursor))
        self.init_ui()

    def init_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(14, 14, 14, 14)
        layout.setSpacing(10)

        # Header Row: Icon + Name + Tag
        header = QHBoxLayout()
        header.setSpacing(10)

        initials = self.item['name'][:2].upper()
        icon_box = QLabel(initials)
        icon_box.setObjectName("CardIconBox")
        icon_box.setFixedSize(38, 38)
        icon_box.setAlignment(Qt.AlignmentFlag.AlignCenter)

        title_box = QVBoxLayout()
        title_box.setSpacing(2)
        title_lbl = QLabel(self.item['name'])
        title_lbl.setObjectName("CardTitle")
        id_lbl = QLabel(self.item['id'])
        id_lbl.setObjectName("CardId")
        title_box.addWidget(title_lbl)
        title_box.addWidget(id_lbl)

        src_tag = QLabel(self.item['source'])
        src_tag.setObjectName(f"Tag_{self.item['source']}")
        src_tag.setAlignment(Qt.AlignmentFlag.AlignCenter)

        header.addWidget(icon_box)
        header.addLayout(title_box, 1)
        header.addWidget(src_tag)
        layout.addLayout(header)

        # Description / Details
        desc_text = self.item['raw'].get('comment') or self.item['raw'].get('description') or f"Installed {self.item['source']} package"
        desc_lbl = QLabel(desc_text)
        desc_lbl.setObjectName("CardDesc")
        desc_lbl.setWordWrap(True)
        desc_lbl.setFixedHeight(32)
        layout.addWidget(desc_lbl)

        # Footer Meta
        footer = QHBoxLayout()
        cat_badge = QLabel(self.item['category'])
        cat_badge.setObjectName("CardCategoryBadge")
        size_lbl = QLabel(self.item['size'])
        size_lbl.setObjectName("CardSize")

        footer.addWidget(cat_badge)
        footer.addStretch()
        footer.addWidget(size_lbl)
        layout.addLayout(footer)

    def mousePressEvent(self, event):
        self.clicked.emit(self.item)
        super().mousePressEvent(event)

class XenoUninstallerWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("XENO Uninstaller — Elite Software Manager")
        self.resize(1420, 880)
        self.items = []
        self.filtered_items = []
        self.selected_item = None
        
        self.init_ui()
        self.apply_theme()
        self.refresh_data()

    def init_ui(self):
        central = QWidget()
        central.setObjectName("CentralWidget")
        self.setCentralWidget(central)
        main_layout = QVBoxLayout(central)
        main_layout.setContentsMargins(0, 0, 0, 0)
        main_layout.setSpacing(0)

        # Top Command Bar
        header = QFrame()
        header.setObjectName("HeaderBar")
        header.setFixedHeight(56)
        header_layout = QHBoxLayout(header)
        header_layout.setContentsMargins(20, 0, 20, 0)
        header_layout.setSpacing(14)

        self.btn_toggle_sidebar = QPushButton("☰")
        self.btn_toggle_sidebar.setObjectName("HeaderIconBtn")
        self.btn_toggle_sidebar.setToolTip("Toggle Sidebar (Ctrl+B)")
        self.btn_toggle_sidebar.setFixedSize(34, 34)
        self.btn_toggle_sidebar.clicked.connect(self.toggle_sidebar)

        brand_badge = QLabel("XENO")
        brand_badge.setObjectName("BrandBadge")
        brand_title = QLabel("UNINSTALLER")
        brand_title.setObjectName("BrandTitle")

        self.search_input = QLineEdit()
        self.search_input.setObjectName("SearchInput")
        self.search_input.setFixedHeight(36)
        self.search_input.setPlaceholderText("Search installed applications, browsers, webapps, pacman packages... (Ctrl+F)")
        self.search_input.textChanged.connect(self.filter_items)

        self.btn_refresh = QPushButton("↻ Refresh")
        self.btn_refresh.setObjectName("HeaderBtn")
        self.btn_refresh.setFixedHeight(36)
        self.btn_refresh.clicked.connect(self.refresh_data)

        self.btn_toggle_inspector = QPushButton("Inspector ◨")
        self.btn_toggle_inspector.setObjectName("HeaderBtn")
        self.btn_toggle_inspector.setFixedHeight(36)
        self.btn_toggle_inspector.setCheckable(True)
        self.btn_toggle_inspector.setChecked(True)
        self.btn_toggle_inspector.clicked.connect(self.toggle_inspector)

        header_layout.addWidget(self.btn_toggle_sidebar)
        header_layout.addWidget(brand_badge)
        header_layout.addWidget(brand_title)
        header_layout.addSpacing(16)
        header_layout.addWidget(self.search_input, 1)
        header_layout.addSpacing(10)
        header_layout.addWidget(self.btn_refresh)
        header_layout.addWidget(self.btn_toggle_inspector)

        main_layout.addWidget(header)

        # 3-Column Splitter
        self.splitter = QSplitter(Qt.Orientation.Horizontal)
        self.splitter.setObjectName("MainSplitter")
        self.splitter.setHandleWidth(1)

        # 1. Left Sidebar
        self.sidebar = QFrame()
        self.sidebar.setObjectName("Sidebar")
        self.sidebar.setFixedWidth(240)
        sidebar_layout = QVBoxLayout(self.sidebar)
        sidebar_layout.setContentsMargins(12, 16, 12, 16)
        sidebar_layout.setSpacing(4)

        sec_title = QLabel("CATEGORIES & SOURCES")
        sec_title.setObjectName("SectionHeader")
        sidebar_layout.addWidget(sec_title)

        self.filter_buttons = []
        filter_specs = [
            ("All Installed Software", "ALL", "📦"),
            ("Desktop Applications", "DESKTOP", "🖥️"),
            ("WebApps & PWAs", "WEBAPP", "🌐"),
            ("Internet & Browsers", "CAT_INTERNET", "🌍"),
            ("Multimedia & Audio", "CAT_MULTIMEDIA", "🎵"),
            ("Development & Tools", "CAT_DEV", "💻"),
            ("Games & Emulators", "CAT_GAMES", "🎮"),
            ("Office & Productivity", "CAT_OFFICE", "📄"),
            ("Flatpak Apps", "FLATPAK", "📦"),
            ("AppImages", "APPIMAGE", "🚀"),
            ("Wine / Windows", "WINE", "🍷"),
            ("Pacman Packages", "PACMAN", "⚙️")
        ]

        self.current_filter = "ALL"
        for label, code, icon in filter_specs:
            btn = QPushButton(f"{icon}  {label}")
            btn.setObjectName("NavBtn")
            btn.setFixedHeight(34)
            btn.setCheckable(True)
            if code == "ALL":
                btn.setChecked(True)
            btn.clicked.connect(lambda checked, c=code, b=btn: self.set_filter(c, b))
            self.filter_buttons.append(btn)
            sidebar_layout.addWidget(btn)

        sidebar_layout.addStretch()

        # 2. Center Cards Deck
        center_widget = QWidget()
        center_widget.setObjectName("CenterDeck")
        center_layout = QVBoxLayout(center_widget)
        center_layout.setContentsMargins(0, 0, 0, 0)
        center_layout.setSpacing(0)

        # Toolbar
        toolbar = QFrame()
        toolbar.setObjectName("ToolBar")
        toolbar.setFixedHeight(40)
        tb_layout = QHBoxLayout(toolbar)
        tb_layout.setContentsMargins(20, 0, 20, 0)

        self.lbl_summary = QLabel("Scanning software inventory...")
        self.lbl_summary.setObjectName("SummaryLabel")
        tb_layout.addWidget(self.lbl_summary)
        tb_layout.addStretch()

        center_layout.addWidget(toolbar)

        # Scrollable Cards Grid Area
        self.scroll_area = QScrollArea()
        self.scroll_area.setObjectName("CardsScrollArea")
        self.scroll_area.setWidgetResizable(True)
        self.scroll_area.setFrameShape(QFrame.Shape.NoFrame)

        self.grid_container = QWidget()
        self.grid_container.setObjectName("GridContainer")
        self.grid_layout = QGridLayout(self.grid_container)
        self.grid_layout.setContentsMargins(20, 20, 20, 20)
        self.grid_layout.setSpacing(14)
        self.scroll_area.setWidget(self.grid_container)

        center_layout.addWidget(self.scroll_area)

        # 3. Right Slide-out Inspector
        self.inspector = QFrame()
        self.inspector.setObjectName("InspectorSheet")
        self.inspector.setFixedWidth(400)
        self.inspector_layout = QVBoxLayout(self.inspector)
        self.inspector_layout.setContentsMargins(20, 20, 20, 20)
        self.inspector_layout.setSpacing(14)

        insp_header = QLabel("FORENSIC INSPECTOR")
        insp_header.setObjectName("SectionHeader")
        self.inspector_layout.addWidget(insp_header)

        self.inspector_content = QLabel("Select any application card to inspect complete package dependencies, paths, and sandbox status.")
        self.inspector_content.setWordWrap(True)
        self.inspector_content.setObjectName("InspectorText")
        self.inspector_layout.addWidget(self.inspector_content)
        self.inspector_layout.addStretch()

        self.btn_uninstall = QPushButton("Uninstall Selected")
        self.btn_uninstall.setObjectName("BtnDangerMain")
        self.btn_uninstall.setFixedHeight(44)
        self.btn_uninstall.setEnabled(False)
        self.btn_uninstall.clicked.connect(self.on_uninstall_clicked)
        self.inspector_layout.addWidget(self.btn_uninstall)

        self.splitter.addWidget(self.sidebar)
        self.splitter.addWidget(center_widget)
        self.splitter.addWidget(self.inspector)
        self.splitter.setCollapsible(0, True)
        self.splitter.setCollapsible(2, True)

        main_layout.addWidget(self.splitter)

        # Shortcuts
        QShortcut(QKeySequence("Ctrl+F"), self, self.search_input.setFocus)
        QShortcut(QKeySequence("Ctrl+B"), self, self.toggle_sidebar)
        QShortcut(QKeySequence("Ctrl+I"), self, self.toggle_inspector)

    def toggle_sidebar(self):
        self.sidebar.setVisible(not self.sidebar.isVisible())

    def toggle_inspector(self):
        is_vis = not self.inspector.isVisible()
        self.inspector.setVisible(is_vis)
        self.btn_toggle_inspector.setChecked(is_vis)

    def set_filter(self, code, sender_btn):
        for b in self.filter_buttons:
            b.setChecked(False)
        sender_btn.setChecked(True)
        self.current_filter = code
        self.filter_items()

    def refresh_data(self):
        self.lbl_summary.setText("Refreshing software inventory...")
        self.worker = ScanWorker()
        self.worker.finished.connect(self.on_scan_finished)
        self.worker.start()

    def on_scan_finished(self, items):
        self.items = items
        self.filter_items()

    def filter_items(self):
        query = self.search_input.text().lower().strip()
        self.filtered_items = []

        for item in self.items:
            src = item['source']
            cat = item['category'].lower()

            if self.current_filter != "ALL":
                if self.current_filter == "DESKTOP" and src not in ["NATIVE", "DESKTOP"]:
                    continue
                elif self.current_filter == "WEBAPP" and src != "WEBAPP":
                    continue
                elif self.current_filter == "CAT_INTERNET" and "internet" not in cat and "network" not in cat:
                    continue
                elif self.current_filter == "CAT_MULTIMEDIA" and "multimedia" not in cat and "audio" not in cat and "video" not in cat:
                    continue
                elif self.current_filter == "CAT_DEV" and "development" not in cat:
                    continue
                elif self.current_filter == "CAT_GAMES" and "game" not in cat:
                    continue
                elif self.current_filter == "CAT_OFFICE" and "office" not in cat:
                    continue
                elif self.current_filter == "FLATPAK" and src != "FLATPAK":
                    continue
                elif self.current_filter == "APPIMAGE" and src != "APPIMAGE":
                    continue
                elif self.current_filter == "WINE" and src != "WINE":
                    continue
                elif self.current_filter == "PACMAN" and src != "PACMAN":
                    continue

            if query:
                name_m = query in item['name'].lower()
                id_m = query in item['id'].lower()
                cat_m = query in item['category'].lower()
                if not (name_m or id_m or cat_m):
                    continue

            self.filtered_items.append(item)

        self.populate_cards()

    def populate_cards(self):
        # Clear existing cards in grid
        while self.grid_layout.count():
            item = self.grid_layout.takeAt(0)
            widget = item.widget()
            if widget:
                widget.deleteLater()

        self.lbl_summary.setText(f"Showing {len(self.filtered_items)} of {len(self.items)} installed applications")

        cols = 3
        # Render top 120 items at a time for maximum rendering performance
        display_items = self.filtered_items[:120]

        for idx, app_item in enumerate(display_items):
            row = idx // cols
            col = idx % cols
            is_selected = (self.selected_item and self.selected_item['id'] == app_item['id'])
            card = ModernAppCard(app_item, is_selected)
            card.clicked.connect(self.on_card_selected)
            self.grid_layout.addWidget(card, row, col)

        if not self.selected_item and self.filtered_items:
            self.on_card_selected(self.filtered_items[0])

    def on_card_selected(self, item):
        self.selected_item = item
        raw = item['raw']

        is_protected = item['id'].lower() in PROTECTED_SYSTEM_PACKAGES
        self.btn_uninstall.setEnabled(not is_protected)
        self.btn_uninstall.setText(f"Uninstall {item['name']}" if not is_protected else "System Protected")

        initials = item['name'][:2].upper()

        info_lines = [
            f"<div style='margin-bottom:12px;'>",
            f"<span style='color:#f59e0b; font-size:10px; font-weight:800; letter-spacing:1px;'>{item['source']}</span>",
            f"<h2 style='color:#ffffff; margin:4px 0 2px 0; font-size:18px; font-weight:700;'>{item['name']}</h2>",
            f"<code style='color:#9ca3af; font-size:11px;'>{item['id']}</code>",
            f"</div>",
            f"<div style='border-top:1px solid rgba(255,255,255,0.08); padding-top:12px;'>",
            f"<b>Category:</b> {item['category']}<br>",
            f"<b>Version:</b> {item['version']}<br>",
            f"<b>Installed Size:</b> {item['size']}<br>"
        ]

        if 'desktopFile' in raw:
            info_lines.append(f"<b>Desktop Entry:</b><br><code style='color:#9ca3af; font-size:10px;'>{raw['desktopFile']}</code><br>")
        if 'exec' in raw:
            info_lines.append(f"<b>Launch Command:</b><br><code style='color:#9ca3af; font-size:10px;'>{raw['exec']}</code><br>")
        if 'comment' in raw and raw['comment']:
            info_lines.append(f"<b>Description:</b><br>{raw['comment']}<br>")
        if 'depends' in raw and raw['depends']:
            info_lines.append(f"<b>Dependencies ({len(raw['depends'])}):</b><br><code style='color:#9ca3af; font-size:10px;'>{', '.join(raw['depends'][:8])}</code><br>")
        if 'requiredBy' in raw and raw['requiredBy']:
            info_lines.append(f"<b>Required By ({len(raw['requiredBy'])}):</b><br><span style='color:#f59e0b; font-size:11px;'>{', '.join(raw['requiredBy'][:8])}</span><br>")

        if is_protected:
            info_lines.append("<br><div style='background-color:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:6px; padding:8px; color:#ef4444; font-size:11px;'><b>CRITICAL SYSTEM COMPONENT:</b> Removal blocked by XENO safety engine.</div>")

        info_lines.append("</div>")
        self.inspector_content.setText("".join(info_lines))

    def on_uninstall_clicked(self):
        if not self.selected_item:
            return
        item = self.selected_item
        app_id = item['id']

        if app_id.lower() in PROTECTED_SYSTEM_PACKAGES:
            QMessageBox.critical(self, "Safety Block", f"Package '{app_id}' is a protected system component.")
            return

        confirm = QMessageBox.question(
            self,
            "Confirm Forensic Uninstall",
            f"Are you sure you want to uninstall '{item['name']}' ({item['source']})?\n\nThis will safely remove the application package and sandbox leftovers.",
            QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No
        )

        if confirm == QMessageBox.StandardButton.Yes:
            success = False
            error_msg = ""
            
            if item['source'] == 'FLATPAK':
                try:
                    flatpak_id = app_id.replace('.desktop', '')
                    res = subprocess.run(['flatpak', 'uninstall', '-y', '--delete-data', flatpak_id], capture_output=True, text=True)
                    success = (res.returncode == 0)
                    error_msg = res.stderr or res.stdout
                except Exception as e:
                    error_msg = str(e)
            elif item['source'] == 'PACMAN':
                try:
                    cmd = ['pkexec', 'pacman', '-Rns', '--noconfirm', app_id]
                    res = subprocess.run(cmd, capture_output=True, text=True)
                    success = (res.returncode == 0)
                    error_msg = res.stderr or res.stdout
                except Exception as e:
                    error_msg = str(e)
            elif 'desktopFile' in item['raw']:
                try:
                    df = item['raw']['desktopFile']
                    if df.startswith(os.path.expanduser('~')):
                        os.remove(df)
                        success = True
                    else:
                        res = subprocess.run(['pkexec', 'rm', '-f', df], capture_output=True, text=True)
                        success = (res.returncode == 0)
                except Exception as e:
                    error_msg = str(e)

            if success:
                QMessageBox.information(self, "Success", f"'{item['name']}' was successfully uninstalled.")
                self.refresh_data()
            else:
                QMessageBox.warning(self, "Uninstall Notice", f"Uninstall finished with status:\n{error_msg or 'Done'}")
                self.refresh_data()

    def apply_theme(self):
        self.setStyleSheet("""
            QMainWindow, QWidget#CentralWidget {
                background-color: #07080a;
                color: #f3f4f6;
            }
            #HeaderBar {
                background-color: #0c0d10;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            }
            #BrandBadge {
                background-color: rgba(245, 158, 11, 0.15);
                color: #f59e0b;
                font-weight: 800;
                font-size: 11px;
                padding: 4px 8px;
                border-radius: 4px;
                border: 1px solid rgba(245, 158, 11, 0.35);
                letter-spacing: 0.5px;
            }
            #BrandTitle {
                color: #ffffff;
                font-weight: 700;
                font-size: 13px;
                letter-spacing: 1px;
            }
            #SearchInput {
                background-color: #111317;
                color: #ffffff;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                padding: 0 14px;
                font-size: 12px;
            }
            #SearchInput:focus {
                border-color: #f59e0b;
                background-color: #16191f;
            }
            #HeaderBtn {
                background-color: #16191f;
                color: #d1d5db;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                padding: 0 14px;
                font-size: 12px;
                font-weight: 600;
            }
            #HeaderBtn:hover {
                background-color: #232833;
                color: #ffffff;
            }
            #HeaderIconBtn {
                background-color: #16191f;
                color: #9ca3af;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                font-size: 14px;
            }
            #Sidebar {
                background-color: #0c0d10;
                border-right: 1px solid rgba(255, 255, 255, 0.07);
            }
            #SectionHeader {
                color: #6b7280;
                font-size: 10px;
                font-weight: 800;
                letter-spacing: 1px;
                margin-bottom: 4px;
                padding-left: 4px;
            }
            #NavBtn {
                text-align: left;
                background-color: transparent;
                color: #9ca3af;
                border: none;
                padding: 0 12px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 500;
            }
            #NavBtn:hover {
                background-color: #16191f;
                color: #f3f4f6;
            }
            #NavBtn:checked {
                background-color: rgba(245, 158, 11, 0.15);
                color: #f59e0b;
                font-weight: 700;
            }
            #CenterDeck {
                background-color: #07080a;
            }
            #ToolBar {
                background-color: #0c0d10;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }
            #SummaryLabel {
                color: #9ca3af;
                font-size: 11px;
                font-weight: 500;
            }
            #GridContainer {
                background-color: #07080a;
            }
            #AppCard {
                background-color: #111317;
                border: 1px solid rgba(255, 255, 255, 0.07);
                border-radius: 10px;
            }
            #AppCard:hover {
                background-color: #16191f;
                border-color: rgba(245, 158, 11, 0.4);
            }
            #AppCard[selected="true"] {
                background-color: #16191f;
                border-color: #f59e0b;
            }
            #CardIconBox {
                background-color: #1c2028;
                color: #f59e0b;
                font-weight: 800;
                font-size: 13px;
                border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.08);
            }
            #CardTitle {
                color: #ffffff;
                font-size: 13px;
                font-weight: 700;
            }
            #CardId {
                color: #6b7280;
                font-size: 10px;
                font-family: monospace;
            }
            #CardDesc {
                color: #9ca3af;
                font-size: 11px;
            }
            #CardCategoryBadge {
                background-color: rgba(255, 255, 255, 0.05);
                color: #d1d5db;
                font-size: 10px;
                padding: 2px 6px;
                border-radius: 4px;
            }
            #CardSize {
                color: #6b7280;
                font-size: 10px;
                font-family: monospace;
            }
            #Tag_PACMAN, #Tag_NATIVE {
                background-color: rgba(59, 130, 246, 0.12);
                color: #60a5fa;
                border: 1px solid rgba(59, 130, 246, 0.3);
                font-size: 9px;
                font-weight: 800;
                padding: 2px 6px;
                border-radius: 4px;
            }
            #Tag_FLATPAK {
                background-color: rgba(168, 85, 247, 0.12);
                color: #c084fc;
                border: 1px solid rgba(168, 85, 247, 0.3);
                font-size: 9px;
                font-weight: 800;
                padding: 2px 6px;
                border-radius: 4px;
            }
            #Tag_WEBAPP {
                background-color: rgba(16, 185, 129, 0.12);
                color: #34d399;
                border: 1px solid rgba(16, 185, 129, 0.3);
                font-size: 9px;
                font-weight: 800;
                padding: 2px 6px;
                border-radius: 4px;
            }
            #Tag_APPIMAGE {
                background-color: rgba(245, 158, 11, 0.12);
                color: #fbbf24;
                border: 1px solid rgba(245, 158, 11, 0.3);
                font-size: 9px;
                font-weight: 800;
                padding: 2px 6px;
                border-radius: 4px;
            }
            #InspectorSheet {
                background-color: #0c0d10;
                border-left: 1px solid rgba(255, 255, 255, 0.08);
            }
            #InspectorText {
                color: #d1d5db;
                font-size: 12px;
                line-height: 1.5;
            }
            #BtnDangerMain {
                background-color: #dc2626;
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-size: 12px;
                font-weight: 700;
            }
            #BtnDangerMain:hover {
                background-color: #ef4444;
            }
            #BtnDangerMain:disabled {
                background-color: #16191f;
                color: #4b5563;
            }
            QScrollBar:vertical {
                background: #07080a;
                width: 8px;
            }
            QScrollBar::handle:vertical {
                background: rgba(255, 255, 255, 0.12);
                border-radius: 4px;
            }
        """)

def main():
    app = QApplication(sys.argv)
    window = XenoUninstallerWindow()
    window.show()
    sys.exit(app.exec())

if __name__ == "__main__":
    main()
