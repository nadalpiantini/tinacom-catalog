"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Calculator, Users, Building, Home, Package, CheckCircle, ArrowRight, Phone } from "lucide-react";
import { useState } from "react";
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

export default function ConfigurarPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tipoUso: "",
    numPersonas: "",
    numHabitaciones: "",
    consumoDiario: "",
    tipoEdificio: "",
    alturaEdificio: "",
    presionAgua: "",
    ubicacion: ""
  });

  const [recommendation, setRecommendation] = useState<any>(null);

  const usageTypes = [
    {
      id: "residencial",
      name: "Residencial",
      icon: Home,
      description: "Hogares y viviendas particulares"
    },
    {
      id: "comercial",
      name: "Comercial",
      icon: Building,
      description: "Edificios comerciales y oficinas"
    },
    {
      id: "industrial",
      name: "Industrial",
      icon: Settings,
      description: "Instalaciones industriales"
    }
  ];

  const recommendations = {
    residencial: [
      {
        capacity: "450L",
        model: "Tinaco 450L",
        price: "$2,890",
        description: "Ideal para 1-2 personas",
        features: ["Compacto", "Fácil instalación", "Garantía 10 años"]
      },
      {
        capacity: "750L",
        model: "Tinaco 750L",
        price: "$3,490",
        description: "Perfecto para 3-4 personas",
        features: ["Capacidad equilibrada", "Durabilidad", "Garantía 10 años"]
      },
      {
        capacity: "1100L",
        model: "Tinaco 1100L",
        price: "$4,290",
        description: "Para 5+ personas",
        features: ["Gran capacidad", "Alta resistencia", "Garantía 12 años"]
      }
    ],
    comercial: [
      {
        capacity: "2500L",
        model: "Tinaco 2500L",
        price: "$8,990",
        description: "Edificios pequeños",
        features: ["Grado comercial", "Alta durabilidad", "Garantía 15 años"]
      },
      {
        capacity: "5000L",
        model: "Tinaco 5000L",
        price: "$15,990",
        description: "Edificios medianos",
        features: ["Capacidad industrial", "Reforzado", "Garantía 15 años"]
      },
      {
        capacity: "10000L",
        model: "Tinaco 10000L",
        price: "$28,990",
        description: "Complejos grandes",
        features: ["Máxima capacidad", "Ultra-reforzado", "Garantía 20 años"]
      }
    ]
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateRecommendation = () => {
    const { tipoUso, numPersonas, numHabitaciones } = formData;
    
    if (tipoUso === "residencial") {
      const personas = parseInt(numPersonas) || 0;
      if (personas <= 2) {
        setRecommendation(recommendations.residencial[0]);
      } else if (personas <= 4) {
        setRecommendation(recommendations.residencial[1]);
      } else {
        setRecommendation(recommendations.residencial[2]);
      }
    } else if (tipoUso === "comercial") {
      const habitaciones = parseInt(numHabitaciones) || 0;
      if (habitaciones <= 10) {
        setRecommendation(recommendations.comercial[0]);
      } else if (habitaciones <= 25) {
        setRecommendation(recommendations.comercial[1]);
      } else {
        setRecommendation(recommendations.comercial[2]);
      }
    }
    
    setStep(3);
  };

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

        {/* Título de la Sección */}
        <section className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
              <Settings className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h1 className="heading-display text-3xl text-brand-white">
              CONFIGURADOR INTELIGENTE TINACOM
            </h1>
          </div>
          <p className="text-brand-steel text-lg leading-relaxed">
            Sistema automatizado para determinar la capacidad óptima según parámetros operacionales y necesidades específicas.
          </p>
        </section>

        {/* Progreso */}
        <section className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
                <Calculator className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
              </div>
              <h2 className="heading-display text-2xl text-brand-white">
                CONFIGURACIÓN PASO A PASO
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-steel text-sm">Paso {step} de 3</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className={`w-3 h-3 rounded-full ${
                      stepNumber <= step ? "bg-brand-yellow" : "bg-brand-steel"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Paso 1: Tipo de Uso */}
          {step === 1 && (
            <Card className="bg-brand-black/30 border border-brand-yellow">
              <CardContent className="p-6">
                <h3 className="text-brand-white font-semibold text-xl mb-6">1. Selecciona el Tipo de Uso</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {usageTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <Button
                        key={type.id}
                        onClick={() => {
                          handleInputChange("tipoUso", type.id);
                          setStep(2);
                        }}
                        className="bg-brand-black/50 border border-brand-yellow hover:bg-brand-black hover:border-brand-yellow/80 h-32 rounded-xl touch-target transition-all duration-150 w-full flex flex-col items-center justify-center gap-3"
                      >
                        <IconComponent className="w-8 h-8 text-brand-yellow" strokeWidth={2.5} />
                        <div className="text-center">
                          <div className="text-brand-white font-semibold text-lg">{type.name}</div>
                          <div className="text-brand-steel text-xs">{type.description}</div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Paso 2: Parámetros Específicos */}
          {step === 2 && (
            <Card className="bg-brand-black/30 border border-brand-yellow">
              <CardContent className="p-6">
                <h3 className="text-brand-white font-semibold text-xl mb-6">2. Parámetros Específicos</h3>
                
                {formData.tipoUso === "residencial" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-brand-white font-medium mb-2">Número de Personas</label>
                      <Input
                        type="number"
                        placeholder="Ej: 4"
                        value={formData.numPersonas}
                        onChange={(e) => handleInputChange("numPersonas", e.target.value)}
                        className="bg-brand-black/30 border-brand-yellow text-brand-white placeholder:text-brand-steel"
                      />
                    </div>
                    <div>
                      <label className="block text-brand-white font-medium mb-2">Número de Habitaciones</label>
                      <Input
                        type="number"
                        placeholder="Ej: 3"
                        value={formData.numHabitaciones}
                        onChange={(e) => handleInputChange("numHabitaciones", e.target.value)}
                        className="bg-brand-black/30 border-brand-yellow text-brand-white placeholder:text-brand-steel"
                      />
                    </div>
                    <div>
                      <label className="block text-brand-white font-medium mb-2">Consumo Diario Estimado (L)</label>
                      <Input
                        type="number"
                        placeholder="Ej: 200"
                        value={formData.consumoDiario}
                        onChange={(e) => handleInputChange("consumoDiario", e.target.value)}
                        className="bg-brand-black/30 border-brand-yellow text-brand-white placeholder:text-brand-steel"
                      />
                    </div>
                    <div>
                      <label className="block text-brand-white font-medium mb-2">Ubicación de Instalación</label>
                      <select
                        value={formData.ubicacion}
                        onChange={(e) => handleInputChange("ubicacion", e.target.value)}
                        className="w-full bg-brand-black/30 border border-brand-yellow text-brand-white rounded-xl p-3 focus:border-brand-yellow/80"
                      >
                        <option value="">Seleccionar ubicación...</option>
                        <option value="azotea">Azotea</option>
                        <option value="patio">Patio</option>
                        <option value="sotano">Sótano</option>
                        <option value="exterior">Exterior</option>
                      </select>
                    </div>
                  </div>
                )}

                {formData.tipoUso === "comercial" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-brand-white font-medium mb-2">Número de Habitaciones/Oficinas</label>
                      <Input
                        type="number"
                        placeholder="Ej: 15"
                        value={formData.numHabitaciones}
                        onChange={(e) => handleInputChange("numHabitaciones", e.target.value)}
                        className="bg-brand-black/30 border-brand-yellow text-brand-white placeholder:text-brand-steel"
                      />
                    </div>
                    <div>
                      <label className="block text-brand-white font-medium mb-2">Altura del Edificio (pisos)</label>
                      <Input
                        type="number"
                        placeholder="Ej: 5"
                        value={formData.alturaEdificio}
                        onChange={(e) => handleInputChange("alturaEdificio", e.target.value)}
                        className="bg-brand-black/30 border-brand-yellow text-brand-white placeholder:text-brand-steel"
                      />
                    </div>
                    <div>
                      <label className="block text-brand-white font-medium mb-2">Presión de Agua (PSI)</label>
                      <Input
                        type="number"
                        placeholder="Ej: 45"
                        value={formData.presionAgua}
                        onChange={(e) => handleInputChange("presionAgua", e.target.value)}
                        className="bg-brand-black/30 border-brand-yellow text-brand-white placeholder:text-brand-steel"
                      />
                    </div>
                    <div>
                      <label className="block text-brand-white font-medium mb-2">Tipo de Edificio</label>
                      <select
                        value={formData.tipoEdificio}
                        onChange={(e) => handleInputChange("tipoEdificio", e.target.value)}
                        className="w-full bg-brand-black/30 border border-brand-yellow text-brand-white rounded-xl p-3 focus:border-brand-yellow/80"
                      >
                        <option value="">Seleccionar tipo...</option>
                        <option value="oficinas">Oficinas</option>
                        <option value="hotel">Hotel</option>
                        <option value="restaurante">Restaurante</option>
                        <option value="comercial">Centro Comercial</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <Button 
                    onClick={() => setStep(1)}
                    className="btn-secondary px-6 py-3 touch-target"
                  >
                    ANTERIOR
                  </Button>
                  <Button 
                    onClick={calculateRecommendation}
                    className="btn-primary px-6 py-3 touch-target"
                  >
                    CALCULAR RECOMENDACIÓN
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Paso 3: Recomendación */}
          {step === 3 && recommendation && (
            <Card className="bg-brand-black/30 border border-brand-yellow">
              <CardContent className="p-6">
                <h3 className="text-brand-white font-semibold text-xl mb-6">3. Recomendación Optimizada</h3>
                
                <div className="bg-gradient-to-r from-brand-terra to-brand-terra/80 rounded-xl p-6 border border-brand-yellow mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-brand-white font-bold text-2xl mb-2">{recommendation.model}</h4>
                      <p className="text-brand-steel text-lg mb-3">{recommendation.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="bg-brand-yellow/20 border border-brand-yellow px-3 py-1 rounded text-brand-yellow text-sm font-semibold">
                          {recommendation.capacity}
                        </span>
                        <span className="text-brand-yellow font-bold text-xl">{recommendation.price}</span>
                      </div>
                    </div>
                    <div className="bg-brand-yellow/20 p-4 rounded-xl">
                      <Package className="w-12 h-12 text-brand-yellow" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-brand-white font-semibold text-lg mb-3">Características Principales</h5>
                    <ul className="space-y-2">
                      {recommendation.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center gap-2 text-brand-steel">
                          <CheckCircle className="w-4 h-4 text-brand-yellow" strokeWidth={2.5} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-brand-white font-semibold text-lg mb-3">Parámetros Considerados</h5>
                    <div className="space-y-2 text-brand-steel text-sm">
                      <div>Tipo de uso: <span className="text-brand-yellow">{formData.tipoUso}</span></div>
                      {formData.numPersonas && <div>Personas: <span className="text-brand-yellow">{formData.numPersonas}</span></div>}
                      {formData.numHabitaciones && <div>Habitaciones: <span className="text-brand-yellow">{formData.numHabitaciones}</span></div>}
                      {formData.consumoDiario && <div>Consumo diario: <span className="text-brand-yellow">{formData.consumoDiario}L</span></div>}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button 
                    onClick={() => setStep(2)}
                    className="btn-secondary px-6 py-3 touch-target"
                  >
                    MODIFICAR PARÁMETROS
                  </Button>
                  <Button className="btn-primary px-6 py-3 touch-target">
                    VER ESPECIFICACIONES COMPLETAS
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Información Adicional */}
        <section className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
              <Users className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h2 className="heading-display text-2xl text-brand-white">
              ASESORÍA ESPECIALIZADA
            </h2>
          </div>
          <Card className="bg-brand-black/20 border border-brand-yellow/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <p className="text-brand-white/90 text-lg mb-6 leading-relaxed">
                ¿Necesitas asesoría personalizada? Nuestros técnicos especializados pueden ayudarte a determinar la configuración óptima para tu proyecto específico.
              </p>
              <div className="flex gap-4">
                <Button className="btn-primary px-8 py-4 touch-target">
                  <Phone className="w-4 h-4 mr-2" strokeWidth={2.5} />
                  CONTACTAR TÉCNICO
                </Button>
                <Button className="btn-secondary px-8 py-4 touch-target">
                  <ArrowRight className="w-4 h-4 mr-2" strokeWidth={2.5} />
                  SOLICITAR COTIZACIÓN
                </Button>
              </div>
            </CardContent>
          </Card>
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
