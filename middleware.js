import { NextResponse } from "next/server";

const isAdminRoute = (pathname) => {
  return pathname.startsWith("/api/admin");
};

const isUserRoute = (pathname) => {
  return pathname.startsWith("/api/users");
};

export function middleware(req) {
  return NextResponse.next();
}
export const config = {
  matcher: "/api/:path*",
};
