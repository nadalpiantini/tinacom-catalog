"use client";

import { useRef, useCallback, useEffect, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType, Html5QrcodeResult } from 'html5-qrcode';

interface QRScannerConfig {
  fps?: number;
  qrbox?: { width: number; height: number };
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
}

interface QRScannerState {
  isScanning: boolean;
  error: string | null;
  hasPermission: boolean | null;
  cameraDevices: MediaDeviceInfo[];
  selectedCamera: string | null;
  isInitializing: boolean;
}

export const useQRScanner = (
  onScanSuccess: (result: string) => void,
  onScanError?: (error: string) => void,
  config: QRScannerConfig = {}
) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  
  const [state, setState] = useState<QRScannerState>({
    isScanning: false,
    error: null,
    hasPermission: null,
    cameraDevices: [],
    selectedCamera: null,
    isInitializing: false
  });

  // Configuración optimizada para móviles Tinacom
  const defaultConfig = {
    fps: 8, // Optimizado para batería en dispositivos móviles
    qrbox: { width: 280, height: 280 }, // Tamaño óptimo para códigos Tinacom
    aspectRatio: 1.0, // Cuadrado perfecto para códigos QR
    disableFlip: false, // Permitir espejo para cámara frontal
    verbose: process.env.NODE_ENV === 'development',
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    ...config
  };

  // Detectar si es dispositivo móvil
  const isMobile = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }, []);

  // Estado para tracking de móvil
  const [isMobileState, setIsMobileState] = useState(false);

  // Actualizar estado de móvil después de montaje
  useEffect(() => {
    setIsMobileState(isMobile());
  }, [isMobile]);

  // Obtener dispositivos de cámara disponibles
  const getCameraDevices = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isInitializing: true }));
      const devices = await (Html5QrcodeScanner as any).getCameras();
      
      // Priorizar cámara trasera para escaneo QR
      const backCamera = devices.find((d: MediaDeviceInfo) => 
        d.label.toLowerCase().includes('back') || 
        d.label.toLowerCase().includes('rear') ||
        d.label.toLowerCase().includes('environment')
      );
      
      setState(prev => ({ 
        ...prev, 
        cameraDevices: devices,
        selectedCamera: backCamera?.deviceId || devices[0]?.deviceId,
        isInitializing: false
      }));
      
      return devices;
    } catch (error) {
      console.error('Error al obtener dispositivos de cámara:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'No se pudo acceder a la cámara. Verifica los permisos.',
        isInitializing: false,
        hasPermission: false
      }));
      return [];
    }
  }, []);

  // Iniciar escaneado
  const startScanning = useCallback(async () => {
    if (!elementRef.current || scannerRef.current) return;

    try {
      setState(prev => ({ ...prev, isScanning: true, error: null, isInitializing: true }));

      // Usar configuración optimizada para móviles
      const scannerConfig = isMobileState 
        ? { ...defaultConfig, fps: 6 } // Más conservador en móviles
        : defaultConfig;

      scannerRef.current = new Html5QrcodeScanner(
        elementRef.current.id,
        scannerConfig,
        false
      );

      const onScanSuccessCallback = (decodedText: string, result: Html5QrcodeResult) => {
        console.log('🎯 QR Tinacom escaneado:', decodedText);
        onScanSuccess(decodedText);
        // Auto-detener después de escaneo exitoso
        setTimeout(() => stopScanning(), 500);
      };

      const onScanErrorCallback = (errorMessage: string) => {
        // Filtrar errores normales de escaneo para no spam al usuario
        if (!errorMessage.includes('NotFoundException') && 
            !errorMessage.includes('No MultiFormat Readers')) {
          onScanError?.(errorMessage);
        }
      };

      scannerRef.current.render(onScanSuccessCallback, onScanErrorCallback);
      
      setState(prev => ({ 
        ...prev, 
        hasPermission: true, 
        isInitializing: false 
      }));

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error al iniciar scanner:', error);
      
      setState(prev => ({ 
        ...prev, 
        error: errorMsg.includes('Permission') 
          ? 'Se requiere permiso de cámara para escanear códigos QR'
          : 'Error al inicializar cámara. Intenta recargar la página.', 
        isScanning: false,
        hasPermission: false,
        isInitializing: false
      }));
    }
  }, [onScanSuccess, onScanError, defaultConfig, isMobile]);

  // Detener escaneado
  const stopScanning = useCallback(async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.clear();
        scannerRef.current = null;
      } catch (error) {
        console.warn('Advertencia al limpiar scanner:', error);
      }
    }
    setState(prev => ({ ...prev, isScanning: false }));
  }, []);

  // Cambiar cámara (frontal/trasera)
  const switchCamera = useCallback(async (deviceId: string) => {
    await stopScanning();
    setState(prev => ({ ...prev, selectedCamera: deviceId }));
    // Reiniciar con nueva cámara después de delay
    setTimeout(startScanning, 200);
  }, [stopScanning, startScanning]);

  // Reintentar escaneado
  const retryScanning = useCallback(async () => {
    setState(prev => ({ ...prev, error: null, hasPermission: null }));
    await getCameraDevices();
    setTimeout(startScanning, 100);
  }, [getCameraDevices, startScanning]);

  // Limpiar recursos al desmontar componente
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.warn);
      }
    };
  }, []);

  return {
    elementRef,
    ...state,
    startScanning,
    stopScanning,
    switchCamera,
    retryScanning,
    getCameraDevices,
    isMobile: isMobileState
  };
};