import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  SiCplusplus, SiJavascript, SiReact, 
  SiNodedotjs, SiTailwindcss, SiExpress, SiGreensock, 
  SiGithub, SiMongodb, SiMysql
} from 'react-icons/si';
import { FaJava, FaCss3Alt, FaHtml5, FaTerminal } from 'react-icons/fa';
import { skills } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  cpp: SiCplusplus,
  c: FaTerminal, // Better visual
  java: FaJava,
  javascript: SiJavascript,
  html: FaHtml5,
  css: FaCss3Alt,
  react: SiReact,
  node: SiNodedotjs,
  tailwind: SiTailwindcss,
  express: SiExpress,
  gsap: SiGreensock,
  github: SiGithub,
  mongodb: SiMongodb,
  mysql: SiMysql,
};

function SkillGrid({ items }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((skill) => {
        const Icon = iconMap[skill.icon] || FaTerminal;
        return (
          <div 
            key={skill.name} 
            className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-default"
          >
            {/* Icon Wrapper */}
            <div className={`text-3xl mb-3 p-3 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-md`}>
              <Icon className="text-white" />
            </div>
            <span className="text-slate-700 dark:text-slate-300 font-semibold text-sm text-center">{skill.name}</span>
          </div>
        );
      })}
    </div>
  );
}

function SkillPill({ name }) {
  return (
    <span className="px-4 py-2 glass-card text-slate-700 dark:text-slate-300 text-sm font-medium rounded-xl hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all cursor-default">
      {name}
    </span>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, delay: i * 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', once: true }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="section-title text-slate-900 dark:text-white">Technical <span className="gradient-text">Skills</span></h2>
          <div className="section-divider" />
          <p className="section-subtitle">Technologies and tools I work with</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Programming Languages */}
          <div className="skill-card glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-xl">⚙️</div>
              <h3 className="text-slate-900 dark:text-white font-bold text-lg">Languages</h3>
            </div>
            <SkillGrid items={skills.languages} />
          </div>

          {/* Frameworks */}
          <div className="skill-card glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-xl">🚀</div>
              <h3 className="text-slate-900 dark:text-white font-bold text-lg">Frameworks & Libraries</h3>
            </div>
            <SkillGrid items={skills.frameworks} />
          </div>

          {/* Tools + Soft Skills */}
          <div className="flex flex-col gap-6">
            <div className="skill-card glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-xl">🛠️</div>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg">Tools & Platforms</h3>
              </div>
              <SkillGrid items={skills.tools} />
            </div>
            <div className="skill-card glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-xl">🧠</div>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg">Soft Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.softSkills.map((skill) => (
                  <SkillPill key={skill} name={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
