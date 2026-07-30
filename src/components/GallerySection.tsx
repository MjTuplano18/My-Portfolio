import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { useGallery } from "../hooks/useGallery";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-muted rounded-lg gap-2">
        <ImageOff className="w-6 h-6 text-muted-foreground/50" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-full object-cover rounded-lg"
      onError={() => setFailed(true)}
    />
  );
}

const GallerySection = () => {
  const { ref, initial, animate, transition } = useScrollAnimation();
  const { data: gallery } = useGallery();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="gallery" className="py-12 md:py-16" ref={ref}>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
      >
        <h2 className="text-xl font-bold mb-6">Gallery</h2>

        <div className="relative group">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border border-border rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            aria-label="Scroll gallery left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {gallery.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 h-48 md:w-56 md:h-56 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <GalleryImage src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border border-border rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            aria-label="Scroll gallery right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default GallerySection;
