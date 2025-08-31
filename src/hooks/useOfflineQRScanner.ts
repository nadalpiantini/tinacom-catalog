"use client";

import { useRef, useCallback, useEffect, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType, Html5QrcodeResult, Html5Qrcode } from 'html5-qrcode';

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
  cameraDevices: any[];
  selectedCamera: string | null;
  isInitializing: boolean;
  isOffline: boolean;
  cachedScans: QRScanResult[];
}

interface QRScanResult {
  id: string;
  data: string;
  timestamp: number;
  productInfo?: {
    id: string;
    name: string;
    capacity: string;
    category: string;
    image: string;
  };
  synced: boolean;
}

const CACHE_KEY = 'tinacom_qr_scans';
const MAX_CACHE_SIZE = 100;

export const useOfflineQRScanner = (
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
    isInitializing: false,
    isOffline: false,
    cachedScans: []
  });

  // Configuración optimizada para móviles Tinacom con offline support
  const defaultConfig = {
    fps: 6, // Reducido para mejor performance offline
    qrbox: { width: 280, height: 280 },
    aspectRatio: 1.0,
    disableFlip: false,
    verbose: process.env.NODE_ENV === 'development',
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    ...config
  };

  // Detectar estado offline/online
  useEffect(() => {
    const updateOnlineStatus = () => {
      setState(prev => ({ ...prev, isOffline: !navigator.onLine }));
    };

    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // Cargar cache al inicializar
  useEffect(() => {
    loadCachedScans();
  }, []);

  // Guardar en cache local
  const saveToCache = useCallback(async (scanResult: QRScanResult) => {
    try {
      const existingCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
      const updatedCache = [scanResult, ...existingCache.slice(0, MAX_CACHE_SIZE - 1)];
      localStorage.setItem(CACHE_KEY, JSON.stringify(updatedCache));
      
      setState(prev => ({ ...prev, cachedScans: updatedCache }));

      // Si hay conexión, intentar sincronizar
      if (navigator.onLine) {
        await syncCachedScans();
      }

      // Registrar en service worker para sync en background
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        // Background sync if supported
        if ('sync' in registration) {
          await (registration as any).sync.register('qr-scan-sync');
        }
      }
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }, []);

  // Cargar cache desde localStorage
  const loadCachedScans = useCallback(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
      setState(prev => ({ ...prev, cachedScans: cached }));
    } catch (error) {
      console.error('Error loading cache:', error);
    }
  }, []);

  // Sincronizar scans en caché cuando vuelva la conexión
  const syncCachedScans = useCallback(async () => {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
      const unsyncedScans = cached.filter((scan: QRScanResult) => !scan.synced);
      
      if (unsyncedScans.length === 0) return;

      // Aquí se enviarían a un backend o servicio de analytics
      // Por ahora solo marcamos como sincronizados
      const syncedCache = cached.map((scan: QRScanResult) => ({ ...scan, synced: true }));
      localStorage.setItem(CACHE_KEY, JSON.stringify(syncedCache));
      setState(prev => ({ ...prev, cachedScans: syncedCache }));
      
      console.log(`Synced ${unsyncedScans.length} QR scans`);
    } catch (error) {
      console.error('Error syncing cache:', error);
    }
  }, []);

  // Detectar si es dispositivo móvil
  const isMobile = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }, []);

  // Obtener información del producto desde cache o red
  const getProductInfo = useCallback(async (qrData: string) => {
    // Primero buscar en cache
    const cached = state.cachedScans.find(scan => scan.data === qrData);
    if (cached && cached.productInfo) {
      return cached.productInfo;
    }

    // Si no está en cache y hay conexión, buscar online
    if (navigator.onLine) {
      try {
        // Aquí iría una llamada a API real
        // Por ahora usamos datos mock
        const mockProductInfo = {
          id: qrData,
          name: `Tinaco ${qrData}`,
          capacity: '1500L',
          category: 'residencial',
          image: '/items/0001015240.webp'
        };
        return mockProductInfo;
      } catch (error) {
        console.error('Error fetching product info:', error);
        return null;
      }
    }

    // Offline: devolver información básica
    return {
      id: qrData,
      name: `Producto ${qrData}`,
      capacity: 'Desconocida',
      category: 'offline',
      image: '/items/tinacom-logo.svg'
    };
  }, [state.cachedScans]);

  // Handler de éxito mejorado con cache
  const handleScanSuccess = useCallback(async (
    decodedText: string,
    result: Html5QrcodeResult
  ) => {
    const scanResult: QRScanResult = {
      id: `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      data: decodedText,
      timestamp: Date.now(),
      synced: navigator.onLine,
    };

    // Obtener información del producto
    try {
      const productInfo = await getProductInfo(decodedText);
      scanResult.productInfo = productInfo || undefined;
    } catch (error) {
      console.error('Error getting product info:', error);
    }

    // Guardar en cache
    await saveToCache(scanResult);

    // Llamar callback original
    onScanSuccess(decodedText);

    // Mostrar notificación si está offline
    if (!navigator.onLine) {
      showOfflineNotification();
    }
  }, [onScanSuccess, getProductInfo, saveToCache]);

  // Mostrar notificación de modo offline
  const showOfflineNotification = useCallback(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Escaneo guardado sin conexión', {
        body: 'El resultado se sincronizará cuando vuelva la conexión.',
        icon: '/icons/icon-192x192.png',
        tag: 'offline-scan'
      });
    }
  }, []);

  // Obtener dispositivos de cámara con fallback offline
  const getCameraDevices = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isInitializing: true }));
      
      if (!navigator.onLine) {
        throw new Error('Sin conexión: no se pueden detectar cámaras');
      }

      const devices = await Html5Qrcode.getCameras();
      
      // Priorizar cámara trasera para escaneo QR
      const backCamera = devices.find((d: any) => 
        d.label?.toLowerCase().includes('back') || 
        d.label?.toLowerCase().includes('rear') ||
        d.label?.toLowerCase().includes('environment')
      );
      
      setState(prev => ({ 
        ...prev, 
        cameraDevices: devices,
        selectedCamera: backCamera ? backCamera.id : (devices[0]?.id || null),
        isInitializing: false 
      }));
      
      return devices;
    } catch (error) {
      const errorMessage = state.isOffline 
        ? 'Modo offline: funcionalidad de cámara limitada'
        : `Error detectando cámaras: ${error instanceof Error ? error.message : 'Error desconocido'}`;
      
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        isInitializing: false 
      }));
      onScanError?.(errorMessage);
      return [];
    }
  }, [onScanError, state.isOffline]);

  // Iniciar escaneo con soporte offline
  const startScanning = useCallback(async (elementId?: string) => {
    if (!elementRef.current) return;

    try {
      setState(prev => ({ ...prev, isScanning: true, error: null }));

      // Si está offline, mostrar mensaje informativo
      if (!navigator.onLine) {
        setState(prev => ({ 
          ...prev, 
          error: 'Modo offline: el escáner funcionará con capacidad limitada',
          isScanning: false 
        }));
        return;
      }

      await getCameraDevices();
      
      const scanner = new Html5QrcodeScanner(
        elementRef.current.id || 'qr-scanner-tinacom',
        {
          ...defaultConfig,
          ...(state.selectedCamera && { 
            cameraIdOrConfig: { deviceId: { exact: state.selectedCamera } }
          })
        },
        false
      );
      
      scannerRef.current = scanner;
      
      scanner.render(handleScanSuccess, (error) => {
        if (!error.includes('QR code not found')) {
          onScanError?.(error);
          setState(prev => ({ ...prev, error }));
        }
      });
      
      setState(prev => ({ ...prev, hasPermission: true }));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setState(prev => ({ ...prev, error: errorMessage, isScanning: false }));
      onScanError?.(errorMessage);
    }
  }, [handleScanSuccess, onScanError, getCameraDevices, defaultConfig, state.selectedCamera]);

  // Limpiar cache antiguo (solo scans de más de 30 días)
  const cleanupCache = useCallback(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      const cleanedCache = cached.filter((scan: QRScanResult) => scan.timestamp > thirtyDaysAgo);
      
      localStorage.setItem(CACHE_KEY, JSON.stringify(cleanedCache));
      setState(prev => ({ ...prev, cachedScans: cleanedCache }));
    } catch (error) {
      console.error('Error cleaning cache:', error);
    }
  }, []);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
      cleanupCache();
    };
  }, [cleanupCache]);

  return {
    elementRef,
    ...state,
    isMobile,
    startScanning,
    getCameraDevices,
    syncCachedScans,
    cleanupCache,
    stopScanning: useCallback(() => {
      if (scannerRef.current) {
        scannerRef.current.clear().then(() => {
          setState(prev => ({ ...prev, isScanning: false }));
        }).catch(console.error);
      }
    }, [])
  };
};