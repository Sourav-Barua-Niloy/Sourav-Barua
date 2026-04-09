'use client';
// src/components/ui/DataTable.tsx
import { Pencil, Trash2 } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
}

export default function DataTable<T extends { id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  loading,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-ink-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-parchment border-b border-ink-100">
            {columns.map(col => (
              <th key={String(col.key)} className="text-left font-mono text-xs tracking-widest uppercase text-ink-500 px-4 py-3">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="text-right font-mono text-xs tracking-widest uppercase text-ink-500 px-4 py-3">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-50">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-12 text-ink-400 font-body">
                No records found.
              </td>
            </tr>
          ) : (
            data.map(row => (
              <tr key={row.id} className="hover:bg-ink-50/40 transition-colors">
                {columns.map(col => (
                  <td key={String(col.key)} className="px-4 py-3 text-ink-700 font-body">
                    {col.render
                      ? col.render(row)
                      : String((row as any)[col.key] ?? '—')}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
