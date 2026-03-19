import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCode, FiCpu, FiDatabase, FiGlobe, FiMapPin, FiBookOpen } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: <FiCode className="text-indigo-400" />, label: 'Full Stack Developer' },
  { icon: <FiCpu className="text-purple-400" />, label: 'DSA Enthusiast' },
  { icon: <FiDatabase className="text-cyan-400" />, label: 'MERN Stack' },
  { icon: <FiGlobe className="text-green-400" />, label: 'Open Source Learner' },
];

export default function About() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
      gsap.fromTo(imageRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-slate-900 dark:text-white">About <span className="gradient-text">Me</span></h2>
          <div className="section-divider" />
          <p className="section-subtitle">Get to know me a bit better</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div ref={imageRef} className="flex justify-center">
            <div className="relative group">
              <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center glass-card overflow-hidden relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                <img src="/vphoto.jpg" alt="Vishal Kumar" className="w-full h-full object-cover" />
              </div>

              {/* Floating Cards */}
              {/* Top Left - Degree */}
              <div className="absolute -top-6 -left-6 lg:-top-8 lg:-left-12 z-20">
                <div className="glass-card p-4 rounded-2xl flex items-center gap-4 border border-white/10 shadow-2xl backdrop-blur-xl bg-slate-900/40">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                    <FiBookOpen className="text-xl" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Degree</p>
                    <p className="text-white font-bold text-sm whitespace-nowrap">B.Tech CSE</p>
                  </div>
                </div>
              </div>

              {/* Bottom Right - Location */}
              <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-12 z-20">
                <div className="glass-card p-4 rounded-2xl flex items-center gap-4 border border-white/10 shadow-2xl backdrop-blur-xl bg-slate-900/40">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                    <FiMapPin className="text-xl" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Location</p>
                    <p className="text-white font-bold text-sm whitespace-nowrap">Punjab, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div ref={contentRef}>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Passionate about <span className="gradient-text">technology</span> & innovation
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base mb-6">{personalInfo.about}</p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-3 glass-card p-3 rounded-xl hover:border-indigo-500/40 transition-colors">
                  <div className="text-xl">{item.icon}</div>
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
