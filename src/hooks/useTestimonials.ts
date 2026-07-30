import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { testimonials as fallback, Testimonial } from "@/data";

export function useTestimonials() {
  const [data, setData] = useState<Testimonial[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data: rows }) => {
        if (rows && rows.length > 0) setData(rows as Testimonial[]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
