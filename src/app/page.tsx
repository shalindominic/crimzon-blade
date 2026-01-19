import { Hero } from "@/components/sections/Hero";
import { LatestDrop } from "@/components/sections/LatestDrop";
import { RaritySystem } from "@/components/sections/RaritySystem";
import { MascotTeaser } from "@/components/sections/MascotTeaser";
import { VaultTeaser } from "@/components/sections/VaultTeaser";

export default function Home() {
  return (
    <main className="bg-charcoal min-h-screen flex flex-col relative w-full overflow-hidden">
      <Hero />
      <LatestDrop />
      <RaritySystem />
      <MascotTeaser />
      <VaultTeaser />
    </main>
  );
}
