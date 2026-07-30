import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { aboutParagraphs as fallback } from "@/data";

export function useAbout() {
  const [data, setData] = useState<string[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("about_paragraphs")
      .select("content")
      .order("sort_order", { ascending: true })
      .then(({ data: rows }) => {
        if (rows && rows.length > 0) setData(rows.map((r) => r.content));
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
