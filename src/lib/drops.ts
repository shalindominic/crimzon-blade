export interface DropConfig {
    title: string;
    items: string[];
}

export const DROPS: Record<string, DropConfig> = {
    "SEASON_I": {
        title: "SEASON I — INITIATION",
        items: ["crimzon-001", "blade-777"],
    },
    "SEASON_II": {
        title: "SEASON II — ASCENSION",
        items: ["void-999"],
    },
};

export const DROP_METADATA: Record<string, { name: string; rarity: string }> = {
    "crimzon-001": { name: "CRIMZON INITIATE", rarity: "FOUNDERS" },
    "blade-777": { name: "THE BLADE", rarity: "LIMITED" },
    "void-999": { name: "VOID WALKER", rarity: "SEASON II" },
};

// Helper to check if an item ID exists in any drop
export const getItemDropInfo = (itemId: string) => {
    for (const [season, config] of Object.entries(DROPS)) {
        if (config.items.includes(itemId)) {
            return { season, ...config };
        }
    }
    return null;
};
