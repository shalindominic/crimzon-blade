import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Account | CRIMZON BLADE",
    description: "Collector Profile. Track your rarity.",
};

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
