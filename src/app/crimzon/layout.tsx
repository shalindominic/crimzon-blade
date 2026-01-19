import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Crimzon | CRIMZON BLADE",
    description: "The Spirit of the Blade. Lore and Artifacts.",
};

export default function CrimzonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
