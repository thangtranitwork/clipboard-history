# Gnome Clipboard History

[Gnome Clipboard History](https://github.com/thangtranitwork/clipboard-history) is an enhanced clipboard manager GNOME Shell extension created by **Trần Đoàn Xuân Thắng**. It saves text and image items you've copied into an easily accessible, searchable, screen-centered history panel.

---

## Key Features

- 📸 **Direct Image Capture Support**: Automatically captures and thumbnails PNG/JPEG image content copied to the clipboard.
- 🎯 **Centered Command Palette Layout**: Screen-centered overlay panel for fast navigation.
- 🕒 **Timestamps & Last Paste Tracker**: Real-time copy timestamps (`HH:mm`) on items and dynamic tracking of your last pasted item (`Lần cuối paste: HH:mm:ss`).
- 📄 **Pagination & Status Indicator**: Clear page counter (`Trang 1/N`) with active/disabled state feedback on Previous and Next buttons.
- 🎨 **Modern Dark Glassmorphism Design**: Sleek dark UI with smooth hover highlights and rounded corners.
- 🔍 **Fast Regex Search**: Instant searching across clipboard entries.

---

## Tips & Shortcuts

![Tutorial screenshot](tutorial-screenshot.png)

- Open the panel from anywhere with <kbd>Super</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd>.
- Modify shortcuts in settings or delete them by hitting backspace while editing a shortcut.
- Use `Private mode` to temporarily stop processing copied items.
- Use keyboard shortcuts while the panel is open:
  - <kbd>Ctrl</kbd> + <kbd>N</kbd> where `N` is a number from 1 to 9 to select the Nth non-favorited entry.
  - <kbd>Super</kbd> + <kbd>Ctrl</kbd> + <kbd>N</kbd> where `N` is a number from 1 to 9 to select the Nth favorited entry.
  - <kbd>Ctrl</kbd> + <kbd>p/n</kbd> to navigate to the previous/next page.
  - <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>S</kbd> to open settings.
  - <kbd>/</kbd> to search.
  - <kbd>F</kbd> to (un)favorite a highlighted item.
- Search uses case-insensitive [regex](https://regex101.com/?flavor=javascript).

---

## Install from Source

Supported GNOME Shell versions: **GNOME 45 – 50+**.

### 1. Build & Install

```shell
cd ~/.local/share/gnome-shell/extensions/ && \
  git clone https://github.com/thangtranitwork/clipboard-history.git clipboard-history@alexsaveau.dev && \
  cd clipboard-history@alexsaveau.dev && \
  make
```

### 2. Enable Extension

```shell
gnome-extensions enable clipboard-history@alexsaveau.dev
```

---

## License

This project is licensed under the [MIT License](LICENSE).  
Copyright (c) 2026 **Trần Đoàn Xuân Thắng**  
Original base copyright (c) 2022 Alex Saveau, (c) 2014 Yotam Bar-On.
