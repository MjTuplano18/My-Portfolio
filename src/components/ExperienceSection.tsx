import { motion } from "framer-motion";
import { experience } from "../data";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const ExperienceSection = () => {
  const { ref, initial, animate, transition } = useScrollAnimation();

  return (
    <section id="experience" ref={ref}>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
      >
        <h2 className="text-xl font-bold mb-6">Experience</h2>

        <div className="space-y-1">
          {experience.map((entry, index) => (
            <div
              key={entry.id}
              className={`group flex items-start gap-3 rounded-lg px-2 py-3 transition-colors duration-200 ${
                index === 0
                  ? "bg-muted/50"
                  : "hover:bg-muted/40"
              }`}
            >
              {/* Timeline indicator */}
              <div className="mt-1.5 flex-shrink-0 flex items-center justify-center w-3 h-3">
                {index === 0 ? (
                  /* Large filled dot for current/most recent role */
                  <div className="w-3 h-3 bg-foreground rounded-full" />
                ) : (
                  /* Small dot that scales up on hover */
                  <div className="w-2 h-2 rounded-full border-2 border-muted-foreground/40 group-hover:border-foreground group-hover:bg-foreground group-hover:scale-125 transition-all duration-200" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    {entry.role}{entry.type === "milestone" ? " 👋" : ""}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {entry.organization}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {entry.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
