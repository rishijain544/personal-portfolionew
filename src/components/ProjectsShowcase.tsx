import React, { useState, useEffect, useCallback } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { 
  Sparkles, Github, ExternalLink, Activity, Scan, 
  Sliders, Grid, Play, Cpu, RefreshCw,
  ShieldAlert, CreditCard, ChevronLeft, ChevronRight, Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnimatedCounter } from './AnimatedCounter';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsShowcaseProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onSelectProject }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const totalProjects = PROJECTS_DATA.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? totalProjects - 1 : prev - 1));
  }, [totalProjects]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === totalProjects - 1 ? 0 : prev + 1));
  }, [totalProjects]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Interactive State for BrainGuard AI
  const [mriSlice, setMriSlice] = useState(18);
  const [mriModel, setMriModel] = useState<'ViT' | 'ResNet50' | 'BaseCNN'>('ViT');
  const [showTumorMask, setShowTumorMask] = useState(true);

  // Interactive State for IntelliBank
  const [bankTab, setBankTab] = useState<'fraud' | 'credit'>('fraud');
  const [txAmount, setTxAmount] = useState(2450);
  const [txChannel, setTxChannel] = useState<'E-Commerce' | 'Crypto' | 'Intl Wire' | 'POS'>('E-Commerce');
  const [isHighRiskLocation] = useState(false);
  const [isScoringTx, setIsScoringTx] = useState(false);
  const [creditScoreInput, setCreditScoreInput] = useState(740);

  // Real-time calculation of FinTech Anomaly Score
  const getFraudProbability = () => {
    let score = 3.2;
    if (txAmount > 5000) score += 32;
    else if (txAmount > 2000) score += 16;
    else if (txAmount > 800) score += 7;

    if (txChannel === 'Crypto') score += 28;
    else if (txChannel === 'Intl Wire') score += 22;
    else if (txChannel === 'E-Commerce') score += 8;

    if (isHighRiskLocation) score += 34;
    return Math.min(99.4, Math.max(0.4, Number(score.toFixed(1))));
  };

  const handleTestBankAudit = () => {
    setIsScoringTx(true);
    setTimeout(() => {
      setIsScoringTx(false);
      const prob = getFraudProbability();
      if (prob < 35) {
        confetti({ particleCount: 35, spread: 55, origin: { y: 0.6 } });
      }
    }, 550);
  };

  // Interactive State for AI Resume Parser
  const [isScanning, setIsScanning] = useState(false);
  const [scanScore, setScanScore] = useState(94.8);
  const [selectedJob, setSelectedJob] = useState('Senior ML Engineer');

  // Interactive State for ExamPrepAI
  const [flippedCard, setFlippedCard] = useState(false);
  const [examTopic, setExamTopic] = useState('Deep Learning');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiResponse, setAiResponse] = useState<{ question: string; answer: string } | null>(null);

  // Interactive State for Model Hub Pro
  const [algorithm, setAlgorithm] = useState('Random Forest');
  const [estimators, setEstimators] = useState(120);
  const [learningRate] = useState(0.05);

  // Trigger Resume Scan animation
  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanScore(Number((88 + Math.random() * 10).toFixed(1)));
    }, 1500);
  };

  // Trigger Gemini API Exam Prep Call
  const handleGenerateExamPrep = async () => {
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/exam-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: examTopic, type: 'flashcard' })
      });
      const data = await res.json();
      if (data.flashcards && data.flashcards.length > 0) {
        setAiResponse(data.flashcards[0]);
      } else {
        setAiResponse({
          question: `What is the primary loss function in ${examTopic}?`,
          answer: `Cross-Entropy Loss is standard for classification in ${examTopic}, optimizing class probabilities.`
        });
      }
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } catch {
      setAiResponse({
        question: `How does Attention Mechanism work in ${examTopic}?`,
        answer: `It dynamically weights input tokens, prioritizing contextual relevance regardless of distance.`
      });
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Render the Visual Simulator Header for a given project ID
  const renderVisualHeader = (project: Project) => {
    switch (project.id) {
      case 'brain-guard-ai':
        return (
          <div className="w-full bg-[#0A0A0A] rounded-2xl p-4 sm:p-5 border border-white/10 text-slate-100 font-mono text-xs relative overflow-hidden">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2 text-[#FF6A00]">
                <Scan className="w-4 h-4" />
                <span className="font-bold">3D MRI Volume Scanner</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTumorMask(!showTumorMask);
                }}
                className="px-2 py-0.5 rounded text-[10px] bg-[#1A1A1A] text-[#FF6A00] border border-white/15 hover:bg-neutral-800 cursor-pointer"
              >
                {showTumorMask ? 'Mask: ON' : 'Mask: OFF'}
              </button>
            </div>

            <div className="relative w-full h-36 sm:h-40 rounded-xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="absolute w-32 h-32 rounded-full border border-[#FF6A00]/30 animate-ping opacity-25" />
              <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-full border-2 border-dashed border-[#FF6A00]/50 flex items-center justify-center relative">
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-[#0A0A0A] border border-[#FF6A00]/40 flex items-center justify-center text-center p-1.5">
                  <span className="text-[10px] text-[#FF6A00]">Slice #{mriSlice} / 30</span>
                </div>
                {showTumorMask && (
                  <div className="absolute top-2 right-2 w-8 h-8 border-2 border-[#FF6A00] bg-[#FF6A00]/20 rounded flex items-center justify-center">
                    <span className="text-[8px] font-bold text-[#FF6A00]">G-96%</span>
                  </div>
                )}
              </div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF6A00] animate-laser-line pointer-events-none" />
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Model Architecture:</span>
                <div className="flex gap-1">
                  {(['ViT', 'ResNet50', 'BaseCNN'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMriModel(m);
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] transition-all cursor-pointer ${
                        mriModel === m ? 'bg-[#FF6A00] text-black font-bold' : 'bg-[#1A1A1A] text-slate-400 hover:text-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>Z-Axis Depth:</span>
                  <span className="text-[#FF6A00] font-bold">Slice {mriSlice}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={mriSlice}
                  onChange={(e) => setMriSlice(Number(e.target.value))}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full accent-[#FF6A00] cursor-pointer h-1.5 bg-[#1A1A1A] rounded-lg"
                />
              </div>
            </div>
          </div>
        );

      case 'intellibank':
        return (
          <div className="w-full bg-[#0A0A0A] rounded-2xl p-4 sm:p-5 border border-white/10 text-slate-100 font-mono text-xs relative overflow-hidden">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
              <div className="flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setBankTab('fraud');
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    bankTab === 'fraud' ? 'bg-[#FF6A00] text-black' : 'bg-[#1A1A1A] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Fraud Anomaly</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setBankTab('credit');
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    bankTab === 'credit' ? 'bg-[#FF6A00] text-black' : 'bg-[#1A1A1A] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Underwriting</span>
                </button>
              </div>
              <span className="text-[10px] text-[#FF6A00] bg-[#1A1A1A] px-2 py-0.5 rounded border border-white/15">
                &lt; 85ms
              </span>
            </div>

            {bankTab === 'fraud' ? (
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Transaction Amount:</span>
                    <span className="text-[#FF6A00] font-bold">${txAmount.toLocaleString('en-US')}.00</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="10000"
                    step="50"
                    value={txAmount}
                    onChange={(e) => setTxAmount(Number(e.target.value))}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full accent-[#FF6A00] cursor-pointer h-1.5 bg-[#1A1A1A] rounded-lg"
                  />
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Channel:</span>
                  <div className="flex gap-1">
                    {(['E-Commerce', 'Crypto', 'Intl Wire', 'POS'] as const).map((ch) => (
                      <button
                        key={ch}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTxChannel(ch);
                        }}
                        className={`px-2 py-0.5 rounded text-[9px] transition-all cursor-pointer ${
                          txChannel === ch ? 'bg-[#FF6A00] text-black font-bold' : 'bg-[#1A1A1A] text-slate-400'
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-2 rounded bg-[#1A1A1A] border border-white/10 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Fraud Anomaly Risk:</span>
                  <span className="font-bold text-[#FF6A00]">{getFraudProbability()}%</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTestBankAudit();
                  }}
                  disabled={isScoringTx}
                  className="w-full py-1.5 rounded-xl bg-[#FF6A00] hover:bg-[#e05d00] text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {isScoringTx ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Simulate Transaction Audit</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Credit Score (FICO):</span>
                    <span className="font-bold text-[#FF6A00]">{creditScoreInput}</span>
                  </div>
                  <input
                    type="range"
                    min="350"
                    max="850"
                    value={creditScoreInput}
                    onChange={(e) => setCreditScoreInput(Number(e.target.value))}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full accent-[#FF6A00] cursor-pointer h-1.5 bg-[#1A1A1A] rounded-lg"
                  />
                </div>
                <div className="p-2 rounded bg-[#1A1A1A] border border-white/10 flex justify-between text-[10px]">
                  <span className="text-slate-300">Underwriting Offer:</span>
                  <span className="font-bold text-[#FF6A00]">
                    {creditScoreInput >= 740 ? 'Approved (4.75% APR)' : creditScoreInput >= 650 ? 'Approved (7.20% APR)' : 'Manual Review'}
                  </span>
                </div>
              </div>
            )}
          </div>
        );

      case 'exam-prep-ai':
        return (
          <div className="w-full bg-[#0A0A0A] rounded-2xl p-4 sm:p-5 border border-white/10 text-slate-100 font-mono text-xs relative overflow-hidden">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
              <span className="font-bold text-[#FF6A00] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Gemini API Flashcard Engine
              </span>
              <span className="text-[10px] text-[#FF6A00] bg-[#1A1A1A] px-2 py-0.5 rounded border border-white/15">
                Sub-2s Speed
              </span>
            </div>

            <div className="mb-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={examTopic}
                onChange={(e) => setExamTopic(e.target.value)}
                placeholder="Topic (e.g. Transformers)"
                className="w-full bg-[#1A1A1A] border border-white/10 rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-[#FF6A00]"
              />
              <button
                onClick={handleGenerateExamPrep}
                disabled={isGeneratingAi}
                className="px-3 py-1 bg-[#FF6A00] hover:bg-[#e05d00] text-black rounded font-bold text-xs shrink-0 flex items-center gap-1 cursor-pointer"
              >
                {isGeneratingAi ? <RefreshCw className="w-3 h-3 animate-spin" /> : 'Gen AI'}
              </button>
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation();
                setFlippedCard(!flippedCard);
              }}
              className="w-full h-28 sm:h-32 rounded-xl bg-[#1A1A1A] border border-white/15 p-3 flex flex-col justify-between cursor-pointer hover:border-[#FF6A00] transition-all group"
            >
              <div className="flex items-center justify-between text-[10px] text-[#FF6A00]">
                <span>{flippedCard ? 'Answer Side' : 'Question Side'}</span>
                <span className="text-slate-400">Click to Flip 🔄</span>
              </div>
              <div className="text-xs text-slate-200 font-sans font-medium line-clamp-3">
                {aiResponse ? (
                  flippedCard ? aiResponse.answer : aiResponse.question
                ) : (
                  flippedCard
                    ? "Cross-entropy loss evaluates classification accuracy using cross-entropy probabilities."
                    : `Sample Q: What is the primary loss function in ${examTopic}?`
                )}
              </div>
            </div>
          </div>
        );

      case 'ai-resume-parser':
        return (
          <div className="w-full bg-[#0A0A0A] rounded-2xl p-4 sm:p-5 border border-white/10 text-slate-100 font-mono text-xs relative overflow-hidden">
            {isScanning && (
              <div className="absolute left-0 right-0 h-1 bg-[#FF6A00] animate-laser-line z-20 pointer-events-none" />
            )}
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
              <span className="font-bold text-[#FF6A00] flex items-center gap-1.5">
                <Scan className="w-4 h-4" />
                NLP Cosine Matcher
              </span>
              <span className="text-[10px] text-[#FF6A00] bg-[#1A1A1A] px-2 py-0.5 rounded border border-white/15">
                500+ Parsed
              </span>
            </div>

            <div className="mb-3 space-y-1" onClick={(e) => e.stopPropagation()}>
              <label className="text-[10px] text-slate-400">Target Position:</label>
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-[#FF6A00]"
              >
                <option value="Senior ML Engineer">Senior ML Engineer (PyTorch/NLP)</option>
                <option value="Computer Vision Specialist">Computer Vision Specialist (ResNet/ViT)</option>
                <option value="Full-Stack AI Developer">Full-Stack AI Developer (FastAPI/React)</option>
              </select>
            </div>

            <div className="p-2.5 rounded-xl bg-[#1A1A1A] border border-white/10 text-center mb-3">
              <div className="text-2xl font-extrabold text-[#FF6A00] font-mono">{scanScore}%</div>
              <div className="text-[10px] text-slate-400">Semantic Resume Alignment</div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerScan();
              }}
              disabled={isScanning}
              className="w-full py-2 rounded-xl bg-[#FF6A00] hover:bg-[#e05d00] text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning Embeddings...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Resume Scan</span>
                </>
              )}
            </button>
          </div>
        );

      case 'model-hub-pro':
        return (
          <div className="w-full bg-[#0A0A0A] rounded-2xl p-4 sm:p-5 border border-white/10 text-slate-100 font-mono text-xs relative overflow-hidden">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
              <span className="font-bold text-[#FF6A00] flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                Live AutoML Hyperparameters
              </span>
              <span className="text-[10px] text-[#FF6A00] bg-[#1A1A1A] px-2 py-0.5 rounded border border-white/15">
                6+ Algorithms
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-1 text-[10px]">
                {['Random Forest', 'SVM', 'KNN', 'Naive Bayes'].map((alg) => (
                  <button
                    key={alg}
                    onClick={(e) => {
                      e.stopPropagation();
                      setAlgorithm(alg);
                    }}
                    className={`py-1 rounded text-center transition-colors cursor-pointer ${
                      algorithm === alg ? 'bg-[#FF6A00] text-black font-bold' : 'bg-[#1A1A1A] text-slate-400 hover:text-white'
                    }`}
                  >
                    {alg}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                  <span>Estimators:</span>
                  <span className="text-[#FF6A00] font-bold">{estimators}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={estimators}
                  onChange={(e) => setEstimators(Number(e.target.value))}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full accent-[#FF6A00] cursor-pointer h-1.5 bg-[#1A1A1A] rounded-lg"
                />
              </div>

              <div className="p-2 rounded bg-[#1A1A1A] border border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-slate-300">Validation Accuracy:</span>
                <span className="font-bold text-[#FF6A00]">
                  {(85 + (estimators / 20) + (learningRate * 20)).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        );

      case 'whatsapp-chat-analyzer':
        return (
          <div className="w-full bg-[#0A0A0A] rounded-2xl p-4 sm:p-5 border border-white/10 text-slate-100 font-mono text-xs relative overflow-hidden">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
              <span className="font-bold text-[#FF6A00] flex items-center gap-1.5">
                <Grid className="w-4 h-4" />
                Chat Activity Heatmap Matrix
              </span>
              <span className="text-[10px] text-[#FF6A00] bg-[#1A1A1A] px-2 py-0.5 rounded border border-white/15">
                15+ Metrics
              </span>
            </div>

            <div className="mb-3">
              <div className="text-[10px] text-slate-400 mb-1">Peak Activity Hours:</div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 21 }).map((_, i) => {
                  const intensity = (i * 37) % 100;
                  return (
                    <div
                      key={i}
                      className={`h-5 rounded flex items-center justify-center text-[8px] ${
                        intensity > 70
                          ? 'bg-[#FF6A00] text-black font-bold'
                          : intensity > 40
                          ? 'bg-neutral-800 text-slate-300'
                          : 'bg-[#1A1A1A] text-slate-600'
                      }`}
                    >
                      {intensity > 70 ? '🔥' : ''}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>VADER Sentiment Score:</span>
                <span className="text-[#FF6A00] font-bold">68% Positive Tone</span>
              </div>
              <div className="flex h-2 rounded-full overflow-hidden bg-[#1A1A1A]">
                <div className="bg-[#FF6A00] w-[68%]" />
                <div className="bg-neutral-600 w-[22%]" />
                <div className="bg-neutral-800 w-[10%]" />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      
      {/* Section Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-[#FF6A00] text-xs font-mono font-bold mb-4 shadow-sm">
          <Activity className="w-4 h-4 text-[#FF6A00]" />
          <span>Interactive Horizontal Carousel</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
          Featured <span className="text-[#FF6A00]">AI & ML</span> Projects
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Explore end-to-end machine learning systems with live interactive simulators. Use arrow controls or click peeking side cards to navigate.
        </p>
      </div>

      {/* Main Carousel Stage Container */}
      <div className="relative min-h-[640px] flex items-center justify-center my-6">
        
        {/* Left Arrow Navigation Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous project"
          className="absolute left-1 sm:left-4 z-40 w-12 h-12 rounded-full bg-white/90 dark:bg-[#1A1A1A]/90 hover:bg-[#FF6A00] text-slate-800 dark:text-white hover:text-black border border-slate-200 dark:border-white/20 hover:border-[#FF6A00] flex items-center justify-center transition-all duration-300 shadow-lg dark:shadow-2xl backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow Navigation Button */}
        <button
          onClick={handleNext}
          aria-label="Next project"
          className="absolute right-1 sm:right-4 z-40 w-12 h-12 rounded-full bg-white/90 dark:bg-[#1A1A1A]/90 hover:bg-[#FF6A00] text-slate-800 dark:text-white hover:text-black border border-slate-200 dark:border-white/20 hover:border-[#FF6A00] flex items-center justify-center transition-all duration-300 shadow-lg dark:shadow-2xl backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Project Cards Track */}
        <div className="w-full max-w-5xl mx-auto flex items-center justify-center relative px-2 sm:px-12">
          
          <AnimatePresence mode="popLayout">
            {PROJECTS_DATA.map((project, idx) => {
              let offset = idx - activeIndex;
              if (offset > totalProjects / 2) offset -= totalProjects;
              if (offset < -totalProjects / 2) offset += totalProjects;

              const isCenter = offset === 0;
              const isLeftPeeking = offset === -1;
              const isRightPeeking = offset === 1;

              // Only render center card and peeking side cards
              if (!isCenter && !isLeftPeeking && !isRightPeeking) return null;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.45,
                    scale: isCenter ? 1 : 0.88,
                    x: isCenter ? '0%' : isLeftPeeking ? '-68%' : '68%',
                    zIndex: isCenter ? 30 : 10,
                    filter: isCenter ? 'none' : 'brightness(50%) blur(0.5px)',
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => {
                    if (!isCenter) setActiveIndex(idx);
                  }}
                  className={`w-full max-w-3xl bg-white dark:bg-[#1A1A1A] rounded-3xl border ${
                    isCenter
                      ? 'border-[#FF6A00] shadow-[0_0_50px_rgba(255,106,0,0.2)]'
                      : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 cursor-pointer hidden md:block'
                  } p-6 sm:p-8 flex flex-col justify-between absolute transition-all duration-300 group overflow-hidden select-none`}
                >
                  
                  {/* Top Visual Area with Small "+" Expand Corner Button */}
                  <div className="relative mb-5">
                    {renderVisualHeader(project)}

                    {/* "+" Expand Corner Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      title="Expand Full Details & Specs Modal"
                      className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-slate-100/90 dark:bg-[#0A0A0A]/90 hover:bg-[#FF6A00] text-[#FF6A00] hover:text-black border border-[#FF6A00]/50 flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer group/plus hover:scale-110"
                    >
                      <Plus className="w-5 h-5 transition-transform group-hover/plus:rotate-90" />
                    </button>
                  </div>

                  {/* Card Content Details */}
                  <div className="space-y-4">
                    
                    {/* Category & Title */}
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs text-[#FF6A00] mb-1 font-bold">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>{project.category}</span>
                      </div>

                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white group-hover:text-[#FF6A00] transition-colors leading-tight">
                        {project.title}
                      </h3>

                      <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mt-1.5 font-medium">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Tech Stack Pills: Dark Background, Orange Text & Border */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-slate-100 dark:bg-[#0A0A0A] border border-[#FF6A00]/40 text-[#FF6A00] text-xs font-mono font-semibold shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Key Metrics Row */}
                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200 dark:border-white/10">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 text-center">
                          <div className="text-base sm:text-lg font-bold font-mono text-[#FF6A00]">
                            <AnimatedCounter value={m.value} />
                          </div>
                          <div className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold mt-0.5 truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Action Bar Links */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                      
                      <div className="flex items-center gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#0A0A0A] hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-900 dark:text-white font-mono text-xs font-bold transition-all border border-slate-200 dark:border-white/15 hover:border-[#FF6A00] hover:text-[#FF6A00] dark:hover:text-[#FF6A00]"
                        >
                          <Github className="w-3.5 h-3.5 text-[#FF6A00]" />
                          <span>GitHub</span>
                          <ExternalLink className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                        </a>

                        {project.liveUrl && project.liveUrl !== project.githubUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FF6A00] hover:bg-[#e05d00] text-black font-mono text-xs font-bold transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>

                      {/* Expand Specs Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#0A0A0A] hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-800 dark:text-slate-200 font-mono text-xs font-semibold border border-slate-200 dark:border-white/15 transition-all hover:border-[#FF6A00] hover:text-[#FF6A00] dark:hover:text-[#FF6A00] cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#FF6A00]" />
                        <span>Full Specs</span>
                      </button>

                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>

      </div>

      {/* Pagination Controls & Counter */}
      <div className="flex flex-col items-center justify-center gap-3 mt-8">
        
        {/* Bullet Dots */}
        <div className="flex items-center gap-2">
          {PROJECTS_DATA.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to project ${p.title}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === i
                  ? 'w-8 h-2.5 bg-[#FF6A00] shadow-[0_0_10px_#FF6A00]'
                  : 'w-2.5 h-2.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Index Counter */}
        <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
          Project <span className="text-[#FF6A00] font-bold">0{activeIndex + 1}</span> of <span className="text-slate-900 dark:text-slate-200 font-semibold">0{totalProjects}</span>
        </div>

      </div>

    </section>
  );
};
