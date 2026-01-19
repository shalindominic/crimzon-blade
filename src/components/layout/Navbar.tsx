"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SignInButton, SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import { useState, useEffect } from "react";
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

const IconClose = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { signOut } = useClerk();
    const { openCart, items } = useCart();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    // Lock Body Scroll when Menu is Open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    // Close on Escape Key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeMenu();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <>
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

                {/* MOBILE MENU TRIGGER (Only visible when closed) */}
                <div className="md:hidden flex items-center gap-4 z-50">
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
                        aria-label="Open Menu"
                    >
                        <div className="w-full h-[2px] bg-white transition-all duration-300 group-hover:bg-crimson" />
                        <div className="w-full h-[2px] bg-white transition-all duration-300 group-hover:bg-crimson" />
                        <div className="w-full h-[2px] bg-white transition-all duration-300 group-hover:bg-crimson" />
                    </button>
                </div>
            </nav>

            {/* FULL SCREEN MENU OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="mobile-nav-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
                    >
                        {/* HEADER inside Overlay */}
                        <div className="flex h-20 items-center justify-between px-6 border-b border-white/5 bg-void/50">
                            <span className="font-oswald text-xl font-bold tracking-widest text-white">
                                CRIMZON BLADE
                            </span>

                            {/* CLOSE BUTTON */}
                            <button
                                onClick={closeMenu}
                                className="p-2 text-white hover:text-crimson transition-colors"
                                aria-label="Close Menu"
                            >
                                <IconClose />
                            </button>
                        </div>

                        {/* MENU CONTENT */}
                        <div className="flex-1 overflow-y-auto px-8 py-12 flex flex-col justify-start space-y-8">
                            <div className="flex flex-col space-y-6">
                                {links.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 + (i * 0.05), duration: 0.4, ease: "easeOut" }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={closeMenu}
                                            className="block font-oswald text-4xl sm:text-5xl font-bold tracking-tighter text-white hover:text-crimson uppercase transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="w-16 h-[1px] bg-crimson/50 my-6" />

                            {/* AUTH MOBILE */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="flex flex-col space-y-6"
                            >
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button onClick={closeMenu} className="text-left font-oswald text-2xl text-ash hover:text-white uppercase transition-colors tracking-widest">
                                            ENTER SYSTEM / LOGIN
                                        </button>
                                    </SignInButton>
                                </SignedOut>

                                <SignedIn>
                                    <Link href="/account" onClick={closeMenu} className="font-oswald text-2xl text-ash hover:text-white uppercase transition-colors tracking-widest">
                                        MY PROFILE
                                    </Link>
                                    <button
                                        onClick={() => signOut(() => closeMenu())}
                                        className="text-left font-oswald text-lg text-crimson hover:text-red-500 uppercase transition-colors mt-2 tracking-widest"
                                    >
                                        DISCONNECT
                                    </button>
                                </SignedIn>
                            </motion.div>
                        </div>

                        {/* FOOTER DECORATION */}
                        <div className="p-6 border-t border-white/5 text-center">
                            <p className="text-xs text-white/20 font-mono tracking-[0.2em]">FORGED IN SILENCE</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
