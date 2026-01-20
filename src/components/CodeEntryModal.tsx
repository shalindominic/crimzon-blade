"use client";
import { useState } from "react";
import { COLLECTIONS } from "@/lib/collections";
import { useUnlocks } from "@/context/UnlockContext";
import Portal from "@/components/Portal";

interface CodeEntryModalProps {
    open: boolean;
    onClose: () => void;
}

export default function CodeEntryModal({ open, onClose }: CodeEntryModalProps) {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const { unlock } = useUnlocks();

    if (!open) return null;

    const handleSubmit = () => {
        const entry = COLLECTIONS[code.trim().toUpperCase()];
        if (!entry) {
            setError("INVALID CODE");
            return;
        }
        unlock(entry.id);
        onClose();
        setCode(""); // Reset code on success
        setError("");
    };

    return (
        <Portal>
            <div className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm text-[#EDEDED] flex items-center justify-center">
                <div className="border border-[#8B0000]/40 bg-black p-8 w-[90%] max-w-md shadow-[0_0_30px_rgba(139,0,0,0.1)]">
                    <h2 className="font-oswald tracking-[0.35em] text-sm mb-6 text-center text-[#EDEDED]">
                        ENTER AUTHORIZATION CODE
                    </h2>

                    <input
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value);
                            setError("");
                        }}
                        placeholder="CB-XXXX-XXX"
                        className="
              w-full bg-black border border-[#8B0000]
              p-4 font-mono tracking-[0.3em] text-center text-[#EDEDED]
              outline-none focus:shadow-[0_0_15px_rgba(139,0,0,0.3)] transition-shadow
            "
                    />

                    {error && (
                        <p className="text-[#8B0000] mt-4 font-oswald tracking-widest text-xs text-center animate-pulse">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleSubmit}
                        className="
              mt-8 w-full border border-[#8B0000]
              py-4 font-oswald tracking-[0.35em] text-[#EDEDED]
              hover:bg-[#8B0000] hover:text-black
              transition-all duration-300
            "
                    >
                        UNLOCK
                    </button>

                    <button
                        onClick={onClose}
                        className="mt-4 w-full text-xs font-oswald tracking-widest text-[#777777] hover:text-[#EDEDED] transition-colors"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </Portal>
    );
}
