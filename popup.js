async function renumberTabs() {
  try {
    await browser.runtime.sendMessage({ type: "renumberTabs" });
  } catch (e) {
    console.debug(e);
  }
}

const checkbox = document.getElementById('infiniteTabNumberingToggle');

// Load saved setting
browser.storage.local.get('infiniteTabNumberingMode').then(data => {
  checkbox.checked = !!data.infiniteTabNumberingMode;
});

// Save on toggle
checkbox.addEventListener('change', async () => {
  await browser.storage.local.set({ infiniteTabNumberingMode: checkbox.checked });
  await renumberTabs();
});

const offset = document.getElementById('numberingOffset');

browser.storage.local.get('tabNumberOffset').then(data => {
  offset.value = Number(data.tabNumberOffset) || 0;
});

offset.addEventListener('change', async () => {
  await browser.storage.local.set({ tabNumberOffset: offset.valueAsNumber });
  await renumberTabs();
})
