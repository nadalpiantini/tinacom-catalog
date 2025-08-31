"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode, Package, Search } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

export default function ProductosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const categories = [
    { 
      name: "Tinacos Residenciales", 
      icon: Package, 
      route: "/productos/residencial",
      description: "Soluciones para hogares y pequeños desarrollos",
      image: "/items/0001015240.webp"
    },
    { 
      name: "Tinacos Comerciales", 
      icon: Package, 
      route: "/productos/comercial",
      description: "Sistemas para edificios e instalaciones comerciales",
      image: "/items/0001016137.webp"
    },
    { 
      name: "Accesorios", 
      icon: Package, 
      route: "/productos/accesorios",
      description: "Complementos y sistemas de apoyo",
      image: "/items/download_4eff6911-0691-408d-aca8-248c607a8530.jpg"
    }
  ];

  const products = [
    { 
      id: "tinaco-450l", 
      name: "Tinaco 450L", 
      description: "Ideal para casas pequeñas", 
      price: "Desde $2,890", 
      capacity: "450 litros",
      category: "residencial",
      specifications: {
        material: "Polietileno de alta densidad",
        garantia: "10 años",
        dimensiones: "95cm x 95cm x 65cm",
        peso: "15 kg",
        resistenciaUV: "Sí",
        certificaciones: ["NOM-001-CONAGUA"]
      }
    },
    { 
      id: "tinaco-750l", 
      name: "Tinaco 750L", 
      description: "Perfecto para familias medianas", 
      price: "Desde $3,490", 
      capacity: "750 litros",
      category: "residencial",
      specifications: {
        material: "Polietileno de alta densidad",
        garantia: "10 años",
        dimensiones: "110cm x 110cm x 75cm",
        peso: "20 kg",
        resistenciaUV: "Sí",
        certificaciones: ["NOM-001-CONAGUA", "NSF-61"]
      }
    },
    { 
      id: "tinaco-1100l", 
      name: "Tinaco 1100L", 
      description: "Para casas grandes", 
      price: "Desde $4,290", 
      capacity: "1,100 litros",
      category: "residencial",
      specifications: {
        material: "Polietileno de alta densidad",
        garantia: "12 años",
        dimensiones: "125cm x 125cm x 85cm",
        peso: "28 kg",
        resistenciaUV: "Sí",
        certificaciones: ["NOM-001-CONAGUA", "NSF-61"]
      }
    },
    { 
      id: "tinaco-2500l", 
      name: "Tinaco 2500L", 
      description: "Uso comercial e industrial", 
      price: "Desde $8,990", 
      capacity: "2,500 litros",
      category: "comercial",
      specifications: {
        material: "Polietileno grado industrial",
        garantia: "15 años",
        dimensiones: "170cm x 170cm x 105cm",
        peso: "45 kg",
        resistenciaUV: "Premium",
        certificaciones: ["NOM-001-CONAGUA", "NSF-61", "FDA"]
      }
    },
    { 
      id: "tinaco-5000l", 
      name: "Tinaco 5000L", 
      description: "Gran capacidad comercial", 
      price: "Desde $15,990", 
      capacity: "5,000 litros",
      category: "comercial",
      specifications: {
        material: "Polietileno grado industrial reforzado",
        garantia: "15 años",
        dimensiones: "220cm x 220cm x 125cm",
        peso: "75 kg",
        resistenciaUV: "Premium",
        certificaciones: ["NOM-001-CONAGUA", "NSF-61", "FDA"]
      }
    },
    { 
      id: "tinaco-10000l", 
      name: "Tinaco 10000L", 
      description: "Máxima capacidad industrial", 
      price: "Desde $28,990", 
      capacity: "10,000 litros",
      category: "comercial",
      specifications: {
        material: "Polietileno grado industrial ultra-reforzado",
        garantia: "20 años",
        dimensiones: "280cm x 280cm x 155cm",
        peso: "120 kg",
        resistenciaUV: "Ultra Premium",
        certificaciones: ["NOM-001-CONAGUA", "NSF-61", "FDA", "ISO-9001"]
      }
    },
  ];
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.capacity.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {/* Sistema de Búsqueda Industrial */}
        <section className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-steel" strokeWidth={2.5} />
              <Input 
                placeholder="BUSCAR MODELO O CAPACIDAD..."
                className="pl-12 bg-brand-black/30 border-brand-yellow text-brand-white placeholder:text-brand-steel focus:border-brand-yellow h-12 rounded-xl font-medium tracking-wide"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="btn-primary px-6 py-3 h-12 touch-target">
              <Search className="w-5 h-5 mr-2" strokeWidth={2.5} /> BUSCAR
            </Button>
          </div>
          <Button className="w-full btn-secondary px-6 py-4 touch-target border-2 border-dashed border-brand-yellow hover:border-brand-yellow/80">
            <QrCode className="w-6 h-6 mr-3" strokeWidth={2.5} /> ESCANEAR CÓDIGO DE TINACO
          </Button>
        </section>

        {/* Línea de Productos Industrial */}
        <section className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
              <Package className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h2 className="heading-display text-2xl text-brand-white">
              LÍNEA DE PRODUCTOS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link key={index} href={category.route}>
                  <Card className="bg-brand-black/30 border border-brand-yellow hover:bg-brand-black hover:border-brand-yellow/80 rounded-xl touch-target transition-all duration-150 hover:scale-[1.02] cursor-pointer">
                    <CardContent className="p-6">
                      <div className="h-32 bg-gradient-to-br from-brand-graphite to-brand-black rounded-xl flex items-center justify-center border border-brand-yellow/50 mb-4 overflow-hidden">
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <IconComponent className="w-6 h-6 text-brand-yellow mx-auto mb-2" strokeWidth={2.5} />
                        <h3 className="text-lg font-semibold text-brand-white tracking-wide mb-2">{category.name.toUpperCase()}</h3>
                        <p className="text-brand-steel text-sm">{category.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Catálogo Industrial Premium */}
        <section className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
              <Package className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h2 className="heading-display text-2xl text-brand-white">
              CATÁLOGO COMPLETO {searchTerm && `(${filteredProducts.length})`}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
                              <Card key={product.id} className="bg-brand-black/30 border border-brand-yellow rounded-xl shadow-hard hover:shadow-[0_12px_24px_rgba(238,191,3,0.3)] hover:border-brand-yellow/80 transition-all duration-150 hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="h-32 bg-gradient-to-br from-brand-graphite to-brand-black rounded-xl flex items-center justify-center border border-brand-yellow/50 mb-4 overflow-hidden">
                    <Image
                      src={product.category === "residencial" ? "/items/0001015240.webp" : "/items/0001016137.webp"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="heading-display text-xl text-brand-white">{product.name}</h3>
                    <p className="text-brand-steel text-sm">{product.description}</p>
                    <div className="inline-block bg-brand-yellow/20 border border-brand-yellow px-3 py-1 rounded-lg">
                      <span className="text-brand-yellow text-xs font-semibold tracking-wide">{product.capacity.toUpperCase()}</span>
                    </div>
                    <p className="heading-display text-2xl text-brand-yellow">{product.price}</p>
                  </div>
                  <Link href={`/producto/${product.id}`}>
                    <Button className="btn-primary w-full mt-4 py-3 touch-target">
                      VER ESPECIFICACIONES
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-brand-black/20 rounded-xl border-2 border-dashed border-brand-yellow">
              <Package className="w-16 h-16 mx-auto text-brand-steel mb-4" strokeWidth={1.5} />
              <p className="text-brand-steel text-lg">NO SE ENCONTRARON RESULTADOS</p>
              <p className="text-brand-steel/60 text-sm mt-2">Ajusta los criterios de búsqueda</p>
            </div>
          )}
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
