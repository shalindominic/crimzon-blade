"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative w-full h-auto py-32 md:h-screen md:py-0 flex flex-col items-center justify-center overflow-hidden bg-charcoal">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/50 via-charcoal to-charcoal z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-crimson/5 blur-[120px] rounded-full z-0 opacity-50 animate-pulse" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="font-oswald text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white uppercase leading-none">
                        Crimzon <span className="text-crimson">Blade</span>
                    </h1>
                </motion.div>

                <motion.p
                    className="font-sans text-gray-400 tracking-[0.3em] uppercase text-sm md:text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                >
                    Forged in Silence
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <Link href="/armory">
                        <Button size="lg" variant="outline" className="mt-8 border-white/10 hover:border-crimson/50 hover:bg-crimson/10">
                            Enter The Armory
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Grid overlay for texture */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] z-0 pointer-events-none" />
        </section>
    );
}
