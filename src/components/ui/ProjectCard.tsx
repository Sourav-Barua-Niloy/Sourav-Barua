// src/components/ui/ProjectCard.tsx
import type { Project } from '@/types';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="card group flex flex-col h-full">
      {/* Image or placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-ink-100 to-parchment overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-5xl text-ink-200">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
        {project.featured && (
          <div className="absolute top-3 right-3 bg-gold-500 text-ink-950 font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display text-xl text-ink-900 mb-2">{project.title}</h3>
        <p className="font-body text-sm text-ink-600 leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(tag => (
            <span key={tag} className="tag text-[11px]">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2 px-4 flex-1 justify-center"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs py-2 px-4 flex-1 justify-center"
            >
              <Github size={13} />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
