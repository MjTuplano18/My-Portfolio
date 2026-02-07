import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "NovaTech E-Commerce Platform",
    subtitle: "Capstone Project",
    description:
      "An intelligent e-commerce platform featuring AI-powered shopping assistant for personalized product recommendations and 3D product visualization. Built with modern tech stack including real-time inventory management, secure payment processing, and immersive 3D product previews using Three.js.",
    tags: ["React", "Vite", "Supabase", "Three.js", "AI Assistant", "3D Modeling"],
    github: "https://github.com/MjTuplano18/Novatech",
    demo: "https://egie-ecommerce-git-main-mj-tuplanos-projects.vercel.app/",
    images: [
      "/novatech-1.png",
      "/novatech-2.png",
      "/novatech-3.png",
    ],
  },
  {
    title: "Salesforce Capstone Project",
    subtitle: "CRM & Automation",
    description:
      "A Salesforce-based solution for managing sales and operations for a fashion business. Applied Salesforce platform skills including customer management, workflow automation, and reporting dashboards.",
    tags: ["Salesforce", "Apex", "LWC", "Automation"],
    demo: "https://www.salesforce.com/trailblazer/pukncuzneo3haqyveo",
    images: [
      "/salesforce-1.png",
      "/salesforce-2.png",
      "/salesforce-3.png",
    ],
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});

  // Auto-slide carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      projects.forEach((project, index) => {
        if (project.images && project.images.length > 1) {
          setCurrentImageIndex((prev) => ({
            ...prev,
            [index]: ((prev[index] || 0) + 1) % project.images.length,
          }));
        }
      });
    }, 5000); // Changed to 5 seconds for slower transitions

    return () => clearInterval(interval);
  }, []);

  const nextImage = (projectIndex: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (projectIndex: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  return (
    <section id="projects" className="section-padding bg-card/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Portfolio</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Recent <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="group rounded-2xl bg-card border border-border p-6 md:p-8 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_hsl(25_95%_53%/0.1)]"
            >
              <span className="text-xs text-primary font-semibold tracking-wider uppercase">
                {p.subtitle}
              </span>
              <h3 className="font-heading text-xl font-bold mt-2 mb-3 group-hover:text-gradient transition-colors">
                {p.title}
              </h3>
              
              {/* Image Carousel */}
              {p.images && p.images.length > 0 && (
                <div className="relative mb-6 rounded-lg overflow-hidden bg-secondary/20 aspect-video">
                  <img
                    src={p.images[currentImageIndex[i] || 0]}
                    alt={`${p.title} screenshot ${(currentImageIndex[i] || 0) + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                  />
                  {p.images.length > 1 && (
                    <>
                      <button
                        onClick={() => prevImage(i, p.images.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => nextImage(i, p.images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {p.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex((prev) => ({ ...prev, [i]: idx }))}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              (currentImageIndex[i] || 0) === idx ? "bg-primary scale-125" : "bg-background/50"
                            }`}
                            aria-label={`Go to image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github size={16} /> GitHub
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink size={16} /> {p.title.includes("Salesforce") ? "Salesforce Link" : "Live Demo"}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
