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
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const { redeemCode } = useUnlocks();

    if (!open) return null;

    const handleSubmit = async () => {
        if (!code.trim()) return;
        setStatus("loading");

        const result = await redeemCode(code.trim().toUpperCase());

        if (result.success) {
            setStatus("success");
            setTimeout(() => {
                onClose();
                setStatus("idle");
                setCode("");
            }, 1500);
        } else {
            setStatus("error");
            if (result.error === "CODE_ALREADY_USED") setMessage("CODE ALREADY REDEEMED");
            else if (result.error === "INVALID_CODE") setMessage("INVALID AUTHORIZATION CODE");
            else setMessage("VERIFICATION FAILED");
        }
    };

    return (
        <Portal>
            <div className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm text-[#EDEDED] flex items-center justify-center">
                <div className="border border-[#8B0000]/40 bg-black p-8 w-[90%] max-w-md shadow-[0_0_30px_rgba(139,0,0,0.1)] relative overflow-hidden">
                    {status === "success" ? (
                        <div className="flex flex-col items-center justify-center py-10 space-y-6">
                            <div className="w-16 h-16 bg-[#8B0000] rounded-full flex items-center justify-center animate-bounce">
                                <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="font-oswald tracking-[0.35em] text-xl text-[#8B0000] animate-pulse">
                                ACCESS GRANTED
                            </h2>
                        </div>
                    ) : (
                        <>
                            <h2 className="font-oswald tracking-[0.35em] text-sm mb-6 text-center text-[#EDEDED]">
                                ENTER AUTHORIZATION CODE
                            </h2>

                            <input
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value);
                                    if (status === "error") setStatus("idle");
                                }}
                                placeholder="CB-XXXX-XXX"
                                disabled={status === "loading"}
                                className="
                                    w-full bg-black border border-[#8B0000]
                                    p-4 font-mono tracking-[0.3em] text-center text-[#EDEDED]
                                    outline-none focus:shadow-[0_0_15px_rgba(139,0,0,0.3)] transition-shadow
                                    disabled:opacity-50
                                "
                            />

                            {status === "error" && (
                                <p className="text-[#8B0000] mt-4 font-oswald tracking-widest text-xs text-center animate-pulse">
                                    {message}
                                </p>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={status === "loading"}
                                className="
                                    mt-8 w-full border border-[#8B0000]
                                    py-4 font-oswald tracking-[0.35em] text-[#EDEDED]
                                    hover:bg-[#8B0000] hover:text-black
                                    transition-all duration-300
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                "
                            >
                                {status === "loading" ? "VERIFYING..." : "UNLOCK"}
                            </button>

                            <button
                                onClick={onClose}
                                className="mt-4 w-full text-xs font-oswald tracking-widest text-[#777777] hover:text-[#EDEDED] transition-colors"
                            >
                                CANCEL
                            </button>
                        </>
                    )}
                </div>
            </div>
        </Portal>
    );
}
