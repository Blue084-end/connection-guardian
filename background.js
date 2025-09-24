let allowedList = [];
let blockedList = [];

chrome.storage.local.get(["allowedList", "blockedList"], (data) => {
  allowedList = data.allowedList || [];
  blockedList = data.blockedList || [];
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const url = details.url;
    if (allowedList.some(domain => url.includes(domain))) {
      return { cancel: false };
    }
    if (blockedList.includes("*") || blockedList.some(domain => url.includes(domain))) {
      return { cancel: true };
    }
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
