"use client";

import { useState } from "react";
import { generateClaimCode } from "../actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GeneratorForm({ products }: { products: any[] }) {
    const [prefix, setPrefix] = useState("CRIMZON");
    const [selectedProduct, setSelectedProduct] = useState(products[0]?._id || "");
    const [edition, setEdition] = useState("Standard Issue");
    const [status, setStatus] = useState<string | null>(null);

    const handleForge = async () => {
        setStatus("FORGING...");
        const result = await generateClaimCode(prefix, selectedProduct, edition);
        if (result.success) {
            setStatus(`CODE FORGED: ${result.code}`);
        } else {
            setStatus("FORGE FAILED");
        }
    };

    return (
        <div className="bg-black/40 border border-white/5 p-8 max-w-lg">
            <h2 className="font-oswald text-2xl uppercase tracking-wider mb-6 text-white">Forge New Code</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Code Prefix</label>
                    <input
                        type="text"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value.toUpperCase())}
                        className="w-full bg-black border border-white/20 p-3 text-white font-mono focus:border-crimson outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Target Artifact</label>
                    <select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="w-full bg-black border border-white/20 p-3 text-white font-mono focus:border-crimson outline-none"
                    >
                        {products.map(p => (
                            <option key={p._id} value={p._id}>{p.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase mb-1">Edition Tag</label>
                    <input
                        type="text"
                        value={edition}
                        onChange={(e) => setEdition(e.target.value)}
                        className="w-full bg-black border border-white/20 p-3 text-white font-mono focus:border-crimson outline-none"
                    />
                </div>

                <button
                    onClick={handleForge}
                    className="w-full bg-crimson text-white font-oswald uppercase py-4 tracking-widest hover:bg-white hover:text-crimson transition-colors mt-4"
                >
                    INITIATE FORGE
                </button>

                {status && (
                    <div className="mt-4 p-4 border border-white/10 text-center font-mono text-sm text-crimson">
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}
