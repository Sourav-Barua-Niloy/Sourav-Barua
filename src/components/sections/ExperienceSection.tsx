// src/components/sections/ExperienceSection.tsx
import type { Experience } from '@/types';

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="py-32 bg-parchment relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-ink-900/3 skew-x-2 origin-top-right" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="section-label mb-4">✦ Career Path</p>
          <h2 className="section-heading">
            Work <span className="italic text-gold-600">Experience</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500 via-ink-200 to-transparent hidden md:block" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative flex gap-8 group">
                {/* Timeline dot */}
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-gold-500 border-4 border-cream mt-1.5 group-hover:scale-125 transition-transform z-10" />
                </div>

                {/* Card */}
                <div className="flex-1 card p-8 hover:border-gold-200">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display text-2xl text-ink-900 mb-1">{exp.role}</h3>
                      <p className="font-body text-gold-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs text-ink-400 tracking-wide">
                        {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                      </span>
                      {exp.current && (
                        <div className="mt-1 inline-flex items-center gap-1.5 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Current
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="font-body text-ink-600 leading-relaxed mb-5">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
