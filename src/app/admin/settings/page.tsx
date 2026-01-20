import { auth } from "@/auth";

export default async function SettingsPage() {
    const session = await auth();

    return (
        <div className="max-w-2xl">
            <h2 className="font-oswald text-2xl uppercase tracking-wider text-white border-b border-white/10 pb-4 mb-8">
                System Configuration
            </h2>

            <div className="space-y-6">
                {/* ADMIN PROFILE */}
                <div className="bg-white/5 border border-white/10 p-6">
                    <h3 className="font-oswald text-lg text-white mb-4">ADMINISTRATOR PROFILE</h3>
                    <div className="grid grid-cols-2 gap-4 font-mono text-xs text-gray-400">
                        <div>
                            <span className="block opacity-50 mb-1">EMAIL</span>
                            <span className="text-white">{session?.user?.email}</span>
                        </div>
                        <div>
                            <span className="block opacity-50 mb-1">ROLE</span>
                            <span className="text-[#8B0000] uppercase">{(session?.user as any)?.role || "Unknown"}</span>
                        </div>
                        <div>
                            <span className="block opacity-50 mb-1">SESSION ID</span>
                            <span className="text-gray-600 truncate">{session?.user?.id || "N/A"}</span>
                        </div>
                    </div>
                </div>

                {/* MAINTENANCE MODE */}
                <div className="bg-white/5 border border-white/10 p-6">
                    <h3 className="font-oswald text-lg text-white mb-4">CRITICAL CONTROLS</h3>
                    <div className="flex justify-between items-center bg-black p-4 border border-white/5">
                        <div>
                            <div className="text-white font-mono text-sm">MAINTENANCE MODE</div>
                            <div className="text-gray-600 font-mono text-[10px]">HALT ALL TRAFFIC</div>
                        </div>
                        <button className="bg-gray-800 text-gray-400 px-4 py-1 text-[10px] font-mono cursor-not-allowed">
                            DISABLED (REQUIRES DB CONFIG)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
