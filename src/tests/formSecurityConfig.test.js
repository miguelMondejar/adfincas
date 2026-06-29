/**
 * TESTS: formSecurityConfig.js
 * Importa el módulo real para medir coverage correctamente
 */
import {
  validateEmail,
  validatePhone,
  isHoneypotFilled,
  checkRateLimit,
  recordSubmission,
  validateContactForm,
  validateRealEstateForm,
  sanitizeInput,
} from '../utils/formSecurityConfig';

// ============================================================
// validateEmail
// ============================================================
describe('validateEmail', () => {
  test('acepta email válido estándar', () => {
    expect(validateEmail('usuario@ejemplo.com')).toBe(true);
  });

  test('acepta email con subdominio', () => {
    expect(validateEmail('info@grupoadfincas.es')).toBe(true);
  });

  test('acepta email con puntos y alias', () => {
    expect(validateEmail('mi.nombre+tag@correo-empresa.org')).toBe(true);
  });

  test('rechaza email sin arroba', () => {
    expect(validateEmail('usuarioejemplo.com')).toBe(false);
  });

  test('rechaza email sin dominio', () => {
    expect(validateEmail('usuario@')).toBe(false);
  });

  test('rechaza email sin usuario', () => {
    expect(validateEmail('@ejemplo.com')).toBe(false);
  });

  test('rechaza cadena vacía', () => {
    expect(validateEmail('')).toBe(false);
  });

  test('rechaza email con espacios', () => {
    expect(validateEmail('usuario @ejemplo.com')).toBe(false);
  });
});

// ============================================================
// validatePhone
// ============================================================
describe('validatePhone', () => {
  test('acepta teléfono español con prefijo', () => {
    expect(validatePhone('+34 610 61 27 10')).toBe(true);
  });

  test('acepta teléfono sin prefijo', () => {
    expect(validatePhone('610612710')).toBe(true);
  });

  test('acepta teléfono con guiones', () => {
    expect(validatePhone('610-61-27-10')).toBe(true);
  });

  test('acepta teléfono con paréntesis', () => {
    expect(validatePhone('(610) 612 710')).toBe(true);
  });

  test('rechaza teléfono muy corto', () => {
    expect(validatePhone('12345')).toBe(false);
  });

  test('rechaza cadena vacía', () => {
    expect(validatePhone('')).toBe(false);
  });

  test('rechaza texto con letras', () => {
    expect(validatePhone('telefono')).toBe(false);
  });
});

// ============================================================
// isHoneypotFilled
// ============================================================
describe('isHoneypotFilled', () => {
  test('detecta campo honeypot con texto', () => {
    expect(isHoneypotFilled('bot@spam.com')).toBe(true);
  });

  test('no detecta honeypot con solo espacios', () => {
    expect(isHoneypotFilled('   ')).toBeFalsy();
  });

  test('no detecta honeypot con string vacío', () => {
    expect(isHoneypotFilled('')).toBeFalsy();
  });

  test('no detecta honeypot con undefined', () => {
    expect(isHoneypotFilled(undefined)).toBeFalsy();
  });

  test('no detecta honeypot con null', () => {
    expect(isHoneypotFilled(null)).toBeFalsy();
  });
});

// ============================================================
// checkRateLimit + recordSubmission
// ============================================================
describe('checkRateLimit', () => {
  test('permite el primer envío (localStorage vacío)', () => {
    const result = checkRateLimit();
    expect(result.allowed).toBe(true);
  });

  test('permite hasta 2 envíos previos', () => {
    recordSubmission();
    recordSubmission();
    expect(checkRateLimit().allowed).toBe(true);
  });

  test('bloquea tras alcanzar el límite de 3 envíos', () => {
    recordSubmission();
    recordSubmission();
    recordSubmission();
    expect(checkRateLimit().allowed).toBe(false);
  });

  test('el mensaje de bloqueo incluye minutos de espera', () => {
    recordSubmission();
    recordSubmission();
    recordSubmission();
    expect(checkRateLimit().message).toMatch(/minutos/);
  });

  test('ignora envíos fuera de la ventana de 15 minutos', () => {
    const oldTime = Date.now() - 16 * 60 * 1000;
    localStorage.setItem('form_submissions', JSON.stringify([oldTime, oldTime, oldTime]));
    expect(checkRateLimit().allowed).toBe(true);
  });
});

describe('recordSubmission', () => {
  test('guarda un envío en localStorage', () => {
    recordSubmission();
    const stored = JSON.parse(localStorage.getItem('form_submissions'));
    expect(stored).toHaveLength(1);
  });

  test('acumula múltiples envíos', () => {
    recordSubmission();
    recordSubmission();
    const stored = JSON.parse(localStorage.getItem('form_submissions'));
    expect(stored).toHaveLength(2);
  });

  test('guarda timestamps numéricos', () => {
    recordSubmission();
    const stored = JSON.parse(localStorage.getItem('form_submissions'));
    expect(typeof stored[0]).toBe('number');
  });
});

// ============================================================
// validateContactForm
// ============================================================
describe('validateContactForm', () => {
  const validData = {
    name: 'Juan García',
    email: 'juan@ejemplo.com',
    phone: '610612710',
    message: 'Me gustaría más información sobre sus servicios.',
  };

  test('no retorna errores con datos válidos', () => {
    expect(Object.keys(validateContactForm(validData))).toHaveLength(0);
  });

  test('error si nombre está vacío', () => {
    expect(validateContactForm({ ...validData, name: '' }).name).toBeDefined();
  });

  test('error si nombre tiene menos de 2 caracteres', () => {
    expect(validateContactForm({ ...validData, name: 'A' }).name).toMatch(/2 caracteres/);
  });

  test('error si email está vacío', () => {
    expect(validateContactForm({ ...validData, email: '' }).email).toBeDefined();
  });

  test('error si email es inválido', () => {
    expect(validateContactForm({ ...validData, email: 'noesvalido' }).email).toMatch(/válido/);
  });

  test('error si teléfono está vacío', () => {
    expect(validateContactForm({ ...validData, phone: '' }).phone).toBeDefined();
  });

  test('error si mensaje está vacío', () => {
    expect(validateContactForm({ ...validData, message: '' }).message).toBeDefined();
  });

  test('error si mensaje tiene menos de 10 caracteres', () => {
    expect(validateContactForm({ ...validData, message: 'Corto' }).message).toMatch(/10 caracteres/);
  });

  test('detecta múltiples errores simultáneos', () => {
    const errors = validateContactForm({ name: '', email: '', phone: '', message: '' });
    expect(Object.keys(errors)).toHaveLength(4);
  });
});

// ============================================================
// validateRealEstateForm
// ============================================================
describe('validateRealEstateForm', () => {
  const validData = {
    ownerName: 'María López',
    ownerEmail: 'maria@ejemplo.com',
    ownerPhone: '612345678',
    location: 'Madrid, Centro',
  };

  test('no retorna errores con datos válidos', () => {
    expect(Object.keys(validateRealEstateForm(validData))).toHaveLength(0);
  });

  test('error si ownerName está vacío', () => {
    expect(validateRealEstateForm({ ...validData, ownerName: '' }).ownerName).toBeDefined();
  });

  test('error si ownerName tiene menos de 2 caracteres', () => {
    expect(validateRealEstateForm({ ...validData, ownerName: 'A' }).ownerName).toMatch(/2 caracteres/);
  });

  test('error si ownerEmail es inválido', () => {
    expect(validateRealEstateForm({ ...validData, ownerEmail: 'noesvalido' }).ownerEmail).toMatch(/válido/);
  });

  test('error si ownerPhone es inválido', () => {
    expect(validateRealEstateForm({ ...validData, ownerPhone: '123' }).ownerPhone).toBeDefined();
  });

  test('error si location está vacía', () => {
    expect(validateRealEstateForm({ ...validData, location: '' }).location).toBeDefined();
  });

  test('location con solo espacios genera error', () => {
    expect(validateRealEstateForm({ ...validData, location: '   ' }).location).toBeDefined();
  });
});

// ============================================================
// sanitizeInput
// ============================================================
describe('sanitizeInput', () => {
  test('devuelve el input limpio sin caracteres HTML', () => {
    const result = sanitizeInput('Hola mundo');
    expect(result).toBe('Hola mundo');
  });

  test('escapa caracteres HTML peligrosos', () => {
    const result = sanitizeInput('<script>alert("xss")</script>');
    expect(result).not.toContain('<script>');
  });

  test('devuelve el valor sin modificar si no es string', () => {
    expect(sanitizeInput(42)).toBe(42);
    expect(sanitizeInput(null)).toBe(null);
  });

  test('acepta cadena vacía sin error', () => {
    expect(sanitizeInput('')).toBe('');
  });
});
