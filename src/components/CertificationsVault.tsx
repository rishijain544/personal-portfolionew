import React, { useState } from 'react';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';
import { ShieldCheck, Cloud, Sparkles, Award, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export const CertificationsVault: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, px: 0, py: 0 });
  const [activeBadge, setActiveBadge] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    setMousePos({ x, y, px, py });
    setActiveBadge(id);
  };

  const handleMouseLeave = () => {
    setActiveBadge(null);
    setMousePos({ x: 0, y: 0, px: 0, py: 0 });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#FF6A00]" />;
      case 'Cloud': return <Cloud className="w-6 h-6 text-[#FF6A00]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#FF6A00]" />;
      default: return <Award className="w-6 h-6 text-[#FF6A00]" />;
    }
  };

  return (
    <section id="certifications" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-[#FF6A00]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6A00]/10 border border-slate-200 dark:border-white/15 text-[#FF6A00] text-xs font-mono font-bold mb-3">
          <Award className="w-3.5 h-3.5 text-[#FF6A00]" />
          <span>Industry Verified Credentials</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
          Certifications <span className="text-[#FF6A00]">Vault</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 font-medium">
          3D metallic badges featuring dynamic reflection shaders and parallax tilt that react to cursor vector physics.
        </p>
      </motion.div>

      {/* 3D Metallic Badge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CERTIFICATIONS_DATA.map((cert, index) => {
          const isActive = activeBadge === cert.id;
          const rotateX = isActive ? mousePos.y * -16 : 0;
          const rotateY = isActive ? mousePos.x * 16 : 0;

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
              onMouseMove={(e) => handleMouseMove(e, cert.id)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${isActive ? -8 : 0}px)`,
                transition: isActive ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
              }}
              className="bg-white dark:bg-[#1A1A1A] metallic-badge rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 hover:border-[#FF6A00]/60 relative group flex flex-col justify-between cursor-pointer overflow-hidden transition-all duration-250 ease-out shadow-md dark:shadow-none hover:shadow-[0_15px_35px_-10px_rgba(255,106,0,0.25)]"
            >
              {/* Cursor Spotlight Glow Following Mouse */}
              {isActive && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(350px circle at ${mousePos.px}px ${mousePos.py}px, rgba(255, 106, 0, 0.18), transparent 80%)`
                  }}
                />
              )}

              {/* Dynamic Metallic Light Reflection Overlay */}
              {isActive && (
                <div
                  className="metallic-reflection opacity-90 pointer-events-none"
                  style={{
                    transform: `translate(${mousePos.x * 120}px, ${mousePos.y * 120}px)`
                  }}
                />
              )}

              {/* Top Row: Metallic Crest & Verified Tag */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#FF6A00] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full bg-slate-100 dark:bg-[#0A0A0A] rounded-[14px] flex items-center justify-center">
                      {getIcon(cert.iconName)}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/15 text-[#FF6A00] text-xs font-mono font-bold group-hover:border-[#FF6A00]/50 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Title & Issuer */}
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-1 group-hover:text-[#FF6A00] transition-colors">
                  {cert.title}
                </h3>
                <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mb-4">
                  {cert.issuer} • {cert.date}
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/15 text-[10px] font-mono font-semibold text-slate-700 dark:text-slate-300 hover:border-[#FF6A00] hover:text-[#FF6A00] dark:hover:text-[#FF6A00] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Credential Link */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono relative z-10">
                <span className="text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                  Verified Credential
                </span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#FF6A00] font-bold hover:underline group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Verify</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
};
