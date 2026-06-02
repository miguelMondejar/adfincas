import { useEffect } from "react";
import { COMPANY_NAME, COMPANY_FULL_NAME, EMAIL, PHONE_FORMATTED } from "../data/constants";

export default function LegalInfo() {
  useEffect(() => {
    // Scroll to specific section if hash is provided
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[--color-primary] to-[--color-secondary] text-white py-12 px-6 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Información Legal</h1>
          <p className="text-lg text-gray-100">
            Términos, políticas y avisos legales de {COMPANY_NAME}
          </p>
          <button
            onClick={() => window.location.href = "/"}
            className="mt-6 inline-flex items-center px-6 py-2 bg-white text-[--color-primary] rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            ← Volver a inicio
          </button>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="sticky top-0 bg-white border-b border-gray-200 z-10 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="#terminos" className="text-[--color-primary] hover:text-[--color-secondary] font-semibold">
              Términos de Servicio
            </a>
            <span className="text-gray-300">|</span>
            <a href="#privacidad" className="text-[--color-primary] hover:text-[--color-secondary] font-semibold">
              Política de Privacidad
            </a>
            <span className="text-gray-300">|</span>
            <a href="#aviso-legal" className="text-[--color-primary] hover:text-[--color-secondary] font-semibold">
              Aviso Legal
            </a>
            <span className="text-gray-300">|</span>
            <a href="#cookies" className="text-[--color-primary] hover:text-[--color-secondary] font-semibold">
              Política de Cookies
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Términos de Servicio */}
          <article id="terminos" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Términos de Servicio</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Estos términos de servicio regulan el acceso y uso del sitio web de {COMPANY_FULL_NAME}.
              </p>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">1. Aceptación de Términos</h3>
              <p>
                Al acceder y utilizar este sitio web, aceptas estar vinculado por estos términos y
                condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes usar
                este sitio web.
              </p>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">2. Licencia de Uso</h3>
              <p>
                Se te concede una licencia limitada, no exclusiva e intransferible para acceder y
                usar este sitio web únicamente con fines legales y de acuerdo con estos términos.
              </p>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">3. Renuncia de Responsabilidad</h3>
              <p>
                Este sitio web se proporciona "tal cual" sin garantías de ningún tipo, expresas o
                implícitas. {COMPANY_NAME} no garantiza la exactitud, integridad o utilidad de cualquier
                información contenida en este sitio.
              </p>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">4. Limitación de Responsabilidad</h3>
              <p>
                En ningún caso {COMPANY_NAME} será responsable por daños indirectos, incidentales,
                especiales o consecuentes que surjan del uso o la imposibilidad de usar este sitio web.
              </p>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">5. Contacto</h3>
              <p>
                Para consultas sobre estos términos, contacta con nosotros:
                <br />
                Email: {EMAIL}
                <br />
                Teléfono: {PHONE_FORMATTED}
              </p>
            </div>
          </article>

          {/* Política de Privacidad */}
          <article id="privacidad" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Política de Privacidad</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                En {COMPANY_NAME}, nos comprometemos a proteger tu privacidad y garantizar una
                experiencia segura en nuestro sitio web.
              </p>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">1. Información que Recopilamos</h3>
              <p>
                Recopilamos información que voluntariamente proporcionas a través de formularios de
                contacto, incluyendo nombre, correo electrónico, teléfono y mensaje.
              </p>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">2. Uso de la Información</h3>
              <p>
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Responder a tus consultas y solicitudes</li>
                <li>Mejorar nuestros servicios</li>
                <li>Enviar comunicaciones relacionadas con tu solicitud</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">3. Protección de Datos</h3>
              <p>
                Implementamos medidas de seguridad técnicas y administrativas para proteger tu información
                personal contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">4. Derechos del Usuario (RGPD)</h3>
              <p>
                De conformidad con el RGPD, tienes derecho a:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Acceder a tus datos personales</li>
                <li>Rectificar datos inexactos</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerme al tratamiento de tus datos</li>
                <li>Solicitar la portabilidad de datos</li>
              </ul>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">5. Contacto para Privacidad</h3>
              <p>
                Para ejercer tus derechos o consultas sobre privacidad:
                <br />
                Email: {EMAIL}
              </p>
            </div>
          </article>

          {/* Aviso Legal */}
          <article id="aviso-legal" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Aviso Legal</h2>
            <div className="text-gray-700 space-y-4">
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">1. Identificación del Prestador</h3>
              <p>
                Titularidad: {COMPANY_FULL_NAME}
                <br />
                Email de contacto: {EMAIL}
                <br />
                Teléfono: {PHONE_FORMATTED}
              </p>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">2. Contenido del Sitio Web</h3>
              <p>
                El contenido de este sitio web se proporciona únicamente con fines informativos. {COMPANY_NAME}
                se esfuerza por mantener la información actualizada y precisa, pero no garantiza su exactitud
                o integridad.
              </p>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">3. Limitaciones de Responsabilidad</h3>
              <p>
                {COMPANY_NAME} no será responsable por:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Errores u omisiones en el contenido</li>
                <li>Interrupciones en el acceso al sitio</li>
                <li>Daños causados por malware o acceso no autorizado</li>
                <li>Pérdida de datos o información</li>
              </ul>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">4. Enlaces Externos</h3>
              <p>
                Este sitio puede contener enlaces a sitios externos. {COMPANY_NAME} no es responsable
                del contenido de estos sitios ni de las prácticas de privacidad de terceros.
              </p>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">5. Propiedad Intelectual</h3>
              <p>
                Todo el contenido, incluyendo textos, gráficos, logos y diseños, está protegido por
                derechos de autor y es propiedad de {COMPANY_NAME} o sus licenciadores.
              </p>
            </div>
          </article>

          {/* Política de Cookies */}
          <article id="cookies" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Política de Cookies</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Este sitio web utiliza cookies para mejorar la experiencia del usuario y proporcionar
                funcionalidades esenciales.
              </p>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">1. ¿Qué son las Cookies?</h3>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando
                visitas un sitio web. Se utilizan para recordar preferencias y mejorar la experiencia
                del usuario.
              </p>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">2. Tipos de Cookies que Usamos</h3>
              <ul className="space-y-3">
                <li>
                  <strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento básico del sitio
                </li>
                <li>
                  <strong>Cookies de Análisis:</strong> Nos ayudan a entender cómo los usuarios interactúan
                  con nuestro sitio
                </li>
                <li>
                  <strong>Cookies de Preferencias:</strong> Guardan tus preferencias y configuración
                </li>
              </ul>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">3. Control de Cookies</h3>
              <p>
                Puedes controlar y eliminar cookies a través de la configuración de tu navegador.
                Ten en cuenta que desactivar cookies puede afectar la funcionalidad del sitio.
              </p>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">4. Consentimiento de Cookies</h3>
              <p>
                Al continuar navegando nuestro sitio, consientes el uso de cookies conforme a esta
                política. Puedes cambiar tu consentimiento en cualquier momento a través del banner
                de cookies.
              </p>
              <h3 className="text-xl font-semibold text-[--color-primary] mt-6">5. Más Información</h3>
              <p>
                Para más información sobre cookies, visita{" "}
                <a
                  href="https://www.aboutcookies.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[--color-primary] hover:text-[--color-secondary] underline"
                >
                  www.aboutcookies.org
                </a>
              </p>
            </div>
          </article>

          {/* Last Updated */}
          <div className="pt-8 border-t border-gray-200 text-sm text-gray-500">
            <p>Última actualización: 30 de abril de 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}
