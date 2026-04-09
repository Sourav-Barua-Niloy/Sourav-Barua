'use client';
// src/components/admin/AdminSidebar.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard, Briefcase, FolderKanban, Zap,
  Palette, BarChart2, PenTool, Globe, LogOut, User
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/projects', label: 'Web Projects', icon: Globe },
  { href: '/admin/uiux', label: 'UI/UX', icon: Palette },
  { href: '/admin/dataanalysis', label: 'Data Analysis', icon: BarChart2 },
  { href: '/admin/graphicdesign', label: 'Graphic Design', icon: PenTool },
  { href: '/admin/skills', label: 'Skills', icon: Zap },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-ink-950 flex flex-col border-r border-ink-800">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-ink-800">
        <Link href="/admin/dashboard" className="font-display text-xl text-cream">
          Portfolio<span className="text-gold-500">.</span>
          <span className="font-mono text-xs text-ink-500 ml-2">admin</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-all',
                active
                  ? 'bg-gold-500 text-ink-950 font-medium'
                  : 'text-ink-400 hover:text-cream hover:bg-ink-800'
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="px-3 py-4 border-t border-ink-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm text-ink-400 hover:text-cream hover:bg-ink-800 transition-all"
        >
          <Globe size={16} />
          View Portfolio
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm text-ink-400 hover:text-red-400 hover:bg-red-950/30 transition-all"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
