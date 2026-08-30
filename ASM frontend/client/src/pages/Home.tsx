// ASM CSIT reference recreation: the home route reproduces the authorized website structure and adds ASM AI as an overlay feature.
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { CampusSection } from "@/components/home/CampusSection";
import { PlacementsSection } from "@/components/home/PlacementsSection";
import { AdmissionCTA } from "@/components/home/AdmissionCTA";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return <SiteShell><Hero /><AboutSection /><ProgramsSection /><CampusSection /><PlacementsSection /><AdmissionCTA /><ContactSection /></SiteShell>;
}


