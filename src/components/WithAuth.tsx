"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { ImSpinner8 } from "react-icons/im";

import { useToast } from "@/hooks/use-toast";
import { baseURL } from "@/lib/api";
import { clearDepasAuth } from "@/lib/auth";
import { useClientLogout } from "@/lib/clientLogout";
import { getToken } from "@/lib/cookies";
import useAuthStore from "@/store/useAuthStore";

/**
 * Acceptable roles:
 * - "USER" for normal user routes
 * - "ADMIN" for admin routes
 * - "ANY" means user must be authenticated but any role
 * - "GUEST" means user must be UNauthenticated (for login/register pages)
 * - "OPTIONAL" means no auth required, but if user is logged in we pass user info
 */
type RouteRole = "USER" | "ADMIN" | "ANY" | "GUEST" | "OPTIONAL";

/** Helper: define who is an admin */
function isAdminRole(role: string) {
  return ["SUPERADMIN", "OKGD_ADMIN", "UDSRC_ADMIN"].includes(role);
}

/**
 * High-level route checks based on path.
 * - If your routes are strictly controlled by the second param "role"
 *   you might not need these path-based checks.
 * - But if you do want path-based checks, see the isAdminRoute/isUserRoute samples below.
 */
// function isAdminRoute(path: string) {
// 	return path.startsWith("/admin") || path.startsWith("/sandbox");
// }
// function isUserRoute(path: string) {
// 	return (
// 		path.startsWith("/dashboard") ||
// 		path.startsWith("/submission") ||
// 		path.startsWith("/event-register")
// 	);
// }

export default function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  routeRole: RouteRole = "ANY",
) {
  const ComponentWithAuth = (props: T) => {
    const router = useRouter();
    const { toast } = useToast();
    const clientLogout = useClientLogout();

    const isAuthenticated = useAuthStore.useIsAuthenticated();
    const isLoading = useAuthStore.useIsLoading();
    const isLoggingIn = useAuthStore.useIsLoggingIn();
    const login = useAuthStore.useLogin();
    const logout = useAuthStore.useLogout();
    const stopLoading = useAuthStore.useStopLoading();
    const user = useAuthStore.useUser();
    const hasChecked = useAuthStore.useHasChecked(); // ✅ NEW
    const setHasChecked = useAuthStore.useSetHasChecked(); // ✅ NEW

    const isCheckingRef = React.useRef(false);

    const checkAuth = React.useCallback(async () => {
      // Jangan lanjut kalau sedang ngecek / login / atau sudah pernah dicek
      if (isCheckingRef.current || isLoggingIn || hasChecked) return;
      isCheckingRef.current = true;

      const token = getToken();
      if (!token) {
        logout();
        stopLoading();
        isCheckingRef.current = false;
        return;
      }

      try {
        const checkRes = await fetch(`${baseURL}/check?token=${token}`);
        const checkText = await checkRes.text();
        if (checkText !== "valid") throw new Error("Token invalid");

        const isAdminPage = location.pathname.startsWith("/admin");
        const meEndpoint = isAdminPage
          ? `${baseURL}/admin/auth/me`
          : `${baseURL}/user/auth/me`;

        const meRes = await fetch(meEndpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await meRes.json();
        if (!meRes.ok || !json?.status) throw new Error("Unauthorized");

        login({ ...json.data, token });
        setHasChecked(true); // ✅ Tandai sudah pernah validasi token
      } catch {
        clearDepasAuth();
        clientLogout(true, location.pathname);
        toast({
          title: "Session expired",
          description: "Please login again.",
        });
      } finally {
        stopLoading();
        isCheckingRef.current = false;
      }
    }, [
      login,
      logout,
      stopLoading,
      toast,
      clientLogout,
      isLoggingIn,
      hasChecked,
      setHasChecked,
    ]);

    React.useEffect(() => {
      const expiry = localStorage.getItem("depas25_token_expiry");
      if (!expiry) return;

      const timeLeft = new Date(expiry).getTime() - Date.now();
      if (timeLeft <= 0) {
        clientLogout(true, location.pathname);
        return;
      }

      const timer = setTimeout(() => {
        clientLogout(true, location.pathname);
      }, timeLeft);

      return () => clearTimeout(timer);
    }, [clientLogout]);

    React.useEffect(() => {
      checkAuth();

      let debounceTimeout: NodeJS.Timeout;
      const handleFocus = () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(checkAuth, 300);
      };
      const handleStorage = () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(checkAuth, 300);
      };

      window.addEventListener("focus", handleFocus);
      window.addEventListener("storage", handleStorage);
      return () => {
        window.removeEventListener("focus", handleFocus);
        window.removeEventListener("storage", handleStorage);
      };
    }, [checkAuth]);

    React.useEffect(() => {
      if (!isLoading && !isLoggingIn) {
        if (!isAuthenticated) {
          if (["ANY", "USER", "ADMIN"].includes(routeRole)) {
            router.replace(
              `/login?callback=${encodeURIComponent(location.pathname)}`,
            );
          }
        } else {
          const userIsAdmin = user ? isAdminRole(user.role) : false;
          switch (routeRole) {
            case "GUEST":
              router.replace(userIsAdmin ? "/admin" : "/dashboard");
              break;
            case "ADMIN":
              if (!userIsAdmin) router.replace("/dashboard");
              break;
            case "USER":
              if (userIsAdmin) router.replace("/admin");
              break;
          }
        }
      }
    }, [isAuthenticated, isLoading, isLoggingIn, routeRole, router, user]);

    const isProtected = ["ANY", "USER", "ADMIN"].includes(routeRole);
    if ((isLoading || isLoggingIn || !isAuthenticated) && isProtected) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <ImSpinner8 className="animate-spin text-4xl text-muted" />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}
