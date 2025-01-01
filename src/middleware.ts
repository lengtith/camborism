import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/lib";

// Configure matcher to apply middleware to all routes except those listed
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
  ]
};

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = await getSession();
  const authorized = session !== null;

  // Redirect user to home page if they are logged in and trying to access /signin or /signup
  if (authorized && (path === "/signin" || path === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect user to home page if they are not logged in and trying to access /destinations/create
  if (!authorized && path === "/destinations/create") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Rewrite path if not authorized but avoid rewriting on root path "/"
  const rewrittenPath = path === "/" ? "/" : path;
  return NextResponse.rewrite(new URL(rewrittenPath, req.url));
}
