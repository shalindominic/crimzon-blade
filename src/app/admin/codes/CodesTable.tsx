"use client";

import { useState } from "react";
import { IconSearch, IconTrash, IconCopy } from "@tabler/icons-react";
import { revokeCode } from "../actions";

// Match Prisma output structure
interface Code {
    id: string;
    code: string;
    dropId: string;
    drop?: { title: string };
    status: string; // active, used, revoked
    usedBy?: string;
    user?: { email: string, id: string };
    usedAt?: string;
}

export function CodesTable({ codes, dropMap }: { codes: Code[], dropMap: Record<string, string> }) {
    const [filter, setFilter] = useState("");
    const [deleting, setDeleting] = useState<string | null>(null);

    const filtered = codes.filter(c =>
        c.code.includes(filter.toUpperCase()) ||
        (dropMap[c.dropId] || "").toUpperCase().includes(filter.toUpperCase())
    );

    const handleDelete = async (id: string, val: string) => {
        if (!confirm(`REVOKE ${val}?`)) return;
        setDeleting(id);
        await revokeCode(id);
        setDeleting(null);
    };

    return (
        <div className="bg-white/5 border border-white/10 h-full flex flex-col">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
                <div className="flex items-center gap-2 bg-black/50 border border-white/10 px-3 py-2 w-full max-w-sm">
                    <IconSearch size={16} className="text-gray-500" />
                    <input
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="SEARCH..."
                        className="bg-transparent border-none outline-none text-xs font-mono text-white w-full"
                    />
                </div>
                <div className="font-mono text-[10px] text-gray-500">
                    RECORDS: {filtered.length}
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-[#8B0000]/10 text-[10px] uppercase font-mono text-[#8B0000] sticky top-0 backdrop-blur-md">
                        <tr>
                            <th className="p-4">Code</th>
                            <th className="p-4">Drop</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filtered.map(code => (
                            <tr key={code.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4 font-mono text-white flex items-center gap-2">
                                    {code.code}
                                    <button onClick={() => navigator.clipboard.writeText(code.code)} className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-white">
                                        <IconCopy size={12} />
                                    </button>
                                </td>
                                <td className="p-4 text-xs uppercase">{dropMap[code.dropId] || code.dropId}</td>
                                <td className="p-4">
                                    {code.status === 'used' ? (
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-crimson mb-1">USED</span>
                                            <span className="text-[10px] text-gray-500">{code.user?.email || "Unknown"}</span>
                                        </div>
                                    ) : (
                                        <span className="text-[10px] text-green-500">ACTIVE</span>
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    <button onClick={() => handleDelete(code.id, code.code)} disabled={deleting === code.id} className="text-gray-600 hover:text-crimson">
                                        <IconTrash size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
