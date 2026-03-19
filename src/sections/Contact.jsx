import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiSend, FiMapPin, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const formElRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(infoRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
      gsap.fromTo(formRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Portfolio Contact Form'
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        console.error('Web3Forms error:', result);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 6000);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const contactLinks = [
    { icon: <FiMail />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: 'text-cyan-400' },
    { icon: <FiPhone />, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: 'text-green-400' },
    { icon: <FiMapPin />, label: 'Location', value: personalInfo.location, href: null, color: 'text-purple-400' },
  ];

  const socialLinks = [
    { icon: <FiGithub />, href: personalInfo.github, label: 'GitHub', color: 'hover:text-white hover:bg-gray-700' },
    { icon: <FiLinkedin />, href: personalInfo.linkedin, label: 'LinkedIn', color: 'hover:text-white hover:bg-blue-600' },
    { icon: <FiMail />, href: `mailto:${personalInfo.email}`, label: 'Email', color: 'hover:text-white hover:bg-cyan-600' },
  ];

  return (
    <section id="contact" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-slate-900 dark:text-white">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle">Have a project in mind or want to collaborate? I'd love to hear from you!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info side */}
          <div ref={infoRef}>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Let's <span className="gradient-text">connect!</span></h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and development.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {contactLinks.map((link, i) => (
                <div key={i} className="flex items-center gap-4 glass-card p-4 rounded-xl group hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all">
                  <div className={`text-xl ${link.color}`}>{link.icon}</div>
                  <div>
                    <p className="text-slate-500 text-xs">{link.label}</p>
                    {link.href ? (
                      <a href={link.href} className="text-slate-900 dark:text-white text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {link.value}
                      </a>
                    ) : (
                      <p className="text-slate-900 dark:text-white text-sm font-medium">{link.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={`w-11 h-11 rounded-xl glass-card flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all ${social.color} border border-slate-200 dark:border-slate-700/50`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="glass-card p-8 rounded-2xl">
            {/* Success Banner */}
            {status === 'success' && (
              <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl p-4 mb-5">
                <FiCheckCircle className="text-xl shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Message sent successfully!</p>
                  <p className="text-sm text-green-400/70 mt-0.5">Thanks for reaching out — I'll get back to you soon.</p>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {status === 'error' && (
              <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-5">
                <FiAlertCircle className="text-xl shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Failed to send message.</p>
                  <p className="text-sm text-red-400/70 mt-0.5">
                    Please try emailing directly at{' '}
                    <a href={`mailto:${personalInfo.email}`} className="underline">{personalInfo.email}</a>
                  </p>
                </div>
              </div>
            )}

            <form ref={formElRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 dark:text-slate-400 text-xs font-medium mb-1.5 block">Name *</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="contact-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={status === 'sending'}
                  />
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-400 text-xs font-medium mb-1.5 block">Email *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="contact-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={status === 'sending'}
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-400 text-xs font-medium mb-1.5 block">Subject *</label>
                <input
                  type="text"
                  placeholder="What's this about?"
                  className="contact-input"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  disabled={status === 'sending'}
                />
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-400 text-xs font-medium mb-1.5 block">Message *</label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project or idea..."
                  className="contact-input resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  disabled={status === 'sending'}
                />
              </div>

              <button
                type="submit"
                className="btn-primary justify-center"
                disabled={status === 'sending' || status === 'success'}
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <><FiCheckCircle /> Sent!</>
                ) : (
                  <><FiSend /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
