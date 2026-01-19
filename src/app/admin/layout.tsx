import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        redirect("/");
    }

    // Simple Admin Check via Email
    // In a real app, use Clerk Metadata or a DB role check
    const adminEmail = process.env.ADMIN_EMAIL;
    const userEmail = user.emailAddresses[0]?.emailAddress;

    if (!adminEmail || userEmail !== adminEmail) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-center p-6">
                <div className="max-w-md border border-crimson/50 p-8 bg-void">
                    <h1 className="text-3xl font-oswald text-crimson uppercase tracking-widest mb-4">Access Denied</h1>
                    <p className="text-gray-500 font-mono text-sm mb-6">
                        You do not possess the clearance for the Shadow Council.
                    </p>
                    <Link href="/" className="text-white hover:text-crimson underline font-oswald uppercase tracking-wider">
                        Return to Surface
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-charcoal text-white pt-24 pb-12 px-6">
            <div className="container mx-auto">
                <header className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-oswald uppercase tracking-widest text-white">
                            Shadow Council
                        </h1>
                        <p className="text-crimson font-mono text-sm uppercase">
                            Admin Command // {userEmail}
                        </p>
                    </div>
                    <nav className="flex gap-6 font-oswald uppercase tracking-wider text-sm">
                        <Link href="/admin" className="hover:text-crimson transition-colors">Overview</Link>
                        <Link href="/admin/codes" className="hover:text-crimson transition-colors">Claim Codes</Link>
                        <Link href="/admin/orders" className="hover:text-crimson transition-colors">Orders</Link>
                        <Link href="/" className="text-gray-500 hover:text-white transition-colors">Exit</Link>
                    </nav>
                </header>

                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}
