import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import { DropsClient } from "../drops/DropsClient"; // Reuse DropsClient for consistency

export const dynamic = 'force-dynamic';

export default async function ArmoryPage() {
    // Re-using drops management as 'Armory Control' since Drop Status dictates visibility
    const drops = await sanityFetch<any[]>({
        query: groq`*[_type == "drop"] | order(dropDate desc) {
            _id,
            title,
            status,
            dropDate
        }`
    });

    return (
        <div>
            <div className="mb-8 border-b border-white/10 pb-4">
                <h2 className="font-oswald text-2xl uppercase tracking-wider text-white">
                    Armory Authorization
                </h2>
                <p className="font-mono text-xs text-gray-500 mt-2">
                    CONTROL GLOBAL VISIBILITY OF COLLECTIONS. STATUS 'LIVE' = VISIBLE IN ARMORY.
                </p>
            </div>
            <DropsClient drops={drops} />
        </div>
    );
}
