import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Reusable scroll animation hook that provides consistent fade-up
 * animations across all sections. Respects prefers-reduced-motion.
 *
 * Usage:
 *   const { ref, initial, animate, transition } = useScrollAnimation();
 *   <section ref={ref}>
 *     <motion.div initial={initial} animate={animate} transition={transition}>
 *       ...
 *     </motion.div>
 *   </section>
 */
export function useScrollAnimation(options?: { delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const delay = options?.delay ?? 0;

  // When reduced motion is preferred, show content immediately
  if (prefersReducedMotion) {
    return {
      ref,
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    };
  }

  return {
    ref,
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, ease: "easeOut", delay },
  };
}
