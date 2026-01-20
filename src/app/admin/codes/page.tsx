import prisma from "@/lib/prisma";
import { ForgeClient } from "./ForgeClient";
import { CodesTable } from "./CodesTable";

// Force dynamic
export const dynamic = 'force-dynamic';

export default async function CodesPage() {
    let drops: any[] = [];
    let codes: any[] = [];

    try {
        [drops, codes] = await Promise.all([
            prisma.drop.findMany({
                select: { id: true, title: true, status: true },
                orderBy: { dropDate: 'desc' }
            }),
            prisma.unlockCode.findMany({
                orderBy: { createdAt: 'desc' },
                include: { drop: { select: { title: true } }, user: { select: { email: true, id: true } } }
            })
        ]);
    } catch (e) {
        console.error("DB Error:", e);
    }

    // Map drop title for table
    const dropMap = drops.reduce((acc, drop) => {
        acc[drop.id] = drop.title;
        return acc;
    }, {} as Record<string, string>);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-140px)]">
            <div className="h-full">
                <ForgeClient drops={drops} />
            </div>
            <div className="lg:col-span-2 h-full">
                <CodesTable codes={codes} dropMap={dropMap} />
            </div>
        </div>
    );
}
