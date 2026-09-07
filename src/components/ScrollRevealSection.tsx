import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  direction?: 'left' | 'right' | 'none';
  delay?: number;
}

export const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  className = '',
  id,
  direction = 'none',
  delay = 0,
}) => {
  if (direction === 'none') {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  const initialX = direction === 'left' ? -50 : 50;

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
        delay: Math.min(delay, 0.2),
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};

