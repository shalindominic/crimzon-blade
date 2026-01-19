import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import { OrderRow } from "./OrderRow";

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orders = await sanityFetch<any[]>({
        query: groq`*[_type == "order"] | order(_createdAt desc)`
    });

    return (
        <div>
            <h2 className="font-oswald text-2xl uppercase tracking-wider mb-6 text-white">Ritual Manifest (Orders)</h2>

            <div className="bg-black/40 border border-white/5 overflow-hidden">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-white/5 text-xs uppercase font-oswald text-white">
                        <tr>
                            <th className="p-4">Order #</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Artifacts</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                        {orders.map((order) => (
                            <OrderRow key={order._id} order={order} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
