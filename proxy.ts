import { auth } from "./lib/auth";
import { headers } from "next/headers";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const pathname = request.nextUrl.pathname;

  const isProtectedPath =
    pathname.startsWith("/movie") ||
    pathname.startsWith("/tv") ||
    pathname.startsWith("/people");

  if (isProtectedPath && !session?.user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (
    (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) &&
    session?.user
  ) {
    return NextResponse.redirect(new URL("/movie/popular", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/movie/:path*",
    "/tv/:path*",
    "/people/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
