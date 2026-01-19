import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
export const getStripe = () => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
        // Return null or throw error depending on strictness. 
        // For now, we return null to allow UI to show "Config needed" state.
        return null;
    }
    return loadStripe(key);
};
