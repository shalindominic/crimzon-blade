"use client";

import { motion } from "framer-motion";

const tiers = [
    { name: "Common", color: "text-gray-400" },
    { name: "Uncommon", color: "text-green-500" },
    { name: "Rare", color: "text-blue-500" },
    { name: "Epic", color: "text-purple-500" },
    { name: "Legendary", color: "text-gold" },
];

export function RaritySystem() {
    return (
        <section className="w-full py-32 px-6 bg-[#0E0E0E]">
            <div className="container mx-auto text-center">
                <h3 className="font-oswald text-2xl text-white tracking-widest mb-16 uppercase">
                    Rarity Hierarchy
                </h3>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            className="flex flex-col items-center gap-4 group cursor-default"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            <div className={`text-4xl font-oswald font-bold uppercase tracking-tight transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] ${tier.color}`}>
                                {tier.name}
                            </div>
                            <div className="w-1 h-8 bg-white/5 group-hover:bg-white/20 transition-colors" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
