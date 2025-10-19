const checkbox = document.getElementById('infiniteTabNumberingToggle');

// Load saved setting
browser.storage.local.get('infiniteTabNumberingMode').then(data => {
  checkbox.checked = !!data.infiniteTabNumberingMode;
});

// Save on toggle
checkbox.addEventListener('change', async () => {
  await browser.storage.local.set({ infiniteTabNumberingMode: checkbox.checked });
  
  // Optional: tell background to refresh numbering immediately
  try {
    await browser.runtime.sendMessage({ type: "renumberTabs" });
  } catch (e) {
    console.debug(e);
  }
});
