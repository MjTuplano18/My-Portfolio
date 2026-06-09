import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Award } from "lucide-react";
import { certifications } from "../data";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const ITEMS_PER_PAGE = 3;
const AUTO_ROTATE_MS = 4000;

function CertImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded">
        <Award size={20} className="text-muted-foreground/50" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain"
      onError={() => setFailed(true)}
    />
  );
}

const CertificationsSection = () => {
  const { ref, initial, animate, transition } = useScrollAnimation();

  // Calculate total pages
  const totalPages = Math.ceil(certifications.length / ITEMS_PER_PAGE);
  const [activePage, setActivePage] = useState(0);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePage((prev) => (prev + 1) % totalPages);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(interval);
  }, [totalPages]);

  // Get current page items
  const startIndex = activePage * ITEMS_PER_PAGE;
  const visibleCerts = certifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section id="certifications" ref={ref}>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Certifications</h2>
          <Link
            to="/certifications"
            className="group text-sm text-muted-foreground hover:text-primary hover:bg-muted px-2 py-1 rounded-md transition-colors inline-flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Certification list */}
        <div className="divide-y divide-border">
          {visibleCerts.map((cert) => (
            <a
              key={cert.id}
              href={cert.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 py-4 hover:bg-muted/50 hover:scale-[1.02] -mx-2 px-2 rounded-lg transition-all duration-300 group"
            >
              <div>
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {cert.issuer}
                </p>
              </div>
              <div className="w-24 h-14 flex-shrink-0 rounded border border-border overflow-hidden bg-white">
                <CertImage src={cert.image} alt={cert.title} />
              </div>
            </a>
          ))}
        </div>

        {/* Dot indicators */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActivePage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activePage
                    ? "bg-foreground"
                    : "bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`View certifications page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default CertificationsSection;
