"use client";

import Image from "next/image";
import Navigation from "@/components/Navigation";

// Componente del Logo de Tinacom
const TinacomLogo = ({ className = "w-10 h-10" }) => (
  <div className={className}>
    <Image
      src="/items/Logo-Vector-Tinacom-black-01-e1696042688700 (1).png"
      alt="Tinacom Logo"
      width={240}
      height={240}
      className="w-full h-full object-contain"
      priority
    />
  </div>
);

export default function Header() {
  return (
    <div className="min-h-screen bg-brand-black pb-safe pt-safe px-safe">
      <div className="p-6 grid gap-6 max-w-5xl mx-auto">
        <Navigation />
        
        {/* Header Industrial Tinacom */}
        <header className="bg-brand-black rounded-xl shadow-hard p-6 border-2 border-brand-yellow">
          <div className="flex items-center justify-center">
            <TinacomLogo className="w-48 h-48" />
          </div>
        </header>
      </div>
    </div>
  );
}
