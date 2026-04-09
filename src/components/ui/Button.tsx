// src/components/ui/Button.tsx
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const variants = {
  primary: 'bg-ink-900 text-cream hover:bg-ink-700 active:scale-95',
  secondary: 'border border-ink-300 text-ink-800 hover:border-ink-600 hover:bg-ink-50 active:scale-95',
  gold: 'bg-gold-500 text-ink-950 hover:bg-gold-400 active:scale-95',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-95',
  ghost: 'text-ink-600 hover:text-ink-900 hover:bg-ink-50 active:scale-95',
};

const sizes = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-7 py-3.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-body font-medium rounded-full transition-all duration-200 cursor-pointer',
        variants[variant],
        sizes[size],
        (disabled || loading) && 'opacity-60 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  );
}
