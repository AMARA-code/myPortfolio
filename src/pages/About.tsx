import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

// ── Data ─────────────────────────────────────────────────────────────────────

const pillars = [
  {
    number: "01",
    title: "Frontend Craft",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.10)",
    body: "I build rich, interactive interfaces with React, Next.js, TypeScript, and Tailwind CSS — with a sharp eye for performance, accessibility, and layouts that adapt beautifully across every device.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    number: "02",
    title: "Backend & APIs",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.10)",
    body: "On the server side I design RESTful APIs with Node.js, model relational data with MySQL and PostgreSQL, and integrate third-party services — structured for reliability and growth from day one.",
    tags: ["Node.js", "REST APIs", "PostgreSQL", "MySQL", "Webpack"],
  },
  {
    number: "03",
    title: "User-Centred Design",
    color: "#4ade80",
    glow: "rgba(74,222,128,0.10)",
    body: "Every interface I build starts with the user. Clear hierarchy, intuitive interactions, and seamless responsiveness — delivering experiences that feel polished and trustworthy at every touchpoint.",
    tags: ["UI/UX Design", "Responsive Design", "Bootstrap", "Sass", "Figma"],
  },
  {
    number: "04",
    title: "How I Work",
    color: "#fb923c",
    glow: "rgba(251,146,60,0.10)",
    body: "I value clear communication, reliable delivery, and full ownership. From database schema to deployed UI, I'm comfortable driving a project end-to-end or collaborating inside a cross-functional team.",
    tags: ["Git & GitHub", "Code Review", "Agile", "Problem Solving", "CI/CD"],
  },
];

const timeline = [
  {
    year: "2021",
    title: "SSC — The spark",
    desc: "Completed secondary school and discovered programming. Started exploring web technologies for the first time.",
  },
  {
    year: "2023",
    title: "Went full stack",
    desc: "Completed my HSSC and dived deep into React, Node.js, and database design — realising I wanted to own both ends of the wire.",
  },
  {
    year: "Feb 2024",
    title: "First dev role",
    desc: "Joined Cyber Space Software House in Multan as a Full Stack Developer, shipping production apps with Next.js, TypeScript, and PostgreSQL.",
  },
  {
    year: "May 2024",
    title: "CS degree begins",
    desc: "Enrolled in BS Computer Science at NFC Institute of Engineering and Technology — levelling up the theory behind the craft.",
  },
  {
    year: "Now",
    title: "Open for projects",
    desc: "Building, learning, and available for freelance work, contract roles, or full-time opportunities. Let's build something meaningful.",
  },
];

const values = [
  { icon: "◐", label: "Ownership",  desc: "I take responsibility for the full outcome, not just my slice of it." },
  { icon: "✦", label: "Clarity",    desc: "Clean code, clear communication, honest timelines — every time." },
  { icon: "◈", label: "Craft",      desc: "The difference between good and great lives in the details." },
  { icon: "⬡", label: "Velocity",   desc: "Ship early, iterate fast, and never compromise on quality." },
];

const stats = [
  { value: "3+",   label: "Year of production experience" },
  { value: "10+",  label: "Projects shipped" },
  { value: "10+",    label: "Live deployments on Netlify/ Vercel" },
  { value: "Full", label: "Stack ownership, frontend to DB" },
];

const techStack = [
  { group: "Frontend",   items: ["Next.js", "React.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Sass"] },
  { group: "Backend",    items: ["Node.js", "REST APIs", "API Integration", "npm", "Webpack", "Babel"] },
  { group: "Databases",  items: ["MySQL", "PostgreSQL"] },
  { group: "Languages",  items: ["C", "C++", "Java"] },
  { group: "Tools",      items: ["Git", "GitHub", "Version Control", "Responsive Design", "UI/UX Design"] },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0, amount = 0.2) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

// ── Component ─────────────────────────────────────────────────────────────────

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="about">

      {/* Grain */}
      <div className="about__grain" aria-hidden="true" />

      {/* ══════════════════════════════════════════════════
          HERO — two-column, image-anchored
      ══════════════════════════════════════════════════ */}
      <section className="about__hero-section" ref={heroRef}>
        <div className="about__hero-grid-bg" aria-hidden="true" />

        {/* Large decorative watermark */}
        <motion.span
          className="about__hero-deco"
          style={{ y: heroY, opacity: heroOpacity }}
          aria-hidden="true"
        >
          AN
        </motion.span>

        <div className="container about__hero-container">

          {/* ── Left col: image + quick meta ── */}
          <motion.div
            className="about__hero-left"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about__profile-frame">
              <div className="about__profile-border" />
              <div className="about__profile-inner">
                <img
                  src="/images/projects/about.png"
                  alt="Amara Naeem — Full Stack Developer"
                  className="about__profile-image"
                />
              </div>

              {/* Status badge */}
              <div className="about__profile-badge">
                <span className="about__profile-badge-dot" />
                <span>Available for work</span>
              </div>
            </div>

            {/* Quick stat row under image */}
            <div className="about__hero-stats">
              {stats.map((s) => (
                <div key={s.label} className="about__hero-stat">
                  <span className="about__hero-stat-value">{s.value}</span>
                  <span className="about__hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right col: headline + bio + CTAs ── */}
          <div className="about__hero-right">
            <motion.p className="about__eyebrow" {...fadeUp(0.05, 0.5)}>
              Full Stack Developer · Multan, Pakistan
            </motion.p>

            <motion.h1 className="about__hero-title" {...fadeUp(0.12, 0.4)}>
              Hi, I'm{" "}
              <span className="about__hero-title--accent">Amara Naeem</span>
              {" "}— I build complete web applications, end to end.
            </motion.h1>

            <motion.p className="about__hero-bio" {...fadeUp(0.2, 0.4)}>
              Results-driven Full Stack Developer with hands-on experience at Cyber
              Space Software House, shipping scalable web apps with Next.js, React,
              TypeScript, Node.js, and relational databases. I care about clean code,
              user-centric design, and taking full ownership from first commit to
              production.
            </motion.p>

            {/* Tech pills */}
            <motion.div className="about__hero-pills" {...fadeUp(0.27, 0.4)}>
              {["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MySQL", "Tailwind CSS"].map((t) => (
                <span key={t} className="about__hero-pill">{t}</span>
              ))}
            </motion.div>

            <motion.div className="about__hero-actions" {...fadeUp(0.33, 0.4)}>
              <Link to="/contact"><Button>Work with me</Button></Link>
              <Link to="/projects"><Button variant="ghost">See projects →</Button></Link>
            </motion.div>

            {/* Contact links */}
            <motion.div className="about__hero-links" {...fadeUp(0.38, 0.4)}>
              <a href="mailto:amaranaeem453@gmail.com" className="about__hero-link">
                amaranaeem453@gmail.com
              </a>
              <span className="about__hero-link-divider">·</span>
              <a href="https://linkedin.com/in/amara-naeem" target="_blank" rel="noreferrer" className="about__hero-link">
                LinkedIn
              </a>
              <span className="about__hero-link-divider">·</span>
              <a href="https://amaranaeem-portfolio.netlify.app" target="_blank" rel="noreferrer" className="about__hero-link">
                Portfolio
              </a>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TECH STACK — full inventory
      ══════════════════════════════════════════════════ */}
      <section className="about__stack-section">
        <div className="about__section-divider" aria-hidden="true" />
        <div className="container">

          <motion.div className="about__section-header" {...fadeUp(0)}>
            <span className="about__section-eyebrow">Technical skills</span>
            <h2 className="about__section-title">What I build with</h2>
          </motion.div>

          <div className="about__stack-grid">
            {techStack.map((group, i) => (
              <motion.div key={group.group} className="about__stack-group" {...fadeUp(i * 0.08)}>
                <span className="about__stack-group-label">{group.group}</span>
                <div className="about__stack-tags">
                  {group.items.map((item) => (
                    <span key={item} className="about__stack-tag">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PILLARS — what I do
      ══════════════════════════════════════════════════ */}
      <section className="about__pillars-section">
        <div className="about__section-divider" aria-hidden="true" />
        <div className="container">

          <motion.div className="about__section-header" {...fadeUp(0)}>
            <span className="about__section-eyebrow">Expertise</span>
            <h2 className="about__section-title">Four areas I live in</h2>
          </motion.div>

          <div className="about__pillars-grid">
            {pillars.map((p, i) => (
              <motion.div
                key={p.number}
                className="about__pillar-card"
                style={{ "--pillar-color": p.color, "--pillar-glow": p.glow } as React.CSSProperties}
                {...fadeUp(i * 0.1)}
              >
                <span className="about__pillar-number">{p.number}</span>
                <div className="about__pillar-accent-line" />
                <h3 className="about__pillar-title">{p.title}</h3>
                <p className="about__pillar-body">{p.body}</p>
                <div className="about__pillar-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="about__pillar-tag">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TIMELINE — journey
      ══════════════════════════════════════════════════ */}
      <section className="about__timeline-section">
        <div className="about__section-divider" aria-hidden="true" />
        <div className="container">

          <motion.div className="about__section-header" {...fadeUp(0)}>
            <span className="about__section-eyebrow">Journey</span>
            <h2 className="about__section-title">How I got here</h2>
          </motion.div>

          <div className="about__timeline">
            <motion.div
              className="about__timeline-line"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className={`about__timeline-item ${i % 2 === 0 ? "about__timeline-item--left" : "about__timeline-item--right"}`}
                {...fadeUp(i * 0.12)}
              >
                <div className="about__timeline-card">
                  <span className="about__timeline-year">{item.year}</span>
                  <h3 className="about__timeline-title">{item.title}</h3>
                  <p className="about__timeline-desc">{item.desc}</p>
                </div>
                <div className="about__timeline-dot" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          VALUES
      ══════════════════════════════════════════════════ */}
      <section className="about__values-section">
        <div className="about__section-divider" aria-hidden="true" />
        <div className="container">

          <motion.div className="about__section-header" {...fadeUp(0)}>
            <span className="about__section-eyebrow">Principles</span>
            <h2 className="about__section-title">What I stand for</h2>
          </motion.div>

          <div className="about__values-grid">
            {values.map((v, i) => (
              <motion.div key={v.label} className="about__value-card" {...fadeUp(i * 0.1)}>
                <span className="about__value-icon">{v.icon}</span>
                <h3 className="about__value-label">{v.label}</h3>
                <p className="about__value-desc">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          EXPERIENCE SNAPSHOT
      ══════════════════════════════════════════════════ */}
      <section className="about__experience-section">
        <div className="about__section-divider" aria-hidden="true" />
        <div className="container">

          <motion.div className="about__section-header" {...fadeUp(0)}>
            <span className="about__section-eyebrow">Experience</span>
            <h2 className="about__section-title">Where I've worked</h2>
          </motion.div>

          <motion.div className="about__experience-card" {...fadeUp(0.1)}>
            <div className="about__experience-header">
              <div>
                <h3 className="about__experience-role">Full Stack Developer</h3>
                <p className="about__experience-company">Cyber Space Software House — Multan, Pakistan</p>
              </div>
              <span className="about__experience-date">Feb 2024 – Present</span>
            </div>
            <ul className="about__experience-list">
              <li>Engineered and maintained full stack web apps using Next.js, React.js, TypeScript, and Node.js with MySQL and PostgreSQL databases.</li>
              <li>Designed and built RESTful APIs, integrating backend services with dynamic frontend interfaces for seamless data flow.</li>
              <li>Built interactive features including shopping carts, booking systems, and real-time order calculation using React state management.</li>
              <li>Implemented reusable, component-based UI architecture to ensure scalable, maintainable codebases across multiple projects.</li>
              <li>Ensured cross-browser compatibility and mobile responsiveness via Tailwind CSS, Bootstrap, and custom CSS/Sass.</li>
              <li>Participated in code reviews, enforcing quality standards and clean code practices across the team.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════ */}
      <section className="about__cta-section">
        <div className="about__section-divider" aria-hidden="true" />
        <div className="container">
          <motion.div className="about__cta-card" {...fadeUp(0)}>
            <div className="about__cta-orb about__cta-orb--l" aria-hidden="true" />
            <div className="about__cta-orb about__cta-orb--r" aria-hidden="true" />
            <span className="about__section-eyebrow">Ready?</span>
            <h2 className="about__cta-title">Let&apos;s build something you&apos;re proud of.</h2>
            <p className="about__cta-sub">
              Whether it&apos;s a greenfield SaaS, a performance overhaul, or a design-system
              rebuild — I bring the full stack and the care to match.
            </p>
            <div className="about__cta-actions">
              <Link to="/contact"><Button>Start a conversation</Button></Link>
              <Link to="/projects"><Button variant="ghost">Browse my work</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;