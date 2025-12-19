# Tab Numbering (Maintained Fork)

A browser extension that adds numbering to your browser tabs — compatibility with **Firefox**, possibly also **Chrome**.

---

## 🧩 Features

- Numbers your open tabs, adding superscript digits (¹²³⁴...) before the tab title.  
- You can toggle between:
  - **Classic Mode:** Only tabs 1–8 (matching <kbd>Ctrl/Cmd</kbd> + number shortcuts)
  - **Infinite Mode:** Number all tabs, regardless of count (personally I use this alongside Vimium)
- Updates automatically when tabs are opened, closed, or moved.
- Works across all normal web pages (`http` and `https` URLs).
- Offers option to set numbering offset, can be negative also. (for example, offset of value 3, tab numbers start with 3 counting up)

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

## ⚙️ Installation

### 🦊 Firefox
1. Can be found in [Mozilla Addons](https://addons.mozilla.org/en-US/firefox/addon/tab-numbs-infinite-numbering/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search)

### 🌐 Chrome / Chromium-based browsers
1. Clone or download this repository.
2. Open [`chrome://extensions`](chrome://extensions)
3. Enable **Developer mode** (top right corner).
4. Click **Load unpacked extension…**
5. Select the folder where you cloned the repository.

---

## 🧠 How to Use

On install it will automatically number tabs and they will automatically update.

For uncapping tab numbers:
1. Click the extension icon to open the popup.
2. Use the **“Infinite numbering”** toggle to choose between:
   - Only tabs 1–8 numbered, or
   - All tabs numbered (no limit)

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
