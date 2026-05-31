# 🚀 Guía de Configuración SEO y Meta Tags

Este documento explica cómo configurar todos los elementos de SEO y meta tags que se han implementado.

## 📋 Checklist de Configuración

### 1. **Google Analytics** ✅
- [ ] Crear una propiedad en [Google Analytics](https://analytics.google.com/)
- [ ] Obtener el ID de medición (formato: G-XXXXXXXXXX)
- [ ] Actualizar `GA_MEASUREMENT_ID` en `src/utils/analyticsConfig.js`

```javascript
export const GA_MEASUREMENT_ID = "G-tu-id-aqui";
```

### 2. **Google Search Console** ✅
- [ ] Verificar tu sitio en [Google Search Console](https://search.google.com/search-console)
- [ ] Obtener el código de verificación
- [ ] Actualizar `GOOGLE_SEARCH_CONSOLE_VERIFICATION` en `src/utils/analyticsConfig.js`

### 3. **Bing Webmaster Tools** ✅
- [ ] Verificar tu sitio en [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Obtener el código de verificación
- [ ] Actualizar `BING_WEBMASTER_VERIFICATION` en `src/utils/analyticsConfig.js`

### 4. **Meta Tags Dinámicos** ✅
React Helmet está configurado para manejar meta tags dinámicos por página.

**Archivos relevantes:**
- `src/components/SEO.jsx` - Componente para gestionar meta tags
- `src/utils/seoConfig.js` - Configuración centralizada de SEO

### 5. **Sitemap XML** ✅
- **Archivo:** `public/sitemap.xml`
- **URLs incluidas:** Página principal, secciones y páginas legales
- **Actualización:** Modificar cuando se agreguen nuevas páginas principales

### 6. **Robots.txt** ✅
- **Archivo:** `public/robots.txt`
- **Incluye:** Referencia al sitemap.xml
- **Función:** Indicar a los buscadores qué indexar

### 7. **.htaccess (Servidor Apache)** ✅
- **Archivo:** `public/.htaccess`
- **Características:**
  - Fuerza HTTPS
  - Compresión Gzip
  - Caché del navegador
  - Headers de seguridad
  - Reescrituras SPA

---

## 📝 Estructura de SEO Implementada

### Schema.org JSON-LD
Se incluye automáticamente schema.org para:
- **Organization** - Información de la empresa
- **LocalBusiness** - Servicios locales
- **Services** - Detalles de servicios ofrecidos

### Open Graph Tags
Optimizados para compartir en redes sociales:
- Facebook
- Twitter/X
- LinkedIn

### Meta Tags Básicos
- Title dinámico
- Description
- Keywords
- Canonical URL
- Robots meta

---

## 🔧 Configuración en Producción

### 1. **Ambiente**
```bash
npm run build
```

### 2. **Verificar SEO**
- Usar [Google PageSpeed Insights](https://pagespeed.web.dev/)
- Verificar en [Google Search Console](https://search.google.com/search-console)
- Probar Open Graph con [Facebook Debugger](https://developers.facebook.com/tools/debug/)

### 3. **Actualizar URLs**
En `src/utils/seoConfig.js`, asegúrate de que `SITE_URL` sea tu dominio:
```javascript
export const SITE_URL = "https://grupoadfincas.es";
```

### 4. **Google Analytics**
Los eventos se pueden rastrear usando:
```javascript
import { trackEvent } from "src/utils/analyticsConfig";

// En un componente
const handleClick = () => {
  trackEvent('button_click', { 
    button_name: 'solicitar_presupuesto' 
  });
};
```

---

## 📊 Monitoreo Continuo

### Herramientas Recomendadas:

1. **Google Analytics** - Tráfico y comportamiento de usuarios
2. **Google Search Console** - Indexación y rendimiento en búsqueda
3. **PageSpeed Insights** - Rendimiento y Core Web Vitals
4. **SEMrush** o **Ahrefs** - Análisis de competencia
5. **Yoast SEO** - Análisis de contenido

---

## 🎯 Pasos Siguientes

1. **Content Marketing**: Crear blog posts sobre administración de fincas
2. **Link Building**: Obtener backlinks de sitios relevantes
3. **Local SEO**: Registrarse en directorios locales (Google My Business, Bing Places)
4. **Mobile Optimization**: Verificar que el sitio funcione perfectamente en móvil
5. **Page Speed**: Optimizar imágenes y recursos

---

## 💡 Tips Adicionales

- Mantener el sitemap actualizado cuando se agreguen nuevas páginas
- Usar URLs amigables con palabras clave
- Crear contenido original y de calidad
- Obtener enlaces internos entre páginas relacionadas
- Implementar preguntas frecuentes (FAQ Schema)

---

**Última actualización:** 31 de mayo de 2026
