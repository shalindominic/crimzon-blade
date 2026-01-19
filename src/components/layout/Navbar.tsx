"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SignInButton, SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { useCart } from "@/context/CartContext"; // IMPORT CART CONTEXT

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
    const [isOpen, setIsOpen] = useState(false);
    const { signOut } = useClerk();
    const { openCart, items } = useCart(); // USE CART HOOK

    const toggleMenu = () => setIsOpen(!isOpen);

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-6 md:px-12 bg-void/90 backdrop-blur-md border-b border-white/5">
            <Link href="/" className="group z-50">
                <span className="font-oswald text-2xl font-bold tracking-widest text-white transition-colors group-hover:text-crimson">
                    CRIMZON BLADE
                </span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center space-x-8">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative group py-2"
                        >
                            <span className={cn(
                                "font-oswald text-sm font-medium tracking-wider transition-colors duration-300",
                                isActive ? "text-crimson" : "text-ash group-hover:text-white"
                            )}>
                                {link.name}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-crimson shadow-[0_0_10px_#8B0000]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </Link>
                    );
                })}

                {/* Auth Actions (Desktop) */}
                <div className="flex items-center gap-4 pl-4 border-l border-white/10">

                    {/* CART TRIGGER */}
                    <button
                        onClick={openCart}
                        className="relative text-ash hover:text-white transition-colors p-2 mr-2"
                        aria-label="Open Loadout"
                    >
                        <IconBag />
                        {items.length > 0 && (
                            <span className="absolute top-1 right-0 w-2 h-2 bg-crimson rounded-full shadow-[0_0_5px_#8B0000]"></span>
                        )}
                    </button>

                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="text-sm font-oswald tracking-widest text-ash hover:text-white uppercase transition-colors">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/account" className={cn(
                            "font-oswald text-sm font-medium tracking-wider transition-colors duration-300 mr-4",
                            pathname === "/account" ? "text-crimson" : "text-ash hover:text-white"
                        )}>
                            ACCOUNT
                        </Link>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8 rounded-none border border-white/20 hover:border-crimson transition-colors"
                                }
                            }}
                        />
                    </SignedIn>
                </div>
            </div>

            {/* MOBILE MENU TRIGGER */}
            <div className="md:hidden flex items-center gap-4 z-50">
                {/* Mobile Cart Trigger */}
                <button
                    onClick={openCart}
                    className="relative text-white hover:text-crimson transition-colors p-1"
                    aria-label="Open Loadout"
                >
                    <IconBag />
                    {items.length > 0 && (
                        <span className="absolute top-0 right-0 w-2 h-2 bg-crimson rounded-full shadow-[0_0_5px_#8B0000]"></span>
                    )}
                </button>

                <button
                    className="group flex flex-col justify-between h-5 w-8 p-1 ml-2"
                    onClick={toggleMenu}
                >
                    <div className={cn("w-full h-[2px] bg-white transition-all duration-300 group-hover:bg-crimson", isOpen && "rotate-45 translate-y-1.5")} />
                    <div className={cn("w-full h-[2px] bg-white transition-all duration-300 group-hover:bg-crimson", isOpen && "opacity-0")} />
                    <div className={cn("w-full h-[2px] bg-white transition-all duration-300 group-hover:bg-crimson", isOpen && "-rotate-45 -translate-y-1.5")} />
                </button>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }} // Heavy slow easing
                        className="fixed inset-0 bg-void z-40 flex flex-col justify-center px-8 overflow-y-auto"
                    >
                        <div className="flex flex-col space-y-8">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="font-oswald text-4xl font-bold tracking-tight text-white hover:text-crimson uppercase transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="w-12 h-[1px] bg-white/20 my-4" />

                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button onClick={closeMenu} className="text-left font-oswald text-3xl text-ash hover:text-white uppercase transition-colors">
                                        ENTER SYSTEM / LOGIN
                                    </button>
                                </SignInButton>
                            </SignedOut>

                            <SignedIn>
                                <Link href="/account" onClick={closeMenu} className="font-oswald text-3xl text-ash hover:text-white uppercase transition-colors">
                                    MY PROFILE
                                </Link>
                                <button
                                    onClick={() => signOut(() => closeMenu())}
                                    className="text-left font-oswald text-xl text-crimson/80 hover:text-crimson uppercase transition-colors mt-4"
                                >
                                    DISCONNECT
                                </button>
                            </SignedIn>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
