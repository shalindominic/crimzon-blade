import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import { GeneratorForm } from "./GeneratorForm";
import { DROP_METADATA } from "@/lib/drops";

export const dynamic = 'force-dynamic';

export default async function CodesPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const codes = await sanityFetch<any[]>({
        query: groq`*[_type == "unlockCode"] | order(_createdAt desc)`
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: GENERATOR */}
            <div>
                <GeneratorForm />
            </div>

            {/* RIGHT: LIST */}
            <div className="lg:col-span-2">
                <h2 className="font-oswald text-2xl uppercase tracking-wider mb-6 text-white">Active Unlock Codes (V3)</h2>
                <div className="bg-black/40 border border-white/5 overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-white/5 text-xs uppercase font-oswald text-white">
                            <tr>
                                <th className="p-4">Code</th>
                                <th className="p-4">Drop / Item</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono">
                            {codes.map((code) => {
                                const dropInfo = DROP_METADATA[code.drop];
                                const isUsed = code.used;
                                return (
                                    <tr key={code._id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-white font-bold">{code.code}</td>
                                        <td className="p-4">
                                            <span className="text-white block">{dropInfo?.name || code.drop}</span>
                                            <span className="text-xs text-gray-500">{dropInfo?.rarity}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-[10px] uppercase border ${isUsed ? 'border-crimson text-crimson' : 'border-green-500 text-green-500'
                                                }`}>
                                                {isUsed ? 'USED' : 'ACTIVE'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-xs">
                                            {isUsed ? (
                                                <div className="flex flex-col">
                                                    <span>By: {code.usedBy?.slice(0, 15) || "Anonymous"}...</span>
                                                    <span className="opacity-50">{new Date(code.usedAt).toLocaleDateString()}</span>
                                                </div>
                                            ) : "-"}
                                        </td>
                                    </tr>
                                )
                            })}
                            {codes.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-600">
                                        NO CODES FOUND IN DATABASE
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
