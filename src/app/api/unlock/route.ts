import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        // Allow anonymous unlocking? Prompt implies "Account login + cloud sync". 
        // But also "Local-first (safe)". 
        // For the API, if we want to mark a code as used, we probably want a User ID for audit.
        // But maybe we allow anonymous if we just mark 'usedBy: anonymous'?
        // The prompt says: "Login on any device... Armory syncs instantly". 
        // Let's require Auth for the backend sync, but the Context can handle local-only if no auth?
        // Actually, preventing re-use requires a central state. So we MUST verify against DB.
        // If user is not logged in, we can't track *who* used it, but we can verify code validity.
        // But if we mark it used, it's used.
        // Let's assume for V3 "Advanced", we might require login, OR we pass a session ID?
        // Prompt step 4 is "Account login + cloud sync".
        // Let's optionally capture userId if present.

        const { code } = await req.json();
        if (!code) {
            return NextResponse.json({ error: "Code is required" }, { status: 400 });
        }

        // 1. Find the code in Sanity
        const codeDoc = await client.fetch(
            `*[_type == "unlockCode" && code == $code][0]`,
            { code }
        );

        if (!codeDoc) {
            return NextResponse.json({ error: "INVALID_CODE" }, { status: 404 });
        }

        if (codeDoc.used) {
            return NextResponse.json({ error: "CODE_ALREADY_USED" }, { status: 400 });
        }

        // 2. Mark code as used
        await client.patch(codeDoc._id).set({
            used: true,
            usedBy: userId || "anonymous",
            usedAt: new Date().toISOString(),
        }).commit();

        // 3. Create User Unlock record if user is logged in
        if (userId) {
            await client.create({
                _type: 'userUnlock',
                userId,
                itemId: codeDoc.drop,
                source: 'code',
                unlockedAt: new Date().toISOString(),
            });
        }

        // 4. Return success
        return NextResponse.json({
            success: true,
            drop: codeDoc.drop
        });

    } catch (error) {
        console.error("Unlock API Error:", error);
        return NextResponse.json({ error: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ unlocks: [] });
        }

        const unlocks = await client.fetch(
            `*[_type == "userUnlock" && userId == $userId]`,
            { userId }
        );

        return NextResponse.json({
            unlocks: unlocks.map((u: any) => u.itemId)
        });
    } catch (error) {
        console.error("Fetch Unlocks API Error:", error);
        return NextResponse.json({ error: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}
