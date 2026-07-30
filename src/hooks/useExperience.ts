import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { experience as fallback, ExperienceEntry } from "@/data";

export function useExperience() {
  const [data, setData] = useState<ExperienceEntry[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("experience")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data: rows }) => {
        if (rows && rows.length > 0) setData(rows as ExperienceEntry[]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
