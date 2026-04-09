// src/components/sections/HeroSection.tsx
import type { Hero } from '@/types';
import { ArrowDown, FileText } from 'lucide-react';

export default function HeroSection({ hero }: { hero: Hero }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream grain-overlay"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-300/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/6 w-72 h-72 rounded-full bg-ink-200/20 blur-3xl" />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#1e1a14 1px, transparent 1px), linear-gradient(90deg, #1e1a14 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Floating label */}
      <div className="absolute top-32 left-8 md:left-16 hidden lg:block">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-400 rotate-[-90deg] origin-left translate-y-full flex items-center gap-3">
          <span className="w-12 h-px bg-ink-300 inline-block" />
          Available for work
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        {/* Label */}
        <p
          className="section-label mb-6 opacity-0 animate-fade-up"
          style={{ animationFillMode: 'forwards' }}
        >
          ✦ {hero.subtitle}
        </p>

        {/* Main heading */}
        <h1
          className="font-display text-6xl md:text-8xl lg:text-9xl text-ink-900 leading-[0.9] mb-6 opacity-0 animate-fade-up animate-delay-100"
          style={{ animationFillMode: 'forwards' }}
        >
          {hero.name.split(' ').map((word, i) => (
            <span key={i} className={i % 2 === 1 ? 'italic text-gold-600' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>

        {/* Title pill */}
        <div
          className="inline-flex items-center gap-2 bg-ink-900 text-cream font-mono text-sm px-5 py-2.5 rounded-full mb-8 opacity-0 animate-fade-up animate-delay-200"
          style={{ animationFillMode: 'forwards' }}
        >
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          {hero.title}
        </div>

        {/* Description */}
        <p
          className="font-body text-lg md:text-xl text-ink-600 max-w-2xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-up animate-delay-300"
          style={{ animationFillMode: 'forwards' }}
        >
          {hero.description}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up animate-delay-400"
          style={{ animationFillMode: 'forwards' }}
        >
          <a href={hero.ctaLink} className="btn-gold text-base">
            {hero.ctaText}
            <ArrowDown size={16} />
          </a>
          {hero.resumeUrl && (
            <a href={hero.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-base">
              <FileText size={16} />
              Download Resume
            </a>
          )}
        </div>

        {/* Stats row */}
        <div
          className="mt-20 flex flex-wrap items-center justify-center gap-12 opacity-0 animate-fade-up animate-delay-500"
          style={{ animationFillMode: 'forwards' }}
        >
          {[
            { value: '5+', label: 'Years Experience' },
            { value: '40+', label: 'Projects Delivered' },
            { value: '20+', label: 'Happy Clients' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl text-ink-900 mb-1">{stat.value}</div>
              <div className="font-mono text-xs text-ink-400 tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-400">
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-ink-300 to-transparent" />
      </div>
    </section>
  );
}
