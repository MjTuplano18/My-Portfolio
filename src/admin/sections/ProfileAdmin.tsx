import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { profile as fallback } from "@/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FileUpload from "../components/FileUpload";

interface ProfileForm {
  name: string;
  location: string;
  tagline: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  image: string;
  cover_image: string;
  cv_url: string;
  initials: string;
}

const defaultForm: ProfileForm = {
  ...fallback,
  cover_image: "/coverpage.jpg",
  cv_url: "/Mj Tuplano Resume(1).pdf",
};

export default function ProfileAdmin() {
  const [form, setForm] = useState<ProfileForm>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("profile").select("*").single().then(({ data }) => {
      if (data) setForm({ ...defaultForm, ...data });
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    const { data: existing } = await supabase.from("profile").select("id").single();
    let error;
    if (existing) {
      ({ error } = await supabase.from("profile").update({ ...form }).eq("id", existing.id));
    } else {
      ({ error } = await supabase.from("profile").insert({ ...form, id: 1 }));
    }
    setMsg(error ? `Error: ${error.message}` : "Saved!");
    setSaving(false);
  };

  const textFields: { label: string; name: keyof ProfileForm }[] = [
    { label: "Name", name: "name" },
    { label: "Location", name: "location" },
    { label: "Tagline", name: "tagline" },
    { label: "Email", name: "email" },
    { label: "Phone", name: "phone" },
    { label: "GitHub (no https://)", name: "github" },
    { label: "LinkedIn (no https://)", name: "linkedin" },
    { label: "Facebook (no https://)", name: "facebook" },
    { label: "Instagram (no https://)", name: "instagram" },
    { label: "Initials", name: "initials" },
  ];

  return (
    <div className="space-y-6 max-w-xl">
      {/* Text fields */}
      {textFields.map((f) => (
        <div key={f.name} className="space-y-1">
          <Label>{f.label}</Label>
          <Input name={f.name} value={form[f.name] ?? ""} onChange={handleChange} />
        </div>
      ))}

      {/* Profile Image */}
      <div className="space-y-2">
        <Label>Profile Photo</Label>
        <div className="flex items-center gap-3">
          {form.image && (
            <img src={form.image} alt="Profile" className="w-12 h-12 rounded-lg object-cover border border-border" />
          )}
          <div className="flex-1">
            <Input name="image" value={form.image ?? ""} onChange={handleChange} placeholder="URL or upload below" />
          </div>
        </div>
        <FileUpload bucket="avatars" label="Upload Profile Photo" onUploaded={(url) => setForm({ ...form, image: url })} />
      </div>

      {/* Cover Image */}
      <div className="space-y-2">
        <Label>Cover Photo</Label>
        <div className="flex items-center gap-3">
          {form.cover_image && (
            <img src={form.cover_image} alt="Cover" className="w-20 h-10 rounded object-cover border border-border" />
          )}
          <div className="flex-1">
            <Input name="cover_image" value={form.cover_image ?? ""} onChange={handleChange} placeholder="URL or upload below" />
          </div>
        </div>
        <FileUpload bucket="avatars" label="Upload Cover Photo" onUploaded={(url) => setForm({ ...form, cover_image: url })} />
      </div>

      {/* CV / Resume */}
      <div className="space-y-2">
        <Label>CV / Resume (PDF)</Label>
        <Input name="cv_url" value={form.cv_url ?? ""} onChange={handleChange} placeholder="URL or upload below" />
        <FileUpload
          bucket="cv"
          label="Upload CV (PDF)"
          accept=".pdf,application/pdf"
          onUploaded={(url) => setForm({ ...form, cv_url: url })}
        />
        {form.cv_url && (
          <a href={form.cv_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">
            Preview current CV →
          </a>
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
        {msg && <span className="text-sm text-muted-foreground">{msg}</span>}
      </div>
    </div>
  );
}
