"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, BookOpen, Shield, Wrench, Users } from "lucide-react";
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

export default function DocumentosPage() {
  const documentCategories = [
    {
      name: "Manuales de Instalación",
      icon: Wrench,
      description: "Guías paso a paso para instalación profesional",
      documents: [
        {
          title: "Manual de Instalación Residencial",
          description: "Instrucciones detalladas para tinacos de 450L a 1100L",
          size: "2.4 MB",
          type: "PDF",
          version: "v2.1"
        },
        {
          title: "Manual de Instalación Comercial",
          description: "Procedimientos para tinacos de 2500L a 10000L",
          size: "3.8 MB",
          type: "PDF",
          version: "v1.9"
        },
        {
          title: "Checklist para Instaladores PRO",
          description: "Lista de verificación para instalaciones certificadas",
          size: "1.2 MB",
          type: "PDF",
          version: "v3.0"
        }
      ]
    },
    {
      name: "Especificaciones Técnicas",
      icon: Shield,
      description: "Certificaciones y especificaciones de producto",
      documents: [
        {
          title: "Certificaciones NOM-001-CONAGUA",
          description: "Certificados de cumplimiento con normas mexicanas",
          size: "1.8 MB",
          type: "PDF",
          version: "v2.0"
        },
        {
          title: "Especificaciones NSF-61",
          description: "Certificación para contacto con agua potable",
          size: "2.1 MB",
          type: "PDF",
          version: "v1.8"
        },
        {
          title: "Fichas Técnicas Completas",
          description: "Especificaciones detalladas de todos los modelos",
          size: "4.5 MB",
          type: "PDF",
          version: "v2.3"
        }
      ]
    },
    {
      name: "Mantenimiento y Cuidado",
      icon: BookOpen,
      description: "Guías de mantenimiento y limpieza",
      documents: [
        {
          title: "Guía de Mantenimiento Preventivo",
          description: "Programa de mantenimiento recomendado",
          size: "1.6 MB",
          type: "PDF",
          version: "v1.7"
        },
        {
          title: "Procedimientos de Limpieza",
          description: "Métodos seguros para limpieza de tinacos",
          size: "1.9 MB",
          type: "PDF",
          version: "v2.0"
        },
        {
          title: "Solución de Problemas Comunes",
          description: "Diagnóstico y solución de fallas frecuentes",
          size: "2.7 MB",
          type: "PDF",
          version: "v1.6"
        }
      ]
    },
    {
      name: "Garantías y Soporte",
      icon: Users,
      description: "Información sobre garantías y soporte técnico",
      documents: [
        {
          title: "Términos y Condiciones de Garantía",
          description: "Cobertura y condiciones de garantía Tinacom",
          size: "1.3 MB",
          type: "PDF",
          version: "v2.2"
        },
        {
          title: "Procedimiento de Reclamo de Garantía",
          description: "Pasos para procesar garantías y reclamos",
          size: "1.5 MB",
          type: "PDF",
          version: "v1.9"
        },
        {
          title: "Contactos de Soporte Técnico",
          description: "Información de contacto y horarios de atención",
          size: "0.8 MB",
          type: "PDF",
          version: "v2.1"
        }
      ]
    }
  ];

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
              <FileText className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h1 className="heading-display text-3xl text-brand-white">
              DOCUMENTACIÓN TÉCNICA TINACOM
            </h1>
          </div>
          <p className="text-brand-steel text-lg leading-relaxed">
            Accede a toda la documentación técnica, manuales de instalación, especificaciones y guías de mantenimiento para nuestros productos Tinacom.
          </p>
        </section>

        {/* Categorías de Documentos */}
        {documentCategories.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          return (
            <section key={categoryIndex} className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
              <div className="flex items-center mb-6">
                <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
                  <IconComponent className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="heading-display text-2xl text-brand-white">
                    {category.name.toUpperCase()}
                  </h2>
                  <p className="text-brand-steel text-sm mt-1">{category.description}</p>
                </div>
              </div>
              
              <div className="grid gap-4">
                {category.documents.map((document, docIndex) => (
                  <Card key={docIndex} className="bg-brand-black/30 border border-brand-yellow hover:border-brand-yellow/80 hover:bg-brand-black/50 transition-all duration-150">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <FileText className="w-5 h-5 text-brand-yellow" strokeWidth={2.5} />
                            <h3 className="text-brand-white font-semibold text-lg">{document.title}</h3>
                            <span className="bg-brand-yellow/20 border border-brand-yellow px-2 py-1 rounded text-brand-yellow text-xs font-semibold">
                              {document.version}
                            </span>
                          </div>
                          <p className="text-brand-steel text-sm mb-3">{document.description}</p>
                          <div className="flex items-center gap-4 text-brand-steel text-xs">
                            <span className="flex items-center gap-1">
                              <FileText className="w-3 h-3" strokeWidth={2} />
                              {document.type}
                            </span>
                            <span>•</span>
                            <span>{document.size}</span>
                          </div>
                        </div>
                        <Button className="btn-primary px-6 py-3 touch-target ml-4">
                          <Download className="w-4 h-4 mr-2" strokeWidth={2.5} />
                          DESCARGAR
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}

        {/* Información Adicional */}
        <section className="bg-gradient-to-r from-brand-terra to-brand-terra/80 rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
              <Shield className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h2 className="heading-display text-2xl text-brand-white">
              CERTIFICACIONES Y NORMAS
            </h2>
          </div>
          <Card className="bg-brand-black/20 border border-brand-yellow/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-brand-yellow font-semibold text-lg mb-3">Certificaciones Principales</h3>
                  <ul className="space-y-2 text-brand-white/90">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                      NOM-001-CONAGUA (Norma Mexicana)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                      NSF-61 (Contacto con Agua Potable)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                      FDA (Grado Alimenticio)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                      ISO-9001 (Gestión de Calidad)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-brand-yellow font-semibold text-lg mb-3">Garantías Tinacom</h3>
                  <ul className="space-y-2 text-brand-white/90">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                      Residencial: 10-12 años
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                      Comercial: 15 años
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                      Industrial: 20 años
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                      Soporte técnico incluido
                    </li>
                  </ul>
                </div>
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
