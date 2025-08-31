# Tinacom Catalog App

Aplicación de catálogo interactivo para tinacos Tinacom, desarrollada con Next.js 15 y siguiendo los principios de AXIS6 y SAAS toolkit.

## 🚀 Características

- **Catálogo Interactivo**: Navegación intuitiva por productos de tinacos
- **Búsqueda Inteligente**: Filtrado por capacidad y modelo
- **Diseño Mobile-First**: Optimizado para dispositivos móviles con safe areas
- **QR Scanner**: Funcionalidad para escanear códigos de tinacos
- **Asesor Inteligente**: Calculadora de capacidad ideal
- **Guías de Instalación**: Descarga de manuales técnicos
- **Soporte & Garantías**: Sistema de registro y reclamos

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15.4.7 con React 19
- **Styling**: Tailwind CSS con componentes personalizados
- **Componentes**: shadcn/ui customizados
- **Iconos**: Lucide React
- **TypeScript**: Configuración estricta
- **Puerto**: 6789 (siguiendo estándares AXIS6)

## 🏃‍♂️ Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:6789
```

## 📱 Características Mobile

- **Touch Targets**: Mínimo 44px para accesibilidad
- **Safe Areas**: Soporte para dispositivos con notch
- **Responsive Design**: Adaptación automática a diferentes tamaños
- **Performance**: Optimizado para conexiones móviles

## 🎨 Branding Tinacom

- **Color Principal**: Amarillo (#FBBF24)
- **Color Secundario**: Negro (#000000)
- **Logo**: Componente personalizado TinacomLogo
- **Tipografía**: Inter con pesos optimizados

## 📂 Estructura del Proyecto

```
src/
├── app/                 # App Router (Next.js 15)
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página de inicio
├── components/         
│   ├── ui/             # Componentes base (shadcn/ui)
│   └── TinacomCatalogApp.tsx  # Componente principal
├── lib/
│   └── utils.ts        # Utilidades (cn function)
└── styles/
    └── globals.css     # Estilos globales con variables CSS
```

## 🚀 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo en puerto 6789
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linting con ESLint
- `npm run type-check` - Verificación de tipos TypeScript

## 🔧 Configuración

El proyecto sigue las mejores prácticas de AXIS6:
- Port 6789 para desarrollo
- TypeScript estricto
- Tailwind con variables CSS personalizadas
- Componentes accesibles y mobile-first
- Safe areas para dispositivos modernos

## 📄 Licencia

© 2024 Tinacom. Todos los derechos reservados.