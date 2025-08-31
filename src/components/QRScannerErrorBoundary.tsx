"use client";

import React from 'react';
import { AlertCircle, RefreshCw, Upload, Camera, Smartphone, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

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

interface QRScannerErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ 
    onRetry: () => void; 
    onFileUpload: (file: File) => void;
    errorType: ErrorType;
    errorMessage: string;
  }>;
}

type ErrorType = 'camera' | 'permission' | 'unsupported' | 'network' | 'unknown';

interface QRScannerErrorBoundaryState {
  hasError: boolean;
  errorType: ErrorType;
  errorMessage: string;
  errorStack?: string;
}

class QRScannerErrorBoundary extends React.Component<
  QRScannerErrorBoundaryProps,
  QRScannerErrorBoundaryState
> {
  constructor(props: QRScannerErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorType: 'unknown',
      errorMessage: ''
    };
  }

  static getDerivedStateFromError(error: Error): QRScannerErrorBoundaryState {
    // Analizar el tipo de error basado en el mensaje
    let errorType: ErrorType = 'unknown';
    const message = error.message.toLowerCase();
    
    if (message.includes('permission') || message.includes('access')) {
      errorType = 'permission';
    } else if (message.includes('camera') || message.includes('webcam')) {
      errorType = 'camera'; 
    } else if (message.includes('not supported') || message.includes('unsupported')) {
      errorType = 'unsupported';
    } else if (message.includes('network') || message.includes('fetch')) {
      errorType = 'network';
    }

    return {
      hasError: true,
      errorType,
      errorMessage: error.message,
      errorStack: error.stack
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log detallado para debugging
    console.error('🚨 QR Scanner Error:', error);
    console.error('Error Info:', errorInfo);
    
    // En producción, aquí se podría enviar a un servicio de logging
    if (process.env.NODE_ENV === 'production') {
      // Ejemplo: Sentry, LogRocket, etc.
      // logErrorToService(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback || DefaultQRErrorFallback;
      
      return (
        <Fallback
          onRetry={() => this.setState({ hasError: false })}
          onFileUpload={() => {}} // Se implementará más adelante
          errorType={this.state.errorType}
          errorMessage={this.state.errorMessage}
        />
      );
    }

    return this.props.children;
  }
}

// Componente de fallback por defecto con diseño Tinacom
const DefaultQRErrorFallback: React.FC<{
  onRetry: () => void;
  onFileUpload: (file: File) => void;
  errorType: ErrorType;
  errorMessage: string;
}> = ({ onRetry, onFileUpload, errorType, errorMessage }) => {
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileUpload(file);
  };

  // Configurar mensaje y acciones según el tipo de error
  const getErrorConfig = (type: ErrorType) => {
    switch (type) {
      case 'permission':
        return {
          title: 'ACCESO A CÁMARA REQUERIDO',
          description: 'Para escanear códigos QR de tinacos, necesitamos permiso para usar tu cámara.',
          icon: Camera,
          color: 'brand-yellow',
          solutions: [
            'Permite el acceso cuando aparezca el popup del navegador',
            'Verifica que no haya otras aplicaciones usando la cámara',
            'En móvil: busca el ícono de cámara en la barra de direcciones'
          ]
        };
        
      case 'camera':
        return {
          title: 'ERROR DE CÁMARA',
          description: 'No se pudo inicializar la cámara correctamente.',
          icon: AlertCircle,
          color: 'brand-terra',
          solutions: [
            'Verifica que tu dispositivo tenga una cámara funcional',
            'Cierra otras aplicaciones que puedan estar usando la cámara',
            'Recarga la página e intenta nuevamente'
          ]
        };
        
      case 'unsupported':
        return {
          title: 'NAVEGADOR NO COMPATIBLE',
          description: 'Tu navegador no soporta la función de escaneo QR.',
          icon: Smartphone,
          color: 'brand-steel',
          solutions: [
            'Usa un navegador moderno como Chrome, Firefox o Safari',
            'Actualiza tu navegador a la versión más reciente',
            'Asegúrate de estar en una conexión HTTPS'
          ]
        };
        
      case 'network':
        return {
          title: 'ERROR DE CONEXIÓN',
          description: 'Problema de conectividad al inicializar el scanner.',
          icon: AlertCircle,
          color: 'brand-terra',
          solutions: [
            'Verifica tu conexión a internet',
            'Recarga la página',
            'Intenta desde una conexión más estable'
          ]
        };
        
      default:
        return {
          title: 'ERROR DEL SCANNER',
          description: 'Ocurrió un problema inesperado con el scanner QR.',
          icon: AlertCircle,
          color: 'brand-terra',
          solutions: [
            'Recarga la página e intenta nuevamente',
            'Verifica que tu dispositivo sea compatible',
            'Contacta soporte si el problema persiste'
          ]
        };
    }
  };

  const config = getErrorConfig(errorType);
  const IconComponent = config.icon;

  return (
    <Card className="bg-brand-graphite border border-brand-yellow rounded-xl shadow-hard">
      <CardContent className="p-8">
        <div className="text-center">
          {/* Header con Logo */}
          <div className="bg-brand-black rounded-xl p-6 border border-brand-yellow/30 mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <TinacomLogo className="w-12 h-12" />
              <div className={`bg-${config.color}/10 p-4 rounded-xl border border-${config.color}/30`}>
                <IconComponent className={`w-12 h-12 text-${config.color}`} strokeWidth={2} />
              </div>
            </div>
            <h3 className="heading-display text-2xl text-brand-white mb-3">
              {config.title}
            </h3>
            <p className="text-brand-steel text-lg">
              {config.description}
            </p>
          </div>

          {/* Soluciones sugeridas */}
          <div className="bg-brand-black/30 rounded-xl p-6 border border-brand-yellow/20 mb-8">
            <h4 className="text-brand-yellow font-semibold mb-4 flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5" />
              SOLUCIONES SUGERIDAS
            </h4>
            <ul className="text-brand-steel text-sm space-y-2 text-left max-w-md mx-auto">
              {config.solutions.map((solution, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="bg-brand-yellow text-brand-black w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              onClick={onRetry}
              className="btn-primary px-8 py-4 touch-target"
            >
              <RefreshCw className="w-5 h-5 mr-2" strokeWidth={2.5} />
              REINTENTAR SCANNER
            </Button>
            
            <label className="btn-secondary px-8 py-4 touch-target cursor-pointer">
              <Upload className="w-5 h-5 mr-2" strokeWidth={2.5} />
              SUBIR IMAGEN QR
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Subir imagen con código QR"
              />
            </label>
          </div>

          {/* Información técnica (solo en desarrollo) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="bg-brand-black/50 rounded-lg p-4 border border-brand-steel/20 text-left">
              <summary className="text-brand-steel text-sm cursor-pointer">
                📋 Información técnica (desarrollo)
              </summary>
              <div className="mt-3 text-xs text-brand-steel/80 font-mono">
                <p><strong>Tipo:</strong> {errorType}</p>
                <p><strong>Mensaje:</strong> {errorMessage}</p>
                <p><strong>Navegador:</strong> {navigator.userAgent}</p>
                <p><strong>Protocolo:</strong> {window.location.protocol}</p>
              </div>
            </details>
          )}

          {/* Footer */}
          <div className="pt-6 border-t border-brand-graphite/30 mt-8">
            <p className="text-brand-steel text-sm">
              Si el problema persiste, contacta soporte técnico Tinacom
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRScannerErrorBoundary;