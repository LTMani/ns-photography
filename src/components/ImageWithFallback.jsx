import React, { useState } from 'react';

/**
 * Image component with smooth loading skeleton, fallback handling, and luxury tinting
 */
export default function ImageWithFallback({
  src,
  alt = "NS Photography visual",
  className = "",
  aspectRatio = "aspect-[4/5]",
  loading = "lazy",
  objectFit = "object-cover",
  onClick,
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // SVG Fallback for resilience
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><rect width="100%" height="100%" fill="%230e0f13"/><circle cx="400" cy="450" r="80" stroke="%23d4af37" stroke-width="2" fill="none" opacity="0.4"/><path d="M370 450 L430 450 M400 420 L400 480" stroke="%23d4af37" stroke-width="1.5" opacity="0.5"/><text x="50%" y="580" fill="%23d4af37" font-family="serif" font-size="24" letter-spacing="4" text-anchor="middle">NS PHOTOGRAPHY</text><text x="50%" y="620" fill="%23888899" font-family="sans-serif" font-size="14" letter-spacing="2" text-anchor="middle">TIMELESS MOMENT</text></svg>`;

  return (
    <div
      className={`relative overflow-hidden bg-[#0c0d11] ${aspectRatio} ${className}`}
      onClick={onClick}
    >
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e12] via-[#1a1b22] to-[#0d0e12] animate-pulse" />
      )}

      {/* Actual Image */}
      <img
        src={hasError ? fallbackSvg : src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full ${objectFit} transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        {...props}
      />

      {/* Subtle vignette shadow overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />
    </div>
  );
}
