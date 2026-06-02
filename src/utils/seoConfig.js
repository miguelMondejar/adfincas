// SEO Configuration and Schema Data
export const SITE_URL = "https://grupoadfincas.es";
export const SITE_NAME = "Grupo ADFincas - Administración de Fincas & Servicios Inmobiliarios";
export const SITE_DESCRIPTION = "Servicios profesionales de administración de fincas, gestión contable, mantenimiento técnico y asesoramiento legal en España.";
export const SITE_IMAGE = `${SITE_URL}/adfincas-og.jpg`;

// SEO Metadata for different pages
export const SEO_DATA = {
  home: {
    title: "Grupo ADFincas - Administración de Fincas Profesional",
    description: "Administración de fincas, gestión contable, mantenimiento técnico y asesoramiento legal. Confianza y experiencia en tus propiedades.",
    keywords: "administración fincas, gestión fincas, mantenimiento técnico, asesoramiento legal, servicios inmobiliarios",
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
    "https://www.facebook.com/GrupoADFincas",
    "https://www.instagram.com/alfonso.administradordefincas",
    "https://www.linkedin.com/company/GrupoADFincas",
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+34-610-612-710",
    "email": "info@grupoadfincas.es",
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Dirección de la empresa",
    "addressLocality": "España",
    "postalCode": "CP",
    "addressCountry": "ES",
  },
};

// Schema.org LocalBusiness
export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Grupo ADFincas",
  "image": SITE_IMAGE,
  "description": SITE_DESCRIPTION,
  "url": SITE_URL,
  "telephone": "+34-610-612-710",
  "email": "info@grupoadfincas.es",
  "priceRange": "$$",
  "areaServed": {
    "@type": "Country",
    "name": "ES",
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00",
    },
  ],
};

// Schema.org Service
export const SERVICES_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Gestión Contable",
    "description": "Administración financiera completa de tu finca",
    "provider": {
      "@type": "Organization",
      "name": "Grupo ADFincas",
    },
    "areaServed": {
      "@type": "Country",
      "name": "ES",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mantenimiento Técnico",
    "description": "Conservación y reparación integral de instalaciones",
    "provider": {
      "@type": "Organization",
      "name": "Grupo ADFincas",
    },
    "areaServed": {
      "@type": "Country",
      "name": "ES",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Asesoramiento Legal",
    "description": "Protección de tus derechos e intereses",
    "provider": {
      "@type": "Organization",
      "name": "Grupo ADFincas",
    },
    "areaServed": {
      "@type": "Country",
      "name": "ES",
    },
  },
];
