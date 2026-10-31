"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Check,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  experiences,
  navItems,
  profile,
  projects,
  skillGroups,
  stats,
  type ProjectCategory,
} from "@/data/portfolio";

function Github({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.02c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.57-.29-5.28-1.29-5.28-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.95 10.95 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.71 5.39-5.29 5.68.42.36.79 1.06.79 2.14v3.06c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

function Linkedin({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.34 7.84A2.34 2.34 0 1 0 5.34 3.16a2.34 2.34 0 0 0 0 4.68ZM3.32 9.58h4.04V21H3.32V9.58ZM9.65 9.58h3.87v1.56h.05c.54-1.02 1.86-2.1 3.83-2.1 4.1 0 4.86 2.7 4.86 6.2V21h-4.03v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4.04V9.58h.12Z" />
    </svg>
  );
}

function Twitter({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 2.5h3.68l-8.04 9.19L24 21.5h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 2.5h7.59l5.24 6.93L18.9 2.5Zm-1.3 17.27h2.04L6.48 4.14H4.3L17.6 19.77Z" />
    </svg>
  );
}

function Instagram({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const revealTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] } as const;

function SectionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 34 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduceMotion ? { duration: 0 } : { ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
  copy,
}: {
  number: string;
  eyebrow: string;
  title: ReactNode;
  copy?: string;
}) {
  return (
    <SectionReveal className="section-heading">
      <div className="section-kicker">
        <span>{number}</span>
        <span className="section-kicker-line" />
        <span>{eyebrow}</span>
      </div>
      <div className="section-title-row">
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
    </SectionReveal>
  );
}

function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nav-shell" aria-label="Main navigation">
        <a href="#home" className="brand" aria-label="Ashutosh Palhare, home">
          <span className="brand-mark">AP</span>
          <span className="brand-dot" />
        </a>

        <div className="desktop-nav">
          {navItems.map((item) => {
            const id = item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={active === id ? "active" : ""}
                aria-current={active === id ? "page" : undefined}
              >
                {item.label}
                {active === id ? <motion.span layoutId={reduceMotion ? undefined : "nav-underline"} /> : null}
              </a>
            );
          })}
        </div>

        <a className="nav-cta" href={`mailto:${profile.email}`}>
          Let&apos;s talk <ArrowUpRight size={15} />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={menuOpen ? "mobile-navigation" : undefined}
          ref={menuButtonRef}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.24 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : index * 0.045 }}
                className={active === item.href.slice(1) ? "active" : ""}
              >
                <span>0{index + 1}</span>
                {item.label}
                <ChevronRight size={18} />
              </motion.a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

const floatingBadges = [
  { label: "React", className: "badge-react", icon: "⚛" },
  { label: "TypeScript", className: "badge-ts", icon: "TS" },
  { label: "Security", className: "badge-security", icon: "⌁" },
  { label: "Next.js", className: "badge-next", icon: "N" },
];

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="hero section-shell">
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className="hero-grid" />

      <div className="hero-copy">
        <motion.div
          className="availability-pill"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { ...revealTransition, delay: 0.12 }}
        >
          <span className="pulse-dot" />
          Available for interesting work
        </motion.div>

        <motion.p
          className="hero-intro"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { ...revealTransition, delay: 0.2 }}
        >
          Hi, I&apos;m Ashutosh <span>👋</span>
        </motion.p>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { ...revealTransition, delay: 0.3 }}
        >
          I turn ideas into
          <span className="gradient-text"> digital experiences.</span>
        </motion.h1>

        <motion.p
          className="hero-role"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { ...revealTransition, delay: 0.4 }}
        >
          {profile.role} <i /> {profile.secondaryRole}
        </motion.p>

        <motion.blockquote
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { ...revealTransition, delay: 0.48 }}
        >
          “{profile.tagline}”
        </motion.blockquote>

        <motion.div
          className="hero-actions"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { ...revealTransition, delay: 0.56 }}
        >
          <a href="#projects" className="gradient-button">
            Explore my work <ArrowDown size={17} />
          </a>
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="ghost-button">
            <Github size={18} /> GitHub profile
          </a>
        </motion.div>

        <motion.div
          className="hero-meta"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.7 }}
        >
          <span><MapPin size={15} /> {profile.location}</span>
          <span className="meta-separator" />
          <span>Building for the web since 2019</span>
        </motion.div>
      </div>

      <motion.div
        className="portrait-stage"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.88, x: 28 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="portrait-ring ring-one" />
        <div className="portrait-ring ring-two" />
        <div className="portrait-glow" />
        <div className="portrait-frame">
          <div className="portrait-scanline" />
          <img src={profile.avatar} alt="Ashutosh Palhare" width="520" height="520" />
          <div className="portrait-shade" />
          <div className="portrait-monogram">AP</div>
        </div>

        {floatingBadges.map((badge, index) => (
          <motion.div
            key={badge.label}
            className={`floating-badge ${badge.className}`}
            animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, index % 2 ? 2 : -2, 0] }}
            transition={{ duration: 3.2 + index * 0.45, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>{badge.icon}</span>
            {badge.label}
          </motion.div>
        ))}

        <div className="portrait-code-card">
          <span>currently</span>
          <strong><i /> shipping ideas</strong>
        </div>
      </motion.div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to about section">
        <span>Scroll to explore</span>
        <i><ArrowDown size={14} /></i>
      </a>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="content-section section-shell">
      <SectionHeading
        number="01"
        eyebrow="About"
        title={<>Curious by nature.<br /><span className="gradient-text">Builder by choice.</span></>}
        copy="I care about the details users feel and the engineering decisions they never have to see."
      />

      <div className="about-grid">
        <SectionReveal className="about-story glass-card" delay={0.05}>
          <div className="card-icon"><Sparkles size={20} /></div>
          <p className="story-lead">I&apos;m a frontend-first full stack developer from Maharashtra, India.</p>
          <p>
            I started with pure HTML, CSS, and JavaScript—building 50+ small projects without frameworks. That foundation still shapes everything I ship today: clean, responsive, and free from unnecessary complexity.
          </p>
          <p>
            My work now spans React products, developer tools, learning platforms, WordPress, Python, and security experiments. I choose the tool that fits the problem, not the other way around.
          </p>
          <div className="signature-row">
            <span className="signature">Ashutosh.</span>
            <span>AP / Maharashtra, IN</span>
          </div>
        </SectionReveal>

        <SectionReveal className="about-principle glass-card" delay={0.12}>
          <span className="large-quote">“</span>
          <p>AI does the typing.<br /><strong>I do the thinking.</strong></p>
          <span>I use AI as an engineering multiplier while owning architecture, integration, debugging, and final quality.</span>
        </SectionReveal>

        <SectionReveal className="stats-card glass-card" delay={0.18}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </SectionReveal>

        <SectionReveal className="currently-card glass-card" delay={0.24}>
          <div className="card-label"><Terminal size={15} /> Right now</div>
          <ul>
            <li><span />Building modern web products</li>
            <li><span />Exploring AI-assisted applications</li>
            <li><span />Open to collaborations</li>
          </ul>
          <div className="code-snippet">
            <div><b>01</b><code>const mindset = &quot;ship&quot;;</code></div>
            <div><b>02</b><code>learn(problem);</code></div>
            <div><b>03</b><code>build(solution);</code></div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

const skillIcons = [Code2, Server, Layers3, ShieldCheck];

function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="content-section section-shell">
      <SectionHeading
        number="02"
        eyebrow="Capabilities"
        title={<>The tools I use to<br /><span className="gradient-text">make things happen.</span></>}
        copy="A broad toolkit, grounded in strong web fundamentals and shaped by real products."
      />

      <div className="skills-grid">
        {skillGroups.map((group, index) => {
          const Icon = skillIcons[index];
          return (
            <SectionReveal key={group.title} delay={index * 0.08}>
              <motion.article className={`skill-card glass-card accent-${group.accent}`} whileHover={reduceMotion ? undefined : { y: -7 }} transition={{ duration: reduceMotion ? 0 : 0.25 }}>
                <div className="skill-card-head">
                  <span className="skill-icon"><Icon size={21} /></span>
                  <span className="skill-index">0{index + 1}</span>
                </div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <div className="skill-list">
                  {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </motion.article>
            </SectionReveal>
          );
        })}
      </div>

      <SectionReveal className="skill-marquee-wrap">
        <div className="skill-marquee">
          <div>
            {["REACT", "TYPESCRIPT", "NEXT.JS", "TAILWIND", "PYTHON", "NODE.JS", "LINUX", "GIT", "SECURITY", "FIGMA"].map((item) => (
              <span key={item}>{item}<i>✦</i></span>
            ))}
          </div>
          <div aria-hidden="true">
            {["REACT", "TYPESCRIPT", "NEXT.JS", "TAILWIND", "PYTHON", "NODE.JS", "LINUX", "GIT", "SECURITY", "FIGMA"].map((item) => (
              <span key={item}>{item}<i>✦</i></span>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="content-section section-shell">
      <SectionHeading
        number="03"
        eyebrow="Experience"
        title={<>Where I&apos;ve been.<br /><span className="gradient-text">What I&apos;ve built.</span></>}
        copy="A journey shaped by client work, product ownership, teaching, and a lot of self-directed building."
      />

      <div className="timeline">
        <div className="timeline-line" aria-hidden="true" />
        {experiences.map((item, index) => (
          <SectionReveal key={`${item.company}-${item.role}`} className="timeline-item" delay={index * 0.06}>
            <div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
            <article className="experience-card glass-card">
              <div className="experience-meta">
                <span>{item.period}</span>
                <span>{item.type}</span>
              </div>
              <div className="experience-body">
                <div>
                  <h3>{item.role}</h3>
                  <p className="company">@ {item.company}</p>
                </div>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}><ChevronRight size={15} /> <span>{bullet}</span></li>
                  ))}
                </ul>
              </div>
            </article>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}

const categories: Array<"All" | ProjectCategory> = ["All", "Products", "Tools", "Learning", "Creative", "Security"];

function ProjectVisual({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className={`project-visual project-${project.accent}`}>
      <div className="visual-topbar">
        <div><i /><i /><i /></div>
        <span>{project.title.toLowerCase().replaceAll(" ", "-")}.app</span>
        <b />
      </div>
      <div className="visual-grid" />
      <div className="visual-orb" />
      <div className="visual-symbol">{project.symbol}</div>
      <div className="visual-code">
        <span /><span /><span />
      </div>
      <div className="visual-chip">{project.category}</div>
    </div>
  );
}

function Projects() {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const visibleProjects = useMemo(
    () => activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  return (
    <section id="projects" className="content-section section-shell projects-section">
      <SectionHeading
        number="04"
        eyebrow="Selected work"
        title={<>Things I&apos;ve taken<br /><span className="gradient-text">from idea to live.</span></>}
        copy="Real projects from my GitHub—built to solve problems, explore ideas, and sharpen the craft."
      />

      <SectionReveal className="project-toolbar">
        <div className="filters" role="group" aria-label="Filter projects">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category ? "active" : ""}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
        <span>{visibleProjects.length.toString().padStart(2, "0")} projects</span>
      </SectionReveal>

      <motion.div layout={!reduceMotion} className="projects-grid">
        <AnimatePresence mode="popLayout" initial={!reduceMotion}>
          {visibleProjects.map((project, index) => (
            <motion.article
              layout={!reduceMotion}
              key={project.title}
              className={`project-card glass-card ${project.featured ? "featured" : ""}`}
              initial={reduceMotion ? false : { opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -15, scale: 0.97 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectVisual project={project} />
              <div className="project-content">
                <div className="project-heading">
                  <div>
                    <span>{project.kicker}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <div className="project-links">
                    <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`}><Github size={17} /></a>
                    {project.live ? <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} live site`}><ExternalLink size={17} /></a> : null}
                  </div>
                </div>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <SectionReveal className="all-projects-link">
        <a href={profile.socials.github} target="_blank" rel="noreferrer">
          <Github size={18} /> Explore all repositories <ArrowUpRight size={17} />
        </a>
      </SectionReveal>
    </section>
  );
}

function Contact() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [submitted, setSubmitted] = useState(false);

  async function copyEmail() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API is unavailable");
      }
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1800);
    } catch {
      setCopyStatus("failed");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    setSubmitted(true);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="content-section section-shell contact-section">
      <div className="contact-glow" />
      <SectionHeading
        number="05"
        eyebrow="Contact"
        title={<>Have an idea?<br /><span className="gradient-text">Let&apos;s make it real.</span></>}
        copy="Whether it is a product, collaboration, or just a good technical conversation—my inbox is open."
      />

      <div className="contact-grid">
        <SectionReveal className="contact-info" delay={0.06}>
          <div className="contact-status">
            <span className="pulse-dot" /> Open to freelance & collaborations
          </div>
          <h3>Start a conversation.</h3>
          <p>Tell me what you&apos;re working on, what&apos;s stuck, or what you want to bring to life. I&apos;ll get back to you as soon as I can.</p>
          <button type="button" onClick={copyEmail} className="email-copy">
            <span><Mail size={18} /> {profile.email}</span>
            <span aria-live="polite">
              {copyStatus === "copied" ? <><Check size={17} /> Copied</> : copyStatus === "failed" ? "Copy unavailable" : <><Copy size={16} /> Copy</>}
            </span>
          </button>
          <div className="contact-socials">
            <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href={profile.socials.twitter} target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
            <a href={profile.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
          </div>
        </SectionReveal>

        <SectionReveal className="contact-form-wrap glass-card" delay={0.14}>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <label>
                <span>Your name</span>
                <input name="name" type="text" placeholder="Jane Smith" autoComplete="name" required />
              </label>
              <label>
                <span>Email address</span>
                <input name="email" type="email" placeholder="jane@company.com" autoComplete="email" required />
              </label>
            </div>
            <label>
              <span>Tell me about your idea</span>
              <textarea name="message" rows={5} placeholder="A little context, your goals, timeline..." required />
            </label>
            <button type="submit" className="gradient-button submit-button">
              {submitted ? "Opening your email app" : "Send a message"}
              {submitted ? <Check size={17} /> : <ArrowUpRight size={17} />}
            </button>
            {submitted ? (
              <p className="form-feedback" role="status">
                Your email app should open with the message prefilled. It is not sent until you press Send in that app.
              </p>
            ) : null}
          </form>
        </SectionReveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer section-shell">
      <div className="footer-top">
        <a href="#home" className="footer-brand">
          <span>AP</span>
          <div><strong>Ashutosh Palhare</strong><small>Building one useful thing at a time.</small></div>
        </a>
        <a href="#home" className="back-top">Back to top <ArrowUpRight size={15} /></a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Ashutosh Palhare</span>
        <span>Designed with intent <i /> Built with Next.js</span>
        <span>From Maharashtra, India 🇮🇳</span>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <motion.div className="progress-bar" style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }} />
      <div className="noise" aria-hidden="true" />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
