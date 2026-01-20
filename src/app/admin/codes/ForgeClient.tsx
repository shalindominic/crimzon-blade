"use client";

import { useState } from "react";
import { forgeUnlockCode } from "../actions";
import { IconFlame, IconLoader } from "@tabler/icons-react";

interface Drop {
    id: string; // Changed from _id
    title: string;
    status: string;
}

export function ForgeClient({ drops }: { drops: Drop[] }) {
    const [prefix, setPrefix] = useState("V5-TEST");
    const [selectedDrop, setSelectedDrop] = useState(drops[0]?.id || "");
    const [quantity, setQuantity] = useState(1);
    const [isForging, setIsForging] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    const handleForge = async () => {
        setIsForging(true);
        setResult(null);

        if (!selectedDrop) {
            setResult({ success: false, message: "NO DROP SELECTED" });
            setIsForging(false);
            return;
        }

        const res = await forgeUnlockCode(prefix, selectedDrop, quantity);

        if (res.success) {
            setResult({ success: true, message: `${res.count} CODES FORGED` });
        } else {
            setResult({ success: false, message: `FAILED: ${res.error}` });
        }
        setIsForging(false);
    };

    return (
        <div className="bg-black border border-[#8B0000]/30 p-6 h-full flex flex-col relative overflow-hidden group hover:border-[#8B0000] transition-colors">
            <div className="absolute top-0 right-0 p-2 opacity-50">
                <IconFlame className="text-[#8B0000]" size={24} />
            </div>

            <h2 className="font-oswald text-xl text-white tracking-[0.2em] mb-6 border-b border-[#8B0000]/20 pb-4">
                CODE FORGE (SQL)
            </h2>

            <div className="space-y-6 flex-1">
                <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2 tracking-widest">
                        PREFIX
                    </label>
                    <input
                        type="text"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value.toUpperCase())}
                        className="w-full bg-white/5 border border-white/10 p-3 text-white font-mono text-sm focus:border-[#8B0000] outline-none"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2 tracking-widest">
                        TARGET DROP
                    </label>
                    <select
                        value={selectedDrop}
                        onChange={(e) => setSelectedDrop(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 p-3 text-white font-mono text-sm focus:border-[#8B0000] outline-none appearance-none"
                    >
                        <option value="" disabled>SELECT TARGET</option>
                        {drops.map(drop => (
                            <option key={drop.id} value={drop.id}>
                                {drop.title.toUpperCase()} [{drop.status.toUpperCase()}]
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2 tracking-widest">
                        QUANTITY: {quantity}
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full accent-[#8B0000] h-1 bg-white/10 rounded-none cursor-pointer"
                    />
                </div>

                {result && (
                    <div className={`p-4 border text-xs font-mono tracking-wider ${result.success ? "border-green-500/30 bg-green-500/5 text-green-400" : "border-crimson/30 bg-crimson/5 text-crimson"
                        }`}>
                        {result.message}
                    </div>
                )}
            </div>

            <button
                onClick={handleForge}
                disabled={isForging || !selectedDrop}
                className="mt-8 w-full bg-[#8B0000] text-black font-oswald text-lg py-4 tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50 flex justify-center"
            >
                {isForging ? <IconLoader className="animate-spin" size={20} /> : "INITIATE"}
            </button>
        </div>
    );
}
