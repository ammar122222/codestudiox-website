import SiteHeader from '@/components/layout/SiteHeader';

// src/pages/UploadTest.tsx
import { useState } from "react";
import uploadImage from "@/lib/uploadImage";

const UploadTest = () => {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const link = await uploadImage(file);
      setUrl(link);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-10 text-white bg-slate-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Image Upload Test</h1>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {uploading && <p className="mt-4 text-yellow-500">Uploading…</p>}
      {url && (
        <div className="mt-6">
          <p>✅ Image URL:</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            {url}
          </a>
          <img src={url} alt="Uploaded" className="mt-4 max-w-sm rounded" />
        </div>
      )}
    </div>
  );
};

export default UploadTest;
