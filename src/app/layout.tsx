import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CRIMZON BLADE",
  description: "Forged in Silence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: '#E63946', colorBackground: '#111111' },
      }}
    >
      <html lang="en" className="dark" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${oswald.variable} antialiased bg-[#0a0a0a] text-[#ededed] min-h-screen flex flex-col`}
          suppressHydrationWarning
        >
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <SpeedInsights />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
