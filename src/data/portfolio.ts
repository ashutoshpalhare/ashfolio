export const profile = {
  name: "Ashutosh Palhare",
  shortName: "AP",
  role: "Frontend-first Full Stack Developer",
  secondaryRole: "Cybersecurity Enthusiast",
  tagline: "Give me a problem → I'll figure out how to ship it.",
  location: "Maharashtra, India",
  avatar: "https://avatars.githubusercontent.com/u/53346137?v=4",
  email: "ap4all@aol.com",
  bio: "I build clean, high-performance web interfaces and practical developer tools. My sweet spot is where thoughtful design, solid engineering, and real-world usefulness meet.",
  socials: {
    github: "https://github.com/ashutoshpalhare",
    linkedin: "https://www.linkedin.com/in/ashutoshpalhare",
    twitter: "https://twitter.com/AshutoshPalhare",
    instagram: "https://instagram.com/ashutoshpalhare",
  },
} as const;

export const stats = [
  { value: "5+", label: "Years building" },
  { value: "22", label: "Public repositories" },
  { value: "50+", label: "Vanilla projects" },
] as const;

export const skillGroups = [
  {
    title: "Frontend",
    description: "Interfaces that feel fast, fluid, and intentional.",
    skills: ["React", "TypeScript", "JavaScript", "Next.js", "Tailwind CSS", "Framer Motion", "HTML", "CSS"],
    accent: "purple",
  },
  {
    title: "Backend & Data",
    description: "Practical APIs, integrations, and reliable data layers.",
    skills: ["Node.js", "Python", "Django", "Flask", "PHP", "MySQL", "Supabase", "REST APIs"],
    accent: "pink",
  },
  {
    title: "Tools & Cloud",
    description: "A modern workflow from first commit to production.",
    skills: ["Git", "GitHub", "Docker", "AWS", "Google Cloud", "Azure", "Vite", "WordPress"],
    accent: "cyan",
  },
  {
    title: "Security & Systems",
    description: "Curious about what runs beneath the interface.",
    skills: ["Linux", "Kali Linux", "Networking", "Secure Coding", "C", "C++", "Cybersecurity", "OpenCV"],
    accent: "violet",
  },
] as const;

export const experiences = [
  {
    role: "Full Stack Developer",
    company: "Trimurti Pawan Pratishthan",
    period: "Dec 2024 — Present",
    type: "Product & education",
    bullets: [
      "Developing and maintaining web experiences with React, WordPress, PHP, HTML, CSS, and JavaScript.",
      "Built and delivered multiple production-ready websites for the institute and related initiatives.",
      "Conducting technical lectures and hands-on sessions on modern web development.",
    ],
  },
  {
    role: "Founder & Full Stack Developer",
    company: "Dev Culture",
    period: "Sep 2023 — Present",
    type: "Independent studio",
    bullets: [
      "Building developer tools, learning platforms, and product-grade web applications.",
      "Owning the lifecycle from concept and UI/UX through architecture, development, and deployment.",
      "Publishing open tools and experiences for the developer community.",
    ],
  },
  {
    role: "Freelance Full Stack Developer",
    company: "Independent",
    period: "Jun 2021 — Present",
    type: "Client work",
    bullets: [
      "Delivered business websites, redesigns, and custom solutions across multiple domains.",
      "Built responsive, accessible frontends with React, WordPress, PHP, and vanilla web technologies.",
      "Managed requirements, design, development, iteration, and delivery end-to-end.",
    ],
  },
  {
    role: "Cybersecurity & Open Source Contributor",
    company: "Self-directed",
    period: "Feb 2019 — Present",
    type: "Exploration",
    bullets: [
      "Built Linux tooling, terminal utilities, and security-focused experiments including FaceWise.",
      "Completed 50+ vanilla JavaScript projects to build strong browser fundamentals.",
      "Continuously exploring systems, networking, and secure coding practices.",
    ],
  },
] as const;

export type ProjectCategory = "Products" | "Tools" | "Learning" | "Creative" | "Security";

export type Project = {
  title: string;
  kicker: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  repo: string;
  live?: string;
  symbol: string;
  accent: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "RepoLens",
    kicker: "Understand any repository",
    description: "An IDE-like browser tool for exploring unfamiliar GitHub repositories with code viewing, insights, and client-side architecture analysis.",
    category: "Tools",
    tags: ["React 19", "TypeScript", "GitHub API", "TanStack"],
    repo: "https://github.com/ashutoshpalhare/RepoLens",
    live: "https://ashutoshpalhare.github.io/RepoLens/",
    symbol: "RL",
    accent: "violet",
    featured: true,
  },
  {
    title: "CraftC",
    kicker: "From zero to job-ready",
    description: "A structured C and C++ learning platform with 40+ lessons, visual roadmaps, projects, interview prep, and searchable cheatsheets.",
    category: "Learning",
    tags: ["React", "TypeScript", "Tailwind", "Shiki"],
    repo: "https://github.com/ashutoshpalhare/craftc",
    live: "https://ashutoshpalhare.github.io/craftc/",
    symbol: "C++",
    accent: "cyan",
    featured: true,
  },
  {
    title: "VibeHai",
    kicker: "Your music, your vibe",
    description: "A local-first music streaming experience with a smart queue, Media Session controls, persistent playback, API fallbacks, and PWA support.",
    category: "Products",
    tags: ["React", "TypeScript", "PWA", "Framer Motion"],
    repo: "https://github.com/ashutoshpalhare/VibeHai",
    live: "https://ashutoshpalhare.github.io/VibeHai/",
    symbol: "VH",
    accent: "pink",
    featured: true,
  },
  {
    title: "AP Verse",
    kicker: "A visual universe",
    description: "A cinematic, local-first portrait archive with fluid interactions and an immersive dark interface built for visual storytelling.",
    category: "Creative",
    tags: ["TanStack Start", "Zustand", "React", "Motion"],
    repo: "https://github.com/ashutoshpalhare/verse",
    live: "https://ashutoshpalhare.github.io/verse/",
    symbol: "AV",
    accent: "purple",
  },
  {
    title: "CommandKit",
    kicker: "AI workflows, accelerated",
    description: "A curated, searchable library of 100+ ChatGPT slash commands to discover, organize, copy, and favorite useful prompt shortcuts.",
    category: "Tools",
    tags: ["JavaScript", "AI", "Local Storage", "Productivity"],
    repo: "https://github.com/ashutoshpalhare/CommandKit",
    live: "https://ashutoshpalhare.github.io/CommandKit/",
    symbol: "/_",
    accent: "violet",
  },
  {
    title: "WebDev Projects",
    kicker: "Fundamentals over frameworks",
    description: "A collection of 50 responsive mini projects made with pure HTML, CSS, and JavaScript—zero frameworks and zero dependencies.",
    category: "Learning",
    tags: ["HTML", "CSS", "JavaScript", "Web APIs"],
    repo: "https://github.com/ashutoshpalhare/WebDev-Projects",
    live: "https://ashutoshpalhare.github.io/WebDev-Projects/",
    symbol: "50",
    accent: "cyan",
  },
  {
    title: "FaceWise",
    kicker: "Recognition made practical",
    description: "A face-recognition attendance system supporting registration, real-time attendance marking, and report generation.",
    category: "Security",
    tags: ["Python", "OpenCV", "Computer Vision"],
    repo: "https://github.com/ashutoshpalhare/FaceWise",
    symbol: "FW",
    accent: "pink",
  },
  {
    title: "Python Micro Projects",
    kicker: "Learn by building",
    description: "A growing collection of small, self-contained Python programs with individual documentation and requirements.",
    category: "Learning",
    tags: ["Python", "Automation", "Fundamentals"],
    repo: "https://github.com/ashutoshpalhare/Python-Micro-Projects",
    live: "https://ashutoshpalhare.github.io/Python-Micro-Projects/",
    symbol: "Py",
    accent: "purple",
  },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
