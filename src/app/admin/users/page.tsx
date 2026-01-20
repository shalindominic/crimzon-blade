import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import { UsersClient } from "./UsersClient";

export const dynamic = 'force-dynamic';

interface UserUnlockDoc {
    _id: string;
    userId: string;
    itemId: string;
    unlockedAt: string;
    source: string;
}

export default async function UsersPage() {
    // 1. Fetch all user unlocks
    const unlocks = await sanityFetch<UserUnlockDoc[]>({
        query: groq`*[_type == "userUnlock"] | order(unlockedAt desc)`
    });

    // 2. Fetch drop details for display names
    const drops = await sanityFetch<any[]>({
        query: groq`*[_type == "drop"] { _id, title }`
    });

    // 3. Group by User ID to form profiles
    const profilesMap = new Map<string, UserUnlockDoc[]>();

    unlocks.forEach(u => {
        if (!profilesMap.has(u.userId)) {
            profilesMap.set(u.userId, []);
        }
        profilesMap.get(u.userId)?.push(u);
    });

    // Convert to array
    const profiles = Array.from(profilesMap.entries()).map(([userId, userUnlocks]) => ({
        userId,
        unlocks: userUnlocks
    }));

    return (
        <UsersClient profiles={profiles} drops={drops} />
    );
}
