import { useState } from 'react';

/**
 * ResponsiveImage Component
 * Maneja lazy loading, múltiples formatos de imagen (WebP, AVIF, JPG)
 * y proporciona fallback para navegadores antiguos
 */
export default function ResponsiveImage({
  src,
  alt,
  title,
  className = '',
  priority = false,
  width,
  height,
  objectFit = 'cover',
  onLoad,
  onError,
}) {
  const [isLoaded, setIsLoaded] = useState(priority); // Cargar inmediatamente si es priority
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setHasError(true);
    onError?.();
  };

  // Extraer nombre de archivo sin extensión
  const getImagePath = (path) => {
    return path.replace(/\.[^.]*$/, '');
  };

  const imagePath = getImagePath(src);

  // Parámetros de Intersection Observer para lazy loading
  const lazyLoadOptions = priority
    ? {}
    : {
        loading: 'lazy',
        decoding: 'async',
      };

  return (
    <picture>
      {/* AVIF format - mejor compresión */}
      {!priority && (
        <source
          srcSet={`${imagePath}.avif`}
          type="image/avif"
        />
      )}

      {/* WebP format - buena compresión */}
      {!priority && (
        <source
          srcSet={`${imagePath}.webp`}
          type="image/webp"
        />
      )}

      {/* JPG fallback */}
      <img
        src={src}
        alt={alt}
        title={title}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{
          width: width || '100%',
          height: height || 'auto',
          objectFit: objectFit,
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
        fetchPriority={priority ? 'high' : 'auto'}
        {...lazyLoadOptions}
      />

      {/* Error placeholder */}
      {hasError && (
        <div
          className={`${className} bg-gray-300 flex items-center justify-center text-gray-600 text-sm`}
          style={{
            width: width || '100%',
            height: height || 'auto',
          }}
          role="img"
          aria-label={alt}
        >
          Imagen no disponible
        </div>
      )}
    </picture>
  );
}
