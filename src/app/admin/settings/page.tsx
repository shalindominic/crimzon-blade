export default function SettingsPage() {
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
                            <span className="block opacity-50 mb-1">ROLE</span>
                            <span className="text-[#8B0000]">SUPERUSER</span>
                        </div>
                        <div>
                            <span className="block opacity-50 mb-1">ACCESS LEVEL</span>
                            <span className="text-white">TIER 1 (ROOT)</span>
                        </div>
                        <div>
                            <span className="block opacity-50 mb-1">2FA STATUS</span>
                            <span className="text-green-500">ACTIVE</span>
                        </div>
                        <div>
                            <span className="block opacity-50 mb-1">SESSION EXPIRES</span>
                            <span className="text-white">24H</span>
                        </div>
                    </div>
                </div>

                {/* SYSTEM TOGGLES */}
                <div className="bg-white/5 border border-white/10 p-6 opacity-75">
                    <h3 className="font-oswald text-lg text-white mb-4">GLOBAL OVERRIDES (LOCKED)</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-black p-4 border border-white/5">
                            <div>
                                <div className="text-white font-mono text-sm">MAINTENANCE MODE</div>
                                <div className="text-gray-600 font-mono text-[10px]">DISABLE ALL PUBLIC ACCESS</div>
                            </div>
                            <div className="w-10 h-5 bg-[#8B0000]/20 rounded-full cursor-not-allowed relative">
                                <div className="absolute left-1 top-1 w-3 h-3 bg-[#8B0000] rounded-full opacity-50" />
                            </div>
                        </div>
                        <div className="flex justify-between items-center bg-black p-4 border border-white/5">
                            <div>
                                <div className="text-white font-mono text-sm">DEBUG LOGGING</div>
                                <div className="text-gray-600 font-mono text-[10px]">VERBOSE SYSTEM OUTPUT</div>
                            </div>
                            <div className="w-10 h-5 bg-green-900/20 rounded-full cursor-not-allowed relative">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-green-500 rounded-full opacity-50" />
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 text-[10px] font-mono text-crimson text-center">
                        SYSTEM CONFIGURATION LOCKED BY SECURITY POLICY
                    </p>
                </div>
            </div>
        </div>
    );
}
