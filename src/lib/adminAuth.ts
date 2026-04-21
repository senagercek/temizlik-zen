const TOKEN_KEY = "admin_token";

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function verifyAdminToken(token: string) {
  const res = await fetch("/api/admin/verify", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok;
}

