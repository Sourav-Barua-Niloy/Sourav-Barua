// src/components/ui/Badge.tsx
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'green' | 'red' | 'blue';
  className?: string;
}

const variants = {
  default: 'bg-parchment text-ink-600 border border-ink-100',
  gold: 'bg-gold-500 text-ink-950',
  green: 'bg-green-50 text-green-700 border border-green-200',
  red: 'bg-red-50 text-red-700 border border-red-200',
  blue: 'bg-blue-50 text-blue-700 border border-blue-200',
};

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 font-mono text-xs px-3 py-1 rounded-full', variants[variant], className)}>
      {children}
    </span>
  );
}
