import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faPaperPlane, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faFacebook, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { PHONE_LINK, PHONE_FORMATTED, WHATSAPP_URL, SOCIAL_LINKS, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_CONFIRMATION_TEMPLATE_ID, EMAIL } from "../data/constants";
import { validateContactForm, checkRateLimit, recordSubmission, isHoneypotFilled, sanitizeInput, executeRecaptcha } from "../utils/formSecurityConfig";
import HoneypotField from "./HoneypotField";
import emailjs from "@emailjs/browser";
import { trackEvent } from "../utils/analyticsConfig";

// Inicializar EmailJS
if (EMAILJS_SERVICE_ID !== "service_xxxxxxxxxxxx") {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "", // Honeypot field
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setErrors({});

    try {
      // ==================== SECURITY CHECKS ====================
      
      // 1. Check honeypot - si está lleno, es un bot
      if (isHoneypotFilled(formData.website)) {
        trackEvent("spam_detected", { form: "contact_honeypot" });
        // Mostrar mensaje de éxito falso para no revelar el honeypot
        setSubmitted(true);
        setTimeout(() => {
          setFormData({ name: "", email: "", phone: "", message: "", website: "" });
          setSubmitted(false);
        }, 3000);
        return;
      }

      // 2. Check rate limiting
      const rateLimitCheck = checkRateLimit();
      if (!rateLimitCheck.allowed) {
        setError(rateLimitCheck.message);
        setLoading(false);
        trackEvent("rate_limit_exceeded", { form: "contact" });
        return;
      }

      // 3. Validar formulario
      const validationErrors = validateContactForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      }

      // 4. Execute reCAPTCHA v3
      const recaptchaToken = await executeRecaptcha('contact_form_submit');
      if (recaptchaToken) {
        trackEvent("recaptcha_token_generated", { form: "contact", token: recaptchaToken.substring(0, 20) + "..." });
      }

      // ==================== SEND EMAIL ====================
      if (EMAILJS_SERVICE_ID === "service_xxxxxxxxxxxx") {
        // Modo demo
        console.log("Datos del contacto (modo demo):", formData);
        setSubmitted(true);
        recordSubmission();
        trackEvent("contact_form_submit", { mode: "demo" });
      } else {
        // Sanitizar datos antes de enviar
        const sanitizedData = {
          from_name: sanitizeInput(formData.name),
          from_email: sanitizeInput(formData.email),
          from_phone: sanitizeInput(formData.phone),
          message: sanitizeInput(formData.message),
          to_email: EMAIL,
        };

        // Enviar con EmailJS
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          sanitizedData
        );

        // Enviar confirmación al usuario si está configurado
        if (EMAILJS_CONFIRMATION_TEMPLATE_ID !== "template_xxxxxxxxxxxx") {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_CONFIRMATION_TEMPLATE_ID,
            {
              to_email: formData.email,
              from_name: sanitizeInput(formData.name),
              message: sanitizeInput(formData.message),
            }
          );
        }
        
        setSubmitted(true);
        recordSubmission(); // Registrar envío para rate limiting
        trackEvent("contact_form_submit", { mode: "production" });
      }

      // Resetear formulario
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "", message: "", website: "" });
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Error al enviar contacto:", err);
      setError("Error al enviar el mensaje. Por favor, intenta de nuevo.");
      trackEvent("contact_form_error", { error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-white text-center" id="contacto" aria-labelledby="contacto-title">
      <div className="max-w-6xl mx-auto">
        <h2 id="contacto-title" className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">Contacto</h2>
        <div className="w-24 h-1 bg-[--color-secondary] mx-auto mb-6 rounded-full"></div>
        <p className="mb-12 text-gray-600 text-lg md:text-xl">
          Ponte en contacto con nosotros para resolver tus dudas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="flex flex-col justify-start">
            <h3 className="text-2xl font-bold text-[--color-primary] mb-8 text-left">Información de Contacto</h3>

            <div className="space-y-6 text-left">
              {/* Phone */}
              <a
                href={PHONE_LINK}
                className="flex items-center gap-4 text-[--color-primary] text-lg font-semibold hover:text-[--color-secondary] transition"
                aria-label={`Llamar a ADFincas al ${PHONE_FORMATTED}`}
              >
                <div className="w-12 h-12 bg-[--color-primary] rounded-full flex items-center justify-center text-white">
                  <FontAwesomeIcon icon={faPhoneAlt} />
                </div>
                <span>{PHONE_FORMATTED}</span>
              </a>

              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-[--color-primary] text-lg font-semibold hover:text-[--color-secondary] transition"
                aria-label="Abrir WhatsApp con ADFincas"
              >
                <div className="w-12 h-12 bg-[--color-primary] rounded-full flex items-center justify-center text-white">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </div>
                <span>WhatsApp</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="flex items-center gap-4 text-[--color-primary] text-lg font-semibold hover:text-[--color-secondary] transition"
                aria-label={`Enviar email a ADFincas: ${SOCIAL_LINKS.email}`}
              >
                <div className="w-12 h-12 bg-[--color-primary] rounded-full flex items-center justify-center text-white">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </div>
                <span>{SOCIAL_LINKS.email}</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <h4 className="text-lg font-bold text-[#1A1A1A] mb-4 text-left">Síguenos</h4>
              <div className="flex gap-6 text-3xl">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition"
                  aria-label="ADFincas en Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-700 transition"
                  aria-label="ADFincas en Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900 transition"
                  aria-label="ADFincas en LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-6">Envíanos un Mensaje</h3>

            {submitted ? (
              <div className="bg-green-100 border-l-4 border-[--color-primary] p-6 rounded">
                <p className="text-green-700 font-semibold">¡Gracias por tu mensaje!</p>
                <p className="text-green-600 text-sm mt-2">Nos pondremos en contacto pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-red-700 text-sm flex items-center gap-2">
                      <FontAwesomeIcon icon={faExclamationCircle} className="text-xs" />
                      {error}
                    </p>
                  </div>
                )}

                {/* Honeypot field - invisible to users */}
                <HoneypotField value={formData.website} onChange={handleInputChange} />

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#1A1A1A] mb-2 text-left">
                    Nombre *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    required
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full px-4 py-2 rounded border-2 transition text-[#1A1A1A] focus:outline-none ${
                      errors.name
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-gray-300 focus:border-[--color-primary]"
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <FontAwesomeIcon icon={faExclamationCircle} className="text-xs" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-2 text-left">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    required
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full px-4 py-2 rounded border-2 transition text-[#1A1A1A] focus:outline-none ${
                      errors.email
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-gray-300 focus:border-[--color-primary]"
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <FontAwesomeIcon icon={faExclamationCircle} className="text-xs" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#1A1A1A] mb-2 text-left">
                    Teléfono *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+34 610 61 27 10"
                    required
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={`w-full px-4 py-2 rounded border-2 transition text-[#1A1A1A] focus:outline-none ${
                      errors.phone
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-gray-300 focus:border-[--color-primary]"
                    }`}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <FontAwesomeIcon icon={faExclamationCircle} className="text-xs" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#1A1A1A] mb-2 text-left">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos tu consulta..."
                    rows="4"
                    required
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`w-full px-4 py-2 rounded border-2 transition text-[#1A1A1A] focus:outline-none resize-none ${
                      errors.message
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-gray-300 focus:border-[--color-primary]"
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <FontAwesomeIcon icon={faExclamationCircle} className="text-xs" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[--color-primary] hover:bg-[--color-secondary] text-white font-bold py-3 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </form>
            )}

            <p className="text-xs text-gray-500 mt-4">
              Los campos marcados con * son obligatorios
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
