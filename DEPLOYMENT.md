# Deployment Guide

This guide will help you deploy the Wheeler Universe portfolio to various hosting platforms.

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

## 📦 Build Output

The production build creates a `dist/` directory with:

- Optimized HTML, CSS, and JavaScript
- Static assets with cache-friendly filenames
- Gzip-compressed assets for fast loading

## 🌍 Deployment Options

### 1. Netlify (Recommended)

**Automatic Deployment:**

1. Push your code to GitHub
2. Connect repository to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18+

**Manual Deployment:**

```bash
npm run build
# Upload dist/ folder to Netlify
```

The `netlify.toml` file is already configured for:

- SPA routing
- Build configuration
- Environment settings

### 2. Vercel

**Automatic Deployment:**

1. Import GitHub repository to Vercel
2. Framework preset: Vite
3. Build settings are auto-detected

**Manual Deployment:**

```bash
npm install -g vercel
npm run build
vercel --prod
```

The `vercel.json` file configures:

- SPA routing
- Cache headers
- Static asset optimization

### 3. GitHub Pages

```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

### 4. AWS S3 + CloudFront

```bash
npm run build
# Upload dist/ to S3 bucket
# Configure CloudFront distribution
```

### 5. Firebase Hosting

```bash
npm install -g firebase-tools
npm run build
firebase init hosting
firebase deploy
```

## 🔧 Environment Variables

No environment variables are required for basic deployment.

Optional variables:

- `VITE_APP_TITLE`: Custom app title
- `BASE_URL`: Custom base URL for routing

## 🎯 Performance Optimizations

The build includes:

- Tree-shaking for minimal bundle size
- Code splitting for better caching
- Asset optimization
- Gzip compression support

## 📊 Build Analysis

To analyze bundle size:

```bash
npm run build
npx vite-bundle-analyzer dist/assets/*.js
```

## 🔒 Security Headers

For production deployments, consider adding:

- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

## 📱 Mobile Optimization

The site is fully responsive and includes:

- Viewport meta tag
- Touch-friendly navigation
- Optimized images
- Progressive enhancement

## 🚀 Performance Checklist

- ✅ Minified assets
- ✅ Gzip compression
- ✅ Image optimization
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Critical CSS inlining
- ✅ Fast loading fonts

## 🔍 SEO Optimization

Built-in SEO features:

- Meta tags
- Open Graph tags
- Twitter Card tags
- Semantic HTML
- Sitemap generation
- Structured data

## 📝 Custom Domain

After deployment, you can configure:

1. Custom domain in hosting platform
2. SSL certificate (usually automatic)
3. CDN configuration
4. DNS settings

## 🎨 Customization

Before deploying, customize:

- Content in planet components
- Personal information
- Social media links
- Project URLs
- Color scheme (optional)

## 📞 Support

For deployment issues:

1. Check build logs
2. Verify Node.js version (18+)
3. Clear npm cache: `npm cache clean --force`
4. Delete node_modules and reinstall

---

Ready to launch your Wheeler Universe portfolio! 🌌
