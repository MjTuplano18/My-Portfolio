import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { socialLinks as fallback } from "@/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

interface Row { platform: string; url: string; aria_label: string; sort_order?: number; }

export default function SocialAdmin() {
  const [items, setItems] = useState<Row[]>(
    fallback.map((s) => ({ platform: s.platform, url: s.url, aria_label: s.ariaLabel }))
  );
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("social_links").select("*").order("sort_order").then(({ data }) => {
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
    await supabase.from("social_links").delete().neq("platform", "");
    const rows = items.map((item, i) => ({ ...item, sort_order: i }));
    const { error } = await supabase.from("social_links").insert(rows);
    setMsg(error ? "Error saving." : "Saved!");
    setSaving(false);
  };

  return (
    <div className="space-y-4 max-w-xl">
      {items.map((item, i) => (
        <div key={i} className="border border-border rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Platform</Label>
              <Input value={item.platform} onChange={(e) => update(i, "platform", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>URL</Label>
              <Input value={item.url} onChange={(e) => update(i, "url", e.target.value)} />
            </div>
            <div className="space-y-1 col-span-2">
              <Label>Aria Label</Label>
              <Input value={item.aria_label} onChange={(e) => update(i, "aria_label", e.target.value)} />
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setItems(items.filter((_, idx) => idx !== i))}>
            <Trash2 className="w-4 h-4 text-red-500 mr-1" /> Remove
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => setItems([...items, { platform: "", url: "", aria_label: "" }])}>
        <Plus className="w-4 h-4 mr-1" /> Add Social Link
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
