"use client";

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';
type FontSize = 'sm' | 'base' | 'lg';


const applyTheme = (theme: Theme) => {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
  localStorage.setItem('theme', theme);
};

const applyFontSize = (size: FontSize) => {
  const classMap: Record<FontSize, string> = { sm: 'text-sm', base: 'text-base', lg: 'text-lg' };
  document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
  document.documentElement.classList.add(classMap[size]);
  localStorage.setItem('fontSize', size);
};

const applyAnimations = (enabled: boolean) => {
  document.body.classList.toggle('disable-animations', !enabled);
  localStorage.setItem('animationsEnabled', JSON.stringify(enabled));
};

export function useSettings() {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setThemeState] = useState<Theme>('light');
  const [fontSize, setFontSizeState] = useState<FontSize>('base');
  const [animationsEnabled, setAnimationsEnabledState] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = storedTheme || 'light';
    setThemeState(initialTheme);
    document.documentElement.classList.add(initialTheme);
    document.documentElement.lang = 'es';

    const storedFontSize = localStorage.getItem('fontSize') as FontSize | null;
    const initialFontSize = storedFontSize || 'base';
    setFontSizeState(initialFontSize)
    const classMap: Record<FontSize, string> = { sm: 'text-sm', base: 'text-base', lg: 'text-lg' };
    document.documentElement.classList.add(classMap[initialFontSize]);

    const storedAnimations = localStorage.getItem('animationsEnabled');
    const initialAnimations = storedAnimations ? JSON.parse(storedAnimations) : true;
    setAnimationsEnabledState(initialAnimations);
    if (!initialAnimations) {
      document.body.classList.add('disable-animations');
    }

    setIsMounted(true);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  }, []);

  const setFontSize = useCallback((newSize: FontSize) => {
    setFontSizeState(newSize);
    applyFontSize(newSize);
  }, []);

  const setAnimationsEnabled = useCallback((enabled: boolean) => {
    setAnimationsEnabledState(enabled);
    applyAnimations(enabled);
  }, []);

  return { isMounted, theme, setTheme, fontSize, setFontSize, animationsEnabled, setAnimationsEnabled };
}
