import type { Metadata } from 'next';
import { Inter, Lexend } from 'next/font/google';
import clsx from 'clsx';
import './globals.css';
import ThemeProvider from '@/components/theme-context';
// import { Providers } from "./providers";
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
});

export const metadata:Metadata = {
  title: {
    template: '%s - Votez',
    default: 'Votez - Simplifying Election Management for Creators',
  },
  description:
    'Votez streamlines the entire election process, from creation to real-time results, making it easy for election creators to manage every aspect efficiently and securely.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html
        lang="en"
        className={clsx(
          inter.variable,
          lexend.variable,
          'text-zinc-950 scroll-smooth antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950',
        )}
      >
        <body className={inter.className}>
          {children}
         
          </body>
      </html>
    </ThemeProvider>
  );
}
