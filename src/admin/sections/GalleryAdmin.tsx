import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { gallery as fallback, GalleryImage } from "@/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

type Row = GalleryImage & { sort_order?: number };

export default function GalleryAdmin() {
  const [items, setItems] = useState<Row[]>(fallback);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("gallery").select("*").order("sort_order").then(({ data }) => {
      if (data && data.length > 0) setItems(data as Row[]);
    });
  }, []);

  const update = (i: number, key: keyof Row, val: string) => {
    const copy = [...items];
    (copy[i] as Record<string, string>)[key as string] = val;
    setItems(copy);
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    await supabase.from("gallery").delete().neq("src", "");
    const rows = items.map((item, i) => ({ ...item, sort_order: i }));
    const { error } = await supabase.from("gallery").insert(rows);
    setMsg(error ? "Error saving." : "Saved!");
    setSaving(false);
  };

  return (
    <div className="space-y-4 max-w-xl">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-end">
          <div className="flex-1 space-y-1">
            <Label>Image URL (e.g. /gallery/pic1.jpg)</Label>
            <Input value={item.src} onChange={(e) => update(i, "src", e.target.value)} />
          </div>
          <div className="flex-1 space-y-1">
            <Label>Alt Text</Label>
            <Input value={item.alt} onChange={(e) => update(i, "alt", e.target.value)} />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setItems(items.filter((_, idx) => idx !== i))}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => setItems([...items, { src: "", alt: "" }])}>
        <Plus className="w-4 h-4 mr-1" /> Add Image
      </Button>
      <div className="flex items-center gap-3 pt-2">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
        {msg && <span className="text-sm text-muted-foreground">{msg}</span>}
      </div>
    </div>
  );
}
