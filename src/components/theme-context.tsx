'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';
export const ThemeContext = createContext<{
  theme: 'light' | 'system' | 'dark';
  setTheme: Dispatch<SetStateAction<'light' | 'system' | 'dark'>>;
}>({ theme: 'system', setTheme: () => {} });

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'system' | 'dark'>('system');

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else if (localStorage.theme === 'light') {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    } else if (
      !('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.documentElement.classList.add('dark');
    } else if (
      !('theme' in localStorage) &&
      !window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
