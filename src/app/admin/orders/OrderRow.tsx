"use client";

import { updateOrderStatus } from "../actions";
import { useState } from "react";

export function OrderRow({ order }: { order: any }) {
    const [status, setStatus] = useState(order.status);
    const isPending = status === "pending";

    const handleShip = async () => {
        const res = await updateOrderStatus(order._id, "shipped");
        if (res.success) setStatus("shipped");
    };

    return (
        <tr className="hover:bg-white/5 transition-colors">
            <td className="p-4 text-white font-bold">{order.orderNumber}</td>
            <td className="p-4 text-xs">
                <div>{order.customer?.name || "Unknown"}</div>
                <div className="text-gray-600">{order.customer?.email}</div>
            </td>
            <td className="p-4">
                <ul className="text-xs">
                    {order.items?.map((item: any, i: number) => (
                        <li key={i}>
                            {item.quantity}x {item.name} <span className="text-crimson">[{item.size}]</span>
                        </li>
                    ))}
                </ul>
            </td>
            <td className="p-4 text-white">${order.amount}</td>
            <td className="p-4">
                <span className={`px-2 py-1 text-[10px] uppercase border ${status === 'shipped' ? 'border-green-500 text-green-500' :
                        status === 'paid' ? 'border-white text-white' :
                            'border-orange-500 text-orange-500'
                    }`}>
                    {status}
                </span>
            </td>
            <td className="p-4">
                {status === 'paid' && (
                    <button
                        onClick={handleShip}
                        className="text-[10px] bg-white text-black px-2 py-1 font-oswald uppercase hover:bg-crimson hover:text-white transition-colors"
                    >
                        Mark Shipped
                    </button>
                )}
            </td>
        </tr>
    );
}
