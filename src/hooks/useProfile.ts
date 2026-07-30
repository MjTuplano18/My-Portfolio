import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { profile as fallback, ProfileData } from "@/data";

export function useProfile() {
  const [data, setData] = useState<ProfileData>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("profile")
      .select("*")
      .single()
      .then(({ data: row }) => {
        if (row) setData(row as ProfileData);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
