import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { HERO_TITLE, HERO_SUBTITLE, HERO_CTA, SECTIONS } from "../data/constants";

export default function Hero() {
  const handleScrollToContacto = () => {
    document.querySelector(`#${SECTIONS.realEstate}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="h-[90vh] text-white text-center bg-gradient-to-r from-[#5AAD94] to-[#A47C48] relative overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'linear-gradient(135deg, rgba(84, 173, 148, 0.3) 0%, rgba(164, 124, 72, 0.3) 100%)',
      }}></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-lg">
          <span className="text-5xl md:text-6xl font-bold text-[#5AAD94]">AD</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {HERO_TITLE}
        </h1>

        <p className="text-lg md:text-2xl mb-12 text-gray-100 max-w-2xl">
          {HERO_SUBTITLE}
        </p>

        {/* Primary CTA Button */}
        <button
          onClick={handleScrollToContacto}
          className="bg-white text-[#5AAD94] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition flex items-center gap-3 text-lg shadow-lg hover:shadow-2xl hover:scale-105 duration-300"
        >
          {HERO_CTA} <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </section>
  );
}
