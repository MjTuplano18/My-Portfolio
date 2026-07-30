import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { memberships as fallback, Membership } from "@/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

type Row = Membership & { sort_order?: number };

export default function MembershipsAdmin() {
  const [items, setItems] = useState<Row[]>(fallback);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("memberships").select("*").order("sort_order").then(({ data }) => {
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
    await supabase.from("memberships").delete().gte("sort_order", -1);
    const rows = items
      .filter((item) => item.name.trim() !== "")
      .map((item, i) => ({ ...item, sort_order: i }));
    const { error } = await supabase.from("memberships").insert(rows);
    setMsg(error ? `Error: ${error.message}` : "Saved!");
    setSaving(false);
  };

  return (
    <div className="space-y-4 max-w-xl">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-end">
          <div className="flex-1 space-y-1">
            <Label>Name</Label>
            <Input value={item.name} onChange={(e) => update(i, "name", e.target.value)} />
          </div>
          <div className="flex-1 space-y-1">
            <Label>URL</Label>
            <Input value={item.url} onChange={(e) => update(i, "url", e.target.value)} />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setItems(items.filter((_, idx) => idx !== i))}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => setItems([...items, { name: "", url: "" }])}>
        <Plus className="w-4 h-4 mr-1" /> Add Membership
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
