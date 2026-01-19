"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";


const vaultItems = [
    { id: 1, name: "Phantom Jacket", type: "Gear", rarity: "Legendary", status: "OWNED", image: "/placeholder.png" },
    { id: 2, name: "Shadow Hoodie", type: "Gear", rarity: "Epic", status: "LOCKED", image: null },
    { id: 3, name: "Void Pants", type: "Gear", rarity: "Rare", status: "LOCKED", image: null },
    { id: 4, name: "Stealth Cap", type: "Gear", rarity: "Uncommon", status: "LOCKED", image: null },
    { id: 5, name: "Blade Tee v1", type: "Gear", rarity: "Common", status: "OWNED", image: "/placeholder.png" },
    { id: 6, name: "Crimzon Key", type: "Artifact", rarity: "Legendary", status: "LOCKED", image: null },
    { id: 7, name: "Sector 7 Map", type: "Artifact", rarity: "Rare", status: "LOCKED", image: null },
    { id: 8, name: "???", type: "Unknown", rarity: "Unknown", status: "HIDDEN", image: null },
];

export default function VaultPage() {
    const { isSignedIn, user } = useUser();

    return (
        <div className="min-h-screen bg-charcoal pt-32 pb-20 px-6">
            <div className="container mx-auto">
                <div className="mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white uppercase tracking-tighter mb-4">
                        The Vault
                    </h1>
                    <p className="text-gray-500 font-sans tracking-widest uppercase">
                        {isSignedIn
                            ? `WELCOME, ${user?.firstName?.toUpperCase()} // STATUS: AUTHORIZED`
                            : "RESTRICTED ARCHIVES // PLEASE AUTHENTICATE"
                        }
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {vaultItems.map((item, index) => {
                        const isOwned = item.status === "OWNED";
                        const isHidden = item.status === "HIDDEN";

                        return (
                            <motion.div
                                key={item.id}
                                className={cn(
                                    "relative aspect-square border flex flex-col items-center justify-center p-6 text-center transition-all duration-300",
                                    isOwned ? "bg-white/5 border-crimson/50 hover:bg-crimson/10" : "bg-black/40 border-white/5 opacity-50 grayscale"
                                )}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: isHidden ? 0.3 : isOwned ? 1 : 0.6, scale: 1 }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                            >
                                {/* Status Indicator */}
                                <div className="absolute top-4 right-4">
                                    {isOwned ? (
                                        <div className="w-2 h-2 bg-crimson rounded-full shadow-[0_0_8px_#DC143C]" />
                                    ) : (
                                        <div className="w-2 h-2 bg-gray-700 rounded-full" />
                                    )}
                                </div>

                                {/* Content */}
                                {isHidden ? (
                                    <div className="text-4xl text-white/10 font-oswald font-bold">???</div>
                                ) : (
                                    <>
                                        <div className={cn("text-3xl md:text-5xl mb-4", isOwned ? "text-white" : "text-white/20")}>
                                            {isOwned ? "✦" : "🔒"}
                                        </div>
                                        <h3 className={cn("font-oswald uppercase text-lg tracking-wide", isOwned ? "text-white" : "text-gray-600")}>
                                            {item.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 font-mono mt-2 uppercase">
                                            {item.rarity} // {item.type}
                                        </p>
                                    </>
                                )}

                                {/* Overlay for Locked */}
                                {!isOwned && !isHidden && (
                                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-xs font-oswald tracking-widest text-white border border-white/20 px-3 py-1">
                                            LOCKED
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
