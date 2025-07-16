const uploadImage = async (file: File): Promise<string> => {
const apiKey = import.meta.env.VITE_IMGBB_API_KEY!;

  
  // Convert file to Base64 string
  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).replace(/^data:image\/\w+;base64,/, "");
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });

  const base64Image = await toBase64(file);

  const formData = new FormData();
  formData.append("key", apiKey);
  formData.append("image", base64Image);

  const res = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

  const json = await res.json();
  return json.data.url; // ✅ or json.data.image.url
};

export default uploadImage;
