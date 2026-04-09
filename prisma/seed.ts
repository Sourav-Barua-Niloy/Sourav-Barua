// prisma/seed.ts
import { PrismaClient, ProjectCategory, SkillCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: {
      email: 'admin@portfolio.com',
      password: hashedPassword,
      name: 'Admin',
    },
  });

  // Hero
  await prisma.hero.upsert({
    where: { id: 'hero-1' },
    update: {},
    create: {
      id: 'hero-1',
      name: 'Your Name',
      title: 'Full Stack Developer & Designer',
      subtitle: 'Crafting Digital Experiences',
      description: 'I build beautiful, functional products that live at the intersection of design and technology.',
      ctaText: 'View My Work',
      ctaLink: '#projects',
    },
  });

  // Experiences
  await prisma.experience.createMany({
    data: [
      {
        company: 'Tech Corp',
        role: 'Senior Frontend Developer',
        startDate: 'Jan 2022',
        endDate: null,
        current: true,
        description: 'Leading frontend development for enterprise SaaS products. Built reusable component libraries and improved performance by 40%.',
        technologies: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
        order: 1,
      },
      {
        company: 'Design Studio',
        role: 'UI/UX Designer & Developer',
        startDate: 'Mar 2020',
        endDate: 'Dec 2021',
        current: false,
        description: 'Designed and developed web applications for 20+ clients across various industries.',
        technologies: ['Figma', 'React', 'Tailwind CSS', 'Node.js'],
        order: 2,
      },
    ],
    skipDuplicates: true,
  });

  // Projects
  await prisma.project.createMany({
    data: [
      {
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with real-time inventory, payment integration, and admin dashboard.',
        tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
        category: ProjectCategory.WEBSITE,
        featured: true,
        order: 1,
      },
      {
        title: 'Dashboard UI Kit',
        description: 'Comprehensive design system and UI kit for data-heavy dashboards.',
        tags: ['Figma', 'Design Systems', 'Components'],
        category: ProjectCategory.UIUX,
        featured: true,
        order: 2,
      },
      {
        title: 'Sales Analytics Dashboard',
        description: 'Interactive data visualization dashboard for sales teams with predictive analytics.',
        tags: ['Python', 'Pandas', 'Plotly', 'Streamlit'],
        category: ProjectCategory.DATA_ANALYSIS,
        featured: false,
        order: 3,
      },
      {
        title: 'Brand Identity System',
        description: 'Complete brand identity including logo, color palette, typography, and usage guidelines.',
        tags: ['Illustrator', 'Branding', 'Typography'],
        category: ProjectCategory.GRAPHIC_DESIGN,
        featured: false,
        order: 4,
      },
    ],
    skipDuplicates: true,
  });

  // Skills
  await prisma.skill.createMany({
    data: [
      { name: 'React / Next.js', level: 92, category: SkillCategory.FRONTEND, order: 1 },
      { name: 'TypeScript', level: 88, category: SkillCategory.FRONTEND, order: 2 },
      { name: 'Tailwind CSS', level: 95, category: SkillCategory.FRONTEND, order: 3 },
      { name: 'Node.js', level: 82, category: SkillCategory.BACKEND, order: 4 },
      { name: 'PostgreSQL', level: 78, category: SkillCategory.DATABASE, order: 5 },
      { name: 'Figma', level: 90, category: SkillCategory.DESIGN, order: 6 },
      { name: 'Python', level: 75, category: SkillCategory.DATA, order: 7 },
      { name: 'Docker', level: 70, category: SkillCategory.DEVOPS, order: 8 },
    ],
    skipDuplicates: true,
  });

  // Contact
  await prisma.contact.upsert({
    where: { id: 'contact-1' },
    update: {},
    create: {
      id: 'contact-1',
      email: 'hello@yourportfolio.com',
      phone: '+1 (555) 000-0000',
      location: 'San Francisco, CA',
      github: 'https://github.com/yourusername',
      linkedin: 'https://linkedin.com/in/yourusername',
      twitter: 'https://twitter.com/yourusername',
    },
  });

  console.log('✅ Database seeded successfully');
}

main().catch(console.error).finally(() => prisma.$disconnect());
