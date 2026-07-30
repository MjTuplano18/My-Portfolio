import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { certifications as fallback, Certification } from "@/data";

export function useCertifications() {
  const [data, setData] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("certifications")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data: rows }) => {
        // Use Supabase data if available, otherwise fall back to static data
        if (rows && rows.length > 0) {
          setData(rows as Certification[]);
        } else {
          setData(fallback);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
