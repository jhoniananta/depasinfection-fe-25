// lib/clientLogout.ts
"use client";

import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export function useClientLogout() {
  const router = useRouter();
  const logout = useAuthStore.useLogout();

  return (isForced = false, callbackPath?: string) => {
    logout();

    if (isForced) {
      const path = callbackPath || location.pathname;
      router.replace(`/login?callback=${encodeURIComponent(path)}`);
    } else {
      router.replace("/login");
    }
  };
}
