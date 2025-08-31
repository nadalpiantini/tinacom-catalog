"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Package, FileText, MessageCircle, Settings } from "lucide-react";

export default function Navigation() {
  const navItems = [
    { name: "Inicio", icon: Home, route: "/" },
    { name: "Productos", icon: Package, route: "/productos" },
    { name: "Documentos", icon: FileText, route: "/documentos" },
    { name: "Soporte", icon: MessageCircle, route: "/soporte" },
    { name: "Configurar", icon: Settings, route: "/configurar" }
  ];

  return (
    <nav className="bg-brand-graphite rounded-xl shadow-hard p-4 border border-brand-yellow">
      <div className="flex items-center justify-around">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Link key={index} href={item.route}>
              <Button 
                variant="ghost" 
                className="flex flex-col items-center gap-1 p-3 h-auto bg-transparent hover:bg-brand-black/20 text-brand-white hover:text-brand-yellow border-0"
              >
                <IconComponent className="w-5 h-5" strokeWidth={2} />
                <span className="text-xs font-medium">{item.name}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}