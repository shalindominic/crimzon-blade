import { checkAdmin } from "@/lib/admin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import "@/app/globals.css";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    // 1. Strict Security Check
    await checkAdmin();

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
