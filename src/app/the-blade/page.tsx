"use client";

import { motion } from "framer-motion";


export default function TheBladePage() {
    return (
        <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
            <div className="max-w-2xl text-center space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-6xl md:text-8xl font-oswald font-bold uppercase tracking-tighter text-white mb-6">
                        The Blade
                    </h1>
                    <div className="w-24 h-1 bg-crimson mx-auto mb-12" />
                </motion.div>

                <motion.div
                    className="space-y-8 font-serif text-lg md:text-xl text-gray-400 leading-relaxed italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <p>"We do not speak. We build."</p>
                    <p>
                        Crimzon Blade was founded on the principle that luxury is silence. In a world of noise, we forge armor for the quiet few.
                        Those who move in the shadows. Those who understand that power does not need to shout.
                    </p>
                    <p>
                        Our garments are engineered rituals. Limited. Numbered. Eternal.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
