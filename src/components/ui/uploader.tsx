// components/UploaderDragger.tsx
import { useState, useRef } from "react";
import { cn } from "../../lib/utils";
import api from "../../utils/api";

interface UploaderProps {
  onUploaded: (path: string) => void;
}

export const Uploader: React.FC<UploaderDraggerProps> = ({ onUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { path } = res.data;
      setPreviewUrl(path);
      onUploaded(path);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer bg-zinc-200",
        isDragging ? "border-primary bg-primary/10" : "border-zinc-300 hover:border-primary"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={handleFileSelect}
      />

      {uploading ? (
        <div className="text-sm text-muted-foreground">Uploading...</div>
      ) : previewUrl ? (
        <img
          src={previewUrl}
          alt="Uploaded"
          className="mx-auto h-32 object-contain rounded-md"
        />
      ) : (
        <>
          <p className="text-sm text-zinc-500">Click or drag image to upload</p>
          <p className="text-xs text-zinc-400">Only PNG, JPG, or JPEG files supported</p>
        </>
      )}
    </div>
  );
};
