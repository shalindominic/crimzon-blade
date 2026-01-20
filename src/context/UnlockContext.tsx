"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UnlockContextType {
    unlocked: string[];
    unlock: (id: string) => void;
}

const UnlockContext = createContext<UnlockContextType | null>(null);

export function UnlockProvider({ children }: { children: ReactNode }) {
    const [unlocked, setUnlocked] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("crimzon-unlocks");
        if (saved) {
            try {
                setUnlocked(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse unlocks", e);
            }
        }
    }, []);

    const unlock = (id: string) => {
        if (unlocked.includes(id)) return;
        const updated = [...unlocked, id];
        setUnlocked(updated);
        localStorage.setItem("crimzon-unlocks", JSON.stringify(updated));
    };

    return (
        <UnlockContext.Provider value={{ unlocked, unlock }}>
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
