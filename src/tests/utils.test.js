/**
 * TESTS: analyticsConfig.js + colorConfig.js + seoConfig.js + data files
 */
import {
  GA_MEASUREMENT_ID,
  GOOGLE_SEARCH_CONSOLE_VERIFICATION,
  initializeGoogleAnalytics,
  trackEvent,
  trackPageView,
} from '../utils/analyticsConfig';

import { COLORS, getCSSVariables } from '../utils/colorConfig';

import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SEO_DATA,
  ORGANIZATION_SCHEMA,
  LOCAL_BUSINESS_SCHEMA,
  SERVICES_SCHEMA,
} from '../utils/seoConfig';

import { SERVICES_DATA } from '../data/services';
import { REAL_ESTATE_SERVICES } from '../data/realEstateServices';

// ============================================================
// analyticsConfig.js
// ============================================================
describe('analyticsConfig — constantes', () => {
  test('GA_MEASUREMENT_ID tiene formato G-XXXXXXXXXX', () => {
    expect(GA_MEASUREMENT_ID).toMatch(/^G-/);
  });

  test('GOOGLE_SEARCH_CONSOLE_VERIFICATION no está vacío', () => {
    expect(typeof GOOGLE_SEARCH_CONSOLE_VERIFICATION).toBe('string');
  });
});

describe('analyticsConfig — trackEvent', () => {
  beforeEach(() => {
    window.gtag = jest.fn();
  });

  afterEach(() => {
    delete window.gtag;
  });

  test('llama a window.gtag cuando está disponible', () => {
    trackEvent('test_event', { key: 'value' });
    expect(window.gtag).toHaveBeenCalledWith('event', 'test_event', { key: 'value' });
  });

  test('llama a gtag con el nombre del evento correcto', () => {
    trackEvent('cta_click', { button: 'hero' });
    expect(window.gtag).toHaveBeenCalledWith('event', 'cta_click', { button: 'hero' });
  });

  test('no lanza error si window.gtag no está definido', () => {
    delete window.gtag;
    expect(() => trackEvent('test_event', {})).not.toThrow();
  });

  test('acepta llamada sin eventData', () => {
    expect(() => trackEvent('page_view')).not.toThrow();
  });
});

describe('analyticsConfig — trackPageView', () => {
  beforeEach(() => {
    window.gtag = jest.fn();
  });

  afterEach(() => {
    delete window.gtag;
  });

  test('llama a gtag config con título y ruta', () => {
    trackPageView('Inicio', '/');
    expect(window.gtag).toHaveBeenCalledWith(
      'config',
      GA_MEASUREMENT_ID,
      { page_title: 'Inicio', page_path: '/' }
    );
  });

  test('no lanza error si window.gtag no está definido', () => {
    delete window.gtag;
    expect(() => trackPageView('Test', '/test')).not.toThrow();
  });
});

describe('analyticsConfig — initializeGoogleAnalytics', () => {
  test('no inyecta script si GA_MEASUREMENT_ID es placeholder', () => {
    const scriptsBefore = document.querySelectorAll('script').length;
    initializeGoogleAnalytics();
    const scriptsAfter = document.querySelectorAll('script').length;
    // Con placeholder G-XXXXXXXXXX no debe añadir scripts
    expect(scriptsAfter).toBe(scriptsBefore);
  });
});

// ============================================================
// colorConfig.js — getCSSVariables
// ============================================================
describe('colorConfig — getCSSVariables', () => {
  test('devuelve un string con variables CSS', () => {
    const css = getCSSVariables();
    expect(typeof css).toBe('string');
    expect(css).toContain('--color-primary');
  });

  test('incluye todos los colores definidos', () => {
    const css = getCSSVariables();
    expect(css).toContain('--color-secondary');
    expect(css).toContain('--color-dark');
    expect(css).toContain('--color-white');
  });

  test('incluye los valores reales de color', () => {
    const css = getCSSVariables();
    expect(css).toContain(COLORS.primary);
    expect(css).toContain(COLORS.secondary);
  });

  test('contiene bloque :root', () => {
    const css = getCSSVariables();
    expect(css).toContain(':root');
  });
});

// ============================================================
// seoConfig.js
// ============================================================
describe('seoConfig — constantes básicas', () => {
  test('SITE_URL comienza con https', () => {
    expect(SITE_URL).toMatch(/^https:\/\//);
  });

  test('SITE_URL apunta al dominio correcto', () => {
    expect(SITE_URL).toContain('grupoadfincas.es');
  });

  test('SITE_NAME menciona ADFincas', () => {
    expect(SITE_NAME).toContain('ADFincas');
  });

  test('SITE_DESCRIPTION no está vacía', () => {
    expect(SITE_DESCRIPTION.trim().length).toBeGreaterThan(0);
  });
});

describe('seoConfig — SEO_DATA', () => {
  test('tiene datos para la página home', () => {
    expect(SEO_DATA.home).toHaveProperty('title');
    expect(SEO_DATA.home).toHaveProperty('description');
    expect(SEO_DATA.home).toHaveProperty('canonical');
  });

  test('tiene datos para la página legal', () => {
    expect(SEO_DATA.legal).toHaveProperty('title');
    expect(SEO_DATA.legal).toHaveProperty('description');
  });

  test('canonical de home coincide con SITE_URL', () => {
    expect(SEO_DATA.home.canonical).toBe(SITE_URL);
  });

  test('todos los títulos mencionan ADFincas', () => {
    Object.values(SEO_DATA).forEach(data => {
      expect(data.title).toContain('ADFincas');
    });
  });
});

describe('seoConfig — ORGANIZATION_SCHEMA', () => {
  test('tiene @context schema.org', () => {
    expect(ORGANIZATION_SCHEMA['@context']).toBe('https://schema.org');
  });

  test('tipo es Organization', () => {
    expect(ORGANIZATION_SCHEMA['@type']).toBe('Organization');
  });

  test('tiene nombre de empresa', () => {
    expect(ORGANIZATION_SCHEMA.name).toBe('Grupo ADFincas');
  });

  test('tiene URL de contacto telefónico', () => {
    expect(ORGANIZATION_SCHEMA.contactPoint.telephone).toContain('+34');
  });

  test('tiene dirección postal con país ES', () => {
    expect(ORGANIZATION_SCHEMA.address.addressCountry).toBe('ES');
  });
});

describe('seoConfig — LOCAL_BUSINESS_SCHEMA', () => {
  test('tipo es LocalBusiness', () => {
    expect(LOCAL_BUSINESS_SCHEMA['@type']).toBe('LocalBusiness');
  });

  test('tiene teléfono válido', () => {
    expect(LOCAL_BUSINESS_SCHEMA.telephone).toContain('+34');
  });

  test('tiene horario de apertura', () => {
    expect(LOCAL_BUSINESS_SCHEMA.openingHoursSpecification).toBeInstanceOf(Array);
    expect(LOCAL_BUSINESS_SCHEMA.openingHoursSpecification.length).toBeGreaterThan(0);
  });

  test('horario de lunes a viernes tiene opens y closes', () => {
    const weekday = LOCAL_BUSINESS_SCHEMA.openingHoursSpecification[0];
    expect(weekday).toHaveProperty('opens');
    expect(weekday).toHaveProperty('closes');
  });
});

describe('seoConfig — SERVICES_SCHEMA', () => {
  test('es un array con al menos 3 servicios', () => {
    expect(SERVICES_SCHEMA).toBeInstanceOf(Array);
    expect(SERVICES_SCHEMA.length).toBeGreaterThanOrEqual(3);
  });

  test('cada servicio tiene tipo Service', () => {
    SERVICES_SCHEMA.forEach(service => {
      expect(service['@type']).toBe('Service');
    });
  });

  test('cada servicio tiene nombre y descripción', () => {
    SERVICES_SCHEMA.forEach(service => {
      expect(service.name.trim().length).toBeGreaterThan(0);
      expect(service.description.trim().length).toBeGreaterThan(0);
    });
  });

  test('cada servicio tiene proveedor Grupo ADFincas', () => {
    SERVICES_SCHEMA.forEach(service => {
      expect(service.provider.name).toBe('Grupo ADFincas');
    });
  });
});

// ============================================================
// data/services.js
// ============================================================
describe('SERVICES_DATA', () => {
  test('es un array con al menos 3 servicios', () => {
    expect(SERVICES_DATA).toBeInstanceOf(Array);
    expect(SERVICES_DATA.length).toBeGreaterThanOrEqual(3);
  });

  test('cada servicio tiene icon, title, desc y details', () => {
    SERVICES_DATA.forEach(service => {
      expect(service).toHaveProperty('icon');
      expect(service).toHaveProperty('title');
      expect(service).toHaveProperty('desc');
      expect(service).toHaveProperty('details');
    });
  });

  test('todos los títulos son strings no vacíos', () => {
    SERVICES_DATA.forEach(service => {
      expect(service.title.trim().length).toBeGreaterThan(0);
    });
  });

  test('todos los details son arrays con al menos un item', () => {
    SERVICES_DATA.forEach(service => {
      expect(service.details).toBeInstanceOf(Array);
      expect(service.details.length).toBeGreaterThan(0);
    });
  });
});

// ============================================================
// data/realEstateServices.js
// ============================================================
describe('REAL_ESTATE_SERVICES', () => {
  test('es un array con al menos 3 servicios', () => {
    expect(REAL_ESTATE_SERVICES).toBeInstanceOf(Array);
    expect(REAL_ESTATE_SERVICES.length).toBeGreaterThanOrEqual(3);
  });

  test('cada servicio tiene icon, title, desc y details', () => {
    REAL_ESTATE_SERVICES.forEach(service => {
      expect(service).toHaveProperty('icon');
      expect(service).toHaveProperty('title');
      expect(service).toHaveProperty('desc');
      expect(service).toHaveProperty('details');
    });
  });

  test('todos los títulos son únicos', () => {
    const titles = REAL_ESTATE_SERVICES.map(s => s.title);
    const unique = new Set(titles);
    expect(unique.size).toBe(titles.length);
  });

  test('todos los details tienen contenido', () => {
    REAL_ESTATE_SERVICES.forEach(service => {
      service.details.forEach(detail => {
        expect(detail.trim().length).toBeGreaterThan(0);
      });
    });
  });
});
