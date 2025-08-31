"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useQRScanner } from '@/hooks/useQRScanner';
import { 
  Camera, 
  CameraOff, 
  RotateCcw, 
  AlertCircle, 
  Loader2, 
  Target,
  Smartphone,
  QrCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose?: () => void;
  className?: string;
}

export const QRScanner: React.FC<QRScannerProps> = ({
  onScan,
  onClose,
  className = ''
}) => {
  const scannerIdRef = useRef(`qr-scanner-tinacom-${Math.random().toString(36).substr(2, 9)}`);
  
  const qrConfig = {
    fps: 8, // Configuración por defecto, se ajustará en el hook
    qrbox: { width: 280, height: 280 },
    aspectRatio: 1.0
  };

  const {
    elementRef,
    isScanning,
    error,
    hasPermission,
    cameraDevices,
    selectedCamera,
    isInitializing,
    startScanning,
    stopScanning,
    switchCamera,
    retryScanning,
    getCameraDevices,
    isMobile
  } = useQRScanner(
    onScan,
    (error) => console.warn('🚨 Error QR Tinacom:', error),
    qrConfig
  );

  useEffect(() => {
    getCameraDevices();
  }, [getCameraDevices]);

  // Estado de permisos denegados
  if (hasPermission === false) {
    return (
      <Card className="bg-brand-black border border-brand-yellow rounded-xl shadow-hard">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="bg-brand-yellow/10 p-6 rounded-xl border border-brand-yellow/30 mb-6">
              <AlertCircle className="w-16 h-16 text-brand-yellow mx-auto mb-4" strokeWidth={2} />
              <h3 className="heading-display text-xl text-brand-yellow mb-3">
                ACCESO A CÁMARA REQUERIDO
              </h3>
              <p className="text-brand-steel text-center mb-6">
                Para escanear códigos QR de tinacos Tinacom, necesitamos acceso a tu cámara.
              </p>
              
              <div className="bg-brand-graphite/50 p-4 rounded-lg border border-brand-steel/20 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <Smartphone className="w-5 h-5 text-brand-yellow" />
                  <span className="text-brand-white font-medium">Instrucciones:</span>
                </div>
                <ul className="text-brand-steel text-sm space-y-1 text-left">
                  <li>• Permite el acceso a la cámara cuando aparezca el popup</li>
                  <li>• En móvil: busca el ícono de cámara en la barra de direcciones</li>
                  <li>• Asegúrate de estar en una conexión segura (HTTPS)</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={retryScanning}
                className="btn-primary px-8 py-4 touch-target"
              >
                <Camera className="w-5 h-5 mr-2" strokeWidth={2.5} />
                PERMITIR CÁMARA
              </Button>
              
              {onClose && (
                <Button
                  onClick={onClose}
                  className="btn-secondary px-8 py-4 touch-target"
                >
                  CERRAR
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`qr-scanner-container ${className}`}>
      {/* Header del Scanner */}
      <div className="bg-brand-graphite rounded-xl p-4 border border-brand-yellow mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-yellow p-2 rounded-lg">
              <QrCode className="w-6 h-6 text-brand-black" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="heading-display text-lg text-brand-white">
                SCANNER TINACOM
              </h3>
              <p className="text-brand-steel text-sm">
                {isInitializing ? 'Inicializando cámara...' :
                 isScanning ? 'Buscando código QR...' :
                 'Listo para escanear'}
              </p>
            </div>
          </div>
          
          {/* Indicador de estado */}
          <div className="flex items-center gap-2">
            {isInitializing && (
              <Loader2 className="w-5 h-5 text-brand-yellow animate-spin" />
            )}
            {isScanning && (
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      </div>

      {/* Área de Escaneado */}
      <Card className="bg-brand-black border border-brand-yellow rounded-xl shadow-hard overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            {/* Elemento del Scanner */}
            <div
              id={scannerIdRef.current}
              ref={elementRef}
              className="qr-scanner-element bg-brand-black rounded-xl overflow-hidden"
              style={{
                minHeight: '400px',
                maxHeight: '500px',
                width: '100%'
              }}
            />
            
            {/* Overlay de ayuda visual cuando no está escaneando */}
            {!isScanning && !isInitializing && (
              <div className="absolute inset-0 flex items-center justify-center bg-brand-black/80 rounded-xl">
                <div className="text-center">
                  <Target className="w-24 h-24 text-brand-yellow/50 mx-auto mb-4" strokeWidth={1.5} />
                  <p className="text-brand-steel">
                    Presiona <span className="text-brand-yellow font-semibold">"INICIAR SCANNER"</span><br />
                    para comenzar
                  </p>
                </div>
              </div>
            )}
            
            {/* Indicador de escaneo activo */}
            {isScanning && (
              <div className="absolute top-4 right-4 bg-brand-yellow text-brand-black px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-black rounded-full animate-pulse"></div>
                ESCANEANDO
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Controles del Scanner */}
      <div className="bg-brand-graphite rounded-xl p-4 border border-brand-yellow mt-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {!isScanning ? (
              <Button
                onClick={startScanning}
                disabled={!cameraDevices.length || isInitializing}
                className="btn-primary px-6 py-3 touch-target"
              >
                <Camera className="w-5 h-5 mr-2" strokeWidth={2.5} />
                {isInitializing ? 'INICIALIZANDO...' : 'INICIAR SCANNER'}
              </Button>
            ) : (
              <Button
                onClick={stopScanning}
                className="bg-brand-terra text-brand-white hover:bg-brand-terra/80 px-6 py-3 rounded-xl shadow-hard touch-target transition-all duration-150"
              >
                <CameraOff className="w-5 h-5 mr-2" strokeWidth={2.5} />
                DETENER SCANNER
              </Button>
            )}

            {/* Botón para cambiar cámara */}
            {cameraDevices.length > 1 && (
              <Button
                onClick={() => {
                  const currentIndex = cameraDevices.findIndex(d => d.deviceId === selectedCamera);
                  const nextCamera = cameraDevices[(currentIndex + 1) % cameraDevices.length];
                  switchCamera(nextCamera.deviceId);
                }}
                disabled={!isScanning}
                className="btn-secondary px-4 py-3 touch-target"
                title="Cambiar cámara (frontal/trasera)"
              >
                <RotateCcw className="w-5 h-5" strokeWidth={2.5} />
              </Button>
            )}
          </div>

          {onClose && (
            <Button
              onClick={onClose}
              className="bg-brand-steel text-brand-black hover:bg-brand-steel/80 px-6 py-3 rounded-xl shadow-hard touch-target transition-all duration-150"
            >
              CERRAR
            </Button>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="bg-brand-terra/20 border border-brand-terra rounded-xl shadow-hard mt-4">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-brand-terra flex-shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <h4 className="text-brand-white font-semibold mb-1">Error del Scanner</h4>
                <p className="text-brand-steel text-sm mb-3">{error}</p>
                <Button
                  onClick={retryScanning}
                  className="bg-brand-terra text-brand-white hover:bg-brand-terra/80 px-4 py-2 rounded-lg text-sm"
                >
                  REINTENTAR
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instrucciones de Uso */}
      <Card className="bg-brand-black/30 border border-brand-yellow/30 rounded-xl shadow-hard mt-4">
        <CardContent className="p-4">
          <div className="text-center">
            <h4 className="text-brand-yellow font-semibold mb-2 flex items-center justify-center gap-2">
              <Target className="w-4 h-4" />
              INSTRUCCIONES DE ESCANEO TINACOM
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-brand-steel text-sm">
              <div className="flex items-center gap-2">
                <span className="bg-brand-yellow text-brand-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Coloca el código QR dentro del marco</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-brand-yellow text-brand-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Mantén el dispositivo estable</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-brand-yellow text-brand-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Espera la detección automática</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};