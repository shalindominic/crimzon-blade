import { sanityFetch } from "@/sanity/lib/fetch";
import { PRODUCT_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { ProductDetailsClient } from "./ProductDetailsClient";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const product = await sanityFetch<any>({
        query: PRODUCT_BY_ID_QUERY,
        params: { id }
    });

    if (!product) {
        return notFound();
    }

    return <ProductDetailsClient product={product} />;
}
