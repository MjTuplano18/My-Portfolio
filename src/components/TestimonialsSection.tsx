import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTestimonials } from "../hooks/useTestimonials";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const AUTO_ROTATE_MS = 5000;

const TestimonialsSection = () => {
  const { ref, initial, animate, transition } = useScrollAnimation();
  const { data: testimonials } = useTestimonials();
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" ref={ref}>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
      >
        <h2 className="text-xl font-bold mb-6">Recommendations</h2>

        <div className="relative min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, rotateX: -90, transformOrigin: "bottom center" }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 90, transformOrigin: "top center" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-4"
            >
              <blockquote className="text-sm text-muted-foreground leading-relaxed">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                {currentTestimonial.image && (
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                  />
                )}
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentTestimonial.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        {testimonials.length > 1 && (
          <div className="flex items-center gap-1.5 pt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex
                    ? "bg-foreground"
                    : "bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`View recommendation ${index + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
