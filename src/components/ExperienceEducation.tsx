import React from 'react';
import { EXPERIENCE_DATA, EDUCATION_DATA } from '../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const ExperienceEducation: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Experience */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6A00]/10 border border-slate-200 dark:border-white/15 text-[#FF6A00] text-xs font-mono font-bold mb-3">
              <Briefcase className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span>Professional Career</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-8">
              Work <span className="text-[#FF6A00]">Experience</span>
            </h2>
          </motion.div>

          <div className="relative pl-4 sm:pl-6 ml-2 sm:ml-3">
            
            {/* Animated Scroll-Drawn Connecting Timeline Line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
              className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#FF6A00] via-slate-300 dark:via-white/20 to-transparent"
            />

            <div className="space-y-6">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.08 }}
                  className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 relative hover:border-[#FF6A00]/60 hover:-translate-y-1.5 transition-all duration-250 ease-out shadow-md dark:shadow-none hover:shadow-[0_12px_30px_-10px_rgba(255,106,0,0.2)] group"
                >
                  {/* Timeline Node Dot Pop-in */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ duration: 0.3, delay: idx * 0.08 + 0.15 }}
                    className="absolute -left-[25px] sm:-left-[33px] top-8 w-4 h-4 rounded-full bg-slate-100 dark:bg-[#0A0A0A] border-2 border-[#FF6A00] flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-200"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                  </motion.div>

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-200 dark:border-white/10">
                    <div>
                      <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white group-hover:text-[#FF6A00] transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-bold text-[#FF6A00] mt-0.5">
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-slate-500 dark:text-slate-400 gap-1 font-semibold">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/15 text-slate-800 dark:text-slate-200">
                        <Calendar className="w-3 h-3 text-[#FF6A00]" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3 h-3" />
                        {exp.location} • {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium mb-6">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <ChevronRight className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-2">
                    {exp.techUsed.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#0A0A0A] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/15 text-xs font-mono font-semibold hover:border-[#FF6A00] hover:text-[#FF6A00] dark:hover:text-[#FF6A00] transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Column: Education */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6A00]/10 border border-slate-200 dark:border-white/15 text-[#FF6A00] text-xs font-mono font-bold mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span>Academic Background</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-8">
              Education & <span className="text-[#FF6A00]">Training</span>
            </h2>
          </motion.div>

          <div className="relative pl-4 sm:pl-6 ml-2 sm:ml-3">
            
            {/* Animated Scroll-Drawn Connecting Timeline Line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
              className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#FF6A00] via-slate-300 dark:via-white/20 to-transparent"
            />

            <div className="space-y-6">
              {EDUCATION_DATA.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.08 }}
                  className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 relative hover:border-[#FF6A00]/60 hover:-translate-y-1.5 transition-all duration-250 ease-out shadow-md dark:shadow-none hover:shadow-[0_12px_30px_-10px_rgba(255,106,0,0.2)] group"
                >
                  {/* Timeline Node Dot Pop-in */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ duration: 0.3, delay: idx * 0.08 + 0.15 }}
                    className="absolute -left-[25px] sm:-left-[33px] top-8 w-4 h-4 rounded-full bg-slate-100 dark:bg-[#0A0A0A] border-2 border-[#FF6A00] flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-200"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                  </motion.div>

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-200 dark:border-white/10">
                    <div>
                      <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white group-hover:text-[#FF6A00] transition-colors">
                        {edu.institution}
                      </h3>
                      <div className="text-sm font-bold text-[#FF6A00] mt-0.5">
                        {edu.degree}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-slate-500 dark:text-slate-400 gap-1 font-semibold">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/15 text-slate-800 dark:text-slate-200">
                        <Calendar className="w-3 h-3 text-[#FF6A00]" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullets */}
                  {edu.bullets && edu.bullets.length > 0 && (
                    <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      {edu.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <ChevronRight className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
