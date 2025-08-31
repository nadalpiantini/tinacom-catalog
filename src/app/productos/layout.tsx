import { generateMetadata as generatePageMetadata, generateBreadcrumbStructuredData } from '@/lib/metadata'
import { Metadata } from 'next'

export const metadata: Metadata = generatePageMetadata({
  title: 'Catálogo de Productos - Tinacos para Todo Uso',
  description: 'Explora nuestra amplia gama de tinacos residenciales, comerciales e industriales. Desde 450L hasta 10,000L. Encuentra el tinaco perfecto para tus necesidades.',
  path: '/productos',
})

const breadcrumbStructuredData = generateBreadcrumbStructuredData([
  { name: 'Inicio', url: '/' },
  { name: 'Productos', url: '/productos' }
])

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      {children}
    </>
  )
}