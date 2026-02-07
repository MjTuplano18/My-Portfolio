import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Award } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    text: "BS Information Technology at PUP Santa Maria, Bulacan. Expected graduation October 2026.",
  },
  {
    icon: Briefcase,
    title: "Experience",
    text: "Former Data Analyst at 7PrimeTech Inc. and Data Specialist at IPP Technologies Inc.",
  },
  {
    icon: Award,
    title: "Honors",
    text: "President''s Lister (1st & 2nd Year) and Dean''s Lister (3rd Year). Cumulative GPA: 1.47.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">About Me</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            A Little Bit <span className="text-gradient">About Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
              I''m MJ Tuplano, a dedicated IT student with a strong academic background as a President''s and Dean''s Lister, driven by a passion for building reliable and scalable backend systems. I enjoy working behind the scenes—designing APIs, managing databases, and integrating real-world services that power modern web applications.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
              My experience spans from BPO data analysis to backend-focused web development, where I''ve worked with customer databases, payment system integrations, and cloud-based tools. I''m especially passionate about AI technologies and large language models (LLMs), and I''m eager to learn how AI can enhance software systems, automate processes, and improve user experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed text-justify">
              Outside of tech, I enjoy playing basketball, Mobile Legends, and watching movies, which help me stay balanced and energized. I''m currently seeking an OJT opportunity where I can further sharpen my backend development skills while continuously learning and growing in AI-driven technologies.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="flex gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <h.icon size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">{h.title}</h3>
                  <p className="text-sm text-muted-foreground">{h.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;