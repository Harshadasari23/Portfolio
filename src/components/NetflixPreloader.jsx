import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MinimalPreloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete?.();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    tl.set(preloaderRef.current, { autoAlpha: 1 })
      .fromTo(
        contentRef.current,
        { scale: 1.6, z: 350, opacity: 0, filter: "blur(16px)" },
        { scale: 1, z: 0, opacity: 1, filter: "blur(0px)", duration: 2.2, ease: "power2.out" }
      )
      .to(contentRef.current, {
        scale: 0.85,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.4,
        ease: "power2.in",
        delay: 0.6
      })
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center select-none overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <div ref={contentRef} className="flex flex-col items-center gap-4 max-w-full">
        {/* Minimal Red Indicator Dot */}
        <h1 
          className="px-4 text-center text-2xl md:text-3xl font-black tracking-[0.1em] text-white max-w-full"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          Harsha Dasari
        </h1>
      </div>
    </div>
  );
};

export default MinimalPreloader;