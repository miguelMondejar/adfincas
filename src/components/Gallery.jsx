import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ResponsiveImage from "./ResponsiveImage";

import img1 from "../assets/christian-hergesell-tfpImJYUY4s-unsplash.jpg";
import img2 from "../assets/howard-bouchevereau-042Srn0-82o-unsplash.jpg";
import img3 from "../assets/pexels-joaquin-carfagna-3131171-16674323.jpg";
import img4 from "../assets/jakub-zerdzicki-GQn9GnMkVQg-unsplash.jpg";

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState(new Set());

  const galleryItems = [
    {
      id: 1,
      title: "Comunidades Propietarias",
      description: "Gestión integral de edificios y comunidades",
      category: "Administración",
      image: img1,
    },
    {
      id: 2,
      title: "Edificios Residenciales",
      description: "Administración profesional de viviendas",
      category: "Administración",
      image: img2,
    },
    {
      id: 3,
      title: "Complejos Modernos",
      description: "Gestión de propiedades de todas las tipologías",
      category: "Administración",
      image: img3,
    },
    {
      id: 4,
      title: "Servicios Inmobiliarios",
      description: "Compra, venta y alquiler de inmuebles",
      category: "Inmobiliaria",
      image: img4,
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay, galleryItems.length]);

  // Preload adjacent images
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;

    setPreloadedImages(new Set([currentIndex, nextIndex, prevIndex]));
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + galleryItems.length) % galleryItems.length
    );
    setAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    setAutoPlay(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  const currentItem = galleryItems[currentIndex];

  return (
    <section 
      id="galeria" 
      className="relative pt-20"
      aria-label="Galería de propiedades"
      role="region"
    >
      {/* Thumbnails Gallery */}
      <div className="bg-gray-50 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8">
            Explora nuestras propiedades
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                className={`group relative h-48 rounded-xl overflow-hidden transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:ring-offset-2 ${
                  index === currentIndex
                    ? "border-[--color-primary] shadow-lg"
                    : "border-transparent hover:border-[--color-secondary]"
                }`}
                aria-label={`${item.title} - ${item.description}`}
                aria-current={index === currentIndex ? "true" : "false"}
              >
                {/* Image with Lazy Loading */}
                <ResponsiveImage
                  src={item.image}
                  alt={item.title}
                  title={item.description}
                  className="w-full h-full"
                  priority={preloadedImages.has(index)}
                  objectFit="cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
                  <div className="text-4xl font-bold text-white mb-2" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-white font-bold text-sm md:text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-100 text-xs md:text-sm">
                    {item.category}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Gallery Hero */}
      <div 
        className="relative h-screen md:h-[80vh] bg-gradient-to-br from-[--color-primary] to-[--color-secondary] overflow-hidden flex items-center justify-center"
        role="main"
        aria-live="polite"
        aria-label={`Galería: ${currentItem.title}`}
      >
        {/* Background Image with Lazy Loading */}
        <div className="absolute inset-0 opacity-40 overflow-hidden">
          <ResponsiveImage
            src={currentItem.image}
            alt={currentItem.title}
            className="w-full h-full"
            priority={true}
            objectFit="cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40" aria-hidden="true"></div>

        {/* Main Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <div className="mb-8 inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
            <span className="text-sm font-semibold">{currentItem.category}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {currentItem.title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto">
            {currentItem.description}
          </p>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4" role="group" aria-label="Controles de galería">
            <button
              onClick={goToPrevious}
              className="bg-white text-[--color-primary] p-4 rounded-full hover:bg-gray-100 transition shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              aria-label="Imagen anterior"
              title="Ir a la imagen anterior"
            >
              <FontAwesomeIcon icon={faChevronLeft} size="lg" aria-hidden="true" />
            </button>

            <button
              onClick={goToNext}
              className="bg-white text-[--color-primary] p-4 rounded-full hover:bg-gray-100 transition shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              aria-label="Imagen siguiente"
              title="Ir a la siguiente imagen"
            >
              <FontAwesomeIcon icon={faChevronRight} size="lg" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Indicators - Bottom Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <div role="group" aria-label="Seleccionar imagen" className="flex items-center gap-3">
              {galleryItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:ring-offset-2 ${
                    index === currentIndex
                      ? "bg-[--color-primary] w-12 h-3"
                      : "bg-gray-300 w-3 h-3 hover:bg-gray-400"
                  } rounded-full`}
                  aria-label={`Ir a imagen ${index + 1}`}
                  aria-current={index === currentIndex ? "true" : "false"}
                />
              ))}
            </div>

            <span className="ml-4 text-sm text-gray-600 font-semibold" aria-live="polite">
              {currentIndex + 1} / {galleryItems.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
