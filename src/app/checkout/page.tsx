"use client";

import { useCart } from "@/context/CartContext"; // We need this for the left column summary
import CheckoutClient from "./CheckoutClient";
import Image from "next/image";

export default function CheckoutPage() {
    const { items, subtotal } = useCart();

    return (
        <div className="min-h-screen bg-charcoal pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-4xl md:text-6xl font-oswald font-bold text-white uppercase tracking-tighter mb-16 border-b border-white/10 pb-8">
                    The Dark Ritual <span className="text-crimson text-xl align-top font-mono ml-4">// PAYMENT_GATEWAY</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* LEFT: ORDER SUMMARY */}
                    <div className="space-y-8">
                        <div className="border border-white/10 bg-white/5 p-8">
                            <h2 className="text-xl font-oswald text-white uppercase tracking-widest mb-6">
                                Manifest
                            </h2>

                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 border-b border-white/5 pb-4">
                                        <div className="w-20 h-24 bg-black border border-white/10 flex-shrink-0 overflow-hidden">
                                            {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-white font-oswald uppercase tracking-wider">{item.name}</h3>
                                                <span className="text-as font-mono text-sm">${item.price * item.quantity}</span>
                                            </div>
                                            <div className="text-crimson text-xs font-mono uppercase mt-1">
                                                Size: {item.size} // Qty: {item.quantity}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-end">
                                <div className="text-xs text-ash font-mono uppercase">
                                    Total Required Sacrifice
                                </div>
                                <div className="text-4xl font-oswald text-white font-bold tracking-tighter">
                                    ${subtotal}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono text-gray-500 uppercase">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Secure Connection Established (TLS 1.3)
                        </div>
                    </div>

                    {/* RIGHT: STRIPE ELEMENTS */}
                    <div className="bg-black border border-white/10 p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="text-white animate-spin-slow">
                                <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                            </svg>
                        </div>

                        <h2 className="text-xl font-oswald text-white uppercase tracking-widest mb-6 relative z-10">
                            Payment Details
                        </h2>

                        <CheckoutClient />
                    </div>
                </div>
            </div>
        </div>
    );
}
