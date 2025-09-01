import type { Metadata } from 'next'

// Multi-domain configuration
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://tinacom.sujeto10.com';
};

export const siteConfig = {
  name: 'Tinacom',
  description: 'Catálogo interactivo de tinacos Tinacom. Encuentra el tinaco perfecto para tu hogar o negocio.',
  url: getBaseUrl(),
  domains: [
    'https://tinacom.sujeto10.com',
    'https://tinacom.empleaido.com'
  ],
  ogImage: '/items/tinacom-logo.svg',
  links: {
    twitter: 'https://twitter.com/tinacom',
    facebook: 'https://facebook.com/tinacom',
    instagram: 'https://instagram.com/tinacom',
  }
}

export function generateMetadata({
  title,
  description,
  image,
  path = '',
  noIndex = false,
}: {
  title: string
  description?: string
  image?: string
  path?: string
  noIndex?: boolean
}): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image || siteConfig.ogImage
  
  return {
    title: title.includes('Tinacom') ? title : `${title} | Tinacom`,
    description: description || siteConfig.description,
    
    // Open Graph
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url,
      title,
      description: description || siteConfig.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || siteConfig.description,
      images: [ogImage],
    },
    
    // Robots
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Additional meta tags
    keywords: [
      'tinacos',
      'almacenamiento agua',
      'tanques agua',
      'tinacos residenciales',
      'tinacos comerciales',
      'cisterna',
      'depósito agua',
      'Tinacom',
    ],
    
    authors: [{ name: 'Tinacom' }],
    creator: 'Tinacom',
    publisher: 'Tinacom',
    
    // Canonical URL
    alternates: {
      canonical: url,
    },
    
    // App specific
    applicationName: 'Tinacom Catálogo',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Tinacom',
    },
    
    // Verification tags (to be configured)
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      other: {
        'facebook-domain-verification': process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION || '',
      },
    },
  }
}

// Product structured data generator
export function generateProductStructuredData(product: {
  id: string
  name: string
  description: string
  image: string
  capacity: string
  category: string
  price?: number
  availability?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${siteConfig.url}/producto/${product.id}`,
    name: product.name,
    description: product.description,
    image: `${siteConfig.url}${product.image}`,
    brand: {
      '@type': 'Brand',
      name: 'Tinacom'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Tinacom',
      url: siteConfig.url
    },
    category: product.category,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Capacidad',
        value: product.capacity
      }
    ],
    ...(product.price && {
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'MXN',
        availability: `https://schema.org/${product.availability || 'InStock'}`,
        seller: {
          '@type': 'Organization',
          name: 'Tinacom'
        }
      }
    })
  }
}

// Organization structured data
export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tinacom',
  url: siteConfig.url,
  logo: `${siteConfig.url}/items/tinacom-logo.svg`,
  description: siteConfig.description,
  foundingDate: '2000',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MX',
    addressLocality: 'México'
  },
  sameAs: [
    siteConfig.links.facebook,
    siteConfig.links.twitter,
    siteConfig.links.instagram,
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Catálogo de Tinacos',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Tinacos Residenciales',
        url: `${siteConfig.url}/productos/residencial`
      },
      {
        '@type': 'OfferCatalog', 
        name: 'Tinacos Comerciales',
        url: `${siteConfig.url}/productos/comercial`
      },
      {
        '@type': 'OfferCatalog',
        name: 'Accesorios',
        url: `${siteConfig.url}/productos/accesorios`
      }
    ]
  }
}

// Website structured data
export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: 'es-ES',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/productos?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
}

// Breadcrumb generator
export function generateBreadcrumbStructuredData(items: Array<{
  name: string
  url: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`
    }))
  }
}