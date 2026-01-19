"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

// Simple SVG Icons
const IconClose = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const IconTrash = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
);
const IconPlus = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const IconMinus = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export function CartDrawer() {
    const { isOpen, closeCart, items, subtotal, removeItem, updateQuantity } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* BACKDROP */}
                    <motion.div
                        className="fixed inset-0 bg-void/80 backdrop-blur-sm z-[60]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                    />

                    {/* DRAWER */}
                    <motion.div
                        className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-charcoal border-l border-white/10 z-[70] flex flex-col shadow-2xl"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                    >
                        {/* HEADER */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div>
                                <h2 className="text-xl font-oswald text-white uppercase tracking-widest">
                                    Loadout Cache
                                </h2>
                                <p className="text-xs text-ash font-mono uppercase">
                                    {items.length} Artifacts Secured
                                </p>
                            </div>
                            <button
                                onClick={closeCart}
                                className="text-ash hover:text-crimson transition-colors p-2"
                            >
                                <IconClose />
                            </button>
                        </div>

                        {/* ITEMS */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <div className="text-4xl mb-4">⛓</div>
                                    <p className="font-oswald text-xl uppercase tracking-widest text-ash">Cache Empty</p>
                                    <p className="text-xs font-mono text-gray-600 mt-2">NO ARTIFACTS SECURED</p>
                                </div>
                            ) : (
                                items.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        {/* IMAGE */}
                                        <div className="w-24 h-32 bg-white/5 border border-white/10 relative overflow-hidden flex-shrink-0">
                                            {item.image ? (
                                                <>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-700 font-oswald">IMG</div>
                                            )}
                                        </div>

                                        {/* DETAILS */}
                                        <div className="flex-grow flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-white font-oswald uppercase text-lg leading-tight">
                                                        {item.name}
                                                    </h3>
                                                    <button onClick={() => removeItem(item.id)} className="text-gray-600 hover:text-crimson transition-colors">
                                                        <IconTrash />
                                                    </button>
                                                </div>
                                                <p className="text-crimson font-mono text-xs uppercase mt-1">
                                                    Size: {item.size}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-end">
                                                {/* QUANTITY CONTROLS */}
                                                <div className="flex items-center border border-white/10 bg-black/20">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-2 text-ash hover:text-white hover:bg-white/5 transition-colors"
                                                    >
                                                        <IconMinus />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-mono text-white">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-2 text-ash hover:text-white hover:bg-white/5 transition-colors"
                                                    >
                                                        <IconPlus />
                                                    </button>
                                                </div>

                                                <div className="font-oswald text-white tracking-wider">
                                                    ${item.price * item.quantity}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* FOOTER */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-charcoal">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-ash font-oswald uppercase tracking-widest text-sm">Total Value</span>
                                    <span className="text-2xl font-oswald text-white font-bold tracking-tight">
                                        ${subtotal}
                                    </span>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={closeCart}
                                    className="block w-full bg-white text-void font-oswald font-bold text-center py-4 uppercase tracking-[0.2em] hover:bg-crimson hover:text-white transition-all duration-300"
                                >
                                    Proceed To Claim
                                </Link>
                                <p className="text-[10px] text-gray-600 font-mono mt-4 text-center uppercase">
                                    Encrypted Transaction // Secure Channel
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
