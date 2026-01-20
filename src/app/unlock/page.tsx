"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useUnlocks } from "@/context/UnlockContext";
import { motion } from "framer-motion";

function UnlockContent() {
    const params = useSearchParams();
    const router = useRouter();
    const { redeemCode } = useUnlocks();
    const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const code = params.get("code");
        if (code && status === "idle") {
            handleUnlock(code);
        }
    }, [params, status]);

    const handleUnlock = async (code: string) => {
        setStatus("verifying");
        // Simulate a small delay for dramatic effect/UX
        await new Promise(r => setTimeout(r, 800));

        const result = await redeemCode(code);
        if (result.success) {
            setStatus("success");
            setTimeout(() => {
                router.push("/armory");
            }, 2000);
        } else {
            setStatus("error");
            setMessage(getErrorText(result.error));
        }
    };

    const getErrorText = (err?: string) => {
        if (err === "CODE_ALREADY_USED") return "CODE ALREADY REDEEMED";
        if (err === "INVALID_CODE") return "INVALID AUTHORIZATION CODE";
        return "VERIFICATION FAILED";
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={status}
            >
                {status === "verifying" && (
                    <>
                        <div className="w-16 h-16 border-2 border-[#8B0000] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                        <h2 className="font-oswald text-xl tracking-[0.3em] animate-pulse">
                            VERIFYING SEQUENCE...
                        </h2>
                    </>
                )}

                {status === "success" && (
                    <>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 bg-[#8B0000] rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>
                        <h2 className="font-oswald text-2xl tracking-[0.3em] text-[#8B0000]">
                            ACCESS GRANTED
                        </h2>
                        <p className="font-mono text-xs text-gray-500 mt-4 tracking-widest">
                            REDIRECTING TO ARMORY...
                        </p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="text-[#8B0000] text-6xl mb-4">✕</div>
                        <h2 className="font-oswald text-xl tracking-[0.3em] text-[#8B0000]">
                            {message}
                        </h2>
                        <button
                            onClick={() => router.push("/armory")}
                            className="mt-8 border border-white/20 px-6 py-3 font-oswald text-xs tracking-widest hover:bg-white/10 transition"
                        >
                            RETURN TO BASE
                        </button>
                    </>
                )}
            </motion.div>
        </div>
    );
}

export default function UnlockPage() {
    return (
        <div className="min-h-screen bg-black text-[#EDEDED] flex items-center justify-center">
            <Suspense fallback={<div className="text-[#8B0000]">INITIALIZING...</div>}>
                <UnlockContent />
            </Suspense>
        </div>
    );
}
