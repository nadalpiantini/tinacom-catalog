/**
 * Sistema de mapeo QR Code → Productos Tinacom
 * Maneja códigos QR de tinacos y los convierte a rutas de productos válidas
 */

export interface ProductMapping {
  productId: string;
  name: string;
  capacity: string;
  category: 'residencial' | 'comercial';
  route: string;
}

// Base de datos de códigos QR → Productos Tinacom
const QR_PRODUCT_DATABASE: Record<string, ProductMapping> = {
  // Códigos QR para línea residencial
  'TINACOM-450L-001': {
    productId: 'tinaco-450l',
    name: 'Tinaco 450L',
    capacity: '450 litros',
    category: 'residencial',
    route: '/producto/tinaco-450l'
  },
  'TINACOM-450L-002': {
    productId: 'tinaco-450l',
    name: 'Tinaco 450L',
    capacity: '450 litros', 
    category: 'residencial',
    route: '/producto/tinaco-450l'
  },
  'TINACOM-750L-001': {
    productId: 'tinaco-750l',
    name: 'Tinaco 750L',
    capacity: '750 litros',
    category: 'residencial',
    route: '/producto/tinaco-750l'
  },
  'TINACOM-750L-002': {
    productId: 'tinaco-750l',
    name: 'Tinaco 750L',
    capacity: '750 litros',
    category: 'residencial', 
    route: '/producto/tinaco-750l'
  },
  'TINACOM-1100L-001': {
    productId: 'tinaco-1100l',
    name: 'Tinaco 1100L',
    capacity: '1,100 litros',
    category: 'residencial',
    route: '/producto/tinaco-1100l'
  },
  'TINACOM-1100L-002': {
    productId: 'tinaco-1100l',
    name: 'Tinaco 1100L', 
    capacity: '1,100 litros',
    category: 'residencial',
    route: '/producto/tinaco-1100l'
  },

  // Códigos QR para línea comercial
  'TINACOM-2500L-001': {
    productId: 'tinaco-2500l',
    name: 'Tinaco 2500L',
    capacity: '2,500 litros',
    category: 'comercial',
    route: '/producto/tinaco-2500l'
  },
  'TINACOM-2500L-002': {
    productId: 'tinaco-2500l',
    name: 'Tinaco 2500L',
    capacity: '2,500 litros',
    category: 'comercial',
    route: '/producto/tinaco-2500l'
  },
  'TINACOM-5000L-001': {
    productId: 'tinaco-5000l', 
    name: 'Tinaco 5000L',
    capacity: '5,000 litros',
    category: 'comercial',
    route: '/producto/tinaco-5000l'
  },
  'TINACOM-5000L-002': {
    productId: 'tinaco-5000l',
    name: 'Tinaco 5000L',
    capacity: '5,000 litros',
    category: 'comercial',
    route: '/producto/tinaco-5000l'
  },
  'TINACOM-10000L-001': {
    productId: 'tinaco-10000l',
    name: 'Tinaco 10000L', 
    capacity: '10,000 litros',
    category: 'comercial',
    route: '/producto/tinaco-10000l'
  },
  'TINACOM-10000L-002': {
    productId: 'tinaco-10000l',
    name: 'Tinaco 10000L',
    capacity: '10,000 litros',
    category: 'comercial', 
    route: '/producto/tinaco-10000l'
  },

  // Códigos QR alternativos (formatos legacy o terceros)
  'TIN-450': {
    productId: 'tinaco-450l',
    name: 'Tinaco 450L',
    capacity: '450 litros',
    category: 'residencial',
    route: '/producto/tinaco-450l'
  },
  'TIN-750': {
    productId: 'tinaco-750l',
    name: 'Tinaco 750L', 
    capacity: '750 litros',
    category: 'residencial',
    route: '/producto/tinaco-750l'
  },
  'TIN-1100': {
    productId: 'tinaco-1100l',
    name: 'Tinaco 1100L',
    capacity: '1,100 litros',
    category: 'residencial',
    route: '/producto/tinaco-1100l'
  },
  'TIN-2500': {
    productId: 'tinaco-2500l',
    name: 'Tinaco 2500L',
    capacity: '2,500 litros',
    category: 'comercial',
    route: '/producto/tinaco-2500l'
  },
  'TIN-5000': {
    productId: 'tinaco-5000l',
    name: 'Tinaco 5000L',
    capacity: '5,000 litros', 
    category: 'comercial',
    route: '/producto/tinaco-5000l'
  },
  'TIN-10000': {
    productId: 'tinaco-10000l',
    name: 'Tinaco 10000L',
    capacity: '10,000 litros',
    category: 'comercial',
    route: '/producto/tinaco-10000l'
  }
};

// Patrones regex para detectar códigos QR de diferentes formatos
const QR_PATTERNS = [
  // Formato oficial Tinacom: TINACOM-{CAPACITY}L-{VERSION}
  /^TINACOM-(\d+)L-(\d+)$/i,
  
  // Formato corto: TIN-{CAPACITY}
  /^TIN-(\d+)$/i,
  
  // Formato con URL: https://tinacom.com/producto/{id}
  /^https?:\/\/(?:www\.)?tinacom\.com\/producto\/(.+)$/i,
  
  // Formato solo capacidad: {CAPACITY}L
  /^(\d+)L?$/i,
  
  // Formato JSON: {"product": "tinaco-{capacity}l"}
  /^\{.*"product":\s*"([^"]+)".*\}$/i
];

/**
 * Mapea un código QR escaneado a información del producto
 */
export const mapQRCodeToProduct = (qrCode: string): ProductMapping | null => {
  if (!qrCode || typeof qrCode !== 'string') {
    return null;
  }

  // Limpiar el código QR
  const cleanCode = qrCode.trim();

  // 1. Búsqueda directa en la base de datos
  const directMatch = QR_PRODUCT_DATABASE[cleanCode.toUpperCase()];
  if (directMatch) {
    return directMatch;
  }

  // 2. Intentar extraer información usando patrones regex
  for (const pattern of QR_PATTERNS) {
    const match = cleanCode.match(pattern);
    if (match) {
      const extractedInfo = extractProductFromMatch(match, pattern);
      if (extractedInfo) {
        return extractedInfo;
      }
    }
  }

  // 3. Búsqueda fuzzy (similitud de strings)
  const fuzzyMatch = findFuzzyMatch(cleanCode);
  if (fuzzyMatch) {
    return fuzzyMatch;
  }

  return null;
};

/**
 * Extrae información del producto desde un match regex
 */
function extractProductFromMatch(match: RegExpMatchArray, pattern: RegExp): ProductMapping | null {
  const patternStr = pattern.toString();

  // Patrón oficial Tinacom
  if (patternStr.includes('TINACOM')) {
    const capacity = match[1];
    const productKey = `TINACOM-${capacity}L-001`;
    return QR_PRODUCT_DATABASE[productKey] || null;
  }

  // Patrón corto TIN-
  if (patternStr.includes('TIN')) {
    const capacity = match[1]; 
    const productKey = `TIN-${capacity}`;
    return QR_PRODUCT_DATABASE[productKey] || null;
  }

  // Patrón URL
  if (patternStr.includes('tinacom.com')) {
    const productId = match[1];
    // Buscar en la base de datos por productId
    for (const product of Object.values(QR_PRODUCT_DATABASE)) {
      if (product.productId === productId) {
        return product;
      }
    }
  }

  // Patrón solo capacidad
  if (patternStr.includes('\\d+')) {
    const capacity = match[1];
    // Mapear capacidad a producto
    const productMapping = mapCapacityToProduct(parseInt(capacity));
    return productMapping;
  }

  // Patrón JSON
  if (patternStr.includes('product')) {
    const productId = match[1];
    for (const product of Object.values(QR_PRODUCT_DATABASE)) {
      if (product.productId === productId) {
        return product;
      }
    }
  }

  return null;
}

/**
 * Mapea una capacidad numérica a un producto
 */
function mapCapacityToProduct(capacity: number): ProductMapping | null {
  const capacityMappings: Record<number, string> = {
    450: 'TIN-450',
    750: 'TIN-750', 
    1100: 'TIN-1100',
    2500: 'TIN-2500',
    5000: 'TIN-5000',
    10000: 'TIN-10000'
  };

  const productKey = capacityMappings[capacity];
  return productKey ? QR_PRODUCT_DATABASE[productKey] : null;
}

/**
 * Búsqueda fuzzy para códigos QR similares pero no exactos
 */
function findFuzzyMatch(qrCode: string): ProductMapping | null {
  const code = qrCode.toLowerCase();
  
  // Buscar coincidencias parciales
  for (const [key, product] of Object.entries(QR_PRODUCT_DATABASE)) {
    const keyLower = key.toLowerCase();
    
    // Coincidencia de capacidad
    if (code.includes(product.capacity.split(' ')[0])) {
      return product;
    }
    
    // Coincidencia de ID de producto  
    if (code.includes(product.productId.replace('tinaco-', ''))) {
      return product;
    }
    
    // Similitud de clave
    if (calculateSimilarity(code, keyLower) > 0.7) {
      return product;
    }
  }
  
  return null;
}

/**
 * Calcula similitud entre dos strings (Levenshtein simplificado)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

/**
 * Distancia de Levenshtein simple
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + substitutionCost
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Valida si un código QR es válido para productos Tinacom
 */
export const isValidTinacomQRCode = (qrCode: string): boolean => {
  return mapQRCodeToProduct(qrCode) !== null;
};

/**
 * Obtiene todos los códigos QR válidos (para testing/debugging)
 */
export const getAllValidQRCodes = (): string[] => {
  return Object.keys(QR_PRODUCT_DATABASE);
};

/**
 * Genera URL de producto desde código QR
 */
export const getProductUrlFromQR = (qrCode: string): string | null => {
  const product = mapQRCodeToProduct(qrCode);
  return product ? product.route : null;
};

/**
 * Obtiene información resumida del producto desde QR
 */
export const getProductSummaryFromQR = (qrCode: string): { 
  success: boolean; 
  product?: ProductMapping; 
  error?: string 
} => {
  try {
    const product = mapQRCodeToProduct(qrCode);
    
    if (!product) {
      return {
        success: false,
        error: 'Código QR no válido o no reconocido como producto Tinacom'
      };
    }
    
    return {
      success: true,
      product
    };
  } catch (error) {
    return {
      success: false,
      error: 'Error al procesar código QR'
    };
  }
};

// Exportar tipos para uso externo - ya está exportado arriba