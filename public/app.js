const form = document.getElementById("register-form");
const result = document.getElementById("result");
const userList = document.getElementById("user-list");

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

// TODO (IDE Agent Mode demo, Issue #3):
// Poll /api/healthz every 10s and update #status-badge accordingly.
