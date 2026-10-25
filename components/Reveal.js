'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Scroll reveal, GSAP-driven.
 * Content is NEVER pre-hidden and opacity is NEVER animated: it renders fully
 * visible, and only when it scrolls into view does GSAP move it (24px rise,
 * to completion). Copy, prices and CTAs can never sit half-faded.
 * Reduced motion: no animation.
 */
export default function Reveal({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(el);
          gsap.fromTo(
            el,
            { y: 24 },
            { y: 0, duration: 0.7, ease: 'power3.out', overwrite: true }
          );
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
