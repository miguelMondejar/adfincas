import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import img1 from "../assets/christian-hergesell-tfpImJYUY4s-unsplash.jpg";
import img2 from "../assets/howard-bouchevereau-042Srn0-82o-unsplash.jpg";
import img3 from "../assets/pexels-joaquin-carfagna-3131171-16674323.jpg";
import img4 from "../assets/jakub-zerdzicki-GQn9GnMkVQg-unsplash.jpg";

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const galleryItems = [
    {
      id: 1,
      title: "Comunidades Propietarias",
      description: "Gestión integral de edificios y comunidades",
      category: "Administración",
      image: img1
    },
    {
      id: 2,
      title: "Edificios Residenciales",
      description: "Administración profesional de viviendas",
      category: "Administración",
      image: img2
    },
    {
      id: 3,
      title: "Complejos Modernos",
      description: "Gestión de propiedades de todas las tipologías",
      category: "Administración",
      image: img3
    },
    {
      id: 4,
      title: "Servicios Inmobiliarios",
      description: "Compra, venta y alquiler de inmuebles",
      category: "Inmobiliaria",
      image: img4
    },
  ];

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay, galleryItems.length]);

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

  return (
    <section id="galeria" className="relative pt-20">
      {/* Thumbnails Gallery */}
      <div className="bg-gray-50 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-[#1A1A1A] mb-8">
            Explora nuestras propiedades
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                className={`group relative h-48 rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                  index === currentIndex
                    ? "border-[--color-primary] shadow-lg"
                    : "border-transparent hover:border-[--color-secondary]"
                }`}
                loading="lazy"
              >
                {/* Image Background */}
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
                  <div className="text-4xl font-bold text-white mb-2">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h4 className="text-white font-bold text-sm md:text-base mb-1">
                    {item.title}
                  </h4>
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
      <div className="relative h-screen md:h-[80vh] bg-gradient-to-br from-[--color-primary] to-[--color-secondary] overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${galleryItems[currentIndex].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Main Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <div className="mb-8 inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
            <span className="text-sm font-semibold">{galleryItems[currentIndex].category}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {galleryItems[currentIndex].title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto">
            {galleryItems[currentIndex].description}
          </p>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={goToPrevious}
              className="bg-white text-[--color-primary] p-4 rounded-full hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
              aria-label="Anterior"
            >
              <FontAwesomeIcon icon={faChevronLeft} size="lg" />
            </button>

            <button
              onClick={goToNext}
              className="bg-white text-[--color-primary] p-4 rounded-full hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
              aria-label="Siguiente"
            >
              <FontAwesomeIcon icon={faChevronRight} size="lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Indicators - Bottom Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[--color-primary] w-12 h-3"
                    : "bg-gray-300 w-3 h-3 hover:bg-gray-400"
                } rounded-full`}
                aria-label={`Ir a galeria ${index + 1}`}
              />
            ))}
            <span className="ml-4 text-sm text-gray-600 font-semibold">
              {currentIndex + 1} / {galleryItems.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
