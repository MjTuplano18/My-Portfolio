import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";

interface Props {
  bucket: string;
  onUploaded: (url: string) => void;
  accept?: string;
  label?: string;
}

export default function FileUpload({ bucket, onUploaded, accept = "image/*", label = "Upload" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const ext = file.name.split(".").pop();
    const filename = `${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filename, file, { upsert: true });

    if (uploadError) {
      setError("Upload failed.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
    onUploaded(data.publicUrl);
    setUploading(false);
    // reset input
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-1">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFile}
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="gap-2"
      >
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {uploading ? "Uploading..." : label}
      </Button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
