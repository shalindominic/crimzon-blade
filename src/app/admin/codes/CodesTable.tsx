"use client";

import { useState } from "react";
import { IconSearch, IconCopy, IconTrash } from "@tabler/icons-react";
import { revokeCode } from "../actions";

interface Code {
    _id: string;
    code: string;
    drop: string;
    // Map drop ID to name in parent or here? keeping it simple for now, raw data
    used: boolean;
    usedBy?: string;
    usedAt?: string;
}

export function CodesTable({ codes, dropMap }: { codes: Code[], dropMap: Record<string, string> }) {
    const [filter, setFilter] = useState("");
    const [deleting, setDeleting] = useState<string | null>(null);

    const filteredCodes = codes.filter(c =>
        c.code.includes(filter.toUpperCase()) ||
        (dropMap[c.drop] || "").toUpperCase().includes(filter.toUpperCase()) ||
        (c.usedBy || "").toUpperCase().includes(filter.toUpperCase())
    );

    const handleDelete = async (id: string, code: string) => {
        if (!confirm(`REVOKE CODE: ${code}? THIS CANNOT BE UNDONE.`)) return;
        setDeleting(id);
        const res = await revokeCode(id);
        if (!res.success) alert(res.error);
        setDeleting(null);
    };

    return (
        <div className="bg-white/5 border border-white/10 h-full flex flex-col">
            {/* TOOLBAR */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
                <div className="flex items-center gap-2 text-gray-400 bg-black/50 border border-white/10 px-3 py-2 w-full max-w-sm focus-within:border-[#8B0000] transition-colors">
                    <IconSearch size={16} />
                    <input
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="SEARCH DATABASE..."
                        className="bg-transparent border-none outline-none text-xs font-mono text-white w-full placeholder-gray-600"
                    />
                </div>
                <div className="font-mono text-[10px] text-gray-500">
                    RECORDS: {filteredCodes.length}
                </div>
            </div>

            {/* TABLE */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-[#8B0000]/10 text-[10px] uppercase font-mono text-[#8B0000] sticky top-0 backdrop-blur-md">
                        <tr>
                            <th className="p-4 tracking-widest">Code Key</th>
                            <th className="p-4 tracking-widest">Target Drop</th>
                            <th className="p-4 tracking-widest">Status / Owner</th>
                            <th className="p-4 tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredCodes.map((code) => (
                            <tr key={code._id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4 font-mono text-white flex items-center gap-2">
                                    <span className="opacity-80">{code.code}</span>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(code.code)}
                                        className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-white transition-opacity"
                                    >
                                        <IconCopy size={14} />
                                    </button>
                                </td>
                                <td className="p-4 text-xs uppercase tracking-wide">
                                    {dropMap[code.drop] || code.drop}
                                </td>
                                <td className="p-4">
                                    {code.used ? (
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-crimson border border-crimson/30 px-1 w-fit bg-crimson/10 mb-1">
                                                REDEEMED
                                            </span>
                                            <span className="text-[10px] font-mono text-gray-500">
                                                {code.usedBy?.slice(0, 18)}...
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-[10px] text-green-500 border border-green-500/30 px-1 bg-green-500/10">
                                            AVAILABLE
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => handleDelete(code._id, code.code)}
                                        disabled={deleting === code._id}
                                        className="text-gray-600 hover:text-crimson transition-colors disabled:opacity-30"
                                    >
                                        <IconTrash size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredCodes.length === 0 && (
                    <div className="p-12 text-center font-mono text-gray-600 text-xs">
                        NO DATA FOUND IN SECTOR
                    </div>
                )}
            </div>
        </div>
    );
}
