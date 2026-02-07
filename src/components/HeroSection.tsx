import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const stats = [
  { value: "1.47", label: "GPA" },
  { value: "2", label: "Projects" },
  { value: "5", label: "Certifications" },
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center section-padding pt-28 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-muted-foreground text-lg mb-2">Hi, I am</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-2">
            MJ Tuplano
          </h1>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gradient-animated mb-6">
            Aspiring Cloud Engineer &amp; AI Prompt Engineer
          </h2>
          <p className="text-muted-foreground max-w-lg mb-8 leading-relaxed text-base md:text-lg text-justify">
            BS Information Technology student at PUP Santa Maria with hands-on experience in backend development, cloud platforms, and AI-assisted workflows. Building the future, one project at a time.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4 mb-8">
            <a
              href="https://github.com/MjTuplano18"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/mj-tuplano-295a6b297"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:mjtuplano18@gmail.com"
              className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* CTA */}
          <div className="flex gap-4 flex-wrap">
            <a
              href="#contact"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Hire Me
            </a>
            <a
              href="#projects"
              className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              View Projects
            </a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex gap-8 mt-12 border-t border-border pt-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <span className="text-2xl font-bold text-gradient">{s.value}</span>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-float" />
            <div className="absolute inset-4 rounded-full overflow-hidden glow-border">
              <img
                src={profileImg}
                alt="MJ Tuplano"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
