import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { socialLinks as fallback } from "@/data";

export interface SocialLink {
  platform: string;
  url: string;
  ariaLabel: string;
}

export function useSocialLinks() {
  const [data, setData] = useState<SocialLink[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("social_links")
      .select("platform, url, aria_label")
      .order("sort_order", { ascending: true })
      .then(({ data: rows }) => {
        if (rows && rows.length > 0) {
          setData(rows.map((r) => ({ platform: r.platform, url: r.url, ariaLabel: r.aria_label })));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
