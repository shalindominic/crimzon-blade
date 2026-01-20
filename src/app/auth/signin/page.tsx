"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IconShieldLock, IconLoader } from "@tabler/icons-react";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("ACCESS DENIED: INSUFFICIENT CLEARANCE");
                setIsLoading(false);
            } else {
                router.push("/admin");
                router.refresh();
            }
        } catch (err) {
            setError("SYSTEM MALFUNCTION");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md border border-[#8B0000] p-8 relative overflow-hidden">
                {/* DECORATIVE ELEMENTS */}
                <div className="absolute top-0 right-0 p-2 opacity-50">
                    <IconShieldLock className="text-[#8B0000]" size={48} />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8B0000]" />

                <div className="mb-8">
                    <h1 className="font-oswald text-3xl text-white tracking-[0.2em]">
                        RESTRICTED AREA
                    </h1>
                    <p className="font-mono text-xs text-[#8B0000] mt-2 tracking-widest">
                        AUTHORIZED PERSONNEL ONLY
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2 tracking-widest">
                            OPERATOR ID (EMAIL)
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 p-4 text-white font-mono text-sm focus:border-[#8B0000] outline-none transition-colors"
                            placeholder="OPERATOR@CRIMZON.NET"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2 tracking-widest">
                            SECURITY KEY
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 p-4 text-white font-mono text-sm focus:border-[#8B0000] outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="bg-[#8B0000]/10 border border-[#8B0000] p-3 text-[#8B0000] font-mono text-xs text-center tracking-widest animate-pulse">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#8B0000] text-black font-oswald text-xl py-4 tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <IconLoader className="animate-spin" size={20} />
                                VERIFYING...
                            </>
                        ) : (
                            "AUTHENTICATE"
                        )}
                    </button>

                    <div className="text-center">
                        <p className="font-mono text-[10px] text-gray-600 mt-4">
                            IP LOGGED: {Math.random().toString(16).substring(2, 10).toUpperCase()}
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
