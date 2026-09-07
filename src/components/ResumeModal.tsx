import React, { useState, useRef, useEffect, useCallback } from 'react';
import { EXACT_RESUME } from '../data/portfolioData';
import {
  X,
  Download,
  Copy,
  Check,
  Printer,
  Loader2,
  Phone,
  Mail,
  Linkedin,
  Github,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  FileText,
  Eye,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  RotateCcw,
  Smartphone,
  Expand,
  FileCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewMode = 'paper' | 'embedded-pdf' | 'structured' | 'ats';

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('paper');
  const [zoomMode, setZoomMode] = useState<'fit-page' | 'fit-width' | 'custom'>('fit-page');
  const [zoomScale, setZoomScale] = useState<number>(0.75);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  // Generate vector PDF using jsPDF
  const generatePdfDocument = useCallback((): jsPDF => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const margin = 34; // tight 0.47 in margins for perfect 1-page fit
    const pageWidth = 595.28;
    const contentWidth = pageWidth - margin * 2;
    let y = 32;

    // Header: Name
    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    doc.text(EXACT_RESUME.name, pageWidth / 2, y, { align: 'center' });
    y += 14;

    // Contact Line
    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);

    const contactText = `+91 9137849167   |   ${EXACT_RESUME.email}   |   LinkedIn   |   GitHub`;
    doc.text(contactText, pageWidth / 2, y, { align: 'center' });

    // Clickable links
    const midX = pageWidth / 2;
    doc.link(midX - 120, y - 8, 70, 10, { url: `tel:+919137849167` });
    doc.link(midX - 45, y - 8, 105, 10, { url: `mailto:${EXACT_RESUME.email}` });
    doc.link(midX + 65, y - 8, 40, 10, { url: EXACT_RESUME.linkedin });
    doc.link(midX + 110, y - 8, 35, 10, { url: EXACT_RESUME.github });

    y += 12;

    const addSectionHeader = (title: string) => {
      doc.setFont('times', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(title, margin, y);
      y += 2.5;
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.6);
      doc.line(margin, y, pageWidth - margin, y);
      y += 9.5;
    };

    // 1. SUMMARY
    addSectionHeader('Summary');
    doc.setFont('times', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(0, 0, 0);
    const summaryLines = doc.splitTextToSize(EXACT_RESUME.summary, contentWidth);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 9.8 + 3.5;

    // 2. EDUCATION
    addSectionHeader('Education');
    doc.setFont('times', 'bold');
    doc.setFontSize(8.8);
    doc.text(EXACT_RESUME.education.institution, margin, y);
    doc.setFont('times', 'normal');
    doc.text(EXACT_RESUME.education.period, pageWidth - margin, y, { align: 'right' });
    y += 10;

    doc.setFont('times', 'italic');
    doc.setFontSize(8.2);
    doc.text(EXACT_RESUME.education.degree, margin, y);
    doc.setFont('times', 'normal');
    doc.text(EXACT_RESUME.education.location, pageWidth - margin, y, { align: 'right' });
    y += 11;

    // 3. EXPERIENCE
    addSectionHeader('Experience');
    doc.setFont('times', 'bold');
    doc.setFontSize(8.8);
    doc.text(`${EXACT_RESUME.experience.role}, ${EXACT_RESUME.experience.company}`, margin, y);
    doc.setFont('times', 'normal');
    doc.text(EXACT_RESUME.experience.period, pageWidth - margin, y, { align: 'right' });
    y += 9.5;

    doc.setFont('times', 'italic');
    doc.setFontSize(8.2);
    doc.text(EXACT_RESUME.experience.location, margin, y);
    y += 9;

    doc.setFont('times', 'normal');
    doc.setFontSize(8);
    EXACT_RESUME.experience.bullets.forEach((bullet) => {
      const bLines = doc.splitTextToSize(`•  ${bullet}`, contentWidth - 8);
      doc.text(bLines, margin + 6, y);
      y += bLines.length * 9.2 + 0.8;
    });
    y += 3;

    // 4. PROJECTS
    addSectionHeader('Projects');
    EXACT_RESUME.projects.forEach((proj) => {
      doc.setFont('times', 'bold');
      doc.setFontSize(8.8);
      doc.setTextColor(0, 0, 0);
      doc.text(proj.title, margin, y);

      const titleWidth = doc.getTextWidth(proj.title);
      doc.setFont('times', 'normal');
      doc.setFontSize(8.2);
      doc.text(` – ${proj.tech}`, margin + titleWidth + 2, y);

      doc.setFont('times', 'normal');
      doc.setFontSize(8.2);
      doc.text('GitHub', pageWidth - margin, y, { align: 'right' });
      doc.link(pageWidth - margin - 35, y - 7, 35, 9, { url: proj.githubUrl });
      y += 9;

      doc.setFont('times', 'normal');
      doc.setFontSize(8);
      proj.bullets.forEach((b) => {
        const bLines = doc.splitTextToSize(`•  ${b}`, contentWidth - 8);
        doc.text(bLines, margin + 6, y);
        y += bLines.length * 9.2 + 0.8;
      });
      y += 2.2;
    });
    y += 1.5;

    // 5. TECHNICAL SKILLS
    addSectionHeader('Technical Skills');
    EXACT_RESUME.skills.forEach((skill) => {
      doc.setFont('times', 'bold');
      doc.setFontSize(8.2);
      const catLabel = `${skill.category}: `;
      doc.text(catLabel, margin, y);

      const catWidth = doc.getTextWidth(catLabel);
      doc.setFont('times', 'normal');
      const skillLines = doc.splitTextToSize(skill.items, contentWidth - catWidth);
      doc.text(skillLines, margin + catWidth, y);
      y += skillLines.length * 9.5 + 0.8;
    });
    y += 3;

    // 6. CERTIFICATIONS
    addSectionHeader('Certifications');
    doc.setFont('times', 'normal');
    doc.setFontSize(8.2);
    doc.text(EXACT_RESUME.certifications.join('  |  '), margin, y);

    return doc;
  }, []);

  // Update scale based on container size and fit mode
  const updateAutoFit = useCallback(() => {
    if (!containerRef.current || viewMode !== 'paper') return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth - 48; // padding
    const containerHeight = container.clientHeight - 48;

    const paperWidth = 794;
    const paperHeight = 1080;

    if (zoomMode === 'fit-page') {
      const scaleX = containerWidth / paperWidth;
      const scaleY = containerHeight / paperHeight;
      const calculatedScale = Math.min(scaleX, scaleY);
      setZoomScale(Math.max(0.35, Math.min(calculatedScale, 1.1)));
    } else if (zoomMode === 'fit-width') {
      const scaleX = containerWidth / paperWidth;
      setZoomScale(Math.max(0.35, Math.min(scaleX, 1.3)));
    }
  }, [zoomMode, viewMode]);

  useEffect(() => {
    if (isOpen) {
      updateAutoFit();
      window.addEventListener('resize', updateAutoFit);

      // Generate PDF blob URL for embedded PDF preview
      try {
        const doc = generatePdfDocument();
        const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);
        setPdfBlobUrl(url);

        return () => {
          window.removeEventListener('resize', updateAutoFit);
          URL.revokeObjectURL(url);
        };
      } catch (err) {
        console.error('Error creating PDF preview URL:', err);
      }
    }
  }, [isOpen, updateAutoFit, generatePdfDocument]);

  if (!isOpen) return null;

  const rawResumeText = `
${EXACT_RESUME.name}
+91 9137849167 | ${EXACT_RESUME.email} | LinkedIn | GitHub

Summary
${EXACT_RESUME.summary}

Education
${EXACT_RESUME.education.institution}    ${EXACT_RESUME.education.period}
${EXACT_RESUME.education.degree}    ${EXACT_RESUME.education.location}

Experience
${EXACT_RESUME.experience.role}, ${EXACT_RESUME.experience.company}    ${EXACT_RESUME.experience.period}
${EXACT_RESUME.experience.location}
${EXACT_RESUME.experience.bullets.map((b) => `• ${b}`).join('\n')}

Projects
${EXACT_RESUME.projects
  .map(
    (p) => `${p.title} – ${p.tech}    GitHub\n${p.bullets.map((b) => `• ${b}`).join('\n')}`
  )
  .join('\n\n')}

Technical Skills
${EXACT_RESUME.skills.map((s) => `${s.category}: ${s.items}`).join('\n')}

Certifications
${EXACT_RESUME.certifications.join(' | ')}
  `.trim();

  const handleCopyText = () => {
    navigator.clipboard.writeText(rawResumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    try {
      setIsGeneratingPdf(true);
      const doc = generatePdfDocument();
      doc.save('Rishi_Jain_Resume.pdf');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (error) {
      console.error('PDF generation error:', error);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full ${
          isFullscreen ? 'max-w-[99vw] h-[98vh]' : 'max-w-6xl h-[92vh]'
        } rounded-3xl border border-slate-300 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden bg-white dark:bg-[#0A0A0A] transition-all duration-300`}
      >
        {/* Top Control Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#0A0A0A] shrink-0">
          
          {/* Left: Title & Mode Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF6A00] font-bold">
              <FileText className="w-4 h-4 text-[#FF6A00]" />
              <span className="hidden sm:inline text-slate-900 dark:text-slate-100">Rishi Jain — Resume</span>
              <span className="sm:hidden text-slate-900 dark:text-slate-100">Resume</span>
            </div>

            {/* View Mode Tabs */}
            <div className="flex items-center bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-xl p-0.5 text-xs font-mono">
              <button
                onClick={() => setViewMode('paper')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'paper'
                    ? 'bg-[#FF6A00] text-black font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full Page Preview</span>
              </button>

              <button
                onClick={() => setViewMode('embedded-pdf')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'embedded-pdf'
                    ? 'bg-[#FF6A00] text-black font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PDF Viewer</span>
                <span className="sm:hidden">PDF</span>
              </button>

              <button
                onClick={() => setViewMode('structured')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'structured'
                    ? 'bg-[#FF6A00] text-black font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Interactive View</span>
                <span className="md:hidden">Interactive</span>
              </button>

              <button
                onClick={() => setViewMode('ats')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'ats'
                    ? 'bg-[#FF6A00] text-black font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden md:inline">ATS Text</span>
                <span className="md:hidden">ATS</span>
              </button>
            </div>
          </div>

          {/* Right: Actions (Zoom, Fit Mode, Download, Print, Close) */}
          <div className="flex items-center gap-2">
            
            {/* Zoom presets for Paper View */}
            {viewMode === 'paper' && (
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-xl px-1.5 py-1 text-xs font-mono text-slate-700 dark:text-slate-300">
                <button
                  onClick={() => {
                    setZoomMode('fit-page');
                    setTimeout(updateAutoFit, 10);
                  }}
                  title="Fit whole page in screen"
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    zoomMode === 'fit-page'
                      ? 'bg-[#FF6A00] text-black font-bold'
                      : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Fit Page
                </button>

                <button
                  onClick={() => {
                    setZoomMode('fit-width');
                    setTimeout(updateAutoFit, 10);
                  }}
                  title="Fit width of document"
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    zoomMode === 'fit-width'
                      ? 'bg-[#FF6A00] text-black font-bold'
                      : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Fit Width
                </button>

                <div className="h-3.5 w-px bg-slate-300 dark:bg-white/15 mx-0.5" />

                <button
                  onClick={() => {
                    setZoomMode('custom');
                    setZoomScale((prev) => Math.max(0.4, prev - 0.1));
                  }}
                  title="Zoom Out"
                  className="p-1 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-800 rounded transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>

                <span className="w-10 text-center text-[11px] font-bold text-[#FF6A00]">
                  {Math.round(zoomScale * 100)}%
                </span>

                <button
                  onClick={() => {
                    setZoomMode('custom');
                    setZoomScale((prev) => Math.min(1.5, prev + 0.1));
                  }}
                  title="Zoom In"
                  className="p-1 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-800 rounded transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Copy Plain Text */}
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1A1A1A] hover:bg-slate-200 dark:hover:bg-neutral-800 text-xs font-mono text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-white/10 cursor-pointer"
              title="Copy Text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#FF6A00]" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {/* Primary Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-3.5 sm:px-4 py-1.5 rounded-xl bg-[#FF6A00] hover:bg-[#ff7b1a] disabled:opacity-50 text-black font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-black" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              title="Print Document"
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 dark:bg-[#1A1A1A] hover:bg-slate-200 dark:hover:bg-neutral-800 text-xs font-mono text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-white/10 hidden sm:inline-flex cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Print</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => {
                setIsFullscreen(!isFullscreen);
                setTimeout(updateAutoFit, 150);
              }}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-[#1A1A1A] hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/10 cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Area */}
        <div
          ref={containerRef}
          className="p-2 sm:p-4 overflow-y-auto overflow-x-hidden bg-slate-100 dark:bg-[#0A0A0A] flex flex-col items-center flex-1 relative"
        >
          
          {/* VIEW 1: Clean 1:1 Single Page LaTeX Paper Document Preview with Auto-Fit */}
          {viewMode === 'paper' && (
            <div className="w-full h-full flex items-start justify-center overflow-auto py-2">
              <div
                style={{
                  width: `${794 * zoomScale}px`,
                  height: `${1080 * zoomScale}px`,
                  minWidth: `${794 * zoomScale}px`,
                  minHeight: `${1080 * zoomScale}px`,
                  transition: 'width 0.15s ease, height 0.15s ease',
                }}
                className="relative shrink-0 flex justify-center"
              >
                <div
                  ref={paperRef}
                  id="resume-paper-document"
                  style={{
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'top left',
                    fontFamily: '"Times New Roman", Times, Georgia, serif',
                    width: '794px',
                    height: '1080px',
                  }}
                  className="absolute top-0 left-0 bg-white text-slate-900 px-10 py-8 shadow-lg rounded-[1px] text-[11px] leading-[1.3] border border-slate-300 shrink-0"
                >
                  {/* Header: Name */}
                  <div className="text-center pb-1">
                    <h1 className="text-[26px] font-bold tracking-tight text-black mb-0.5">
                      {EXACT_RESUME.name}
                    </h1>
                    
                    {/* Contact Links */}
                    <div className="flex flex-wrap justify-center items-center gap-1.5 text-[10.5px] text-slate-900 mt-0.5">
                      <span className="flex items-center gap-1 font-normal">
                        <Phone className="w-3 h-3 text-slate-700 inline" />
                        {EXACT_RESUME.phone}
                      </span>
                      <span className="text-slate-400">|</span>
                      <a
                        href={`mailto:${EXACT_RESUME.email}`}
                        className="flex items-center gap-1 font-normal text-slate-900 hover:underline"
                      >
                        <Mail className="w-3 h-3 text-slate-700 inline" />
                        {EXACT_RESUME.email}
                      </a>
                      <span className="text-slate-400">|</span>
                      <a
                        href={EXACT_RESUME.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 font-normal text-slate-900 hover:underline"
                      >
                        <Linkedin className="w-3 h-3 text-slate-700 inline" />
                        LinkedIn
                      </a>
                      <span className="text-slate-400">|</span>
                      <a
                        href={EXACT_RESUME.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 font-normal text-slate-900 hover:underline"
                      >
                        <Github className="w-3 h-3 text-slate-700 inline" />
                        GitHub
                      </a>
                    </div>
                  </div>

                  {/* Section: Summary */}
                  <div className="mt-2">
                    <h2 className="text-[11.5px] font-bold text-black border-b border-black pb-0.5 mb-1 uppercase tracking-wide">
                      Summary
                    </h2>
                    <p className="text-slate-900 text-[10.5px] leading-[1.35] text-justify">
                      {EXACT_RESUME.summary}
                    </p>
                  </div>

                  {/* Section: Education */}
                  <div className="mt-2.5">
                    <h2 className="text-[11.5px] font-bold text-black border-b border-black pb-0.5 mb-1 uppercase tracking-wide">
                      Education
                    </h2>
                    <div>
                      <div className="flex justify-between items-baseline font-bold text-black text-[11px]">
                        <span>{EXACT_RESUME.education.institution}</span>
                        <span className="font-normal text-slate-900">{EXACT_RESUME.education.period}</span>
                      </div>
                      <div className="flex justify-between items-baseline italic text-slate-900 text-[10.5px]">
                        <span>{EXACT_RESUME.education.degree}</span>
                        <span className="not-italic font-normal">{EXACT_RESUME.education.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Section: Experience */}
                  <div className="mt-2.5">
                    <h2 className="text-[11.5px] font-bold text-black border-b border-black pb-0.5 mb-1 uppercase tracking-wide">
                      Experience
                    </h2>
                    <div>
                      <div className="flex justify-between items-baseline font-bold text-black text-[11px]">
                        <span>{EXACT_RESUME.experience.role}, {EXACT_RESUME.experience.company}</span>
                        <span className="font-normal text-slate-900">{EXACT_RESUME.experience.period}</span>
                      </div>
                      <div className="italic text-slate-900 text-[10.5px] mb-0.5">
                        {EXACT_RESUME.experience.location}
                      </div>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-900 text-[10.5px] leading-[1.3]">
                        {EXACT_RESUME.experience.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Section: Projects */}
                  <div className="mt-2.5">
                    <h2 className="text-[11.5px] font-bold text-black border-b border-black pb-0.5 mb-1 uppercase tracking-wide">
                      Projects
                    </h2>
                    <div className="space-y-1.5">
                      {EXACT_RESUME.projects.map((project, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-baseline text-[11px]">
                            <div>
                              <span className="font-bold text-black">{project.title}</span>
                              <span className="text-slate-900 font-normal"> – {project.tech}</span>
                            </div>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] font-normal text-slate-900 hover:underline shrink-0 ml-2"
                            >
                              GitHub
                            </a>
                          </div>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-900 text-[10.5px] leading-[1.3] mt-0.5">
                            {project.bullets.map((b, bIdx) => (
                              <li key={bIdx}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section: Technical Skills */}
                  <div className="mt-2.5">
                    <h2 className="text-[11.5px] font-bold text-black border-b border-black pb-0.5 mb-1 uppercase tracking-wide">
                      Technical Skills
                    </h2>
                    <div className="space-y-0.5 text-[10.5px] text-slate-900">
                      {EXACT_RESUME.skills.map((skill, idx) => (
                        <div key={idx} className="leading-[1.3]">
                          <span className="font-bold text-black">{skill.category}: </span>
                          <span className="text-slate-900">{skill.items}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section: Certifications */}
                  <div className="mt-2.5">
                    <h2 className="text-[11.5px] font-bold text-black border-b border-black pb-0.5 mb-1 uppercase tracking-wide">
                      Certifications
                    </h2>
                    <div className="text-[10.5px] text-slate-900">
                      {EXACT_RESUME.certifications.join('   |   ')}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: Native Embedded PDF Preview */}
          {viewMode === 'embedded-pdf' && (
            <div className="w-full h-full flex flex-col items-center justify-center p-2">
              {pdfBlobUrl ? (
                <iframe
                  src={`${pdfBlobUrl}#toolbar=1&view=FitH`}
                  title="PDF Full Preview"
                  className="w-full h-full rounded-2xl border border-white/10 bg-[#0A0A0A]"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                  <Loader2 className="w-8 h-8 animate-spin text-[#FF6A00]" />
                  <span className="font-mono text-sm">Rendering PDF Stream...</span>
                </div>
              )}
            </div>
          )}

          {/* VIEW 3: Interactive Structured Dashboard */}
          {viewMode === 'structured' && (
            <div className="w-full max-w-4xl space-y-6 py-4">
              
              {/* Header Hero Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 shadow-sm text-left">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1">{EXACT_RESUME.name}</h2>
                    <p className="text-[#FF6A00] font-mono text-xs font-semibold">B.Tech AI & ML • NIMS University (CGPA: 8.48/10)</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`mailto:${EXACT_RESUME.email}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#0A0A0A] hover:bg-slate-200 dark:hover:bg-neutral-800 text-xs font-mono text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border border-slate-200 dark:border-white/10"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#FF6A00]" />
                      <span>{EXACT_RESUME.email}</span>
                    </a>
                    <a
                      href={EXACT_RESUME.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#0A0A0A] hover:bg-slate-200 dark:hover:bg-neutral-800 text-xs font-mono text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border border-slate-200 dark:border-white/10"
                    >
                      <Github className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href={EXACT_RESUME.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#0A0A0A] hover:bg-slate-200 dark:hover:bg-neutral-800 text-xs font-mono text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border border-slate-200 dark:border-white/10"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-[#FF6A00]" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-sm mt-4 leading-relaxed font-sans bg-slate-50 dark:bg-[#0A0A0A] p-4 rounded-xl border border-slate-200 dark:border-white/10">
                  {EXACT_RESUME.summary}
                </p>
              </div>

              {/* Experience Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 shadow-sm text-left">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
                    Experience
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] font-mono text-xs border border-slate-200 dark:border-white/15 font-bold">
                    {EXACT_RESUME.experience.period}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-[#0A0A0A] p-4 rounded-xl border border-slate-200 dark:border-white/10">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    {EXACT_RESUME.experience.role} — <span className="text-[#FF6A00]">{EXACT_RESUME.experience.company}</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-3">{EXACT_RESUME.experience.location}</div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
                    {EXACT_RESUME.experience.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 shadow-sm text-left">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
                  Featured Resume Projects (5)
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {EXACT_RESUME.projects.map((proj, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{proj.title}</span>
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1A1A1A] hover:bg-slate-100 dark:hover:bg-neutral-800 text-xs font-mono text-[#FF6A00] border border-slate-200 dark:border-white/15"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="text-[11px] font-mono text-[#FF6A00] font-semibold">{proj.tech}</div>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-sans pt-1">
                        {proj.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] shrink-0 mt-1.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 shadow-sm text-left space-y-3">
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
                    Technical Skills
                  </h3>
                  <div className="space-y-2.5">
                    {EXACT_RESUME.skills.map((s, idx) => (
                      <div key={idx} className="text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{s.category}: </span>
                        <span className="text-slate-600 dark:text-slate-400 font-sans">{s.items}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 shadow-sm text-left space-y-3">
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
                    Certifications
                  </h3>
                  <div className="space-y-2">
                    {EXACT_RESUME.certifications.map((cert, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 text-xs font-sans text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#FF6A00] shrink-0" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* VIEW 4: ATS Raw Plain Text */}
          {viewMode === 'ats' && (
            <div className="w-full max-w-3xl py-4 text-left">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 shadow-sm">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 dark:border-white/10">
                  <span className="text-xs font-mono text-[#FF6A00] font-bold">ATS-Optimized Plain Text (Copy-Ready)</span>
                  <button
                    onClick={handleCopyText}
                    className="px-3 py-1 rounded-lg bg-[#FF6A00]/20 hover:bg-[#FF6A00]/30 text-[#FF6A00] text-xs font-mono flex items-center gap-1.5 transition-all border border-slate-200 dark:border-white/15 cursor-pointer font-bold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#FF6A00]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy All Text'}</span>
                  </button>
                </div>
                <pre className="text-xs font-mono text-slate-800 dark:text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-50 dark:bg-[#0A0A0A] p-4 rounded-xl border border-slate-200 dark:border-white/10 select-all overflow-x-auto">
                  {rawResumeText}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#0A0A0A] text-xs font-mono text-slate-600 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
            <span>Official 1-Page Resume • NIMS University (8.48 CGPA)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-1.5 rounded-xl bg-[#FF6A00] hover:bg-[#ff7b1a] text-black font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>Download Rishi_Jain_Resume.pdf</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
