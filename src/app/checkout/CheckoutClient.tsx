"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import CheckoutForm from "./CheckoutForm";
import { useCart } from "@/context/CartContext";

const stripePromise = getStripe();

export default function CheckoutClient() {
    const [clientSecret, setClientSecret] = useState<string>("");
    const { items, subtotal } = useCart();
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (items.length === 0) {
            setInitializing(false);
            return;
        }

        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
                setInitializing(false);
            })
            .catch((err) => {
                console.error("Payment init failed", err);
                setInitializing(false);
            });
    }, [items]);

    if (initializing) {
        return (
            <div className="flex items-center justify-center min-h-[400px] text-white font-oswald animate-pulse">
                INITIALIZING SECURE CHANNEL...
            </div>
        );
    }

    if (!stripePromise || !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        return (
            <div className="border border-crimson p-8 bg-black">
                <h2 className="text-crimson font-oswald text-2xl uppercase mb-4">Configuration Required</h2>
                <p className="text-gray-400 font-mono text-sm mb-4">
                    The payment gateway is offline. Missing API Keys.
                </p>
                <div className="bg-white/5 p-4 rounded text-xs font-mono text-ash">
                    Please add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env.local
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-white font-oswald text-3xl uppercase">Cart Empty</h2>
                <p className="text-gray-500 font-mono mt-2">No artifacts to secure.</p>
            </div>
        );
    }

    const appearance = {
        theme: 'night' as const,
        variables: {
            colorPrimary: '#8B0000',
            colorBackground: '#0B0B0B',
            colorText: '#ededed',
            colorDanger: '#8B0000',
            fontFamily: 'Inter, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '0px',
        },
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="w-full">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}
