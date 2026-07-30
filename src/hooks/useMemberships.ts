import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { memberships as fallback, Membership } from "@/data";

export function useMemberships() {
  const [data, setData] = useState<Membership[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("memberships")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data: rows }) => {
        if (rows && rows.length > 0) setData(rows as Membership[]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
