import { motion } from "framer-motion";
import { MapPin, BadgeCheck, Mail, Github, Linkedin, Download } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ProfileHeader() {
  const { ref, initial, animate, transition } = useScrollAnimation();
  const { data: profile } = useProfile();

  return (
    <section ref={ref} aria-label="Profile header">
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
      >
        {/* Cover/Banner Image */}
        <div className="w-full h-40 md:h-52 rounded-xl overflow-hidden">
          <img
            src={profile.cover_image || "/coverpage.jpg"}
            alt="Cover banner"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Avatar + Details side by side, aligned at bottom */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4">
          {/* Avatar - smaller on mobile, square on larger */}
          <div className="w-28 h-28 sm:w-36 sm:h-40 md:w-44 md:h-52 border-4 border-background rounded-lg flex-shrink-0 overflow-hidden bg-muted -mt-16 sm:-mt-20 md:-mt-28">
            <img
              src={profile.image}
              alt={`Profile photo of ${profile.name}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details to the right */}
          <div className="pb-1 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                {profile.name}
              </h1>
              <BadgeCheck className="w-5 h-5 text-blue-500" aria-label="Verified" />
            </div>

            <p className="text-foreground flex items-center gap-1.5 text-xs sm:text-sm">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              {profile.location}
            </p>

            <p className="text-foreground text-xs sm:text-sm md:text-base">
              {profile.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button size="sm" className="rounded-md gap-2 text-xs sm:text-sm" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Send Email
                </a>
              </Button>
              <Button variant="outline" size="sm" className="rounded-md gap-2 text-xs sm:text-sm" asChild>
                <a
                  href={`https://${profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" className="rounded-md gap-2 text-xs sm:text-sm" asChild>
                <a
                  href={`https://${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" className="rounded-md gap-2 text-xs sm:text-sm" asChild>
                <a
                  href={profile.cv_url || "/Mj Tuplano Resume(1).pdf"}
                  download="Mj Tuplano Resume.pdf"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
