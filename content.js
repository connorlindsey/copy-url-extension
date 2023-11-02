function createToast(message, type) {
  // Create the toast container if it does not exist
  let toastContainer = document.querySelector(".cpy-toast")
  if (!toastContainer) {
    toastContainer = document.createElement("div")
    toastContainer.className = "cpy-toast"
    document.body.appendChild(toastContainer)
  }

  // Set the message and type of the toast
  toastContainer.textContent = message

  // Show the toast
  toastContainer.classList.add("cpy-show")

  // After 3 seconds, hide the toast
  setTimeout(() => {
    toastContainer.classList.remove("cpy-show")
  }, 3000)
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "showToast") {
    createToast(msg.message, msg.type)
  }
})
