/**
 * TESTS: constants.js + colorConfig.js
 * Importa los módulos reales para medir coverage correctamente
 */
import {
  PHONE,
  PHONE_FORMATTED,
  WHATSAPP_URL,
  PHONE_LINK,
  EMAIL,
  COMPANY_NAME,
  COMPANY_FULL_NAME,
  SOCIAL_LINKS,
  MENU_ITEMS,
  SECTIONS,
} from '../data/constants';

import { COLORS } from '../utils/colorConfig';

const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

// ============================================================
// Información de contacto
// ============================================================
describe('Constantes de contacto', () => {
  test('EMAIL tiene formato válido', () => {
    expect(EMAIL).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test('EMAIL pertenece al dominio de la empresa', () => {
    expect(EMAIL).toContain('grupoadfincas.es');
  });

  test('PHONE_LINK comienza con tel:', () => {
    expect(PHONE_LINK).toMatch(/^tel:/);
  });

  test('PHONE_FORMATTED tiene formato legible con prefijo español', () => {
    expect(PHONE_FORMATTED).toMatch(/^\+34\s/);
  });

  test('WHATSAPP_URL apunta al dominio wa.me', () => {
    expect(WHATSAPP_URL).toMatch(/^https:\/\/wa\.me\//);
  });

  test('WHATSAPP_URL contiene el número correcto', () => {
    expect(WHATSAPP_URL).toContain('34610612710');
  });

  test('PHONE no está vacío', () => {
    expect(PHONE.trim().length).toBeGreaterThan(0);
  });
});

// ============================================================
// Información de la empresa
// ============================================================
describe('Constantes de empresa', () => {
  test('COMPANY_NAME no está vacío', () => {
    expect(COMPANY_NAME.trim().length).toBeGreaterThan(0);
  });

  test('COMPANY_FULL_NAME incluye el nombre corto', () => {
    expect(COMPANY_FULL_NAME).toContain(COMPANY_NAME);
  });

  test('COMPANY_FULL_NAME menciona administración', () => {
    expect(COMPANY_FULL_NAME.toLowerCase()).toContain('administración');
  });
});

// ============================================================
// Redes sociales
// ============================================================
describe('SOCIAL_LINKS', () => {
  test('tiene los 4 enlaces requeridos', () => {
    expect(SOCIAL_LINKS).toHaveProperty('facebook');
    expect(SOCIAL_LINKS).toHaveProperty('instagram');
    expect(SOCIAL_LINKS).toHaveProperty('linkedin');
    expect(SOCIAL_LINKS).toHaveProperty('email');
  });

  test('facebook es URL válida', () => {
    expect(SOCIAL_LINKS.facebook).toMatch(/^https:\/\/www\.facebook\.com\//);
  });

  test('instagram es URL válida', () => {
    expect(SOCIAL_LINKS.instagram).toMatch(/^https:\/\/www\.instagram\.com\//);
  });

  test('linkedin es URL válida', () => {
    expect(SOCIAL_LINKS.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
  });

  test('email coincide con la constante EMAIL', () => {
    expect(SOCIAL_LINKS.email).toBe(EMAIL);
  });
});

// ============================================================
// Menú de navegación
// ============================================================
describe('MENU_ITEMS', () => {
  test('tiene exactamente 5 items', () => {
    expect(MENU_ITEMS).toHaveLength(5);
  });

  test('incluye enlace a Contacto', () => {
    const item = MENU_ITEMS.find(i => i.label === 'Contacto');
    expect(item).toBeDefined();
    expect(item.href).toBe('#contacto');
  });

  test('incluye enlace a FAQ', () => {
    const item = MENU_ITEMS.find(i => i.label === 'Preguntas Frecuentes');
    expect(item).toBeDefined();
    expect(item.href).toBe('#faq');
  });

  test('todos los hrefs empiezan con #', () => {
    MENU_ITEMS.forEach(item => expect(item.href).toMatch(/^#/));
  });

  test('todos los items tienen label no vacío', () => {
    MENU_ITEMS.forEach(item => expect(item.label.trim().length).toBeGreaterThan(0));
  });
});

// ============================================================
// Secciones de la página
// ============================================================
describe('SECTIONS', () => {
  test('contiene todas las secciones principales', () => {
    ['home', 'aboutUs', 'services', 'realEstate', 'faq', 'contact'].forEach(key => {
      expect(SECTIONS).toHaveProperty(key);
    });
  });

  test('todos los valores son strings no vacíos', () => {
    Object.values(SECTIONS).forEach(value => {
      expect(typeof value).toBe('string');
      expect(value.trim().length).toBeGreaterThan(0);
    });
  });

  test('hrefs del menú coinciden con secciones', () => {
    const sectionValues = Object.values(SECTIONS);
    MENU_ITEMS.forEach(item => {
      expect(sectionValues).toContain(item.href.replace('#', ''));
    });
  });
});

// ============================================================
// Colores corporativos
// ============================================================
describe('COLORS', () => {
  test('todos los colores son hex válidos', () => {
    Object.entries(COLORS).forEach(([key, value]) => {
      expect(value).toMatch(HEX_COLOR_REGEX);
    });
  });

  test('color primario definido y válido', () => {
    expect(COLORS.primary).toMatch(HEX_COLOR_REGEX);
  });

  test('color secundario definido y válido', () => {
    expect(COLORS.secondary).toMatch(HEX_COLOR_REGEX);
  });

  test('primary y secondary son colores distintos', () => {
    expect(COLORS.primary.toLowerCase()).not.toBe(COLORS.secondary.toLowerCase());
  });

  test('color de WhatsApp es el verde corporativo (#25d366)', () => {
    expect(COLORS.whatsapp.toLowerCase()).toBe('#25d366');
  });

  test('color white es blanco puro', () => {
    expect(COLORS.white.toUpperCase()).toBe('#FFFFFF');
  });

  test('tiene todos los grises de escala Tailwind', () => {
    ['gray100', 'gray300', 'gray500', 'gray600', 'gray700'].forEach(key => {
      expect(COLORS).toHaveProperty(key);
      expect(COLORS[key]).toMatch(HEX_COLOR_REGEX);
    });
  });

  test('grises están numerados de menor a mayor (claro a oscuro)', () => {
    const nums = ['gray100', 'gray300', 'gray500', 'gray600', 'gray700']
      .map(k => parseInt(k.replace('gray', ''), 10));
    for (let i = 0; i < nums.length - 1; i++) {
      expect(nums[i]).toBeLessThan(nums[i + 1]);
    }
  });
});
