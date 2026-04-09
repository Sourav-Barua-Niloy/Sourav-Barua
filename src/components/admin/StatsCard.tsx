// src/components/admin/StatsCard.tsx
import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  className?: string;
}

export default function StatsCard({ label, value, icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn('bg-white border border-ink-100 rounded-2xl p-6 flex items-start justify-between', className)}>
      <div>
        <p className="font-mono text-xs tracking-widest uppercase text-ink-400 mb-2">{label}</p>
        <p className="font-display text-4xl text-ink-900">{value}</p>
        {trend && <p className="font-body text-xs text-ink-400 mt-2">{trend}</p>}
      </div>
      <div className="p-3 bg-parchment rounded-xl text-ink-600">{icon}</div>
    </div>
  );
}
