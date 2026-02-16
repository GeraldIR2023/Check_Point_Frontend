import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("CHECKPOINT_TOKEN");
    const { pathname } = request.nextUrl;

    //*Routes that require authentication
    const protectedRoutes = ["/profile", "/checkout", "/orders"];

    //*Check if the user trying to access without login
    if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL("/users/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile/:path*", "/checkout/:path*", "/orders/:path*"],
};
