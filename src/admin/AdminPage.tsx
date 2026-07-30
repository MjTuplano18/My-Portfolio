import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileAdmin from "./sections/ProfileAdmin";
import AboutAdmin from "./sections/AboutAdmin";
import ExperienceAdmin from "./sections/ExperienceAdmin";
import TechStackAdmin from "./sections/TechStackAdmin";
import ProjectsAdmin from "./sections/ProjectsAdmin";
import CertsAdmin from "./sections/CertsAdmin";
import TestimonialsAdmin from "./sections/TestimonialsAdmin";
import MembershipsAdmin from "./sections/MembershipsAdmin";
import GalleryAdmin from "./sections/GalleryAdmin";
import SocialAdmin from "./sections/SocialAdmin";

const TABS = [
  { id: "profile", label: "Profile" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "techstack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "certs", label: "Certifications" },
  { id: "testimonials", label: "Recommendations" },
  { id: "memberships", label: "Memberships" },
  { id: "gallery", label: "Gallery" },
  { id: "social", label: "Social Links" },
];

interface Props {
  onLogout: () => void;
}

export default function AdminPage({ onLogout }: Props) {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTab = () => {
    switch (activeTab) {
      case "profile": return <ProfileAdmin />;
      case "about": return <AboutAdmin />;
      case "experience": return <ExperienceAdmin />;
      case "techstack": return <TechStackAdmin />;
      case "projects": return <ProjectsAdmin />;
      case "certs": return <CertsAdmin />;
      case "testimonials": return <TestimonialsAdmin />;
      case "memberships": return <MembershipsAdmin />;
      case "gallery": return <GalleryAdmin />;
      case "social": return <SocialAdmin />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground">Portfolio Admin</h1>
          <p className="text-xs text-muted-foreground">Manage your portfolio content</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View Site →
          </a>
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar nav */}
        <nav className="w-48 min-h-screen border-r border-border p-4 flex-shrink-0">
          <div className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTab === tab.id
                    ? "bg-foreground text-background font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 p-8">
          <h2 className="text-xl font-bold mb-6 text-foreground">
            {TABS.find((t) => t.id === activeTab)?.label}
          </h2>
          {renderTab()}
        </main>
      </div>
    </div>
  );
}
