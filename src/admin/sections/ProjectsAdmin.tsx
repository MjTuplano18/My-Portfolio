import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { projects as fallback, Project } from "@/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, GripVertical } from "lucide-react";

type Row = Project & { sort_order?: number };

export default function ProjectsAdmin() {
  const [items, setItems] = useState<Row[]>(fallback);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("projects").select("*").order("sort_order").then(({ data }) => {
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
    await supabase.from("projects").delete().neq("id", "");
    const rows = items.map((item, i) => ({ ...item, id: item.id || crypto.randomUUID(), sort_order: i }));
    const { error } = await supabase.from("projects").insert(rows);
    setMsg(error ? "Error saving." : "Saved!");
    setSaving(false);
  };

  return (
    <div className="space-y-4 max-w-2xl">
      {items.map((item, i) => (
        <div key={i} className="border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GripVertical className="w-4 h-4" />
              <span className="text-xs font-medium">Project {i + 1}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setItems(items.filter((_, idx) => idx !== i))}>
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input value={item.title} onChange={(e) => update(i, "title", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <Input value={item.description} onChange={(e) => update(i, "description", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>URL</Label>
                <Input value={item.url ?? ""} onChange={(e) => update(i, "url", e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Domain Label</Label>
                <Input value={item.domain ?? ""} onChange={(e) => update(i, "domain", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => setItems([...items, { id: crypto.randomUUID(), title: "", description: "" }])}>
        <Plus className="w-4 h-4 mr-1" /> Add Project
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
