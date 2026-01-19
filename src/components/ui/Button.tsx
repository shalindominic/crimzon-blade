import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost" | "legendary";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-crimson text-white hover:bg-crimson/80 border border-transparent shadow-[0_0_15px_rgba(220,20,60,0.3)] hover:shadow-[0_0_25px_rgba(220,20,60,0.5)]",
            outline: "bg-transparent border border-white/20 text-white hover:border-crimson hover:text-crimson hover:bg-crimson/5",
            ghost: "bg-transparent text-gray-400 hover:text-white",
            legendary: "bg-gold text-black border border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]",
        };

        const sizes = {
            sm: "h-9 px-4 text-xs tracking-wider",
            md: "h-12 px-8 text-sm tracking-widest",
            lg: "h-16 px-12 text-base tracking-[0.2em]",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "relative inline-flex items-center justify-center font-oswald uppercase font-bold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {props.children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
