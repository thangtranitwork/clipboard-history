import Gtk from 'gi://Gtk';
import Gio from 'gi://Gio';
import Adw from 'gi://Adw';

import {
  ExtensionPreferences,
  gettext as _,
} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

import Fields from './settingsFields.js';

export default class ClipboardHistoryPrefs extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    const settings = this.getSettings();

    const page = new Adw.PreferencesPage({
      title: _('Settings'),
      icon_name: 'preferences-other-symbolic',
    });
    window.add(page);

    // 1. History Settings
    const historyGroup = new Adw.PreferencesGroup({
      title: _('History'),
      description: _('Manage clipboard history capacity and storage'),
    });
    page.add(historyGroup);

    // History Size
    const historySizeRow = new Adw.SpinRow({
      title: _('Max number of items'),
      subtitle: _('Maximum entries to keep in history'),
      adjustment: new Gtk.Adjustment({
        lower: 1,
        upper: 100000,
        step_increment: 10,
        page_increment: 100,
      }),
    });
    settings.bind(
      Fields.HISTORY_SIZE,
      historySizeRow,
      'value',
      Gio.SettingsBindFlags.DEFAULT,
    );
    historyGroup.add(historySizeRow);

    // Cache Size (MiB)
    const cacheSizeRow = new Adw.SpinRow({
      title: _('Max clipboard history size (MiB)'),
      subtitle: _('Limit memory and disk space used by clipboard items'),
      adjustment: new Gtk.Adjustment({
        lower: 1,
        upper: 1024,
        step_increment: 5,
        page_increment: 20,
      }),
    });
    settings.bind(
      Fields.CACHE_FILE_SIZE,
      cacheSizeRow,
      'value',
      Gio.SettingsBindFlags.DEFAULT,
    );
    historyGroup.add(cacheSizeRow);

    // Move to top
    const moveFirstRow = new Adw.SwitchRow({
      title: _('Move previously copied items to the top'),
      subtitle: _('Bring re-selected items to the front of history'),
    });
    settings.bind(
      Fields.MOVE_ITEM_FIRST,
      moveFirstRow,
      'active',
      Gio.SettingsBindFlags.DEFAULT,
    );
    historyGroup.add(moveFirstRow);

    // Only save favorites to disk
    const cacheFavoritesRow = new Adw.SwitchRow({
      title: _('Only save favorites to disk'),
      subtitle: _('Do not write normal clipboard history to disk'),
    });
    settings.bind(
      Fields.CACHE_ONLY_FAVORITES,
      cacheFavoritesRow,
      'active',
      Gio.SettingsBindFlags.DEFAULT,
    );
    historyGroup.add(cacheFavoritesRow);

    // Strip Text
    const stripTextRow = new Adw.SwitchRow({
      title: _('Remove whitespace around text'),
      subtitle: _('Trim leading and trailing whitespace from copied text'),
    });
    settings.bind(
      Fields.STRIP_TEXT,
      stripTextRow,
      'active',
      Gio.SettingsBindFlags.DEFAULT,
    );
    historyGroup.add(stripTextRow);

    // Primary selection (Save selected text)
    const primarySelectionRow = new Adw.SwitchRow({
      title: _('Save selected text to history'),
      subtitle: _('Add mouse-highlighted text into clipboard history'),
    });
    settings.bind(
      Fields.PROCESS_PRIMARY_SELECTION,
      primarySelectionRow,
      'active',
      Gio.SettingsBindFlags.DEFAULT,
    );
    historyGroup.add(primarySelectionRow);

    // Ignore passwords
    const ignorePasswordsRow = new Adw.SwitchRow({
      title: _('Try to avoid copying passwords'),
      subtitle: _('Detect and ignore secrets from password managers'),
    });
    settings.bind(
      Fields.IGNORE_PASSWORD_MIMES,
      ignorePasswordsRow,
      'active',
      Gio.SettingsBindFlags.DEFAULT,
    );
    historyGroup.add(ignorePasswordsRow);

    // Confirm Clear
    const confirmClearRow = new Adw.SwitchRow({
      title: _('Ask for confirmation before clearing history'),
      subtitle: _('Show a confirmation dialog when clearing all items'),
    });
    settings.bind(
      Fields.CONFIRM_ON_CLEAR,
      confirmClearRow,
      'active',
      Gio.SettingsBindFlags.DEFAULT,
    );
    historyGroup.add(confirmClearRow);

    // 2. Interface Group
    const uiGroup = new Adw.PreferencesGroup({
      title: _('Interface & Behavior'),
      description: _('Customize top bar panel and menu appearance'),
    });
    page.add(uiGroup);

    // Display mode
    const displayModel = new Gtk.StringList();
    displayModel.append(_('Icon'));
    displayModel.append(_('Clipboard contents'));
    displayModel.append(_('Both'));
    displayModel.append(_('Neither'));
    const displayModeRow = new Adw.ComboRow({
      title: _('What to show in status bar'),
      subtitle: _('Select indicators visible in the top panel'),
      model: displayModel,
    });
    settings.bind(
      Fields.TOPBAR_DISPLAY_MODE_ID,
      displayModeRow,
      'selected',
      Gio.SettingsBindFlags.DEFAULT,
    );
    uiGroup.add(displayModeRow);

    // Disable down arrow
    const disableDownArrowRow = new Adw.SwitchRow({
      title: _('Remove down arrow in status bar'),
      subtitle: _('Hide the drop-down indicator arrow in the panel'),
    });
    settings.bind(
      Fields.DISABLE_DOWN_ARROW,
      disableDownArrowRow,
      'active',
      Gio.SettingsBindFlags.DEFAULT,
    );
    uiGroup.add(disableDownArrowRow);

    // Topbar Preview Size
    const topbarSizeRow = new Adw.SpinRow({
      title: _('Number of characters in status bar'),
      subtitle: _('Maximum character length displayed in the panel'),
      adjustment: new Gtk.Adjustment({
        lower: 1,
        upper: 100,
        step_increment: 5,
        page_increment: 10,
      }),
    });
    settings.bind(
      Fields.TOPBAR_PREVIEW_SIZE,
      topbarSizeRow,
      'value',
      Gio.SettingsBindFlags.DEFAULT,
    );
    uiGroup.add(topbarSizeRow);

    // Window Width Percentage
    const windowWidthRow = new Adw.SpinRow({
      title: _('Window width (%)'),
      subtitle: _('Maximum width of the clipboard menu as screen percentage'),
      adjustment: new Gtk.Adjustment({
        lower: 10,
        upper: 100,
        step_increment: 5,
        page_increment: 10,
      }),
    });
    settings.bind(
      Fields.WINDOW_WIDTH_PERCENTAGE,
      windowWidthRow,
      'value',
      Gio.SettingsBindFlags.DEFAULT,
    );
    uiGroup.add(windowWidthRow);

    // Notify on copy
    const notifyOnCopyRow = new Adw.SwitchRow({
      title: _('Show notification on copy'),
      subtitle: _('Display a system notification when new content is copied'),
    });
    settings.bind(
      Fields.NOTIFY_ON_COPY,
      notifyOnCopyRow,
      'active',
      Gio.SettingsBindFlags.DEFAULT,
    );
    uiGroup.add(notifyOnCopyRow);

    // Paste on selection
    const pasteOnSelectionRow = new Adw.SwitchRow({
      title: _('Paste on selection'),
      subtitle: _('Automatically simulate paste shortcut when selecting an item'),
    });
    settings.bind(
      Fields.PASTE_ON_SELECTION,
      pasteOnSelectionRow,
      'active',
      Gio.SettingsBindFlags.DEFAULT,
    );
    uiGroup.add(pasteOnSelectionRow);

    // 3. Shortcuts Group
    const shortcutsGroup = new Adw.PreferencesGroup({
      title: _('Keyboard Shortcuts'),
      description: _('Configure keybindings for quick navigation and menu control'),
    });
    page.add(shortcutsGroup);

    const enableKeybindingRow = new Adw.SwitchRow({
      title: _('Enable Keyboard Shortcuts'),
      subtitle: _('Allow global shortcut keys to interact with clipboard history'),
    });
    settings.bind(
      Fields.ENABLE_KEYBINDING,
      enableKeybindingRow,
      'active',
      Gio.SettingsBindFlags.DEFAULT,
    );
    shortcutsGroup.add(enableKeybindingRow);

    const shortcuts = [
      { key: 'toggle-menu', title: _('Toggle the menu') },
      { key: 'clear-history', title: _('Clear history') },
      { key: 'prev-entry', title: _('Previous entry') },
      { key: 'next-entry', title: _('Next entry') },
      { key: 'toggle-private-mode', title: _('Toggle private mode') },
    ];

    const shortcutRows = [];
    for (const item of shortcuts) {
      const row = createShortcutRow(settings, item.key, item.title);
      shortcutsGroup.add(row);
      shortcutRows.push(row);
    }

    const updateSensitivity = () => {
      const active = enableKeybindingRow.active;
      for (const row of shortcutRows) {
        row.set_sensitive(active);
      }
    };
    enableKeybindingRow.connect('notify::active', updateSensitivity);
    updateSensitivity();
  }
}

function createShortcutRow(settings, key, title) {
  const row = new Adw.ActionRow({ title });

  const shortcutLabel = new Gtk.ShortcutLabel({
    disabled_text: _('Disabled'),
    valign: Gtk.Align.CENTER,
  });

  const updateLabel = () => {
    const strv = settings.get_strv(key);
    shortcutLabel.accelerator = strv[0] || '';
  };

  const button = new Gtk.Button({
    child: shortcutLabel,
    has_frame: true,
    valign: Gtk.Align.CENTER,
  });

  const clearButton = new Gtk.Button({
    icon_name: 'edit-clear-symbolic',
    has_frame: false,
    valign: Gtk.Align.CENTER,
    tooltip_text: _('Clear shortcut'),
  });

  clearButton.connect('clicked', () => {
    settings.set_strv(key, []);
    updateLabel();
  });

  const controller = new Gtk.EventControllerKey();
  button.add_controller(controller);

  controller.connect('key-pressed', (ctrl, keyval, keycode, state) => {
    const mask = state & Gtk.accelerator_get_default_mod_mask();
    if (mask === 0 && keyval === Gtk.KEY_Escape) {
      button.remove_css_class('suggested-action');
      updateLabel();
      return true;
    }

    if (
      mask === 0 &&
      (keyval === Gtk.KEY_BackSpace || keyval === Gtk.KEY_Delete)
    ) {
      settings.set_strv(key, []);
      button.remove_css_class('suggested-action');
      updateLabel();
      return true;
    }

    const accel = Gtk.accelerator_name_with_keycode(
      null,
      keyval,
      keycode,
      mask,
    );
    if (accel && Gtk.accelerator_valid(keyval, mask)) {
      settings.set_strv(key, [accel]);
      button.remove_css_class('suggested-action');
      updateLabel();
      return true;
    }
    return false;
  });

  button.connect('clicked', () => {
    button.add_css_class('suggested-action');
    shortcutLabel.accelerator = '';
  });

  updateLabel();

  row.add_suffix(button);
  row.add_suffix(clearButton);
  row.activatable_widget = button;
  return row;
}
