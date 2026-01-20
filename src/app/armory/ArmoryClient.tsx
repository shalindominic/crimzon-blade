"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/shop/ProductCard";
import { useState } from "react";
import { useUnlocks } from "@/context/UnlockContext";
import CodeEntryModal from "@/components/CodeEntryModal";
import { COLLECTIONS } from "@/lib/collections";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ArmoryClient({ products }: { products: any[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { unlocked } = useUnlocks();

    return (
        <div className="container mx-auto">
            <motion.div
                className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div>
                    <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white uppercase tracking-tighter">
                        The Armory
                    </h1>
                    <p className="text-gray-500 font-sans tracking-widest mt-2 uppercase">
                        Secure // Inspect // Acquire
                    </p>
                </div>

                <div className="flex flex-col items-end gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-xs text-crimson font-mono">
                            SYS.STATUS: ONLINE<br />
                            INVENTORY: {products.length} UNITS
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="border border-[#8B0000] px-6 py-2 font-oswald text-sm tracking-[0.25em] text-[#EDEDED] hover:bg-[#8B0000] hover:text-black transition-colors"
                    >
                        ENTER CODE
                    </button>
                </div>
            </motion.div>

            {/* UNLOCKED COLLECTIONS */}
            {unlocked.length > 0 && (
                <div className="mb-16">
                    <h2 className="font-oswald tracking-[0.4em] text-sm text-[#8B0000] mb-6 border-b border-[#8B0000]/30 pb-2 inline-block">
                        UNLOCKED ACCESS
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {unlocked.map((id) => {
                            // Find the collection info from the ID (reverse lookup or safe access)
                            const collection = Object.values(COLLECTIONS).find(c => c.id === id);
                            return (
                                <div
                                    key={id}
                                    className="border border-[#8B0000]/30 bg-white/5 p-6 flex flex-col justify-between group hover:border-[#8B0000] transition-colors"
                                >
                                    <div>
                                        <div className="text-[10px] text-[#8B0000] tracking-[0.2em] mb-2 border border-[#8B0000]/30 inline-block px-2 py-1">
                                            {collection?.rarity || "UNKNOWN"}
                                        </div>
                                        <h3 className="font-oswald text-xl text-[#EDEDED] tracking-widest">
                                            {collection?.name || id}
                                        </h3>
                                    </div>
                                    <div className="mt-4 text-xs font-mono text-gray-500">
                                        ACCESS GRANTED
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {products.length === 0 ? (
                <div className="text-center py-20 border border-white/10 bg-white/5">
                    <p className="text-gray-500 font-oswald uppercase tracking-widest">
                        Inventory Depleted // Awaiting Supply Drop
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <ProductCard product={{
                                id: product._id,
                                name: product.name,
                                rarity: product.rarity,
                                edition: product.edition,
                                price: product.price,
                                image: product.imageUrl
                            }} />
                        </motion.div>
                    ))}
                </div>
            )}

            <CodeEntryModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
