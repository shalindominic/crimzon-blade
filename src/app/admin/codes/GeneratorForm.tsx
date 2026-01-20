"use client";

import { useState } from "react";
import { forgeUnlockCode } from "../actions";
import { DROP_METADATA } from "@/lib/drops";

export function GeneratorForm() {
    const [prefix, setPrefix] = useState("CRIMZON");
    const [selectedDrop, setSelectedDrop] = useState(Object.keys(DROP_METADATA)[0] || "");
    const [status, setStatus] = useState<string | null>(null);

    const handleForge = async () => {
        setStatus("FORGING...");
        const result = await forgeUnlockCode(prefix, selectedDrop);
        if (result.success) {
            setStatus(`CODE FORGED: ${result.code}`);
        } else {
            setStatus(`FORGE FAILED: ${result.error}`);
        }
    };

    return (
        <div className="bg-black/40 border border-white/5 p-8 max-w-lg">
            <h2 className="font-oswald text-2xl uppercase tracking-wider mb-6 text-white">Forge Unlock Code (V3)</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Code Prefix</label>
                    <input
                        type="text"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value.toUpperCase())}
                        className="w-full bg-black border border-white/20 p-3 text-white font-mono focus:border-crimson outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Target Drop</label>
                    <select
                        value={selectedDrop}
                        onChange={(e) => setSelectedDrop(e.target.value)}
                        className="w-full bg-black border border-white/20 p-3 text-white font-mono focus:border-crimson outline-none"
                    >
                        {Object.entries(DROP_METADATA).map(([id, meta]) => (
                            <option key={id} value={id}>
                                {meta.name} [{meta.rarity}]
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleForge}
                    className="w-full bg-crimson text-white font-oswald uppercase py-4 tracking-widest hover:bg-white hover:text-crimson transition-colors mt-4"
                >
                    INITIATE FORGE
                </button>

                {status && (
                    <div className="mt-4 p-4 border border-white/10 text-center font-mono text-sm text-crimson">
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}
