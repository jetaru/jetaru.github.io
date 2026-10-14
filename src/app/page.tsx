import { HeroSection } from "@/presentation/components/sections/HeroSection";
import { ProjectsSection } from "@/presentation/components/sections/ProjectsSection";
import { ArchitectureSection } from "@/presentation/components/sections/ArchitectureSection";
import { SkillsSection } from "@/presentation/components/sections/SkillsSection";
import { ExternalServerStatus } from "@/presentation/components/sections/ExternalServerStatus";
import { ContactSection } from "@/presentation/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <HeroSection />
      <ProjectsSection />
      <ArchitectureSection />
      <SkillsSection />
      <ExternalServerStatus />
      <ContactSection />
    </div>
  );
}
