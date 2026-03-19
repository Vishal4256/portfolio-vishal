import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certificates, training } from '../data/portfolioData';
import { IoCloseOutline } from 'react-icons/io5';
import { FiEye } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function Certificates() {
  const sectionRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.cert-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', once: true }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certificates" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-slate-900 dark:text-white">
            Certificates & <span className="gradient-text">Training</span>
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle">Learning never stops</p>
        </div>

        {/* Certificates */}
        <div className="mb-20">
          <h3 className="text-slate-500 dark:text-slate-400 uppercase text-xs tracking-widest font-semibold mb-8 text-center">📜 Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {certificates.map((cert, i) => (
              <div
                key={i}
                className="cert-card glass-card overflow-hidden group hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all cursor-pointer"
                onClick={() => setSelectedCert(cert)}
              >
                {/* Certificate Image Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800/50">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xl border border-white/30">
                      <FiEye />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center text-lg mb-4 group-hover:scale-110 transition-transform`}>
                    {cert.icon}
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-semibold mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-500 text-sm">Issued by {cert.issuer}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-green-500 font-bold bg-green-500/10 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Verified
                    </div>
                    <span className="text-indigo-500 dark:text-indigo-400 text-xs font-medium hover:underline">Click to view</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training */}
        <div>
          <h3 className="text-indigo-600 dark:text-indigo-400 uppercase text-xs tracking-[0.2em] font-bold mb-6 text-center">🎓 Training</h3>
          <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
            {training.map((item, i) => (
              <div 
                key={i} 
                className="cert-card glass-card overflow-hidden group hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all cursor-pointer flex flex-col md:flex-row"
                onClick={() => setSelectedCert({ ...item, issuer: item.provider })}
              >
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color || 'from-indigo-500 to-purple-600'} flex items-center justify-center text-lg mb-4 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-3">{item.provider}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4">{item.description}</p>
                  
                  <div className="mt-2 flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700/50">
                    <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-green-500 font-bold bg-green-500/10 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Verified
                    </div>
                    <span className="text-indigo-500 dark:text-indigo-400 text-xs font-bold hover:underline flex items-center gap-1">
                      View <FiEye className="text-sm" />
                    </span>
                  </div>
                </div>

                {/* Training Image Thumbnail (Right side on md+) */}
                {item.image && (
                  <div className="relative h-48 md:h-auto md:w-[30%] overflow-hidden bg-slate-100 dark:bg-slate-800/50 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700/50">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xl border border-white/30">
                        <FiEye />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg"
              onClick={() => setSelectedCert(null)}
            >
              <IoCloseOutline size={24} />
            </button>

            <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
              <div className="md:w-3/4 bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4 overflow-auto">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-inner"
                />
              </div>
              <div className="md:w-1/4 p-8 flex flex-col justify-center">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedCert.color} flex items-center justify-center text-2xl mb-6`}>
                  {selectedCert.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                  {selectedCert.title}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                  {selectedCert.issuer}
                </p>
                <div className="mt-auto space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mb-1">Status</p>
                    <div className="flex items-center gap-2 text-green-500 font-bold">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Verified Degree
                    </div>
                  </div>
                  <button
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                    onClick={() => setSelectedCert(null)}
                  >
                    Close Viewer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
