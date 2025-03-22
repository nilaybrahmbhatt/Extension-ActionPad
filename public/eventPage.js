const defaultContexts = ["image", "selection"];
let currentContexts = defaultContexts;

// Function to create the context menu item
function createContextMenu(contexts) {
  chrome.contextMenus.create({
    id: "WritingpadSelection",
    title: "Save To WritingPad",
    contexts: contexts, // Use the specified contexts
  });
}
chrome.runtime.onInstalled.addListener(function () {
  createContextMenu(currentContexts);
});

// Listen for clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.selectionText) {
    chrome.runtime.sendMessage({
      action: "addTextToList",
      payload: { text: "<p>" + info.selectionText + "</p>" },
    });
  } else if (info.mediaType == "image" && info.srcUrl) {
    chrome.runtime.sendMessage({
      action: "addTextToList",
      payload: { text: "<img src='" + info.srcUrl + "' />" },
    });
  }
});
