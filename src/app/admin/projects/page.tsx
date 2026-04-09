'use client';
// src/app/admin/projects/page.tsx
import { useState, useEffect, useCallback } from 'react';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import { Plus } from 'lucide-react';
import type { Project } from '@/types';

const EMPTY: Omit<Project, 'id' | 'order'> = {
  title: '',
  description: '',
  imageUrl: '',
  liveUrl: '',
  githubUrl: '',
  tags: [],
  category: 'WEBSITE',
  featured: false,
};

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [tagsInput, setTagsInput] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data.filter((p: Project) => p.category === 'WEBSITE'));
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY);
    setTagsInput('');
    setModalOpen(true);
  }

  function openEdit(project: Project) {
    setEditing(project);
    setForm({ ...project });
    setTagsInput(project.tags.join(', '));
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const payload = { ...form, tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean), category: 'WEBSITE' };
    const url = editing ? `/api/projects/${editing.id}` : '/api/projects';
    const method = editing ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setSaving(false);
    setModalOpen(false);
    fetchProjects();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this project?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    fetchProjects();
  }

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description', render: (r: Project) => <span className="line-clamp-1 max-w-xs">{r.description}</span> },
    { key: 'tags', label: 'Tags', render: (r: Project) => <div className="flex flex-wrap gap-1">{r.tags.slice(0, 3).map(t => <Badge key={t}>{t}</Badge>)}</div> },
    { key: 'featured', label: 'Featured', render: (r: Project) => r.featured ? <Badge variant="gold">Yes</Badge> : <Badge>No</Badge> },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-ink-400 mb-1">Admin</p>
          <h1 className="font-display text-3xl text-ink-900">Web Projects</h1>
        </div>
        <Button variant="gold" onClick={openCreate}>
          <Plus size={15} /> Add Project
        </Button>
      </div>

      <DataTable columns={columns} data={projects} onEdit={openEdit} onDelete={handleDelete} loading={loading} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Project' : 'New Project'} size="lg">
        <div className="space-y-4">
          <Input label="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Project title" />
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs tracking-wide uppercase text-ink-600">Description</label>
            <textarea
              className="input min-h-[90px] resize-none"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Short project description"
            />
          </div>
          <Input label="Image URL" value={form.imageUrl ?? ''} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://..." />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Live URL" value={form.liveUrl ?? ''} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))} placeholder="https://..." />
            <Input label="GitHub URL" value={form.githubUrl ?? ''} onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))} placeholder="https://github.com/..." />
          </div>
          <Input label="Tags (comma-separated)" value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="React, TypeScript, Node.js" />
          <div className="flex items-center gap-3">
            <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-amber-500" />
            <label htmlFor="featured" className="font-body text-sm text-ink-700">Mark as Featured</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="gold" loading={saving} onClick={handleSave}>
              {editing ? 'Save Changes' : 'Create Project'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
