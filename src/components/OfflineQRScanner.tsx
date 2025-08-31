"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useOfflineQRScanner } from '@/hooks/useOfflineQRScanner';
import { 
  Camera, 
  CameraOff, 
  RotateCcw, 
  AlertCircle, 
  Loader2, 
  Target,
  Smartphone,
  WifiOff,
  Database,
  RefreshCw,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface OfflineQRScannerProps {
  onScan: (result: string) => void;
  onClose?: () => void;
  className?: string;
}

export const OfflineQRScanner: React.FC<OfflineQRScannerProps> = ({
  onScan,
  onClose,
  className = ''
}) => {
  const scannerIdRef = useRef(`qr-scanner-offline-${Math.random().toString(36).substr(2, 9)}`);
  
  const qrConfig = {
    fps: 6, // Reducido para mejor performance offline
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
    isOffline,
    cachedScans,
    startScanning,
    stopScanning,
    getCameraDevices,
    syncCachedScans,
    isMobile
  } = useOfflineQRScanner(onScan, undefined, qrConfig);

  const [showCacheDetails, setShowCacheDetails] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');

  // Configurar ID del elemento
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.id = scannerIdRef.current;
    }
  }, []);

  // Auto-sync cuando vuelve la conexión
  useEffect(() => {
    if (!isOffline && cachedScans.some(scan => !scan.synced)) {
      handleSync();
    }
  }, [isOffline, cachedScans]);

  // Manejar sincronización
  const handleSync = async () => {
    setSyncStatus('syncing');
    try {
      await syncCachedScans();
      setSyncStatus('synced');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
      console.error('Sync error:', error);
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  // Estadísticas de cache
  const unsyncedCount = cachedScans.filter(scan => !scan.synced).length;
  const totalScans = cachedScans.length;

  return (
    <div className={`bg-brand-black rounded-xl p-4 ${className}`}>
      {/* Status Bar - Offline/Online indicator */}
      <div className="flex items-center justify-between mb-4 p-3 bg-brand-graphite rounded-lg border border-brand-yellow/30">
        <div className="flex items-center gap-2">
          {isOffline ? (
            <WifiOff className="w-4 h-4 text-red-400" />
          ) : (
            <div className="w-4 h-4 rounded-full bg-green-400"></div>
          )}
          <span className="text-sm text-brand-white font-medium">
            {isOffline ? 'Modo Offline' : 'Conectado'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Cache status */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCacheDetails(!showCacheDetails)}
            className="h-8 px-2 border-brand-yellow/30 text-brand-white hover:bg-brand-yellow/10"
          >
            <Database className="w-3 h-3 mr-1" />
            {totalScans}
          </Button>

          {/* Sync button */}
          {unsyncedCount > 0 && !isOffline && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSync}
              disabled={syncStatus === 'syncing'}
              className="h-8 px-2 border-brand-yellow/30 text-brand-white hover:bg-brand-yellow/10"
            >
              {syncStatus === 'syncing' ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <RefreshCw className="w-3 h-3" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Cache details */}
      {showCacheDetails && (
        <Card className="mb-4 bg-brand-graphite border-brand-yellow/30">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-brand-white">Cache Local</h3>
              <span className="text-xs text-brand-steel">{totalScans} escaneos</span>
            </div>
            
            {unsyncedCount > 0 && (
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-3 h-3 text-amber-400" />
                <span className="text-xs text-amber-400">
                  {unsyncedCount} escaneos pendientes de sincronizar
                </span>
              </div>
            )}

            <div className="space-y-1 max-h-24 overflow-y-auto">
              {cachedScans.slice(0, 5).map((scan) => (
                <div key={scan.id} className="flex items-center justify-between text-xs">
                  <span className="text-brand-steel truncate max-w-32">
                    {scan.data}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-brand-steel" />
                    <span className="text-brand-steel">
                      {new Date(scan.timestamp).toLocaleTimeString()}
                    </span>
                    {!scan.synced && (
                      <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {totalScans > 5 && (
              <div className="text-xs text-brand-steel mt-2">
                Y {totalScans - 5} más...
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Offline Notice */}
      {isOffline && (
        <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <WifiOff className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">Modo Offline Activo</span>
          </div>
          <p className="text-xs text-amber-300">
            Los escaneos se guardarán localmente y se sincronizarán automáticamente cuando vuelva la conexión.
          </p>
        </div>
      )}

      {/* Scanner Element */}
      <div className="relative">
        <div
          ref={elementRef}
          id={scannerIdRef.current}
          className="w-full rounded-lg overflow-hidden bg-brand-graphite min-h-[320px] flex items-center justify-center"
        />
        
        {/* Scanning overlay */}
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <div className="w-64 h-64 border-2 border-brand-yellow rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Target className="w-8 h-8 text-brand-yellow animate-pulse" />
              </div>
            </div>
          </div>
        )}
        
        {/* Loading state */}
        {isInitializing && (
          <div className="absolute inset-0 bg-brand-black/80 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-brand-yellow animate-spin mx-auto mb-2" />
              <p className="text-brand-white text-sm">
                {isOffline ? 'Preparando modo offline...' : 'Inicializando cámara...'}
              </p>
            </div>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="absolute inset-0 bg-brand-black/90 flex items-center justify-center">
            <div className="text-center p-4">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <p className="text-red-400 text-sm mb-3">{error}</p>
              <Button
                onClick={() => startScanning()}
                className="btn-primary"
                size="sm"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reintentar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-4">
        {!isScanning && !isInitializing && (
          <Button
            onClick={() => startScanning()}
            className="btn-primary flex-1"
            disabled={isOffline}
          >
            <Camera className="w-4 h-4 mr-2" />
            {isOffline ? 'Sin conexión' : 'Iniciar Escáner'}
          </Button>
        )}
        
        {isScanning && (
          <Button
            onClick={stopScanning}
            variant="outline"
            className="btn-secondary flex-1"
          >
            <CameraOff className="w-4 h-4 mr-2" />
            Detener
          </Button>
        )}
        
        {onClose && (
          <Button
            onClick={onClose}
            variant="outline"
            className="px-4"
          >
            Cerrar
          </Button>
        )}
      </div>

      {/* Mobile tips */}
      {isMobile() && (
        <div className="mt-4 p-3 bg-brand-graphite/50 rounded-lg border border-brand-yellow/20">
          <div className="flex items-start gap-2">
            <Smartphone className="w-4 h-4 text-brand-yellow mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-brand-white font-medium mb-1">Consejos para móvil:</p>
              <ul className="text-xs text-brand-steel space-y-1">
                <li>• Mantén el código QR centrado en el recuadro</li>
                <li>• Asegúrate de tener buena iluminación</li>
                <li>• Los escaneos funcionan sin conexión</li>
                {isOffline && <li>• Se sincronizarán automáticamente al conectarse</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};