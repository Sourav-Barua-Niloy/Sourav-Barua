// src/app/admin/dashboard/page.tsx
import { prisma } from '@/lib/prisma';
import StatsCard from '@/components/admin/StatsCard';
import { Briefcase, FolderKanban, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

async function getStats() {
  const [expCount, projectCount, skillCount, hero] = await Promise.all([
    prisma.experience.count(),
    prisma.project.count(),
    prisma.skill.count(),
    prisma.hero.findFirst(),
  ]);
  return { expCount, projectCount, skillCount, hero };
}

export default async function DashboardPage() {
  const { expCount, projectCount, skillCount, hero } = await getStats();

  const quickLinks = [
    { href: '/admin/experience', label: 'Manage Experience', icon: Briefcase, desc: 'Add or update your job history' },
    { href: '/admin/projects', label: 'Web Projects', icon: Globe, desc: 'Manage your web project showcase' },
    { href: '/admin/uiux', label: 'UI/UX Projects', icon: FolderKanban, desc: 'Update design work' },
    { href: '/admin/skills', label: 'Skills', icon: Zap, desc: 'Update your skill set' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-xs tracking-widest uppercase text-ink-400 mb-1">Welcome back</p>
        <h1 className="font-display text-4xl text-ink-900">
          Portfolio <span className="italic text-gold-600">Dashboard</span>
        </h1>
        <p className="font-body text-ink-500 mt-2">
          Manage all your portfolio content from here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        <StatsCard
          label="Experiences"
          value={expCount}
          icon={<Briefcase size={20} />}
          trend="Work history entries"
        />
        <StatsCard
          label="Projects"
          value={projectCount}
          icon={<FolderKanban size={20} />}
          trend="Across all categories"
        />
        <StatsCard
          label="Skills"
          value={skillCount}
          icon={<Zap size={20} />}
          trend="Listed technologies"
        />
      </div>

      {/* Hero info */}
      {hero && (
        <div className="bg-ink-950 rounded-2xl p-6 mb-10 text-cream grain-overlay">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-ink-400 mb-2">Hero Section</p>
              <h2 className="font-display text-3xl text-cream">{hero.name}</h2>
              <p className="font-body text-gold-400 mt-1">{hero.title}</p>
              <p className="font-body text-sm text-ink-400 mt-2 max-w-md">{hero.description}</p>
            </div>
            <Link href="/admin/dashboard" className="btn-gold text-sm py-2 px-4">
              Edit Hero →
            </Link>
          </div>
        </div>
      )}

      {/* Quick links */}
      <div>
        <h2 className="font-display text-2xl text-ink-900 mb-5">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickLinks.map(item => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="card p-5 flex items-center gap-4 hover:border-gold-200"
              >
                <div className="p-3 bg-parchment rounded-xl text-ink-600 shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-body font-medium text-ink-900">{item.label}</p>
                  <p className="font-body text-xs text-ink-500 mt-0.5">{item.desc}</p>
                </div>
                <span className="ml-auto text-ink-400">→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
