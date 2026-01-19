import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Drops | CRIMZON BLADE",
    description: "Next drop incoming. Prepare for the unlock.",
};

export default function DropsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
