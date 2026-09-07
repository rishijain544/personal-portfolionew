import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight, Sparkles, Cpu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // ScrollSpy logic to detect active section
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-[100] px-4 sm:px-6 max-w-7xl mx-auto pointer-events-none transition-all duration-300">
      <div className="w-full flex items-center justify-between gap-4">
        {/* 1. Left: Brand Logo & Name (Standalone on Page Background) */}
        <a href="#" className="pointer-events-auto flex items-center gap-2.5 group shrink-0">
          {/* SVG Logo Graphic */}
          <div className="relative flex items-center justify-center">
            <img 
              src="/rj-logo.svg" 
              alt="Rishi Jain Logo" 
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain group-hover:scale-105 transition-transform duration-300" 
            />
            {/* Pulsing AI Online Indicator */}
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6A00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6A00] border border-[#141414]" />
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-[#FF6A00] transition-colors">
              Rishi Jain
            </span>
            <span className="text-[10px] text-[#FF6A00] font-mono tracking-wide -mt-0.5 flex items-center gap-1">
              <Cpu className="w-2.5 h-2.5 text-[#FF6A00] inline" />
              AI & ML
            </span>
          </div>
        </a>

        {/* 2. Center: Navigation Links Floating Pill */}
        <nav
          className={`pointer-events-auto hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-white/[0.08] bg-white/90 dark:bg-[#141414]/90 backdrop-blur-xl transition-all duration-300 relative ${
            scrolled ? 'shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-slate-300 dark:border-white/15' : 'shadow-md dark:shadow-xl'
          }`}
        >
          {/* Subtle Top Metallic Line */}
          <div className="absolute inset-x-8 -top-px h-[1px] bg-gradient-to-r from-transparent via-[#FF6A00]/20 to-transparent pointer-events-none" />

          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#FF6A00] text-black font-extrabold shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-[#FF6A00] dark:hover:text-[#FF6A00] bg-transparent'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* 3. Right: Action Container (Resume Button + Theme Toggle) */}
        <div className="pointer-events-auto flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenResumeModal}
            className="group relative inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full bg-[#FF6A00] hover:bg-[#e05d00] text-black transition-all duration-200 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Dark / Light Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/15 text-slate-800 dark:text-slate-200 hover:border-[#FF6A00] hover:text-[#FF6A00] dark:hover:border-[#FF6A00] dark:hover:text-[#FF6A00] flex items-center justify-center transition-all cursor-pointer shadow-sm"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#FF6A00]" />
            ) : (
              <Moon className="w-4 h-4 text-slate-800" />
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF6A00]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-3 rounded-3xl p-4 bg-white dark:bg-[#141414] backdrop-blur-2xl border border-slate-200 dark:border-white/[0.08] shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-[#FF6A00] text-black font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-[#FF6A00]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />}
                    <span>{link.label}</span>
                  </div>
                </a>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#FF6A00] hover:bg-[#e05d00] text-black font-bold text-sm transition-transform cursor-pointer"
            >
              <FileText className="w-4 h-4 text-black" />
              <span>Interactive Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

