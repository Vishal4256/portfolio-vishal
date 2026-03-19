import React, { useEffect, useRef, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let w, h;
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const stars = [];
    const starCount = 100;
    const shootingStars = [];
    let lastShootingStarTime = 0;

    class Star {
      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        
        if (theme === 'dark') {
          this.size = Math.random() * 1.5 + 0.1;
          this.speedX = (Math.random() - 0.5) * 0.4;
          this.speedY = (Math.random() - 0.5) * 0.4;
          this.opacity = Math.random();
          this.opacityStep = Math.random() * 0.015 + 0.005;
        } else {
          // Floating "dust/bubbles" for light mode
          this.size = Math.random() * 3 + 1;
          this.speedX = (Math.random() - 0.5) * 0.2;
          this.speedY = -Math.random() * 0.4 - 0.1; // Float upwards
          this.opacity = Math.random() * 0.4 + 0.1;
          this.opacityStep = Math.random() * 0.005 + 0.002;
          this.wobble = Math.random() * Math.PI * 2;
          this.wobbleSpeed = Math.random() * 0.02;
        }
      }

      update() {
        if (theme === 'dark') {
          this.x += this.speedX;
          this.y += this.speedY;
          this.opacity += this.opacityStep;
          if (this.opacity > 1 || this.opacity < 0.2) this.opacityStep *= -1;
        } else {
          // Drifting movement for light mode
          this.wobble += this.wobbleSpeed;
          this.x += this.speedX + Math.sin(this.wobble) * 0.2;
          this.y += this.speedY;
          this.opacity += this.opacityStep;
          if (this.opacity > 0.6 || this.opacity < 0.1) this.opacityStep *= -1;
        }

        if (this.x < -20) this.x = w + 20;
        if (this.x > w + 20) this.x = -20;
        if (this.y < -20) this.y = h + 20;
        if (this.y > h + 20) this.y = -20;
      }

      draw() {
        if (theme === 'dark') {
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();

          if (this.size > 1 && Math.random() > 0.99) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'white';
          } else {
            ctx.shadowBlur = 0;
          }
        } else {
          // Bubbles/Dust for light mode
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
          );
          gradient.addColorStop(0, `rgba(99, 102, 241, ${this.opacity})`);
          gradient.addColorStop(1, `rgba(99, 102, 241, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * (h / 2);
        this.len = Math.random() * 150 + 50;
        this.speed = Math.random() * 15 + 8;
        this.angle = (Math.random() * 45 + 135) * (Math.PI / 180);
        this.opacity = 1;
        this.active = true;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.02;

        if (this.opacity <= 0 || this.x < -this.len || this.y > h + this.len) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active) return;
        const gradient = ctx.createLinearGradient(
          this.x, this.y, 
          this.x - Math.cos(this.angle) * this.len, 
          this.y - Math.sin(this.angle) * this.len
        );
        
        const starColor = theme === 'dark' ? '255, 255, 255' : '99, 102, 241';
        gradient.addColorStop(0, `rgba(${starColor}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${starColor}, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - Math.cos(this.angle) * this.len, this.y - Math.sin(this.angle) * this.len);
        ctx.stroke();
      }
    }

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    const animate = (time) => {
      ctx.clearRect(0, 0, w, h);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      if (time - lastShootingStarTime > 2000 && Math.random() > 0.98) {
        shootingStars.push(new ShootingStar());
        lastShootingStarTime = time;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        shootingStars[i].update();
        shootingStars[i].draw();
        if (!shootingStars[i].active) shootingStars.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-700">
      {/* Deep Background Gradients for Atmosphere */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 dark:bg-purple-600/5 rounded-full blur-[120px] animate-pulse" />
      
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full opacity-60 dark:opacity-50" 
      />

      {/* Vignette Overlay for Depth */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,250,252,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.6)_100%)] pointer-events-none" />
    </div>
  );
};

export default BackgroundAnimation;

