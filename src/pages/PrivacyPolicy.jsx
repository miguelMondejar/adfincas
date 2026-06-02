import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { COMPANY_NAME, SOCIAL_LINKS, CIF } from "../data/constants";

export default function PrivacyPolicy() {
  const [expandedSections, setExpandedSections] = useState({
    intro: true,
    responsible: false,
    legal: false,
    data: false,
    rights: false,
    cookies: false,
    security: false,
    dpo: false,
    changes: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const SectionHeader = ({ id, title, children }) => (
    <div className="border-b border-gray-200">
      <button
        onClick={() => toggleSection(id)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition text-left"
      >
        <h3 className="text-xl font-bold text-[#1A1A1A]">{title}</h3>
        <FontAwesomeIcon
          icon={expandedSections[id] ? faChevronUp : faChevronDown}
          className="text-[--color-primary]"
        />
      </button>
      {expandedSections[id] && (
        <div className="px-6 py-4 bg-white">{children}</div>
      )}
    </div>
  );

  return (
    <main className="mt-20 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">
            Política de Privacidad
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Última actualización: Abril 2025
          </p>
          <p className="text-sm text-gray-500">
            Esta política describe cómo {COMPANY_NAME} recoge, usa y protege tus
            datos personales.
          </p>
        </div>

        {/* Quick Reference Table */}
        <div className="bg-gradient-to-r from-[--color-primary]/10 to-[--color-secondary]/10 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg mb-4 text-[#1A1A1A]">
            Resumen Rápido
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-[--color-primary]">Responsable:</strong>
              <p className="text-gray-700">{COMPANY_NAME}</p>
            </div>
            <div>
              <strong className="text-[--color-primary]">Base Legal:</strong>
              <p className="text-gray-700">Consentimiento, RGPD</p>
            </div>
            <div>
              <strong className="text-[--color-primary]">Datos Recogidos:</strong>
              <p className="text-gray-700">Nombre, email, teléfono</p>
            </div>
            <div>
              <strong className="text-[--color-primary]">Derechos:</strong>
              <p className="text-gray-700">Acceso, rectificación, eliminación</p>
            </div>
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* 1. Responsable del Tratamiento */}
          <SectionHeader id="responsible" title="1. Responsable del Tratamiento">
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>{COMPANY_NAME}</strong> es el responsable del
                tratamiento de tus datos personales.
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <p>
                  <strong>Email:</strong> {SOCIAL_LINKS.email}
                </p>
                <p>
                  <strong>CIF:</strong> {CIF}
                </p>
                <p>
                  <strong>Ubicación:</strong> España
                </p>
              </div>
            </div>
          </SectionHeader>

          {/* 2. Base Legal */}
          <SectionHeader id="legal" title="2. Base Legal para el Tratamiento">
            <div className="space-y-4 text-gray-700">
              <p>
                El tratamiento de tus datos se realiza según las siguientes
                bases legales:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Consentimiento:</strong> En formularios, requerimos tu
                  consentimiento explícito
                </li>
                <li>
                  <strong>Ejecución de contrato:</strong> Para proporcionar
                  servicios solicitados
                </li>
                <li>
                  <strong>Interés legítimo:</strong> Para mejorar nuestros
                  servicios y seguridad
                </li>
                <li>
                  <strong>Cumplimiento legal:</strong> Por obligaciones legales
                  o fiscales
                </li>
              </ul>
            </div>
          </SectionHeader>

          {/* 3. Datos Recogidos */}
          <SectionHeader id="data" title="3. Qué Datos Recogemos">
            <div className="space-y-4 text-gray-700">
              <p>Recogemos datos en las siguientes situaciones:</p>

              <div>
                <strong className="text-[--color-primary] text-lg">
                  Formularios de Contacto
                </strong>
                <ul className="list-disc list-inside mt-2 ml-4">
                  <li>Nombre completo</li>
                  <li>Correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Mensaje</li>
                </ul>
              </div>

              <div>
                <strong className="text-[--color-primary] text-lg">
                  Formulario Inmobiliario
                </strong>
                <ul className="list-disc list-inside mt-2 ml-4">
                  <li>Datos de contacto (nombre, email, teléfono)</li>
                  <li>Tipo de propiedad</li>
                  <li>Ubicación y características</li>
                  <li>Descripción de inmueble</li>
                </ul>
              </div>

              <div>
                <strong className="text-[--color-primary] text-lg">
                  Datos Automáticos (Analytics)
                </strong>
                <ul className="list-disc list-inside mt-2 ml-4">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador</li>
                  <li>Páginas visitadas</li>
                  <li>Tiempo de permanencia</li>
                  <li>Referrer</li>
                </ul>
              </div>
            </div>
          </SectionHeader>

          {/* 4. Tus Derechos RGPD */}
          <SectionHeader id="rights" title="4. Tus Derechos RGPD">
            <div className="space-y-4 text-gray-700">
              <p>
                Según el RGPD, tienes los siguientes derechos sobre tus datos:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-[--color-primary] pl-4">
                  <h4 className="font-bold text-[--color-primary]">Derecho de Acceso</h4>
                  <p className="text-sm">
                    Solicitar qué datos tenemos sobre ti
                  </p>
                </div>
                <div className="border-l-4 border-[--color-primary] pl-4">
                  <h4 className="font-bold text-[--color-primary]">
                    Derecho de Rectificación
                  </h4>
                  <p className="text-sm">
                    Corregir datos incorrectos o incompletos
                  </p>
                </div>
                <div className="border-l-4 border-[--color-primary] pl-4">
                  <h4 className="font-bold text-[--color-primary]">Derecho al Olvido</h4>
                  <p className="text-sm">
                    Solicitar eliminación de tus datos
                  </p>
                </div>
                <div className="border-l-4 border-[--color-primary] pl-4">
                  <h4 className="font-bold text-[--color-primary]">
                    Derecho de Portabilidad
                  </h4>
                  <p className="text-sm">Recibir tus datos en formato portable</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Para ejercer cualquier derecho, envía un email a {SOCIAL_LINKS.email}{" "}
                con tu solicitud.
              </p>
            </div>
          </SectionHeader>

          {/* 5. Cookies y Rastreo */}
          <SectionHeader id="cookies" title="5. Cookies y Tecnologías de Rastreo">
            <div className="space-y-4 text-gray-700">
              <p>Utilizamos cookies con los siguientes propósitos:</p>

              <div>
                <strong className="text-[--color-primary]">Cookies Técnicas</strong>
                <p className="text-sm mt-1">
                  Esenciales para que el sitio funcione (sesión, preferencias).
                  No necesitan consentimiento.
                </p>
              </div>

              <div>
                <strong className="text-[--color-primary]">Cookies de Analytics</strong>
                <p className="text-sm mt-1">
                  Google Analytics para entender comportamiento de usuarios.
                  Requieren consentimiento.
                </p>
              </div>

              <div>
                <strong className="text-[--color-primary]">Cookies de Marketing</strong>
                <p className="text-sm mt-1">
                  Para personalizar contenido y anuncios. Requieren
                  consentimiento.
                </p>
              </div>

              <p className="text-sm">
                Puedes gestionar tus preferencias de cookies en cualquier
                momento usando el banner en la parte inferior del sitio.
              </p>
            </div>
          </SectionHeader>

          {/* 6. Seguridad */}
          <SectionHeader id="security" title="6. Seguridad de Datos">
            <div className="space-y-4 text-gray-700">
              <p>
                Implementamos medidas técnicas y organizativas para proteger tus
                datos:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Conexiones HTTPS cifradas</li>
                <li>Validación de datos en formularios</li>
                <li>Almacenamiento seguro con EmailJS</li>
                <li>Acceso restringido a datos personales</li>
                <li>Políticas de retención de datos</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <p className="text-sm text-yellow-800">
                  <strong>Nota de seguridad:</strong> Aunque implementamos
                  medidas de seguridad robustas, ningún sitio es 100% seguro.
                  Usa contraseñas seguras y no compartas información sensible.
                </p>
              </div>
            </div>
          </SectionHeader>

          {/* 7. Contacto DPO */}
          <SectionHeader id="dpo" title="7. Delegado de Protección de Datos">
            <div className="space-y-4 text-gray-700">
              <p>
                Para consultas sobre privacidad o ejercer tus derechos RGPD:
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <p>
                  <strong>Email DPO:</strong> {SOCIAL_LINKS.email}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Responderemos tu solicitud en un plazo máximo de 30 días
                  hábiles.
                </p>
              </div>
            </div>
          </SectionHeader>

          {/* 8. Cambios */}
          <SectionHeader id="changes" title="8. Cambios en esta Política">
            <div className="space-y-4 text-gray-700">
              <p>
                Nos reservamos el derecho de actualizar esta política de
                privacidad. Los cambios significativos se comunicarán por email
                o mediante notificación en el sitio.
              </p>
              <p className="text-sm text-gray-600">
                Última actualización: 10 de Abril de 2025
              </p>
            </div>
          </SectionHeader>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[--color-primary]/5 to-[--color-secondary]/5 rounded-lg text-center">
          <p className="text-sm text-gray-600">
            Esta política de privacidad está realizada en cumplimento del
            Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica
            de Protección de Datos (LOPDGDD).
          </p>
        </div>
      </div>
    </main>
  );
}