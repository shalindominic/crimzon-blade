import { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Armory | CRIMZON BLADE",
    description: "Secure limited edition gear. Forged in silence.",
};

export default function ArmoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
