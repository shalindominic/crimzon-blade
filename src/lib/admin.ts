import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function checkAdmin() {
    const user = await currentUser();
    // In production, use process.env.ADMIN_EMAIL
    // For development fallback/demo, we allow the specific user if env is missing
    const adminEmails = (process.env.ADMIN_EMAIL || process.env.ADMIN_EMAILS || "shalindominic1@gmail.com").split(",").map(e => e.trim().toLowerCase());

    const userEmail = user?.emailAddresses[0]?.emailAddress?.toLowerCase();

    if (!user || !userEmail || !adminEmails.includes(userEmail)) {
        console.log("Admin Access Denied for:", userEmail);
        redirect("/");
    }

    return user;
}
