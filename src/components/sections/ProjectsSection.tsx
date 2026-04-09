// src/components/sections/ProjectsSection.tsx
import type { Project } from '@/types';
import ProjectCard from '@/components/ui/ProjectCard';
import { Globe, Palette, BarChart2, PenTool } from 'lucide-react';

interface Props {
  websiteProjects: Project[];
  uiuxProjects: Project[];
  dataProjects: Project[];
  graphicProjects: Project[];
}

const categories = [
  {
    id: 'uiux',
    label: 'UI/UX Design',
    icon: Palette,
    accent: 'from-violet-50 to-purple-50',
    iconColor: 'text-violet-500',
    description: 'User interfaces and experience design',
    key: 'uiuxProjects' as const,
  },
  {
    id: 'data',
    label: 'Data Analysis',
    icon: BarChart2,
    accent: 'from-blue-50 to-cyan-50',
    iconColor: 'text-blue-500',
    description: 'Data visualization and analytics',
    key: 'dataProjects' as const,
  },
  {
    id: 'design',
    label: 'Graphic Design',
    icon: PenTool,
    accent: 'from-rose-50 to-pink-50',
    iconColor: 'text-rose-500',
    description: 'Brand identity and visual design',
    key: 'graphicProjects' as const,
  },
  {
    id: 'projects',
    label: 'Web Projects',
    icon: Globe,
    accent: 'from-amber-50 to-yellow-50',
    iconColor: 'text-amber-500',
    description: 'Full-stack web applications',
    key: 'websiteProjects' as const,
  },
];

export default function ProjectsSection({ websiteProjects, uiuxProjects, dataProjects, graphicProjects }: Props) {
  const data = { websiteProjects, uiuxProjects, dataProjects, graphicProjects };

  return (
    <>
      {categories.map((cat, i) => {
        const projects = data[cat.key];
        if (projects.length === 0) return null;
        const Icon = cat.icon;

        return (
          <section
            key={cat.id}
            id={cat.id}
            className={`py-32 ${i % 2 === 0 ? 'bg-cream' : 'bg-parchment'} relative overflow-hidden`}
          >
            <div className="max-w-7xl mx-auto px-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.accent}`}>
                      <Icon size={22} className={cat.iconColor} />
                    </div>
                    <p className="section-label">✦ {cat.description}</p>
                  </div>
                  <h2 className="section-heading">
                    {cat.label.split(' ').map((w, j) => (
                      <span key={j} className={j === 0 ? 'italic text-gold-600' : ''}>
                        {w}{' '}
                      </span>
                    ))}
                  </h2>
                </div>
                <p className="font-mono text-ink-400 text-sm">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
