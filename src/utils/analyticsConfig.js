// Google Analytics Configuration
export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO

// Google Search Console
export const GOOGLE_SEARCH_CONSOLE_VERIFICATION = "XXXXX"; // TODO

// Bing Webmaster Tools
export const BING_WEBMASTER_VERIFICATION = "XXXXX"; // TODO

/**
 * Inicializar Google Analytics (cuando esté configurado)
 * Llamar en main.jsx o en App.jsx después de importar este archivo
 */
export const initializeGoogleAnalytics = () => {
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
    // Cargar Google Analytics script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Inicializar gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);

    // Hacer gtag disponible globalmente
    window.gtag = gtag;
  }
};

/**
 * Rastrear eventos personalizados
 * Uso: trackEvent('button_click', { button_name: 'solicitar_presupuesto' })
 */
export const trackEvent = (eventName, eventData) => {
  if (window.gtag) {
    window.gtag("event", eventName, eventData);
  }
};

/**
 * Rastrear páginas vistas
 * Uso: trackPageView('/legal')
 */
export const trackPageView = (pageTitle, pagePath) => {
  if (window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_title: pageTitle,
      page_path: pagePath,
    });
  }
};
