"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function MascotTeaser() {
    return (
        <section className="w-full py-32 px-6 bg-charcoal relative overflow-hidden">
            <div className="absolute inset-0 bg-crimson/5 z-0" />

            <div className="container mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-16 relative z-10">

                <div className="flex-1 space-y-8 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-oswald font-bold text-white uppercase tracking-tight">
                            The <span className="text-crimson">Mascot</span>
                        </h2>
                        <p className="mt-6 text-gray-400 font-sans leading-relaxed max-w-md">
                            More than a symbol. An entity. Unlock rarity forms and discover the origins of the Blade.
                        </p>

                        <div className="mt-10">
                            <Link href="/crimzon">
                                <Button variant="outline" size="md">
                                    Enter the Lore
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Silhouette Placeholder */}
                <div className="flex-1 w-full h-[400px] flex items-center justify-center relative">
                    <div className="w-64 h-64 bg-black rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <div className="text-9xl text-white/5 font-oswald font-bold select-none">
                        ?
                    </div>
                </div>

            </div>
        </section>
    );
}
