import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-charcoal py-16 text-center text-gray-500 overflow-hidden relative">
            <div className="container mx-auto px-6 flex flex-col items-center gap-6">
                <h2 className="font-oswald text-xl md:text-2xl font-bold tracking-[0.2em] text-white/20 uppercase">
                    Crimzon Blade
                </h2>

                <div className="flex gap-8 text-sm font-sans tracking-wider">
                    <Link href="#" className="hover:text-crimson transition-colors">TERMS</Link>
                    <Link href="#" className="hover:text-crimson transition-colors">PRIVACY</Link>
                    <Link href="#" className="hover:text-crimson transition-colors">SUPPORT</Link>
                </div>

                <p className="text-xs tracking-widest mt-8 opacity-50">
                    © {new Date().getFullYear()} CRIMZON BLADE. FORGED IN SILENCE.
                </p>
            </div>
            {/* Ambient red glow at bottom */}
            <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-crimson/10 blur-[100px] pointer-events-none" />
        </footer>
    );
}
