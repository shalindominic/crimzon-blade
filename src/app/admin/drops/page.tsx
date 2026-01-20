import prisma from "@/lib/prisma";
import { DropsClient } from "./DropsClient";

export const dynamic = 'force-dynamic';

export default async function DropsPage() {
    let drops: any[] = [];
    try {
        drops = await prisma.drop.findMany({
            orderBy: { dropDate: 'desc' }
        });
    } catch (e) {
        console.error("DB Error:", e);
    }

    return <DropsClient drops={drops} />;
}
