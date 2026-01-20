"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function AdminHeader() {
    const pathname = usePathname();
    const { user } = useUser();

    // Get current section name from path
    const section = pathname.split("/")[2]?.toUpperCase() || "DASHBOARD";

    return (
        <header className="h-20 bg-black/80 backdrop-blur-md border-b border-[#8B0000]/20 flex items-center justify-between px-8 sticky top-0 z-40">
            <div>
                <h1 className="font-oswald text-2xl tracking-[0.2em] text-[#EDEDED]">
                    {section}
                </h1>
                <p className="font-mono text-[10px] text-[#8B0000] tracking-widest mt-1">
                    SYS.OP: {user?.firstName?.toUpperCase() || "ADMIN"}
                </p>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:block text-right">
                    <p className="font-mono text-[10px] text-gray-500 tracking-widest">
                        SERVER TIME
                    </p>
                    <p className="font-oswald text-sm text-[#EDEDED] tracking-wider">
                        {new Date().toLocaleTimeString('en-US', { hour12: false })}
                    </p>
                </div>
                <div className="h-8 w-px bg-white/10 mx-2" />
                <UserButton appearance={{
                    elements: {
                        avatarBox: "w-10 h-10 border border-[#8B0000]/50 rounded-none"
                    }
                }} />
            </div>
        </header>
    );
}
