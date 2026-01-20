import { auth } from "@/auth"

export default auth((req) => {
    // req.auth is available here
    const isLoggedIn = !!req.auth;
    const isNextAuthRoute = req.nextUrl.pathname.startsWith('/api/auth');
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

    if (isNextAuthRoute) {
        return;
    }

    if (isAdminRoute && !isLoggedIn) {
        return Response.redirect(new URL('/auth/signin', req.nextUrl));
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
