// Use browser.* API with Chrome fallback for cross-browser support
const browserApi = typeof browser !== 'undefined' ? browser : chrome;

const SUPERSCRIPT_MAP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };

function toSuperscript(num) {
  return String(num) // start from 1
    .split('')
    .map(ch => SUPERSCRIPT_MAP[ch] ?? ch)
    .join('');
}

async function getMode() {
  const { infiniteTabNumberingMode = false } = await browserApi.storage.local.get('infiniteTabNumberingMode');
  return infiniteTabNumberingMode;
}

async function getOffset() {
  const { tabNumberOffset = 0 } = await browserApi.storage.local.get('tabNumberOffset');
  return Number(tabNumberOffset) || 0;
}

// Update a single tab’s title with its index
async function update(tab) {
  if (!tab || !tab.title || typeof tab.index !== 'number') return;

  let newTitle = tab.title.replace(/^[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+\s*/, '');
  
  const infinite = await getMode();
  const offset = await getOffset();

  if (infinite || tab.index <= 8) {
    const tabNumber = tab.index + 1 + offset;
    const prefix = toSuperscript(tabNumber);
    newTitle = `${prefix} ${newTitle.trim()}`;
  }

  try {
    await browserApi.scripting.executeScript({
      target: { tabId: tab.id },
      func: (title) => { document.title = title; },
      args: [newTitle]
    });
  } catch (e) {
    console.debug('Tab numbering error:', e);
  }
}

// Update all open tabs
async function updateAll() {
  const tabs = await browserApi.tabs.query({});
  for (const tab of tabs) {
    await update(tab);
  }
}

// Set up event listeners
browserApi.tabs.onMoved.addListener(updateAll);
browserApi.tabs.onCreated.addListener(updateAll);
browserApi.tabs.onRemoved.addListener(() => {
  updateAll();
  setTimeout(updateAll, 100);
  setTimeout(updateAll, 500);
  setTimeout(updateAll, 1000);
});
browserApi.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.title) update(tab);
});
browserApi.runtime.onMessage.addListener(msg => {
  if (msg.type === "renumberTabs") updateAll();
});

// Ensure storage default
browserApi.runtime.onInstalled.addListener(() => {
  browserApi.storage.local.get('infiniteTabNumberingMode', data => {
    if (data.infiniteTabNumberingMode === undefined)
      browserApi.storage.local.set({ infiniteTabNumberingMode: false });
  });

  browserApi.storage.local.get('tabNumberOffset', data => {
    if (data.tabNumberOffset == undefined)
      browserApi.storage.local.set({ tabNumberOffset: 0 });
  });
});

// Run once on startup
updateAll();
