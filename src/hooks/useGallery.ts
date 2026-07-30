import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { gallery as fallback, GalleryImage } from "@/data";

export function useGallery() {
  const [data, setData] = useState<GalleryImage[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("gallery")
      .select("src, alt")
      .order("sort_order", { ascending: true })
      .then(({ data: rows }) => {
        if (rows && rows.length > 0) setData(rows as GalleryImage[]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
