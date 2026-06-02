import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { SECTIONS } from "../data/constants";
import { SERVICES_DATA } from "../data/services";
import { trackEvent } from "../utils/analyticsConfig";

export default function Services() {
  const services = SERVICES_DATA;

  const handleCTA = (serviceName) => {
    trackEvent("service_cta_click", { service: serviceName });
    document.querySelector(`#${SECTIONS.realEstate}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 px-6 bg-gray-50" id="servicios">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">Servicios</h2>
        <div className="w-24 h-1 bg-[--color-secondary] mx-auto mb-6 rounded-full"></div>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Ofrecemos soluciones integrales para la administración de fincas y servicios inmobiliarios
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition flex flex-col items-center h-full group hover:border-t-4 hover:border-t-[--color-primary]"
            >
              <div className="w-16 h-16 bg-[--color-primary] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <FontAwesomeIcon icon={s.icon} className="text-3xl text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-[#1A1A1A]">{s.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{s.desc}</p>
              {s.details && (
                <ul className="text-gray-600 text-sm md:text-base list-disc list-inside text-left w-full mb-6">
                  {s.details.map((d, j) => (
                    <li key={j} className="mb-2">{d}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[--color-primary] to-[--color-secondary] rounded-lg p-10 shadow-lg text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-8">¿Por qué elegirnos?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur">
              <p className="font-bold text-lg mb-2">📌 Experiencia</p>
              <p className="text-gray-100">Años de trayectoria probada en el sector inmobiliario español</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur">
              <p className="font-bold text-lg mb-2">👥 Profesionalismo</p>
              <p className="text-gray-100">Equipo cualificado y dedicado a tu satisfacción</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur">
              <p className="font-bold text-lg mb-2">🔒 Confianza</p>
              <p className="text-gray-100">Transparencia total y resultados garantizados</p>
            </div>
          </div>

          <button
            onClick={() => handleCTA("General")}
            className="bg-white text-[--color-primary] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition flex items-center gap-3 text-lg shadow-lg hover:shadow-2xl hover:scale-105 duration-300 mx-auto"
          >
            Solicitar Presupuesto Gratuito
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </section>
  );
}