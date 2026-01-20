import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import "@/app/globals.css";

// Force Next.js to not cache admin layout to ensure auth checks run
export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    // Strict Role Check
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!session?.user || (session.user as any).role !== 'admin') {
        redirect("/auth/signin");
    }

    return (
        <div className="min-h-screen bg-black text-[#EDEDED] flex font-sans selection:bg-[#8B0000] selection:text-white">
            {/* SIDEBAR */}
            <AdminSidebar />

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 ml-64 flex flex-col min-h-screen">
                <AdminHeader />
                <div className="flex-1 p-8 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
