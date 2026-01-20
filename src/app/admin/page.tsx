import prisma from "@/lib/prisma";
import { StatsCard } from "@/components/admin/StatsCard";
import { IconKey, IconShieldLock, IconBoxSeam, IconUsers } from "@tabler/icons-react";

// Force dynamic to fetch fresh stats
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    // Parallel fetching with error handling for missing DB
    let totalCodes = 0;
    let usedCodes = 0;
    let activeDrops = 0;
    let userUnlocks = 0;
    let recentLogs: any[] = [];

    try {
        [totalCodes, usedCodes, activeDrops, userUnlocks, recentLogs] = await Promise.all([
            prisma.unlockCode.count(),
            prisma.unlockCode.count({ where: { status: 'used' } }), // or usedBy != null
            prisma.drop.count({ where: { status: 'Live' } }),
            prisma.userUnlock.count(),
            prisma.activityLog.findMany({ take: 5, orderBy: { createdAt: 'desc' } })
        ]);
    } catch (e) {
        console.error("DB Connection Error:", e);
    }

    const redemptionRate = totalCodes > 0 ? Math.round((usedCodes / totalCodes) * 100) : 0;

    return (
        <div className="space-y-8">
            <h2 className="font-oswald text-xl text-white tracking-widest border-b border-white/10 pb-4">
                COMMAND OVERVIEW (V5)
            </h2>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    label="TOTAL CODES"
                    value={totalCodes}
                    icon={<IconKey size={20} />}
                />
                <StatsCard
                    label="REDEMPTION RATE"
                    value={`${redemptionRate}%`}
                    icon={<IconShieldLock size={20} />}
                    trendColor={redemptionRate > 50 ? "green" : "gray"}
                />
                <StatsCard
                    label="LIVE OPERATIONS"
                    value={activeDrops}
                    icon={<IconBoxSeam size={20} />}
                />
                <StatsCard
                    label="TOTAL UNLOCKS"
                    value={userUnlocks}
                    icon={<IconUsers size={20} />}
                />
            </div>

            {/* ACTIVITY LOGS (Placeholder Structure if DB empty) */}
            <div className="bg-white/5 border border-white/10 overflow-hidden">
                <div className="p-4 bg-black border-b border-white/10">
                    <h3 className="font-mono text-xs text-gray-500">RECENT SYSTEM ACTIVITY</h3>
                </div>
                {recentLogs.length > 0 ? (
                    <table className="w-full text-left text-sm text-gray-400">
                        <tbody>
                            {recentLogs.map(log => (
                                <tr key={log.id} className="border-b border-white/5">
                                    <td className="p-3 font-mono text-xs">{log.action}</td>
                                    <td className="p-3 text-white">{log.details}</td>
                                    <td className="p-3 text-xs opacity-50">{new Date(log.createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center font-mono text-xs text-[#8B0000]">
                        NO ACTIVITY LOGS DETECTED OR DB OFFLINE
                    </div>
                )}
            </div>
        </div>
    );
}
