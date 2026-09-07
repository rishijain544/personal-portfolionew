import React, { useState } from 'react';
import { HERO_DATA, EXACT_RESUME } from '../data/portfolioData';
import { User, Linkedin, Github, Mail, ArrowUpRight, Award, GraduationCap, Code } from 'lucide-react';
import { motion } from 'motion/react';

// Comprehensive list of paths where the user's uploaded photo might land
const UPLOADED_PHOTO_PATHS = [
  // Exact name provided by user
  '/assets/professional-pic.png',
  '/assets/professional-pic.jpg',
  '/professional-pic.png',
  '/professional-pic.jpg',
  // Assets folder paths
  '/assets/professional_pic.png',
  '/assets/professional pic.png',
  '/assets/professional_pic.jpg',
  '/assets/professional pic.jpg',
  '/assets/profile.png',
  '/assets/profile.jpg',
  '/assets/pic.png',
  '/assets/pic.jpg',
  '/assets/photo.png',
  '/assets/photo.jpg',
  '/assets/rishi.png',
  '/assets/rishi.jpg',
  '/assets/rishi_jain.png',
  '/assets/rishi_jain.jpg',
  '/assets/me.png',
  '/assets/me.jpg',
  '/assets/image.png',
  '/assets/image.jpg',
  '/assets/avatar.png',
  '/assets/avatar.jpg',
  // Root paths
  '/professional_pic.png',
  '/professional pic.png',
  '/professional_pic.jpg',
  '/professional pic.jpg',
  '/professional pic (1).png',
  '/profile.png',
  '/profile.jpg',
  '/pic.png',
  '/pic.jpg',
  '/photo.png',
  '/photo.jpg',
];

export const About: React.FC = () => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [imgFailedAll, setImgFailedAll] = useState(false);

  const handleImgError = () => {
    if (currentImgIndex < UPLOADED_PHOTO_PATHS.length - 1) {
      setCurrentImgIndex((prev) => prev + 1);
    } else {
      setImgFailedAll(true);
    }
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF6A00]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Two-Column Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Photo Card with Orange Circular Frame Accent (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="w-full max-w-md bg-white dark:bg-[#1A1A1A] rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-md dark:shadow-none relative overflow-hidden flex flex-col items-center justify-center text-center group">
            
            {/* Background Decorative Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            {/* Circular Frame Container */}
            <div className="relative my-4 flex items-center justify-center">
              
              {/* Solid Orange Background Disk (Peeking around edges) */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#FF6A00] absolute translate-x-3 translate-y-3 z-0 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300 shadow-xl" />

              {/* Photo Frame Container */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-slate-100 dark:border-[#0A0A0A] relative z-10 bg-slate-100 dark:bg-[#141414] shadow-2xl shrink-0 flex items-center justify-center">
                {!imgFailedAll ? (
                  <img
                    src={UPLOADED_PHOTO_PATHS[currentImgIndex]}
                    onError={handleImgError}
                    alt="Rishi Jain - AI & ML Engineer"
                    className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <User className="w-16 h-16 text-[#FF6A00] mb-2 opacity-80" />
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">Upload photo to</span>
                    <span className="text-xs font-mono text-[#FF6A00] font-bold">/public/assets</span>
                  </div>
                )}
              </div>

            </div>

            {/* Photo Card Footer / Info */}
            <div className="mt-6 relative z-10 flex flex-col items-center">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Rishi Jain
              </h3>
              <p className="text-xs font-mono text-[#FF6A00] font-semibold mt-0.5">
                B.Tech AI & ML • NIMS University
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                  CGPA 8.48 / 10
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300">
                  Rajasthan, India
                </span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Right Column: About Me Content & Bio Paragraphs (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Small Pill-Shaped Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-[#FF6A00] text-xs font-mono font-bold mb-4">
            <User className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>About Me</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            Architecting <span className="text-[#FF6A00]">End-to-End AI Systems</span> & Deep Learning Pipelines
          </h2>

          {/* Paragraph 1 with Inline Badge-Style Skill Tags */}
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-5 font-normal">
            B.Tech AI & ML Engineer at NIMS University specializing in{' '}
            <span className="inline-flex items-center px-2.5 py-0.5 my-0.5 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 text-xs font-mono font-bold mx-0.5">
              Deep Learning (ResNet & ViT)
            </span>,{' '}
            <span className="inline-flex items-center px-2.5 py-0.5 my-0.5 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 text-xs font-mono font-bold mx-0.5">
              Computer Vision
            </span>,{' '}
            <span className="inline-flex items-center px-2.5 py-0.5 my-0.5 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 text-xs font-mono font-bold mx-0.5">
              Generative AI & Gemini API
            </span>,{' '}
            <span className="inline-flex items-center px-2.5 py-0.5 my-0.5 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 text-xs font-mono font-bold mx-0.5">
              NLP Automation
            </span>,{' '}
            <span className="inline-flex items-center px-2.5 py-0.5 my-0.5 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 text-xs font-mono font-bold mx-0.5">
              FastAPI Microservices
            </span>, and interactive WebGL interfaces.
          </div>

          {/* Paragraph 2 with Inline Badge-Style Skill Tags */}
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-8 font-normal">
            B.Tech (AI & ML) student at NIMS University with expertise in building and deploying end-to-end machine learning systems. 7+ projects spanning classification, NLP, computer vision, and full-stack ML applications. Strong proficiency in{' '}
            <span className="inline-flex items-center px-2.5 py-0.5 my-0.5 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 text-xs font-mono font-bold mx-0.5">
              Python
            </span>,{' '}
            <span className="inline-flex items-center px-2.5 py-0.5 my-0.5 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 text-xs font-mono font-bold mx-0.5">
              PyTorch
            </span>,{' '}
            <span className="inline-flex items-center px-2.5 py-0.5 my-0.5 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 text-xs font-mono font-bold mx-0.5">
              TensorFlow
            </span>,{' '}
            <span className="inline-flex items-center px-2.5 py-0.5 my-0.5 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 text-xs font-mono font-bold mx-0.5">
              React & TypeScript
            </span>, and cloud deployment on{' '}
            <span className="inline-flex items-center px-2.5 py-0.5 my-0.5 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 text-xs font-mono font-bold mx-0.5">
              Vercel & Firebase
            </span>.
          </div>

          {/* Social Links Restyled as Bordered Pill Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200 dark:border-white/10 w-full">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold mr-2">Connect:</span>

            <a
              href={HERO_DATA.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/20 text-slate-800 dark:text-slate-200 text-xs font-bold hover:border-[#FF6A00] hover:text-[#FF6A00] dark:hover:text-[#FF6A00] transition-all cursor-pointer group shadow-sm dark:shadow-none"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-[#FF6A00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={HERO_DATA.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/20 text-slate-800 dark:text-slate-200 text-xs font-bold hover:border-[#FF6A00] hover:text-[#FF6A00] dark:hover:text-[#FF6A00] transition-all cursor-pointer group shadow-sm dark:shadow-none"
            >
              <Github className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-[#FF6A00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={`mailto:${HERO_DATA.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/20 text-slate-800 dark:text-slate-200 text-xs font-bold hover:border-[#FF6A00] hover:text-[#FF6A00] dark:hover:text-[#FF6A00] transition-all cursor-pointer group shadow-sm dark:shadow-none"
            >
              <Mail className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span>Email</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-[#FF6A00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </motion.div>

      </div>

    </section>
  );
};
