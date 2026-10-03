import React, { useEffect, useRef, useState } from 'react';

/**
 * High-performance Custom Cursor using direct DOM transform manipulation.
 * Eliminates React state re-renders on mousemove for 120fps smoothness.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const trailerRef = useRef(null);
  const textRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let trailerX = -100;
    let trailerY = -100;
    let isVisible = false;
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (trailerRef.current) trailerRef.current.style.opacity = '1';
      }

      // Check hovered element
      const target = e.target;
      if (target && trailerRef.current && textRef.current) {
        if (target.closest('[data-cursor="view"]')) {
          trailerRef.current.className =
            'fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200 w-16 h-16 bg-[#d4af37]/90 text-black text-[10px] font-bold tracking-widest';
          textRef.current.textContent = 'VIEW';
        } else if (target.closest('[data-cursor="explore"]')) {
          trailerRef.current.className =
            'fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200 w-20 h-20 bg-white/90 text-black text-[10px] font-bold tracking-widest';
          textRef.current.textContent = 'EXPLORE';
        } else if (
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer')
        ) {
          trailerRef.current.className =
            'fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200 w-10 h-10 border border-[#d4af37]/70 bg-[#d4af37]/15';
          textRef.current.textContent = '';
        } else {
          trailerRef.current.className =
            'fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200 w-7 h-7 border border-[#d4af37]/40';
          textRef.current.textContent = '';
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (trailerRef.current) trailerRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // RAF loop directly transforms DOM elements (Zero React Re-renders!)
    const render = () => {
      // Smooth trailer interpolation
      trailerX += (mouseX - trailerX) * 0.2;
      trailerY += (mouseY - trailerY) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (trailerRef.current) {
        trailerRef.current.style.transform = `translate3d(${trailerX}px, ${trailerY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#d4af37] opacity-0 will-change-transform"
      />

      {/* Trailing follower circle */}
      <div
        ref={trailerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200 w-7 h-7 border border-[#d4af37]/40 opacity-0 will-change-transform"
      >
        <span ref={textRef} />
      </div>
    </>
  );
}
