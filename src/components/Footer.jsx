import { FiGithub, FiLinkedin, FiInstagram, FiArrowUp } from 'react-icons/fi';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <FiGithub />, href: personalInfo.github, color: "hover:bg-gray-800 hover:text-white" },
    { icon: <FiLinkedin />, href: personalInfo.linkedin, color: "hover:bg-blue-600 hover:text-white" },
    { icon: <SiLeetcode />, href: personalInfo.leetcode, color: "hover:bg-orange-500 hover:text-white" },
    { icon: <SiGeeksforgeeks />, href: personalInfo.gfg, color: "hover:bg-green-600 hover:text-white" },
    { icon: <FiInstagram />, href: personalInfo.instagram, color: "hover:bg-pink-600 hover:text-white" },
  ];

  return (
    <footer className="relative z-10 pt-20 pb-10 bg-[#0a0a0a] text-white">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Social Icons - Focused row */}
        <div className="flex justify-center gap-5 mb-10">
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={`w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:border-transparent hover:scale-110`}
            >
              <span className="text-xl">{social.icon}</span>
            </a>
          ))}
        </div>

        {/* Bottom Bar & Back to Top */}
        <div className="pt-8 border-t border-gray-800 flex flex-col items-center gap-6">
          <p className="text-gray-500 text-sm font-medium italic">
            "Crafted with code and creativity by {personalInfo.name} | Full Stack Developer & Competitive Programmer"
          </p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium group"
          >
            Back to Top
            <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
              <FiArrowUp />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
