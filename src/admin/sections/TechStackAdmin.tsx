import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { techStack as fallback } from "@/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

interface Row { category: string; skill: string; sort_order: number; }

export default function TechStackAdmin() {
  const [rows, setRows] = useState<Row[]>(() =>
    fallback.flatMap((g, gi) => g.skills.map((s, si) => ({ category: g.category, skill: s, sort_order: gi * 100 + si })))
  );
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("tech_stack").select("category, skill, sort_order").order("sort_order").then(({ data }) => {
      if (data && data.length > 0) setRows(data as Row[]);
    });
  }, []);

  // Group by category for display
  const categories = Array.from(new Set(rows.map((r) => r.category)));

  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    await supabase.from("tech_stack").delete().neq("skill", "");
    const { error } = await supabase.from("tech_stack").insert(rows.map((r, i) => ({ ...r, sort_order: i })));
    setMsg(error ? "Error saving." : "Saved!");
    setSaving(false);
  };

  const addSkill = (category: string) => {
    setRows([...rows, { category, skill: "", sort_order: rows.length }]);
  };

  const addCategory = () => {
    const name = prompt("Category name?");
    if (name) setRows([...rows, { category: name, skill: "", sort_order: rows.length }]);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {categories.map((cat) => (
        <div key={cat} className="border border-border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-sm">{cat}</h3>
          {rows.filter((r) => r.category === cat).map((row, ri) => {
            const globalIdx = rows.findIndex((r) => r === row);
            return (
              <div key={ri} className="flex gap-2">
                <Input
                  value={row.skill}
                  onChange={(e) => {
                    const copy = [...rows];
                    copy[globalIdx] = { ...copy[globalIdx], skill: e.target.value };
                    setRows(copy);
                  }}
                  placeholder="Skill name"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setRows(rows.filter((_, idx) => idx !== globalIdx))}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            );
          })}
          <Button variant="outline" size="sm" onClick={() => addSkill(cat)}>
            <Plus className="w-4 h-4 mr-1" /> Add Skill
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addCategory}>
        <Plus className="w-4 h-4 mr-1" /> Add Category
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
