import Navbar from "@/components/navbar";
import IntroSection from "@/components/intro-section";
import SkillsSection from "@/components/skills-section";
import AcademicsSection from "@/components/academics-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import GithubSection from "@/components/github-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <IntroSection />
      <SkillsSection />
      <AcademicsSection />
      <ExperienceSection />
      <ProjectsSection />
      <GithubSection />
    </main>
  );
}
