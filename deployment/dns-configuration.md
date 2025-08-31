# DNS Configuration for tinacom.sujeto10.com

## 🎯 DNS Records Required

Configure these DNS records in your domain registrar (sujeto10.com):

### Primary Domain Records
```
Type: A
Name: tinacom
Value: 76.76.21.21 (Vercel IP)
TTL: 300

Type: AAAA  
Name: tinacom
Value: 2606:4700:10::6814:55b5 (Vercel IPv6)
TTL: 300
```

### CNAME Records (Alternative)
```
Type: CNAME
Name: tinacom
Value: cname.vercel-dns.com
TTL: 300
```

## 🔧 Cloudflare Configuration (Recommended)

If using Cloudflare as DNS provider:

1. **Add Site**: Add sujeto10.com to Cloudflare
2. **DNS Records**:
   - A record: `tinacom` → `76.76.21.21` (Proxied: ✅)
   - AAAA record: `tinacom` → `2606:4700:10::6814:55b5` (Proxied: ✅)

3. **SSL/TLS Settings**:
   - Mode: "Full (strict)"
   - Edge Certificates: Enable "Always Use HTTPS"
   - Origin Server: Create origin certificate

4. **Performance**:
   - Enable "Auto Minify" for CSS, JS, HTML
   - Enable "Brotli" compression
   - Cache Level: "Standard"

## 🚀 Vercel Domain Configuration

After DNS setup, configure in Vercel:

1. **Add Domain**: 
   ```bash
   vercel domains add tinacom.sujeto10.com
   ```

2. **Link to Project**:
   ```bash
   vercel domains ls
   vercel --prod
   ```

3. **Environment Variables**:
   ```
   NEXT_PUBLIC_SITE_URL=https://tinacom.sujeto10.com
   ```

## ✅ Verification Steps

1. **DNS Propagation**: 
   ```bash
   dig tinacom.sujeto10.com
   nslookup tinacom.sujeto10.com
   ```

2. **SSL Certificate**:
   ```bash
   openssl s_client -connect tinacom.sujeto10.com:443
   ```

3. **Performance Test**:
   ```bash
   curl -w "@curl-format.txt" -o /dev/null -s https://tinacom.sujeto10.com
   ```

## 📈 Performance Optimization

### Browser Caching
Already configured in next.config.js:
- Static assets: 1 year cache
- Images: Optimized with WebP/AVIF
- Gzip/Brotli compression enabled

### CDN Configuration  
Vercel Edge Network automatically provides:
- Global CDN with 100+ edge locations
- Automatic image optimization
- Edge caching for static content

## 🔒 Security Headers

Already implemented in next.config.js:
- HSTS (Strict-Transport-Security)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin
- Permissions-Policy for camera/microphone access

## 📊 Monitoring

After deployment, set up monitoring:
- Vercel Analytics (automatic)
- Core Web Vitals tracking
- Error boundaries with Sentry
- Uptime monitoring

## 🚨 Troubleshooting

### Common Issues:
1. **DNS not propagating**: Wait 24-48 hours, check TTL settings
2. **SSL errors**: Ensure Cloudflare SSL mode is "Full (strict)"  
3. **404 errors**: Check Vercel project linking and build success
4. **Slow performance**: Enable Cloudflare proxy, check image optimization

### Debug Commands:
```bash
# Check DNS
dig +trace tinacom.sujeto10.com

# Check SSL
curl -vI https://tinacom.sujeto10.com

# Check headers  
curl -I https://tinacom.sujeto10.com
```

---
⚡ **Quick Start**: Copy DNS records above → Configure in registrar → Deploy to Vercel → Verify SSL