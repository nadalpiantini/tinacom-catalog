"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Building, Factory, Shield } from "lucide-react";
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

// Productos comerciales
const productosComerciales = [
  { 
    id: "tinaco-2500l", 
    name: "Tinaco 2500L", 
    description: "Uso comercial e industrial", 
    price: "Desde $8,990", 
    capacity: "2,500 litros",
    aplicacion: "Edificios pequeños",
    usuarios: "50-100 personas",
    destacado: false
  },
  { 
    id: "tinaco-5000l", 
    name: "Tinaco 5000L", 
    description: "Gran capacidad comercial", 
    price: "Desde $15,990", 
    capacity: "5,000 litros",
    aplicacion: "Complejos medianos",
    usuarios: "100-200 personas",
    destacado: true
  },
  { 
    id: "tinaco-10000l", 
    name: "Tinaco 10000L", 
    description: "Máxima capacidad industrial", 
    price: "Desde $28,990", 
    capacity: "10,000 litros",
    aplicacion: "Instalaciones industriales",
    usuarios: "200+ personas",
    destacado: false
  }
];

export default function TinacosComerciales() {
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
        <header className="bg-gradient-to-r from-brand-graphite to-brand-graphite/80 rounded-xl shadow-hard p-8 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-6">
              <Building className="w-8 h-8 text-brand-black" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="heading-display text-3xl text-brand-yellow">
                TINACOS COMERCIALES
              </h1>
              <p className="text-brand-white/90 text-lg mt-2">
                Sistemas de almacenamiento para edificios e instalaciones comerciales
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center gap-3">
              <Factory className="w-6 h-6 text-brand-yellow" strokeWidth={2.5} />
              <div>
                <p className="text-brand-white font-semibold">CAPACIDADES</p>
                <p className="text-brand-white/80 text-sm">2,500L - 10,000L</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building className="w-6 h-6 text-brand-yellow" strokeWidth={2.5} />
              <div>
                <p className="text-brand-white font-semibold">APLICACIONES</p>
                <p className="text-brand-white/80 text-sm">Comercial e Industrial</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-brand-yellow" strokeWidth={2.5} />
              <div>
                <p className="text-brand-white font-semibold">GARANTÍA</p>
                <p className="text-brand-white/80 text-sm">15-20 años</p>
              </div>
            </div>
          </div>
        </header>

        {/* Productos Comerciales */}
        <section className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productosComerciales.map((product) => (
              <Card 
                key={product.id} 
                className={`rounded-xl shadow-hard hover:shadow-[0_12px_24px_rgba(238,191,3,0.3)] hover:border-brand-yellow/80 transition-all duration-150 hover:scale-[1.02] ${
                  product.destacado 
                    ? 'bg-brand-terra/20 border-2 border-brand-yellow relative' 
                    : 'bg-brand-black/30 border border-brand-yellow'
                }`}
              >
                {product.destacado && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-terra text-brand-white px-4 py-1 rounded-full text-xs font-bold tracking-wide">
                    LÍDER COMERCIAL
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="h-32 bg-gradient-to-br from-brand-terra/30 to-brand-black rounded-xl flex items-center justify-center border border-brand-yellow/50 mb-4 overflow-hidden">
                    <Image
                      src="/items/0001016137.webp"
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="heading-display text-xl text-brand-white">{product.name}</h3>
                    <p className="text-brand-steel text-sm">{product.description}</p>
                    
                    <div className="space-y-2">
                      <div className="bg-brand-yellow/20 border border-brand-yellow px-3 py-2 rounded-lg">
                        <span className="text-brand-yellow text-xs font-semibold tracking-wide block">{product.capacity.toUpperCase()}</span>
                      </div>
                      <div className="bg-brand-terra/20 border border-brand-terra px-3 py-2 rounded-lg">
                        <span className="text-brand-white text-xs font-semibold tracking-wide block">{product.usuarios.toUpperCase()}</span>
                      </div>
                    </div>
                    
                    <div className="bg-brand-graphite/50 px-3 py-2 rounded-lg">
                      <span className="text-brand-steel text-xs">APLICACIÓN: {product.aplicacion.toUpperCase()}</span>
                    </div>
                    
                    <p className="heading-display text-2xl text-brand-yellow">{product.price}</p>
                  </div>
                  <Link href={`/producto/${product.id}`}>
                    <Button className={`w-full mt-4 py-3 touch-target ${
                      product.destacado ? 'btn-primary' : 'btn-secondary'
                    }`}>
                      VER ESPECIFICACIONES INDUSTRIALES
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Características Técnicas Comerciales */}
        <section className="bg-brand-black rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
              <Shield className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h2 className="heading-display text-2xl text-brand-white">
              ESPECIFICACIONES COMERCIALES
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-graphite/30 rounded-xl p-6 border border-brand-graphite">
              <h3 className="heading-display text-lg text-brand-yellow mb-4">CONSTRUCCIÓN INDUSTRIAL</h3>
              <ul className="space-y-2 text-brand-steel">
                <li>• Polietileno grado industrial reforzado</li>
                <li>• Resistencia UV premium ultra-reforzada</li>
                <li>• Paredes extra gruesas para alta presión</li>
                <li>• Aditivos antimicrobianos de grado comercial</li>
                <li>• Estructura monobloque sin soldaduras</li>
              </ul>
            </div>
            
            <div className="bg-brand-graphite/30 rounded-xl p-6 border border-brand-graphite">
              <h3 className="heading-display text-lg text-brand-yellow mb-4">CERTIFICACIONES INDUSTRIALES</h3>
              <ul className="space-y-2 text-brand-steel">
                <li>• NOM-001-CONAGUA-2011 (Grado comercial)</li>
                <li>• NSF-61 (Componentes industriales)</li>
                <li>• FDA (Contacto con alimentos)</li>
                <li>• ISO 9001:2015 (Gestión de calidad)</li>
                <li>• Registro sanitario COFEPRIS nivel 3</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Ventajas Comerciales */}
        <section className="bg-gradient-to-r from-brand-graphite to-brand-black rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
              <Factory className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h2 className="heading-display text-2xl text-brand-white">
              VENTAJAS COMERCIALES
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-brand-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-brand-yellow" strokeWidth={2.5} />
              </div>
              <h3 className="heading-display text-lg text-brand-white mb-2">DURABILIDAD EXTREMA</h3>
              <p className="text-brand-steel">Construcción reforzada para uso intensivo 24/7</p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-brand-yellow" strokeWidth={2.5} />
              </div>
              <h3 className="heading-display text-lg text-brand-white mb-2">ESCALABILIDAD</h3>
              <p className="text-brand-steel">Sistemas modulares para crecimiento futuro</p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Factory className="w-8 h-8 text-brand-yellow" strokeWidth={2.5} />
              </div>
              <h3 className="heading-display text-lg text-brand-white mb-2">NORMATIVIDAD</h3>
              <p className="text-brand-steel">Cumplimiento total con regulaciones comerciales</p>
            </div>
          </div>
        </section>
        
        {/* CTA de Contacto Comercial */}
        <section className="bg-gradient-to-r from-brand-terra to-brand-terra/80 rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="text-center">
            <h3 className="heading-display text-2xl text-brand-white mb-4">
              SOLUCIONES COMERCIALES PERSONALIZADAS
            </h3>
            <p className="text-brand-white/90 text-lg mb-6">
              Ingeniería especializada para proyectos comerciales e industriales
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button className="bg-brand-white text-brand-terra hover:bg-brand-white/90 font-semibold px-8 py-4 rounded-xl shadow-hard touch-target tracking-wide">
                🏢 COTIZACIÓN COMERCIAL
              </Button>
              <Button className="btn-secondary border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-terra px-8 py-4">
                📋 ESPECIFICACIONES TÉCNICAS
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