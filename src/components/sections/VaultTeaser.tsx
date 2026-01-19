"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function VaultTeaser() {
    return (
        <section className="w-full py-48 px-6 bg-black text-center relative overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-8 grid grid-cols-5 gap-4 opacity-30">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="aspect-square bg-white/10 rounded-sm border border-white/5 flex items-center justify-center">
                                <div className="w-2 h-2 bg-white/20 rounded-full" />
                            </div>
                        ))}
                    </div>

                    <h2 className="text-5xl md:text-7xl font-oswald font-bold text-white uppercase tracking-tighter">
                        The Vault
                    </h2>
                    <p className="text-gray-500 font-sans text-lg tracking-widest mt-4">
                        ARCHIVED // LOCKED // LEGENDARY
                    </p>
                    <div className="mt-12">
                        <Link href="/vault">
                            <Button variant="ghost" className="border-b border-white/20 hover:border-crimson pb-1 rounded-none px-0 h-auto">
                                ACCESS ARCHIVES
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
