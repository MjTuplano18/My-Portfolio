import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { profile as fallback } from "@/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ProfileAdmin() {
  const [form, setForm] = useState(fallback);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("profile").select("*").single().then(({ data }) => {
      if (data) setForm(data);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    const { error } = await supabase.from("profile").upsert({ ...form, id: 1 });
    setMsg(error ? "Error saving." : "Saved!");
    setSaving(false);
  };

  const fields: { label: string; name: keyof typeof fallback }[] = [
    { label: "Name", name: "name" },
    { label: "Location", name: "location" },
    { label: "Tagline", name: "tagline" },
    { label: "Email", name: "email" },
    { label: "Phone", name: "phone" },
    { label: "GitHub (no https://)", name: "github" },
    { label: "LinkedIn (no https://)", name: "linkedin" },
    { label: "Facebook (no https://)", name: "facebook" },
    { label: "Instagram (no https://)", name: "instagram" },
    { label: "Profile Image URL", name: "image" },
    { label: "Initials", name: "initials" },
  ];

  return (
    <div className="space-y-4 max-w-xl">
      {fields.map((f) => (
        <div key={f.name} className="space-y-1">
          <Label>{f.label}</Label>
          <Input name={f.name} value={form[f.name] ?? ""} onChange={handleChange} />
        </div>
      ))}
      <div className="flex items-center gap-3 pt-2">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
        {msg && <span className="text-sm text-muted-foreground">{msg}</span>}
      </div>
    </div>
  );
}
