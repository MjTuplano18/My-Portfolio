import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { profile as fallback, ProfileData } from "@/data";

export interface FullProfileData extends ProfileData {
  cover_image?: string;
  cv_url?: string;
}

const fallbackFull: FullProfileData = {
  ...fallback,
  cover_image: "/coverpage.jpg",
  cv_url: "/Mj Tuplano Resume(1).pdf",
};

export function useProfile() {
  const [data, setData] = useState<FullProfileData>(fallbackFull);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("profile")
      .select("*")
      .single()
      .then(({ data: row }) => {
        if (row) setData({ ...fallbackFull, ...row });
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
