import React from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Cpu, Activity } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface ProjectSpecsModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectSpecsModal: React.FC<ProjectSpecsModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[90vh] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden bg-white dark:bg-[#0A0A0A]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-[#1A1A1A]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF6A00] font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#FF6A00]" />
            <span>{project.category} Specs</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-100 font-sans">
          
          <div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mb-2">
              {project.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Key Metrics */}
          <div>
            <h3 className="font-mono font-bold text-xs text-[#FF6A00] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#FF6A00]" />
              <span>Performance Benchmarks</span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 text-center">
                  <div className="text-xl font-bold font-mono text-[#FF6A00]">
                    <AnimatedCounter value={m.value} />
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-mono font-bold text-xs text-[#FF6A00] uppercase tracking-wider mb-3">
              Technical Highlights & Architectural Feats
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-mono font-bold text-xs text-[#FF6A00] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#FF6A00]" />
              <span>Technology Stack</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 text-xs font-mono font-medium text-slate-800 dark:text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#1A1A1A] hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-900 dark:text-white font-mono text-xs font-bold transition-all border border-slate-200 dark:border-white/10 cursor-pointer"
            >
              <Github className="w-4 h-4 text-[#FF6A00]" />
              <span>View GitHub Code Repository</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#ff7b1a] text-black font-mono text-xs font-bold transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live System</span>
              </a>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
