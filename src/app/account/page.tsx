"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function AccountPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [claimCode, setClaimCode] = useState("");
    const [status, setStatus] = useState<"IDLE" | "VERIFYING" | "SUCCESS" | "ERROR">("IDLE");
    const [message, setMessage] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [claimedItem, setClaimedItem] = useState<any>(null);

    const handleClaim = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!claimCode) return;

        setStatus("VERIFYING");
        setMessage("AUTHENTICATING SIGNAL...");

        try {
            const res = await fetch("/api/claim", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: claimCode }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("SUCCESS");
                setClaimedItem(data);
                setMessage("ARTIFACT SECURED");
                setClaimCode("");
            } else {
                setStatus("ERROR");
                setMessage(data.message || "VERIFICATION FAILED");
            }
        } catch {
            setStatus("ERROR");
            setMessage("SYSTEM FAILURE");
        }
    };

    if (!isLoaded) return <div className="min-h-screen bg-void flex items-center justify-center text-white font-oswald animate-pulse">LOADING PROFILE...</div>;

    if (!isSignedIn) return <div className="min-h-screen bg-void flex items-center justify-center text-white font-oswald">ACCESS DENIED. PLEASE SIGN IN.</div>;

    return (
        <div className="min-h-screen bg-void pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-4xl">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={user.imageUrl}
                            alt={user.fullName || "User"}
                            className="w-20 h-20 border border-white/10"
                        />
                        <div>
                            <h1 className="text-3xl md:text-5xl font-oswald font-bold text-white uppercase tracking-tighter">
                                {user.fullName || user.username || "COLLECTOR"}
                            </h1>
                            <p className="text-ash font-sans tracking-widest uppercase mt-2 text-xs md:text-sm">
                                ID: {user.id} {`//`} RANK: INITIATE
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-16">
                    {/* CLAIM SECTION */}
                    <section className="bg-iron/20 border border-white/5 p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-crimson" />

                        <h2 className="text-2xl font-oswald text-white uppercase tracking-widest mb-6">
                            Authenticate Artifact
                        </h2>

                        <form onSubmit={handleClaim} className="max-w-md">
                            <div className="flex flex-col gap-4">
                                <label className="text-xs text-ash uppercase tracking-widest">
                                    Enter Verification Code
                                </label>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={claimCode}
                                        onChange={(e) => {
                                            setClaimCode(e.target.value.toUpperCase());
                                            setStatus("IDLE");
                                        }}
                                        placeholder="XXXX-XXXX-XXXX"
                                        className="bg-void border border-white/20 px-4 py-3 text-white font-mono tracking-widest flex-grow focus:outline-none focus:border-crimson transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === "VERIFYING" || !claimCode}
                                        className="bg-white text-void font-oswald font-bold px-8 py-3 uppercase tracking-widest hover:bg-crimson hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === "VERIFYING" ? "Scanning..." : "Verify"}
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* STATUS FEEDBACK */}
                        <AnimatePresence mode="wait">
                            {status === "ERROR" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-6 text-crimson font-mono text-sm tracking-wider"
                                >
                                    ⚠ ERROR: {message}
                                </motion.div>
                            )}

                            {status === "SUCCESS" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 border border-crimson/50 bg-crimson/10 p-6"
                                >
                                    <p className="text-crimson font-oswald text-xl uppercase tracking-widest mb-2">
                                        Verification Successful
                                    </p>
                                    <p className="text-white font-sans text-sm mb-4">
                                        {message}
                                    </p>

                                    {claimedItem && (
                                        <div className="flex items-center gap-4 bg-void p-4 border border-white/10">
                                            {claimedItem.product?.imageUrl && (
                                                <>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={claimedItem.product.imageUrl} className="w-16 h-16 object-cover" alt="Artifact" />
                                                </>
                                            )}
                                            <div>
                                                <div className="text-white font-bold font-oswald uppercase">{claimedItem.product?.name}</div>
                                                <div className="text-crimson text-xs font-mono uppercase">Edition #{claimedItem.edition}</div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                    {/* EXISTING SECTIONS */}
                    <section>
                        <h2 className="text-xl font-oswald text-white uppercase tracking-widest mb-6 border-l-4 border-white/20 pl-4">
                            Active Inventory
                        </h2>
                        {/* Static Placeholder for now - Dynamic integration comes later */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50">
                            <div className="bg-white/5 border border-white/5 p-6 flex items-center gap-6">
                                <div className="w-20 h-20 bg-black border border-white/10 flex items-center justify-center">
                                    <span className="text-2xl">🔒</span>
                                </div>
                                <div>
                                    <h3 className="font-oswald text-lg text-white uppercase">Vault Access</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Level 1 Clearance</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
