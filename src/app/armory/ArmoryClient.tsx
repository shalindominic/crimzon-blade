"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/shop/ProductCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ArmoryClient({ products }: { products: any[] }) {
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

                <div className="text-right hidden md:block">
                    <p className="text-xs text-crimson font-mono">
                        SYS.STATUS: ONLINE<br />
                        INVENTORY: {products.length} UNITS
                    </p>
                </div>
            </motion.div>

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
        </div>
    );
}
