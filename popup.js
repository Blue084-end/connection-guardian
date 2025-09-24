document.getElementById("allowBtn").onclick = () => {
  const domain = document.getElementById("domainInput").value.trim();
  if (!domain) return;
  chrome.storage.local.get("allowedList", (data) => {
    const updated = [...new Set([...(data.allowedList || []), domain])];
    chrome.storage.local.set({ allowedList: updated });
  });
};

document.getElementById("blockBtn").onclick = () => {
  const domain = document.getElementById("domainInput").value.trim();
  if (!domain) return;
  chrome.storage.local.get("blockedList", (data) => {
    const updated = [...new Set([...(data.blockedList || []), domain])];
    chrome.storage.local.set({ blockedList: updated });
  });
};

document.getElementById("blockAllBtn").onclick = () => {
  chrome.storage.local.set({ blockedList: ["*"] });
};
