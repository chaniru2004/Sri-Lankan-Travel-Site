'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit3, Trash2, CheckCircle2, X, ArrowLeft } from 'lucide-react';
import { api } from '@/lib/api';

export default function AdminDestinationsCrudPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [region, setRegion] = useState('Cultural Triangle');
  const [province, setProvince] = useState('Central Province');
  const [district, setDistrict] = useState('Matale');

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getDestinations();
        setDestinations(res.data || res || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newDest = {
      id: String(Date.now()),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      region,
      province,
      district,
      shortDescription: 'Newly created tourism destination in Sri Lanka.',
      status: 'PUBLISHED',
    };
    setDestinations([newDest, ...destinations]);
    setShowModal(false);
    setName('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this destination?')) {
      setDestinations(prev => prev.filter(d => d.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8 pb-20 text-ceylon-950">
      <Link href="/admin" className="inline-flex items-center space-x-1 text-xs text-ceylon-700 font-semibold uppercase hover:text-ceylon-950">
        <ArrowLeft className="w-4 h-4" /> <span>Back to Admin Dashboard</span>
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-ceylon-950">Manage Destinations</h1>
          <p className="text-xs text-ceylon-700">Total Destinations: {destinations.length}</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-full bg-ceylon-600 hover:bg-ceylon-700 text-ceylon-950 font-bold text-xs uppercase flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-4 h-4" /> <span>Add New Destination</span>
        </button>
      </div>

      {/* CRUD Table */}
      <div className="bg-white rounded-2xl overflow-hidden border border-ceylon-500/20 shadow-xl shadow-ceylon-900/10">
        <table className="w-full text-left text-xs text-ceylon-800">
          <thead className="bg-ceylon-50 text-ceylon-700 uppercase font-semibold border-b border-ceylon-500/20">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Region</th>
              <th className="p-4">Province</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ceylon-500/10">
            {destinations.map((d: any) => (
              <tr key={d.id} className="hover:bg-ceylon-50 transition">
                <td className="p-4 font-semibold text-ceylon-950">{d.name}</td>
                <td className="p-4">{d.region}</td>
                <td className="p-4">{d.province}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                    {d.status || 'PUBLISHED'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleDelete(d.id)} className="p-2 text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-ceylon-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 border border-ceylon-500/20 text-ceylon-950 relative shadow-2xl shadow-ceylon-950/30">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-ceylon-700 hover:text-ceylon-950">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-playfair text-2xl font-bold text-ceylon-950 mb-4">Add Destination</h3>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block mb-1 font-semibold">Destination Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Trincomalee"
                  className="w-full bg-ceylon-50 border border-ceylon-500/30 rounded-xl px-4 py-2 text-ceylon-950 focus:outline-none focus:border-ceylon-600"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Region</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-ceylon-50 border border-ceylon-500/30 rounded-xl px-4 py-2 text-ceylon-950 focus:outline-none focus:border-ceylon-600"
                >
                  <option value="Cultural Triangle">Cultural Triangle</option>
                  <option value="Central">Central</option>
                  <option value="Southern">Southern</option>
                  <option value="Eastern">Eastern</option>
                  <option value="Northern">Northern</option>
                  <option value="Wildlife">Wildlife</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-ceylon-600 text-ceylon-950 font-bold text-xs uppercase tracking-wider mt-4 hover:bg-ceylon-700"
              >
                Save Destination
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
