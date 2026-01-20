import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import { DropsClient } from "./DropsClient";

export const dynamic = 'force-dynamic';

export default async function DropsPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const drops = await sanityFetch<any[]>({
        query: groq`*[_type == "drop"] | order(dropDate desc) {
            _id,
            title,
            status,
            dropDate
        }`
    });

    return <DropsClient drops={drops} />;
}
