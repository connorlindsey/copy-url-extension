const showToast = (tabId, message, type) => {
  chrome.tabs.sendMessage(tabId, {
    action: "showToast",
    message,
    type,
  })
}

chrome.commands.onCommand.addListener((command) => {
  if (command === "copy-url") {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      // Get current tab's URL
      const activeTab = tabs[0]
      const url = activeTab.url

      // Copy to clipboard
      try {
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          func: (text) => {
            navigator.clipboard.writeText(text)
          },
          args: [url],
        })

        // Show success toast
        showToast(activeTab.id, "Copied Current URL", "success")
      } catch (error) {
        // Show error toast
        showToast(activeTab.id, "Copying URL failed", "error")
        console.error(error)
      }
    })
  }
})
