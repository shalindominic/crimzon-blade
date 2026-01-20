"use client";

import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { IconLogout } from "@tabler/icons-react";

export function AdminHeader() {
    const pathname = usePathname();
    const { data: session } = useSession();

    // Get current section name from path
    const section = pathname.split("/")[2]?.toUpperCase() || "DASHBOARD";

    return (
        <header className="h-20 bg-black/80 backdrop-blur-md border-b border-[#8B0000]/20 flex items-center justify-between px-8 sticky top-0 z-40">
            <div>
                <h1 className="font-oswald text-2xl tracking-[0.2em] text-[#EDEDED]">
                    {section}
                </h1>
                <p className="font-mono text-[10px] text-[#8B0000] tracking-widest mt-1">
                    SYS.OP: {session?.user?.name?.toUpperCase() || session?.user?.email?.split('@')[0].toUpperCase() || "UNKNOWN"}
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

                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-2 px-4 py-2 border border-[#8B0000]/30 hover:bg-[#8B0000] hover:text-black transition-colors font-mono text-xs uppercase tracking-widest text-white group"
                >
                    <IconLogout size={16} />
                    <span className="hidden sm:inline">Abort</span>
                </button>
            </div>
        </header>
    );
}
