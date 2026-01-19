import { sanityFetch } from "@/sanity/lib/fetch";
import { ALL_DROPS_QUERY } from "@/sanity/lib/queries";
import { DropsClient } from "./DropsClient";

export default async function DropsPage() {
    const drops = await sanityFetch<any[]>({ query: ALL_DROPS_QUERY });
    const nextDrop = drops.length > 0 ? drops[0] : null;

    return (
        <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center relative px-6 overflow-hidden">
            {/* Background Pulse */}
            <div className="absolute inset-0 bg-crimson/5 animate-pulse z-0 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

            {nextDrop ? (
                <DropsClient targetDate={nextDrop.dropDate} title={nextDrop.title} image={nextDrop.imageUrl} />
            ) : (
                <div className="relative z-10 text-center">
                    <h1 className="text-xl font-oswald text-gray-500 uppercase tracking-widest">
                        No Signals Detected
                    </h1>
                </div>
            )}
        </div>
    );
}
