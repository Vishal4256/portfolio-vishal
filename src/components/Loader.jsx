import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onStartReveal, onFinished }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const textRef = useRef(null);
  const segmentsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const segments = segmentsRef.current;
      const tl = gsap.timeline();

      // Initial state
      gsap.set(segments, { 
        x: 0, 
        y: 0, 
        scale: 0, 
        opacity: 0, 
        transformOrigin: "50% 50%",
        rotation: () => Math.random() * 360
      });
      gsap.set(textRef.current, { opacity: 0, y: 10 });

      tl.to(segments, {
        opacity: 1,
        scale: 1,
        x: () => (Math.random() - 0.5) * 150,
        y: () => (Math.random() - 0.5) * 150,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out"
      })
      .to(segments, {
        rotation: "+=360",
        x: (i) => Math.cos(i) * 60 + (Math.random() - 0.5) * 20,
        y: (i) => Math.sin(i) * 60 + (Math.random() - 0.5) * 20,
        duration: 1.5,
        ease: "power1.inOut",
      }, "-=0.2")
      .to(segments, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.8,
        stagger: {
          each: 0.04,
          from: "random"
        },
        ease: "elastic.out(1, 0.8)"
      }, "-=0.3")
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2")
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.8,
        onStart: () => {
          if (onStartReveal) onStartReveal();
        },
        onComplete: () => {
          if (onFinished) onFinished();
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onStartReveal, onFinished]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] bg-[#020617] flex flex-col items-center justify-center pointer-events-auto">
      <div className="relative w-64 h-64 flex items-center justify-center scale-75 md:scale-100">
        <svg 
          ref={svgRef}
          viewBox="0 0 200 100" 
          className="w-full h-full overflow-visible"
        >
          {/* V Segments */}
          <g className="v-logo">
            <line ref={el => segmentsRef.current[0] = el} x1="40" y1="20" x2="60" y2="80" stroke="white" strokeWidth="8" strokeLinecap="round" />
            <line ref={el => segmentsRef.current[1] = el} x1="60" y1="80" x2="80" y2="20" stroke="white" strokeWidth="8" strokeLinecap="round" />
          </g>
          
          {/* K Segments */}
          <g className="k-logo">
            <line ref={el => segmentsRef.current[2] = el} x1="110" y1="20" x2="110" y2="80" stroke="white" strokeWidth="8" strokeLinecap="round" />
            <line ref={el => segmentsRef.current[3] = el} x1="110" y1="50" x2="140" y2="20" stroke="white" strokeWidth="8" strokeLinecap="round" />
            <line ref={el => segmentsRef.current[4] = el} x1="110" y1="50" x2="140" y2="80" stroke="white" strokeWidth="8" strokeLinecap="round" />
          </g>
        </svg>

        <div 
          ref={textRef}
          className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
        >
          <span className="text-xl md:text-2xl font-black text-white tracking-[0.2em] uppercase opacity-90">
            Vishal Kumar
          </span>
          <div className="h-[1px] w-full bg-linear-to-r from-transparent via-white/50 to-transparent mt-2 scale-x-50" />
        </div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>
    </div>
  );
};

export default Loader;
