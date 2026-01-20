import { ReactNode } from "react";

interface StatsCardProps {
    label: string;
    value: string | number;
    icon: ReactNode;
    trend?: string;
    trendColor?: "green" | "red" | "gray";
}

export function StatsCard({ label, value, icon, trend, trendColor = "green" }: StatsCardProps) {
    return (
        <div className="bg-white/5 border border-white/10 p-6 flex flex-col justify-between h-32 group hover:border-[#8B0000]/50 transition-colors">
            <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-[#8B0000] transition-colors">
                    {label}
                </span>
                <div className="text-gray-500 group-hover:text-white transition-colors">
                    {icon}
                </div>
            </div>

            <div className="flex items-end justify-between">
                <span className="font-oswald text-4xl font-bold text-[#EDEDED] tracking-tight">
                    {value}
                </span>
                {trend && (
                    <span className={`text-xs font-mono mb-1 ${trendColor === "green" ? "text-green-500" :
                            trendColor === "red" ? "text-crimson" : "text-gray-500"
                        }`}>
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
}
