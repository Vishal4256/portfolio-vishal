import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';
import heroIllustration from '../assets/hero-illustration.png';

export default function Hero() {
  const containerRef = useRef(null);
  const taglineRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const socialsRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(taglineRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
      .fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
      .fromTo(buttonsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
      .fromTo(socialsRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, '-=0.3')
      .fromTo(avatarRef.current, { scale: 0.5, opacity: 0, rotate: -10 }, { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: 'elastic.out(1,0.5)' }, '-=0.8');
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/5 blur-3xl" />
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left">
            <div ref={taglineRef} className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </div>

            <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-4">
              <span className="text-slate-900 dark:text-white">Hi, I'm</span>
              <br />
              <span className="gradient-text">Vishal Kumar</span>
            </h1>

            <p ref={subtitleRef} className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 font-medium mb-8">
              {personalInfo.tagline}
            </p>

            <div ref={buttonsRef} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary">
                <FiMail /> Let's Connect
              </a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-outline">
                View Projects
              </a>
              <a href="/vk.pdf" download className="btn-outline">
                Download CV
              </a>
            </div>

            {/* Removed redundant social links for cleaner UI */}
          </div>

          {/* Right: Avatar */}
          <div ref={avatarRef} className="relative animate-float">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 p-1 animate-pulse-glow">
                <div className="w-full h-full rounded-full bg-white dark:bg-[#020617] flex items-center justify-center overflow-hidden">
                  <img 
                    src={heroIllustration} 
                    alt="Vishal Kumar Illustration" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Orbiting dots */}
              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-indigo-500/80 blur-sm animate-bounce" style={{ animationDelay: '0.5s' }} />
              <div className="absolute -bottom-2 -left-6 w-7 h-7 rounded-full bg-cyan-400/80 blur-sm animate-bounce" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 -right-8 w-5 h-5 rounded-full bg-purple-400/80 blur-sm animate-bounce" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
        </div>

        {/* Scroll down */}
        <div className="flex justify-center mt-16">
          <button
            onClick={scrollToAbout}
            className="text-slate-500 hover:text-indigo-400 transition-colors animate-bounce flex flex-col items-center gap-1"
            aria-label="Scroll down"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <FiArrowDown size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
