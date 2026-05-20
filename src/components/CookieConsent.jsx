import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookie, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  // TODO: Reemplazar con IDs reales
  const GA_ID = "G-XXXXXXXXXX";
  const FACEBOOK_PIXEL_ID = "0000000000000000";

  useEffect(() => {
    // Consentimiento denegado por defecto (RGPD)
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
    });

    const savedPreferences = localStorage.getItem("cookieConsent");

    if (!savedPreferences) {
      setShowBanner(true);
    } else {
      const prefs = JSON.parse(savedPreferences);
      setPreferences(prefs);

      // Si ya aceptó antes, cargar scripts automáticamente
      loadAnalytics(prefs.analytics, prefs.marketing);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("cookieConsent", JSON.stringify(allAccepted));

    setPreferences(allAccepted);
    setShowBanner(false);

    loadAnalytics(true, true);
  };

  const handleRejectAll = () => {
    const rejected = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("cookieConsent", JSON.stringify(rejected));

    setPreferences(rejected);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const customPrefs = {
      ...preferences,
      essential: true,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("cookieConsent", JSON.stringify(customPrefs));

    setShowBanner(false);
    setShowSettings(false);

    loadAnalytics(customPrefs.analytics, customPrefs.marketing);
  };

  const loadAnalytics = (analytics, marketing) => {
    // GOOGLE ANALYTICS
    if (analytics) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });

      // Evitar duplicar script
      const existingGA = document.querySelector(
        `script[src*="googletagmanager"]`
      );

      if (!existingGA) {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

        document.head.appendChild(script);

        window.gtag("js", new Date());
        window.gtag("config", GA_ID);
      }
    }

    // FACEBOOK PIXEL
    if (marketing) {
      const existingFB = document.querySelector(
        `script[src*="fbevents.js"]`
      );

      if (!existingFB) {
        !(function (f, b, e, v, n, t, s) {
          if (f.fbq) return;

          n = f.fbq = function () {
            n.callMethod
              ? n.callMethod.apply(n, arguments)
              : n.queue.push(arguments);
          };

          if (!f._fbq) f._fbq = n;

          n.push = n;
          n.loaded = true;
          n.version = "2.0";
          n.queue = [];

          t = b.createElement(e);
          t.async = true;
          t.src = v;

          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
        })(
          window,
          document,
          "script",
          "https://connect.facebook.net/en_US/fbevents.js"
        );

        window.fbq("init", FACEBOOK_PIXEL_ID);
        window.fbq("track", "PageView");
      }
    }
  };

  const handleToggleCheckbox = (type) => {
    if (type !== "essential") {
      setPreferences((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    }
  };

  // Botón flotante cuando ya aceptó
  if (!showBanner && !showSettings) {
    return (
      <button
        onClick={() => setShowSettings(true)}
        className="fixed bottom-8 right-8 z-40 bg-[#5AAD94] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#A47C48] transition flex items-center gap-2 shadow-lg"
        title="Abrir preferencias de cookies"
      >
        <FontAwesomeIcon icon={faCookie} className="text-lg" />
        Cookies
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {!showSettings ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            {/* Texto */}
            <div className="md:col-span-2">
              <div className="flex items-start gap-4">
                <FontAwesomeIcon
                  icon={faCookie}
                  className="text-3xl text-[#5AAD94] mt-1"
                />

                <div>
                  <h3 className="font-bold text-lg text-[#1A1A1A] mb-2">
                    Gestión de Cookies
                  </h3>

                  <p className="text-sm text-gray-600">
                    Utilizamos cookies para mejorar tu experiencia,
                    estadísticas y contenido personalizado. Consulta nuestra{" "}
                    <a
                      href="/politica-cookies"
                      className="text-[#5AAD94] hover:underline"
                    >
                      política de cookies
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <button
                onClick={handleAcceptAll}
                className="bg-[#5AAD94] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#A47C48] transition w-full"
              >
                Aceptar todo
              </button>

              <button
                onClick={() => setShowSettings(true)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition w-full"
              >
                Personalizar
              </button>

              <button
                onClick={handleRejectAll}
                className="text-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition w-full"
              >
                Rechazar no esenciales
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <h3 className="font-bold text-lg mb-4 text-[#1A1A1A]">
                Personalizar Cookies
              </h3>

              {/* Esenciales */}
              <div className="border rounded-lg p-4 mb-4 bg-gray-50">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-5 h-5 rounded cursor-not-allowed"
                  />

                  <div className="flex-1">
                    <label className="font-semibold text-[#1A1A1A]">
                      Cookies Esenciales
                    </label>

                    <p className="text-sm text-gray-600">
                      Necesarias para el funcionamiento del sitio web.
                    </p>
                  </div>

                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-600"
                  />
                </div>
              </div>

              {/* Analytics */}
              <div className="border rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => handleToggleCheckbox("analytics")}
                    className="w-5 h-5 rounded cursor-pointer"
                  />

                  <div className="flex-1">
                    <label className="font-semibold text-[#1A1A1A]">
                      Cookies de Analytics
                    </label>

                    <p className="text-sm text-gray-600">
                      Nos ayudan a entender cómo utilizas el sitio web.
                    </p>
                  </div>
                </div>
              </div>

              {/* Marketing */}
              <div className="border rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => handleToggleCheckbox("marketing")}
                    className="w-5 h-5 rounded cursor-pointer"
                  />

                  <div className="flex-1">
                    <label className="font-semibold text-[#1A1A1A]">
                      Cookies de Marketing
                    </label>

                    <p className="text-sm text-gray-600">
                      Utilizadas para contenido personalizado y publicidad.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <button
                onClick={handleSavePreferences}
                className="bg-[#5AAD94] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#A47C48] transition w-full"
              >
                Guardar Preferencias
              </button>

              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition w-full"
              >
                Volver
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}