import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { aboutParagraphs as fallback } from "@/data";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";

export default function AboutAdmin() {
  const [paragraphs, setParagraphs] = useState<string[]>(fallback);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("about_paragraphs").select("content").order("sort_order").then(({ data }) => {
      if (data && data.length > 0) setParagraphs(data.map((r) => r.content));
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    await supabase.from("about_paragraphs").delete().neq("id", 0);
    const rows = paragraphs.map((content, i) => ({ content, sort_order: i }));
    const { error } = await supabase.from("about_paragraphs").insert(rows);
    setMsg(error ? "Error saving." : "Saved!");
    setSaving(false);
  };

  return (
    <div className="space-y-4 max-w-2xl">
      {paragraphs.map((p, i) => (
        <div key={i} className="flex gap-2">
          <Textarea
            value={p}
            rows={3}
            onChange={(e) => {
              const copy = [...paragraphs];
              copy[i] = e.target.value;
              setParagraphs(copy);
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setParagraphs(paragraphs.filter((_, idx) => idx !== i))}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => setParagraphs([...paragraphs, ""])}>
        <Plus className="w-4 h-4 mr-1" /> Add Paragraph
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
