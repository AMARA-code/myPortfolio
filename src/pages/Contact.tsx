import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import ContactForm from "../components/contact/ContactForm";

// ─── SVG Character Frames ─────────────────────────────────────────────────────
// Frame 0 – neutral stance
const F0 = (
  <svg viewBox="0 0 56 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow0">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <radialGradient id="hg0" cx="35%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#7dd3fc" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </radialGradient>
      <radialGradient id="bg0" cx="35%" cy="25%" r="65%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </radialGradient>
    </defs>
    {/* Head */}
    <circle cx="28" cy="13" r="11" fill="url(#hg0)" filter="url(#glow0)" />
    {/* Head shine */}
    <ellipse cx="23" cy="9" rx="4" ry="3" fill="rgba(255,255,255,0.18)" />
    {/* Neck */}
    <rect x="24" y="23" width="8" height="5" rx="2.5" fill="#38bdf8" opacity="0.82" />
    {/* Body */}
    <rect x="14" y="28" width="28" height="30" rx="9" fill="url(#bg0)" opacity="0.95" />
    {/* Body shine */}
    <rect x="16" y="30" width="11" height="10" rx="4" fill="rgba(255,255,255,0.14)" />
    {/* Left arm */}
    <rect x="5" y="30" width="8" height="20" rx="4" fill="#38bdf8" opacity="0.82" />
    {/* Right arm */}
    <rect x="43" y="30" width="8" height="20" rx="4" fill="#38bdf8" opacity="0.82" />
    {/* Left leg */}
    <rect x="15" y="58" width="10" height="26" rx="5" fill="#0369a1" opacity="0.92" />
    {/* Right leg */}
    <rect x="31" y="58" width="10" height="26" rx="5" fill="#0369a1" opacity="0.92" />
    {/* Left shoe */}
    <ellipse cx="20" cy="85" rx="9" ry="4.5" fill="#075985" />
    {/* Right shoe */}
    <ellipse cx="36" cy="85" rx="9" ry="4.5" fill="#075985" />
    {/* Eyes */}
    <circle cx="23" cy="11" r="2.4" fill="#0c4a6e" />
    <circle cx="33" cy="11" r="2.4" fill="#0c4a6e" />
    {/* Eye shine */}
    <circle cx="24" cy="10" r="0.9" fill="rgba(255,255,255,0.65)" />
    <circle cx="34" cy="10" r="0.9" fill="rgba(255,255,255,0.65)" />
    {/* Smile */}
    <path d="M23 17 Q28 21.5 33 17" stroke="#0c4a6e" strokeWidth="1.6" strokeLinecap="round" fill="none" />
  </svg>
);

// Frame 1 – stride right leg forward
const F1 = (
  <svg viewBox="0 0 56 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow1"><feGaussianBlur stdDeviation="2.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      <radialGradient id="hg1" cx="35%" cy="35%" r="60%"><stop offset="0%" stopColor="#7dd3fc" /><stop offset="100%" stopColor="#0ea5e9" /></radialGradient>
      <radialGradient id="bg1" cx="35%" cy="25%" r="65%"><stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#0ea5e9" /></radialGradient>
    </defs>
    <circle cx="28" cy="13" r="11" fill="url(#hg1)" filter="url(#glow1)" />
    <ellipse cx="23" cy="9" rx="4" ry="3" fill="rgba(255,255,255,0.18)" />
    <rect x="24" y="23" width="8" height="5" rx="2.5" fill="#38bdf8" opacity="0.82" />
    <rect x="14" y="28" width="28" height="30" rx="9" fill="url(#bg1)" opacity="0.95" />
    <rect x="16" y="30" width="11" height="10" rx="4" fill="rgba(255,255,255,0.14)" />
    <rect x="4" y="26" width="8" height="20" rx="4" fill="#38bdf8" opacity="0.82" transform="rotate(-22 8 36)" />
    <rect x="44" y="26" width="8" height="20" rx="4" fill="#38bdf8" opacity="0.82" transform="rotate(22 48 36)" />
    <rect x="15" y="58" width="10" height="26" rx="5" fill="#0369a1" opacity="0.92" transform="rotate(-22 20 58)" />
    <rect x="31" y="58" width="10" height="26" rx="5" fill="#0369a1" opacity="0.92" transform="rotate(22 36 58)" />
    <ellipse cx="14" cy="83" rx="9" ry="4.5" fill="#075985" transform="rotate(-22 14 83)" />
    <ellipse cx="42" cy="83" rx="9" ry="4.5" fill="#075985" transform="rotate(22 42 83)" />
    <circle cx="23" cy="11" r="2.4" fill="#0c4a6e" /><circle cx="33" cy="11" r="2.4" fill="#0c4a6e" />
    <circle cx="24" cy="10" r="0.9" fill="rgba(255,255,255,0.65)" /><circle cx="34" cy="10" r="0.9" fill="rgba(255,255,255,0.65)" />
    <path d="M23 17 Q28 21.5 33 17" stroke="#0c4a6e" strokeWidth="1.6" strokeLinecap="round" fill="none" />
  </svg>
);

// Frame 2 – stride left leg forward
const F2 = (
  <svg viewBox="0 0 56 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow2"><feGaussianBlur stdDeviation="2.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      <radialGradient id="hg2" cx="35%" cy="35%" r="60%"><stop offset="0%" stopColor="#7dd3fc" /><stop offset="100%" stopColor="#0ea5e9" /></radialGradient>
      <radialGradient id="bg2" cx="35%" cy="25%" r="65%"><stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#0ea5e9" /></radialGradient>
    </defs>
    <circle cx="28" cy="13" r="11" fill="url(#hg2)" filter="url(#glow2)" />
    <ellipse cx="23" cy="9" rx="4" ry="3" fill="rgba(255,255,255,0.18)" />
    <rect x="24" y="23" width="8" height="5" rx="2.5" fill="#38bdf8" opacity="0.82" />
    <rect x="14" y="28" width="28" height="30" rx="9" fill="url(#bg2)" opacity="0.95" />
    <rect x="16" y="30" width="11" height="10" rx="4" fill="rgba(255,255,255,0.14)" />
    <rect x="4" y="26" width="8" height="20" rx="4" fill="#38bdf8" opacity="0.82" transform="rotate(22 8 36)" />
    <rect x="44" y="26" width="8" height="20" rx="4" fill="#38bdf8" opacity="0.82" transform="rotate(-22 48 36)" />
    <rect x="15" y="58" width="10" height="26" rx="5" fill="#0369a1" opacity="0.92" transform="rotate(22 20 58)" />
    <rect x="31" y="58" width="10" height="26" rx="5" fill="#0369a1" opacity="0.92" transform="rotate(-22 36 58)" />
    <ellipse cx="22" cy="83" rx="9" ry="4.5" fill="#075985" transform="rotate(22 22 83)" />
    <ellipse cx="34" cy="83" rx="9" ry="4.5" fill="#075985" transform="rotate(-22 34 83)" />
    <circle cx="23" cy="11" r="2.4" fill="#0c4a6e" /><circle cx="33" cy="11" r="2.4" fill="#0c4a6e" />
    <circle cx="24" cy="10" r="0.9" fill="rgba(255,255,255,0.65)" /><circle cx="34" cy="10" r="0.9" fill="rgba(255,255,255,0.65)" />
    <path d="M23 17 Q28 21.5 33 17" stroke="#0c4a6e" strokeWidth="1.6" strokeLinecap="round" fill="none" />
  </svg>
);

// Frame 3 – phone call pose (right arm raised)
const F3 = (
  <svg viewBox="0 0 56 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow3"><feGaussianBlur stdDeviation="2.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      <radialGradient id="hg3" cx="35%" cy="35%" r="60%"><stop offset="0%" stopColor="#7dd3fc" /><stop offset="100%" stopColor="#0ea5e9" /></radialGradient>
      <radialGradient id="bg3" cx="35%" cy="25%" r="65%"><stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#0ea5e9" /></radialGradient>
    </defs>
    <circle cx="28" cy="13" r="11" fill="url(#hg3)" filter="url(#glow3)" />
    <ellipse cx="23" cy="9" rx="4" ry="3" fill="rgba(255,255,255,0.18)" />
    <rect x="24" y="23" width="8" height="5" rx="2.5" fill="#38bdf8" opacity="0.82" />
    <rect x="14" y="28" width="28" height="30" rx="9" fill="url(#bg3)" opacity="0.95" />
    <rect x="16" y="30" width="11" height="10" rx="4" fill="rgba(255,255,255,0.14)" />
    {/* Left arm normal */}
    <rect x="5" y="30" width="8" height="20" rx="4" fill="#38bdf8" opacity="0.82" />
    {/* Right arm raised – holding phone */}
    <rect x="42" y="10" width="8" height="22" rx="4" fill="#38bdf8" opacity="0.82" transform="rotate(-55 46 21)" />
    {/* Phone */}
    <rect x="38" y="2" width="10" height="15" rx="2.5" fill="#0c4a6e" opacity="0.95" />
    <rect x="39.5" y="3.5" width="7" height="10" rx="1.5" fill="#38bdf8" opacity="0.45" />
    <circle cx="43" cy="15.5" r="1" fill="#38bdf8" opacity="0.7" />
    {/* Legs */}
    <rect x="15" y="58" width="10" height="26" rx="5" fill="#0369a1" opacity="0.92" transform="rotate(-8 20 58)" />
    <rect x="31" y="58" width="10" height="26" rx="5" fill="#0369a1" opacity="0.92" transform="rotate(8 36 58)" />
    <ellipse cx="18" cy="84" rx="9" ry="4.5" fill="#075985" />
    <ellipse cx="38" cy="84" rx="9" ry="4.5" fill="#075985" />
    <circle cx="23" cy="11" r="2.4" fill="#0c4a6e" /><circle cx="33" cy="11" r="2.4" fill="#0c4a6e" />
    <circle cx="24" cy="10" r="0.9" fill="rgba(255,255,255,0.65)" /><circle cx="34" cy="10" r="0.9" fill="rgba(255,255,255,0.65)" />
    <path d="M23 17 Q28 20 33 17" stroke="#0c4a6e" strokeWidth="1.6" strokeLinecap="round" fill="none" />
  </svg>
);

const WALK_FRAMES = [F0, F1, F2, F1];

const BUBBLE_MESSAGES = [
  "👋 Let's connect!",
  "📞 On a call~",
  "💡 Got an idea?",
  "🚀 Let's build it!",
  "✨ Say hello!",
  "🎯 Ready to work!",
  "☕ Grab a coffee?",
  "🔥 Let's create!",
];

// ─── Vertical Walking Character ───────────────────────────────────────────────
const WalkingCharacter = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
    restDelta: 0.001,
  });

  const yPct     = useTransform(smoothProgress, [0, 1], ["0%", "80%"]);
  const bobY     = useTransform(smoothProgress, [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 0.87, 1], [0, -5, 0, -5, 0, -5, 0, -5, 0]);
  const rotateX3d = useTransform(smoothProgress, [0, 0.5, 1], [10, 0, -10]);
  const scaleVal = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.06, 1]);
  const glowOp   = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [0.3, 1, 0.8, 0.3]);
  const trackFill = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const [frame, setFrame]   = useState(0);
  const [onPhone, setOnPhone] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>();

  const triggerBubble = useCallback(() => {
    const msg = BUBBLE_MESSAGES[Math.floor(Math.random() * BUBBLE_MESSAGES.length)];
    setBubble(msg);
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), 2600);
  }, []);

  useEffect(() => {
    let lastV = 0;
    let tick  = 0;
    const unsub = smoothProgress.on("change", (v) => {
      tick++;
      if (tick % 8 === 0) setFrame((f) => (f + 1) % 4);
      const thresholds = [0.2, 0.45, 0.7, 0.9];
      thresholds.forEach((t) => {
        if ((lastV < t && v >= t) || (lastV > t && v <= t)) {
          const phone = Math.random() < 0.35;
          if (phone) {
            setOnPhone(true);
            triggerBubble();
            setTimeout(() => setOnPhone(false), 2200);
          } else {
            triggerBubble();
          }
        }
      });
      lastV = v;
    });
    return () => { unsub(); clearTimeout(bubbleTimer.current); };
  }, [smoothProgress, triggerBubble]);

  return (
    <div ref={containerRef} className="character-track" aria-hidden="true">
      {/* Rail */}
      <div className="character-track__rail">
        <motion.div className="character-track__rail-fill" style={{ height: trackFill }} />
        <div className="character-track__rail-dot character-track__rail-dot--top" />
        <div className="character-track__rail-dot character-track__rail-dot--bottom" />
      </div>

      {/* Footprint trail */}
      {[0.15, 0.3, 0.45, 0.6, 0.75].map((p, i) => (
        <motion.div
          key={i}
          className="character-track__footprint"
          style={{ top: `${p * 100}%` }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Figure */}
      <motion.div
        className="character-track__figure"
        style={{
          top: yPct,
          y: bobY,
          rotateX: rotateX3d,
          scale: scaleVal,
          transformStyle: "preserve-3d",
          perspective: 600,
        }}
      >
        {/* Glow ring */}
        <motion.div
          className="character-track__glow-ring"
          style={{ opacity: glowOp }}
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ground shadow */}
        <motion.div className="character-track__ground-shadow" style={{ opacity: glowOp }} />

        {/* SVG */}
        <motion.div
          className="character-track__svg"
          animate={{ rotateY: onPhone ? [0, -8, 0] : 0 }}
          transition={{ duration: 0.4, repeat: onPhone ? Infinity : 0 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {onPhone ? F3 : WALK_FRAMES[frame]}
        </motion.div>

        {/* Speech bubble */}
        <AnimatePresence>
          {bubble && (
            <motion.div
              className="character-track__bubble"
              key={bubble}
              initial={{ opacity: 0, scale: 0.6, x: 10, y: 5 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: -5 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
            >
              {bubble}
              <span className="character-track__bubble-tail" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// ─── 3D Tilt Detail Card ──────────────────────────────────────────────────────
const DetailCard = ({
  href, label, value, icon, external, delay, colorClass,
}: {
  href: string; label: string; value: string;
  icon: React.ReactNode; external?: boolean; delay: number; colorClass?: string;
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    rx.set(-((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 8);
    ry.set( ((e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)) * 8);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.a
      ref={cardRef}
      href={href}
      className={`contact__detail${colorClass ? ` contact__detail--${colorClass}` : ""}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 800 }}
      initial={{ opacity: 0, x: -28, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ z: 8 }}
    >
      <motion.span
        className={`contact__detail-icon contact__detail-icon--${colorClass ?? "sky"}`}
        style={{ translateZ: 10 }}
        whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
      >
        {icon}
      </motion.span>
      <span className="contact__detail-text">
        <span className="contact__detail-label">{label}</span>
        <span className="contact__detail-value">{value}</span>
      </span>
      <motion.span className="contact__detail-arrow" style={{ translateZ: 8 }}>›</motion.span>
    </motion.a>
  );
};

// ─── Floating Particles ───────────────────────────────────────────────────────
const Particles = () => (
  <div className="particles" aria-hidden="true">
    {Array.from({ length: 24 }).map((_, i) => (
      <motion.span
        key={i}
        className="particle"
        style={{
          left: `${5 + (i * 37) % 90}%`,
          top:  `${8 + (i * 53) % 84}%`,
          width:  `${2 + (i % 5) * 1.5}px`,
          height: `${2 + (i % 5) * 1.5}px`,
        }}
        animate={{ y: [0, -22, 0], opacity: [0.15, 0.7, 0.15], scale: [1, 1.3, 1] }}
        transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: (i * 0.38) % 4.5, ease: "easeInOut" }}
      />
    ))}
  </div>
);

// ─── Ticker ───────────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  "React" , "Next.js", "Node.js", "TypeScript", "Framer Motion",
   "PostgreSQL", "UI/UX Design", "Figma",
  "REST APIs", "Tailwind CSS", "Full Stack Dev",
  "Git & GitHub", "javascript" , "npm" , "vite" , "mysql"
];

const Ticker = () => {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="contact__ticker-wrapper" aria-hidden="true">
      <motion.div
        className="contact__ticker"
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="contact__ticker-item">
            <span className={`contact__ticker-dot contact__ticker-dot--${i % 3 === 0 ? "sky" : "ind"}`} />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Process Step Card ────────────────────────────────────────────────────────
const ProcessStep = ({
  num, icon, title, desc, delay,
}: { num: string; icon: string; title: string; desc: string; delay: number }) => (
  <motion.div
    className="contact__process-step"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
  >
    <span className="contact__step-num">{num}</span>
    <span className="contact__step-icon">{icon}</span>
    <div className="contact__step-title">{title}</div>
    <div className="contact__step-desc">{desc}</div>
  </motion.div>
);

// ─── Service Card ─────────────────────────────────────────────────────────────
const ServiceCard = ({
  icon, title, desc, tags, color, delay,
}: {
  icon: string; title: string; desc: string;
  tags: string[]; color: "sky" | "ind" | "grn"; delay: number;
}) => (
  <motion.div
    className={`contact__service-card contact__service-card--${color}`}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className={`contact__service-icon contact__service-icon--${color}`}>{icon}</div>
    <div className="contact__service-title">{title}</div>
    <div className="contact__service-desc">{desc}</div>
    <div className="contact__service-tags">
      {tags.map((t) => <span key={t} className="contact__service-tag">{t}</span>)}
    </div>
  </motion.div>
);

// ─── Contact Details Data ─────────────────────────────────────────────────────
const CONTACT_DETAILS = [
  { href: "mailto:amaranaeem453@gmail.com", label: "Email",    value: "amaranaeem453@gmail.com",       icon: "✉",  colorClass: "sky" },
  { href: "tel:+923346445127",              label: "Phone",    value: "+92 334 6445127",               icon: "☎",  colorClass: "grn" },
  { href: "https://github.com/AMARA-code",  label: "GitHub",   value: "github.com/AMARA-code",         icon: "⌥",  colorClass: "ind", external: true },
  { href: "https://www.linkedin.com/in/amara-naeem/", label: "LinkedIn", value: "linkedin.com/in/amara-naeem", icon: "in", colorClass: "ind", external: true },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
const Contact = () => {
  return (
    <section className="page contact">
      <Particles />

      {/* Ambient orbs */}
      <div className="contact__orb contact__orb--1" aria-hidden="true" />
      <div className="contact__orb contact__orb--2" aria-hidden="true" />
      <div className="contact__orb contact__orb--3" aria-hidden="true" />
      <div className="contact__orb contact__orb--4" aria-hidden="true" />

      {/* 3-D depth grid */}
      <div className="contact__grid-overlay" aria-hidden="true" />

      {/* ── HERO BAND ── */}
      <motion.div
        className="contact__hero"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="contact__hero-eyebrow">
          <span className="contact__hero-eyebrow-line" />
          <span className="eyebrow-dot" />
          Contact
          <span className="contact__hero-eyebrow-line contact__hero-eyebrow-line--flip" />
        </div>

        <h1 className="contact__hero-title">
          Let&apos;s build something<br />
          <span className="contact__hero-grad">extraordinary together.</span>
        </h1>

        <p className="contact__hero-sub">
          Whether it&apos;s a startup product, enterprise app, or a bold new idea —
          I&apos;m here to help you bring it to life with clean code and polished design.
        </p>

        <div className="contact__hero-chips">
          {["React & Next.js", "Node.js", "TypeScript", "UI/UX Design", "Framer Motion", "Full Stack Dev", "REST APIs", "MongoDB"].map((c, i) => (
            <span key={c} className={`contact__chip${i % 3 === 0 ? " contact__chip--ind" : ""}`}>{c}</span>
          ))}
        </div>
      </motion.div>

      {/* ── STATS STRIP ── */}
      <motion.div
        className="contact__stats"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {[
          { val: "10+",  lbl: "Projects Shipped",   ind: false },
          { val: "3+",   lbl: "Years Experience",    ind: true  },
          { val: "100%", lbl: "Client Satisfaction", ind: false },
          { val: "48h",  lbl: "Avg Response Time",   ind: true  },
          { val: "15+",  lbl: "Technologies",        ind: false },
        ].map(({ val, lbl, ind }) => (
          <div key={lbl} className="contact__stat">
            <span className={`contact__stat-val${ind ? " contact__stat-val--ind" : ""}`}>{val}</span>
            <span className="contact__stat-lbl">{lbl}</span>
          </div>
        ))}
      </motion.div>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── MAIN GRID ── */}
      <div className="container contact__container">

        {/* Left column */}
        <motion.div
          className="contact__intro"
          initial={{ opacity: 0, x: -44, rotateY: -6 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        >
          <p className="page-eyebrow">
            <span className="eyebrow-dot" />
            Get in Touch
          </p>

          <h2 className="page-title">
            Let&apos;s talk about your{" "}
            <span className="title-highlight">next project,</span>
            <br />product, or idea.
          </h2>

          <p className="page-lead">
            Whether you&apos;re looking to refresh an existing product or build
            something entirely new, I&apos;d love to hear more. Share a few details and
            I&apos;ll get back to you as soon as possible.
          </p>

          <div className="contact__details">
            {CONTACT_DETAILS.map((d, i) => (
              <DetailCard key={d.label} {...d} delay={0.08 * i} />
            ))}
          </div>

          {/* Availability badge */}
          <motion.div
            className="contact__avail"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="contact__avail-dot" />
            Available for new projects — May 2026
          </motion.div>
        </motion.div>

        {/* Right column */}
        <div className="contact__right">
          <WalkingCharacter />
          <ContactForm />
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="contact__divider" aria-hidden="true" />

      {/* ── PROCESS SECTION ── */}
      <div className="contact__section contact__section--process">
        <motion.div
          className="contact__section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="contact__section-tag contact__section-tag--ind">
            <span className="contact__section-tag-dot" />
            How it Works
          </div>
          <h2 className="contact__section-title">
            From idea to <span className="contact__section-grad">launch</span>
          </h2>
          <p className="contact__section-sub">
            A clear, collaborative process that keeps you in control every step of the way.
          </p>
        </motion.div>

        <div className="contact__process-grid">
          <ProcessStep num="01" icon="💬" title="Discovery Call"    delay={0.05} desc="We discuss your goals, requirements, and vision. I ask the right questions to understand what success looks like for you." />
          <ProcessStep num="02" icon="🎨" title="Design & Plan"     delay={0.12} desc="Wireframes, tech-stack decisions, and a clear roadmap with milestones and deliverables — before a single line of code." />
          <ProcessStep num="03" icon="⚡" title="Build & Iterate"   delay={0.19} desc="Development with regular check-ins. You get updates as each feature ships, with room for feedback and course corrections." />
          <ProcessStep num="04" icon="🚀" title="Deploy & Support"  delay={0.26} desc="We launch with confidence. Post-launch monitoring, support, and iterations keep everything running smoothly." />
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="contact__divider" aria-hidden="true" />

      {/* ── SERVICES SECTION ── */}
      <div className="contact__section contact__section--services">
        <motion.div
          className="contact__section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="contact__section-tag">
            <span className="contact__section-tag-dot contact__section-tag-dot--sky" />
            Services
          </div>
          <h2 className="contact__section-title">
            What I can <span className="title-highlight">build for you</span>
          </h2>
          <p className="contact__section-sub">
            End-to-end development across the full stack — from pixel-perfect UIs to scalable back-end systems.
          </p>
        </motion.div>

        <div className="contact__services-grid">
          <ServiceCard
            icon="⚛" title="Frontend Development" color="sky" delay={0.05}
            desc="Blazing-fast, accessible, animated UIs with React, Next.js, and TypeScript. Pixel-perfect from Figma to production."
            tags={["React", "Next.js", "TypeScript", "Framer Motion", "Tailwind"]}
          />
          <ServiceCard
            icon="🛠" title="Backend & APIs" color="ind" delay={0.12}
            desc="Scalable REST and GraphQL APIs with Node.js and cloud-native architecture — secure, documented, and fast."
            tags={["Node.js", "Express", "MongoDB", "PostgreSQL", "REST"]}
          />
          <ServiceCard
            icon="🎨" title="UI/UX Design" color="grn" delay={0.19}
            desc="Thoughtful design systems, interactive prototypes, and user-centric interfaces that convert and delight on every screen."
            tags={["Figma", "Design Systems", "Prototyping", "Responsive"]}
          />
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="contact__divider" aria-hidden="true" />

      {/* ── QUOTE BAND ── */}
      <motion.div
        className="contact__quote-band"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="contact__quote-mark">&ldquo;</div>
        <p className="contact__quote-text">
          The best projects happen when a developer understands not just the code,
          but the people using it. Let&apos;s build something your users will love.
        </p>
        <div className="contact__quote-author">— Amara Naeem, Full Stack Developer</div>
      </motion.div>

      {/* ── DIVIDER ── */}
      <div className="contact__divider" aria-hidden="true" />

      {/* ── CTA BAND ── */}
      <motion.div
        className="contact__cta-band"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="contact__cta-left">
          <h2 className="contact__cta-title">
            Ready to start your{" "}
            <span className="contact__hero-grad">next project?</span>
          </h2>
          <p className="contact__cta-sub">
            Don&apos;t let your idea wait. Drop me a message and let&apos;s turn your vision
            into a product people love. Response within 24–48 hours, always.
          </p>
        </div>
        <div className="contact__cta-actions">
          <a href="#contact-form" className="contact__cta-btn contact__cta-btn--primary">
            Start a Conversation
          </a>
          <a
            href="mailto:amaranaeem453@gmail.com"
            className="contact__cta-btn contact__cta-btn--secondary"
          >
            Email Directly
          </a>
        </div>
      </motion.div>

    </section>
  );
};

export default Contact;