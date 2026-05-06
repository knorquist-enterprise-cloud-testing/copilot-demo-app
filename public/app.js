const form = document.getElementById("register-form");
const result = document.getElementById("result");
const userList = document.getElementById("user-list");
const statusBadge = document.getElementById("status-badge");

async function refreshUsers() {
  const r = await fetch("/api/users");
  const data = await r.json();
  userList.innerHTML = "";
  for (const u of data.users) {
    const li = document.createElement("li");
    li.textContent = `${u.username} <${u.email}>`;
    userList.appendChild(li);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const body = Object.fromEntries(formData.entries());
  const r = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await r.json();
  result.textContent = `${r.status} ${JSON.stringify(data, null, 2)}`;
  await refreshUsers();
});

refreshUsers();

function setStatusBadge(status, badgeClass) {
  statusBadge.textContent = `status: ${status}`;
  statusBadge.className = `badge ${badgeClass}`;
}

async function refreshStatus() {
  try {
    const r = await fetch("/api/healthz");
    if (!r.ok) {
      throw new Error("health check failed");
    }
    setStatusBadge("ok", "badge-ok");
  } catch {
    setStatusBadge("down", "badge-down");
  }
}

refreshStatus();
setInterval(refreshStatus, 10_000);
