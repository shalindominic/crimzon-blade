"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Portal from "@/components/Portal";
import { SignInButton, SignedIn, SignedOut, useClerk } from "@clerk/nextjs";

export default function MobileMenu() {
    const [open, setOpen] = useState(false);
    const { signOut } = useClerk();

    useEffect(() => {
        const btn = document.getElementById("open-menu");
        if (!btn) return;
        btn.onclick = () => setOpen(true);

        // Cleanup to prevent memory leaks if component unmounts (though it's root level)
        return () => {
            btn.onclick = null;
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    if (!open) return null;

    return (
        <Portal>
            <div className="fixed inset-0 z-[99999] h-[100svh] bg-black text-white overflow-y-auto overscroll-contain">
                {/* Header */}
                <div className="sticky top-0 z-[60] flex items-center justify-between px-6 py-4 bg-black border-b border-white/10">
                    <span className="font-oswald font-bold tracking-widest text-xl">CRIMZON BLADE</span>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-2xl p-2 -mr-2 text-white hover:text-crimson transition-colors"
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                </div>

                {/* Menu */}
                <nav className="flex flex-col px-6 py-10 font-oswald tracking-widest">
                    <div className="flex flex-col gap-6 text-2xl">
                        <Link href="/crimzon" onClick={() => setOpen(false)} className="hover:text-crimson transition-colors">CRIMZON</Link>
                        <Link href="/the-blade" onClick={() => setOpen(false)} className="hover:text-crimson transition-colors">THE BLADE</Link>
                        <Link href="/vault" onClick={() => setOpen(false)} className="hover:text-crimson transition-colors">VAULT</Link>
                        <Link href="/drops" onClick={() => setOpen(false)} className="hover:text-crimson transition-colors">DROPS</Link>
                    </div>

                    <div className="w-16 h-[1px] bg-crimson/50 my-8"></div>

                    <div className="flex flex-col gap-6 text-xl">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button onClick={() => setOpen(false)} className="text-left hover:text-crimson transition-colors">
                                    LOGIN
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <Link href="/account" onClick={() => setOpen(false)} className="hover:text-crimson transition-colors">ACCOUNT</Link>
                            <button onClick={() => signOut(() => setOpen(false))} className="text-left text-ash hover:text-white transition-colors">
                                SIGNOUT
                            </button>
                        </SignedIn>
                    </div>

                    <Link
                        href="/armory"
                        onClick={() => setOpen(false)}
                        className="mt-10 border border-white/20 bg-white/5 px-6 py-4 text-center text-xl hover:bg-crimson hover:border-crimson transition-colors"
                    >
                        ENTER THE ARMORY
                    </Link>
                </nav>
            </div>
        </Portal>
    );
}
