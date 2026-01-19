"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SuccessPage() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
            <motion.div
                className="max-w-md w-full text-center space-y-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="w-24 h-24 mx-auto bg-crimson/10 border border-crimson rounded-full flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <div>
                    <h1 className="text-4xl font-oswald font-bold text-white uppercase tracking-tighter mb-2">
                        Ritual Complete
                    </h1>
                    <p className="text-gray-400 font-mono text-sm uppercase">
                        Ownership Transferred. Artifacts Dispatched.
                    </p>
                </div>

                <div className="bg-black border border-white/10 p-6 text-left space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 uppercase">Status</span>
                        <span className="text-crimson font-bold uppercase">PAID / CONFIRMED</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 uppercase">Est. Arrival</span>
                        <span className="text-white font-mono">T-MINUS 3 DAYS</span>
                    </div>
                </div>

                <div className="pt-4">
                    <Link
                        href="/vault"
                        className="inline-block bg-white text-void font-oswald font-bold px-8 py-3 uppercase tracking-widest hover:bg-crimson hover:text-white transition-all duration-300"
                    >
                        Return to Vault
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
