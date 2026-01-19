import { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Blade | CRIMZON BLADE",
    description: "We do not speak. We build.",
};

export default function TheBladeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
