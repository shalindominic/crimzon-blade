import prisma from "@/lib/prisma";
import { UsersClient } from "./UsersClient";

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
    let profiles: any[] = [];
    let drops: any[] = [];

    try {
        const [users, allDrops] = await Promise.all([
            // In V5, User is the main entity. We fetch users and their unlocks.
            // But UserUnlock also links user to drop. 
            prisma.user.findMany({
                include: {
                    unlocks: {
                        include: { drop: { select: { title: true } } },
                        orderBy: { unlockedAt: 'desc' },
                    }
                },
                orderBy: { createdAt: 'desc' },
                take: 100 // Safety limit
            }),
            prisma.drop.findMany({ select: { id: true, title: true } })
        ]);

        profiles = users.map(u => ({
            userId: u.id,
            email: u.email,
            unlocks: u.unlocks.map(ul => ({
                id: ul.id,
                title: ul.drop.title,
                unlockedAt: ul.unlockedAt.toISOString(),
                source: ul.source
            }))
        }));

        drops = allDrops;

    } catch (e) {
        console.error("DB Error:", e);
    }

    return <UsersClient profiles={profiles} drops={drops} />;
}
