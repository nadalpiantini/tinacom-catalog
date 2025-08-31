import TinacomCatalogApp from '@/components/TinacomCatalogApp'
import { generateMetadata as generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Tinacom - Soluciones de Almacenamiento de Agua',
  description: 'Catálogo interactivo de tinacos Tinacom. Encuentra el tinaco perfecto para tu hogar o negocio con nuestra herramienta de escaneo QR.',
})

export default function Home() {
  return <TinacomCatalogApp />
}