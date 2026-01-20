import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import { ForgeClient } from "./ForgeClient";
import { CodesTable } from "./CodesTable";

export const dynamic = 'force-dynamic';

export default async function CodesPage() {
    // Fetch Drops (for Forge) and Codes (for Table)
    const [drops, codes] = await Promise.all([
        sanityFetch<any[]>({ query: groq`*[_type == "drop"] { _id, title, status }` }),
        sanityFetch<any[]>({ query: groq`*[_type == "unlockCode"] | order(_createdAt desc)` })
    ]);

    // Create a map of Drop ID -> Title for easy lookup in table
    const dropMap = drops.reduce((acc, drop) => {
        acc[drop._id] = drop.title;
        return acc;
    }, {} as Record<string, string>);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-140px)]">
            {/* LEFT: FORGE */}
            <div className="h-full">
                <ForgeClient drops={drops} />
            </div>

            {/* RIGHT: TABLE */}
            <div className="lg:col-span-2 h-full">
                <CodesTable codes={codes} dropMap={dropMap} />
            </div>
        </div>
    );
}
