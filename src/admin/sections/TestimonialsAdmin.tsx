import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { testimonials as fallback, Testimonial } from "@/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, GripVertical } from "lucide-react";

type Row = Testimonial & { sort_order?: number };

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<Row[]>(fallback);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("testimonials").select("*").order("sort_order").then(({ data }) => {
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
    await supabase.from("testimonials").delete().neq("id", "");
    const rows = items.map((item, i) => ({ ...item, id: item.id || crypto.randomUUID(), sort_order: i }));
    const { error } = await supabase.from("testimonials").insert(rows);
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
              <span className="text-xs font-medium">Recommendation {i + 1}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setItems(items.filter((_, idx) => idx !== i))}>
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Quote</Label>
              <Textarea rows={3} value={item.quote} onChange={(e) => update(i, "quote", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input value={item.name} onChange={(e) => update(i, "name", e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => update(i, "title", e.target.value)} />
              </div>
              <div className="space-y-1 col-span-2">
                <Label>Photo URL (e.g. /recommendation/Mr.Vince.png)</Label>
                <Input value={item.image ?? ""} onChange={(e) => update(i, "image", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => setItems([...items, { id: crypto.randomUUID(), quote: "", name: "", title: "" }])}>
        <Plus className="w-4 h-4 mr-1" /> Add Recommendation
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
