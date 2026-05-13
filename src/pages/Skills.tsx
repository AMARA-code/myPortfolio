import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import SkillBar from "../components/skills/SkillBar";

/* ─── Magnetic 3D tilt card ─────────────────────────────────────── */
const TiltCard = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`skills__card ${className ?? ""}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015 }}
    >
      <div className="skills__card-inner" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
      <span className="skills__card-shine" />
    </motion.div>
  );
};

/* ─── Floating orb ──────────────────────────────────────────────── */
const Orb = ({
  size,
  top,
  left,
  delay,
  color,
}: {
  size: number;
  top: string;
  left: string;
  delay: number;
  color: string;
}) => (
  <motion.div
    className="skills__orb"
    style={{ width: size, height: size, top, left, background: color }}
    animate={{ y: [0, -28, 0], scale: [1, 1.06, 1], opacity: [0.35, 0.55, 0.35] }}
    transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

/* ─── Ticker tape ───────────────────────────────────────────────── */
const TICKER_ITEMS = [
  "React.js", "Next.js", "TypeScript", "Node.js", "Tailwind CSS",
  "PostgreSQL", "Supabase", "REST APIs", "Figma", "CSS3 / Sass",
  "Git & GitHub", "Vite", "Vercel", "Accessibility", "Motion Design","vite", "netlify","npm / yarn","VS Code","Environment Variables & .env","Responsive Design","Modern Layouts","User-Centered Design","Interactive Components","Animations & Micro-interactions","Design Systems","Problem Solving","Adaptability","Ownership & Initiative","Teamwork & Collaboration","Clear Communication","Creativity"
];

const Ticker = () => {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="skills__ticker-wrapper" aria-hidden>
      <motion.div
        className="skills__ticker"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="skills__ticker-item">
            <span className="skills__ticker-dot" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Stat counter block ────────────────────────────────────────── */
const Stat = ({ value, label, delay }: { value: string; label: string; delay: number }) => (
  <motion.div
    className="skills__stat"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    <span className="skills__stat-value">{value}</span>
    <span className="skills__stat-label">{label}</span>
  </motion.div>
);

/* ─── Tag with magnetic hover ───────────────────────────────────── */
const MagTag = ({ label }: { label: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 18 });
  const sy = useSpring(y, { stiffness: 300, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLLIElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  return (
    <motion.li
      className="skills__tag"
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.08, borderColor: "rgba(56,189,248,0.7)" }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      {label}
    </motion.li>
  );
};

/* ─── Main page ─────────────────────────────────────────────────── */
const Skills = () => {
  return (
    <section className="page skills">
      {/* Ambient background orbs */}
      <div className="skills__orbs" aria-hidden>
        <Orb size={520} top="-12%" left="-8%"  delay={0}   color="radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)" />
        <Orb size={380} top="55%"  left="75%"  delay={1.4} color="radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" />
        <Orb size={260} top="30%"  left="50%"  delay={2.2} color="radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)" />
      </div>

      {/* Subtle grid overlay */}
      <div className="skills__grid-bg" aria-hidden />

      <div className="container skills__container">
        {/* ── Hero intro ── */}
        <motion.div
          className="skills__intro"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="page-eyebrow skills__eyebrow"
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.15em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Skills
          </motion.p>
          <h1 className="page-title skills__title">
            A full-stack toolkit for building{" "}
            <span className="skills__title-accent">modern, scalable,</span> and
            visually rich web applications — end to end.
          </h1>
          <p className="page-lead">
            I combine strong frontend engineering with backend architecture and
            database design, ensuring every project is technically solid,
            performant, and delightful to use.
          </p>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          className="skills__stats"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Stat value="3+" label="Years of Experience" delay={0.1} />
          <span className="skills__stats-divider" />
          <Stat value="15+" label="Technologies Mastered" delay={0.2} />
          <span className="skills__stats-divider" />
          <Stat value="10+" label="Projects Shipped" delay={0.3} />
          <span className="skills__stats-divider" />
          <Stat value="100%" label="Passion for Craft" delay={0.4} />
        </motion.div>

        {/* ── Ticker ── */}
        <Ticker />

        {/* ── Cards grid ── */}
        <div className="skills__grid">
          {/* Frontend */}
          <TiltCard delay={0.05}>
            <div className="skills__card-badge">01</div>
            <h2 className="skills__card-title">
              <span className="skills__card-icon">⬡</span>
              Frontend Development
            </h2>
            <div className="skills__bars">
              {[
                { label: "React.js",           level: 92 },
                { label: "Next.js",            level: 88 },
                { label: "TypeScript",         level: 88 },
                { label: "JavaScript (ES6+)",  level: 90 },
                { label: "Tailwind CSS",       level: 90 },
                { label: "CSS3 / Sass",        level: 93 },
                { label: "HTML5",              level: 95 },
                { label: "Bootstrap",          level: 82 },
              ].map((s, i) => (
                <SkillBar key={s.label} label={s.label} level={s.level} index={i} />
              ))}
            </div>
          </TiltCard>

          {/* Backend */}
          <TiltCard delay={0.1}>
            <div className="skills__card-badge">02</div>
            <h2 className="skills__card-title">
              <span className="skills__card-icon">◈</span>
              Backend Development
            </h2>
            <div className="skills__bars">
              {[
                { label: "Node.js",                 level: 84 },
                { label: "REST API Design",         level: 86 },
                { label: "Supabase",                level: 82 },
                { label: "PostgreSQL",              level: 80 },
                { label: "Authentication & RBAC",   level: 82 },
                { label: "Axios / API Integration", level: 88 },
              ].map((s, i) => (
                <SkillBar key={s.label} label={s.label} level={s.level} index={i} />
              ))}
            </div>
          </TiltCard>

          {/* Tools */}
          <TiltCard delay={0.15}>
            <div className="skills__card-badge">03</div>
            <h2 className="skills__card-title">
              <span className="skills__card-icon">◎</span>
              Tools &amp; Workflow
            </h2>
            <ul className="skills__tags">
              {["Git & GitHub","Vercel & Netlify","Vite","npm / yarn","VS Code","Figma","Postman","Environment Variables & .env"].map(t => (
                <MagTag key={t} label={t} />
              ))}
            </ul>
          </TiltCard>

          {/* UI/UX */}
          <TiltCard delay={0.2}>
            <div className="skills__card-badge">04</div>
            <h2 className="skills__card-title">
              <span className="skills__card-icon">◇</span>
              UI / UX Design
            </h2>
            <ul className="skills__tags">
              {["Responsive Design","Modern Layouts","User-Centered Design","Interactive Components","Animations & Micro-interactions","Design Systems","Accessibility (a11y)"].map(t => (
                <MagTag key={t} label={t} />
              ))}
            </ul>
          </TiltCard>

          {/* Soft Skills – full width */}
          <TiltCard delay={0.25} className="skills__card--wide">
            <div className="skills__card-badge">05</div>
            <h2 className="skills__card-title">
              <span className="skills__card-icon">◉</span>
              Soft Skills
            </h2>
            <ul className="skills__tags skills__tags--spread">
              {["Problem Solving","Adaptability","Ownership & Initiative","Teamwork & Collaboration","Clear Communication","Creativity"].map(t => (
                <MagTag key={t} label={t} />
              ))}
            </ul>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default Skills;