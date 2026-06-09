import { motion } from "framer-motion";
import { Github, Linkedin, Instagram } from "lucide-react";
import { socialLinks } from "../data";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram: Instagram,
};

const SocialFooter = () => {
  const { ref, initial, animate, transition } = useScrollAnimation();

  return (
    <div ref={ref}>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className="text-center md:text-left"
      >
        <section id="social">
          <h2 className="text-xl font-bold mb-4">Social Links</h2>

          <div className="space-y-3 flex flex-col items-center md:items-start">
            {socialLinks
              .filter((link) => iconMap[link.platform])
              .map((link) => {
                const Icon = iconMap[link.platform];
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    <span>{link.platform}</span>
                  </a>
                );
              })}
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default SocialFooter;
