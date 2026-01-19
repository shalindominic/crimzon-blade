import { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Vault | CRIMZON BLADE",
    description: "Manage your collection. Archive unlocked.",
};

export default function VaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
