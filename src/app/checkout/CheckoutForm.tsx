"use client";

import { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const { subtotal } = useCart();

    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("RITUAL COMPLETE. Payment succeeded.");
                    break;
                case "processing":
                    setMessage("RITUAL IN PROGRESS...");
                    break;
                case "requires_payment_method":
                    setMessage("RITUAL HALTED. Payment verification needed.");
                    break;
                default:
                    setMessage("RITUAL FAILED. Try again.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || "An unexpected error occurred.");
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement
                id="payment-element"
                options={{
                    layout: "tabs",

                }}
            />

            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="w-full bg-crimson text-white font-oswald uppercase tracking-widest py-4 text-xl hover:bg-white hover:text-crimson transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <span className="animate-pulse">COMMENCING RITUAL...</span>
                ) : (
                    `SACRIFICE $${subtotal}`
                )}
            </button>

            {/* Show any error or success messages */}
            {message && <div id="payment-message" className="text-crimson font-mono text-sm border border-crimson/50 p-2 text-center">{message}</div>}
        </form>
    );
}
