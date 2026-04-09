// src/components/sections/Footer.tsx
import type { Contact } from '@/types';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer({ contact }: { contact: Contact | null }) {
  return (
    <footer className="bg-ink-950 border-t border-ink-800 py-16 text-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="font-display text-3xl text-cream mb-2">
              Portfolio<span className="text-gold-500">.</span>
            </div>
            <p className="font-body text-ink-400 text-sm">
              {contact?.email ?? 'hello@portfolio.com'}
            </p>
            {contact?.location && (
              <p className="font-body text-ink-500 text-xs mt-1">{contact.location}</p>
            )}
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {contact?.github && (
              <a href={contact.github} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-ink-700 flex items-center justify-center text-ink-400 hover:text-cream hover:border-ink-500 transition-colors">
                <Github size={18} />
              </a>
            )}
            {contact?.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-ink-700 flex items-center justify-center text-ink-400 hover:text-cream hover:border-ink-500 transition-colors">
                <Linkedin size={18} />
              </a>
            )}
            {contact?.twitter && (
              <a href={contact.twitter} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-ink-700 flex items-center justify-center text-ink-400 hover:text-cream hover:border-ink-500 transition-colors">
                <Twitter size={18} />
              </a>
            )}
            {contact?.email && (
              <a href={`mailto:${contact.email}`}
                className="btn-gold text-sm py-2 px-5">
                Hire Me →
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ink-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-ink-600">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          <p className="font-mono text-xs text-ink-600">
            Built with Next.js + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
