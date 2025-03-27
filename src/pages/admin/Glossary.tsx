import React, { useState, useEffect } from 'react';
import { getGlossaryTerms, updateGlossaryTerm, type GlossaryTerm } from '../../lib/supabase';
import { Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Glossary() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<GlossaryTerm>>({});

  useEffect(() => {
    loadTerms();
  }, []);

  const loadTerms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGlossaryTerms();
      setTerms(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar los términos';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (term: GlossaryTerm) => {
    setEditingId(term.id);
    setEditForm(term);
  };

  const handleSave = async () => {
    if (!editingId || !editForm) return;

    try {
      const updated = await updateGlossaryTerm(editingId, editForm);
      setTerms(terms.map(term => 
        term.id === editingId ? updated : term
      ));
      setEditingId(null);
      toast.success('Término actualizado correctamente');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar el término';
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
        <button
          onClick={loadTerms}
          className="mt-2 text-red-600 hover:text-red-800 font-medium"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Glosario ({terms.length} términos)
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Última actualización
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {terms.map((term) => (
              <tr key={term.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === term.id ? (
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    term.title
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingId === term.id ? (
                    <input
                      type="text"
                      value={editForm.slug || ''}
                      onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    term.slug
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === term.id ? (
                    <select
                      value={editForm.status || ''}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value as GlossaryTerm['status'] })}
                      className="w-full px-2 py-1 border rounded"
                    >
                      <option value="draft">Borrador</option>
                      <option value="published">Publicado</option>
                      <option value="archived">Archivado</option>
                    </select>
                  ) : (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${term.status === 'published' ? 'bg-green-100 text-green-800' : ''}
                      ${term.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${term.status === 'archived' ? 'bg-gray-100 text-gray-800' : ''}
                    `}>
                      {term.status === 'published' && 'Publicado'}
                      {term.status === 'draft' && 'Borrador'}
                      {term.status === 'archived' && 'Archivado'}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(term.updated_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingId === term.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Save className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-900"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(term)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}