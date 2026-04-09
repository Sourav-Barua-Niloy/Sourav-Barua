'use client';
// src/app/admin/login/page.tsx
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);
    if (res?.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid email or password.');
    }
  }

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center grain-overlay p-4">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Card */}
        <div className="bg-ink-900 border border-ink-700 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 mb-4">
              <Lock size={22} className="text-gold-400" />
            </div>
            <h1 className="font-display text-3xl text-cream mb-1">
              Admin<span className="text-gold-500">.</span>
            </h1>
            <p className="font-body text-sm text-ink-400">Sign in to manage your portfolio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none" />
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full bg-ink-800 border border-ink-700 rounded-xl pl-10 pr-4 py-3 text-cream font-body text-sm
                  focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent
                  placeholder:text-ink-500 transition-all"
                required
              />
            </div>

            <div className="relative">
              <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none" />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full bg-ink-800 border border-ink-700 rounded-xl pl-10 pr-4 py-3 text-cream font-body text-sm
                  focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent
                  placeholder:text-ink-500 transition-all"
                required
              />
            </div>

            {error && (
              <div className="bg-red-950/50 border border-red-800 rounded-xl px-4 py-3 font-body text-sm text-red-400">
                {error}
              </div>
            )}

            <Button type="submit" variant="gold" loading={loading} className="w-full py-3 rounded-xl">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center font-mono text-xs text-ink-600">
            Default: admin@portfolio.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
