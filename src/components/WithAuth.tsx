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
  routeRole: RouteRole = "ANY", // default is "ANY" = must be logged in
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
    const isLoggingIn = useAuthStore.useIsLoggingIn();

    // Callback for where to go after successful login
    const clientLogout = useClientLogout();

    const checkAuth = React.useCallback(async () => {
      const token = getToken();
      if (!token) {
        // no token? definitely logged out
        logout();
        stopLoading();
        return;
      }
      try {
        // 1) Validate token with a quick endpoint
        const checkRes = await fetch(`${baseURL}/check?token=${token}`);
        const checkText = await checkRes.text();
        if (checkText !== "valid") throw new Error("Token invalid");

        // 2) If valid, fetch user info
        const isAdminPage = location.pathname.startsWith("/admin");
        const meEndpoint = isAdminPage
          ? `${baseURL}/admin/auth/me`
          : `${baseURL}/user/auth/me`;

        const meRes = await fetch(meEndpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await meRes.json();
        if (!meRes.ok || !json?.status) throw new Error("Unauthorized");

        login({
          ...json.data,
          token,
        });
      } catch {
        clearDepasAuth();
        clientLogout(true, location.pathname);
        toast({
          title: "Session expired",
          description: "Please login again.",
        });
      } finally {
        stopLoading();
      }
    }, [login, logout, stopLoading, toast, clientLogout]);

    // Passive auto logout (based on localStorage expiry)
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

    // Check token on mount + whenever user refocuses or localStorage changes
    React.useEffect(() => {
      checkAuth();
      window.addEventListener("focus", checkAuth);
      window.addEventListener("storage", checkAuth);
      return () => {
        window.removeEventListener("focus", checkAuth);
        window.removeEventListener("storage", checkAuth);
      };
    }, [checkAuth]);

    // Route-based redirect logic
    React.useEffect(() => {
      if (!isLoading && !isLoggingIn) {
        if (!isAuthenticated) {
          switch (routeRole) {
            case "ANY":
            case "USER":
            case "ADMIN":
              router.replace(
                `/login?callback=${encodeURIComponent(location.pathname)}`,
              );
              break;
            default:
              break;
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

    // Show spinner if we’re waiting for token check on a protected route
    const isProtected = ["ANY", "USER", "ADMIN"].includes(routeRole);
    if ((isLoading || isLoggingIn || !isAuthenticated) && isProtected) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <ImSpinner8 className="animate-spin text-4xl text-muted" />
        </div>
      );
    }

    // Everything is good; render the page
    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}
