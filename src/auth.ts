import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

// Load from Env (support both formats for backward compatibility)
const adminEnv = process.env.ADMIN_EMAIL || process.env.ADMIN_EMAILS || "shalindominic1@gmail.com";
const ADMIN_EMAILS = adminEnv.split(",").map(e => e.trim().toLowerCase());

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const { email } = await z.object({
                    email: z.string().email(),
                    password: z.string().min(1)
                }).parseAsync(credentials);

                const normalizedEmail = email.toLowerCase();
                console.log(`[AUTH] Attempt: ${normalizedEmail} | Allowed: ${ADMIN_EMAILS.join(", ")}`);

                if (ADMIN_EMAILS.includes(normalizedEmail)) {
                    return {
                        id: "admin-1",
                        email: normalizedEmail,
                        name: "Admin User",
                        role: "admin",
                    };
                }

                console.log(`[AUTH] Denied: ${normalizedEmail}`);
                return null; // Return null to trigger standard error
            },
        }),
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');

            if (isOnAdmin) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }

            return true;
        },
        jwt({ token, user }) {
            if (user) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                token.role = (user as any).role;
            }
            return token;
        },
        session({ session, token }) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (session.user) (session.user as any).role = token.role;
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin', // Custom sign-in page we will build
    },
})
