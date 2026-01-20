import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import { StatsCard } from "@/components/admin/StatsCard";
import { IconKey, IconShieldLock, IconBoxSeam, IconUsers } from "@tabler/icons-react";
import { DROP_METADATA } from "@/lib/drops";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    // Parallel Fetching for Dashboard Stats
    const [
        totalCodes,
        usedCodes,
        activeDrops,
        userUnlocks,
        recentActivity
    ] = await Promise.all([
        sanityFetch<number>({ query: groq`count(*[_type == "unlockCode"])` }),
        sanityFetch<number>({ query: groq`count(*[_type == "unlockCode" && used == true])` }),
        sanityFetch<number>({ query: groq`count(*[_type == "drop" && status == "Live"])` }),
        sanityFetch<number>({ query: groq`count(*[_type == "userUnlock"])` }),
        sanityFetch<any[]>({
            query: groq`*[_type == "userUnlock"] | order(unlockedAt desc)[0..9] {
                _id,
                itemId,
                userId,
                unlockedAt
            }`
        })
    ]);

    const redemptionRate = totalCodes > 0 ? Math.round((usedCodes / totalCodes) * 100) : 0;

    return (
        <div className="space-y-8">
            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    label="TOTAL CODES"
                    value={totalCodes}
                    icon={<IconKey size={20} />}
                    trend="+12%" // Placeholder for real trend data
                />
                <StatsCard
                    label="ACT. REDEMPTION"
                    value={`${redemptionRate}%`}
                    icon={<IconShieldLock size={20} />}
                    trendColor={redemptionRate > 50 ? "green" : "gray"}
                />
                <StatsCard
                    label="LIVE DROPS"
                    value={activeDrops}
                    icon={<IconBoxSeam size={20} />}
                />
                <StatsCard
                    label="TOTAL OPERATORS"
                    value={userUnlocks} // Proxy for active users for now
                    icon={<IconUsers size={20} />}
                />
            </div>

            {/* QUICK ACTIONS / RECENT ACTIVITY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="font-oswald text-xl uppercase tracking-wider mb-6 text-white border-b border-white/10 pb-4">
                        Recent Log Entries
                    </h2>
                    <div className="bg-white/5 border border-white/10 overflow-hidden">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-black text-[10px] uppercase font-mono text-gray-500">
                                <tr>
                                    <th className="p-4">Timestamp</th>
                                    <th className="p-4">Operator ID</th>
                                    <th className="p-4">Access Granted</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {recentActivity.map((log) => (
                                    <tr key={log._id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-mono text-xs">
                                            {new Date(log.unlockedAt).toLocaleString()}
                                        </td>
                                        <td className="p-4 font-mono text-xs text-crimson">
                                            {log.userId?.slice(-8) || "UNKNOWN"}
                                        </td>
                                        <td className="p-4 text-white uppercase tracking-wider">
                                            {DROP_METADATA[log.itemId]?.name || log.itemId}
                                        </td>
                                    </tr>
                                ))}
                                {recentActivity.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="p-8 text-center font-mono">
                                            NO ACTIVITY LOGGED
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <h2 className="font-oswald text-xl uppercase tracking-wider mb-6 text-white border-b border-white/10 pb-4">
                        System Status
                    </h2>
                    <div className="bg-black border border-[#8B0000]/30 p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs text-gray-500">API LATENCY</span>
                            <span className="font-mono text-xs text-green-500">24ms</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs text-gray-500">DB STATUS</span>
                            <span className="font-mono text-xs text-green-500">OPTIMAL</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs text-gray-500">VERSION</span>
                            <span className="font-mono text-xs text-white">v4.0.0</span>
                        </div>
                        <div className="h-px bg-[#8B0000]/30 my-4" />
                        <div className="text-[10px] text-gray-600 font-mono leading-relaxed">
                            ALL SYSTEMS NOMINAL. SECURITY PROTOCOLS ACTIVE. UNLOCK SEQUENCES READY.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
