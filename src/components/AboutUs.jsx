import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faAward, faChartLine } from "@fortawesome/free-solid-svg-icons";
import img from "../assets/towfiqu-barbhuiya-05XcCfTOzN4-unsplash.jpg";
import colegiado from "../assets/logos/colegiado-badge.png";
import { SECTIONS } from "../data/constants";

export default function AboutUs() {
  const stats = [
    { icon: faAward, value: "5+", label: "Años de experiencia" },
    { icon: faUsers, value: "100+", label: "Propiedades gestionadas" },
    { icon: faChartLine, value: "98%", label: "Satisfacción de clientes" }
  ];

  return (
    <section
      id="quienes-somos"
      className="py-24 bg-gradient-to-b from-white via-[#F8FAF9] to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">
            Quiénes Somos
          </h2>
          <div className="w-24 h-1 bg-[--color-secondary] mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            En ADFincas, somos especialistas en administración de fincas y servicios inmobiliarios con más de una década de experiencia
          </p>
        </div>

        {/* Credentials Section - Compact */}
          <div className="flex justify-center mb-16">
          <div
            className="
              bg-white
              shadow-lg
              border
              border-[--color-secondary]/20
              rounded-2xl
              px-8
              py-5
              flex
              items-center
              gap-5
            "
          >
            <img src={colegiado} alt="Colegiado Badge" className="w-24 h-24" />
              <span className="text-[#1A1A1A] font-bold text-sm">
                Administrador de Fincas Colegiado
              </span>
            </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[--color-primary] mb-4">
                Nuestra Misión
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Proporcionar soluciones integrales en administración de fincas y servicios inmobiliarios con la máxima profesionalidad y transparencia. Nos comprometemos con la protección de los intereses de nuestros clientes.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Todas las propiedades merecen atención personalizada y una gestión experta. Por eso, nuestro equipo se dedica a optimizar la administración, minimizar costos y maximizar la rentabilidad.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[--color-primary] mb-4">
                Nuestros Valores
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[--color-secondary] mr-3">✓</span>
                  <span className="text-gray-700"><strong>Transparencia:</strong> Información clara y honesta en todas nuestras operaciones</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[--color-secondary] mr-3">✓</span>
                  <span className="text-gray-700"><strong>Profesionalidad:</strong> Equipo altamente cualificado y experimentado</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[--color-secondary] mr-3">✓</span>
                  <span className="text-gray-700"><strong>Confianza:</strong> Relaciones duraderas basadas en resultados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[--color-secondary] mr-3">✓</span>
                  <span className="text-gray-700"><strong>Innovación:</strong> Uso de tecnología para mejorar servicios</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Image Placeholder */}
          <div className="relative">
            <img
              src={img}
              alt="Equipo de ADFincas"
              className="
                rounded-3xl
                w-full
                h-[500px]
                object-cover
                shadow-2xl
                hover:scale-[1.02]
                transition-all
                duration-500
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/20
                to-transparent
                rounded-3xl
              "
            />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-[#F8FAF9] rounded-3xl p-12 mb-12">
          <h3 className="text-2xl font-bold text-center text-[#1A1A1A] mb-12">
            Nuestros Números
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[--color-primary] rounded-full mb-4">
                  <FontAwesomeIcon
                    icon={stat.icon}
                    className="text-white text-2xl"
                  />
                </div>
                <p className="text-3xl font-bold text-[--color-primary] mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600 text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
