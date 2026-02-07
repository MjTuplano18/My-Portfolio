import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  {
    title: "Programming",
    skills: [
      { name: "C", level: "Intermediate" },
      { name: "C#", level: "Basic" },
      { name: "Python", level: "Intermediate" },
      { name: "JavaScript", level: "Basic" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "CSS", level: "Basic" },
      { name: "HTML", level: "Basic" },
      { name: "React", level: "Basic" },
      { name: "Tailwind CSS", level: "Basic" },
      { name: "Figma", level: "Basic" },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Django", level: "Basic" },
      { name: "MySQL", level: "Basic" },
      { name: "PostgreSQL", level: "Basic" },
      { name: "Firebase", level: "Basic" },
      { name: "Supabase", level: "Basic" },
      { name: "AWS RDS", level: "Basic" },
    ],
  },
  {
    title: "Cloud & Platforms",
    skills: [
      { name: "AWS Educate", level: "Basic" },
      { name: "Salesforce", level: "Basic" },
      { name: "Git", level: "Basic" },
      { name: "GitHub", level: "Basic" },
    ],
  },
  {
    title: "Design & Tools",
    skills: [
      { name: "Figma", level: "Basic" },
      { name: "Canva", level: "Basic" },
      { name: "Three.js", level: "Basic" },
      { name: "Sketchfab", level: "Basic" },
    ],
  },
  {
    title: "AI & Productivity",
    skills: [
      { name: "ChatGPT", level: "Expert" },
      { name: "Claude AI", level: "Expert" },
      { name: "DeepSeek", level: "Expert" },
      { name: "Gemini", level: "Expert" },
      { name: "Blackbox AI", level: "Expert" },
      { name: "Perplexity", level: "Expert" },
    ],
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Expert":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Intermediate":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Basic":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Skills</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Tools & <span className="text-gradient">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: "easeOut" }}
              className="rounded-xl bg-card border border-border p-6 hover:border-primary/40 transition-colors"
            >
              <h3 className="font-heading font-semibold mb-4 text-sm text-primary">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s.name}
                    className={`rounded-md px-3 py-1.5 text-xs transition-colors cursor-default border ${getLevelColor(s.level)}`}
                  >
                    <span className="font-medium">{s.name}</span>
                    <span className="ml-1.5 opacity-75">· {s.level}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;