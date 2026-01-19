"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function LatestDrop() {
    return (
        <section className="w-full py-32 md:py-48 px-6 bg-charcoal relative border-b border-white/5">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

                {/* Text Content */}
                <div className="flex-1 space-y-8 text-center md:text-left z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-crimson font-oswald tracking-widest text-sm mb-2">LATEST DROP</h3>
                        <h2 className="text-4xl md:text-6xl font-oswald font-bold text-white uppercase tracking-tight">
                            Phantom <br /> Jacket <span className="text-gray-600">// 001</span>
                        </h2>
                        <p className="mt-6 text-gray-400 font-sans leading-relaxed max-w-md">
                            Constructed from ballistic nylon. Limited run of 300 units.
                            Each jacket embedded with a unique NFC chip authenticating its rarity.
                        </p>

                        <div className="mt-10">
                            <Link href="/armory">
                                <Button variant="primary" size="md">
                                    Inspect Item
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Image Placeholder */}
                <div className="flex-1 relative w-full aspect-[4/5] bg-gray-900/50 rounded-sm border border-white/5 flex items-center justify-center overflow-hidden z-10">
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-50" />
                    <span className="text-gray-700 font-oswald tracking-widest text-xl rotate-45 transform">
                        [ ITEM PREVIEW LOCKED ]
                    </span>
                </div>
            </div>
        </section>
    );
}
