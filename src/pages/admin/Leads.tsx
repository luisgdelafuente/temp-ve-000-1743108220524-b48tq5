import React, { useState, useEffect } from 'react';
import { getContacts, updateContact, type Contact } from '../../lib/supabase';
import { Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Leads() {
  const [leads, setLeads] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Contact>>({});

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getContacts();
      setLeads(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar los leads';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (lead: Contact) => {
    setEditingId(lead.id);
    setEditForm(lead);
  };

  const handleSave = async () => {
    if (!editingId || !editForm) return;

    try {
      const updated = await updateContact(editingId, editForm);
      setLeads(leads.map(lead => 
        lead.id === editingId ? updated : lead
      ));
      setEditingId(null);
      toast.success('Lead actualizado correctamente');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar el lead';
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
          onClick={loadLeads}
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
          Leads ({leads.length})
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === lead.id ? (
                    <input
                      type="text"
                      value={editForm.type || ''}
                      onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    lead.type
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === lead.id ? (
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    lead.name
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === lead.id ? (
                    <input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    lead.email
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === lead.id ? (
                    <select
                      value={editForm.status || ''}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="w-full px-2 py-1 border rounded"
                    >
                      <option value="new">Nuevo</option>
                      <option value="contacted">Contactado</option>
                      <option value="converted">Convertido</option>
                      <option value="archived">Archivado</option>
                    </select>
                  ) : (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${lead.status === 'new' ? 'bg-green-100 text-green-800' : ''}
                      ${lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' : ''}
                      ${lead.status === 'converted' ? 'bg-purple-100 text-purple-800' : ''}
                      ${lead.status === 'archived' ? 'bg-gray-100 text-gray-800' : ''}
                    `}>
                      {lead.status === 'new' && 'Nuevo'}
                      {lead.status === 'contacted' && 'Contactado'}
                      {lead.status === 'converted' && 'Convertido'}
                      {lead.status === 'archived' && 'Archivado'}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingId === lead.id ? (
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
                      onClick={() => handleEdit(lead)}
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