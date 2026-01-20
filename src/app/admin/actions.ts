"use server";

import { writeClient } from "@/sanity/lib/client";
import { revalidatePath } from "next/cache";

export async function forgeUnlockCode(prefix: string, dropId: string) {
    try {
        const timestamp = Date.now().toString().slice(-4);
        const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
        const code = `${prefix}-${timestamp}-${randomStr}`;

        await writeClient.create({
            _type: "unlockCode",
            code,
            drop: dropId,
            used: false,
        });

        revalidatePath("/admin/codes");
        return { success: true, code };
    } catch (error: any) {
        console.error("Failed to generate code:", error);
        return { success: false, error: error.message || "Failed to forge code." };
    }
}

export async function revokeClaimCode(id: string) {
    try {
        await writeClient.patch(id).set({ status: "revoked" }).commit();
        revalidatePath("/admin/codes");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to revoke." };
    }
}

export async function updateOrderStatus(id: string, status: string) {
    try {
        await writeClient.patch(id).set({ status }).commit();
        revalidatePath("/admin/orders");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to update ritual." };
    }
}
