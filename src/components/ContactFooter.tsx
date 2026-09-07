import React, { useState } from 'react';
import { HERO_DATA, EXACT_RESUME } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Copy, Check, Sparkles, Terminal, Quote, ArrowUpRight, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';

interface ContactFooterProps {
  onOpenResumeModal: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onOpenResumeModal }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('https://formspree.io/f/xgaezglb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.8 } });
      } else {
        const data = await response.json();
        if (data && data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors.map((err: any) => err.message).join(', '));
        } else {
          setErrorMessage('Unable to send message. Please try again or email directly.');
        }
      }
    } catch (err) {
      setErrorMessage('Network error. Please check your connection or send an email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="relative pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-slate-200 dark:border-[#FF6A00]/30 text-[#FF6A00] text-xs font-mono font-bold mb-3">
          <Mail className="w-4 h-4 text-[#FF6A00]" />
          <span>Initiate Contact</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
          Let's Build Something <span className="text-[#FF6A00]">Extraordinary</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 font-medium max-w-2xl">
          Open for Machine Learning Engineering, Full-Stack AI Development, and Research Collaborations. Reach out via email, social links, or drop a note below.
        </p>
      </motion.div>

      {/* Main Grid: Sticky Note Form (Left) + Dark Quote & Contact Cards (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-14">
        
        {/* Left Column (lg:col-span-6): Sticky Note Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-6"
        >
          {/* Sticky Note Container: Solid Warm Orange Background + Rotation */}
          <div className="bg-[#FF6A00] rounded-3xl p-6 sm:p-8 shadow-2xl relative rotate-1 sm:rotate-[1.5deg] hover:rotate-0 transition-transform duration-300 border border-orange-400/80 text-black">
            
            {/* Sticky Note Pin/Tape Decorative Graphic */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-orange-200/90 rounded-sm shadow-sm border border-orange-300/60 opacity-90" />

            <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/15">
              <div>
                <h3 className="font-display font-extrabold text-2xl text-black tracking-tight">
                  Leave a Note
                </h3>
                <p className="text-xs font-mono text-neutral-900 font-semibold">
                  Direct inquiry or collaboration idea
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-black" />
            </div>

            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="p-8 rounded-2xl bg-[#0A0A0A] text-white border border-black/30 text-center flex flex-col items-center justify-center space-y-4 my-2 relative overflow-hidden shadow-2xl"
              >
                {/* Background subtle radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(#FF6A00_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

                {/* Animated SVG Checkmark + Particle Burst Center Stage */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  {/* Scatter Particle Burst (10 particles) */}
                  {[
                    { id: 0, x: 0, y: -52, color: '#FF6A00', size: 6 },
                    { id: 1, x: 32, y: -38, color: '#FFFFFF', size: 4 },
                    { id: 2, x: 50, y: 0, color: '#FF6A00', size: 5 },
                    { id: 3, x: 38, y: 36, color: '#FFFFFF', size: 4 },
                    { id: 4, x: 0, y: 52, color: '#FF6A00', size: 6 },
                    { id: 5, x: -38, y: 36, color: '#FFFFFF', size: 4 },
                    { id: 6, x: -50, y: 0, color: '#FF6A00', size: 5 },
                    { id: 7, x: -32, y: -38, color: '#FFFFFF', size: 4 },
                    { id: 8, x: 22, y: -22, color: '#FF944D', size: 5 },
                    { id: 9, x: -22, y: 22, color: '#FF944D', size: 5 },
                  ].map((p) => (
                    <motion.span
                      key={p.id}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                      transition={{ duration: 0.75, delay: 0.3, ease: 'easeOut' }}
                      style={{
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        borderRadius: '50%',
                        position: 'absolute',
                      }}
                    />
                  ))}

                  {/* Self-Drawing SVG Circle & Checkmark */}
                  <svg className="w-20 h-20 z-10" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#FF6A00"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                    <motion.path
                      d="M 26 41 L 36 51 L 55 31"
                      stroke="#FF6A00"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.35, ease: 'easeOut' }}
                    />
                  </svg>
                </div>

                <div className="space-y-1.5 z-10">
                  <h4 className="font-display font-extrabold text-2xl text-white tracking-tight">
                    Message Dispatched!
                  </h4>
                  <p className="text-xs font-mono text-slate-300 font-medium max-w-xs leading-relaxed">
                    Message sent — I'll get back to you soon.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSubmitSuccess(false);
                    setErrorMessage(null);
                  }}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#e05d00] text-black font-mono text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg z-10"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative">
                
                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-black/80 text-red-200 border border-red-500/50 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Field 1: Your name */}
                <div>
                  <label className="block text-xs font-mono text-black mb-1 font-bold">
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-white/95 border border-black/20 rounded-xl px-4 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-500 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-inner"
                  />
                </div>

                {/* Field 2: Your email */}
                <div>
                  <label className="block text-xs font-mono text-black mb-1 font-bold">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full bg-white/95 border border-black/20 rounded-xl px-4 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-500 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-inner"
                  />
                </div>

                {/* Field 3: What's on your mind */}
                <div>
                  <label className="block text-xs font-mono text-black mb-1 font-bold">
                    What's on your mind
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your project scope, inquiry, or idea..."
                    className="w-full bg-white/95 border border-black/20 rounded-xl px-4 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-500 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all resize-none shadow-inner"
                  />
                </div>

                {/* Circular Send Button in the Corner */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] font-mono text-black/80 font-semibold italic">
                    *Instant dispatch
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    title="Send Note"
                    className="w-12 h-12 rounded-full bg-[#0A0A0A] hover:bg-white text-white hover:text-black border border-black/30 flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer hover:scale-110 active:scale-95 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
                </div>

              </form>
            )}

          </div>
        </motion.div>

        {/* Right Column (lg:col-span-6): Dark Personal Note / Quote Card & Quick Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-6 space-y-6"
        >
          
          {/* Card with Subtle Star/Dot Pattern Background for Personal Note / Quote */}
          <div className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md dark:shadow-xl">
            
            {/* Subtle Star / Dot Pattern Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#ccc_1px,transparent_1px)] dark:bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <Quote className="w-8 h-8 text-[#FF6A00] opacity-90" />

              <p className="font-display font-medium text-base sm:text-lg text-slate-800 dark:text-slate-100 leading-relaxed italic">
                "{HERO_DATA.tagline}"
              </p>

              <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    Rishi Jain
                  </div>
                  <div className="text-xs font-mono text-[#FF6A00]">
                    Machine Learning Engineer & Full-Stack Developer
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/15 text-[10px] font-mono text-slate-700 dark:text-slate-300">
                  NIMS University
                </div>
              </div>
            </div>

          </div>

          {/* Existing Quick Contact Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            
            {/* Email Card */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 flex items-center justify-between shadow-sm dark:shadow-none group">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#FF6A00]/10 text-[#FF6A00]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] text-slate-500">Email</div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 truncate">{HERO_DATA.email}</div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(HERO_DATA.email, 'email')}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/15 text-slate-600 dark:text-slate-400 hover:text-[#FF6A00] transition-colors cursor-pointer shrink-0"
                title="Copy Email"
              >
                {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-[#FF6A00]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 flex items-center justify-between shadow-sm dark:shadow-none group">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#FF6A00]/10 text-[#FF6A00]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Phone</div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">{HERO_DATA.phone}</div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(HERO_DATA.phone, 'phone')}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/15 text-slate-600 dark:text-slate-400 hover:text-[#FF6A00] transition-colors cursor-pointer shrink-0"
                title="Copy Phone"
              >
                {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-[#FF6A00]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>

          {/* Interactive Resume Modal CTA */}
          <button
            onClick={onOpenResumeModal}
            className="w-full py-3.5 rounded-2xl bg-white dark:bg-[#1A1A1A] hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-white/15 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer hover:border-[#FF6A00] shadow-sm dark:shadow-none"
          >
            <Terminal className="w-4 h-4 text-[#FF6A00]" />
            <span>Open Interactive Resume Modal</span>
          </button>

        </motion.div>

      </div>

      {/* Solid Orange Background Strip with Horizontal Bar of Social Links */}
      <div className="w-full bg-[#FF6A00] rounded-3xl p-5 sm:p-6 my-8 text-black flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="font-display font-extrabold text-base sm:text-lg tracking-tight text-black flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-black" />
          <span>Connect Across Platforms</span>
        </div>

        {/* Horizontal Bar of Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            href={HERO_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#0A0A0A] hover:bg-neutral-900 text-slate-100 hover:text-white border border-white/20 font-mono text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 cursor-pointer shadow-md"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href={HERO_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#0A0A0A] hover:bg-neutral-900 text-slate-100 hover:text-white border border-white/20 font-mono text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 cursor-pointer shadow-md"
          >
            <Github className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href={`mailto:${HERO_DATA.email}`}
            className="px-4 py-2 rounded-full bg-[#0A0A0A] hover:bg-neutral-900 text-slate-100 hover:text-white border border-white/20 font-mono text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 cursor-pointer shadow-md"
          >
            <Mail className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>Email</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href={`tel:${HERO_DATA.phone}`}
            className="px-4 py-2 rounded-full bg-[#0A0A0A] hover:bg-neutral-900 text-slate-100 hover:text-white border border-white/20 font-mono text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 cursor-pointer shadow-md"
          >
            <Phone className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>Phone</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>

          <button
            onClick={onOpenResumeModal}
            className="px-4 py-2 rounded-full bg-[#0A0A0A] hover:bg-neutral-900 text-slate-100 hover:text-white border border-white/20 font-mono text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 cursor-pointer shadow-md"
          >
            <Terminal className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>Resume PDF</span>
          </button>
        </div>
      </div>

      {/* Bottom Copyright Row */}
      <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} Rishi Jain. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4">
          <a href={HERO_DATA.github} target="_blank" rel="noreferrer" className="hover:text-[#FF6A00] transition-colors">GitHub</a>
          <a href={HERO_DATA.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#FF6A00] transition-colors">LinkedIn</a>
          <a href={`mailto:${HERO_DATA.email}`} className="hover:text-[#FF6A00] transition-colors">Email</a>
        </div>
      </div>

    </footer>
  );
};
