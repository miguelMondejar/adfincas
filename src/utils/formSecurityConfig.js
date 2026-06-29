/**
 * Form Security & Validation Configuration
 * Centralizes security measures for all forms
 */

// ==================== EMAIL VALIDATION ====================
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ==================== PHONE VALIDATION ====================
export const validatePhone = (phone) => {
  // Acepta números con espacios, guiones, paréntesis
  const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// ==================== HONEYPOT VALIDATION ====================
// Campo invisible anti-spam que los bots llenan pero los humanos no
export const isHoneypotFilled = (honeypotValue) => {
  return honeypotValue && honeypotValue.trim().length > 0;
};

// ==================== RATE LIMITING ====================
// Previene múltiples envíos en corto tiempo
const RATE_LIMIT_KEY = 'form_submissions';
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutos
const MAX_SUBMISSIONS = 3; // máximo 3 envíos por ventana

export const checkRateLimit = () => {
  try {
    const submissions = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]');
    const now = Date.now();
    
    // Limpiar envíos antiguos fuera de la ventana
    const recentSubmissions = submissions.filter(time => now - time < RATE_LIMIT_WINDOW);
    
    if (recentSubmissions.length >= MAX_SUBMISSIONS) {
      const oldestTime = recentSubmissions[0];
      const waitTime = Math.ceil((RATE_LIMIT_WINDOW - (now - oldestTime)) / 1000 / 60);
      return {
        allowed: false,
        message: `Por favor espera ${waitTime} minutos antes de enviar otro formulario`,
      };
    }
    
    return { allowed: true };
  } catch (error) {
    console.error('Rate limit check error:', error);
    return { allowed: true };
  }
};

export const recordSubmission = () => {
  try {
    const submissions = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]');
    submissions.push(Date.now());
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(submissions));
  } catch (error) {
    console.error('Recording submission error:', error);
  }
};

// ==================== RECAPTCHA v3 ====================
export const RECAPTCHA_PUBLIC_KEY = import.meta.env.VITE_RECAPTCHA_PUBLIC_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
// Solo activo en producción - evita errores de dominio en localhost
const IS_PRODUCTION = import.meta.env.PROD;
export const USE_RECAPTCHA = IS_PRODUCTION && import.meta.env.VITE_REACT_APP_USE_RECAPTCHA === 'true';

export const executeRecaptcha = async (action) => {
  if (!window.grecaptcha || !USE_RECAPTCHA) {
    return null;
  }

  try {
    const token = await window.grecaptcha.execute(RECAPTCHA_PUBLIC_KEY, { action });
    return token;
  } catch (error) {
    console.error('reCAPTCHA error:', error);
    return null;
  }
};

// ==================== COMPREHENSIVE FORM VALIDATION ====================
export const validateContactForm = (data) => {
  const errors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'El nombre es requerido';
  } else if (data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  }

  if (!data.email || !data.email.trim()) {
    errors.email = 'El email es requerido';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Ingresa un email válido';
  }

  if (!data.phone || !data.phone.trim()) {
    errors.phone = 'El teléfono es requerido';
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Ingresa un teléfono válido';
  }

  if (!data.message || !data.message.trim()) {
    errors.message = 'El mensaje es requerido';
  } else if (data.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  }

  return errors;
};

export const validateRealEstateForm = (data) => {
  const errors = {};

  if (!data.ownerName || !data.ownerName.trim()) {
    errors.ownerName = 'El nombre es requerido';
  } else if (data.ownerName.trim().length < 2) {
    errors.ownerName = 'El nombre debe tener al menos 2 caracteres';
  }

  if (!data.ownerEmail || !data.ownerEmail.trim()) {
    errors.ownerEmail = 'El email es requerido';
  } else if (!validateEmail(data.ownerEmail)) {
    errors.ownerEmail = 'Ingresa un email válido';
  }

  if (!data.ownerPhone || !data.ownerPhone.trim()) {
    errors.ownerPhone = 'El teléfono es requerido';
  } else if (!validatePhone(data.ownerPhone)) {
    errors.ownerPhone = 'Ingresa un teléfono válido';
  }

  if (!data.location || !data.location.trim()) {
    errors.location = 'La ubicación es requerida';
  }

  return errors;
};

// ==================== ANTI-XSS SANITIZATION ====================
// Previene inyecciones de scripts
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  const element = document.createElement('div');
  element.textContent = input;
  return element.innerHTML;
};

// ==================== RECAPTCHA SCRIPT LOADER ====================
export const loadRecaptchaScript = () => {
  if (!USE_RECAPTCHA) return;
  
  if (window.grecaptcha) return; // Ya cargado

  // No cargar en desarrollo local
  if (!USE_RECAPTCHA) return;

  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_PUBLIC_KEY}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};
