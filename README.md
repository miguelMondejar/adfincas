# ADFincas - Administración de Fincas & Servicios Inmobiliarios

## 📋 Descripción

ADFincas es un sitio web profesional para una empresa de administración de fincas y servicios inmobiliarios. Desarrollado con React y Vite, ofrece una experiencia moderna y responsive con todas las secciones necesarias para presentar servicios de administración de propiedades.

## ✨ Características

### Secciones
- **Inicio**: Héroe con imagen corporativa y CTA "Solicitar Presupuesto"
- **Quiénes Somos**: Descripción de trayectoria, valores y estadísticas
- **Servicios**: Los 3 servicios principales (Gestión Contable, Mantenimiento, Asesoramiento Legal)
- **Galería**: Carrusel interactivo de instalaciones y servicios
- **Inmobiliaria**: Servicios inmobiliarios con formulario de captación de inmuebles
- **Contacto**: Formulario de contacto y datos de contacto con integración de redes sociales

### Elementos Globales
- ✅ Navegación responsive con menú móvil
- ✅ Botón flotante de WhatsApp (integrable)
- ✅ Footer con información legal y redes sociales
- ✅ Sistema de colores corporativo (Verde #5AAD94 y Madera #A47C48)

### Funcionalidades Técnicas
- **React 19**: Framework UI modular
- **Vite 7**: Build tool ultrarrápido
- **Tailwind CSS 3**: Utilidades de estilos responsive
- **FontAwesome 7**: Iconografía profesional
- **EmailJS**: Integración de formularios por email (configurable)
- **SEO Optimizado**: Meta tags, robots.txt, sitemap.xml

## 🛠️ Stack Técnico

| Tecnología | Versión | Propósito |
|---|---|---|
| React | 19.1.1 | Framework UI |
| ReactDOM | 19.1.1 | Rendering en DOM |
| Vite | 7.1.7 | Build tool |
| Tailwind CSS | 3.4.13 | Framework CSS |
| FontAwesome | 7.1.0 | Iconografía |
| EmailJS | 4.4.1 | Envío de emails |
| ESLint | 9.36.0 | Linting de código |

## 📁 Estructura del Proyecto

```
ADFincas/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navegación principal
│   │   ├── Hero.jsx            # Sección héroe
│   │   ├── AboutUs.jsx         # Quiénes somos
│   │   ├── Services.jsx        # Servicios principales
│   │   ├── Gallery.jsx         # Galería de imágenes
│   │   ├── RealEstate.jsx      # Servicios inmobiliarios + formulario
│   │   ├── Contact.jsx         # Contacto + formulario
│   │   └── Footer.jsx          # Pie de página
│   ├── data/
│   │   ├── constants.js        # Constantes de configuración
│   │   ├── services.js         # Datos de servicios
│   │   └── realEstateServices.js # Datos servicios inmobiliarios
│   ├── assets/                 # Imágenes y media
│   ├── App.jsx                 # Componente raíz
│   ├── main.jsx                # Punto de entrada
│   ├── App.css                 # Estilos de App
│   └── index.css               # Estilos globales
├── public/                     # Archivos estáticos
├── package.json                # Dependencias
├── vite.config.js              # Configuración Vite
├── tailwind.config.js          # Configuración Tailwind
├── postcss.config.js           # Configuración PostCSS
└── index.html                  # HTML principal
```

## 🚀 Instalación y Uso

### Requisitos
- Node.js 16+ 
- npm o yarn

### Instalación

```bash
# Navegar al directorio del proyecto
cd ADFincas

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# El proyecto estará disponible en http://localhost:5173
```

### Build para Producción

```bash
# Compilar y optimizar para producción
npm run build

# Vista previa de la build
npm run preview
```

### Linting

```bash
# Ejecutar ESLint
npm run lint
```

## 🎨 Paleta de Colores

```
Primary (Verde Profesional):    #5AAD94
Secondary (Madera):             #A47C48
Background (Blanco):            #FFFFFF
Text (Gris Oscuro):             #1A1A1A
Light Background (Gris Claro):  #F5F5F5
```

## 📱 Responsive Design

El proyecto está optimizado para todos los tamaños de pantalla:

- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

## ♿ Accesibilidad

- Etiquetas semánticas HTML5
- Atributos ARIA para elementos interactivos
- Contraste de colores WCAG AA
- Navegación por teclado completa

## 📄 Información Legal

- **Empresa**: ADFincas
- **Ubicación**: España
- **Email**: info@grupoadfincas.es (actualizar)
- **Teléfono**: +34 610 61 27 10 (actualizar)

## 📝 Changelog

### v1.0.0 (Apr 10, 2025)
- ✅ Proyecto inicial creado
- ✅ 6 secciones principales implementadas
- ✅ Sistema de formularios con EmailJS
- ✅ Galería interactiva
- ✅ Paleta de colores corporativa
- ✅ Diseño responsive completo
- ✅ SEO optimizado

## 🤝 Soporte y Contribuciones

Para reportar problemas o sugerencias, por favor contacta a través de:
- Email: info@grupoadfincas.es

## 📄 Licencia

© 2026 ADFincas. Todos los derechos reservados.