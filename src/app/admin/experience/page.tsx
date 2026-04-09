'use client';
// src/app/admin/experience/page.tsx
import { useState, useEffect, useCallback } from 'react';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import { Plus } from 'lucide-react';
import type { Experience } from '@/types';

const EMPTY = {
  company: '', role: '', startDate: '', endDate: '', current: false,
  description: '', technologies: [] as string[], logoUrl: '', order: 0,
};

export default function ExperienceAdminPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/experience');
    setExperiences(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY);
    setTechInput('');
    setModalOpen(true);
  }

  function openEdit(exp: Experience) {
    setEditing(exp);
    setForm({ ...exp, endDate: exp.endDate ?? '', logoUrl: exp.logoUrl ?? '' });
    setTechInput(exp.technologies.join(', '));
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const payload = {
      ...form,
      technologies: techInput.split(',').map(t => t.trim()).filter(Boolean),
      endDate: form.current ? null : form.endDate || null,
    };
    const url = editing ? `/api/experience/${editing.id}` : '/api/experience';
    const method = editing ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setSaving(false);
    setModalOpen(false);
    fetchData();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this experience?')) return;
    await fetch(`/api/experience/${id}`, { method: 'DELETE' });
    fetchData();
  }

  const columns = [
    { key: 'company', label: 'Company' },
    { key: 'role', label: 'Role' },
    { key: 'startDate', label: 'Start' },
    {
      key: 'current', label: 'Status',
      render: (r: Experience) => r.current
        ? <Badge variant="green">Current</Badge>
        : <Badge>{r.endDate ?? '—'}</Badge>
    },
    {
      key: 'technologies', label: 'Stack',
      render: (r: Experience) => (
        <div className="flex flex-wrap gap-1">{r.technologies.slice(0, 3).map(t => <Badge key={t}>{t}</Badge>)}</div>
      )
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-ink-400 mb-1">Admin</p>
          <h1 className="font-display text-3xl text-ink-900">Job Experience</h1>
        </div>
        <Button variant="gold" onClick={openCreate}>
          <Plus size={15} /> Add Experience
        </Button>
      </div>

      <DataTable columns={columns} data={experiences} onEdit={openEdit} onDelete={handleDelete} loading={loading} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Experience' : 'Add Experience'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Company name" />
            <Input label="Role" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Job title" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} placeholder="Jan 2022" />
            <Input label="End Date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} placeholder="Dec 2023" disabled={form.current} />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="current" checked={form.current} onChange={e => setForm(f => ({ ...f, current: e.target.checked }))} className="w-4 h-4 accent-amber-500" />
            <label htmlFor="current" className="font-body text-sm text-ink-700">Currently working here</label>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs tracking-wide uppercase text-ink-600">Description</label>
            <textarea
              className="input min-h-[90px] resize-none"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
          <Input label="Technologies (comma-separated)" value={techInput} onChange={e => setTechInput(e.target.value)} placeholder="React, Node.js, PostgreSQL" />
          <Input label="Logo URL (optional)" value={form.logoUrl} onChange={e => setForm(f => ({ ...f, logoUrl: e.target.value }))} placeholder="https://..." />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="gold" loading={saving} onClick={handleSave}>
              {editing ? 'Save Changes' : 'Add Experience'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
