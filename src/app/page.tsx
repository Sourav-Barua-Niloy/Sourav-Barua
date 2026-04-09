// src/app/page.tsx
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import Footer from '@/components/sections/Footer';

export const revalidate = 60; // ISR: revalidate every 60 seconds

async function getPortfolioData() {
  const [hero, experiences, projects, skills, contact] = await Promise.all([
    prisma.hero.findFirst(),
    prisma.experience.findMany({ orderBy: { order: 'asc' } }),
    prisma.project.findMany({ orderBy: { order: 'asc' } }),
    prisma.skill.findMany({ orderBy: { order: 'asc' } }),
    prisma.contact.findFirst(),
  ]);

  return { hero, experiences, projects, skills, contact };
}

export default async function HomePage() {
  const { hero, experiences, projects, skills, contact } = await getPortfolioData();

  const websiteProjects = projects.filter(p => p.category === 'WEBSITE');
  const uiuxProjects = projects.filter(p => p.category === 'UIUX');
  const dataProjects = projects.filter(p => p.category === 'DATA_ANALYSIS');
  const graphicProjects = projects.filter(p => p.category === 'GRAPHIC_DESIGN');

  return (
    <main className="min-h-screen bg-cream">
      <Navbar contact={contact} />
      
      {hero && <HeroSection hero={hero} />}
      
      {experiences.length > 0 && (
        <ExperienceSection experiences={experiences} />
      )}

      <ProjectsSection
        websiteProjects={websiteProjects}
        uiuxProjects={uiuxProjects}
        dataProjects={dataProjects}
        graphicProjects={graphicProjects}
      />

      {skills.length > 0 && <SkillsSection skills={skills} />}

      <Footer contact={contact} />
    </main>
  );
}
