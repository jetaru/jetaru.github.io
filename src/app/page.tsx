import { Hero } from "@/presentation/components/sections/Hero";
import { Experience } from "@/presentation/components/sections/Experience";
import { Skills } from "@/presentation/components/sections/Skills";
import { ProjectsSection } from "@/presentation/components/sections/ProjectsSection";
import { ArchitectureSection } from "@/presentation/components/sections/ArchitectureSection";
import { UniversalSystemSection } from "@/presentation/components/sections/UniversalSystemSection";
import { ContactSection } from "@/presentation/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* 1. Hero with Mobile Developer vs Back-End Engineer selector */}
      <Hero />

      {/* 2. Experience Timeline with structured technical achievement bullets */}
      <Experience />

      {/* 3. Skills Matrix with interactive badges/pills from profileData.skills */}
      <Skills />

      {/* 4. Projects Showcase (VALDOR, PF Canal Moderno, SISPAT, Convector BTP, etc.) */}
      <ProjectsSection />

      {/* 5. Clean Architecture & Scalability Showcase */}
      <ArchitectureSection />

      {/* 6. Universal System Showcase & PYME Invitation */}
      <UniversalSystemSection />

      {/* 7. Contact Section */}
      <ContactSection />
    </div>
  );
}
