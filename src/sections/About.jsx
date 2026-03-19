import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCode, FiCpu, FiDatabase, FiGlobe, FiMail, FiPhone } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const highlightCards =
  [
    {
      icon: <FiCode className="text-indigo-400" />,
      title: 'Full Stack Development',
      subtext: 'MERN Stack | Scalable Web Applications'
    },
    {
      icon: <FiCpu className="text-purple-400" />,
      title: 'Data Structures & Algorithms',
      subtext: '150+ Problems Solved | Strong Problem-Solving Skills'
    },
    {
      icon: <FiDatabase className="text-cyan-400" />,
      title: 'System Architecture',
      subtext: 'Designing Scalable & Efficient Systems'
    },
    {
      icon: <FiGlobe className="text-green-400" />,
      title: 'Community & Open Source',
      subtext: 'Active Contributor | Collaborative Development'
    }
  ];

export default function About() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );
      gsap.fromTo(rightRef.current.children,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-16 overflow-hidden bg-white dark:bg-[#020617] mt-0">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-widest uppercase">
            Discovery
          </div>
          <h2 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 dark:from-white dark:via-indigo-200 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
            About <span className="text-indigo-600 dark:text-indigo-400">Me</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: My Story */}
          <div ref={leftRef} className="relative group">
            {/* Simple decorative box behind story */}
            <div className="absolute -inset-4 bg-indigo-50/50 dark:bg-slate-900/40 rounded-3xl -z-10 blur-sm group-hover:bg-indigo-50/80 dark:group-hover:bg-slate-900/60 transition-colors duration-500" />

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-500 animate-pulse" />
                My Story
              </div>

              <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">
                Building <span className="text-indigo-600 dark:text-indigo-400">Scalable Systems</span> with Purpose
              </h3>

              <div className="space-y-4 text-gray-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                <p>
                  I’m a Computer Science student at <span className="text-gray-900 dark:text-white font-bold">Lovely Professional University</span>, focused on crafting modern, scalable applications.
                </p>
                <p>
                  I enjoy working with <span className="text-indigo-600 dark:text-indigo-400 font-bold">cutting-edge technologies</span> and turning complex ideas into clean, high-performance, and user-friendly solutions.
                </p>
              </div>

              {/* Contact Badges */}
              <div className="flex flex-wrap gap-4 pt-6">
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-indigo-100 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all group">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <FiMail size={18} />
                  </div>
                  <span className="text-gray-700 dark:text-slate-300 font-bold text-sm">{personalInfo.email}</span>
                </a>
                <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-indigo-100 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all group">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <FiPhone size={18} />
                  </div>
                  <span className="text-gray-700 dark:text-slate-300 font-bold text-sm">{personalInfo.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Highlight Cards - 2x2 Grid on large screens */}
          <div ref={rightRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlightCards.map((card, index) => (
              <div key={index} className="group p-6 rounded-3xl bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl border border-indigo-100/50 dark:border-slate-800/50 hover:border-indigo-500/30 hover:bg-white dark:hover:bg-slate-900/60 transition-all duration-300 flex flex-col items-start gap-4 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white dark:bg-slate-800/50 border border-indigo-50 dark:border-slate-700/50 flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-lg font-black text-gray-900 dark:text-white mb-1 tracking-tight">{card.title}</h4>
                  <p className="text-gray-500 dark:text-slate-400 text-xs font-bold leading-relaxed">{card.subtext}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
