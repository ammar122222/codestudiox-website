import SiteHeader from '@/components/layout/SiteHeader';
// …
(
  <div className="min-h-screen bg-dark-slate text-white">
    <SiteHeader title="Manage Projects" backLink="/admin/dashboard" />
    {/* rest of projects page … */}
  </div>
);


import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getAllProjects,
  addProject,
  deleteProject,
  updateProject,
  Project,
} from "@/lib/firestoreProjects";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Search,
} from "lucide-react";
import uploadImage from "@/lib/uploadImage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

/* ------------------------------------------------------------------ */
/*  Inline EditProjectModal component                                  */
/* ------------------------------------------------------------------ */
interface EditModalProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
  onSave: (p: Project) => void;
}

const EditProjectModal = ({ open, onClose, project, onSave }: EditModalProps) => {
  const [form, setForm] = useState<Project | null>(project);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setForm(project);
  }, [project]);

  if (!form) return null;

  const change = (k: keyof Project, v: any) => setForm({ ...form, [k]: v });

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      change("image", url);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form) return;
    await updateProject(form.id, {
      title: form.title,
      description: form.description,
      category: form.category,
      tags: form.tags,
      image: form.image,
      featured: form.featured,
      link: form.link,
    });
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={form.title}
            onChange={(e) => change("title", e.target.value)}
            placeholder="Title"
          />
          <Textarea
            value={form.description}
            onChange={(e) => change("description", e.target.value)}
            placeholder="Description"
          />
          <Input
            value={form.category}
            onChange={(e) => change("category", e.target.value)}
            placeholder="Category"
          />
          <Input
            value={form.tags.join(", ")}
            onChange={(e) =>
              change(
                "tags",
                e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
              )
            }
            placeholder="Tags (comma separated)"
          />
          <Input
            type="url"
            value={form.link || ""}
            onChange={(e) => change("link", e.target.value)}
            placeholder="Project Link (https://...)"
          />
          <div className="flex items-center gap-4">
            <img src={form.image} alt="preview" className="w-24 h-16 object-cover rounded" />
            <Input type="file" accept="image/*" onChange={handleFile} />
          </div>
          {uploading && <p className="text-xs text-yellow-400">Uploading…</p>}
          <div className="flex justify-end gap-2 pt-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* ------------------------------------------------------------------ */
/*  Main AdminProjects component                                      */
/* ------------------------------------------------------------------ */

const AdminProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getAllProjects();
      setProjects(data);
    })();
  }, []);

  const handleAdd = async () => {
    const newProject: Omit<Project, "id"> = {
      title: "New Project",
      description: "Add details here…",
      image: "https://source.unsplash.com/random/600x400",
      tags: ["Tag1"],
      category: "General",
      featured: false,
      link: "",
      created_at: new Date().toISOString().split("T")[0],
    } as any;
    const added = await addProject(newProject);
    setProjects((prev) => [...prev, added]);
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setModalOpen(true);
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark-slate text-white">
      <header className="bg-slate-800/50 border-b border-electric-blue/20 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Manage Projects</h1>
              <p className="text-gray-400">Add, edit, and manage portfolio projects</p>
            </div>
          </div>
          <Button className="bg-electric-blue hover:bg-electric-blue/80" onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" /> Add New Project
          </Button>
        </div>
      </header>

      <div className="p-6">
        <Card className="bg-slate-800/50 border-electric-blue/20 mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects by title or category…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Card key={p.id} className="bg-slate-800/50 border-electric-blue/20 overflow-hidden">
              <div className="relative">
                <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
                {p.featured && (
                  <div className="absolute top-2 left-2 bg-electric-blue px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <span className="text-xs text-electric-blue bg-electric-blue/10 px-2 py-1 rounded">
                    {p.category}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(p.tags ?? []).map((t, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-700 text-gray-300 text-xs rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    onClick={() => openEdit(p)}
                  >
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    onClick={() => handleDelete(p.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                    onClick={() => window.open(p.link || p.image, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" /> Visit
                  </Button>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-600 text-xs text-gray-500">
                  Created: {p.created_at}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <EditProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        project={editing}
        onSave={(u) => setProjects((prev) => prev.map((p) => (p.id === u.id ? u : p)))}
      />
    </div>
  );
};

export default AdminProjects;
