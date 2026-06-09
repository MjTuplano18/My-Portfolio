import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { memberships } from "../data";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const MembershipsSection = () => {
  const { ref, initial, animate, transition } = useScrollAnimation();

  return (
    <section id="memberships" ref={ref}>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className="text-center md:text-left"
      >
        <h2 className="text-xl font-bold mb-4">A member of</h2>

        <div className="space-y-3">
          {memberships.map((membership) => (
            <a
              key={membership.name}
              href={membership.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center md:justify-between py-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span>{membership.name}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default MembershipsSection;
