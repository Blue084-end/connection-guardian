// Hàm hiển thị danh sách cho phép và bị chặn
function renderLists() {
  chrome.storage.local.get(["allowedList", "blockedList"], (data) => {
    const allowed = data.allowedList || [];
    const blocked = data.blockedList || [];

    const log = document.getElementById("log");
    log.innerHTML = `
      <h4>✅ Danh sách được phép:</h4>
      <ul>${allowed.map(domain => `<li>${domain}</li>`).join("")}</ul>
      <h4>⛔ Danh sách bị chặn:</h4>
      <ul>${blocked.map(domain => `<li>${domain}</li>`).join("")}</ul>
    `;
  });
}

// Thêm domain vào danh sách được phép
document.getElementById("allowBtn").onclick = () => {
  const domain = document.getElementById("domainInput").value.trim();
  if (!domain) return;

  chrome.storage.local.get("allowedList", (data) => {
    const list = data.allowedList || [];
    if (!list.includes(domain)) {
      list.push(domain);
      chrome.storage.local.set({ allowedList: list }, renderLists);
    }
  });
};

// Thêm domain vào danh sách bị chặn
document.getElementById("blockBtn").onclick = () => {
  const domain = document.getElementById("domainInput").value.trim();
  if (!domain) return;

  chrome.storage.local.get("blockedList", (data) => {
    const list = data.blockedList || [];
    if (!list.includes(domain)) {
      list.push(domain);
      chrome.storage.local.set({ blockedList: list }, renderLists);
    }
  });
};

// Chặn toàn bộ trừ danh sách được phép
document.getElementById("blockAllBtn").onclick = () => {
  chrome.storage.local.set({ blockedList: ["*"] }, renderLists);
};

// Hiển thị danh sách khi popup mở
document.addEventListener("DOMContentLoaded", renderLists);
