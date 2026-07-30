import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { experience as fallback, ExperienceEntry } from "@/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, GripVertical } from "lucide-react";

type Entry = ExperienceEntry & { sort_order?: number };

const EMPTY: Entry = { id: "", role: "", organization: "", period: "", type: "work" };

export default function ExperienceAdmin() {
  const [items, setItems] = useState<Entry[]>(fallback);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("experience").select("*").order("sort_order").then(({ data }) => {
      if (data && data.length > 0) setItems(data as Entry[]);
    });
  }, []);

  const update = (i: number, key: keyof Entry, val: string) => {
    const copy = [...items];
    (copy[i] as Record<string, string>)[key as string] = val;
    setItems(copy);
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    await supabase.from("experience").delete().gte("sort_order", -1);
    const rows = items
      .filter((item) => item.role.trim() !== "")
      .map((item, i) => ({ ...item, id: item.id || crypto.randomUUID(), sort_order: i }));
    const { error } = await supabase.from("experience").insert(rows);
    setMsg(error ? `Error: ${error.message}` : "Saved!");
    setSaving(false);
  };

  return (
    <div className="space-y-4 max-w-2xl">
      {items.map((item, i) => (
        <div key={i} className="border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GripVertical className="w-4 h-4" />
              <span className="text-xs font-medium">Entry {i + 1}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setItems(items.filter((_, idx) => idx !== i))}>
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Role</Label>
              <Input value={item.role} onChange={(e) => update(i, "role", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Organization</Label>
              <Input value={item.organization} onChange={(e) => update(i, "organization", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Period (e.g. 2026)</Label>
              <Input value={item.period} onChange={(e) => update(i, "period", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Type</Label>
              <select
                value={item.type}
                onChange={(e) => update(i, "type", e.target.value)}
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="work">Work</option>
                <option value="education">Education</option>
                <option value="milestone">Milestone</option>
              </select>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => setItems([...items, { ...EMPTY, id: crypto.randomUUID() }])}>
        <Plus className="w-4 h-4 mr-1" /> Add Entry
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
