import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faFacebook, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { PHONE_LINK, PHONE_FORMATTED, WHATSAPP_URL, SOCIAL_LINKS, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from "../data/constants";
import emailjs from "@emailjs/browser";

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
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (EMAILJS_SERVICE_ID === "service_xxxxxxxxxxxx") {
        // Modo demo
        console.log("Datos del contacto (modo demo):", formData);
        setSubmitted(true);
      } else {
        // Enviar con EmailJS
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            from_phone: formData.phone,
            message: formData.message,
            to_email: SOCIAL_LINKS.email,
          }
        );
        setSubmitted(true);
      }

      // Resetear formulario
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Error al enviar contacto:", err);
      setError("Error al enviar el mensaje. Por favor, intenta de nuevo.");
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
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2 text-left">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    required
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-[--color-primary]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2 text-left">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    required
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-[--color-primary]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2 text-left">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+34 6xx xxx xxx"
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-[--color-primary]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2 text-left">
                    Mensaje *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tu mensaje..."
                    rows="5"
                    required
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-[--color-primary] resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[--color-primary] text-white px-6 py-2 rounded font-semibold hover:bg-[--color-secondary] transition disabled:opacity-50"
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
