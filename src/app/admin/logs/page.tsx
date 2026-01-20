import prisma from "@/lib/prisma";
import { IconActivity } from "@tabler/icons-react";

export const dynamic = 'force-dynamic';

export default async function LogsPage() {
    let logs: any[] = [];
    try {
        logs = await prisma.activityLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: 100,
            include: { actor: { select: { email: true } } }
        });
    } catch (e) {
        console.error("DB Error:", e);
    }

    return (
        <div className="space-y-6">
            <h2 className="font-oswald text-2xl text-white tracking-widest border-b border-white/10 pb-4">
                SYSTEM LOGS (V5)
            </h2>

            <div className="bg-black border border-white/10">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-white/5 text-[10px] uppercase font-mono text-gray-500">
                        <tr>
                            <th className="p-4">Timestamp</th>
                            <th className="p-4">Action</th>
                            <th className="p-4">Details</th>
                            <th className="p-4">Actor</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-xs">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 opacity-50">
                                    {new Date(log.createdAt).toLocaleString()}
                                </td>
                                <td className="p-4 text-[#8B0000]">
                                    {log.action}
                                </td>
                                <td className="p-4 text-white">
                                    {log.details}
                                </td>
                                <td className="p-4 text-gray-500">
                                    {log.actor?.email || "SYSTEM"}
                                </td>
                            </tr>
                        ))}
                        {logs.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-600 italic">
                                    NO LOGS FOUND
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
