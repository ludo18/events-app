import { useEffect, useState } from 'react';

export default function useDarkMode() {
  let myTheme = undefined;
  //this trick below because next.js uses server-side rendering & localStorage is only available on client-side
  if (typeof window !== 'undefined') {
    myTheme = localStorage.theme;
  }
  const [theme, setTheme] = useState<string | null>(myTheme ?? 'dark');
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    //this trick below because next.js uses server-side rendering & localStorage is only available on client-side
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme, colorTheme]);

  return [colorTheme, setTheme] as const;
}
