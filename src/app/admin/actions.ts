"use server";

import { writeClient } from "@/sanity/lib/client";
import { revalidatePath } from "next/cache";

// --- CODES ---

export async function forgeUnlockCode(prefix: string, dropId: string, quantity: number = 1) {
    try {
        const mutations = [];

        for (let i = 0; i < quantity; i++) {
            const timestamp = Date.now().toString().slice(-4);
            const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
            // Ensure unique if bulk
            const suffix = quantity > 1 ? `-${i + 1}` : '';
            const code = `${prefix}-${timestamp}-${randomStr}${suffix}`;

            mutations.push({
                create: {
                    _type: "unlockCode",
                    code,
                    drop: dropId,
                    used: false,
                    createdAt: new Date().toISOString(),
                }
            });
        }

        const transaction = writeClient.transaction();
        mutations.forEach(m => transaction.create(m.create));
        await transaction.commit();

        revalidatePath("/admin/codes");
        revalidatePath("/admin"); // Update dashboard stats

        return { success: true, count: quantity };
    } catch (error: any) {
        console.error("Forge Error:", error);
        return { success: false, error: error.message || "Failed to forge codes." };
    }
}

export async function revokeCode(id: string) {
    try {
        await writeClient.delete(id);
        revalidatePath("/admin/codes");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// --- DROPS ---

export async function toggleDropStatus(id: string, currentStatus: string) {
    try {
        const newStatus = currentStatus === 'Live' ? 'Ended' : 'Live';
        await writeClient.patch(id).set({ status: newStatus }).commit();
        revalidatePath("/admin/drops");
        revalidatePath("/admin");
        return { success: true, status: newStatus };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function createDrop(title: string, date: string) {
    try {
        await writeClient.create({
            _type: "drop",
            title,
            dropDate: date,
            status: "Announced",
        });
        revalidatePath("/admin/drops");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// --- USERS ---

export async function grantAccess(userId: string, dropId: string) {
    try {
        await writeClient.create({
            _type: 'userUnlock',
            userId,
            itemId: dropId,
            source: 'admin',
            unlockedAt: new Date().toISOString(),
        });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function revokeAccess(unlockId: string) {
    try {
        await writeClient.delete(unlockId);
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
