"use client";

import React, { useEffect, useRef } from 'react';
import { QRScanner } from './QRScanner';
import { X, QrCode, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (result: string) => void;
  title?: string;
}

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

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onScan,
  title = 'Escaner QR Tinacom'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Manejo de escape key y enfoque
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      // Guardar el elemento que tenía focus antes del modal
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';
      
      // Enfocar el modal después de que se renderice
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      
      // Restaurar focus al elemento anterior
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  // Manejo de click en backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/90"
      onClick={handleBackdropClick}
      style={{
        padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-scanner-title"
      tabIndex={-1}
    >
      <div className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <Card className="bg-brand-graphite border-2 border-brand-yellow rounded-xl shadow-hard">
          {/* Header Industrial del Modal */}
          <div className="bg-gradient-to-r from-brand-yellow to-brand-yellow/90 p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-brand-black p-3 rounded-xl">
                  <QrCode className="w-8 h-8 text-brand-yellow" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 
                    id="qr-scanner-title"
                    className="text-2xl font-bold text-brand-black"
                  >
                    {title.toUpperCase()}
                  </h2>
                  <p className="text-brand-black/80">
                    Escanea el código QR de tu tinaco para ver detalles completos
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <TinacomLogo className="w-12 h-12" />
                <Button
                  onClick={onClose}
                  className="bg-brand-black text-brand-yellow hover:bg-brand-black/80 p-3 rounded-xl shadow-hard touch-target transition-all duration-150"
                  aria-label="Cerrar scanner"
                >
                  <X className="w-6 h-6" strokeWidth={2.5} />
                </Button>
              </div>
            </div>
          </div>

          {/* Contenido del Scanner */}
          <CardContent className="p-6">
            <QRScanner
              onScan={(result) => {
                onScan(result);
                onClose(); // Auto-cerrar después de escanear exitosamente
              }}
              className="w-full"
            />
          </CardContent>

          {/* Footer Informativo */}
          <div className="bg-brand-black/30 p-4 rounded-b-xl border-t border-brand-yellow/30">
            <div className="flex items-center justify-center gap-6 text-brand-steel text-sm">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-brand-yellow" />
                <span>Códigos QR Tinacom compatibles</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-brand-steel/30"></div>
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-brand-yellow" />
                <span>Detección automática rápida</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-brand-steel/30"></div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Seguro y privado</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Atajos de Teclado - Solo visible en desktop */}
        <div className="hidden md:block absolute -bottom-16 left-0 right-0">
          <div className="bg-brand-black/80 border border-brand-yellow/30 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-6 text-brand-steel text-xs">
              <div className="flex items-center gap-2">
                <kbd className="bg-brand-graphite border border-brand-steel/30 px-2 py-1 rounded text-xs">ESC</kbd>
                <span>Cerrar scanner</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="bg-brand-graphite border border-brand-steel/30 px-2 py-1 rounded text-xs">SPACE</kbd>
                <span>Iniciar/Detener</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hook personalizado para manejar el modal QR Scanner
export const useQRScannerModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
    QRScannerModal: (props: Omit<QRScannerModalProps, 'isOpen' | 'onClose'>) => (
      <QRScannerModal
        {...props}
        isOpen={isOpen}
        onClose={closeModal}
      />
    )
  };
};