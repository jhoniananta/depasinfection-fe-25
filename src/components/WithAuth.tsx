"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { ImSpinner8 } from "react-icons/im";

import { useToast } from "@/hooks/use-toast";
import { useLoginCallback } from "@/hooks/useLoginCallback";
import { getToken, removeToken } from "@/lib/cookies";
import useAuthStore from "@/store/useAuthStore";

type RouteRole = "auth" | "optional" | "all";

export default function withAuth<T>(
  Component: React.ComponentType<T>,
  routeRole: RouteRole,
) {
  const ComponentWithAuth = (props: T) => {
    const router = useRouter();
    const { toast } = useToast();

    const isAuthenticated = useAuthStore.useIsAuthenticated();
    const isLoading = useAuthStore.useIsLoading();
    const login = useAuthStore.useLogin();
    const logout = useAuthStore.useLogout();
    const stopLoading = useAuthStore.useStopLoading();
    const user = useAuthStore.useUser();

    const callback = useLoginCallback("/dashboard");

    const checkAuth = React.useCallback(async () => {
      const token = getToken();
      if (!token) {
        logout();
        stopLoading();
        return;
      }

      try {
        // ⛔ Cek apakah token expired via endpoint
        const checkRes = await fetch(`/check?token=${token}`);
        const checkText = await checkRes.text();
        if (checkText !== "valid") throw new Error("Token expired");

        // ✅ Fetch /me kalau token valid
        const res = await fetch("/user/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();
        if (!res.ok || !json?.status) throw new Error("Unauthorized");

        login({ ...json.data, token });
      } catch {
        removeToken();
        logout();
        toast({ title: "Session expired", description: "Please login again." });
      } finally {
        stopLoading();
      }
    }, [login, logout, stopLoading, toast]);

    // ⏱️ Passive auto logout
    React.useEffect(() => {
      const expiry = localStorage.getItem("depas25_token_expiry");
      if (!expiry) return;

      const timeout = new Date(expiry).getTime() - Date.now();
      if (timeout <= 0) {
        logout();
        router.replace("/login?callback=" + location.pathname);
        return;
      }

      const timer = setTimeout(() => {
        logout();
        router.replace("/login?callback=" + location.pathname);
      }, timeout);

      return () => clearTimeout(timer);
    }, [logout, router]);

    // 🧠 Initial load + tab refocus
    React.useEffect(() => {
      checkAuth();
      window.addEventListener("focus", checkAuth);
      window.addEventListener("storage", checkAuth);
      return () => {
        window.removeEventListener("focus", checkAuth);
        window.removeEventListener("storage", checkAuth);
      };
    }, [checkAuth]);

    // 🔁 Route role-based redirect
    React.useEffect(() => {
      if (!isLoading) {
        // ⛔ Redirect kalau udah login dan route untuk guest-only
        if (routeRole === "auth" && isAuthenticated) {
          const fallback = user?.role === "USER" ? "/dashboard" : "/admin";
          router.replace(callback || fallback);
        }

        // ⛔ Redirect kalau belum login dan page butuh auth
        if (routeRole === "all" && !isAuthenticated) {
          router.replace("/login?callback=" + location.pathname);
        }

        // ✅ Cek otorisasi role vs. route
        const path = location.pathname;

        if (isAuthenticated) {
          if (path.startsWith("/admin") && user?.role === "USER") {
            router.replace("/dashboard");
          }

          if (path.startsWith("/dashboard") && user?.role !== "USER") {
            router.replace("/admin");
          }
        }
      }
    }, [isAuthenticated, isLoading, routeRole, router, user]);

    if ((isLoading || !isAuthenticated) && routeRole === "all") {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <ImSpinner8 className="animate-spin text-4xl text-muted" />
        </div>
      );
    }

    return <Component {...props} user={user} />;
  };

  return ComponentWithAuth;
}
