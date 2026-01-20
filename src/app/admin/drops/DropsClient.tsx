"use client";

import { useState } from "react";
import { toggleDropStatus, createDrop } from "../actions";
import { IconPlus, IconPower, IconCalendar } from "@tabler/icons-react";

interface Drop {
    id: string;
    title: string;
    status: string;
    dropDate: Date; // Prisma returns Date object
}

export function DropsClient({ drops }: { drops: Drop[] }) {
    const [isCreating, setIsCreating] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDate, setNewDate] = useState("");

    const handleToggle = async (id: string, currentStatus: string) => {
        if (!confirm(`TOGGLE STATUS?`)) return;
        await toggleDropStatus(id, currentStatus);
    };

    const handleCreate = async () => {
        if (!newTitle || !newDate) return;
        const res = await createDrop(newTitle, newDate);
        if (res.success) {
            setIsCreating(false);
            setNewTitle("");
            setNewDate("");
        } else {
            alert("FAILED TO CREATE DROP: " + res.error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="font-oswald text-2xl text-white tracking-widest">
                    ACTIVE OPERATIONS (SQL)
                </h2>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 bg-[#8B0000] text-black px-4 py-2 font-oswald tracking-widest hover:bg-white transition-colors"
                >
                    <IconPlus size={16} />
                    NEW OPERATION
                </button>
            </div>

            {isCreating && (
                <div className="bg-white/5 border border-white/10 p-6 animate-in slide-in-from-top-4">
                    <h3 className="font-mono text-xs text-[#8B0000] mb-4">INITIALIZING NEW DROP...</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="OPERATION TITLE"
                            className="bg-black border border-white/20 p-3 text-white font-mono text-sm outline-none focus:border-[#8B0000]"
                        />
                        <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="bg-black border border-white/20 p-3 text-white font-mono text-sm outline-none focus:border-[#8B0000]"
                        />
                    </div>
                    <div className="flex gap-4">
                        <button onClick={handleCreate} className="bg-white text-black px-6 py-2 font-mono text-xs hover:bg-gray-200">
                            CONFIRM
                        </button>
                        <button onClick={() => setIsCreating(false)} className="text-gray-500 font-mono text-xs hover:text-white">
                            ABORT
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drops.map((drop) => (
                    <div key={drop.id} className="bg-black border border-white/10 p-6 group hover:border-[#8B0000] transition-colors relative">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-2 py-1 text-[10px] uppercase border ${drop.status === 'Live' ? 'border-green-500 text-green-500' : 'border-gray-500 text-gray-500'
                                }`}>
                                {drop.status}
                            </span>
                            <button
                                onClick={() => handleToggle(drop.id, drop.status)}
                                className="text-gray-600 hover:text-[#8B0000] transition-colors"
                            >
                                <IconPower size={20} />
                            </button>
                        </div>

                        <h3 className="font-oswald text-xl text-white tracking-wider mb-2">
                            {drop.title}
                        </h3>

                        <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
                            <IconCalendar size={14} />
                            {new Date(drop.dropDate).toLocaleDateString()}
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center opacity-50 text-[10px] font-mono">
                            <span>ID: {drop.id.slice(-6).toUpperCase()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
