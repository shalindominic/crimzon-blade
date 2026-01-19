import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import { GeneratorForm } from "./GeneratorForm";

export default async function CodesPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const codes = await sanityFetch<any[]>({
        query: groq`*[_type == "claimCode"] | order(_createdAt desc)`
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const products = await sanityFetch<any[]>({
        query: groq`*[_type == "product"] { _id, name }`
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: GENERATOR */}
            <div>
                <GeneratorForm products={products} />
            </div>

            {/* RIGHT: LIST */}
            <div className="lg:col-span-2">
                <h2 className="font-oswald text-2xl uppercase tracking-wider mb-6 text-white">Active Codes Database</h2>
                <div className="bg-black/40 border border-white/5 overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-white/5 text-xs uppercase font-oswald text-white">
                            <tr>
                                <th className="p-4">Code</th>
                                <th className="p-4">Artifact</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Claimed By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono">
                            {codes.map((code) => (
                                <tr key={code._id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-white font-bold">{code.code}</td>
                                    <td className="p-4">{code.edition}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-[10px] uppercase border ${code.status === 'active' ? 'border-green-500 text-green-500' :
                                            code.status === 'claimed' ? 'border-crimson text-crimson' :
                                                'border-gray-500 text-gray-500'
                                            }`}>
                                            {code.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-xs">
                                        {code.claimedBy ? code.claimedBy.slice(0, 10) + "..." : "-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
