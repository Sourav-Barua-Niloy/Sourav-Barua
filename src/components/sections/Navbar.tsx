'use client';
// src/components/sections/Navbar.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Contact } from '@/types';

const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'UI/UX', href: '#uiux' },
  { label: 'Data', href: '#data' },
  { label: 'Design', href: '#design' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
];

export default function Navbar({ contact }: { contact: Contact | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-cream/90 backdrop-blur-md border-b border-ink-100 py-3 shadow-sm shadow-ink-100/50'
          : 'bg-transparent py-5'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-xl text-ink-900 hover:text-gold-600 transition-colors">
          Portfolio<span className="text-gold-500">.</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-sm text-ink-600 hover:text-ink-900 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500 transition-all group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {contact?.email && (
            <a href={`mailto:${contact.email}`} className="btn-primary text-sm py-2 px-5">
              Contact Me →
            </a>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-ink-700 hover:text-ink-900"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cream border-b border-ink-100 py-4 px-6 flex flex-col gap-4">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-ink-700 hover:text-ink-900"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {contact?.email && (
            <a href={`mailto:${contact.email}`} className="btn-primary text-sm w-fit">
              Contact Me →
            </a>
          )}
        </div>
      )}
    </header>
  );
}
