import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("@depas25ugm")?.value;
  const { pathname, origin } = request.nextUrl;

  const redirectToLogin = () => {
    const loginPath = pathname.startsWith("/admin") ? "/admin/login" : "/login";
    const loginUrl = new URL(loginPath, request.url);
    loginUrl.searchParams.set("callback", pathname);
    return NextResponse.redirect(loginUrl);
  };

  if (!token) return redirectToLogin();

  try {
    const res = await fetch(`${origin}/api/auth/check-token?token=${token}`);
    const { valid } = await res.json();

    if (!valid) return redirectToLogin();
  } catch {
    return redirectToLogin();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/event-register/:path*",
    "/admin",
    "/dashboard/:path*",
    "/sandbox/:path*",
    "/submission/:path*",
  ],
};
