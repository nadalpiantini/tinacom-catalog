import type { Metadata } from 'next'
import { Inter, Archivo_Black } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans'
})

const archivoBlack = Archivo_Black({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display'
})

export const metadata: Metadata = {
  title: 'Tinacom - Soluciones de Almacenamiento de Agua',
  description: 'Catálogo interactivo de tinacos Tinacom. Encuentra el tinaco perfecto para tu hogar o negocio.',
  keywords: 'tinacos, agua, almacenamiento, residencial, comercial, industrial',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FBBF24',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body 
        className={`${inter.variable} ${archivoBlack.variable} font-sans`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  )
}