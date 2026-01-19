import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import Link from "next/link";

const STATS_QUERY = groq`{
    "totalProducts": count(*[_type == "product"]),
    "totalOrders": count(*[_type == "order"]),
    "pendingOrders": count(*[_type == "order" && status == "pending"]),
    "activeCodes": count(*[_type == "claimCode" && status == "active"]),
    "claimedCodes": count(*[_type == "claimCode" && status == "claimed"]),
}`;

export default async function AdminPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stats = await sanityFetch<any>({ query: STATS_QUERY });

    return (
        <div className="space-y-12">
            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Active Codes"
                    value={stats.activeCodes}
                    sub="Ready for claim"
                    href="/admin/codes"
                />
                <StatCard
                    label="Claimed Codes"
                    value={stats.claimedCodes}
                    sub="Redeemed artifacts"
                    href="/admin/codes"
                />
                <StatCard
                    label="Pending Orders"
                    value={stats.pendingOrders}
                    sub="Awaiting dispatch"
                    accent
                    href="/admin/orders"
                />
                <StatCard
                    label="Total Products"
                    value={stats.totalProducts}
                    sub="In Armory"
                    href="/armory"
                />
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-black/40 border border-white/5 p-8">
                    <h2 className="font-oswald text-2xl uppercase tracking-wider mb-4 text-white">Claim Codes</h2>
                    <p className="text-gray-400 font-sans mb-6">Generated codes allow specialized users to claim specific artifacts via the verification system.</p>
                    <Link href="/admin/codes">
                        <button className="bg-white text-black font-oswald uppercase px-6 py-3 hover:bg-crimson hover:text-white transition-colors tracking-widest text-sm font-bold">
                            Manage Codes
                        </button>
                    </Link>
                </div>

                <div className="bg-black/40 border border-white/5 p-8">
                    <h2 className="font-oswald text-2xl uppercase tracking-wider mb-4 text-white">Order Management</h2>
                    <p className="text-gray-400 font-sans mb-6">Review ritual transactions, check payment statuses, and mark artifacts as dispatched.</p>
                    <Link href="/admin/orders">
                        <button className="border border-white/20 text-white font-oswald uppercase px-6 py-3 hover:border-crimson hover:text-crimson transition-colors tracking-widest text-sm font-bold">
                            View Orders
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatCard({ label, value, sub, accent = false, href }: any) {
    return (
        <Link href={href || "#"}>
            <div className={`p-6 bg-charcoal border transition-colors duration-300 group ${accent ? "border-crimson/50 hover:bg-crimson/10" : "border-white/10 hover:border-white/30"}`}>
                <h3 className="text-gray-500 font-oswald uppercase text-xs tracking-widest mb-2">{label}</h3>
                <div className={`text-4xl font-oswald font-bold tracking-tighter ${accent ? "text-crimson" : "text-white group-hover:text-white"}`}>
                    {value}
                </div>
                <p className="text-xs font-mono text-gray-600 mt-2 uppercase group-hover:text-gray-400 transition-colors">{sub}</p>
            </div>
        </Link>
    );
}
