export const projects = [
  {
    slug: 'arnose-insurance-platform',
    featured: true,
    year: '2024',
    title: 'Insurecore Insurance Platform',
    tagline: 'Insurance product build with Next.js, Spring Boot, and a guarded backend API layer.',
    role: 'Full-stack engineer',
    duration: 'Ongoing',
    team: 'Personal build',
    summary:
      'A full-stack insurance product that combines a Next.js frontend, Spring Boot backend, Supabase/PostgreSQL data layer, and an AI-assisted workflow design behind a safer backend boundary.',
    problem:
      'The project explores how insurance flows can feel cleaner for users while still being backed by structured service logic, authentication, and role-aware workflows.',
    solution:
      'Built the frontend and backend together, added JWT-protected APIs, modelled core entities, and kept AI interactions behind controlled server-side handling.',
    impact: [
      'Public repository available for direct code review',
      'Claims and policy flows modelled across frontend and backend surfaces',
      'JWT-secured service layer with role-aware behaviour',
      'AI-assisted experience routed through backend control points',
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Spring Boot',
      'Java 17',
      'JPA / Hibernate',
      'PostgreSQL',
      'Supabase',
      'JWT',
      'Axios',
    ],
    highlights: [
      'Custom client architecture with JWT interceptors and fallback behavior',
      'Structured backend entities supporting policy and claims workflows',
      'Practical AI integration without exposing raw secrets to the frontend',
      'Connected frontend and backend flow designed as one product system',
    ],
    accent: '#f16429',
    cover: 'arnose',
    links: {
      live: null,
      repo: 'https://github.com/mannyasinmoney9/Insurecore',
      caseStudy: null,
    },
  },
  {
    slug: 'walters-fullstack-portfolio',
    featured: true,
    year: '2025',
    title: 'Walters Fullstack Portfolio',
    tagline: 'Recruiter-focused portfolio experience with React, Vite, motion, and editorial UI design.',
    role: 'Designer and frontend engineer',
    duration: 'Active',
    team: 'Personal build',
    summary:
      'A custom portfolio built to present backend depth with premium frontend storytelling, smooth theme handling, and strong recruiter-facing information architecture.',
    problem:
      'Most developer portfolios look templated, rely on filler metrics, or bury the information recruiters actually need to make a decision.',
    solution:
      'Designed a custom React and Vite experience with a shared theme system, smoother motion, grounded profile data, and direct links to real public work.',
    impact: [
      'Public repository available for direct code review',
      'Dark and light mode handled through a unified theme system',
      'Recruiter-facing copy aligned to verified profile information',
      'Smooth navigation, contact flow, and project storytelling across the site',
    ],
    stack: ['React', 'Vite', 'Framer Motion', 'Tailwind CSS', 'JavaScript'],
    highlights: [
      'Dark and light mode with a unified design token system',
      'Custom recruiter-first storytelling across hero, projects, and contact sections',
      'Profile presentation tied to verified public GitHub and professional details',
      'Premium UI direction designed to feel deliberate rather than template-driven',
    ],
    accent: '#d95b1a',
    cover: 'enterprise',
    links: {
      live: null,
      repo: 'https://github.com/mannyasinmoney9/Walters-Fullstack-Portfolio',
    },
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
