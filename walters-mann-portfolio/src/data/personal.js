export const personal = {
  name: 'Walters Mann',
  firstName: 'Walters',
  lastName: 'Mann',
  initials: 'WM',
  title: 'Senior Java Engineer',
  shortTitle: 'Senior Java Engineer',
  company: 'Aptech',
  subject: 'Senior Java Engineer',
  tagline:
    'I build resilient Java platforms, dependable delivery pipelines, and polished product experiences teams can trust in production.',
  location: 'Port Harcourt, Nigeria',
  availability:
    'Available for onsite roles, hybrid teams, and senior backend engineering opportunities.',
  email: 'manniboh@gmail.com',
  phone: '+234 907 456 3104',
  phoneRaw: '+2349074563104',
  photoUrl: '/walters-photo-upscaled.jpg?v=20260430b',
  photoFallbackUrl: '/walters-portrait.svg',
  resumeUrl: '/Walters-Mann-Resume.pdf',
  summary: `Senior Java Engineer focused on backend systems, API design,
maintainable service architecture, and practical product delivery. This public
portfolio is intentionally grounded in current role information, direct contact
details, and project work I can speak to clearly in interviews.`,
  hiringPitch:
    'I bring backend depth, structured delivery habits, and a calm approach to architecture decisions, debugging, and collaboration.',
  stats: [
    { value: '2', label: 'Verified public repositories linked from this portfolio' },
    { value: 'Aptech', label: 'Current company presented publicly' },
    { value: 'Java + Spring', label: 'Primary backend stack shown throughout this site' },
    { value: 'Verified', label: 'Public claims kept free of placeholder metrics and invented credentials' },
  ],
  socials: [
    {
      name: 'GitHub',
      handle: '@mannyasinmoney9',
      url: 'https://github.com/mannyasinmoney9',
    },
    {
      name: 'Email',
      handle: 'manniboh@gmail.com',
      url: 'mailto:manniboh@gmail.com',
    },
  ],
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  },
}

export const services = [
  {
    number: '01',
    title: 'Microservices Architecture',
    body:
      'I design backend services with clear boundaries, strong contracts, and production-ready resilience patterns.',
    capabilities: ['Java 17', 'Spring Boot 3', 'Spring Cloud', 'DDD'],
  },
  {
    number: '02',
    title: 'Event-Driven Systems',
    body:
      'I build asynchronous flows with Kafka so systems stay fast, observable, and easier to scale under real traffic.',
    capabilities: ['Apache Kafka', 'Kafka Streams', 'Schema Registry', 'CDC'],
  },
  {
    number: '03',
    title: 'Cloud Delivery',
    body:
      'I deploy to AWS and Azure with CI/CD, containers, infrastructure discipline, and visibility into what is happening after release.',
    capabilities: ['AWS', 'Azure', 'Docker', 'Kubernetes'],
  },
  {
    number: '04',
    title: 'Full-Stack Product Delivery',
    body:
      'I connect clean backend engineering with React and Angular frontends so teams move faster end to end, not just service by service.',
    capabilities: ['React', 'Next.js', 'Angular', 'REST APIs'],
  },
  {
    number: '05',
    title: 'Quality Engineering',
    body:
      'I build in confidence with layered testing, practical automation, and engineering habits that prevent fragile releases.',
    capabilities: ['JUnit', 'Mockito', 'Cypress', 'Contract Testing'],
  },
  {
    number: '06',
    title: 'Performance and Scale',
    body:
      'I tune systems for throughput, reliability, and predictable runtime behavior so growth does not become chaos.',
    capabilities: ['Redis', 'PostgreSQL', 'JVM Tuning', 'Load Testing'],
  },
]

export const competencies = [
  'Architecting services that stay understandable as they scale',
  'Translating business goals into clean technical execution',
  'Owning CI/CD and production readiness, not just implementation',
  'Collaborating well with product, QA, and non-engineering stakeholders',
  'Mentoring teammates through code review and shared standards',
  'Staying calm, structured, and reliable in high-pressure delivery cycles',
]

export const principles = [
  {
    title: 'Architecture with restraint',
    body:
      'I like systems that are thoughtful, explicit, and maintainable instead of flashy for no reason.',
  },
  {
    title: 'Delivery with accountability',
    body:
      'I think shipping includes tests, deployment, observability, and what happens after launch.',
  },
  {
    title: 'Collaboration that reduces drag',
    body:
      'I communicate clearly, document decisions, and help teams move with less confusion and less rework.',
  },
]
