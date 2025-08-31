# Image Optimization Guide

## 🖼️ PWA Icons Required

Generate the following icons from the Tinacom logo:

### Icon Sizes Needed
```
/public/icons/
├── icon-32x32.png       # Browser tab
├── icon-72x72.png       # Android notifications
├── icon-96x96.png       # Android home screen
├── icon-128x128.png     # Chrome Web Store
├── icon-144x144.png     # Windows tiles
├── icon-152x152.png     # iPad home screen
├── icon-180x180.png     # iPhone home screen
├── icon-192x192.png     # Android home screen
├── icon-384x384.png     # Android splash screen
└── icon-512x512.png     # PWA manifest
```

## 🎨 Icon Generation Commands

Using the Tinacom logo as source:

```bash
# Install ImageMagick (if not installed)
brew install imagemagick

# Source logo
SOURCE="/Users/nadalpiantini/Dev/Tinacom/items/Logo-Vector-Tinacom-black-01-e1696042688700 (1).png"

# Generate all PWA icons
convert "$SOURCE" -resize 32x32 public/icons/icon-32x32.png
convert "$SOURCE" -resize 72x72 public/icons/icon-72x72.png
convert "$SOURCE" -resize 96x96 public/icons/icon-96x96.png
convert "$SOURCE" -resize 128x128 public/icons/icon-128x128.png
convert "$SOURCE" -resize 144x144 public/icons/icon-144x144.png
convert "$SOURCE" -resize 152x152 public/icons/icon-152x152.png
convert "$SOURCE" -resize 180x180 public/icons/icon-180x180.png
convert "$SOURCE" -resize 192x192 public/icons/icon-192x192.png
convert "$SOURCE" -resize 384x384 public/icons/icon-384x384.png
convert "$SOURCE" -resize 512x512 public/icons/icon-512x512.png

# Generate with proper background for maskable icons
convert -size 512x512 xc:"#FBBF24" -gravity center \
        \( "$SOURCE" -resize 400x400 \) -composite \
        public/icons/icon-512x512-maskable.png
```

## 📸 Product Image Optimization

Current product images need optimization:

### Existing Images Status
```
items/0001015240.webp                    ✅ Already WebP
items/0001016137.webp                    ✅ Already WebP  
items/Tinacos_20Tinacom_20codigo_2010856.webp  ✅ Already WebP
items/download_4eff6911-0691-408d-aca8-248c607a8530.jpg  ❌ Needs conversion
items/Logo-Vector-Tinacom-black-01-e1696042688700 (1).png  ❌ Needs optimization
items/Tinacom-Indestructible.jpg         ❌ Needs conversion
```

### Image Optimization Commands
```bash
# Convert JPG/PNG to WebP
cwebp -q 85 items/download_4eff6911-0691-408d-aca8-248c607a8530.jpg -o public/items/download_4eff6911-0691-408d-aca8-248c607a8530.webp
cwebp -q 85 items/Tinacom-Indestructible.jpg -o public/items/Tinacom-Indestructible.webp

# Optimize PNG logo
pngquant --quality=65-80 --output public/items/tinacom-logo-optimized.png items/Logo-Vector-Tinacom-black-01-e1696042688700\ \(1\).png

# Generate responsive sizes
for size in 400 600 800 1200; do
    convert public/items/0001015240.webp -resize ${size}x${size}> public/items/0001015240-${size}w.webp
done
```

## 🚀 Next.js Image Component Optimization

Already configured in next.config.js:
- ✅ WebP and AVIF formats enabled
- ✅ Multiple device sizes configured  
- ✅ 7-day caching enabled
- ✅ Image optimization pipeline active

### Usage Examples
```tsx
import Image from 'next/image'

// Optimized product image
<Image
  src="/items/0001015240.webp"
  alt="Tinaco 1500L"
  width={400}
  height={400}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={false} // Only true for above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // Generate with plaiceholder
/>

// Logo with priority loading
<Image
  src="/items/tinacom-logo.svg"
  alt="Tinacom Logo"
  width={240}
  height={240}
  priority={true}
  className="w-full h-full object-contain"
/>
```

## 📊 Performance Metrics

Target optimization results:
- **Image Size Reduction**: 60-80% smaller files
- **Loading Speed**: 40% faster image loading
- **Core Web Vitals**: LCP improvement of 30%
- **Bandwidth Savings**: 70% less data usage

## 🔧 Automation Script

Create a script to automate image optimization:

```bash
#!/bin/bash
# scripts/optimize-images.sh

echo "🖼️  Optimizing Tinacom images..."

# Install dependencies
if ! command -v cwebp &> /dev/null; then
    echo "Installing WebP tools..."
    brew install webp
fi

if ! command -v convert &> /dev/null; then
    echo "Installing ImageMagick..."
    brew install imagemagick
fi

# Generate PWA icons
echo "Generating PWA icons..."
SOURCE_LOGO="items/Logo-Vector-Tinacom-black-01-e1696042688700 (1).png"

sizes=(32 72 96 128 144 152 180 192 384 512)
for size in "${sizes[@]}"; do
    convert "$SOURCE_LOGO" -resize ${size}x${size} "public/icons/icon-${size}x${size}.png"
    echo "Generated icon-${size}x${size}.png"
done

# Optimize product images
echo "Converting product images to WebP..."
find items -name "*.jpg" -o -name "*.jpeg" | while read img; do
    basename=$(basename "$img" | cut -d. -f1)
    cwebp -q 85 "$img" -o "public/items/${basename}.webp"
    echo "Converted $img to WebP"
done

echo "✅ Image optimization complete!"
```

## 📱 Mobile Performance

PWA optimizations implemented:
- ✅ Service Worker caching for images
- ✅ Offline fallback for critical images  
- ✅ Progressive loading with placeholders
- ✅ Responsive image sizing
- ✅ Preload critical images (logo, hero)

## 📈 Monitoring

Track image performance:
- Core Web Vitals (LCP, CLS)
- Network usage reduction
- Cache hit rates
- Time to first meaningful paint