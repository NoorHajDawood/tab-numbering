# Tab Numbering (Maintained Fork)

A browser extension that adds numbering to your browser tabs — now with optional **infinite numbering**, a **dark-themed popup**, and compatibility with modern **Firefox** and **Chrome**.

This fork updates and improves the original extension with:
- ✅ Infinite tab numbering mode (optional)
- ✅ Dark, modern popup interface with toggle + refresh button
- ✅ Persistent settings (using `browser.storage.local`)
- ✅ Improved error handling (skips restricted pages)
- ✅ Updated code for Manifest V2 (for current Firefox + Chrome support)
- ✅ Robust updates when tabs are created, moved, or removed

---

## Screenshots

**Popup (Dark Mode)**
need to add screenshot
![Popup Screenshot](./screenshot-popup.png)

**Example – Chrome**
![Screenshot](./screenshot-chrome.png)

**Example – Firefox**
![Screenshot](./screenshot-firefox.png)

---

## 🧩 Features

- Numbers your open tabs, adding superscript digits (¹²³⁴...) before the tab title.  
- You can toggle between:
  - **Classic Mode:** Only tabs 1–8 (matching <kbd>Ctrl/Cmd</kbd> + number shortcuts)
  - **Infinite Mode:** Number all tabs, regardless of count
- Updates automatically when tabs are opened, closed, or moved.
- Works across all normal web pages (`http` and `https` URLs).

---

## ⚙️ Installation

### 🦊 Firefox
1. Clone or download this repository.
2. Visit [`about:debugging#/runtime/this-firefox`](about:debugging#/runtime/this-firefox)
3. Click **“Load Temporary Add-on…”**
4. Select the `manifest.json` file from this project.

### 🌐 Chrome / Chromium-based browsers
1. Clone or download this repository.
2. Open [`chrome://extensions`](chrome://extensions)
3. Enable **Developer mode** (top right corner).
4. Click **Load unpacked extension…**
5. Select the folder where you cloned the repository.

---

## 🧠 How to Use

1. Click the extension icon to open the popup.
2. Use the **“Infinite numbering”** toggle to choose between:
   - Only tabs 1–8 numbered, or
   - All tabs numbered (no limit)
3. Click **Update Tabs** if you want to reapply numbering manually (usually not needed).

The chosen mode is automatically saved and restored.

---

## 🚫 Limitations

- Tabs with restricted URLs (like `about:`, `chrome://`, or `moz-extension://`) cannot be modified — browser security rules prevent script injection.
- Does not number pinned tabs.
- May not sync immediately between windows if many tabs move quickly (handled by periodic refresh).

---

## 🧰 Developer Notes

### Background Script
The extension uses a **persistent background page** (`tab-numbering.js`) for stable storage and event handling.  
It listens to tab lifecycle events (`onCreated`, `onMoved`, `onRemoved`, `onUpdated`) and updates titles accordingly.

---

## 🧩 Advanced Customization (Optional)
If you prefer a CSS-only approach, you can use `userChrome.css` in Firefox.  
Example (works for Firefox 89+):

```css
tabs {
  counter-reset: tab-counter;
}

tab {
  counter-increment: tab-counter;
}
tab .tab-content::before {
  content: counter(tab-counter);
  position: absolute;
  left: 24px;
  top: 7px;
  padding: 0px 4px;
  border-radius: 7px;
  opacity: .7;
  background: #ff0c;
  font-weight: bold;
  font-size: 80%;
}
tab:not(:first-child) {
  border-left: 1px solid #0004 !important;
}
