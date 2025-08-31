"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Settings, Wrench, Gauge } from "lucide-react";
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

// Productos accesorios
const accesorios = [
  { 
    id: "base-metalica", 
    name: "Base Metálica Reforzada", 
    description: "Soporte estructural para tinacos", 
    price: "Desde $890", 
    categoria: "Estructural",
    aplicacion: "Todos los tamaños",
    material: "Acero galvanizado",
    destacado: true
  },
  { 
    id: "kit-flotador", 
    name: "Kit de Flotador Automático", 
    description: "Control automático de llenado", 
    price: "Desde $340", 
    categoria: "Control",
    aplicacion: "450L-2500L",
    material: "Polipropileno",
    destacado: false
  },
  { 
    id: "medidor-nivel", 
    name: "Medidor de Nivel Digital", 
    description: "Monitoreo electrónico de nivel", 
    price: "Desde $1,590", 
    categoria: "Monitoreo",
    aplicacion: "Comercial",
    material: "Componentes digitales",
    destacado: false
  },
  { 
    id: "filtro-sedimentos", 
    name: "Filtro de Sedimentos", 
    description: "Pre-filtrado para agua de entrada", 
    price: "Desde $450", 
    categoria: "Filtración",
    aplicacion: "Residencial/Comercial",
    material: "Polipropileno",
    destacado: false
  },
  { 
    id: "bomba-presion", 
    name: "Bomba Presurizadora", 
    description: "Sistema de presión automático", 
    price: "Desde $2,890", 
    categoria: "Presurización",
    aplicacion: "Comercial",
    material: "Acero inoxidable",
    destacado: false
  },
  { 
    id: "kit-limpieza", 
    name: "Kit de Limpieza Profesional", 
    description: "Herramientas especializadas de mantenimiento", 
    price: "Desde $290", 
    categoria: "Mantenimiento",
    aplicacion: "Todos los tamaños",
    material: "Diversos materiales",
    destacado: false
  }
];

const categorias = [
  { name: "Estructural", icon: Settings, color: "brand-yellow" },
  { name: "Control", icon: Gauge, color: "brand-terra" },
  { name: "Monitoreo", icon: Package, color: "brand-terra" },
  { name: "Filtración", icon: Wrench, color: "brand-steel" },
  { name: "Presurización", icon: Settings, color: "brand-yellow" },
  { name: "Mantenimiento", icon: Wrench, color: "brand-terra" }
];

export default function Accesorios() {
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
              <Settings className="w-8 h-8 text-brand-black" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="heading-display text-3xl text-brand-yellow">
                ACCESORIOS Y COMPLEMENTOS
              </h1>
              <p className="text-brand-white/90 text-lg mt-2">
                Sistemas complementarios para optimizar tu instalación de almacenamiento
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-brand-yellow" strokeWidth={2.5} />
              <div>
                <p className="text-brand-white font-semibold">CATEGORÍAS</p>
                <p className="text-brand-white/80 text-sm">6 líneas especializadas</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-brand-yellow" strokeWidth={2.5} />
              <div>
                <p className="text-brand-white font-semibold">COMPATIBILIDAD</p>
                <p className="text-brand-white/80 text-sm">Todos los modelos Tinacom</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wrench className="w-6 h-6 text-brand-yellow" strokeWidth={2.5} />
              <div>
                <p className="text-brand-white font-semibold">INSTALACIÓN</p>
                <p className="text-brand-white/80 text-sm">Profesional y DIY</p>
              </div>
            </div>
          </div>
        </header>

        {/* Categorías de Accesorios */}
        <section className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
              <Package className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h2 className="heading-display text-2xl text-brand-white">
              CATEGORÍAS DE PRODUCTOS
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categorias.map((categoria, index) => {
              const IconComponent = categoria.icon;
              return (
                <div 
                  key={index}
                  className="bg-brand-black/50 border border-brand-graphite hover:border-brand-yellow rounded-xl p-4 text-center transition-all duration-150"
                >
                  <IconComponent className="w-8 h-8 text-brand-yellow mx-auto mb-2" strokeWidth={2.5} />
                  <p className="text-brand-white font-semibold text-sm">{categoria.name.toUpperCase()}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Productos Accesorios */}
        <section className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {accesorios.map((product) => (
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
                    ESENCIAL
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="h-24 bg-gradient-to-br from-brand-graphite to-brand-black rounded-xl flex items-center justify-center border border-brand-yellow/50 mb-4 overflow-hidden">
                    <Image
                      src="/items/download_4eff6911-0691-408d-aca8-248c607a8530.jpg"
                      alt={product.name}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="heading-display text-lg text-brand-white">{product.name}</h3>
                    <p className="text-brand-steel text-sm">{product.description}</p>
                    
                    <div className="space-y-2">
                      <div className="bg-brand-yellow/20 border border-brand-yellow px-3 py-1 rounded-lg">
                        <span className="text-brand-yellow text-xs font-semibold tracking-wide block">{product.categoria.toUpperCase()}</span>
                      </div>
                      <div className="bg-brand-terra/20 border border-brand-terra px-3 py-1 rounded-lg">
                        <span className="text-brand-terra text-xs font-semibold tracking-wide block">{product.aplicacion.toUpperCase()}</span>
                      </div>
                    </div>
                    
                    <div className="bg-brand-graphite/50 px-3 py-1 rounded-lg">
                      <span className="text-brand-steel text-xs">MATERIAL: {product.material.toUpperCase()}</span>
                    </div>
                    
                    <p className="heading-display text-xl text-brand-yellow">{product.price}</p>
                  </div>
                  <Button className={`w-full mt-4 py-3 touch-target ${
                    product.destacado ? 'btn-primary' : 'btn-secondary'
                  }`}>
                    VER COMPATIBILIDAD
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Beneficios de los Accesorios */}
        <section className="bg-brand-black rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
              <Wrench className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h2 className="heading-display text-2xl text-brand-white">
              BENEFICIOS DE LOS ACCESORIOS
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-graphite/30 rounded-xl p-6 border border-brand-graphite">
              <h3 className="heading-display text-lg text-brand-yellow mb-4">OPTIMIZACIÓN DEL SISTEMA</h3>
              <ul className="space-y-2 text-brand-steel">
                <li>• Automatización completa del proceso</li>
                <li>• Monitoreo en tiempo real</li>
                <li>• Control de presión y flujo</li>
                <li>• Filtración y purificación avanzada</li>
              </ul>
            </div>
            
            <div className="bg-brand-graphite/30 rounded-xl p-6 border border-brand-graphite">
              <h3 className="heading-display text-lg text-brand-yellow mb-4">MANTENIMIENTO SIMPLIFICADO</h3>
              <ul className="space-y-2 text-brand-steel">
                <li>• Herramientas especializadas incluidas</li>
                <li>• Procedimientos simplificados</li>
                <li>• Componentes de fácil reemplazo</li>
                <li>• Vida útil extendida del sistema</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* CTA de Asesoría */}
        <section className="bg-gradient-to-r from-brand-graphite to-brand-black rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="text-center">
            <h3 className="heading-display text-2xl text-brand-white mb-4">
              ¿NECESITAS AYUDA PARA ELEGIR?
            </h3>
            <p className="text-brand-steel text-lg mb-6">
              Nuestros técnicos especializados te asesoran sobre compatibilidad e instalación
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button className="btn-primary px-8 py-4">
                🔧 ASESORÍA TÉCNICA
              </Button>
              <Button className="btn-secondary px-8 py-4">
                📋 GUÍA DE COMPATIBILIDAD
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