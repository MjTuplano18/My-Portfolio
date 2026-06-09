import { motion } from "framer-motion";
import { aboutParagraphs } from "../data";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const AboutSection = () => {
  const { ref, initial, animate, transition } = useScrollAnimation();

  return (
    <section id="about" className="py-6 md:py-8" ref={ref}>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
      >
        <h2 className="text-xl font-bold mb-6">About</h2>

        <div className="space-y-4 max-w-2xl">
          {aboutParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-muted-foreground leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
