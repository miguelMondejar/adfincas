import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faAward, faChartLine } from "@fortawesome/free-solid-svg-icons";
import img from "../assets/towfiqu-barbhuiya-05XcCfTOzN4-unsplash.jpg";

export default function AboutUs() {
  const stats = [
    { icon: faAward, value: "5+", label: "Años de experiencia" },
    { icon: faUsers, value: "100+", label: "Propiedades gestionadas" },
    { icon: faChartLine, value: "98%", label: "Satisfacción de clientes" }
  ];

  return (
    <section id="quienes-somos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">
            Quiénes Somos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            En ADFincas, somos especialistas en administración de fincas y servicios inmobiliarios con más de una década de experiencia
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-[#5AAD94] mb-4">
                Nuestra Misión
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Proporcionar soluciones integrales en administración de fincas y servicios inmobiliarios con la máxima profesionalidad y transparencia. Nos comprometemos con la protección de los intereses de nuestros clientes.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Cada propiedades merecen atención personalizada y gestión experta. Por eso, nuestro equipo se dedica a optimizar la administración, minimizar costos y maximizar la rentabilidad.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#5AAD94] mb-4">
                Nuestros Valores
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#A47C48] mr-3">✓</span>
                  <span className="text-gray-700"><strong>Transparencia:</strong> Información clara y honesta en todas nuestras operaciones</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A47C48] mr-3">✓</span>
                  <span className="text-gray-700"><strong>Profesionalidad:</strong> Equipo altamente cualificado y experimentado</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A47C48] mr-3">✓</span>
                  <span className="text-gray-700"><strong>Confianza:</strong> Relaciones duraderas basadas en resultados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A47C48] mr-3">✓</span>
                  <span className="text-gray-700"><strong>Innovación:</strong> Uso de tecnología para mejorar servicios</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Image Placeholder */}
          <div className="bg-gradient-to-br from-[#5AAD94] to-[#A47C48] rounded-lg overflow-hidden shadow-lg h-96 flex items-center justify-center">
            <img 
              src={img} 
              alt="Equipo de ADFincas" 
              className="rounded-lg overflow-hidden shadow-lg w-full h-auto" 
            />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gray-50 rounded-lg p-12">
          <h3 className="text-2xl font-bold text-center text-[#1A1A1A] mb-12">
            Nuestros Números
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5AAD94] rounded-full mb-4">
                  <FontAwesomeIcon
                    icon={stat.icon}
                    className="text-white text-2xl"
                  />
                </div>
                <p className="text-3xl font-bold text-[#5AAD94] mb-2">
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
