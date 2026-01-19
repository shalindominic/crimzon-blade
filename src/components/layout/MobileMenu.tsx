"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SignInButton, SignedIn, SignedOut, useClerk } from "@clerk/nextjs";

const IconClose = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col text-white w-screen h-[100svh] overflow-y-auto overscroll-contain"
                    style={{
                        paddingTop: "env(safe-area-inset-top)",
                        paddingBottom: "env(safe-area-inset-bottom)",
                    }}
                >
                    {/* STICKY HEADER */}
                    <header className="sticky top-0 z-50 flex h-20 items-center justify-between px-6 bg-black/50 backdrop-blur-md border-b border-white/10 shrink-0">
                        <span className="font-oswald text-xl font-bold tracking-widest uppercase">
                            Crimzon Blade
                        </span>
                        <button
                            onClick={onClose}
                            className="p-2 -mr-2 text-white hover:text-crimson transition-colors"
                            aria-label="Close Menu"
                        >
                            <IconClose />
                        </button>
                    </header>

                    {/* SCROLLABLE CONTENT */}
                    <div className="flex-1 flex flex-col px-8 py-10 overflow-y-auto">
                        <nav className="flex flex-col space-y-8">
                            {/* MAIN LINKS */}
                            <div className="flex flex-col space-y-6">
                                <Link
                                    href="/crimzon"
                                    onClick={onClose}
                                    className="block font-oswald text-5xl font-bold tracking-tighter hover:text-crimson uppercase transition-colors"
                                >
                                    CRIMZON
                                </Link>
                                <Link
                                    href="/the-blade"
                                    onClick={onClose}
                                    className="block font-oswald text-5xl font-bold tracking-tighter hover:text-crimson uppercase transition-colors"
                                >
                                    THE BLADE
                                </Link>
                                <Link
                                    href="/vault"
                                    onClick={onClose}
                                    className="block font-oswald text-5xl font-bold tracking-tighter text-ash hover:text-white uppercase transition-colors"
                                >
                                    VAULT
                                </Link>
                                <Link
                                    href="/drops"
                                    onClick={onClose}
                                    className="block font-oswald text-5xl font-bold tracking-tighter text-ash hover:text-white uppercase transition-colors"
                                >
                                    DROPS
                                </Link>
                            </div>

                            <div className="w-16 h-[1px] bg-crimson/50 my-2" />

                            {/* AUTH & ACTIONS */}
                            <div className="flex flex-col space-y-6">
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button onClick={onClose} className="text-left font-oswald text-2xl tracking-widest hover:text-crimson uppercase transition-colors">
                                            ENTER SYSTEM / LOGIN
                                        </button>
                                    </SignInButton>
                                </SignedOut>

                                <SignedIn>
                                    <Link href="/account" onClick={onClose} className="font-oswald text-2xl tracking-widest hover:text-crimson uppercase transition-colors">
                                        MY PROFILE
                                    </Link>
                                    <button
                                        onClick={() => signOut(() => onClose())}
                                        className="text-left font-oswald text-lg text-ash hover:text-white uppercase transition-colors tracking-widest"
                                    >
                                        DISCONNECT
                                    </button>
                                </SignedIn>
                            </div>

                            {/* PRIMARY CTA */}
                            <div className="pt-8 pb-12">
                                <Link
                                    href="/armory"
                                    onClick={onClose}
                                    className="inline-block w-full text-center border border-white/20 bg-white/5 py-5 font-oswald text-2xl tracking-widest hover:bg-crimson hover:border-crimson transition-all uppercase"
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
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
