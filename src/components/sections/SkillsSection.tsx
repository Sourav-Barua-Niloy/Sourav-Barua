// src/components/sections/SkillsSection.tsx
import type { Skill, SkillCategory } from '@/types';

const categoryLabels: Record<SkillCategory, string> = {
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  DATABASE: 'Database',
  DESIGN: 'Design',
  DATA: 'Data & Analytics',
  DEVOPS: 'DevOps',
  OTHER: 'Other',
};

const categoryColors: Record<SkillCategory, string> = {
  FRONTEND: 'bg-violet-500',
  BACKEND: 'bg-emerald-500',
  DATABASE: 'bg-blue-500',
  DESIGN: 'bg-rose-500',
  DATA: 'bg-amber-500',
  DEVOPS: 'bg-cyan-500',
  OTHER: 'bg-ink-400',
};

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  return (
    <section id="skills" className="py-32 bg-ink-950 text-cream relative overflow-hidden grain-overlay">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-ink-700/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <p className="section-label mb-4" style={{ color: '#d4a017' }}>✦ Expertise</p>
          <h2 className="font-display text-5xl md:text-6xl text-cream leading-tight">
            Skills &amp; <span className="italic text-gold-400">Technologies</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(Object.entries(grouped) as [SkillCategory, Skill[]][]).map(([category, catSkills]) => (
            <div key={category} className="bg-ink-900/60 backdrop-blur-sm border border-ink-800 rounded-2xl p-6 hover:border-gold-700/50 transition-colors">
              <h3 className="font-mono text-xs tracking-widest uppercase text-gold-500 mb-6">
                {categoryLabels[category]}
              </h3>
              <div className="space-y-5">
                {catSkills.map(skill => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-body text-sm text-ink-200">{skill.name}</span>
                      <span className="font-mono text-xs text-ink-500">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-ink-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${categoryColors[category]} transition-all duration-1000`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
