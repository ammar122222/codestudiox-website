const uploadImage = async (file: File): Promise<string> => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY!;
  const formData = new FormData();
  formData.append("key", apiKey);
  formData.append("image", file);

  const res = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

  const json = await res.json();
  return json.data.url;
};

export default uploadImage;
