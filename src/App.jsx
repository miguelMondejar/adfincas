import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import RealEstate from "./components/RealEstate";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import LegalInfo from "./pages/LegalInfo";
import Hero from "./components/Hero";
import SEO from "./components/SEO";
import { SEO_DATA, ORGANIZATION_SCHEMA, LOCAL_BUSINESS_SCHEMA, SERVICES_SCHEMA } from "./utils/seoConfig";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

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
            <Contact />
          </>
        ) : (
          <LegalInfo />
        )}
        
        <Footer />
        <CookieConsent />
      </div>
    </HelmetProvider>
  );
}

export default App;
