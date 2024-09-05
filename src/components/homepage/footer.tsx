'use client';
import Link from 'next/link';
import { Container } from '../container';
import { useContext } from 'react';
import { Logo } from '../logo';
import { MoonIcon, SunIcon, TvIcon } from '@heroicons/react/24/outline';
import { Navbar, NavbarItem, NavbarSection } from '../navbar';
import { Subheading } from '../heading';
import { Text } from '../text';
import { Button } from '../button';
import { Input } from '../input';
import clsx from 'clsx';
const navigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Pricing', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
    { name: 'API Status', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  legal: [
    { name: 'Claim', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
};
import { ThemeContext } from '../theme-context';
export default function Footer() {
  const { theme, setTheme } = useContext(ThemeContext);

  function handleThemeChange(mode: 'light' | 'system' | 'dark') {
    switch (mode) {
      case 'light':
        localStorage.theme = 'light';
        setTheme('light');
        break;

      case 'dark':
        localStorage.theme = 'dark';
        setTheme('dark');
        break;

      case 'system':
        localStorage.removeItem('theme');
        setTheme('system');
        break;

      default:
        break;
    }
  }
  return (
    <footer
      id="footer"
      className="bg-white dark:bg-zinc-900"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <Logo className='h-6 w-auto' />
            <Navbar className="mt-11 flex gap-8">
              <NavbarSection>
                <NavbarItem href="/#features">Features</NavbarItem>
                <NavbarItem href="/#features">Testimonials</NavbarItem>
                <NavbarItem href="/#pricing">Pricing</NavbarItem>
              </NavbarSection>
            </Navbar>
          </div>
          <div className="flex flex-col">
            <Subheading
              level={3}
              className="!text-sm !font-semibold !leading-6"
            >
              Subscribe to our newsletter
            </Subheading>
            <Text className="mt-2 text-sm leading-6">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </Text>
            <form className="mt-6 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="shadow-sm sm:w-64 xl:w-full"
                placeholder="Enter your email"
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <Button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center border-t border-zinc-950/10 py-10 sm:flex-row-reverse sm:justify-between dark:border-white/10">
          <div className="inline-flex w-fit items-center rounded-full border border-zinc-950/10 p-1 dark:border-white/10">
            <button
              type="button"
              onClick={() => {
                handleThemeChange('light');
              }}
              className={clsx(
                'flex size-8 items-center justify-center rounded-full text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200',
                theme === 'light'
                  ? 'bg-zinc-50 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
                  : '',
              )}
              aria-label="Switch to light theme"
            >
              <SunIcon className="size-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                handleThemeChange('system');
              }}
              className={clsx(
                'flex size-8 items-center justify-center rounded-full text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200',
                theme === 'system'
                  ? 'bg-zinc-50 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
                  : '',
              )}
              title="default system mode"
            >
              <TvIcon className="size-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                handleThemeChange('dark');
              }}
              className={clsx(
                'flex size-8 items-center justify-center rounded-full text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200',
                theme === 'dark'
                  ? 'bg-zinc-50 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
                  : '',
              )}
              aria-label="Switch to dark theme"
            >
              <MoonIcon className="size-4" />
            </button>
          </div>

          <div>
            <Text className="mt-6 text-sm sm:mt-0">
              Copyright &copy; {new Date().getFullYear()} Votez. All rights
              reserved.
            </Text>
            <div className="mt-4 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link href="#" className="group" aria-label="Votez on X">
                <svg
                  className="h-6 w-6 fill-zinc-500 group-hover:fill-zinc-700 dark:fill-zinc-400 dark:group-hover:fill-zinc-200"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z" />
                </svg>
              </Link>
              <hr className="h-5 outline outline-1 outline-zinc-950/10 dark:outline-white/10" />
              <Link href="#" className="group" aria-label="Votez on GitHub">
                <svg
                  className="h-6 w-6 fill-zinc-500 group-hover:fill-zinc-700 dark:fill-zinc-400 dark:group-hover:fill-zinc-200"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
