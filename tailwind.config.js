/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Tinacom Brand Colors
        brand: {
          yellow: '#EEBF03',
          black: '#0B0B0C',
          graphite: '#2B2B2B',
          steel: '#BFC5CC',
          white: '#FFFFFF',
          blue: '#45B9E8',
          terra: '#6B3B28'
        },
        // Legacy shadcn/ui colors for compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "16px", // Tinacom standard
      },
      boxShadow: {
        hard: '0 8px 20px rgba(0,0,0,0.32)', // Tinacom industrial shadow
      },
      fontFamily: {
        'sans': ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        'display': ['var(--font-display)', 'Archivo Black', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'safe': 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
      minHeight: {
        '44': '44px',  // Touch target minimum
      },
      minWidth: {
        '44': '44px',  // Touch target minimum
      }
    },
  },
  plugins: [],
}