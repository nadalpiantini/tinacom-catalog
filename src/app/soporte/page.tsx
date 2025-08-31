"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Phone, Mail, MapPin, Clock, Shield, FileText, AlertTriangle, CheckCircle } from "lucide-react";
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

export default function SoportePage() {
  const [selectedIssue, setSelectedIssue] = useState("");
  const [description, setDescription] = useState("");

  const supportOptions = [
    {
      title: "Registrar Garantía",
      description: "Registra tu producto Tinacom para activar la garantía",
      icon: Shield,
      variant: "default" as const,
      action: "REGISTRAR"
    },
    {
      title: "Iniciar Reclamo",
      description: "Reporta un problema con tu tinaco Tinacom",
      icon: AlertTriangle,
      variant: "secondary" as const,
      action: "INICIAR RECLAMO"
    },
    {
      title: "Soporte Técnico",
      description: "Consulta técnica especializada",
      icon: MessageCircle,
      variant: "outline" as const,
      action: "CONTACTAR"
    }
  ];

  const contactInfo = [
    {
      title: "Teléfono de Soporte",
      value: "01-800-TINACOM",
      description: "Línea directa 24/7",
      icon: Phone
    },
    {
      title: "Email Técnico",
      value: "soporte@tinacom.com.mx",
      description: "Respuesta en 24 horas",
      icon: Mail
    },
    {
      title: "Oficina Central",
      value: "Monterrey, N.L.",
      description: "Av. Industrial 1234",
      icon: MapPin
    },
    {
      title: "Horarios de Atención",
      value: "Lun-Vie: 8:00-18:00",
      description: "Sábados: 9:00-14:00",
      icon: Clock
    }
  ];

  const commonIssues = [
    {
      issue: "Fuga de agua",
      solution: "Verificar sellos y conexiones. Contactar técnico si persiste.",
      priority: "Alta"
    },
    {
      issue: "Mal olor en el agua",
      solution: "Limpiar tinaco según manual. Usar productos aprobados Tinacom.",
      priority: "Media"
    },
    {
      issue: "Filtración de sedimentos",
      solution: "Instalar filtro de entrada. Revisar calidad del agua.",
      priority: "Media"
    },
    {
      issue: "Grietas o fisuras",
      solution: "Detener uso inmediatamente. Contactar garantía Tinacom.",
      priority: "Alta"
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
              <MessageCircle className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h1 className="heading-display text-3xl text-brand-white">
              SOPORTE & GARANTÍAS TINACOM
            </h1>
          </div>
          <p className="text-brand-steel text-lg leading-relaxed">
            ¿Problemas con tu tinaco? Registra tu garantía, inicia un reclamo o contacta a nuestro equipo técnico especializado.
          </p>
        </section>

        {/* Opciones de Soporte */}
        <section className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
              <Shield className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h2 className="heading-display text-2xl text-brand-white">
              SERVICIOS DE SOPORTE
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card key={index} className="bg-brand-black/30 border border-brand-yellow hover:border-brand-yellow/80 hover:bg-brand-black/50 transition-all duration-150">
                  <CardContent className="p-6 text-center">
                    <div className="bg-brand-yellow/20 p-4 rounded-xl mb-4 inline-block">
                      <IconComponent className="w-8 h-8 text-brand-yellow" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-brand-white font-semibold text-lg mb-2">{option.title}</h3>
                    <p className="text-brand-steel text-sm mb-4">{option.description}</p>
                    <Button 
                      className={`w-full touch-target ${
                        option.variant === 'default' 
                          ? "btn-primary" 
                          : option.variant === 'secondary'
                          ? "btn-secondary"
                          : "bg-transparent border border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-black"
                      }`}
                    >
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Formulario de Reclamo */}
        <section className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
              <FileText className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h2 className="heading-display text-2xl text-brand-white">
              REPORTAR PROBLEMA
            </h2>
          </div>
          <Card className="bg-brand-black/30 border border-brand-yellow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-brand-white font-medium mb-2">Tipo de Problema</label>
                  <select 
                    className="w-full bg-brand-black/30 border border-brand-yellow text-brand-white rounded-xl p-3 focus:border-brand-yellow/80"
                    value={selectedIssue}
                    onChange={(e) => setSelectedIssue(e.target.value)}
                  >
                    <option value="">Seleccionar problema...</option>
                    <option value="fuga">Fuga de agua</option>
                    <option value="olor">Mal olor en el agua</option>
                    <option value="sedimentos">Filtración de sedimentos</option>
                    <option value="grietas">Grietas o fisuras</option>
                    <option value="instalacion">Problema de instalación</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-brand-white font-medium mb-2">Modelo del Tinaco</label>
                  <Input 
                    placeholder="Ej: Tinaco 750L"
                    className="bg-brand-black/30 border-brand-yellow text-brand-white placeholder:text-brand-steel"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-brand-white font-medium mb-2">Descripción del Problema</label>
                <textarea 
                  placeholder="Describe detalladamente el problema que estás experimentando..."
                  className="w-full bg-brand-black/30 border border-brand-yellow text-brand-white placeholder:text-brand-steel rounded-xl p-3 h-32 resize-none focus:border-brand-yellow/80"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mt-6 flex gap-4">
                <Button className="btn-primary px-8 py-3 touch-target">
                  <FileText className="w-4 h-4 mr-2" strokeWidth={2.5} />
                  ENVIAR REPORTE
                </Button>
                <Button className="btn-secondary px-8 py-3 touch-target">
                  ADJUNTAR FOTOS
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Problemas Comunes */}
        <section className="bg-brand-graphite rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
              <CheckCircle className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h2 className="heading-display text-2xl text-brand-white">
              PROBLEMAS COMUNES
            </h2>
          </div>
          <div className="grid gap-4">
            {commonIssues.map((issue, index) => (
              <Card key={index} className="bg-brand-black/30 border border-brand-yellow hover:border-brand-yellow/80">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-brand-yellow" strokeWidth={2.5} />
                        <h3 className="text-brand-white font-semibold">{issue.issue}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          issue.priority === "Alta" 
                            ? "bg-red-500/20 border border-red-500 text-red-400"
                            : "bg-yellow-500/20 border border-yellow-500 text-yellow-400"
                        }`}>
                          {issue.priority}
                        </span>
                      </div>
                      <p className="text-brand-steel text-sm">{issue.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Información de Contacto */}
        <section className="bg-gradient-to-r from-brand-terra to-brand-terra/80 rounded-xl shadow-hard p-6 border border-brand-yellow">
          <div className="flex items-center mb-6">
            <div className="bg-brand-yellow px-4 py-2 rounded-lg mr-4">
              <Phone className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <h2 className="heading-display text-2xl text-brand-white">
              CONTACTO DIRECTO
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactInfo.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <Card key={index} className="bg-brand-black/20 border border-brand-yellow/20 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-yellow/20 p-2 rounded-lg">
                        <IconComponent className="w-5 h-5 text-brand-yellow" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="text-brand-white font-semibold text-sm">{contact.title}</h3>
                        <p className="text-brand-yellow font-bold">{contact.value}</p>
                        <p className="text-brand-steel text-xs">{contact.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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
