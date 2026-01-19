"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";


export default function CrimzonPage() {
    return (
        <div className="min-h-screen bg-charcoal text-white">
            {/* Hero */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-crimson/10 to-charcoal z-0" />

                <div className="relative z-10 text-center space-y-6 max-w-4xl px-6">
                    <motion.h1
                        className="text-6xl md:text-9xl font-oswald font-bold uppercase tracking-tighter"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Crimzon
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl font-sans text-gray-400 tracking-widest uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        The Spirit of the Blade
                    </motion.p>
                </div>
            </section>

            {/* Lore Section */}
            <section className="py-20 px-6 bg-black/50">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-oswald text-crimson uppercase mb-8">Origin Protocol</h2>
                        <div className="space-y-6 text-gray-400 font-sans leading-relaxed">
                            <p>
                                Born from the static of the old world, Crimzon represents the chaotic energy of rebellion focused into a singular point.
                            </p>
                            <p>
                                It is said that every artifact in the Armory contains a shard of Crimzon&apos;s code. To possess the gear is to invite the entity into your reality.
                            </p>
                            <p>
                                The Brotherhood of the Blade serves as the keepers of this entity, ensuring its power remains contained within the rituals of the drop.
                            </p>
                        </div>
                    </div>
                    <div className="h-[400px] border border-white/10 bg-white/5 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                        <span className="text-9xl text-white/5 font-oswald font-bold">?</span>
                    </div>
                </div>
            </section>

            {/* Wallpapers / Downloads */}
            <section className="py-20 px-6">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-oswald uppercase tracking-widest mb-12">Digital Artifacts</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-64 h-96 bg-gray-900 border border-white/5 relative group cursor-pointer overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-crimson/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-6 left-0 right-0">
                                    <Button variant="ghost" size="sm">DOWNLOAD V{i}.0</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
