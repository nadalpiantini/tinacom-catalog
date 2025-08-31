"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Shield, Award, Gauge, Home, Building, Settings, Users, Droplets, Calendar } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import { useParams } from "next/navigation";
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

// Base de datos de productos
const productos = {
  "tinaco-450l": {
    id: "tinaco-450l",
    name: "Tinaco 450L",
    description: "Ideal para casas pequeñas",
    price: "Desde $2,890",
    priceNumeric: 2890,
    capacity: "450 litros",
    category: "residencial",
    personas: "2-3 personas",
    uso: "Casa pequeña",
    images: [
      "/items/0001015240.webp",
      "/items/0001016137.webp", 
      "/items/Tinacos_20Tinacom_20codigo_2010856.webp"
    ],
    specifications: {
      material: "Polietileno de alta densidad",
      garantia: "10 años",
      dimensiones: "95cm x 95cm x 65cm",
      peso: "15 kg",
      resistenciaUV: "Sí",
      certificaciones: ["NOM-001-CONAGUA", "NSF-61"],
      temperaturaOperacion: "-5°C a 60°C",
      presionMaxima: "2.5 bar",
      espesorPared: "8mm"
    },
    features: [
      "Construcción monobloque sin soldaduras",
      "Aditivos antimicrobianos integrados", 
      "Tapa hermética con sistema de seguridad",
      "Base antideslizante integrada",
      "Conexiones de entrada y salida reforzadas"
    ],
    applications: [
      "Viviendas unifamiliares pequeñas",
      "Departamentos",
      "Oficinas pequeñas",
      "Consultorios médicos"
    ]
  },
  "tinaco-750l": {
    id: "tinaco-750l",
    name: "Tinaco 750L",
    description: "Perfecto para familias medianas",
    price: "Desde $3,490",
    priceNumeric: 3490,
    capacity: "750 litros",
    category: "residencial",
    personas: "3-5 personas",
    uso: "Casa familiar",
    images: [
      "/items/0001015240.webp",
      "/items/0001016137.webp",
      "/items/Tinacos_20Tinacom_20codigo_2010856.webp"
    ],
    specifications: {
      material: "Polietileno de alta densidad",
      garantia: "10 años",
      dimensiones: "110cm x 110cm x 75cm",
      peso: "20 kg",
      resistenciaUV: "Sí",
      certificaciones: ["NOM-001-CONAGUA", "NSF-61"],
      temperaturaOperacion: "-5°C a 60°C",
      presionMaxima: "2.5 bar",
      espesorPared: "8mm"
    },
    features: [
      "Diseño optimizado para familias",
      "Sistema de ventilación mejorado",
      "Indicador de nivel integrado",
      "Estructura reforzada para mayor durabilidad",
      "Instalación simplificada"
    ],
    applications: [
      "Casas familiares medianas",
      "Pequeños comercios",
      "Restaurantes pequeños",
      "Escuelas primarias"
    ]
  },
  "tinaco-1100l": {
    id: "tinaco-1100l", 
    name: "Tinaco 1100L",
    description: "Para casas grandes",
    price: "Desde $4,290", 
    priceNumeric: 4290,
    capacity: "1,100 litros",
    category: "residencial",
    personas: "5-7 personas",
    uso: "Casa grande",
    images: [
      "/items/0001015240.webp",
      "/items/0001016137.webp",
      "/items/Tinacos_20Tinacom_20codigo_2010856.webp"
    ],
    specifications: {
      material: "Polietileno de alta densidad",
      garantia: "12 años",
      dimensiones: "125cm x 125cm x 85cm", 
      peso: "28 kg",
      resistenciaUV: "Sí",
      certificaciones: ["NOM-001-CONAGUA", "NSF-61"],
      temperaturaOperacion: "-5°C a 60°C",
      presionMaxima: "3.0 bar",
      espesorPared: "10mm"
    },
    features: [
      "Capacidad extendida para familias grandes",
      "Paredes extra reforzadas",
      "Sistema dual de conexiones",
      "Protección UV premium",
      "Garantía extendida de 12 años"
    ],
    applications: [
      "Casas grandes y residencias",
      "Pequeños hoteles",
      "Centros comunitarios", 
      "Talleres industriales"
    ]
  },
  "tinaco-2500l": {
    id: "tinaco-2500l",
    name: "Tinaco 2500L", 
    description: "Uso comercial e industrial",
    price: "Desde $8,990",
    priceNumeric: 8990,
    capacity: "2,500 litros",
    category: "comercial", 
    usuarios: "50-100 personas",
    aplicacion: "Edificios pequeños",
    images: [
      "/items/0001016137.webp", 
      "/items/Tinacos_20Tinacom_20codigo_2010856.webp",
      "/items/0001015240.webp"
    ],
    specifications: {
      material: "Polietileno grado industrial",
      garantia: "15 años",
      dimensiones: "170cm x 170cm x 105cm",
      peso: "45 kg", 
      resistenciaUV: "Premium",
      certificaciones: ["NOM-001-CONAGUA", "NSF-61", "FDA"],
      temperaturaOperacion: "-10°C a 70°C",
      presionMaxima: "4.0 bar",
      espesorPared: "15mm"
    },
    features: [
      "Construcción grado industrial",
      "Resistencia UV premium",
      "Múltiples puntos de conexión",
      "Sistema de inspección integrado",
      "Certificación FDA para agua potable"
    ],
    applications: [
      "Edificios de oficinas",
      "Hoteles pequeños",
      "Restaurantes medianos",
      "Centros educativos"
    ]
  },
  "tinaco-5000l": {
    id: "tinaco-5000l",
    name: "Tinaco 5000L",
    description: "Gran capacidad comercial", 
    price: "Desde $15,990",
    priceNumeric: 15990,
    capacity: "5,000 litros",
    category: "comercial",
    usuarios: "100-200 personas", 
    aplicacion: "Complejos medianos",
    images: [
      "/items/0001016137.webp",
      "/items/Tinacos_20Tinacom_20codigo_2010856.webp", 
      "/items/0001015240.webp"
    ],
    specifications: {
      material: "Polietileno grado industrial reforzado",
      garantia: "15 años",
      dimensiones: "220cm x 220cm x 125cm",
      peso: "75 kg",
      resistenciaUV: "Premium", 
      certificaciones: ["NOM-001-CONAGUA", "NSF-61", "FDA"],
      temperaturaOperacion: "-10°C a 70°C",
      presionMaxima: "4.5 bar",
      espesorPared: "18mm"
    },
    features: [
      "Capacidad comercial optimizada",
      "Estructura ultra-reforzada", 
      "Sistema de limpieza integrado",
      "Conectores industriales incluidos",
      "Monitoreo remoto compatible"
    ],
    applications: [
      "Complejos habitacionales",
      "Hoteles medianos",
      "Centros comerciales", 
      "Hospitales pequeños"
    ]
  },
  "tinaco-10000l": {
    id: "tinaco-10000l",
    name: "Tinaco 10000L",
    description: "Máxima capacidad industrial",
    price: "Desde $28,990",
    priceNumeric: 28990,
    capacity: "10,000 litros", 
    category: "comercial",
    usuarios: "200+ personas",
    aplicacion: "Instalaciones industriales",
    images: [
      "/items/0001016137.webp",
      "/items/Tinacos_20Tinacom_20codigo_2010856.webp",
      "/items/0001015240.webp" 
    ],
    specifications: {
      material: "Polietileno grado industrial ultra-reforzado",
      garantia: "20 años",
      dimensiones: "280cm x 280cm x 155cm",
      peso: "120 kg",
      resistenciaUV: "Ultra Premium",
      certificaciones: ["NOM-001-CONAGUA", "NSF-61", "FDA", "ISO-9001"],
      temperaturaOperacion: "-15°C a 80°C", 
      presionMaxima: "5.0 bar",
      espesorPared: "25mm"
    },
    features: [
      "Máxima capacidad industrial",
      "Construcción ultra-reforzada",
      "Sistema modular expandible",
      "Certificación ISO-9001", 
      "Garantía extendida de 20 años"
    ],
    applications: [
      "Complejos industriales",
      "Grandes hoteles",
      "Hospitales y clínicas",
      "Centros de distribución"
    ]
  }
};

export default function ProductoDetalle() {
  const params = useParams();
  const productId = params.id as string;
  const producto = productos[productId as keyof typeof productos];
  const [imagenActiva, setImagenActiva] = useState(0);

  if (!producto) {
    return (
      <div className="min-h-screen bg-brand-black pb-safe pt-safe px-safe">
        <div className="p-6 max-w-5xl mx-auto">
          <Navigation />
          
          {/* Header Industrial Tinacom */}
          <header className="bg-brand-black rounded-xl shadow-hard p-6 border-2 border-brand-yellow">
            <div className="flex items-center justify-center">
              <TinacomLogo className="w-48 h-48" />
            </div>
          </header>
          
          <div className="text-center py-20">
            <Package className="w-24 h-24 mx-auto text-brand-steel mb-6" />
            <h1 className="heading-display text-3xl text-brand-white mb-4">PRODUCTO NO ENCONTRADO</h1>
            <p className="text-brand-steel mb-8">El producto que buscas no está disponible</p>
            <Link href="/">
              <Button className="btn-primary px-8 py-4">VOLVER AL CATÁLOGO</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isResidencial = producto.category === "residencial";

  return (
    <div className="min-h-screen bg-brand-black pb-safe pt-safe px-safe">
      <div className="p-6 grid gap-6 max-w-6xl mx-auto">
        <Navigation />
        
        {/* Header Industrial Tinacom */}
        <header className="bg-brand-black rounded-xl shadow-hard p-6 border-2 border-brand-yellow">
          <div className="flex items-center justify-center">
            <TinacomLogo className="w-48 h-48" />
          </div>
        </header>
        
        {/* Header del Producto */}
        <header className={`rounded-xl shadow-hard p-8 border border-brand-yellow ${
          isResidencial 
            ? 'bg-gradient-to-r from-brand-graphite to-brand-black' 
            : 'bg-gradient-to-r from-brand-terra to-brand-terra/80'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-6">
                {isResidencial 
                  ? <Home className="w-8 h-8 text-brand-black" strokeWidth={2.5} />
                  : <Building className="w-8 h-8 text-brand-black" strokeWidth={2.5} />
                }
              </div>
              <div>
                <h1 className="heading-display text-4xl text-brand-yellow mb-2">
                  {producto.name.toUpperCase()}
                </h1>
                <p className="text-brand-white/90 text-xl">{producto.description}</p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="bg-brand-yellow/20 border border-brand-yellow px-4 py-2 rounded-lg text-brand-yellow font-semibold">
                    {producto.capacity.toUpperCase()}
                  </span>
                  <span className="bg-brand-blue/20 border border-brand-blue px-4 py-2 rounded-lg text-brand-blue font-semibold">
                    {isResidencial 
                      ? ('personas' in producto ? producto.personas?.toUpperCase() : '') 
                      : ('usuarios' in producto ? producto.usuarios?.toUpperCase() : '')
                    }
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="heading-display text-3xl text-brand-yellow">{producto.price}</p>
              <p className="text-brand-white/80 text-sm mt-2">*Precio sujeto a ubicación</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Galería de Imágenes */}
          <section className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
            <h2 className="heading-display text-xl text-brand-white mb-4">GALERÍA DEL PRODUCTO</h2>
            
            {/* Imagen principal */}
            <div className="bg-gradient-to-br from-brand-graphite to-brand-black rounded-xl border border-brand-yellow/50 mb-4 h-64 flex items-center justify-center overflow-hidden relative">
              <Image
                src={producto.images[imagenActiva]}
                alt={`${producto.name} - Imagen ${imagenActiva + 1}`}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-brand-yellow/90 text-brand-black px-3 py-1 rounded-lg text-sm font-semibold">
                {imagenActiva + 1} / {producto.images.length}
              </div>
            </div>
            
            {/* Miniaturas */}
            <div className="grid grid-cols-3 gap-2">
              {producto.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setImagenActiva(index)}
                  className={`h-20 rounded-lg border-2 transition-all duration-150 overflow-hidden ${
                    imagenActiva === index 
                      ? 'border-brand-yellow bg-brand-yellow/10' 
                      : 'border-brand-graphite bg-brand-black/50 hover:border-brand-yellow/50'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${producto.name} - Miniatura ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Especificaciones Técnicas */}
          <section className="bg-brand-black rounded-xl shadow-hard p-6 border border-brand-yellow">
            <div className="flex items-center mb-4">
              <Settings className="w-6 h-6 text-brand-yellow mr-3" strokeWidth={2.5} />
              <h2 className="heading-display text-xl text-brand-white">ESPECIFICACIONES TÉCNICAS</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-brand-graphite">
                <span className="text-brand-steel">Material:</span>
                <span className="text-brand-white font-semibold">{producto.specifications.material}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-brand-graphite">
                <span className="text-brand-steel">Dimensiones:</span>
                <span className="text-brand-white font-semibold">{producto.specifications.dimensiones}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-brand-graphite">
                <span className="text-brand-steel">Peso:</span>
                <span className="text-brand-white font-semibold">{producto.specifications.peso}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-brand-graphite">
                <span className="text-brand-steel">Garantía:</span>
                <span className="text-brand-yellow font-semibold flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  {producto.specifications.garantia}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-brand-graphite">
                <span className="text-brand-steel">Temp. Operación:</span>
                <span className="text-brand-white font-semibold">{producto.specifications.temperaturaOperacion}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-brand-graphite">
                <span className="text-brand-steel">Presión Máxima:</span>
                <span className="text-brand-white font-semibold">{producto.specifications.presionMaxima}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-brand-steel">Espesor de Pared:</span>
                <span className="text-brand-white font-semibold">{producto.specifications.espesorPared}</span>
              </div>
            </div>

            {/* Certificaciones */}
            <div className="mt-6 pt-6 border-t border-brand-graphite">
              <h3 className="heading-display text-lg text-brand-yellow mb-3">CERTIFICACIONES</h3>
              <div className="flex flex-wrap gap-2">
                {producto.specifications.certificaciones.map((cert, index) => (
                  <span 
                    key={index}
                    className="bg-brand-blue/20 border border-brand-blue text-brand-blue px-3 py-1 rounded-lg text-sm font-semibold flex items-center"
                  >
                    <Award className="w-4 h-4 mr-1" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Características y Ventajas */}
        <section className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-4">
                <Package className="w-6 h-6 text-brand-yellow mr-3" strokeWidth={2.5} />
                <h3 className="heading-display text-xl text-brand-white">CARACTERÍSTICAS PRINCIPALES</h3>
              </div>
              <ul className="space-y-2">
                {producto.features.map((feature, index) => (
                  <li key={index} className="text-brand-steel flex items-start">
                    <span className="text-brand-yellow mr-2 font-bold">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <Settings className="w-6 h-6 text-brand-yellow mr-3" strokeWidth={2.5} />
                <h3 className="heading-display text-xl text-brand-white">APLICACIONES IDEALES</h3>
              </div>
              <ul className="space-y-2">
                {producto.applications.map((app, index) => (
                  <li key={index} className="text-brand-steel flex items-start">
                    <span className="text-brand-yellow mr-2 font-bold">•</span>
                    {app}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Acciones de Compra */}
        <section className="bg-gradient-to-r from-brand-yellow to-brand-yellow/90 rounded-xl shadow-hard p-6 border border-brand-graphite">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="heading-display text-2xl text-brand-black mb-2">
                ¿LISTO PARA ADQUIRIR ESTE PRODUCTO?
              </h3>
              <p className="text-brand-black/80">Precio especial con instalación incluida en zona metropolitana</p>
            </div>
            <div className="flex gap-4">
              <Button className="bg-brand-black text-brand-yellow hover:bg-brand-black/90 font-semibold px-8 py-4 rounded-xl shadow-hard touch-target tracking-wide">
                💰 COTIZAR AHORA
              </Button>
              <Button className="bg-brand-white text-brand-black hover:bg-brand-white/90 border-2 border-brand-black font-semibold px-8 py-4 rounded-xl">
                📞 LLAMAR DIRECTAMENTE
              </Button>
            </div>
          </div>
        </section>

        {/* Productos Relacionados */}
        <section className="bg-brand-black rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <Package className="w-6 h-6 text-brand-yellow mr-3" strokeWidth={2.5} />
            <h2 className="heading-display text-2xl text-brand-white">PRODUCTOS RELACIONADOS</h2>
          </div>
          
          <div className="text-center py-8 text-brand-steel">
            <p>Productos relacionados próximamente disponibles</p>
            <Link href={isResidencial ? "/productos/residencial" : "/productos/comercial"}>
              <Button className="btn-secondary mt-4 px-6 py-3">
                VER MÁS PRODUCTOS {isResidencial ? "RESIDENCIALES" : "COMERCIALES"}
              </Button>
            </Link>
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