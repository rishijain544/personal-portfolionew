import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ThreeCanvas } from './components/ThreeCanvas';
import { CursorGlow } from './components/CursorGlow';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { CertificationsVault } from './components/CertificationsVault';
import { ExperienceEducation } from './components/ExperienceEducation';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ContactFooter } from './components/ContactFooter';
import { ResumeModal } from './components/ResumeModal';
import { ProjectSpecsModal } from './components/ProjectSpecsModal';
import { ScrollRevealSection } from './components/ScrollRevealSection';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { IntroOverlay } from './components/IntroOverlay';
import { Project } from './types';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <ThemeProvider>
      {/* First-load Intro Transition Overlay */}
      <IntroOverlay />

      <div className="min-h-screen font-sans bg-[#FAFAFA] dark:bg-[#0A0A0A] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
        
        {/* Top Reading Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Ambient Cursor Glow Layer Following Mouse across all sections */}
        <CursorGlow />

        {/* Background WebGL 3D Three.js Fluid Mesh Canvas */}
        <ThreeCanvas />

        {/* Foreground Content Container */}
        <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Bar */}
        <Navbar
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />

        {/* Hero Section */}
        <ScrollRevealSection id="hero">
          <Hero
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
          />
        </ScrollRevealSection>

        {/* About Me Section - Two-Column Converging (Left -50px, Right +50px) */}
        <ScrollRevealSection id="about" direction="none">
          <About />
        </ScrollRevealSection>

        {/* Interactive Projects Showcase - Slides in from RIGHT */}
        <ScrollRevealSection id="projects" direction="right">
          <ProjectsShowcase
            onSelectProject={(project) => setSelectedProject(project)}
          />
        </ScrollRevealSection>

        {/* Certifications Vault - Slides in from LEFT */}
        <ScrollRevealSection id="certifications" direction="left">
          <CertificationsVault />
        </ScrollRevealSection>

        {/* Experience & Education - Two-Column Converging (Left -50px, Right +50px) */}
        <ScrollRevealSection id="experience" direction="none">
          <ExperienceEducation />
        </ScrollRevealSection>

        {/* Skills Matrix - Slides in from LEFT */}
        <ScrollRevealSection id="skills" direction="left">
          <SkillsMatrix />
        </ScrollRevealSection>

        {/* Contact & Footer - Two-Column Converging (Left -50px, Right +50px) */}
        <ScrollRevealSection id="contact" direction="none">
          <ContactFooter
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
          />
        </ScrollRevealSection>

      </div>

      {/* Resume Inspector Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Deep Specs Project Modal */}
      <ProjectSpecsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      </div>
    </ThemeProvider>
  );
}
