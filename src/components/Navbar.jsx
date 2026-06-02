import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { PHONE_LINK, MENU_ITEMS, COMPANY_NAME, SOCIAL_LINKS, WHATSAPP_URL } from "../data/constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (window.scrollY > 50 && menuOpen) {
        setMenuOpen(false);
      }

      let current = "";
      MENU_ITEMS.forEach((item) => {
        const section = document.querySelector(item.href);
        if (section) {
          const sectionTop = section.offsetTop - 100;
          if (window.scrollY >= sectionTop) {
            current = item.href;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  const handleMenuItemClick = (e, href) => {
    e.preventDefault(); 
    setMenuOpen(false); 

    const section = document.querySelector(href);
    if (section) {
      const sectionTop = section.offsetTop - 100;
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault(); 
    const path = window.location.pathname;
    
    // Si está en /legal, vuelve a inicio
    if (path.includes("/legal")) {
      window.location.href = "/";
    } else {
      // Si está en inicio, scroll suave al top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white shadow-lg py-1"
          : "bg-gradient-to-r from-[--color-primary] to-[--color-secondary] shadow-md py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20 transition-all duration-300">
          
          {/* Logo */}
          <a
            href="#inicio"
            onClick={scrollToTop}
            className={`flex items-center gap-3 font-bold text-2xl transition-all duration-300 hover:scale-105 ${
              scrolled ? "text-[--color-primary]" : "text-white"
            }`}
            aria-label="ADFincas - Inicio"
          >
            <span className="hidden sm:inline tracking-tight">Grupo ADFincas</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center gap-8 mx-8">
            {MENU_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleMenuItemClick(e, item.href)}
                  className={`text-sm font-semibold transition-all duration-300 relative group py-2 ${
                    scrolled 
                      ? (isActive ? "text-[--color-primary]" : "text-gray-600 hover:text-[--color-primary]") 
                      : (isActive ? "text-white" : "text-gray-200 hover:text-white")
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 rounded-full ${
                      scrolled ? "bg-[--color-primary]" : "bg-white"
                    } ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  ></span>
                </a>
              );
            })}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex gap-3 items-center">
            {/* WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                scrolled
                  ? "bg-green-100 text-green-600 hover:bg-green-500 hover:text-white"
                  : "bg-white/20 text-white hover:bg-green-500 hover:border-transparent"
              }`}
              title="Contactar por WhatsApp"
            >
              <FontAwesomeIcon icon={faWhatsapp} size="lg" />
            </a>

            {/* Email */}
            <a
              href={`mailto:${SOCIAL_LINKS?.email}`}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                scrolled
                  ? "bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white"
                  : "bg-white/20 text-white hover:bg-blue-500"
              }`}
              title="Enviar email"
            >
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </a>

            {/* Phone */}
            <a
              href={PHONE_LINK}
              className={`flex items-center px-5 py-2.5 rounded-full font-bold transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md ${
                scrolled
                  ? "bg-[--color-primary] text-white hover:bg-[#438a74]"
                  : "bg-white text-[--color-primary] hover:bg-gray-50"
              }`}
            >
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              <span className="hidden lg:inline">Llamar</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex gap-3 items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
                scrolled ? "bg-green-100 text-green-600" : "bg-white/20 text-white"
              }`}
            >
              <FontAwesomeIcon icon={faWhatsapp} size="lg" />
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                scrolled
                  ? "text-gray-700 bg-gray-100 hover:bg-gray-200"
                  : "text-white bg-white/20 hover:bg-white/30"
              }`}
              aria-expanded={menuOpen}
            >
              <FontAwesomeIcon
                icon={menuOpen ? faXmark : faBars}
                size="lg"
                className={`transition-transform duration-300 ${menuOpen ? "rotate-90" : "rotate-0"}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel con animación suave */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            menuOpen ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`rounded-2xl mt-2 overflow-hidden shadow-lg border ${
              scrolled
                ? "bg-white border-gray-100"
                : "bg-white/10 backdrop-blur-md border-white/20"
            }`}
          >
            <div className="flex flex-col p-2 space-y-1">
              {/* AQUÍ ES DONDE IBA EL CÓDIGO QUE PREGUNTABAS */}
              {MENU_ITEMS.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleMenuItemClick(e, item.href)}
                    className={`px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                      scrolled
                        ? isActive ? "bg-[--color-primary]/10 text-[--color-primary]" : "text-gray-700 hover:bg-gray-50"
                        : isActive ? "bg-white/20 text-white" : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}

              <div className={`h-px w-full my-2 ${scrolled ? "bg-gray-100" : "bg-white/20"}`}></div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <a
                  href={`mailto:${SOCIAL_LINKS?.email}`}
                  className={`flex justify-center items-center gap-2 py-3 rounded-xl font-medium transition-all ${
                    scrolled ? "bg-blue-50 text-blue-600" : "bg-white/20 text-white"
                  }`}
                >
                  <FontAwesomeIcon icon={faEnvelope} /> Email
                </a>
                <a
                  href={PHONE_LINK}
                  className={`flex justify-center items-center gap-2 py-3 rounded-xl font-bold transition-all shadow-sm ${
                    scrolled ? "bg-[--color-primary] text-white" : "bg-white text-[--color-primary]"
                  }`}
                >
                  <FontAwesomeIcon icon={faPhone} /> Llamar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}