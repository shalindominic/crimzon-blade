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
            <div className="fixed inset-0 z-[99999] h-[100svh] bg-black text-[#EDEDED] overflow-y-auto overscroll-contain">
                {/* Header */}
                <div className="sticky top-0 z-[60] flex items-center justify-between px-6 py-5 bg-black border-b border-[#8B0000]/30">
                    <span className="font-oswald font-bold tracking-[0.35em] text-sm">CRIMZON BLADE</span>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-xl p-2 -mr-2 text-[#EDEDED] hover:text-[#8B0000] transition-colors"
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                </div>

                {/* Menu */}
                <nav className="flex flex-col gap-10 px-6 py-16 font-oswald tracking-[0.3em] text-sm">
                    <Link href="/crimzon" onClick={() => setOpen(false)} className="hover:text-[#8B0000] transition-colors">CRIMZON</Link>
                    <Link href="/the-blade" onClick={() => setOpen(false)} className="hover:text-[#8B0000] transition-colors">THE BLADE</Link>
                    <Link href="/vault" onClick={() => setOpen(false)} className="hover:text-[#8B0000] transition-colors">VAULT</Link>
                    <Link href="/drops" onClick={() => setOpen(false)} className="hover:text-[#8B0000] transition-colors">DROPS</Link>


                    <div className="h-px bg-[#8B0000]/30 my-6"></div>


                    <div className="flex flex-col gap-6 text-xl">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button onClick={() => setOpen(false)} className="text-left hover:text-[#8B0000] transition-colors">
                                    LOGIN
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <Link href="/account" onClick={() => setOpen(false)} className="hover:text-[#8B0000] transition-colors">ACCOUNT</Link>
                            <button onClick={() => signOut(() => setOpen(false))} className="text-left text-[#777777] hover:text-[#EDEDED] transition-colors">
                                SIGNOUT
                            </button>
                        </SignedIn>
                    </div>

                    <Link
                        href="/armory"
                        onClick={() => setOpen(false)}
                        className="mt-6 border border-[#8B0000] px-6 py-5 text-center tracking-[0.35em] text-[#EDEDED] hover:bg-[#8B0000] hover:text-black transition-colors"
                    >
                        ENTER THE ARMORY
                    </Link>
                </nav>
            </div>
        </Portal>
    );
}
