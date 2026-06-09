import { motion } from "framer-motion";
import { Mail, Phone, ChevronRight } from "lucide-react";
import { profile } from "../data";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const ContactSection = () => {
  const { ref, initial, animate, transition } = useScrollAnimation();

  return (
    <section id="contact" ref={ref}>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className="text-center md:text-left"
      >
        <h2 className="text-xl font-bold mb-4">Open to Work</h2>

        <p className="text-sm text-muted-foreground mb-4">
          I'm a junior developer open to internship and entry-level opportunities. Feel free to reach out if you'd like to connect or collaborate.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-1 text-sm text-foreground hover:underline"
        >
          Get in touch <ChevronRight className="w-4 h-4" />
        </a>

        <div className="mt-6 space-y-3 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <a
                href={`mailto:${profile.email}`}
                className="text-sm text-foreground hover:underline"
              >
                {profile.email}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Let's Talk</p>
              <a
                href={`tel:${profile.phone}`}
                className="text-sm text-foreground hover:underline"
              >
                {profile.phone}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
