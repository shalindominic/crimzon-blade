import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

// Mock user logic for now since DB might not be ready
// In production, verify against Prisma
const ADMIN_EMAILS = ["shalindominic1@gmail.com"];

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

                // SIMULATION MODE: 
                // Since we don't have a DB yet, we simulate a successful login for the admin email
                // "password" input is just a placeholder for now
                if (ADMIN_EMAILS.includes(email.toLowerCase())) {
                    return {
                        id: "admin-1",
                        email: email,
                        name: "Admin User",
                        role: "admin",
                    };
                }

                throw new Error("Access Denied");
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
