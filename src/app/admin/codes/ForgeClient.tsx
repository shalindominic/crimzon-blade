"use client";

import { useState } from "react";
import { forgeUnlockCode } from "../actions";
import { IconFlame, IconLoader } from "@tabler/icons-react";

interface Drop {
    _id: string;
    title: string;
    status: string;
}

export function ForgeClient({ drops }: { drops: Drop[] }) {
    const [prefix, setPrefix] = useState("CRIMZON");
    const [selectedDrop, setSelectedDrop] = useState(drops[0]?._id || "");
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
            setResult({ success: true, message: `${res.count} CODES SUCCESFULLY FORGED` });
        } else {
            setResult({ success: false, message: `FORGE FAILED: ${res.error}` });
        }
        setIsForging(false);
    };

    return (
        <div className="bg-black border border-[#8B0000]/30 p-6 h-full flex flex-col relative overflow-hidden group hover:border-[#8B0000] transition-colors">
            {/* DECORATION */}
            <div className="absolute top-0 right-0 p-2 opacity-50">
                <IconFlame className="text-[#8B0000]" size={24} />
            </div>

            <h2 className="font-oswald text-xl text-white tracking-[0.2em] mb-6 border-b border-[#8B0000]/20 pb-4">
                CODE FORGE (V4)
            </h2>

            <div className="space-y-6 flex-1">
                <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2 tracking-widest">
                        PREFIX IDENTIFIER
                    </label>
                    <input
                        type="text"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value.toUpperCase())}
                        className="w-full bg-white/5 border border-white/10 p-3 text-white font-mono text-sm focus:border-[#8B0000] outline-none transition-colors"
                        placeholder="PREFIX"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2 tracking-widest">
                        TARGET DROP
                    </label>
                    <select
                        value={selectedDrop}
                        onChange={(e) => setSelectedDrop(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 p-3 text-white font-mono text-sm focus:border-[#8B0000] outline-none transition-colors appearance-none"
                    >
                        <option value="" disabled>SELECT TARGET</option>
                        {drops.map(drop => (
                            <option key={drop._id} value={drop._id}>
                                {drop.title.toUpperCase()} [{drop.status.toUpperCase()}]
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2 tracking-widest">
                        BATCH QUANTITY
                    </label>
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            className="flex-1 accent-[#8B0000] h-1 bg-white/10 rounded-none appearance-none cursor-pointer"
                        />
                        <span className="font-mono text-xl text-[#8B0000] w-12 text-right">
                            {quantity}
                        </span>
                    </div>
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
                className="mt-8 w-full bg-[#8B0000] text-black font-oswald text-lg py-4 tracking-[0.2em] hover:bg-white hover:text-[#8B0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isForging ? <IconLoader className="animate-spin" size={20} /> : "INITIATE FORGE"}
            </button>
        </div>
    );
}
