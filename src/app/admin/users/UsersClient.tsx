"use client";

import { useState } from "react";
import { revokeAccess } from "../actions";
import { IconShieldOff, IconUser } from "@tabler/icons-react";

interface UserProfile {
    userId: string;
    email: string;
    unlocks: {
        id: string; // unlock id
        title: string; // drop title
        unlockedAt: string;
        source: string;
    }[];
}

export function UsersClient({ profiles, drops }: { profiles: UserProfile[], drops: any[] }) {
    const [filter, setFilter] = useState("");

    const handleRevoke = async (unlockId: string, email: string) => {
        if (!confirm(`REVOKE ACCESS FOR ${email}?`)) return;
        await revokeAccess(unlockId);
    };

    const filtered = profiles.filter(p => p.email?.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="bg-black border border-white/10 p-4 flex justify-between items-center">
                <div className="flex items-center gap-4 w-full max-w-md">
                    <IconUser className="text-gray-500" size={20} />
                    <input
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="SEARCH EMAIL..."
                        className="bg-transparent border-none outline-none text-white font-mono w-full"
                    />
                </div>
                <div className="font-mono text-xs text-crimson">
                    {filtered.length} OPERATORS
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {filtered.map(profile => (
                    <div key={profile.userId} className="bg-white/5 border border-white/10 p-6 flex flex-col md:flex-row gap-6 hover:border-[#8B0000]/50 transition-colors">
                        <div className="md:w-1/3 border-r border-white/5 pr-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black border border-white/20 flex items-center justify-center">
                                    <IconUser size={20} className="text-gray-400" />
                                </div>
                                <div>
                                    <div className="font-mono text-xs text-gray-500 tracking-widest">OPERATOR</div>
                                    <div className="font-oswald text-lg text-white tracking-wider truncate max-w-[200px]">
                                        {profile.email}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-4 text-[10px] font-mono text-gray-600">
                                <div>USER ID: <span className="text-white">{profile.userId.slice(-6)}</span></div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="font-mono text-[10px] text-gray-500 uppercase mb-3 tracking-widest flex justify-between">
                                <span>Access Grants</span>
                                <span>{profile.unlocks.length} ITEMS</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {profile.unlocks.map(unlock => (
                                    <div key={unlock.id} className="bg-black p-3 border border-white/10 flex justify-between items-center group">
                                        <div>
                                            <div className="text-xs text-white font-oswald tracking-wide truncate max-w-[120px]">
                                                {unlock.title}
                                            </div>
                                            <div className="text-[10px] text-gray-600 font-mono">
                                                {new Date(unlock.unlockedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRevoke(unlock.id, profile.email)}
                                            className="text-gray-600 hover:text-crimson opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <IconShieldOff size={14} />
                                        </button>
                                    </div>
                                ))}
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
