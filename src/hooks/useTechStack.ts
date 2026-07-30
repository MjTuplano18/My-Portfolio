import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { techStack as fallback, TechCategory } from "@/data";

export function useTechStack() {
  const [data, setData] = useState<TechCategory[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("tech_stack")
      .select("category, skill, sort_order")
      .order("sort_order", { ascending: true })
      .then(({ data: rows }) => {
        if (rows && rows.length > 0) {
          // Group by category preserving order
          const grouped: Record<string, string[]> = {};
          const categoryOrder: string[] = [];
          rows.forEach((row) => {
            if (!grouped[row.category]) {
              grouped[row.category] = [];
              categoryOrder.push(row.category);
            }
            grouped[row.category].push(row.skill);
          });
          setData(categoryOrder.map((cat) => ({ category: cat, skills: grouped[cat] })));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
