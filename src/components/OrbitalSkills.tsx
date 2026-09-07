import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Zap, Cpu, Layers, Radio, Compass } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface OrbitTech {
  id: string;
  name: string;
  category: 'AI & ML' | 'Languages' | 'Full-Stack' | 'Cloud & Tools';
  level: number;
  color: string;
  glowColor: string;
  ringIndex: 0 | 1 | 2; // 0 = Inner, 1 = Middle, 2 = Outer
  initialAngle: number;
  iconSvg: React.ReactNode;
  description: string;
}

export const OrbitalSkills: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [selectedRing, setSelectedRing] = useState<number | 'all'>('all');
  const [activeTech, setActiveTech] = useState<OrbitTech | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [angleOffset, setAngleOffset] = useState<number>(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Expanded Orbital Tech Data including core Programming Languages
  const techData: OrbitTech[] = [
    // Inner Ring (Ring 0) - Core Languages & Primary Frameworks
    {
      id: 'python',
      name: 'Python',
      category: 'Languages',
      level: 95,
      color: '#3776AB',
      glowColor: 'rgba(55, 118, 171, 0.7)',
      ringIndex: 0,
      initialAngle: 0,
      description: 'Primary language for Machine Learning model training, NumPy/Pandas data processing, and FastAPI backends.',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#3776AB]">
          <path d="M12 2c-3.1 0-5.2 1.3-5.2 3.8v2.1h5.3v.8H5.1C2.5 8.7 1 10.4 1 13.5c0 3.1 1.7 4.9 4.3 4.9h2.5v-2.3c0-2 1.4-3.5 3.5-3.5h5.1c1.8 0 3.2-1.4 3.2-3.2V5.8C19.7 3.3 17.5 2 12 2zm-2.3 3c.7 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2-1.2-.5-1.2-1.2.5-1.2 1.2-1.2z"/>
          <path d="M12 22c3.1 0 5.2-1.3 5.2-3.8v-2.1h-5.3v-.8h7c2.6 0 4.1-1.7 4.1-4.8 0-3.1-1.7-4.9-4.3-4.9h-2.5v2.3c0 2-1.4 3.5-3.5 3.5H7.6c-1.8 0-3.2 1.4-3.2 3.2v3.6C4.4 20.7 6.6 22 12 22zm2.3-3c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2-.5 1.2-1.2 1.2z"/>
        </svg>
      )
    },
    {
      id: 'cpp',
      name: 'C++',
      category: 'Languages',
      level: 88,
      color: '#00599C',
      glowColor: 'rgba(0, 89, 156, 0.7)',
      ringIndex: 0,
      initialAngle: 0.9,
      description: 'High-performance C++ systems programming, memory optimization, data structures, and algorithmic execution.',
      iconSvg: (
        <span className="font-black text-xs font-mono text-[#00599C]">C++</span>
      )
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Languages',
      level: 90,
      color: '#3178C6',
      glowColor: 'rgba(49, 120, 198, 0.7)',
      ringIndex: 0,
      initialAngle: 1.8,
      description: 'Strongly-typed frontend architectures, scalable API contracts, and robust asynchronous type definitions.',
      iconSvg: (
        <span className="font-extrabold text-[11px] font-mono text-[#3178C6]">TS</span>
      )
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'Languages',
      level: 92,
      color: '#F7DF1E',
      glowColor: 'rgba(247, 223, 30, 0.7)',
      ringIndex: 0,
      initialAngle: 2.7,
      description: 'ES6+ modern web scripting, event loops, dynamic client interactions, and asynchronous REST APIs.',
      iconSvg: (
        <span className="font-black text-xs font-mono text-[#F7DF1E]">JS</span>
      )
    },
    {
      id: 'pytorch',
      name: 'PyTorch',
      category: 'AI & ML',
      level: 92,
      color: '#EE4C2C',
      glowColor: 'rgba(238, 76, 44, 0.7)',
      ringIndex: 0,
      initialAngle: 3.6,
      description: 'Deep Learning pipeline architecture, ResNet/ViT training, dynamic computation graphs, and tensor operations.',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#EE4C2C]">
          <path d="M12 2L9.5 4.5l2.5 2.5 2.5-2.5L12 2zm0 5L4.5 14.5l2.1 2.1L12 11.2l5.4 5.4 2.1-2.1L12 7zm0 10l-2.5 2.5L12 22l2.5-2.5L12 17z"/>
        </svg>
      )
    },
    {
      id: 'react',
      name: 'React',
      category: 'Full-Stack',
      level: 92,
      color: '#61DAFB',
      glowColor: 'rgba(97, 218, 251, 0.7)',
      ringIndex: 0,
      initialAngle: 4.5,
      description: 'Interactive component-driven UI development, WebGL 3D graphics, motion animations, and state hooks.',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#61DAFB]">
          <ellipse cx="12" cy="12" rx="3" ry="8" transform="rotate(30 12 12)"/>
          <ellipse cx="12" cy="12" rx="3" ry="8" transform="rotate(90 12 12)"/>
          <ellipse cx="12" cy="12" rx="3" ry="8" transform="rotate(150 12 12)"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      )
    },
    {
      id: 'fastapi',
      name: 'FastAPI',
      category: 'Full-Stack',
      level: 90,
      color: '#009688',
      glowColor: 'rgba(0, 150, 136, 0.7)',
      ringIndex: 0,
      initialAngle: 5.4,
      description: 'High-speed asynchronous Python REST API microservices for real-time GPU/CPU ML model inference.',
      iconSvg: (
        <Zap className="w-4 h-4 text-[#009688]" />
      )
    },

    // Middle Ring (Ring 1) - AI & Database Languages & Frameworks
    {
      id: 'sql',
      name: 'SQL',
      category: 'Languages',
      level: 90,
      color: '#4479A1',
      glowColor: 'rgba(68, 121, 161, 0.7)',
      ringIndex: 1,
      initialAngle: 0.2,
      description: 'Relational database schema design, complex joins, indexing, query optimization, and PostgreSQL.',
      iconSvg: (
        <span className="font-extrabold text-[10px] font-mono text-[#4479A1]">SQL</span>
      )
    },
    {
      id: 'java',
      name: 'Java',
      category: 'Languages',
      level: 82,
      color: '#ED8B00',
      glowColor: 'rgba(237, 139, 0, 0.7)',
      ringIndex: 1,
      initialAngle: 1.1,
      description: 'Object-oriented programming principles, multi-threading, and enterprise backend fundamentals.',
      iconSvg: (
        <span className="font-black text-[11px] font-mono text-[#ED8B00]">JAVA</span>
      )
    },
    {
      id: 'tensorflow',
      name: 'TensorFlow',
      category: 'AI & ML',
      level: 88,
      color: '#FF6F00',
      glowColor: 'rgba(255, 111, 0, 0.7)',
      ringIndex: 1,
      initialAngle: 2.0,
      description: 'Keras neural network modeling, MobileNet quantization, TensorFlow Lite, and TensorBoard logging.',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#FF6F00]">
          <path d="M12 2l-7 4v12l7 4 7-4V6l-7-4zm-5 13.5V8.5L12 5.6l5 2.9v7l-5 2.9-5-2.9z"/>
        </svg>
      )
    },
    {
      id: 'opencv',
      name: 'OpenCV',
      category: 'AI & ML',
      level: 85,
      color: '#5C3EE8',
      glowColor: 'rgba(92, 62, 232, 0.7)',
      ringIndex: 1,
      initialAngle: 2.9,
      description: 'Computer Vision image transformation pipelines, contour detection, face recognition, and video tracking.',
      iconSvg: (
        <Compass className="w-4 h-4 text-[#5C3EE8]" />
      )
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'Cloud & Tools',
      level: 85,
      color: '#2496ED',
      glowColor: 'rgba(36, 150, 237, 0.7)',
      ringIndex: 1,
      initialAngle: 3.8,
      description: 'Multi-stage containerization for ML microservices, Docker Compose orchestration, and reproducible builds.',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#2496ED]">
          <path d="M13 11.5h-2v-2h2v2zm-3 0H8v-2h2v2zm-3 0H5v-2h2v2zm3-3H8v-2h2v2zm3 0h-2v-2h2v2zm3 0h-2v-2h2v2zm3 3h-2v-2h2v2zm1 3H2c0 3.3 2.7 6 6 6 4.5 0 8.2-3 9.7-7.2 1-.2 2.1-.7 2.3-1.8-.8 0-1.8.3-2.5.8z"/>
        </svg>
      )
    },
    {
      id: 'scikit',
      name: 'Scikit-Learn',
      category: 'AI & ML',
      level: 95,
      color: '#F7931E',
      glowColor: 'rgba(247, 147, 30, 0.7)',
      ringIndex: 1,
      initialAngle: 4.7,
      description: 'Classical ML algorithms (SVM, Random Forest, Gradient Boosting), PCA dimensionality reduction, and evaluation metrics.',
      iconSvg: (
        <Cpu className="w-4 h-4 text-[#F7931E]" />
      )
    },
    {
      id: 'huggingface',
      name: 'Hugging Face',
      category: 'AI & ML',
      level: 88,
      color: '#FFD21E',
      glowColor: 'rgba(255, 210, 30, 0.7)',
      ringIndex: 1,
      initialAngle: 5.5,
      description: 'Transformer models, Hugging Face Spaces deployment, LLM fine-tuning, and model tokenization.',
      iconSvg: (
        <span className="text-sm font-bold">🤗</span>
      )
    },

    // Outer Ring (Ring 2) - Web, Cloud, Markup & Tools
    {
      id: 'html-css',
      name: 'HTML5 & CSS3',
      category: 'Languages',
      level: 95,
      color: '#E34F26',
      glowColor: 'rgba(227, 79, 38, 0.7)',
      ringIndex: 2,
      initialAngle: 0.1,
      description: 'Semantic HTML markup, CSS Flexbox/Grid, Tailwind CSS utilities, glassmorphism, and responsive design.',
      iconSvg: (
        <span className="font-black text-[10px] font-mono text-[#E34F26]">HTML</span>
      )
    },
    {
      id: 'aws',
      name: 'AWS',
      category: 'Cloud & Tools',
      level: 82,
      color: '#FF9900',
      glowColor: 'rgba(255, 153, 0, 0.7)',
      ringIndex: 2,
      initialAngle: 1.0,
      description: 'AWS Cloud foundations, EC2 instance hosting, S3 cloud storage buckets, and IAM policy permissions.',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#FF9900]">
          <path d="M6.7 13.5c-1.3 0-2.3-.4-3-1.2C3 11.5 2.6 10.4 2.6 9c0-1.5.4-2.6 1.3-3.4.9-.8 2-1.2 3.4-1.2 1.3 0 2.3.4 3 1.1s1 1.7 1 2.9v1.8H5.2c.1.7.4 1.3.8 1.7.5.4 1.1.6 1.8.6.8 0 1.5-.3 2.1-.9l1.1 1.2c-.9.9-2.3 1.3-4.3 1.3zM8 6.1c-.6 0-1 .2-1.3.5-.3.3-.5.8-.6 1.3h3.8c0-.5-.2-1-.5-1.3-.4-.3-.8-.5-1.4-.5z"/>
          <path d="M12 17c5 0 9-1.5 11-3-.4 1-1.3 1.8-2.6 2.4-2.3 1-5 1.5-8.4 1.5-3.3 0-6.1-.5-8.4-1.5C2.3 15.8 1.4 15 .9 14c2 1.5 6.1 3 11.1 3z"/>
        </svg>
      )
    },
    {
      id: 'pandas-numpy',
      name: 'Pandas & NumPy',
      category: 'AI & ML',
      level: 95,
      color: '#387EF8',
      glowColor: 'rgba(56, 126, 248, 0.7)',
      ringIndex: 2,
      initialAngle: 1.9,
      description: 'High-performance matrix linear algebra, DataFrame transformations, data cleaning, and statistical processing.',
      iconSvg: (
        <Layers className="w-4 h-4 text-[#387EF8]" />
      )
    },
    {
      id: 'vercel',
      name: 'Vercel',
      category: 'Cloud & Tools',
      level: 92,
      color: '#FFFFFF',
      glowColor: 'rgba(255, 255, 255, 0.7)',
      ringIndex: 2,
      initialAngle: 2.8,
      description: 'Continuous integration deployments, edge serverless functions, and instant global CDN distribution.',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-slate-100">
          <path d="M12 1L24 22H0L12 1z"/>
        </svg>
      )
    },
    {
      id: 'firebase',
      name: 'Firebase',
      category: 'Cloud & Tools',
      level: 88,
      color: '#FFCA28',
      glowColor: 'rgba(255, 202, 40, 0.7)',
      ringIndex: 2,
      initialAngle: 3.7,
      description: 'Firestore real-time document database synchronization, Firebase Authentication, and security rules.',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#FFCA28]">
          <path d="M3.8 17.7L8.6 2.3c.1-.4.7-.4.8 0l2.3 7.3L3.8 17.7zm16.4 0l-3.2-10.2c-.1-.4-.7-.4-.8 0l-1.3 4.2 5.3 6zm-7.6-4l-2.1-6.7-6.2 10.7 8.3-4z"/>
        </svg>
      )
    },
    {
      id: 'streamlit',
      name: 'Streamlit',
      category: 'Full-Stack',
      level: 94,
      color: '#FF4B4B',
      glowColor: 'rgba(255, 75, 75, 0.7)',
      ringIndex: 2,
      initialAngle: 4.6,
      description: 'Rapid Machine Learning GUI prototyping, interactive model widgets, and live web application demos.',
      iconSvg: (
        <Radio className="w-4 h-4 text-[#FF4B4B]" />
      )
    },
    {
      id: 'bash-git',
      name: 'Bash & Git',
      category: 'Cloud & Tools',
      level: 90,
      color: '#4EAA25',
      glowColor: 'rgba(78, 170, 37, 0.7)',
      ringIndex: 2,
      initialAngle: 5.5,
      description: 'Linux shell scripting, version control workflows, branch merging, pull requests, and CI/CD pipelines.',
      iconSvg: (
        <span className="font-extrabold text-[10px] font-mono text-[#4EAA25]">&gt;_</span>
      )
    }
  ];

  // Ring radii and speed settings
  const rings = [
    { radiusX: 135, radiusY: 58, speed: 0.25, tiltAngle: -20, label: 'Inner Core: Core Languages' },
    { radiusX: 215, radiusY: 88, speed: -0.18, tiltAngle: 22, label: 'Mid Orbit: AI, SQL & ML' },
    { radiusX: 295, radiusY: 118, speed: 0.12, tiltAngle: -10, label: 'Outer Orbit: Cloud, Web & DevOps' },
  ];

  // Mouse move handler for 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Ultra-smooth high-fps animation loop driven by performance.now() timestamp deltas
  useEffect(() => {
    const updateOrbit = (now: number) => {
      if (lastTimeRef.current !== null) {
        const dt = (now - lastTimeRef.current) / 1000;
        if (isPlaying) {
          setAngleOffset((prev) => prev + dt * speedMultiplier);
        }
      }
      lastTimeRef.current = now;
      animFrameRef.current = requestAnimationFrame(updateOrbit);
    };

    animFrameRef.current = requestAnimationFrame(updateOrbit);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, speedMultiplier]);

  // Calculate 3D position for a tech item based on current angleOffset
  const getTechPosition = (tech: OrbitTech) => {
    const ring = rings[tech.ringIndex];
    // Current angle based on initial angle + angleOffset * ring speed
    const currentAngle = tech.initialAngle + angleOffset * ring.speed;

    const rawX = Math.cos(currentAngle) * ring.radiusX;
    const rawY = Math.sin(currentAngle) * ring.radiusY;

    // Convert tilt angle to radians
    const tiltRad = (ring.tiltAngle * Math.PI) / 180;

    // Rotated 2D projected coordinates with 3D Z-depth approximation
    const rotatedX = rawX * Math.cos(tiltRad) - rawY * Math.sin(tiltRad);
    const rotatedY = rawX * Math.sin(tiltRad) + rawY * Math.cos(tiltRad);

    // Z value determines scale and z-index (front vs back of orbit)
    const z = Math.sin(currentAngle);
    const scale = 0.75 + (z + 1) * 0.25; // Scale from 0.75x (back) to 1.25x (front)
    const opacity = 0.55 + (z + 1) * 0.22; // Opacity from 0.55 to 1.0
    const zIndex = Math.round((z + 1) * 100);

    return {
      x: rotatedX,
      y: rotatedY,
      scale,
      opacity,
      zIndex,
      isFront: z > 0,
    };
  };

  const filteredTechs = techData.filter(
    (t) => selectedRing === 'all' || t.ringIndex === selectedRing
  );

  return (
    <div className="space-y-6 my-10">
      
      {/* Universal Orbit Header & Control Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#1A1A1A] rounded-3xl p-5 border border-slate-200 dark:border-white/10 shadow-md dark:shadow-none">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6A00]/10 border border-slate-200 dark:border-white/15 text-[#FF6A00] text-xs font-mono font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-[#FF6A00] animate-spin-slow" />
            <span>3D Interactive Universal Orbit</span>
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
            Programming Languages & <span className="text-[#FF6A00]">Skill Universe</span>
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 font-medium">
            Smoothly rotating orbital system featuring Python, C++, TypeScript, JavaScript, SQL, PyTorch, React & cloud tools.
          </p>
        </div>

        {/* Orbit Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Ring Filter Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#0A0A0A] p-1 rounded-xl border border-slate-200 dark:border-white/15 text-xs font-mono">
            <button
              onClick={() => setSelectedRing('all')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                selectedRing === 'all'
                  ? 'bg-[#FF6A00] text-black font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              All Orbits
            </button>
            <button
              onClick={() => setSelectedRing(0)}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                selectedRing === 0
                  ? 'bg-[#FF6A00] text-black font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Inner
            </button>
            <button
              onClick={() => setSelectedRing(1)}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                selectedRing === 1
                  ? 'bg-[#FF6A00] text-black font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Middle
            </button>
            <button
              onClick={() => setSelectedRing(2)}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                selectedRing === 2
                  ? 'bg-[#FF6A00] text-black font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Outer
            </button>
          </div>

          {/* Speed & Play Controls */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-[#0A0A0A] hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/15 transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Orbit' : 'Play Orbit'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-[#FF6A00]" /> : <Play className="w-4 h-4 text-[#FF6A00]" />}
          </button>

          <button
            onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 0.5 : 1))}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#0A0A0A] hover:bg-slate-200 dark:hover:bg-neutral-800 text-xs font-mono text-[#FF6A00] border border-slate-200 dark:border-white/15 transition-colors font-bold flex items-center gap-1 cursor-pointer"
            title="Toggle Speed"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{speedMultiplier}x Speed</span>
          </button>
        </div>
      </div>

      {/* Main 3D Orbit Canvas Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[480px] sm:h-[540px] rounded-3xl bg-[#0A0A0A] border border-white/10 overflow-hidden flex items-center justify-center shadow-none transition-transform duration-300 ease-out"
        style={{
          perspective: '1200px',
        }}
      >
        {/* Background Cosmic Starfield & Grid */}
        <div className="absolute inset-0 bg-[#0A0A0A] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {/* 3D Orbit Stage Container (tilts gently on mouse movement) */}
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Central Sun / AI Core */}
          <div className="absolute z-30 flex flex-col items-center justify-center pointer-events-none">
            {/* Core Badge */}
            <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border-2 border-[#FF6A00] flex items-center justify-center shadow-none transform hover:scale-110 transition-transform">
              <Cpu className="w-8 h-8 text-[#FF6A00]" />
            </div>
            
            <div className="mt-2 text-center">
              <div className="font-display font-extrabold text-xs text-white tracking-widest uppercase">
                AI & TECH CORE
              </div>
              <div className="text-[10px] font-mono text-[#FF6A00] font-bold">
                Rishi's Skill Universe
              </div>
            </div>
          </div>

          {/* SVG Orbital Track Ellipses */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            <g transform="translate(50% 50%)">
              {rings.map((ring, idx) => {
                if (selectedRing !== 'all' && selectedRing !== idx) return null;
                return (
                  <g key={idx} transform={`rotate(${ring.tiltAngle})`}>
                    {/* Outer Ring */}
                    <ellipse
                      cx="0"
                      cy="0"
                      rx={ring.radiusX}
                      ry={ring.radiusY}
                      fill="none"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                    />
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Orbiting Tech Nodes */}
          {filteredTechs.map((tech) => {
            const pos = getTechPosition(tech);
            const isHovered = activeTech?.id === tech.id;

            return (
              <div
                key={tech.id}
                onMouseEnter={() => setActiveTech(tech)}
                onMouseLeave={() => setActiveTech(null)}
                className="absolute cursor-pointer group"
                style={{
                  transform: `translate3d(${pos.x}px, ${pos.y}px, 0px) scale(${isHovered ? 1.35 : pos.scale})`,
                  opacity: pos.opacity,
                  zIndex: isHovered ? 500 : pos.zIndex,
                  willChange: 'transform, opacity',
                }}
              >
                {/* Glowing Halo on Node */}
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-xl"
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    borderColor: isHovered ? tech.color : 'rgba(255, 255, 255, 0.18)',
                    boxShadow: isHovered
                      ? `0 0 25px ${tech.glowColor}, 0 0 10px ${tech.color}`
                      : `0 4px 14px rgba(0,0,0,0.6)`,
                  }}
                >
                  {tech.iconSvg}
                </div>

                {/* Node Label Tooltip on Hover */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 -bottom-7 whitespace-nowrap px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-white transition-all duration-200 pointer-events-none ${
                    isHovered
                      ? 'opacity-100 translate-y-0 bg-[#0A0A0A] border border-[#FF6A00] shadow-none'
                      : 'opacity-0 translate-y-1'
                  }`}
                >
                  {tech.name} • {tech.level}%
                </div>
              </div>
            );
          })}
        </div>

        {/* HUD Info Card Popup when Tech Node is Active/Hovered */}
        {activeTech && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-[#1A1A1A] rounded-2xl p-4 border border-[#FF6A00]/50 shadow-none animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/15 bg-[#0A0A0A]"
                  style={{ borderColor: activeTech.color }}
                >
                  {activeTech.iconSvg}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">{activeTech.name}</h4>
                  <span className="text-[10px] font-mono text-[#FF6A00]">{activeTech.category}</span>
                </div>
              </div>

              {/* Animated Level Display */}
              <div className="text-right">
                <div className="text-lg font-display font-extrabold text-[#FF6A00]">
                  <AnimatedCounter value={`${activeTech.level}%`} />
                </div>
                <div className="text-[9px] font-mono text-slate-400 uppercase">Proficiency</div>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed font-medium mb-3">
              {activeTech.description}
            </p>

            {/* Level Bar */}
            <div className="w-full h-2 bg-[#0A0A0A] rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full rounded-full transition-all duration-500 bg-[#FF6A00]"
                style={{
                  width: `${activeTech.level}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Bottom Legend Badge */}
        <div className="absolute bottom-3 left-4 hidden sm:flex items-center gap-3 text-[10px] font-mono text-slate-400 bg-[#0A0A0A]/90 px-3 py-1.5 rounded-xl border border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF6A00]"></span>
            <span>Inner Core (Languages)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span>Mid Orbit (AI & SQL)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-600"></span>
            <span>Outer Orbit (Cloud & Tools)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
