import { sanityFetch } from "@/sanity/lib/fetch";
import { ALL_PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { ArmoryClient } from "./ArmoryClient";

export default async function ArmoryPage() {
    // This runs on the server!
    const products = await sanityFetch<any[]>({ query: ALL_PRODUCTS_QUERY });

    return (
        <div className="min-h-screen bg-charcoal pt-32 pb-20 px-6">
            <ArmoryClient products={products} />
        </div>
    );
}
