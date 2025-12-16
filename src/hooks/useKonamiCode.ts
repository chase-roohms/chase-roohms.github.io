import { useEffect, useRef } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function useKonamiCode(callback: () => void) {
  const keysRef = useRef<string[]>([]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current = [...keysRef.current, e.key].slice(-KONAMI_CODE.length);
      
      // Check if the sequence matches
      const matches = KONAMI_CODE.every((key, i) => key === keysRef.current[i]);
      
      if (matches) {
        callback();
        keysRef.current = []; // Reset after activation
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
}

// Easter egg: Type "automation" anywhere on the site
export function useSecretWord(word: string, callback: () => void) {
  const typedRef = useRef<string[]>([]);
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      typedRef.current = [...typedRef.current, e.key].slice(-word.length);
      
      if (typedRef.current.join('').toLowerCase() === word.toLowerCase()) {
        callback();
        typedRef.current = [];
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [word, callback]);
}

// Easter egg: Click the logo multiple times
export function useLogoClicks(count: number, callback: () => void) {
  const clicksRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    clicksRef.current += 1;

    if (clicksRef.current >= count) {
      callback();
      clicksRef.current = 0;
    } else {
      // Reset after 2 seconds of no clicks
      timeoutRef.current = setTimeout(() => {
        clicksRef.current = 0;
      }, 2000);
    }
  };

  return handleClick;
}
