'use client';
// src/app/admin/skills/page.tsx
import { useState, useEffect, useCallback } from 'react';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import { Plus } from 'lucide-react';
import type { Skill, SkillCategory } from '@/types';

const CATEGORIES: SkillCategory[] = ['FRONTEND', 'BACKEND', 'DATABASE', 'DESIGN', 'DATA', 'DEVOPS', 'OTHER'];

const EMPTY = { name: '', level: 80, category: 'FRONTEND' as SkillCategory, icon: '', order: 0 };

const categoryColors: Record<SkillCategory, 'default' | 'gold' | 'green' | 'red' | 'blue'> = {
  FRONTEND: 'blue', BACKEND: 'green', DATABASE: 'blue',
  DESIGN: 'red', DATA: 'gold', DEVOPS: 'green', OTHER: 'default',
};

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/skills');
    setSkills(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY);
    setModalOpen(true);
  }

  function openEdit(skill: Skill) {
    setEditing(skill);
    setForm({ name: skill.name, level: skill.level, category: skill.category, icon: skill.icon ?? '', order: skill.order });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const url = editing ? `/api/skills/${editing.id}` : '/api/skills';
    const method = editing ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    setModalOpen(false);
    fetchData();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this skill?')) return;
    await fetch(`/api/skills/${id}`, { method: 'DELETE' });
    fetchData();
  }

  const columns = [
    { key: 'name', label: 'Skill' },
    {
      key: 'category', label: 'Category',
      render: (r: Skill) => <Badge variant={categoryColors[r.category]}>{r.category}</Badge>
    },
    {
      key: 'level', label: 'Proficiency',
      render: (r: Skill) => (
        <div className="flex items-center gap-3 min-w-[140px]">
          <div className="flex-1 h-1.5 bg-ink-100 rounded-full overflow-hidden">
            <div className="h-full bg-gold-500 rounded-full" style={{ width: `${r.level}%` }} />
          </div>
          <span className="font-mono text-xs text-ink-500 w-8">{r.level}%</span>
        </div>
      )
    },
    { key: 'order', label: 'Order' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-ink-400 mb-1">Admin</p>
          <h1 className="font-display text-3xl text-ink-900">Skills</h1>
        </div>
        <Button variant="gold" onClick={openCreate}>
          <Plus size={15} /> Add Skill
        </Button>
      </div>

      <DataTable columns={columns} data={skills} onEdit={openEdit} onDelete={handleDelete} loading={loading} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Skill' : 'Add Skill'}>
        <div className="space-y-4">
          <Input label="Skill Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. React / Next.js" />
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs tracking-wide uppercase text-ink-600">Category</label>
            <select
              className="input"
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value as SkillCategory }))}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs tracking-wide uppercase text-ink-600">
              Proficiency Level: <span className="text-gold-600">{form.level}%</span>
            </label>
            <input
              type="range" min={0} max={100} value={form.level}
              onChange={e => setForm(f => ({ ...f, level: Number(e.target.value) }))}
              className="w-full accent-amber-500"
            />
            <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
              <div className="h-full bg-gold-500 rounded-full transition-all" style={{ width: `${form.level}%` }} />
            </div>
          </div>
          <Input label="Display Order" type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="gold" loading={saving} onClick={handleSave}>
              {editing ? 'Save Changes' : 'Add Skill'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
