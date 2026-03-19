import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiMapPin, FiBook } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  const containerRef = useRef(null);
  const leftContentRef = useRef(null);
  const avatarRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(leftContentRef.current.children, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }
    )
    .fromTo(avatarRef.current, 
      { scale: 0.8, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' }, 
      '-=0.5'
    )
    .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      '-=0.2'
    );
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-2">
      {/* Animated background blobs - Enhanced for Image 1 look */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Primary Orb (Right) */}
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-indigo-600/20 dark:bg-indigo-600/15 blur-[120px] animate-pulse" />
        {/* Secondary Orb (Bottom Left) */}
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-purple-600/10 dark:bg-purple-600/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        {/* Central Subtle Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/5 blur-[120px]" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:opacity-40" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 pb-6 sm:pb-10 lg:py-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-24">
          
          {/* Left Content */}
          <div ref={leftContentRef} className="flex-1 text-center lg:text-left pt-10 lg:pt-0">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full mb-6 lg:mb-8 tracking-wide">
              <div className="status-pulse">
                <span className="status-pulse-ping"></span>
                <span className="status-pulse-inner"></span>
              </div>
              Available for opportunities
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-[1.1] mb-6 lg:mb-8 tracking-tight">
              <span className="text-gray-900 dark:text-white">Hi, I'm</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Vishal Kumar
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-slate-400 font-medium mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
              Building Scalable Web Apps & Solving Complex Problems
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10 lg:mb-12">
              <a href="#contact" className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] text-sm sm:text-base">
                <FiMail /> Connect
              </a>
              <a href="#projects" className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 hover:border-indigo-500/50 text-gray-700 dark:text-white font-bold transition-all hover:bg-gray-50 dark:hover:bg-slate-800 shadow-sm dark:shadow-none text-sm sm:text-base">
                Projects
              </a>
              <a href="/vk.pdf" download className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 hover:border-indigo-500/50 text-gray-700 dark:text-white font-bold transition-all hover:bg-gray-50 dark:hover:bg-slate-800 shadow-sm dark:shadow-none text-sm sm:text-base">
                CV
              </a>
            </div>

            {/* Socials and Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-10 pt-8 border-t border-gray-200 dark:border-slate-800/50">
              <div className="flex items-center gap-6 text-gray-400 dark:text-slate-400">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  <FiGithub size={24} />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  <FiLinkedin size={24} />
                </a>
                <a href={`mailto:${personalInfo.email}`} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  <FiMail size={24} />
                </a>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <span className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  LeetCode
                </span>
                <span className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  Full Stack
                </span>
              </div>
            </div>
          </div>

          {/* Right Content: Avatar */}
          <div ref={avatarRef} className="relative flex-shrink-0 group">
            {/* Background Glow */}
            <div className="absolute inset-[-10%] bg-indigo-500/20 dark:bg-indigo-500/10 blur-[50px] rounded-full sm:hidden group-hover:opacity-100 transition-opacity" />
            
            <div className="relative w-56 h-56 sm:w-64 md:w-80 lg:w-[450px] lg:h-[450px]">
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-cyan-500/50 dark:from-indigo-500 dark:via-purple-500 dark:to-cyan-400 p-1 animate-float shadow-xl" style={{ animationDelay: '1.5s' }}>
                <div className="w-full h-full rounded-full bg-white dark:bg-[#020617] flex items-center justify-center overflow-hidden border-[4px] sm:border-[6px] border-white dark:border-[#020617]">
                  <img 
                    src="/vphoto.jpg" 
                    alt="Vishal Kumar" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
 
              <div className="absolute bottom-2 -right-4 sm:bottom-10 sm:-right-10 lg:-right-16 animate-float-delayed z-20 scale-[0.8] sm:scale-90 lg:scale-100 origin-left sm:origin-center">
                <div className="glass-card-sm bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-indigo-100 dark:border-slate-700/50 p-3 rounded-2xl flex items-center gap-3 shadow-2xl">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    <FiBook size={18} />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-indigo-400 dark:text-slate-500 font-black">Degree</p>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">B.Tech CSE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollRef} className="flex justify-center mt-2">
          <button
            onClick={scrollToAbout}
            className="text-gray-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all animate-bounce flex flex-col items-center gap-1 group"
            aria-label="Scroll down"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Scroll</span>
            <FiArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
