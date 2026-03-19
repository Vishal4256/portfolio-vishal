import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.edu-item').forEach((item, i) => {
        gsap.fromTo(item,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%', once: true }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-slate-900 dark:text-white">
            My <span className="gradient-text">Education</span>
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle">Academic journey and qualifications</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {education.map((item, i) => (
            <div
              key={i}
              className={`edu-item timeline-item mb-8 ${i === education.length - 1 ? 'mb-0' : ''}`}
            >
              <div className="timeline-dot" />
              <div className="glass-card p-6 ml-4 group hover:border-indigo-500/40 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-slate-900 dark:text-white font-bold mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.degree}
                    </h3>
                    <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-1">{item.institution}</p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        📅 {item.year}
                      </span>
                      <span className="text-xs bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/20">
                        🎯 {item.score}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
