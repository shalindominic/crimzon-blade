"use client";

import { useEffect, useState } from "react";
// Removed createPortal - rendering directly in layout
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SignInButton, SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { useMenu } from "@/context/MenuContext";

const IconClose = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export function MobileMenu() {
    const { isOpen, closeMenu } = useMenu();
    const { signOut } = useClerk();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Lock Body Scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeMenu();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [closeMenu]);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] bg-black text-white h-[100svh] w-screen overflow-y-auto overscroll-contain"
                >
                    {/* SCROLLABLE CONTENT WRAPPER */}
                    <div className="flex flex-col w-full min-h-full">
                        {/* STICKY HEADER */}
                        <header className="sticky top-0 z-[60] flex h-20 items-center justify-between px-6 bg-black border-b border-white/10 shrink-0">
                            <span className="font-oswald text-xl font-bold tracking-widest uppercase">
                                Crimzon Blade
                            </span>
                            <button
                                onClick={closeMenu}
                                className="p-2 -mr-2 text-white hover:text-crimson transition-colors"
                                aria-label="Close Menu"
                            >
                                <IconClose />
                            </button>
                        </header>

                        <div className="flex-1 flex flex-col w-full px-8 py-10 pb-32">
                            <nav className="flex flex-col w-full gap-y-8">
                                {/* MAIN LINKS */}
                                <div className="flex flex-col w-full gap-y-6">
                                    <Link
                                        href="/crimzon"
                                        onClick={closeMenu}
                                        className="block font-oswald text-5xl font-bold tracking-tighter hover:text-crimson uppercase transition-colors shrink-0"
                                    >
                                        CRIMZON
                                    </Link>
                                    <Link
                                        href="/the-blade"
                                        onClick={closeMenu}
                                        className="block font-oswald text-5xl font-bold tracking-tighter hover:text-crimson uppercase transition-colors shrink-0"
                                    >
                                        THE BLADE
                                    </Link>
                                    <Link
                                        href="/vault"
                                        onClick={closeMenu}
                                        className="block font-oswald text-5xl font-bold tracking-tighter text-ash hover:text-white uppercase transition-colors shrink-0"
                                    >
                                        VAULT
                                    </Link>
                                    <Link
                                        href="/drops"
                                        onClick={closeMenu}
                                        className="block font-oswald text-5xl font-bold tracking-tighter text-ash hover:text-white uppercase transition-colors shrink-0"
                                    >
                                        DROPS
                                    </Link>
                                </div>

                                <div className="w-16 h-[1px] bg-crimson/50 my-2 shrink-0" />

                                {/* AUTH & ACTIONS */}
                                <div className="flex flex-col w-full gap-y-6">
                                    <SignedOut>
                                        <SignInButton mode="modal">
                                            <button onClick={closeMenu} className="text-left font-oswald text-2xl tracking-widest hover:text-crimson uppercase transition-colors shrink-0">
                                                ENTER SYSTEM / LOGIN
                                            </button>
                                        </SignInButton>
                                    </SignedOut>

                                    <SignedIn>
                                        <Link href="/account" onClick={closeMenu} className="block font-oswald text-2xl tracking-widest hover:text-crimson uppercase transition-colors shrink-0">
                                            MY PROFILE
                                        </Link>
                                        <button
                                            onClick={() => signOut(() => closeMenu())}
                                            className="text-left font-oswald text-lg text-ash hover:text-white uppercase transition-colors tracking-widest shrink-0"
                                        >
                                            DISCONNECT
                                        </button>
                                    </SignedIn>
                                </div>

                                {/* PRIMARY CTA */}
                                <div className="pt-8 pb-12 shrink-0">
                                    <Link
                                        href="/armory"
                                        onClick={closeMenu}
                                        className="block w-full text-center border border-white/20 bg-white/5 py-5 font-oswald text-2xl tracking-widest hover:bg-crimson hover:border-crimson transition-all uppercase"
                                    >
                                        ENTER THE ARMORY
                                    </Link>
                                </div>
                            </nav>

                            {/* FOOTER DECORATION */}
                            <div className="mt-auto pt-6 border-t border-white/5 text-center shrink-0">
                                <p className="text-xs text-white/20 font-mono tracking-[0.2em]">FORGED IN SILENCE</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
