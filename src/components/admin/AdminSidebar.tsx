"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    IconDashboard,
    IconKey,
    IconBoxSeam,
    IconUsers,
    IconShieldLock,
    IconChartBar,
    IconSettings
} from "@tabler/icons-react";

const NAV_ITEMS = [
    { name: "COMMAND", href: "/admin", icon: IconDashboard },
    { name: "CODES", href: "/admin/codes", icon: IconKey },
    { name: "DROPS", href: "/admin/drops", icon: IconBoxSeam },
    { name: "USERS", href: "/admin/users", icon: IconUsers },
    { name: "ARMORY", href: "/admin/armory", icon: IconShieldLock },
    { name: "INTEL", href: "/admin/analytics", icon: IconChartBar },
    { name: "SYSTEM", href: "/admin/settings", icon: IconSettings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-black border-r border-[#8B0000]/30 flex flex-col h-screen fixed left-0 top-0 z-50">
            <div className="h-20 flex items-center justify-center border-b border-[#8B0000]/30">
                <span className="font-oswald text-xl font-bold tracking-[0.25em] text-[#8B0000]">
                    ADMIN_V4
                </span>
            </div>

            <nav className="flex-1 py-8 space-y-2 px-4">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                                flex items-center gap-4 px-4 py-3 
                                font-mono text-xs tracking-widest transition-all duration-300
                                ${isActive
                                    ? "bg-[#8B0000]/10 text-[#8B0000] border-l-2 border-[#8B0000]"
                                    : "text-gray-500 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                                }
                            `}
                        >
                            <item.icon size={18} stroke={1.5} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-[#8B0000]/30">
                <div className="text-[10px] font-mono text-gray-600 text-center tracking-widest">
                    SECURE CONNECTION // ENCRYPTED
                </div>
            </div>
        </aside>
    );
}
