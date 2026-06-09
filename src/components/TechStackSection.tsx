import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { techStack } from "../data";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const TechStackSection = () => {
  const { ref, initial, animate, transition } = useScrollAnimation();

  return (
    <section id="tech-stack" ref={ref}>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Tech Stack</h2>
          <Link
            to="/tech-stack"
            className="group text-sm text-muted-foreground hover:text-primary hover:bg-muted px-2 py-1 rounded-md transition-colors inline-flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="space-y-4">
          {techStack.map((group, groupIndex) => {
            // Duplicate skills for seamless loop
            const marqueeSkills = [...group.skills, ...group.skills];
            // Vary speed slightly per row for visual interest
            const duration = 20 + groupIndex * 3;

            return (
              <div key={group.category}>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  {group.category}
                </h3>
                <div className="overflow-hidden relative">
                  {/* Fade edges */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                  <div
                    className="flex gap-6 animate-marquee"
                    style={{ animationDuration: `${duration}s` }}
                  >
                    {marqueeSkills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="text-sm text-muted-foreground whitespace-nowrap"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default TechStackSection;
