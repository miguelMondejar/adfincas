import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { WHATSAPP_URL, PHONE_FORMATTED } from "../data/constants";
import { trackEvent } from "../utils/analyticsConfig";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [pulse, setPulse] = useState(true);

  // Pulse animation timing
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", { source: "floating_button" });
    window.open(WHATSAPP_URL, "_blank");
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 5000);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Chat Bubble */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 md:left-8 bg-white rounded-2xl shadow-2xl p-6 w-80 md:w-96 z-40 animate-slideUp border-2 border-[--color-primary]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[--color-primary] to-[--color-secondary] rounded-full flex items-center justify-center text-white">
                <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">ADFincas</h3>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-800 transition text-xl"
              aria-label="Cerrar chat"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-700">
            <p className="mb-2 font-semibold text-gray-800">¿Cómo podemos ayudarte?</p>
            <p className="text-gray-600 mb-3">
              Contáctanos por WhatsApp para consultas sobre administración de fincas, mantenimiento técnico y asesoramiento legal.
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Responder tiempo: Generalmente dentro de 1 hora
            </p>
          </div>

          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-gradient-to-r from-[--color-primary] to-[#25d366] text-white py-3 rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
            Chatear ahora
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            {PHONE_FORMATTED}
          </p>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleToggle}
        aria-label="Abrir WhatsApp"
        className={`fixed bottom-6 left-6 md:left-8 z-50 transition-all duration-300 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
      >
        {/* Pulse Background */}
        {pulse && (
          <div className="absolute inset-0 bg-[#25d366] rounded-full animate-pulse opacity-75" />
        )}

        {/* Second Pulse Ring */}
        <div className="absolute inset-0 bg-[#25d366] rounded-full animate-ping opacity-20" />

        {/* Main Button */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-[--color-primary] to-[#25d366] rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl hover:scale-110 cursor-pointer text-white text-3xl border-4 border-white">
          <FontAwesomeIcon icon={faWhatsapp} />
        </div>

        {/* Label */}
        <div className="absolute -top-12 left-0 bg-white rounded-lg px-3 py-2 shadow-lg whitespace-nowrap text-xs font-bold text-gray-800 border-2 border-[--color-primary] hidden md:block">
          ¡Chatea con nosotros!
          <div className="absolute top-full left-2 w-2 h-2 bg-white border-r-2 border-b-2 border-[--color-primary] transform rotate-45" />
        </div>
      </button>

      {/* Tooltip Mobile */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </>
  );
}
