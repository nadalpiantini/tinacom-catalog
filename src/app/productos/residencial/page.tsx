"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Home, Users, Droplets } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Image from "next/image";

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

// Productos residenciales
const productosResidenciales = [
  { 
    id: "tinaco-450l", 
    name: "Tinaco 450L", 
    description: "Ideal para casas pequeñas", 
    price: "Desde $2,890", 
    capacity: "450 litros",
    personas: "2-3 personas",
    uso: "Casa pequeña",
    destacado: false
  },
  { 
    id: "tinaco-750l", 
    name: "Tinaco 750L", 
    description: "Perfecto para familias medianas", 
    price: "Desde $3,490", 
    capacity: "750 litros",
    personas: "3-5 personas",
    uso: "Casa familiar",
    destacado: true
  },
  { 
    id: "tinaco-1100l", 
    name: "Tinaco 1100L", 
    description: "Para casas grandes", 
    price: "Desde $4,290", 
    capacity: "1,100 litros",
    personas: "5-7 personas",
    uso: "Casa grande",
    destacado: false
  }
];

export default function TinacosResidenciales() {
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
        
        {/* Header de Categoría */}
        <header className="bg-gradient-to-r from-brand-graphite to-brand-black rounded-xl shadow-hard p-8 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-6">
              <Home className="w-8 h-8 text-brand-black" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="heading-display text-3xl text-brand-yellow">
                TINACOS RESIDENCIALES
              </h1>
              <p className="text-brand-steel text-lg mt-2">
                Soluciones de almacenamiento de agua para hogares y pequeños desarrollos
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-brand-yellow" strokeWidth={2.5} />
              <div>
                <p className="text-brand-white font-semibold">CAPACIDADES</p>
                <p className="text-brand-steel text-sm">450L - 1,100L</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="w-6 h-6 text-brand-yellow" strokeWidth={2.5} />
              <div>
                <p className="text-brand-white font-semibold">USO FAMILIAR</p>
                <p className="text-brand-steel text-sm">2-7 personas</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-brand-yellow" strokeWidth={2.5} />
              <div>
                <p className="text-brand-white font-semibold">GARANTÍA</p>
                <p className="text-brand-steel text-sm">10-12 años</p>
              </div>
            </div>
          </div>
        </header>

        {/* Productos Residenciales */}
        <section className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productosResidenciales.map((product) => (
              <Card 
                key={product.id} 
                className={`rounded-xl shadow-hard hover:shadow-[0_12px_24px_rgba(238,191,3,0.3)] hover:border-brand-yellow/80 transition-all duration-150 hover:scale-[1.02] ${
                  product.destacado 
                    ? 'bg-brand-yellow/10 border-2 border-brand-yellow relative' 
                    : 'bg-brand-black/30 border border-brand-yellow'
                }`}
              >
                {product.destacado && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-yellow text-brand-black px-4 py-1 rounded-full text-xs font-bold tracking-wide">
                    MÁS POPULAR
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="h-32 bg-gradient-to-br from-brand-graphite to-brand-black rounded-xl flex items-center justify-center border border-brand-yellow/50 mb-4 overflow-hidden">
                    <Image
                      src="/items/0001015240.webp"
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="heading-display text-xl text-brand-white">{product.name}</h3>
                    <p className="text-brand-steel text-sm">{product.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-brand-yellow/20 border border-brand-yellow px-3 py-1 rounded-lg">
                        <span className="text-brand-yellow text-xs font-semibold tracking-wide block">{product.capacity.toUpperCase()}</span>
                      </div>
                      <div className="bg-brand-terra/20 border border-brand-terra px-3 py-1 rounded-lg">
                        <span className="text-brand-terra text-xs font-semibold tracking-wide block">{product.personas.toUpperCase()}</span>
                      </div>
                    </div>
                    
                    <div className="bg-brand-graphite/50 px-3 py-2 rounded-lg">
                      <span className="text-brand-steel text-xs">USO IDEAL: {product.uso.toUpperCase()}</span>
                    </div>
                    
                    <p className="heading-display text-2xl text-brand-yellow">{product.price}</p>
                  </div>
                  <Link href={`/producto/${product.id}`}>
                    <Button className={`w-full mt-4 py-3 touch-target ${
                      product.destacado ? 'btn-primary' : 'btn-secondary'
                    }`}>
                      VER ESPECIFICACIONES COMPLETAS
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Características Técnicas Residenciales */}
        <section className="bg-brand-black rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
              <Package className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h2 className="heading-display text-2xl text-brand-white">
              CARACTERÍSTICAS TÉCNICAS
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-graphite/30 rounded-xl p-6 border border-brand-graphite">
              <h3 className="heading-display text-lg text-brand-yellow mb-4">MATERIAL Y CONSTRUCCIÓN</h3>
              <ul className="space-y-2 text-brand-steel">
                <li>• Polietileno de alta densidad (HDPE)</li>
                <li>• Resistencia UV incorporada</li>
                <li>• Paredes reforzadas para durabilidad</li>
                <li>• Acabado antimicrobiano</li>
              </ul>
            </div>
            
            <div className="bg-brand-graphite/30 rounded-xl p-6 border border-brand-graphite">
              <h3 className="heading-display text-lg text-brand-yellow mb-4">CERTIFICACIONES</h3>
              <ul className="space-y-2 text-brand-steel">
                <li>• NOM-001-CONAGUA-2011</li>
                <li>• NSF-61 (Componentes de agua potable)</li>
                <li>• Registro sanitario COFEPRIS</li>
                <li>• ISO 9001:2015</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* CTA de Contacto */}
        <section className="bg-gradient-to-r from-brand-graphite to-brand-black rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="text-center">
            <h3 className="heading-display text-2xl text-brand-white mb-4">
              ¿NECESITAS ASESORÍA PERSONALIZADA?
            </h3>
            <p className="text-brand-white/90 text-lg mb-6">
              Nuestros expertos te ayudan a elegir el tinaco ideal para tu hogar
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button className="bg-brand-white text-brand-terra hover:bg-brand-white/90 font-semibold px-8 py-4 rounded-xl shadow-hard touch-target tracking-wide">
                📞 LLAMAR AHORA
              </Button>
              <Button className="btn-secondary border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-terra px-8 py-4">
                💬 CHAT EN LÍNEA
              </Button>
            </div>
          </div>
        </section>

        {/* Footer Tinacom */}
        <footer className="text-center bg-brand-graphite rounded-xl p-6 border border-brand-yellow shadow-hard">
          <div className="flex items-center justify-center gap-3 mb-3">
            <TinacomLogo className="w-8 h-8" />
            <span className="text-brand-yellow font-bold text-xl">TINACOM</span>
          </div>
          <p className="text-brand-steel text-sm">© 2024 Tinacom. Calidad que perdura, agua que cuidas.</p>
        </footer>
      </div>
    </div>
  );
}