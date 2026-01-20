import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import { StatsCard } from "@/components/admin/StatsCard";
import { IconChartBar, IconActivity } from "@tabler/icons-react";
import { DROP_METADATA } from "@/lib/drops";

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
    const logs = await sanityFetch<any[]>({
        query: groq`*[_type == "userUnlock"] | order(unlockedAt desc)[0..500] {
             _id,
            itemId,
            userId,
            unlockedAt,
            source
        }`
    });

    return (
        <div className="space-y-8">
            <h2 className="font-oswald text-2xl uppercase tracking-wider text-white border-b border-white/10 pb-4">
                Intelligence & Analytics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatsCard
                    label="TOTAL EVENTS LOGGED"
                    value={logs.length}
                    icon={<IconChartBar size={20} />}
                />
                <StatsCard
                    label="SYSTEM ACTIVITY"
                    value="HIGH"
                    icon={<IconActivity size={20} />}
                    trendColor="green"
                />
            </div>

            <div className="bg-black border border-white/10">
                <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                    <span className="font-mono text-xs text-[#8B0000]">EVENT STREAM</span>
                    <span className="font-mono text-[10px] text-gray-600">LAST 500 ENTRIES</span>
                </div>
                <div className="h-[600px] overflow-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-black text-[10px] uppercase font-mono text-gray-500 sticky top-0">
                            <tr>
                                <th className="p-4">Time</th>
                                <th className="p-4">Source</th>
                                <th className="p-4">Operator</th>
                                <th className="p-4">Target</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono text-xs">
                            {logs.map((log) => (
                                <tr key={log._id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 opacity-50">
                                        {new Date(log.unlockedAt).toLocaleString()}
                                    </td>
                                    <td className="p-4 uppercase text-[#8B0000]">
                                        [{log.source}]
                                    </td>
                                    <td className="p-4 text-white">
                                        {log.userId}
                                    </td>
                                    <td className="p-4">
                                        {DROP_METADATA[log.itemId]?.name || log.itemId}
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
