"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

function useCountdown(targetDate: string) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const target = new Date(targetDate).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = target - now;

            if (difference <= 0) {
                clearInterval(interval);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return timeLeft;
}

export function DropsClient({ targetDate, title, image }: { targetDate: string, title: string, image?: string }) {
    const timeLeft = useCountdown(targetDate);

    return (
        <div className="relative z-10 text-center space-y-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-sm md:text-base font-oswald text-crimson tracking-[0.5em] uppercase mb-4">
                    Upcoming Drop // {title}
                </h1>
                <h2 className="text-6xl md:text-9xl font-oswald font-bold text-white tracking-tighter">
                    CLASSIFIED
                </h2>
            </motion.div>

            {/* Countdown */}
            <motion.div
                className="flex justify-center gap-8 md:gap-16 font-oswald text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="flex flex-col items-center">
                        <span className="text-4xl md:text-6xl font-bold bg-black/50 border border-white/10 p-4 rounded-sm min-w-[80px] md:min-w-[120px]">
                            {value.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs text-gray-500 uppercase tracking-widest mt-2">{unit}</span>
                    </div>
                ))}
            </motion.div>

            {/* Silhouette / Teaser */}
            <motion.div
                className="w-full max-w-lg mx-auto h-[300px] bg-black/20 border border-white/5 relative flex items-center justify-center overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-10" />
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt="Teaser" className="w-[80%] h-[80%] object-contain blur-sm grayscale opacity-50" />
                ) : (
                    <div className="w-[80%] h-[80%] bg-white/5 blur-md" />
                )}

                <div className="absolute z-20 bg-charcoal/80 border border-crimson/30 px-6 py-2 backdrop-blur-md">
                    <span className="text-crimson font-mono text-xs tracking-widest animate-pulse">
                        ENCRYPTED SIGNAL
                    </span>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
            >
                <Button variant="outline" className="border-white/20 hover:bg-white/5">
                    NOTIFY ME
                </Button>
                <p className="mt-4 text-xs text-gray-600 font-mono">
                    ACCESS WILL UNLOCK AUTOMATICALLY UPON ZERO HOUR
                </p>
            </motion.div>
        </div>
    );
}
