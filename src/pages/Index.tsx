import ProfileHeader from "@/components/ProfileHeader";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MembershipsSection from "@/components/MembershipsSection";
import ContactSection from "@/components/ContactSection";
import SocialFooter from "@/components/SocialFooter";
import GallerySection from "@/components/GallerySection";
import DraggableIdCard from "@/components/DraggableIdCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-20">
        {/* Profile Header + hanging ID card */}
        <header className="relative">
          <ProfileHeader />
          {/* ID lace anchors at the bottom edge of the cover, hangs down */}
          <div className="absolute right-4 lg:right-2 top-36 md:top-48 z-30 hidden lg:block pointer-events-none">
            <div className="pointer-events-auto">
              <DraggableIdCard />
            </div>
          </div>
        </header>

        {/* About Section - full width */}
        <AboutSection />

        {/* Tech Stack + Experience side by side */}
        <section className="py-8 md:py-16 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <TechStackSection />
            <ExperienceSection />
          </div>
        </section>

        {/* Recent Projects - full width */}
        <div className="border-t border-border">
          <ProjectsSection />
        </div>

        {/* Certifications + Recommendations side by side */}
        <section className="py-8 md:py-16 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <CertificationsSection />
            <TestimonialsSection />
          </div>
        </section>

        {/* Memberships + Social Links + Open to Work */}
        <section className="py-8 md:py-16 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 text-center sm:text-left">
            <MembershipsSection />
            <SocialFooter />
            <ContactSection />
          </div>
        </section>

        {/* Gallery - horizontal carousel */}
        <div className="border-t border-border">
          <GallerySection />
        </div>

        {/* Footer */}
        <footer className="border-t border-border pt-8 pb-12 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 MJ Tuplano. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
