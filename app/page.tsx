"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
/* ─── Data ─────────────────────────────────────────── */

const NAV_ITEMS = [
  { id: "about", label: "⚡ ABOUT" },
  { id: "experience", label: "🔥 EXPERIENCE" },
  { id: "projects", label: "🌊 PROJECTS" },
  { id: "education", label: "🌿 EDUCATION" },
  { id: "hobbies", label: "🎮 HOBBIES" },
];

const projects = [
  {
    title: "AI Powered Jobs Search Engine",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    github:
      "https://github.com/nickfchmail-ux/next-supabse-AI-job-application-engine",
    demo: "https://www.youtube.com/watch?v=NvKCRjTVL2Q",
    description:
      "A job hunting dashboard that scrapes 30+ listings from JobsDB, CTgoodjobs, Indeed, LinkedIn and OfferToday. Features AI-generated fit scores, real-time scraping progress, secure authentication, and auto-categorized results with cover letter generation.",
  },
  {
    title: "Pokemon E-Commerce Web App",
    tech: ["Next.js", "Supabase", "Stripe", "TanStack Query"],
    github: "https://github.com/nickfchmail-ux/next-supabase-pokemon-ecom-demo",
    demo: "https://www.youtube.com/watch?v=gqrcgNBPeUU",
    description:
      "Full-stack e-commerce platform with NextAuth authentication, persistent cart, Stripe payments, infinite scrolling, real-time community chat supporting 10+ concurrent users, and an AI customer support chatbot powered by DeepSeek API.",
  },
  {
    title: "Pokemon E-Commerce Mobile App",
    tech: ["React Native", "Expo", "Supabase"],
    github:
      "https://github.com/nickfchmail-ux/react-native-supabase-pokemon-ecom-demo",
    description:
      "Cross-platform mobile companion to the web store. Shares Supabase backend with all core features including cart, shop, and favorites. Native capabilities ready: GPS, camera, push notifications.",
  },
  {
    title: "Pokemon REST API",
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
    github:
      "https://github.com/nickfchmail-ux/express-mongodb-pokemon-api-demon",
    external: "https://express-mongodb-pokemon-api-demon-2.onrender.com/",
    description:
      "RESTful API with full CRUD operations, custom querying, JWT authentication with route protection, built with MVC architecture for scalability.",
  },
  {
    title: "Django REST API Demo",
    tech: ["Python", "Django REST Framework"],
    github:
      "https://github.com/nickfchmail-ux/django-rest-framework-simple-application",
    description:
      "CRUD API demonstrating Django fundamentals, deployed on Render.",
  },
];

const experience = [
  {
    period: "JUL 2024 — JUL 2025",
    role: "Betting System Implementation Officer",
    company: "The Hong Kong Jockey Club",
    description:
      "Interpreted user stories in Jira and executed manual/mobile testing across betting platforms. Raised defect tickets and supported test automation using Appium scripts.",
    tech: ["Jira", "Appium", "Mobile Testing", "QA"],
  },
  {
    period: "JUL 2023 — JUL 2024",
    role: "Project Officer",
    company: "Hong Kong Trade Development Council",
    description:
      "Used Azure Computer Vision to automate data input processes. Managed data validation and due diligence workflows for government subsidy schemes.",
    tech: ["Azure", "Computer Vision", "Data Validation", "Process Automation"],
  },
  {
    period: "JAN — MAY 2023",
    role: "Senior Administrative Assistant",
    company: "Innovation and Technology Commission",
    description:
      "Verified documents and resolved stakeholder queries for government funding programs. Ensured compliance and accuracy in processing applications.",
    tech: ["Stakeholder Management", "Document Verification"],
  },
  {
    period: "2018 — 2023",
    role: "Earlier Roles",
    company: "TVB \u00b7 Hang Seng Bank \u00b7 Others",
    description:
      "Standards Officer (TVB), Payment Services/Compliance Officer (Hang Seng Bank), and administrative positions focused on regulatory standards, client verification, and process support.",
    tech: ["Compliance", "Regulatory Standards", "Client Verification"],
    linkedin: "https://www.linkedin.com/in/nick-fong-761a1420b/details/experience/",
  },
];

/* ─── Icons ─────────────────────────────────────────── */

function GitHubIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  );
}

function EmailIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ─── Helpers ──────────────────────────────────────── */

function getYouTubeId(url: string) {
  const match = url.match(/(?:v=|\/)([\w-]{11})/);
  return match ? match[1] : null;
}

/* ─── Page ─────────────────────────────────────────── */

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "section[data-section]",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection((entry.target as HTMLElement).dataset.section!);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Spotlight gradient follows mouse */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* ── Left Panel (Sticky) ── */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="flex items-center gap-3 text-4xl font-bold tracking-tight text-lightest-slate sm:text-5xl">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-green/40 ring-offset-2 ring-offset-navy">
                  <Image
                    src="/passport-photo.png"
                    alt="Nick Fong"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <a href="/">Nick Fong</a>
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-light-slate sm:text-xl">
                Full-Stack Developer &amp; Operations Specialist
              </h2>
              <p className="mt-4 max-w-xs leading-normal text-slate">
                I build AI-powered solutions and scalable web applications with
                Next.js, Node.js, and Django.
              </p>

              {/* Navigation */}
              <nav
                className="nav hidden lg:block"
                aria-label="In-page jump links"
              >
                <ul className="mt-16 w-max">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`group flex items-center py-3 ${
                          activeSection === item.id ? "active" : ""
                        }`}
                      >
                        <span
                          className={`nav-indicator mr-4 h-px group-hover:w-16 group-hover:bg-lightest-slate group-focus-visible:w-16 group-focus-visible:bg-lightest-slate motion-reduce:transition-none ${
                            activeSection === item.id
                              ? "w-16 bg-lightest-slate"
                              : "w-8 bg-slate"
                          }`}
                        />
                        <span
                          className={`text-xs font-bold uppercase tracking-widest group-hover:text-lightest-slate group-focus-visible:text-lightest-slate ${
                            activeSection === item.id
                              ? "text-lightest-slate"
                              : "text-slate"
                          }`}
                        >
                          {item.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Socials */}
            <ul
              className="relative z-40 ml-1 mt-8 flex items-center gap-5"
              aria-label="Social media"
            >
              <li>
                <a
                  href="https://github.com/nickfchmail-ux?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate hover:text-lightest-slate transition-colors"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/nick-fong-761a1420b/details/experience/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate hover:text-lightest-slate transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </li>
              <li className="relative">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("nickfchmail@gmail.com");
                    setEmailCopied(true);
                    setTimeout(() => setEmailCopied(false), 2000);
                  }}
                  className="block text-slate hover:text-lightest-slate transition-colors cursor-pointer"
                  aria-label="Copy email address"
                >
                  <EmailIcon />
                </button>
                {emailCopied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-green px-2 py-1 text-xs font-medium text-navy">
                    Email copied!
                  </span>
                )}
              </li>
            </ul>
          </header>

          {/* ── Right Panel (Scrollable) ── */}
          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
            {/* ── About ── */}
            <section
              id="about"
              data-section="about"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-lightest-slate lg:sr-only">
                  About
                </h2>
              </div>
              <div className="text-slate">
                <p className="mb-4">
                  I&apos;m a junior full-stack developer with a strong
                  foundation in{" "}
                  <span className="font-medium text-lightest-slate">
                    Next.js
                  </span>
                  ,{" "}
                  <span className="font-medium text-lightest-slate">React</span>
                  ,{" "}
                  <span className="font-medium text-lightest-slate">
                    Node.js
                  </span>
                  , and{" "}
                  <span className="font-medium text-lightest-slate">
                    Django
                  </span>
                  . I&apos;ve built and deployed multiple production-ready
                  applications, including an AI-powered job search engine and an
                  e-commerce platform with payment integration.
                </p>
                <p className="mb-4">
                  Before transitioning into development, I spent 5+ years in
                  business operations, stakeholder management, and process
                  improvement at organizations like the{" "}
                  <span className="font-medium text-lightest-slate">
                    Hong Kong Jockey Club
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-lightest-slate">HKTDC</span>
                  . This background gives me a unique perspective — I don&apos;t
                  just write code, I understand the business problems it needs
                  to solve.
                </p>
                <p>
                  My QA experience with{" "}
                  <span className="font-medium text-lightest-slate">Jira</span>{" "}
                  and{" "}
                  <span className="font-medium text-lightest-slate">
                    Appium
                  </span>{" "}
                  means I write reliable, testable code. My work with{" "}
                  <span className="font-medium text-lightest-slate">
                    Azure Computer Vision
                  </span>{" "}
                  at HKTDC proves I can apply AI to solve real business
                  problems, not just build demos.
                </p>
              </div>
            </section>

            {/* ── Experience ── */}
            <section
              id="experience"
              data-section="experience"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-lightest-slate lg:sr-only">
                  Experience
                </h2>
              </div>
              <div>
                <ol className="group/list">
                  {experience.map((exp, i) => (
                    <li key={i} className="mb-12">
                      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-lightest-navy/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate sm:col-span-2">
                          {exp.period}
                        </header>
                        <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-lightest-slate">
                            <span>{exp.role}</span>
                            <span className="mx-1 text-slate">·</span>
                            <span className="text-green">{exp.company}</span>
                          </h3>
                          <p className="mt-2 text-sm leading-normal text-light-slate">
                            {exp.description}
                          </p>
                          {exp.linkedin && (
                            <a
                              href={exp.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20"
                            >
                              <LinkedInIcon className="h-4 w-4" />
                              For details, visit my LinkedIn
                              <ArrowIcon className="h-3 w-3" />
                            </a>
                          )}
                          <ul
                            className="mt-2 flex flex-wrap"
                            aria-label="Technologies used"
                          >
                            {exp.tech.map((t) => (
                              <li key={t} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-green-tint px-3 py-1 text-xs font-medium leading-5 text-green">
                                  {t}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* ── Projects ── */}
            <section
              id="projects"
              data-section="projects"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-lightest-slate lg:sr-only">
                  Projects
                </h2>
              </div>
              <div>
                <ol className="group/list">
                  {projects.map((project, i) => (
                    <li key={i} className="mb-12">
                      <div
                        className={`group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 ${project.demo ? "cursor-pointer" : ""} ${selectedProject === i ? "ring-1 ring-green/30 rounded-md" : ""}`}
                        onClick={() =>
                          project.demo ? setSelectedProject(i) : undefined
                        }
                      >
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-lightest-navy/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                        <div className="z-10 sm:order-2 sm:col-span-6">
                          <h3 className="font-medium leading-tight text-lightest-slate">
                            {project.title}
                          </h3>
                          <p className="mt-2 text-sm leading-normal text-light-slate">
                            {project.description}
                          </p>

                          {/* Explicit action buttons */}
                          <div className="relative mt-3 flex flex-wrap items-center gap-3">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-green/40 px-3 py-1 text-xs font-medium text-green transition-colors hover:bg-green/10"
                            >
                              <GitHubIcon className="h-3.5 w-3.5" />
                              GitHub
                            </a>
                            {project.demo && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProject(i);
                                }}
                                className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-green/40 px-3 py-1 text-xs font-medium text-green transition-colors hover:bg-green/10"
                              >
                                ▶ Watch Demo
                              </button>
                            )}
                            {project.external && (
                              <a
                                href={project.external}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-green/40 px-3 py-1 text-xs font-medium text-green transition-colors hover:bg-green/10"
                              >
                                → Live API
                              </a>
                            )}
                          </div>

                          <ul
                            className="mt-2 flex flex-wrap"
                            aria-label="Technologies used"
                          >
                            {project.tech.map((t) => (
                              <li key={t} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-green-tint px-3 py-1 text-xs font-medium leading-5 text-green">
                                  {t}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* ── Education ── */}
            <section
              id="education"
              data-section="education"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-lightest-slate lg:sr-only">
                  Education
                </h2>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="font-medium text-lightest-slate">
                    Bachelor of Business Studies
                  </h3>
                  <p className="text-sm text-light-slate">
                    University College Dublin · 2014 – 2016
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-lightest-slate">
                    Higher Diploma in Business — Marketing &amp; Management
                  </h3>
                  <p className="text-sm text-light-slate">
                    HKU SPACE Community College · 2012 – 2014
                  </p>
                </div>
                <div className="pt-4 border-t border-lightest-navy">
                  <h3 className="font-medium text-lightest-slate mb-3">
                    Certifications &amp; Courses
                  </h3>
                  <ul className="space-y-2 text-sm text-light-slate">
                    <li>
                      Node.js, Express, MongoDB &amp; More — Jonas Schmedtmann
                    </li>
                    <li>
                      The Complete JavaScript Course 2025 — Jonas Schmedtmann
                    </li>
                    <li>Advanced CSS and Sass — Jonas Schmedtmann</li>
                    <li>
                      Python Django – The Practical Guide — Maximilian
                      Schwarzm\u00fcller
                    </li>
                    <li>100 Days of Code: Python Pro Bootcamp — Angela Yu</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ── Hobbies ── */}
            <section
              id="hobbies"
              data-section="hobbies"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-lightest-slate lg:sr-only">
                  Hobbies
                </h2>
              </div>
              <div className="space-y-6">
                <p className="text-light-slate leading-normal">
                  Outside of coding, I keep life simple and fun.
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="group rounded-lg bg-lightest-navy/50 p-5 transition hover:bg-lightest-navy/80">
                    <h3 className="flex items-center gap-2 font-medium text-lightest-slate">
                      <span className="text-2xl">🍜</span> Eating
                    </h3>
                    <p className="mt-1 text-sm text-light-slate">
                      Always on the hunt for good food — street eats, local gems, or anything that hits the spot.
                    </p>
                  </div>
                  <div className="group rounded-lg bg-lightest-navy/50 p-5 transition hover:bg-lightest-navy/80">
                    <h3 className="flex items-center gap-2 font-medium text-lightest-slate">
                      <span className="text-2xl">✈️</span> Traveling
                    </h3>
                    <p className="mt-1 text-sm text-light-slate">
                      Exploring new places, soaking in different cultures, and collecting memories along the way.
                    </p>
                  </div>
                  <div className="group rounded-lg bg-lightest-navy/50 p-5 transition hover:bg-lightest-navy/80">
                    <h3 className="flex items-center gap-2 font-medium text-lightest-slate">
                      <span className="text-2xl">😂</span> Funny Stuff
                    </h3>
                    <p className="mt-1 text-sm text-light-slate">
                      Scrolling social media for brainless but hilarious content — the kind of dumb funny moves that make life more enjoyable.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate italic">
                  If you share the same vibe — good food, random adventures, and laughing at silly things — we&apos;ll probably get along great.
                </p>
              </div>
            </section>

            {/* ── Footer ── */}
            <footer className="max-w-md pb-16 text-sm text-slate sm:pb-0">
            </footer>
          </main>
        </div>
      </div>

      {/* ── Video Modal ── */}
      {selectedProject !== null && projects[selectedProject]?.demo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-lightest-slate">
                {projects[selectedProject].title}
              </h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate hover:text-lightest-slate transition-colors text-sm"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-lightest-navy">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(projects[selectedProject].demo!)}?autoplay=1`}
                title={projects[selectedProject].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
