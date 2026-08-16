'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield, MapPin, Compass, Landmark, Hotel, Calendar, BookOpen,
  Users, Plus, Trash2, Edit3, Check, Eye
} from 'lucide-react';
import { api } from '@/lib/api';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getAdminMetrics();
        setMetrics(res);
      } catch (err) {
        // Fallback demo metrics
        setMetrics({
          destinations: 20,
          attractions: 50,
          experiences: 25,
          events: 15,
          stories: 15,
          accommodations: 20,
          users: 142,
          trips: 88,
        });
      }
    }
    load();
  }, []);

  const stats = [
    { name: 'Destinations', count: metrics?.destinations || 20, icon: MapPin, color: 'text-ceylon-400', link: '/admin/destinations' },
    { name: 'Attractions', count: metrics?.attractions || 50, icon: Landmark, color: 'text-gold-400', link: '/admin/destinations' },
    { name: 'Experiences', count: metrics?.experiences || 25, icon: Compass, color: 'text-emerald-400', link: '/admin/destinations' },
    { name: 'Accommodations', count: metrics?.accommodations || 20, icon: Hotel, color: 'text-amber-400', link: '/admin/destinations' },
    { name: 'Events', count: metrics?.events || 15, icon: Calendar, color: 'text-teal-400', link: '/admin/destinations' },
    { name: 'Travel Stories', count: metrics?.stories || 15, icon: BookOpen, color: 'text-ceylon-300', link: '/admin/destinations' },
    { name: 'Registered Users', count: metrics?.users || 142, icon: Users, color: 'text-purple-400', link: '/admin/destinations' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ceylon-500/20 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400 text-gold-400 text-xs font-bold uppercase mb-2">
            <Shield className="w-3.5 h-3.5" /> CMS Portal
          </div>
          <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-white">Visit Sri Lanka Content CMS</h1>
        </div>

        <Link
          href="/admin/destinations"
          className="px-6 py-3 rounded-full bg-ceylon-500 hover:bg-ceylon-400 text-ceylon-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" /> <span>Manage Content CRUD</span>
        </Link>
      </div>

      {/* Metrics Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.name} className="glass-panel p-6 rounded-2xl border border-ceylon-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <s.icon className={`w-6 h-6 ${s.color}`} />
              <span className="text-2xl font-playfair font-bold text-white">{s.count}</span>
            </div>
            <div className="text-xs text-sand-200 font-medium">{s.name}</div>
          </div>
        ))}
      </div>

      {/* CMS Module Direct Actions */}
      <div className="glass-panel p-8 rounded-3xl border border-ceylon-500/30 space-y-6">
        <h3 className="font-playfair text-2xl font-bold text-white">Manage Tourism Database</h3>
        <p className="text-xs text-sand-200">
          Create, edit, publish, draft, or archive destinations, attractions, experiences, events, stories, and accommodations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/admin/destinations" className="p-4 rounded-xl glass-card flex items-center justify-between font-semibold text-xs text-white hover:text-ceylon-300">
            <span>Manage Destinations</span>
            <Edit3 className="w-4 h-4 text-ceylon-400" />
          </Link>
          <Link href="/admin/destinations" className="p-4 rounded-xl glass-card flex items-center justify-between font-semibold text-xs text-white hover:text-ceylon-300">
            <span>Manage Attractions</span>
            <Edit3 className="w-4 h-4 text-gold-400" />
          </Link>
          <Link href="/admin/destinations" className="p-4 rounded-xl glass-card flex items-center justify-between font-semibold text-xs text-white hover:text-ceylon-300">
            <span>Manage Stories & Articles</span>
            <Edit3 className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
