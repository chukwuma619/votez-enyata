'use client';
import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/button';
import { Logo } from '../logo';
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from '@/components/navbar';
import crypto from "crypto"
import { Link } from '@/components/link';

const navigation = {
  main: [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '/#features' },
    { name: 'FAQ', href: '/#faq' },
    // { name: 'How to vote', href: '#' },
    // { name: 'Check Result', href: '#/results' },
    // { name: 'Blog', href: '#' },
   
  ],
};

const stats = [
  { id: 1, name: 'Elections Hosted', value: '10,000+' },
  { id: 2, name: 'Votes Cast', value: '500,000+' },
  { id: 3, name: 'Satisfied Creators', value: '1,000+' },
  { id: 4, name: 'Uptime', value: '99.99%' },
];

export default function HomeNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const accessCode = crypto.randomBytes(4).toString('hex');
  // console.log(accessCode);
  
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Navbar className="p-6 lg:px-8">
        <Link href="/" aria-label="Home">
          <span className="sr-only">Votez</span>
          <Logo className="h-6 w-auto" />
        </Link>
        <NavbarSpacer className="lg:!hidden" />

        <NavbarSection className="lg:!hidden">
          <Button outline onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </Button>
        </NavbarSection>

        <NavbarSpacer className="!hidden lg:!flex" />
        <NavbarSection className="!hidden lg:!flex">
          {navigation.main.map((nav, index) => (
            <NavbarItem key={index} href={nav.href}>
              {nav.name}
            </NavbarItem>
          ))}
        </NavbarSection>
        <NavbarSpacer className="!hidden lg:!flex" />
        <NavbarSection className="!hidden lg:!flex">
          <Button outline href={'/auth/sign-in'}>
            Sign in <span aria-hidden="true">&rarr;</span>
          </Button>
        </NavbarSection>
      </Navbar>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-zinc-900/10 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Votez</span>
              <Logo className="h-6 w-auto" />
            </Link>
            <Button
              type="button"
              outline
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-zinc-500/10 dark:divide-white/10">
              <NavbarSection className="flex-col space-y-2 py-6">
                {navigation.main.map((item) => (
                  <NavbarItem
                    key={item.name}
                    href={item.href}
                    className="w-full"
                  >
                    {item.name}
                  </NavbarItem>
                ))}
              </NavbarSection>
              <div className="py-6">
                <Button
                  href="/auth/sign-in"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
