import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number; // seconds
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1.8,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Parse the input value string/number into numeric target, prefix, suffix, and formatting specs
  const parseValue = (val: string | number) => {
    const str = String(val).trim();

    // Regex to match prefix, number (with optional decimals and commas), and suffix
    // Examples: "95%+", "< 1.8s", "1,000+", "120ms", "500+", "60%"
    const match = str.match(/^([^\d\-+.]*)([\d,]+(?:\.\d+)?)(.*)$/);

    if (!match) {
      return { isNumeric: false, raw: str };
    }

    const prefix = match[1] || '';
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3] || '';
    const hasCommas = match[2].includes(',');
    const decimalMatch = numStr.match(/\.(\d+)/);
    const decimals = decimalMatch ? decimalMatch[1].length : 0;
    const targetNumeric = parseFloat(numStr);

    return {
      isNumeric: !isNaN(targetNumeric),
      prefix,
      targetNumeric,
      decimals,
      suffix,
      hasCommas,
      raw: str,
    };
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const parsed = parseValue(value);
    if (!parsed.isNumeric) {
      setDisplayValue(parsed.raw);
      return;
    }

    let animationFrameId: number;
    let startTime: number | null = null;
    const { prefix, targetNumeric, decimals, suffix, hasCommas } = parsed;

    // Cubic ease out function
    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutCubic(progress);

      const currentNum = targetNumeric * easedProgress;

      let formattedNum = currentNum.toFixed(decimals);
      if (hasCommas) {
        const parts = formattedNum.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        formattedNum = parts.join('.');
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        // Final snap to exact formatted string
        let finalFormatted = targetNumeric.toFixed(decimals);
        if (hasCommas) {
          const parts = finalFormatted.split('.');
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          finalFormatted = parts.join('.');
        }
        setDisplayValue(`${prefix}${finalFormatted}${suffix}`);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, value, duration]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  );
};
