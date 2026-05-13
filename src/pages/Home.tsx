import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Button from "../components/common/Button";

// ── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { value: "10+", label: "Projects Shipped" },
  { value: "3+", label: "SaaS Platforms" },
  { value: "Full", label: "Stack Coverage" },
];

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "✦",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.15)",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 93 },
      { name: "Framer Motion", level: 80 },
      { name: "SCSS / BEM", level: 85 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⬡",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.15)",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 88 },
      { name: "REST APIs", level: 92 },
      { name: "GraphQL", level: 72 },
      { name: "WebSockets", level: 75 },
      { name: "Auth & JWT", level: 87 },
    ],
  },
  {
    id: "data",
    label: "Data & Cloud",
    icon: "◈",
    color: "#4ade80",
    glow: "rgba(74,222,128,0.15)",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "Supabase", level: 90 },
      { name: "Prisma ORM", level: 82 },
      { name: "Redis", level: 68 },
      { name: "Vercel / Railway", level: 91 },
      { name: "Docker", level: 70 },
    ],
  },
  {
    id: "tools",
    label: "Tools & Workflow",
    icon: "◎",
    color: "#fb923c",
    glow: "rgba(251,146,60,0.15)",
    skills: [
      { name: "Git / GitHub", level: 95 },
      { name: "Figma", level: 78 },
      { name: "Postman", level: 88 },
      { name: "VS Code", level: 96 },
      { name: "CI/CD Pipelines", level: 74 },
      { name: "Agile / Scrum", level: 82 },
    ],
  },
];

const services = [
  {
    icon: "◐",
    title: "Full Stack Web Apps",
    desc: "End-to-end applications from database schema to pixel-perfect UI — built to scale.",
    color: "#a78bfa",
  },
  {
    icon: "⬡",
    title: "SaaS Platforms",
    desc: "Multi-tenant architecture, billing integrations, dashboards, and auth systems.",
    color: "#38bdf8",
  },
  {
    icon: "◈",
    title: "API Design & Integration",
    desc: "RESTful and GraphQL APIs, third-party integrations, and real-time features.",
    color: "#4ade80",
  },
  {
    icon: "✦",
    title: "UI / UX Engineering",
    desc: "Design systems, component libraries, and motion-rich interfaces that feel alive.",
    color: "#fb923c",
  },
];

// ── Animations ──────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

// ── Component ────────────────────────────────────────────────────────────────

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const orbX = useTransform(springX, [-1, 1], [-28, 28]);
  const orbY = useTransform(springY, [-1, 1], [-20, 20]);
  const orbX2 = useTransform(springX, [-1, 1], [20, -20]);
  const orbY2 = useTransform(springY, [-1, 1], [16, -16]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div className="home" ref={containerRef}>

      {/* ── Noise grain ─────────────────────────────────── */}
      <div className="home__grain" aria-hidden="true" />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════ */}
      <section className="page home__hero-section">
        <div className="home__grid-bg" aria-hidden="true" />

        <div className="container home__container">

          {/* LEFT */}
          <div className="home__hero">

            <motion.div className="home__badge" {...fadeUp(0)}>
              <span className="home__badge-dot" />
              Available for projects
            </motion.div>

            <motion.p className="home__eyebrow" {...fadeUp(0.1)}>
              Full Stack Developer · React &amp; Node.js · UI/UX Focused
            </motion.p>

            <div className="home__title-block">
              <motion.h1 className="home__title" {...fadeUp(0.18)}>
                <span className="home__title-line">From pixel</span>
                <span className="home__title-line home__title-line--accent">
                  to database.
                </span>
              </motion.h1>
            </div>

            <motion.p className="home__subtitle" {...fadeUp(0.28)}>
              I&apos;m Amara — a full stack developer building complete,
              production-ready web applications with React, Next.js, Node.js,
              and Supabase. I own the whole stack, and I care deeply about
              every layer of it.
            </motion.p>

            <motion.div className="home__actions" {...fadeUp(0.36)}>
              <Link to="/projects"><Button>View My Work</Button></Link>
              <Link to="/contact"><Button variant="ghost">Let&apos;s Talk</Button></Link>
            </motion.div>

            <motion.div className="home__stats" {...fadeUp(0.46)}>
              {stats.map((stat) => (
                <div key={stat.label} className="home__stat">
                  <span className="home__stat-value">{stat.value}</span>
                  <span className="home__stat-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            className="home__visual"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div className="home__orb home__orb--primary" style={{ x: orbX, y: orbY }} />
            <motion.div className="home__orb home__orb--accent"  style={{ x: orbX2, y: orbY2 }} />
            <div className="home__orb home__orb--subtle" />

            <div className="home__image-frame">
              <div className="home__image-frame-border" />
              <div className="home__image-inner">
                <img
                  src="/images/projects/hero.jpg"
                  alt="Amara — Full Stack Developer"
                  className="home__hero-image"
                />
              </div>

              <motion.div className="home__float-card home__float-card--tl" {...fadeUp(0.7)}>
                <span className="home__float-dot home__float-dot--green" />
                <span>Open to work</span>
              </motion.div>

              <motion.div className="home__float-card home__float-card--br" {...fadeUp(0.85)}>
                <span className="home__float-icon">⚡</span>
                <div>
                  <p className="home__float-title">Full Stack</p>
                  <p className="home__float-sub">React · Node · PostgreSQL</p>
                </div>
              </motion.div>
            </div>

            <div className="home__meta">
              <div className="home__meta-item">
                <span className="home__meta-label">Frontend</span>
                <span className="home__meta-value">Next.js · React · TypeScript · Tailwind</span>
              </div>
              <div className="home__meta-divider" />
              <div className="home__meta-item">
                <span className="home__meta-label">Backend</span>
                <span className="home__meta-value">Node.js · REST APIs · PostgreSQL · Supabase</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — WHAT I DO (SERVICES)
      ══════════════════════════════════════════════════ */}
      <section className="home__services-section">
        <div className="container">

          <motion.div
            className="home__section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="home__section-eyebrow">What I Build</span>
            <h2 className="home__section-title">End-to-end expertise</h2>
            <p className="home__section-sub">
              I don't just write code — I solve problems across the entire stack
              with clarity, performance, and craft.
            </p>
          </motion.div>

          <div className="home__services-grid">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                className="home__service-card"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ "--card-accent": s.color } as React.CSSProperties}
              >
                <span className="home__service-icon" style={{ color: s.color }}>{s.icon}</span>
                <h3 className="home__service-title">{s.title}</h3>
                <p className="home__service-desc">{s.desc}</p>
                <div className="home__service-line" style={{ background: s.color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 3 — SKILLS (PREMIUM)
      ══════════════════════════════════════════════════ */}
      <section className="home__skills-section">
        <div className="container">

          <motion.div
            className="home__section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="home__section-eyebrow">Tech Stack</span>
            <h2 className="home__section-title">Full stack, no gaps</h2>
            <p className="home__section-sub">
              From UI animations to database indexing — I cover every layer
              with depth and intentionality.
            </p>
          </motion.div>

          <div className="home__skills-grid">
            {skillCategories.map((cat, ci) => (
              <motion.div
                key={cat.id}
                className="home__skill-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: ci * 0.12 }}
                style={{
                  "--skill-color": cat.color,
                  "--skill-glow": cat.glow,
                } as React.CSSProperties}
              >
                {/* Card header */}
                <div className="home__skill-card-header">
                  <span className="home__skill-icon">{cat.icon}</span>
                  <span className="home__skill-category">{cat.label}</span>
                </div>

                {/* Skill rows */}
                <div className="home__skill-list">
                  {cat.skills.map((skill, si) => (
                    <div key={skill.name} className="home__skill-row">
                      <div className="home__skill-row-top">
                        <span className="home__skill-name">{skill.name}</span>
                        <span className="home__skill-pct">{skill.level}%</span>
                      </div>
                      <div className="home__skill-bar-track">
                        <motion.div
                          className="home__skill-bar-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.9,
                            delay: ci * 0.1 + si * 0.07,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 4 — CTA BANNER
      ══════════════════════════════════════════════════ */}
      <section className="home__cta-section">
        <div className="container">
          <motion.div
            className="home__cta-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="home__cta-orb home__cta-orb--left"  aria-hidden="true" />
            <div className="home__cta-orb home__cta-orb--right" aria-hidden="true" />

            <span className="home__section-eyebrow">Ready to build?</span>
            <h2 className="home__cta-title">Let&apos;s ship something great together.</h2>
            <p className="home__cta-sub">
              Whether you have a project in mind or just want to explore
              possibilities — I&apos;m one message away.
            </p>

            <div className="home__cta-actions">
              <Link to="/contact"><Button>Start a Conversation</Button></Link>
              <Link to="/projects"><Button variant="ghost">See My Work</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;