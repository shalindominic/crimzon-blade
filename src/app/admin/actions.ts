"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- CODES ---

export async function forgeUnlockCode(prefix: string, dropId: string, quantity: number = 1) {
    try {
        // Since we can't do a simple transaction loop for creates easily without many queries, 
        // we'll prepare the data first.
        const data = [];
        for (let i = 0; i < quantity; i++) {
            const timestamp = Date.now().toString().slice(-4);
            const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
            const suffix = quantity > 1 ? `-${i + 1}` : '';
            const code = `${prefix}-${timestamp}-${randomStr}${suffix}`;

            data.push({
                code,
                dropId,
                status: 'active'
            });
        }

        const result = await prisma.unlockCode.createMany({
            data,
            skipDuplicates: true,
        });

        revalidatePath("/admin/codes");
        revalidatePath("/admin");

        return { success: true, count: result.count };
    } catch (error: any) {
        console.error("Forge Error:", error);
        return { success: false, error: error.message || "Failed to forge codes." };
    }
}

export async function revokeCode(id: string) {
    try {
        await prisma.unlockCode.delete({ where: { id } });
        revalidatePath("/admin/codes");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// --- DROPS ---

export async function createDrop(title: string, date: string) {
    try {
        // Generate a simple slug
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        await prisma.drop.create({
            data: {
                title,
                slug,
                dropDate: new Date(date),
                status: 'Announced',
                items: "[]" // Empty JSON array for now
            }
        });
        revalidatePath("/admin/drops");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function toggleDropStatus(id: string, currentStatus: string) {
    try {
        const newStatus = currentStatus === 'Live' ? 'Ended' : 'Live';
        await prisma.drop.update({
            where: { id },
            data: { status: newStatus }
        });
        revalidatePath("/admin/drops");
        return { success: true, status: newStatus };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// --- USERS ---

export async function grantAccess(userId: string, dropId: string) {
    try {
        await prisma.userUnlock.create({
            data: {
                userId, // This assumes User exists in Prisma, might fail if only defined in Sanity/Clerk? 
                // Wait, V5 assumes strict Prisma User model. Access might fail if user not in DB.
                // For now, we assume admin will grant to existing users or we upsert?
                dropId,
                source: 'admin'
            }
        });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function revokeAccess(unlockId: string) {
    try {
        await prisma.userUnlock.delete({ where: { id: unlockId } });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
