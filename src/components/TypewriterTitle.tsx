import React, { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react';

interface TypewriterTitleProps {
  titles: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export const TypewriterTitle: React.FC<TypewriterTitleProps> = ({
  titles,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseDuration = 2200,
  className = '',
}) => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = titles[currentTitleIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing characters
        const nextText = fullText.slice(0, currentText.length + 1);
        setCurrentText(nextText);

        // Finished typing current title
        if (nextText === fullText) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
          return;
        }
      } else {
        // Deleting characters
        const nextText = fullText.slice(0, currentText.length - 1);
        setCurrentText(nextText);

        // Finished deleting title
        if (nextText === '') {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
          return;
        }
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleType, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTitleIndex, titles, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <div className={`flex items-center flex-wrap gap-2 text-lg sm:text-xl md:text-2xl font-mono text-[#FF6A00] font-bold ${className}`}>
      <Cpu className="w-6 h-6 text-[#FF6A00] animate-pulse shrink-0" />
      <div className="relative inline-flex items-center min-h-[2.25rem]">
        <span className="text-[#FF6A00]">
          {currentText}
        </span>
        {/* Animated Blinking Cursor Effect */}
        <span className="inline-block w-2.5 h-6 sm:h-7 ml-1 bg-[#FF6A00] rounded-sm animate-pulse" />
      </div>
    </div>
  );
};
