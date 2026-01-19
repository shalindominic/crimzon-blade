import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { writeClient } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
        }

        const { code } = await req.json();

        if (!code || typeof code !== "string") {
            return NextResponse.json({ message: "INVALID INPUT" }, { status: 400 });
        }

        // 1. Find the code in Sanity
        const query = `*[_type == "claimCode" && code == $code][0]{
            _id,
            status,
            product->{
                name,
                slug,
                imageUrl
            },
            edition
        }`;

        const claimDoc = await writeClient.fetch(query, { code });

        if (!claimDoc) {
            return NextResponse.json({ message: "INVALID CODE" }, { status: 400 });
        }

        if (claimDoc.status === 'claimed') {
            return NextResponse.json({ message: "ALREADY CLAIMED" }, { status: 409 }); // 409 Conflict
        }

        if (claimDoc.status === 'revoked') {
            return NextResponse.json({ message: "CODE REVOKED" }, { status: 403 });
        }

        // 2. Perform the Transaction (Mark as claimed)
        await writeClient
            .patch(claimDoc._id)
            .set({
                status: 'claimed',
                claimedBy: userId,
                claimedAt: new Date().toISOString()
            })
            .commit();

        return NextResponse.json({
            success: true,
            message: "OWNERSHIP VERIFIED",
            product: claimDoc.product,
            edition: claimDoc.edition
        });

    } catch (error) {
        console.error("Claim Error:", error);
        return NextResponse.json({ message: "SYSTEM ERROR" }, { status: 500 });
    }
}
