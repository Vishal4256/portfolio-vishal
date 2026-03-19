import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundAnimation from './components/BackgroundAnimation';
import CursorShadow from './components/CursorShadow';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Certificates from './sections/Certificates';
import Education from './sections/Education';
import CodingProfiles from './sections/CodingProfiles';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  useEffect(() => {
    ScrollTrigger.refresh();

    const updateProgress = () => {
      const progressEl = document.getElementById('scroll-progress');
      const doc = document.documentElement;
      const scrollTop = window.scrollY || window.pageYOffset;
      const trackHeight = doc.scrollHeight - doc.clientHeight;
      const progress = trackHeight > 0 ? (scrollTop / trackHeight) * 100 : 0;
      if (progressEl) progressEl.style.width = `${progress}%`;
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });

    const onCopy = (e) => e.preventDefault();
    const onContext = (e) => e.preventDefault();

    window.addEventListener('copy', onCopy);
    window.addEventListener('contextmenu', onContext);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('copy', onCopy);
      window.removeEventListener('contextmenu', onContext);
    };
  }, []);

  return (
    <>
      <div id="scroll-progress" className="fixed top-0 left-0 z-[1000] h-1 w-0" />
      <div className="relative min-h-screen overflow-x-hidden bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors">
      <BackgroundAnimation />
      <CursorShadow />
      
      {/* Subtle top gradient overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Certificates />
        <Education />
        <CodingProfiles />
        <Contact />
      </main>

      <Footer />
      </div>
    </>
  );
}

export default App;
