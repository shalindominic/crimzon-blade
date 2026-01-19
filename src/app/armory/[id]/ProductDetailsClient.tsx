"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";

interface ProductDetailsClientProps {
    product: any;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const isLegendary = product.rarity === "Legendary";

    const handleAddToCart = () => {
        if (!selectedSize && product.sizes) {
            alert("SELECT A SIZE, REQUIEM."); // Minimalist alert, ideally a toast
            return;
        }

        addItem({
            productId: product._id,
            name: product.name,
            price: product.price || 0, // Ensure price exists
            image: product.imageUrl,
            size: selectedSize || "One Size",
            quantity: 1,
            maxQuantity: 5
        });
    };

    return (
        <div className="min-h-screen bg-charcoal pt-24 pb-20 px-6 flex items-center">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left: Visuals */}
                <motion.div
                    className="relative h-[60vh] w-full bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden group"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-black/80 ${isLegendary ? "group-hover:bg-gold/5" : "group-hover:bg-crimson/5"} transition-colors duration-500`} />
                    <div className="absolute top-4 left-4 text-xs font-mono text-gray-500">
                        FIG. 001 // VISUAL_FEED
                    </div>

                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="relative z-10 max-h-[80%] object-contain drop-shadow-2xl" />
                    ) : (
                        <div className="text-9xl font-oswald font-bold text-white/5 tracking-widest rotate-90 select-none">
                            {product.name.split(" ")[0]}
                        </div>
                    )}

                    <div className={`absolute w-64 h-64 rounded-full blur-[100px] opacity-20 ${isLegendary ? "bg-gold" : "bg-crimson"}`} />
                </motion.div>

                {/* Right: Details */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className={`inline-block px-3 py-1 mb-4 border text-xs font-oswald uppercase tracking-widest ${isLegendary ? "border-gold text-gold" : "border-crimson text-crimson"}`}>
                            {product.rarity} // {product.edition}
                        </div>

                        <h1 className="text-5xl md:text-6xl font-oswald font-bold text-white uppercase tracking-tighter mb-2">
                            {product.name}
                        </h1>
                        <p className="text-xl text-gray-500 font-sans">${product.price}</p>
                    </motion.div>

                    <motion.div
                        className="space-y-6 border-t border-white/10 pt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div>
                            <h3 className="text-gray-400 font-oswald tracking-widest text-sm mb-2 uppercase">Core Specs</h3>
                            <p className="text-gray-300 font-sans leading-relaxed text-sm">
                                {product.description}
                            </p>
                        </div>

                        <div className="bg-white/5 p-6 border-l-2 border-crimson">
                            <h3 className="text-crimson font-oswald tracking-widest text-sm mb-2 uppercase flex items-center gap-2">
                                <span className="w-2 h-2 bg-crimson rounded-full animate-pulse" />
                                Archive Lore
                            </h3>
                            <p className="text-gray-400 font-sans italic text-sm">
                                "{product.lore}"
                            </p>
                        </div>

                        {product.sizes && (
                            <div>
                                <h3 className="text-gray-400 font-oswald tracking-widest text-sm mb-4 uppercase">Select Size</h3>
                                <div className="flex gap-4">
                                    {product.sizes.map((size: string) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 font-oswald ${selectedSize === size
                                                    ? "bg-white text-black border-white"
                                                    : "border-white/20 text-gray-500 hover:border-white hover:text-white"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.contents && (
                            <div>
                                <h3 className="text-gray-400 font-oswald tracking-widest text-sm mb-2 uppercase">Package Contents</h3>
                                <ul className="text-gray-500 text-sm space-y-1 font-mono">
                                    {product.contents.map((item: string, i: number) => (
                                        <li key={i}>+ {item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="pt-8">
                            <Button
                                size="lg"
                                variant={isLegendary ? "legendary" : "primary"}
                                className="w-full md:w-auto"
                                onClick={handleAddToCart}
                            >
                                ADD TO LOADOUT
                            </Button>
                            <p className="text-xs text-gray-600 mt-4 text-center md:text-left">
                                By claiming, you agree to the ritualistic transfer of ownership.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
