import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const cookie = req.cookies.get("token");

  const urlLink = [
    "/coop-accounts",
    "/role-management",
    "/statement-of-accounts",
    "/users",
  ];
  //
  for (const url of urlLink) {
    if (!cookie && req.nextUrl.pathname.startsWith(url)) {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
  }

  //if the cookies is verified, redirect to the dashboard
  if (cookie && req.nextUrl.pathname.startsWith("/admin-login")) {
    return NextResponse.redirect(new URL("/coop-accounts", req.url));
  }
}
