import React, { useRef, useEffect } from 'react';
import { HERO_DATA } from '../data/portfolioData';
import { ArrowDownRight, Github, Linkedin, Mail, Sparkles, Terminal, Cpu, Brain, Layers } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { TypewriterTitle } from './TypewriterTitle';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const starfieldCanvasRef = useRef<HTMLCanvasElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  // Cursor Following Glow Effect
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    // Set initial center position
    const rect = heroEl.getBoundingClientRect();
    targetPos.current = { x: rect.width / 2, y: rect.height / 2 };
    currentPos.current = { x: rect.width / 2, y: rect.height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const currentRect = heroRef.current.getBoundingClientRect();
      targetPos.current = {
        x: e.clientX - currentRect.left,
        y: e.clientY - currentRect.top,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animFrameId: number;
    const animateGlow = () => {
      // Smooth linear interpolation (lerp) for gas-like trailing effect
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentPos.current.x - 300}px, ${currentPos.current.y - 300}px, 0)`;
      }

      animFrameId = requestAnimationFrame(animateGlow);
    };

    animFrameId = requestAnimationFrame(animateGlow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  // Subtle Starfield Particles Effect
  useEffect(() => {
    const canvas = starfieldCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // 180 subtle star particles
    const starCount = 180;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.2 + 0.8, // 1-2px diameter
      baseAlpha: Math.random() * 0.12 + 0.08, // 8% - 20% opacity
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    let time = 0;
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains('light');

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        // Gentle opacity pulsing (twinkle)
        const alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.05;
        const clampedAlpha = Math.max(0.05, Math.min(0.22, alpha));

        ctx.fillStyle = isLight ? `rgba(15, 23, 42, ${clampedAlpha * 1.5})` : `rgba(255, 255, 255, ${clampedAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen pt-32 pb-28 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col justify-center items-center">
      
      {/* Background Ambient Orbs - minimal dark */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-white/[0.02] rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Animated Subtle Starfield Background Layer */}
      <canvas
        ref={starfieldCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      />

      {/* Interactive Cursor-Following Glow Cloud */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          ref={glowRef}
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30 filter blur-[80px]"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 106, 0, 0.45) 0%, rgba(255, 166, 64, 0.22) 35%, rgba(255, 106, 0, 0.06) 60%, transparent 75%)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Main Two-Column Split Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Intro Line, Headline, Cursive Tagline, Bio & CTAs (6 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col items-start text-left"
        >
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/15 text-slate-800 dark:text-slate-300 text-xs font-mono font-bold mb-6 shadow-sm dark:shadow-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6A00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6A00]"></span>
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>NIMS University B.Tech (AI & ML) • May 2027</span>
          </motion.div>

          {/* Main Name Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-slate-900 dark:text-white leading-[1.02] mb-1"
          >
            Rishi <br />
            <span className="text-[#FF6A00]">
              Jain
            </span>
          </motion.h1>

          {/* Cursive / Handwritten Accent Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="font-['Caveat',_cursive] text-2xl sm:text-3xl text-[#FF6A00] tracking-wide mb-5 font-semibold flex items-center gap-2"
          >
            <span>~ crafting intelligent systems & scalable AI pipelines</span>
          </motion.div>

          {/* Professional Title with Rotating Typewriter Cursor Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TypewriterTitle titles={HERO_DATA.titles} className="mb-4" />
          </motion.div>

          {/* AI & ML Specialization Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            {HERO_DATA.aiSpecializations?.map((spec, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/15 text-xs font-mono font-bold text-slate-800 dark:text-slate-300 hover:border-[#FF6A00] hover:text-[#FF6A00] dark:hover:text-[#FF6A00] transition-all cursor-default"
              >
                <Brain className="w-3 h-3 text-[#FF6A00]" />
                <span>{spec}</span>
              </motion.span>
            ))}
          </motion.div>

          {/* Intro Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed mb-8 font-medium"
          >
            {HERO_DATA.bio}
          </motion.p>

          {/* Side-by-Side Call-to-Action Elements */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-3 w-full max-w-xl mb-8 flex-wrap"
          >
            {/* Bordered Orange Outline Pill Resume Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenResumeModal}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-transparent text-[#FF6A00] border-2 border-[#FF6A00] font-bold text-sm hover:bg-[#FF6A00] hover:text-black transition-all duration-200 cursor-pointer shadow-none shrink-0"
            >
              <Terminal className="w-4 h-4" />
              <span>Resume</span>
            </motion.button>

            {/* Quick Link Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="p-3.5 rounded-full bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:text-[#FF6A00] dark:hover:text-[#FF6A00] hover:border-[#FF6A00] transition-all shadow-sm dark:shadow-none"
                aria-label="Explore Projects"
                title="Explore Projects"
              >
                <ArrowDownRight className="w-4 h-4 text-[#FF6A00]" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={HERO_DATA.github}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-full bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:text-[#FF6A00] dark:hover:text-[#FF6A00] hover:border-[#FF6A00] transition-all shadow-sm dark:shadow-none"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={HERO_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-full bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:text-[#FF6A00] dark:hover:text-[#FF6A00] hover:border-[#FF6A00] transition-all shadow-sm dark:shadow-none"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Metrics Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none"
          >
            {HERO_DATA.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-display font-black text-2xl sm:text-3xl text-[#FF6A00]">
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  {stat.label}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-medium">
                  {stat.detail}
                </span>
              </div>
            ))}
          </motion.div>

        </motion.div>

        {/* Right Column: Visual Graphic Container Space with Floating Widget Cards (6 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex justify-center items-center w-full min-h-[400px] sm:min-h-[480px] relative my-6 sm:my-0"
        >
          {/* Floating Widget Card 1: Featured Project Highlight Overlay */}
          <motion.div
            initial={{ opacity: 0, y: -20, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -top-3 sm:-top-4 -right-1 sm:-right-2 z-10 w-72 sm:w-80 bg-white dark:bg-[#1A1A1A] rounded-xl p-4 border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/80 backdrop-blur-md hidden sm:block"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono font-bold tracking-wider text-[#FF6A00] uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
                Featured Project
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">01 / 07</span>
            </div>
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-1">
              BrainGuard AI
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3 line-clamp-2">
              Brain tumor MRI classification suite with 3 PyTorch models & FastAPI real-time inference.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['PyTorch', 'FastAPI', 'React', 'Hugging Face'].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-800 dark:text-slate-300 font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Floating Widget Card 2: Production Performance Metric Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -bottom-3 sm:-bottom-4 -left-1 sm:-left-2 z-10 w-64 sm:w-72 bg-white dark:bg-[#1A1A1A] rounded-xl p-3.5 border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/80 backdrop-blur-md hidden sm:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-[#FF6A00]/10 border border-[#FF6A00]/30 flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5 text-[#FF6A00]" />
            </div>
            <div>
              <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">
                Model Validation Metric
              </div>
              <div className="font-display font-bold text-xs text-slate-900 dark:text-white">
                95.4% Tumor Scan Recall
              </div>
              <div className="text-[10px] font-mono text-[#FF6A00] font-bold">
                ResNet50 + Hybrid ViT
              </div>
            </div>
          </motion.div>

          {/* Proportional Base Container Reserved for Visual Graphic */}
          <div className="w-full max-w-lg bg-white dark:bg-[#141414] rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-md dark:shadow-none relative overflow-hidden group transition-all duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#FF6A00]" />
                <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  ML Pipeline Stack
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/20 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                ACTIVE
              </span>
            </div>

            {/* Interactive Model Flow Cards */}
            <div className="space-y-3 font-mono text-xs">
              
              {/* Layer 1 */}
              <motion.div
                whileHover={{ x: 4 }}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#FF6A00]" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">Data & Preprocessing</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">TF-IDF • Tokenization • Vectorization</div>
                  </div>
                </div>
                <span className="text-[10px] text-[#FF6A00] bg-[#FF6A00]/10 px-2 py-0.5 rounded-full font-bold">40% Faster</span>
              </motion.div>

              {/* Layer 2 */}
              <motion.div
                whileHover={{ x: 4 }}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">Model Inference Engine</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">ResNet50 • PyTorch ViT • Scikit-learn</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold">95%+ Acc</span>
              </motion.div>

              {/* Layer 3 */}
              <motion.div
                whileHover={{ x: 4 }}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#FF6A00]" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">Microservice Deployment</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">FastAPI • Docker • Vercel • Railway</div>
                  </div>
                </div>
                <span className="text-[10px] text-[#FF6A00] bg-[#FF6A00]/10 px-2 py-0.5 rounded-full font-bold">120ms API</span>
              </motion.div>

            </div>

            {/* Live Interactive Neural Activation Wave */}
            <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0A0A0A] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 flex items-center justify-between shadow-none">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#FF6A00]" />
                <span className="text-[11px] font-mono text-[#FF6A00] font-bold">Live Loss Minimization:</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-xs text-[#FF6A00] font-bold">
                <span>0.0042</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400">(Epoch 50/50)</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

    </section>
  );
};

