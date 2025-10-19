// Use browser.* API with Chrome fallback for cross-browser support
const browserApi = typeof browser !== 'undefined' ? browser : chrome;

function toSuperscript(num) {
  const map = {
    0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴',
    5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹'
  };
  return String(num + 1) // start from 1
    .split('')
    .map(d => map[d] || d)
    .join('');
}

// Update a single tab’s title with its index
async function update(tab) {
  if (!tab || !tab.title || typeof tab.index !== 'number') return;

  let newTitle = tab.title;
  newTitle = newTitle.replace(/^[⁰¹²³⁴⁵⁶⁷⁸⁹]+/, '');

  const prefix = toSuperscript(tab.index);
  newTitle = prefix + ' ' + newTitle.trim();

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

// Run once on startup
updateAll();
