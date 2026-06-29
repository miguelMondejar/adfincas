import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { REAL_ESTATE_SERVICES } from "../data/realEstateServices";
import emailjs from "@emailjs/browser";
import { trackEvent } from "../utils/analyticsConfig";
import { EMAIL, EMAILJS_SERVICE_ID, EMAILJS_CONFIRMATION_TEMPLATE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from "../data/constants";
import { validateRealEstateForm, checkRateLimit, recordSubmission, isHoneypotFilled, sanitizeInput, executeRecaptcha } from "../utils/formSecurityConfig";
import HoneypotField from "./HoneypotField";

// Inicializar EmailJS
if (EMAILJS_SERVICE_ID !== "service_xxxxxxxxxxxx") {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

const PROPERTY_TYPES = [
  { value: "vivienda", label: "Vivienda" },
  { value: "local", label: "Local Comercial" },
  { value: "garage", label: "Garaje" },
  { value: "terreno", label: "Terreno" },
  { value: "otro", label: "Otro" },
];

const validateForm = (data) => {
  return validateRealEstateForm(data);
};

const FormInput = ({ label, name, type = "text", placeholder, required = false, value, onChange, error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold mb-2 text-white">
      {label} {required && <span className="text-yellow-300">*</span>}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-4 py-3 rounded border-2 text-[#1A1A1A] transition ${
        error
          ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
          : "border-transparent bg-white focus:outline-none focus:border-yellow-300"
      }`}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && (
      <p id={`${name}-error`} className="text-red-200 text-sm mt-1 flex items-center gap-1">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-xs" />
        {error}
      </p>
    )}
  </div>
);

export default function RealEstate() {
  const [formData, setFormData] = useState({
    propertyType: "vivienda",
    location: "",
    area: "",
    rooms: "",
    bathrooms: "",
    description: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    website: "", // Honeypot field
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

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
    setFormError("");
    trackEvent("realestate_form_submit_attempt", { property_type: formData.propertyType });
    
    // ==================== SECURITY CHECKS ====================
    
    // 1. Check honeypot
    if (isHoneypotFilled(formData.website)) {
      trackEvent("spam_detected", { form: "realestate_honeypot" });
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          propertyType: "vivienda",
          location: "",
          area: "",
          rooms: "",
          bathrooms: "",
          description: "",
          ownerName: "",
          ownerPhone: "",
          ownerEmail: "",
          website: "",
        });
        setSubmitted(false);
      }, 3000);
      return;
    }

    // 2. Check rate limiting
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setFormError(rateLimitCheck.message);
      trackEvent("rate_limit_exceeded", { form: "realestate" });
      return;
    }

    // 3. Validar formulario
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // 4. Execute reCAPTCHA v3
    const recaptchaToken = await executeRecaptcha('realestate_form_submit');
    if (recaptchaToken) {
      trackEvent("recaptcha_token_generated", { form: "realestate", token: recaptchaToken.substring(0, 20) + "..." });
    }

    setLoading(true);
    setErrors({});

    try {
      if (EMAILJS_SERVICE_ID === "service_xxxxxxxxxxxx") {
        // Modo demo
        console.log("Datos del formulario (modo demo):", formData);
        setSubmitted(true);
        recordSubmission();
        trackEvent("realestate_form_submit", { mode: "demo" });
      } else {
        // Sanitizar datos
        const sanitizedData = {
          to_email: EMAIL,
          property_type: PROPERTY_TYPES.find(t => t.value === formData.propertyType)?.label || formData.propertyType,
          location: sanitizeInput(formData.location),
          area: formData.area ? sanitizeInput(formData.area) : "No especificado",
          rooms: formData.rooms ? sanitizeInput(formData.rooms) : "No especificado",
          bathrooms: formData.bathrooms ? sanitizeInput(formData.bathrooms) : "No especificado",
          description: formData.description ? sanitizeInput(formData.description) : "Sin descripción adicional",
          owner_name: sanitizeInput(formData.ownerName),
          owner_phone: sanitizeInput(formData.ownerPhone),
          owner_email: sanitizeInput(formData.ownerEmail),
        };

        // 1. Enviar correo a grupoadfincas con todos los detalles
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          sanitizedData
        );

        // 2. Enviar correo de confirmación al usuario
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_CONFIRMATION_TEMPLATE_ID,
          {
            to_email: formData.ownerEmail,
            owner_name: sanitizeInput(formData.ownerName),
            property_type: PROPERTY_TYPES.find(t => t.value === formData.propertyType)?.label || formData.propertyType,
            location: sanitizeInput(formData.location),
            area: formData.area ? sanitizeInput(formData.area) : "No especificado",
            rooms: formData.rooms ? sanitizeInput(formData.rooms) : "No especificado",
            bathrooms: formData.bathrooms ? sanitizeInput(formData.bathrooms) : "No especificado",
            description: formData.description ? sanitizeInput(formData.description) : "Sin descripción adicional",
            owner_phone: sanitizeInput(formData.ownerPhone),
            owner_email: sanitizeInput(formData.ownerEmail),
          }
        );

        setSubmitted(true);
        recordSubmission();
        trackEvent("realestate_form_submit", { mode: "production" });
      }

      // Resetear formulario después de 4 segundos
      setTimeout(() => {
        setFormData({
          propertyType: "vivienda",
          location: "",
          area: "",
          rooms: "",
          bathrooms: "",
          description: "",
          ownerName: "",
          ownerPhone: "",
          ownerEmail: "",
        });
        setSubmitted(false);
      }, 4000);
    } catch (err) {
      console.error("Error al enviar formulario:", err);
      setErrors({
        submit: "No pudimos enviar tu solicitud. Por favor, intenta de nuevo más tarde o contacta directamente a " + EMAIL
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="inmobiliaria" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Servicios Inmobiliarios
          </h2>
          <div className="w-24 h-1 bg-[--color-secondary] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Expertos en compra, venta y gestión de propiedades inmobiliarias
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          {REAL_ESTATE_SERVICES.map((service, index) => (
            <div
              key={index}
              className="p-8 bg-gray-50 rounded-lg hover:shadow-lg transition border-l-4 border-[--color-primary]"
            >
              <div className="w-12 h-12 bg-[--color-primary] rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={service.icon} className="text-xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.desc}</p>
              <ul className="text-gray-600 text-sm space-y-2">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[--color-secondary] mr-2">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Form Section */}
        <div className="bg-gradient-to-r from-[--color-primary] to-[--color-secondary] rounded-lg p-8 md:p-12 text-white shadow-xl">
          <div className="mb-8">
            <h3 className="text-3xl font-bold mb-2 text-center">¿Tienes un inmueble?</h3>
            <p className="text-center text-lg opacity-95">
              Completa el formulario y nos pondremos en contacto para ofrecerte una valoración profesional
            </p>
          </div>

          {submitted ? (
            <div className="max-w-2xl mx-auto bg-green-600 bg-opacity-90 p-8 rounded-lg text-center animate-fade-in">
              <FontAwesomeIcon icon={faCheckCircle} className="text-5xl mb-4" />
              <p className="text-2xl font-bold mb-2">¡Solicitud Recibida!</p>
              <p className="text-lg opacity-95 mb-3">
                Hemos recibido tu solicitud correctamente
              </p>
              <p className="text-sm opacity-85">
                Te enviaremos un email de confirmación a <span className="font-semibold">{formData.ownerEmail}</span>
              </p>
              <p className="text-sm opacity-85 mt-3">
                Nos pondremos en contacto en las próximas 24 horas
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              {/* Error general */}
              {(errors.submit || formError) && (
                <div className="bg-red-600 bg-opacity-90 p-4 rounded-lg mb-6 flex items-center gap-3">
                  <FontAwesomeIcon icon={faExclamationCircle} className="text-xl flex-shrink-0" />
                  <p className="text-sm">{errors.submit || formError}</p>
                </div>
              )}

              {/* Información de Contacto */}
              <div className="mb-8 pb-8 border-b border-white border-opacity-30">
                <h4 className="text-xl font-bold mb-6">Tu Información de Contacto</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Nombre Completo"
                    name="ownerName"
                    placeholder="Juan Pérez García"
                    required
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    error={errors.ownerName}
                  />
                  <FormInput
                    label="Email"
                    name="ownerEmail"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    value={formData.ownerEmail}
                    onChange={handleInputChange}
                    error={errors.ownerEmail}
                  />
                  <FormInput
                    label="Teléfono"
                    name="ownerPhone"
                    type="tel"
                    placeholder="+34 6xx xxx xxx"
                    required
                    value={formData.ownerPhone}
                    onChange={handleInputChange}
                    error={errors.ownerPhone}
                  />
                </div>
              </div>

              {/* Información de la Propiedad */}
              <div className="mb-8 pb-8 border-b border-white border-opacity-30">
                <h4 className="text-xl font-bold mb-6">Detalles de la Propiedad</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-semibold mb-2 text-white">
                      Tipo de Propiedad <span className="text-yellow-300">*</span>
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded border-2 border-transparent bg-white text-[#1A1A1A] focus:outline-none focus:border-yellow-300 transition font-medium"
                    >
                      {PROPERTY_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <FormInput
                    label="Ubicación"
                    name="location"
                    placeholder="Dirección, ciudad, provincia..."
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    error={errors.location}
                  />

                  <FormInput
                    label="Área (m²)"
                    name="area"
                    type="number"
                    placeholder="Ej: 120"
                    value={formData.area}
                    onChange={handleInputChange}
                    error={errors.area}
                  />

                  <FormInput
                    label="Habitaciones"
                    name="rooms"
                    type="number"
                    placeholder="Ej: 3"
                    value={formData.rooms}
                    onChange={handleInputChange}
                    error={errors.rooms}
                  />

                  <FormInput
                    label="Baños"
                    name="bathrooms"
                    type="number"
                    placeholder="Ej: 2"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    error={errors.bathrooms}
                  />
                </div>
              </div>

              {/* Descripción Adicional */}
              <div className="mb-8">
                <label htmlFor="description" className="block text-sm font-semibold mb-2 text-white">
                  Descripción Adicional
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Cuéntanos más detalles: estado de la propiedad, características especiales, reformas realizadas, etc."
                  rows="4"
                  className="w-full px-4 py-3 rounded border-2 border-transparent bg-white text-[#1A1A1A] focus:outline-none focus:border-yellow-300 transition resize-none"
                />
                <p className="text-xs opacity-75 mt-2">
                  Estos detalles nos ayudarán a darte una mejor valoración
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-white to-yellow-50 text-[--color-primary] px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition disabled:opacity-60 disabled:cursor-not-allowed shadow-xl hover:scale-105 duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="inline-block animate-spin">⟳</span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Solicitud
                      <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs opacity-75 mt-6">
                Los campos marcados con <span className="text-yellow-300">*</span> son obligatorios
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

