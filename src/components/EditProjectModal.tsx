import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import uploadImage from '@/lib/uploadImage';
import { updateProject, Project } from "@/lib/firestoreProjects";

interface Props {
  open: boolean;
  onClose: () => void;
  project: Project | null;
  onSave: (updated: Project) => void; // callback to parent
}

const EditProjectModal = ({ open, onClose, project, onSave }: Props) => {
  const [form, setForm] = useState<Project | null>(project);
  const [uploading, setUploading] = useState(false);

  // update local form state when modal opens with new project
  useState(() => setForm(project), );

  if (!form) return null; // safety

  const handleChange = (field: keyof Project, value: any) =>
    setForm({ ...form, [field]: value });

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      handleChange("image", url);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    await updateProject(form.id, {
      title: form.title,
      description: form.description,
      category: form.category,
      tags: form.tags,
      image: form.image,
      featured: form.featured,
    });
    onSave(form); // bubble up
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
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Project title"
          />
          <Textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Short description"
          />
          <Input
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            placeholder="Category (e.g. Website)"
          />
          <Input
            value={form.tags.join(", ")}
            onChange={(e) => handleChange("tags", e.target.value.split(",").map(t => t.trim()))}
            placeholder="Tags (comma‑separated)"
          />

          {/* Image upload */}
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

export default EditProjectModal;
