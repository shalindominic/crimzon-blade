"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SignInButton, SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import { useCart } from "@/context/CartContext";

const links = [
    { name: "ARMORY", href: "/armory" },
    { name: "VAULT", href: "/vault" },
    { name: "DROPS", href: "/drops" },
    { name: "CRIMZON", href: "/crimzon" },
    { name: "THE BLADE", href: "/the-blade" },
];

const IconBag = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
);

export function Navbar() {
    const pathname = usePathname();
    const { openCart, items } = useCart();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-6 md:px-12 bg-black border-b border-[#8B0000]/30 shadow-sm">
            <Link href="/" className="group z-50">
                <span className="font-oswald text-sm font-bold tracking-[0.35em] text-[#EDEDED] transition-colors group-hover:text-[#8B0000]">
                    CRIMZON BLADE
                </span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center space-x-10">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative group py-2"
                        >
                            <span className={cn(
                                "font-oswald text-xs font-bold tracking-[0.25em] transition-colors duration-300",
                                isActive ? "text-[#8B0000]" : "text-[#EDEDED] group-hover:text-[#8B0000]"
                            )}>
                                {link.name}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B0000] shadow-[0_0_10px_#8B0000]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </Link>
                    );
                })}

                {/* Auth Actions (Desktop) */}
                <div className="flex items-center gap-4 pl-4 border-l border-[#8B0000]/30">

                    {/* CART TRIGGER */}
                    <button
                        onClick={openCart}
                        className="relative text-[#EDEDED] hover:text-[#8B0000] transition-colors p-2 mr-2"
                        aria-label="Open Loadout"
                    >
                        <IconBag />
                        {items.length > 0 && (
                            <span className="absolute top-1 right-0 w-2 h-2 bg-[#8B0000] rounded-full shadow-[0_0_5px_#8B0000]"></span>
                        )}
                    </button>

                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="text-xs font-oswald font-bold tracking-[0.25em] text-[#EDEDED] hover:text-[#8B0000] uppercase transition-colors">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/account" className={cn(
                            "font-oswald text-xs font-bold tracking-[0.25em] transition-colors duration-300 mr-4",
                            pathname === "/account" ? "text-[#8B0000]" : "text-[#EDEDED] hover:text-[#8B0000]"
                        )}>
                            ACCOUNT
                        </Link>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8 rounded-none border border-white/20 hover:border-[#8B0000] transition-colors"
                                }
                            }}
                        />
                    </SignedIn>
                </div>
            </div>

            {/* MOBILE MENU TRIGGER */}
            <div className="md:hidden flex items-center gap-4 z-50">
                <button
                    onClick={openCart}
                    className="relative text-[#EDEDED] hover:text-[#8B0000] transition-colors p-1"
                    aria-label="Open Loadout"
                >
                    <IconBag />
                    {items.length > 0 && (
                        <span className="absolute top-0 right-0 w-2 h-2 bg-[#8B0000] rounded-full shadow-[0_0_5px_#8B0000]"></span>
                    )}
                </button>

                <button
                    id="open-menu"
                    className="md:hidden text-[#EDEDED] text-2xl flex items-center justify-center p-2 hover:text-[#8B0000] transition-colors"
                    aria-label="Open Menu"
                >
                    ☰
                </button>
            </div>
        </nav>
    );
}
