import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/* 1 ‑‑‑ logo header */
import SiteHeader from '@/components/layout/SiteHeader'; // ← change to '../../components/layout/SiteHeader' if you don’t use "@/"

/* 2 ‑‑‑ Firestore helpers */
import {
  getAllSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
  Submission,
} from '@/lib/firestoreSubmissions';

/* 3 ‑‑‑ icons */
import {
  Mail,
  Search,
  Calendar,
  DollarSign,
  User,
  MessageSquare,
  Archive,
  Trash2,
} from 'lucide-react';

/* 4 ‑‑‑ UI primitives */
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/* ───────────────────────────────────────────────────────────── */

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  /* fetch once */
  useEffect(() => {
    (async () => {
      try {
        setSubmissions(await getAllSubmissions());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* update helpers */
  const handleStatus = async (id: string, status: Submission['status']) => {
    await updateSubmissionStatus(id, status);
    setSubmissions(p => p.map(s => (s.id === id ? { ...s, status } : s)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this submission permanently?')) return;
    await deleteSubmission(id);
    setSubmissions(p => p.filter(s => s.id !== id));
  };

  /* filtered rows */
  const filtered = submissions.filter(s =>
    [s.name, s.email, s.project ?? '']
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  /* tiny status helpers */
  const badge = (st: string) =>
    ({
      new: 'bg-green-500',
      replied: 'bg-blue-500',
      in_progress: 'bg-orange-500',
      archived: 'bg-gray-600',
    }[st] ?? 'bg-gray-500');

  const label = (st: string) =>
    ({
      new: 'New',
      replied: 'Contacted',
      in_progress: 'In Progress',
      archived: 'Archived',
    }[st] ?? 'Unknown');

  /* ───────────────────────── JSX ───────────────────────── */
  return (
    <div className="min-h-screen bg-dark-slate text-white">
      {/* logo bar with Back + Logout */}
      <SiteHeader title="Client Submissions" backLink="/admin/dashboard" />

      <main className="p-6">
        {/* search */}
        <Card className="bg-slate-800/50 border-electric-blue/20 mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or project type…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* loading state */}
        {loading && <p className="text-center text-gray-400">Loading submissions…</p>}

        {/* list */}
        {!loading && (
          <>
            <div className="space-y-4">
              {filtered.map(s => (
                <Card key={s.id} className="bg-slate-800/50 border-electric-blue/20">
                  <CardContent className="p-6">
                    {/* name + status */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-electric-blue/20 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-electric-blue" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{s.name}</h3>
                          <p className="text-gray-400">{s.email}</p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${badge(
                          s.status,
                        )}`}
                      >
                        {label(s.status)}
                      </span>
                    </div>

                    {/* meta row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-gray-300">Budget: {s.budget ?? '—'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-300">Type: {s.project ?? '—'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-300">
                          {s.createdAt
                            ? new Date(s.createdAt.seconds * 1000).toLocaleString()
                            : '—'}
                        </span>
                      </div>
                    </div>

                    {/* message */}
                    <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-medium text-white mb-2">Message:</h4>
                      <p className="text-gray-300 text-sm">{s.message}</p>
                    </div>

                    {/* actions */}
                    <div className="flex gap-3">
                      <Button size="sm" variant="outline" onClick={() => handleStatus(s.id, 'replied')}>
                        Mark as Contacted
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleStatus(s.id, 'archived')}>
                        <Archive className="w-4 h-4 mr-1" />
                        Archive
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(s.id)}>
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <Card className="bg-slate-800/50 border-electric-blue/20">
                <CardContent className="p-8 text-center">
                  <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No submissions found.</p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
}
