"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";

interface UnlockContextType {
    unlocked: string[];
    unlock: (id: string) => void;
    redeemCode: (code: string) => Promise<{ success: boolean; error?: string; drop?: string }>;
    isLoading: boolean;
}

const UnlockContext = createContext<UnlockContextType | null>(null);

export function UnlockProvider({ children }: { children: ReactNode }) {
    const [unlocked, setUnlocked] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, isLoaded: isAuthLoaded } = useUser();

    // Load from LocalStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("crimzon-unlocks");
        if (saved) {
            try {
                setUnlocked(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse local unlocks", e);
            }
        }
        setIsLoading(false);
    }, []);

    // Sync with Cloud when User logs in
    useEffect(() => {
        if (!isAuthLoaded || !user) return;

        const syncUnlocks = async () => {
            try {
                const res = await fetch("/api/unlock");
                if (res.ok) {
                    const data = await res.json();
                    if (data.unlocks && Array.isArray(data.unlocks)) {
                        setUnlocked(prev => {
                            // Merge unique
                            const merged = Array.from(new Set([...prev, ...data.unlocks]));
                            localStorage.setItem("crimzon-unlocks", JSON.stringify(merged));
                            return merged;
                        });
                    }
                }
            } catch (e) {
                console.error("Cloud sync failed", e);
            }
        };

        syncUnlocks();
    }, [user, isAuthLoaded]);

    const unlock = (id: string) => {
        setUnlocked(prev => {
            if (prev.includes(id)) return prev;
            const updated = [...prev, id];
            localStorage.setItem("crimzon-unlocks", JSON.stringify(updated));
            return updated;
        });
    };

    const redeemCode = async (code: string) => {
        try {
            const res = await fetch("/api/unlock", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, error: data.error || "Redemption failed" };
            }

            // Success: Unlock the drop
            if (data.drop) {
                unlock(data.drop);
            }

            return { success: true, drop: data.drop };

        } catch (e) {
            console.error("Redemption error", e);
            return { success: false, error: "Network error" };
        }
    };

    return (
        <UnlockContext.Provider value={{ unlocked, unlock, redeemCode, isLoading }}>
            {children}
        </UnlockContext.Provider>
    );
}

export const useUnlocks = () => {
    const context = useContext(UnlockContext);
    if (!context) {
        throw new Error("useUnlocks must be used within an UnlockProvider");
    }
    return context;
};
