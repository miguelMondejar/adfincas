import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";

export default function FAQ() {
  const [expandedId, setExpandedId] = useState(null);

  // FAQ Schema.org data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué servicios ofrece Grupo ADFincas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ofrecemos administración de fincas, gestión contable, mantenimiento técnico, asesoramiento legal y servicios de inscripción de propiedades inmobiliarias."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es el costo de los servicios de administración de fincas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El costo varía según el tipo de propiedad, número de unidades y servicios requeridos. Ofrecemos presupuestos personalizados sin compromiso. Contáctenos para obtener una evaluación gratuita."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo puedo cambiar de administrador de fincas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El cambio de administrador requiere una votación en la asamblea de propietarios. Nosotros nos encargamos de toda la tramitación legal y la transición de documentos y registros."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué zonas de España cubre Grupo ADFincas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Actuamos principalmente en Sevilla, Málaga y alrededores, aunque contamos con redes de colaboradores en otras regiones para servicios especializados."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo ver un desglose detallado de gastos de mi finca?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutamente. Proporcionamos reportes mensuales detallados con desglose de todos los gastos, ingresos y reservas. Acceso a través de nuestro portal en línea."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué documentación necesito para solicitar vuestros servicios?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Necesitamos la documentación actual de la finca (escrituras, acta de constitución, presupuestos anteriores) y acta de la asamblea aprobando el cambio de gestor."
        }
      },
      {
        "@type": "Question",
        "name": "¿Ofrecen asesoramiento legal en temas de comunidad de propietarios?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, contamos con asesores legales especializados en derecho inmobiliario y comunitario. Ofrecemos consultoría sobre conflictos entre vecinos, derechos y obligaciones."
        }
      },
    ]
  };

  const faqs = [
    {
      id: 1,
      question: "¿Qué servicios ofrece Grupo ADFincas?",
      answer: "Ofrecemos administración de fincas, gestión contable, mantenimiento técnico, asesoramiento legal y servicios de inscripción de propiedades inmobiliarias.",
      category: "servicios"
    },
    {
      id: 2,
      question: "¿Cuál es el costo de los servicios de administración de fincas?",
      answer: "El costo varía según el tipo de propiedad, número de unidades y servicios requeridos. Ofrecemos presupuestos personalizados sin compromiso. Contáctenos para obtener una evaluación gratuita.",
      category: "precios"
    },
    {
      id: 3,
      question: "¿Cómo puedo cambiar de administrador de fincas?",
      answer: "El cambio de administrador requiere una votación en la asamblea de propietarios. Nosotros nos encargamos de toda la tramitación legal y la transición de documentos y registros.",
      category: "tramites"
    },
    {
      id: 5,
      question: "¿Qué zonas de España cubre Grupo ADFincas?",
      answer: "Actuamos principalmente en Sevilla, Málaga y alrededores, aunque contamos con redes de colaboradores en otras regiones para servicios especializados.",
      category: "cobertura"
    },
    {
      id: 6,
      question: "¿Puedo ver un desglose detallado de gastos de mi finca?",
      answer: "Absolutamente. Proporcionamos reportes mensuales detallados con desglose de todos los gastos, ingresos y reservas. Acceso a través de nuestro portal en línea.",
      category: "reportes"
    },
    {
      id: 7,
      question: "¿Qué documentación necesito para solicitar vuestros servicios?",
      answer: "Necesitamos la documentación actual de la finca (escrituras, acta de constitución, presupuestos anteriores) y acta de la asamblea aprobando el cambio de gestor.",
      category: "tramites"
    },
    {
      id: 8,
      question: "¿Ofrecen asesoramiento legal en temas de comunidad de propietarios?",
      answer: "Sí, contamos con asesores legales especializados en derecho inmobiliario y comunitario. Ofrecemos consultoría sobre conflictos entre vecinos, derechos y obligaciones.",
      category: "legal"
    },
  ];

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <section className="py-20 px-6 bg-gray-50" id="faq" aria-labelledby="faq-title">
        <div className="max-w-4xl mx-auto">
          <h2 id="faq-title" className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#1A1A1A]">
            Preguntas Frecuentes
          </h2>
          <div className="w-24 h-1 bg-[--color-secondary] mx-auto mb-12 rounded-full"></div>
          <p className="text-center text-gray-600 text-lg mb-12">
            Resolvemos las dudas más comunes sobre nuestros servicios de administración de fincas.
          </p>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-lg border-2 border-gray-200 transition hover:border-[--color-primary]"
              >
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
                  aria-expanded={expandedId === faq.id}
                  aria-controls={`answer-${faq.id}`}
                >
                  <h3 className="font-semibold text-[#1A1A1A] text-lg flex-1">
                    {faq.question}
                  </h3>
                  <div className="text-[--color-primary] ml-4 flex-shrink-0">
                    <FontAwesomeIcon
                      icon={expandedId === faq.id ? faMinus : faPlus}
                      className="text-xl transition"
                    />
                  </div>
                </button>

                {expandedId === faq.id && (
                  <div
                    id={`answer-${faq.id}`}
                    className="px-6 py-4 bg-gray-50 border-t-2 border-gray-200"
                  >
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-r from-[--color-primary] to-[--color-secondary] rounded-lg text-white text-center">
            <h3 className="text-2xl font-bold mb-2">¿No encontraste tu respuesta?</h3>
            <p className="mb-6">Contacta directamente con nuestro equipo de expertos</p>
            <a
              href="#contacto"
              className="inline-block bg-white text-[--color-primary] px-8 py-3 rounded font-bold hover:bg-gray-100 transition"
            >
              Contáctanos Ahora
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
