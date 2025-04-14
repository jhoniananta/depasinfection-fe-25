import { removeToken } from "@/lib/cookies";

export function clearDepasAuth() {
  // Hapus cookie
  removeToken();

  // Hapus semua localStorage terkait depas25 auth
  localStorage.removeItem("depas25_data");
  localStorage.removeItem("depas25_token_expiry");
}
