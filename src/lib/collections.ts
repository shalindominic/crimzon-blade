export interface CollectionEntry {
    id: string;
    name: string;
    rarity: string;
}

export const COLLECTIONS: Record<string, CollectionEntry> = {
    "CB-CRIMZON-001": {
        id: "crimzon-001",
        name: "CRIMZON INITIATE",
        rarity: "FOUNDERS",
    },
    "CB-BLADE-777": {
        id: "blade-777",
        name: "THE BLADE",
        rarity: "LIMITED",
    },
};
