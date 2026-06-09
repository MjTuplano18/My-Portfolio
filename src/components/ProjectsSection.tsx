import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { projects } from "../data";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const ProjectsSection = () => {
  const { ref, initial, animate, transition } = useScrollAnimation();

  return (
    <section id="projects" className="py-12 md:py-16" ref={ref}>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Projects</h2>
          <Link
            to="/projects"
            className="group text-sm text-muted-foreground hover:text-primary hover:bg-muted px-2 py-1 rounded-md transition-colors inline-flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project.id}>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group rounded-lg p-3 -m-3 transition-all duration-300 hover:bg-muted hover:scale-[1.03] hover:shadow-sm"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {project.description}
                  </p>
                  {project.domain && (
                    <span className="inline-block mt-2 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {project.domain}
                    </span>
                  )}
                </a>
              ) : (
                <div>
                  <h3 className="font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {project.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
