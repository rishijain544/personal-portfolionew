import React, { useState } from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { 
  Cpu, GraduationCap, Calendar, MapPin, Award, Activity, 
  Database, Code, Terminal, Brain, Layers, Eye, Sparkles, 
  Globe, Zap, Layout, BarChart3, Box, Cloud, Flame, 
  GitBranch, Bot, Scan, MessageSquare, Server, Table, FileCode, Braces
} from 'lucide-react';
import { motion } from 'motion/react';
import { OrbitalSkills } from './OrbitalSkills';

// Skill Category mapping with matching Lucide icons for each pill tag
interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillGroup {
  category: string;
  skills: SkillItem[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "Python", icon: <Terminal className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "SQL", icon: <Database className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "JavaScript", icon: <FileCode className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "TypeScript", icon: <Code className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "C / C++", icon: <Braces className="w-3.5 h-3.5 text-slate-300" /> }
    ]
  },
  {
    category: "ML & AI Frameworks",
    skills: [
      { name: "PyTorch", icon: <Brain className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "TensorFlow", icon: <Layers className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "Scikit-learn", icon: <Activity className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "OpenCV", icon: <Eye className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "Transformers (Hugging Face)", icon: <Sparkles className="w-3.5 h-3.5 text-slate-300" /> }
    ]
  },
  {
    category: "Frameworks & Web",
    skills: [
      { name: "React / Next.js", icon: <Globe className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "FastAPI", icon: <Zap className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "Streamlit", icon: <Layout className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "Pandas & NumPy", icon: <Table className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "Plotly & Matplotlib", icon: <BarChart3 className="w-3.5 h-3.5 text-slate-300" /> }
    ]
  },
  {
    category: "Cloud, DB & Tools",
    skills: [
      { name: "Docker", icon: <Box className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "Vercel", icon: <Cloud className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "Firebase", icon: <Flame className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "AWS (Solutions Arch)", icon: <Cloud className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "Git & GitHub Actions", icon: <GitBranch className="w-3.5 h-3.5 text-slate-300" /> }
    ]
  },
  {
    category: "Specialized Domains",
    skills: [
      { name: "Prompt Engineering & GenAI", icon: <Bot className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "Computer Vision & ResNet/ViT", icon: <Scan className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "NLP & Cosine Ranking", icon: <MessageSquare className="w-3.5 h-3.5 text-slate-300" /> },
      { name: "REST APIs & Microservices", icon: <Server className="w-3.5 h-3.5 text-slate-300" /> }
    ]
  }
];

// Dashboard & Visual Work Preview Cards Data
const VISUAL_WORK_PREVIEWS = [
  {
    id: "whatsapp-analytics",
    label: "WhatsApp Chat Analytics Dashboard",
    category: "Data Analytics & Sentiment",
    description: "15+ statistical metrics, activity heatmaps & VADER sentiment analysis.",
    previewType: "heatmap"
  },
  {
    id: "model-hub",
    label: "Model Hub Pro ML Visualizer",
    category: "AutoML & Hyperparameters",
    description: "No-code ML workflow with live training, confusion matrices & 6+ models.",
    previewType: "roc"
  },
  {
    id: "intellibank-fraud",
    label: "IntelliBank Fraud & Risk Dashboard",
    category: "FinTech Anomaly Scoring",
    description: "Sub-85ms transaction fraud scoring & credit risk underwriting.",
    previewType: "fraud"
  }
];

export const SkillsMatrix: React.FC = () => {
  const [mousePos, setMousePos] = useState({ px: 0, py: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      px: e.clientX - rect.left,
      py: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* 3D Universal Orbit Showcase Animation */}
      <div className="mb-16">
        <OrbitalSkills />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-[#FF6A00] text-xs font-mono font-bold mb-3">
          <Cpu className="w-4 h-4 text-[#FF6A00]" />
          <span>Technical Capabilities & Stack</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
          Skills & <span className="text-[#FF6A00]">Visual Analytics</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 font-medium max-w-2xl">
          Categorized technical proficiency across Machine Learning, Full-Stack Development, Cloud Infrastructure, and live visual dashboards.
        </p>
      </motion.div>

      {/* Categorized Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column (lg:col-span-7): Categorized Skills List */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsHovered(false)}
          className="lg:col-span-7 space-y-8 bg-white/90 dark:bg-[#1A1A1A]/90 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden transition-all duration-250 ease-out hover:border-[#FF6A00]/50 shadow-md dark:shadow-none hover:shadow-[0_15px_35px_-10px_rgba(255,106,0,0.15)]"
        >
          {/* Subtle Cursor Spotlight Glow */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(400px circle at ${mousePos.px}px ${mousePos.py}px, rgba(255, 106, 0, 0.12), transparent 80%)`
              }}
            />
          )}

          <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4 flex items-center justify-between relative z-10">
            <span>Technical Skills Matrix</span>
            <span className="text-xs font-mono font-bold text-[#FF6A00] bg-slate-100 dark:bg-[#0A0A0A] px-3 py-1 rounded-full border border-[#FF6A00]/30">
              24 Core Skills
            </span>
          </h3>

          <div className="space-y-7 relative z-10">
            {SKILL_GROUPS.map((group, groupIdx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.4, delay: groupIdx * 0.06 }}
                className="space-y-3"
              >
                {/* Bold Category Label */}
                <h4 className="font-mono text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
                  {group.category}
                </h4>

                {/* Skill Pill Badges Row with Stagger & Lift-on-Hover */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {group.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.05 }}
                      transition={{ duration: 0.3, delay: groupIdx * 0.06 + skillIdx * 0.03 }}
                      className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-[#141414] border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono font-medium flex items-center gap-2 shadow-sm hover:border-[#FF6A00]/70 hover:bg-slate-200 dark:hover:bg-[#1A1A1A] hover:-translate-y-1 hover:shadow-[0_8px_20px_-6px_rgba(255,106,0,0.3)] transition-all duration-200 cursor-pointer group/pill"
                    >
                      {skill.icon}
                      <span className="text-slate-800 dark:text-slate-100 font-semibold group-hover/pill:text-[#FF6A00] dark:group-hover/pill:text-white transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column (lg:col-span-5): Dashboards & Education Cards */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Visual Work & Dashboards Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-white/90 dark:bg-[#1A1A1A]/90 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-5 hover:border-[#FF6A00]/50 shadow-md dark:shadow-none transition-all duration-250 ease-out"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#FF6A00]" />
                <span>Dashboards & Visual Work</span>
              </h3>
              <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-[#0A0A0A] px-2.5 py-1 rounded-full border border-slate-200 dark:border-white/10">
                Interactive
              </span>
            </div>

            {/* Grid of Preview Cards */}
            <div className="grid grid-cols-1 gap-4">
              {VISUAL_WORK_PREVIEWS.map((item, itemIdx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.4, delay: itemIdx * 0.08 }}
                  className="bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 hover:border-[#FF6A00]/60 hover:-translate-y-1.5 hover:shadow-[0_12px_25px_-8px_rgba(255,106,0,0.25)] transition-all duration-250 ease-out group cursor-pointer"
                >
                  {/* Image/Visual Mock Graphic */}
                  <div className="w-full h-24 rounded-xl bg-slate-100 dark:bg-[#141414] border border-slate-200 dark:border-white/10 p-3 mb-3 relative overflow-hidden flex items-center justify-center">
                    
                    {item.previewType === 'heatmap' && (
                      <div className="w-full h-full flex flex-col justify-between">
                        <div className="flex justify-between items-center text-[9px] font-mono text-[#FF6A00]">
                          <span>Chat Heatmap Matrix</span>
                          <span>98.4% Accuracy</span>
                        </div>
                        <div className="grid grid-cols-8 gap-1 my-1">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-3 rounded ${
                                i % 3 === 0
                                  ? 'bg-[#FF6A00]'
                                  : i % 2 === 0
                                  ? 'bg-slate-400 dark:bg-neutral-700'
                                  : 'bg-slate-200 dark:bg-[#1A1A1A]'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 dark:text-slate-400">
                          <span>VADER Positive: 68%</span>
                          <span>Peak: 10 PM</span>
                        </div>
                      </div>
                    )}

                    {item.previewType === 'roc' && (
                      <div className="w-full h-full flex flex-col justify-between">
                        <div className="flex justify-between items-center text-[9px] font-mono text-[#FF6A00]">
                          <span>ROC Curve & AUC Score</span>
                          <span>AUC = 0.965</span>
                        </div>
                        <div className="w-full h-8 border-b border-l border-slate-300 dark:border-white/20 relative flex items-end">
                          <svg className="w-full h-full" viewBox="0 0 100 30">
                            <path d="M0,30 Q20,5 100,2" fill="none" stroke="#FF6A00" strokeWidth="2" />
                          </svg>
                        </div>
                        <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 dark:text-slate-400">
                          <span>Random Forest • SVM</span>
                          <span>6+ Algorithms</span>
                        </div>
                      </div>
                    )}

                    {item.previewType === 'fraud' && (
                      <div className="w-full h-full flex flex-col justify-between">
                        <div className="flex justify-between items-center text-[9px] font-mono text-[#FF6A00]">
                          <span>FinTech Fraud Anomaly Score</span>
                          <span>Risk: 3.2%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-[#1A1A1A] overflow-hidden my-1">
                          <div className="w-1/3 h-full bg-[#FF6A00]" />
                        </div>
                        <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 dark:text-slate-400">
                          <span>Latency &lt; 85ms</span>
                          <span>Underwriting Approved</span>
                        </div>
                      </div>
                    )}

                  </div>

                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#FF6A00] transition-colors">
                    {item.label}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs font-mono mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Entries Restyled Cards */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-display font-bold text-lg px-1">
              <GraduationCap className="w-5 h-5 text-[#FF6A00]" />
              <span>Academic Education</span>
            </div>

            {EDUCATION_DATA.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.45 }}
                className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 bg-white dark:bg-[#1A1A1A] p-6 shadow-md dark:shadow-2xl group hover:border-[#FF6A00]/60 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_-10px_rgba(255,106,0,0.25)] transition-all duration-250 ease-out"
              >
                {/* Background Image with Dark Atmospheric Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-15 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80')`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 dark:from-[#0A0A0A] dark:via-[#0A0A0A]/90 to-transparent -z-1" />

                <div className="relative z-10 space-y-3">
                  
                  {/* Years & Location Small Label Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#0A0A0A]/90 border border-slate-200 dark:border-white/15 text-slate-800 dark:text-slate-300 text-xs font-mono font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#FF6A00]" />
                    <span>{edu.period}</span>
                    <span className="text-slate-400 dark:text-slate-500">•</span>
                    <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>{edu.location}</span>
                  </div>

                  {/* Degree + Institution Heading */}
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white group-hover:text-[#FF6A00] transition-colors leading-tight">
                      {edu.degree}
                    </h3>
                    <div className="text-sm font-bold text-[#FF6A00] font-mono mt-1 flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#FF6A00]" />
                      <span>{edu.institution}</span>
                    </div>
                  </div>

                  {/* Description / Bullets */}
                  {edu.bullets && edu.bullets.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                      {edu.bullets.map((b, i) => (
                        <p key={i}>{b}</p>
                      ))}
                    </div>
                  )}

                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};
