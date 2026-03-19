import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CursorShadow() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      // Smoothly follow the mouse
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-[50px] h-[50px] -mt-[25px] -ml-[25px] rounded-full pointer-events-none z-0 mix-blend-normal opacity-90 hidden md:block transition-opacity duration-300"
      style={{
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.6) 40%, rgba(0, 0, 0, 0) 70%)',
      }}
    />
  );
}
