"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductProps {
    id: string;
    name: string;
    rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
    edition: string;
    image?: string;
    price: string;
}

const rarityColors = {
    Common: "border-gray-600 text-gray-400 shadow-gray-900",
    Uncommon: "border-green-800 text-green-500 shadow-green-900",
    Rare: "border-blue-800 text-blue-500 shadow-blue-900",
    Epic: "border-purple-800 text-purple-500 shadow-purple-900",
    Legendary: "border-gold text-gold shadow-[0_0_20px_rgba(212,175,55,0.3)]",
};

export function ProductCard({ product }: { product: ProductProps }) {
    return (
        <motion.div
            className={cn(
                "relative group bg-charcoal border overflow-hidden transition-all duration-500 hover:border-crimson",
                (rarityColors[product.rarity as keyof typeof rarityColors] || rarityColors["Common"]).split(" ")[0] // border color only
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none" />

            {/* Rarity Badge */}
            <div className={cn(
                "absolute top-4 left-4 text-xs font-oswald uppercase tracking-widest px-2 py-1 border z-10",
                rarityColors[product.rarity]
            )}>
                {product.rarity} {`//`} {product.edition}
            </div>

            {/* Image Container */}
            <div className="h-[400px] w-full flex items-center justify-center bg-gradient-to-b from-transparent to-black/50 group-hover:bg-crimson/5 transition-colors duration-500">
                {/* Placeholder for Product Image */}
                <div className="w-48 h-64 bg-black/20 backdrop-blur-sm border border-white/5 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-700">
                    <span className="text-white/10 font-oswald text-4xl rotate-90 tracking-widest">
                        [ VISUAL ]
                    </span>
                </div>
            </div>

            {/* Footer / Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-oswald text-white uppercase tracking-tight mb-1 group-hover:text-crimson transition-colors">
                    {product.name}
                </h3>
                <p className="font-sans text-gray-500 text-sm mb-6">{product.price}</p>

                <Link href={`/armory/${product.id}`} className="block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <Button variant="outline" className="w-full border-crimson/30 text-crimson hover:bg-crimson hover:text-white">
                        INSPECT ITEM
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}
