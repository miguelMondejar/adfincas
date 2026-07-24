// SEO Configuration and Schema Data
export const SITE_URL = "https://grupoadfincas.es";
export const SITE_NAME = "Grupo ADFincas - Administración de Fincas & Servicios Inmobiliarios";
export const SITE_DESCRIPTION = "Administración profesional de fincas y gestión de comunidades de propietarios en Sevilla (Nervión, San Pablo, Sevilla Este, Triana, Macarena, Los Remedios, Heliópolis, Bellavista) y Málaga. Gestión contable, mantenimiento técnico y asesoramiento legal.";
export const SITE_IMAGE = `${SITE_URL}/adfincas-og.jpg`;

// Zonas geográficas de cobertura
export const GEO_AREAS = {
  sevillaBarrios: [
    "Nervión", "San Pablo", "Sevilla Este", "Triana", "Los Remedios",
    "Heliópolis", "Macarena", "Bellavista", "La Palmera", "San Bernardo",
    "Torreblanca", "El Porvenir", "Pino Montano", "Polígono Sur", "La Cartuja",
  ],
  sevillaAlrededores: [
    "Tomares", "Camas", "Bormujos", "Castilleja de la Cuesta", "Mairena del Aljarafe",
    "Gelves", "Palomares del Río", "Dos Hermanas", "Alcalá de Guadaíra", "La Rinconada",
    "Santiponce", "Espartinas", "Gines", "Valencina de la Concepción",
  ],
  malaga: [
    "Málaga", "Centro Histórico Málaga", "La Malagueta", "El Palo", "Pedregalejo",
    "El Limonar", "Teatinos", "Ciudad Jardín", "Churriana", "Campanillas",
    "Torremolinos", "Benalmádena", "Fuengirola",
  ],
};

// SEO Metadata for different pages
export const SEO_DATA = {
  home: {
    title: "Administración de Fincas en Sevilla y Málaga | Grupo ADFincas",
    description: "Administrador de fincas colegiado en Sevilla y Málaga. Gestión integral de comunidades de propietarios en Nervión, San Pablo, Sevilla Este, Triana, Macarena y alrededores. Presupuesto sin compromiso.",
    keywords: [
      // Genérico
      "administración de fincas Sevilla", "administrador de fincas Sevilla",
      "administrador fincas colegiado Sevilla", "gestión comunidades propietarios Sevilla",
      "administración fincas Málaga", "gestión comunidades Málaga",
      // Barrios Sevilla
      "administración fincas Nervión", "administrador fincas San Pablo",
      "administración fincas Sevilla Este", "administración fincas Triana",
      "administración fincas Los Remedios", "administración fincas Macarena",
      "administración fincas Heliópolis", "administración fincas Bellavista",
      "administración fincas Pino Montano", "administración fincas Torreblanca",
      // Municipios alrededores
      "administración fincas Dos Hermanas", "administración fincas Alcalá de Guadaíra",
      "administración fincas Tomares", "administración fincas Mairena del Aljarafe",
      "administración fincas Camas", "administración fincas Bormujos",
      // Servicios
      "gestión contable comunidades", "mantenimiento técnico fincas",
      "asesoramiento legal comunidades propietarios", "servicios inmobiliarios Sevilla",
    ].join(", "),
    ogType: "website",
    canonical: SITE_URL,
  },
  legal: {
    title: "Información Legal - Grupo ADFincas",
    description: "Información legal y términos de servicio de Grupo ADFincas.",
    keywords: "información legal, términos de servicio, condiciones de uso",
    ogType: "website",
    canonical: `${SITE_URL}/legal`,
  },
  privacy: {
    title: "Política de Privacidad - Grupo ADFincas",
    description: "Política de privacidad y protección de datos de Grupo ADFincas.",
    keywords: "política privacidad, RGPD, protección datos",
    ogType: "website",
    canonical: `${SITE_URL}/privacy`,
  },
};

// Schema.org Organization Structured Data
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Grupo ADFincas",
  "description": SITE_DESCRIPTION,
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`,
  "image": SITE_IMAGE,
  "sameAs": [
    "https://www.instagram.com/alfonso.administradordefincas",
    "https://www.linkedin.com/company/GrupoADFincas",
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+34-610-612-710",
    "email": "info@grupoadfincas.es",
    "availableLanguage": "Spanish",
    "areaServed": ["Sevilla", "Málaga"],
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Principal, 123",
    "addressLocality": "Sevilla",
    "addressRegion": "Andalucía",
    "postalCode": "41001",
    "addressCountry": "ES",
  },
  "areaServed": [
    { "@type": "City", "name": "Sevilla" },
    { "@type": "City", "name": "Málaga" },
    // Barrios Sevilla
    { "@type": "Place", "name": "Nervión, Sevilla" },
    { "@type": "Place", "name": "San Pablo, Sevilla" },
    { "@type": "Place", "name": "Sevilla Este" },
    { "@type": "Place", "name": "Triana, Sevilla" },
    { "@type": "Place", "name": "Los Remedios, Sevilla" },
    { "@type": "Place", "name": "Heliópolis, Sevilla" },
    { "@type": "Place", "name": "Macarena, Sevilla" },
    { "@type": "Place", "name": "Bellavista, Sevilla" },
    { "@type": "Place", "name": "Pino Montano, Sevilla" },
    { "@type": "Place", "name": "Torreblanca, Sevilla" },
    // Municipios alrededores Sevilla
    { "@type": "City", "name": "Dos Hermanas" },
    { "@type": "City", "name": "Alcalá de Guadaíra" },
    { "@type": "City", "name": "Tomares" },
    { "@type": "City", "name": "Camas" },
    { "@type": "City", "name": "Mairena del Aljarafe" },
    { "@type": "City", "name": "Bormujos" },
    { "@type": "City", "name": "La Rinconada" },
  ],
};

// Schema.org LocalBusiness
export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService", "HomeAndConstructionBusiness"],
  "name": "Grupo ADFincas",
  "image": SITE_IMAGE,
  "description": SITE_DESCRIPTION,
  "url": SITE_URL,
  "telephone": "+34-610-612-710",
  "email": "info@grupoadfincas.es",
  "priceRange": "$$",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Transferencia bancaria, domiciliación",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Principal, 123",
    "addressLocality": "Sevilla",
    "addressRegion": "Andalucía",
    "postalCode": "41001",
    "addressCountry": "ES",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "37.3886",
    "longitude": "-5.9823",
  },
  "hasMap": "https://maps.google.com/?q=Sevilla,España",
  "areaServed": [
    { "@type": "City", "name": "Sevilla" },
    { "@type": "City", "name": "Málaga" },
    { "@type": "Place", "name": "Nervión, Sevilla" },
    { "@type": "Place", "name": "San Pablo, Sevilla" },
    { "@type": "Place", "name": "Sevilla Este" },
    { "@type": "Place", "name": "Triana, Sevilla" },
    { "@type": "Place", "name": "Los Remedios, Sevilla" },
    { "@type": "Place", "name": "Heliópolis, Sevilla" },
    { "@type": "Place", "name": "Macarena, Sevilla" },
    { "@type": "Place", "name": "Bellavista, Sevilla" },
    { "@type": "City", "name": "Dos Hermanas" },
    { "@type": "City", "name": "Alcalá de Guadaíra" },
    { "@type": "City", "name": "Tomares" },
    { "@type": "City", "name": "Camas" },
    { "@type": "City", "name": "Mairena del Aljarafe" },
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "13:00",
    },
  ],
  "knowsAbout": [
    "Administración de fincas", "Gestión de comunidades de propietarios",
    "Mantenimiento técnico de edificios", "Asesoramiento legal inmobiliario",
    "Gestión contable de comunidades", "Ley de Propiedad Horizontal",
  ],
};

// Schema.org Service
const AREA_SERVED_SERVICES = [
  { "@type": "City", "name": "Sevilla" },
  { "@type": "City", "name": "Málaga" },
  { "@type": "Place", "name": "Nervión, Sevilla" },
  { "@type": "Place", "name": "San Pablo, Sevilla" },
  { "@type": "Place", "name": "Sevilla Este" },
  { "@type": "Place", "name": "Triana, Sevilla" },
  { "@type": "Place", "name": "Los Remedios, Sevilla" },
  { "@type": "City", "name": "Dos Hermanas" },
  { "@type": "City", "name": "Alcalá de Guadaíra" },
  { "@type": "City", "name": "Tomares" },
  { "@type": "City", "name": "Mairena del Aljarafe" },
];

export const SERVICES_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Gestión Contable de Comunidades",
    "description": "Administración financiera completa de tu finca: presupuestos, liquidaciones, reclamación de morosos y contabilidad transparente.",
    "provider": {
      "@type": "Organization",
      "name": "Grupo ADFincas",
    },
    "areaServed": AREA_SERVED_SERVICES,
    "serviceType": "Gestión contable comunidades de propietarios",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mantenimiento Técnico de Fincas",
    "description": "Conservación y reparación integral de instalaciones comunes, coordinación de proveedores y seguimiento de obras.",
    "provider": {
      "@type": "Organization",
      "name": "Grupo ADFincas",
    },
    "areaServed": AREA_SERVED_SERVICES,
    "serviceType": "Mantenimiento técnico edificios y comunidades",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Asesoramiento Legal en Comunidades de Propietarios",
    "description": "Asesoría jurídica en Ley de Propiedad Horizontal, convocatoria de juntas, conflictos entre vecinos y reclamaciones.",
    "provider": {
      "@type": "Organization",
      "name": "Grupo ADFincas",
    },
    "areaServed": AREA_SERVED_SERVICES,
    "serviceType": "Asesoramiento legal inmobiliario Sevilla Málaga",
  },
];
