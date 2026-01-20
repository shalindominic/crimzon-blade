"use client";

import { useState } from "react";
import { revokeAccess } from "../actions";
import { IconShieldOff, IconUser, IconPlus } from "@tabler/icons-react";

interface UserUnlock {
    _id: string; // The unlock document ID
    itemId: string; // The drop ID
    unlockedAt: string;
    source: string;
}

interface UserProfile {
    userId: string;
    unlocks: UserUnlock[];
}

export function UsersClient({ profiles, drops }: { profiles: UserProfile[], drops: any[] }) {
    const [filter, setFilter] = useState("");

    // Revoke handler
    const handleRevoke = async (unlockId: string, userId: string) => {
        if (!confirm(`REVOKE ACCESS FOR USER ${userId}?`)) return;
        await revokeAccess(unlockId);
    };

    const filtered = profiles.filter(p => p.userId.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="space-y-6">
            {/* TOOLBAR */}
            <div className="bg-black border border-white/10 p-4 flex justify-between items-center">
                <div className="flex items-center gap-4 w-full max-w-md">
                    <IconUser className="text-gray-500" size={20} />
                    <input
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="SEARCH OPERATOR ID..."
                        className="bg-transparent border-none outline-none text-white font-mono w-full"
                    />
                </div>
                <div className="font-mono text-xs text-crimson">
                    {filtered.length} OPERATORS FOUND
                </div>
            </div>

            {/* ROSTER */}
            <div className="grid grid-cols-1 gap-4">
                {filtered.map(profile => (
                    <div key={profile.userId} className="bg-white/5 border border-white/10 p-6 flex flex-col md:flex-row gap-6 hover:border-[#8B0000]/50 transition-colors">
                        {/* USER INFO */}
                        <div className="md:w-1/3 border-r border-white/5 pr-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black border border-white/20 flex items-center justify-center">
                                    <IconUser size={20} className="text-gray-400" />
                                </div>
                                <div>
                                    <div className="font-mono text-xs text-gray-500 tracking-widest">OPERATOR</div>
                                    <div className="font-oswald text-lg text-white tracking-wider truncate max-w-[200px]" title={profile.userId}>
                                        {profile.userId}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-4 text-[10px] font-mono text-gray-600">
                                <div>ACCESS LEVEL: <span className="text-white">DEFAULT</span></div>
                                <div>STATUS: <span className="text-green-500">ACTIVE</span></div>
                            </div>
                        </div>

                        {/* UNLOCKS */}
                        <div className="flex-1">
                            <div className="font-mono text-[10px] text-gray-500 uppercase mb-3 tracking-widest flex justify-between">
                                <span>Access Grants</span>
                                <span>{profile.unlocks.length} ITEMS</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {profile.unlocks.map(unlock => {
                                    // Find drop details if available in props, or just show ID
                                    const dropName = drops.find(d => d._id === unlock.itemId)?.title || unlock.itemId;

                                    return (
                                        <div key={unlock._id} className="bg-black p-3 border border-white/10 flex justify-between items-center group">
                                            <div>
                                                <div className="text-xs text-white font-oswald tracking-wide truncate max-w-[120px]">
                                                    {dropName}
                                                </div>
                                                <div className="text-[10px] text-gray-600 font-mono">
                                                    {new Date(unlock.unlockedAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRevoke(unlock._id, profile.userId)}
                                                className="text-gray-600 hover:text-crimson opacity-0 group-hover:opacity-100 transition-all"
                                                title="Revoke Access"
                                            >
                                                <IconShieldOff size={14} />
                                            </button>
                                        </div>
                                    );
                                })}
                                {profile.unlocks.length === 0 && (
                                    <div className="text-xs text-gray-600 font-mono italic p-2">
                                        NO ACCESS GRANTED
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
