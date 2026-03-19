import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiLinkedin, FiCode, FiTerminal, FiExternalLink } from 'react-icons/fi';
import { codingProfiles } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  github: FiGithub,
  linkedin: FiLinkedin,
  code: FiCode,
  terminal: FiTerminal,
};

export default function CodingProfiles() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.profile-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7, delay: i * 0.12,
            ease: 'back.out(1.2)',
            scrollTrigger: { trigger: card, start: 'top 85%', once: true }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="profiles" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-slate-900 dark:text-white">
            Coding <span className="gradient-text">Profiles</span>
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle">Where I code and connect</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {codingProfiles.map((profile, i) => {
            const IconComponent = iconMap[profile.icon] || FiCode;
            return (
              <a
                key={i}
                href={profile.link}
                target="_blank"
                rel="noreferrer"
                className="profile-card glass-card p-6 group hover:border-indigo-500/40 transition-all text-center block"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${profile.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <IconComponent className="text-white text-2xl" />
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {profile.platform}
                </h3>
                <p className="text-slate-500 text-xs mb-3">@{profile.username}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{profile.stats}</p>
                <div className="flex items-center justify-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-xs font-medium">
                  <FiExternalLink size={12} />
                  <span>Visit Profile</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
