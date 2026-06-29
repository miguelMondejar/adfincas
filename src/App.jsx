import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import RealEstate from "./components/RealEstate";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import LegalInfo from "./pages/LegalInfo";
import Hero from "./components/Hero";
import SEO from "./components/SEO";
import { SEO_DATA, ORGANIZATION_SCHEMA, LOCAL_BUSINESS_SCHEMA, SERVICES_SCHEMA } from "./utils/seoConfig";
import { COLORS } from "./utils/colorConfig";
import { loadRecaptchaScript } from "./utils/formSecurityConfig";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Inject CSS variables from colorConfig for dynamic color changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', COLORS.primary);
    root.style.setProperty('--color-secondary', COLORS.secondary);
    root.style.setProperty('--color-secondary-dark', COLORS.secondaryDark);
    root.style.setProperty('--color-dark', COLORS.dark);
    root.style.setProperty('--color-white', COLORS.white);
    root.style.setProperty('--color-whatsapp', COLORS.whatsapp);
    root.style.setProperty('--color-gray-100', COLORS.gray100);
    root.style.setProperty('--color-gray-300', COLORS.gray300);
    root.style.setProperty('--color-gray-500', COLORS.gray500);
    root.style.setProperty('--color-gray-600', COLORS.gray600);
    root.style.setProperty('--color-gray-700', COLORS.gray700);
  }, []);

  // Load reCAPTCHA v3 script
  useEffect(() => {
    loadRecaptchaScript();
  }, []);

  useEffect(() => {
    // Check URL to determine current page
    const path = window.location.pathname;
    if (path.includes("/legal")) {
      setCurrentPage("legal");
    } else {
      setCurrentPage("home");
    }

    // Also listen for URL changes
    const handlePopState = () => {
      const newPath = window.location.pathname;
      if (newPath.includes("/legal")) {
        setCurrentPage("legal");
      } else {
        setCurrentPage("home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const seoData = currentPage === "home" ? SEO_DATA.home : SEO_DATA.legal;
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [ORGANIZATION_SCHEMA, LOCAL_BUSINESS_SCHEMA, ...SERVICES_SCHEMA],
  };

  return (
    <HelmetProvider>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        ogType={seoData.ogType}
        canonical={seoData.canonical}
        schema={combinedSchema}
      />
      
      <div className="font-sans text-gray-800 bg-white">
        <Navbar />
        
        {currentPage === "home" ? (
          <>
            <Hero />
            <Gallery />
            <AboutUs />
            <Services />
            <RealEstate />
            <FAQ />
            <Contact />
          </>
        ) : (
          <LegalInfo />
        )}
        
        <Footer />
        <FloatingWhatsApp />
        <CookieConsent />
      </div>
    </HelmetProvider>
  );
}

export default App;
