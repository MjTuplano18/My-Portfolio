import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { techStack } from "../data";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const TechStackPage = () => {
  const { ref, initial, animate, transition } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <section ref={ref}>
          <motion.div initial={initial} animate={animate} transition={transition}>
            <h1 className="text-2xl font-bold mb-8">Tech Stack</h1>

            <div className="space-y-8">
              {techStack.map((group) => (
                <div key={group.category}>
                  <h2 className="text-sm font-semibold text-foreground mb-3">
                    {group.category}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-sm text-muted-foreground px-3 py-1 bg-muted rounded-md transition-all duration-200 hover:bg-foreground hover:text-background hover:scale-105 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default TechStackPage;
