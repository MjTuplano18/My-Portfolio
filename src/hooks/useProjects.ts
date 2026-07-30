import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { projects as fallback, Project } from "@/data";

export function useProjects() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data: rows }) => {
        if (rows && rows.length > 0) setData(rows as Project[]);
        else setData(fallback);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
