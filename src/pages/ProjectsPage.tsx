import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { projects } from "../data";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const ProjectsPage = () => {
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
            <h1 className="text-2xl font-bold mb-8">All Projects</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id}>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group rounded-lg p-3 -m-3 transition-all duration-300 hover:bg-muted hover:scale-[1.02] hover:shadow-sm"
                    >
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
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
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default ProjectsPage;
