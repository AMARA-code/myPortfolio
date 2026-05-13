import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ── Stellar Constellation Avatar (more premium than navbar gem) ───────────────
const AvatarConstellation = () => (
  <svg
    className="footer__avatar-svg"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      {/* Outer halo */}
      <radialGradient id="ft-halo" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#a78bfa" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#0f0a1e" stopOpacity="0" />
      </radialGradient>

      {/* Primary ring gradient */}
      <linearGradient id="ft-ring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#c4b5fd" />
        <stop offset="40%"  stopColor="#818cf8" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>

      {/* Inner ring */}
      <linearGradient id="ft-ring2" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.5" />
      </linearGradient>

      {/* Monogram gradient */}
      <linearGradient id="ft-glyph" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#e9d5ff" />
        <stop offset="100%" stopColor="#67e8f9" />
      </linearGradient>

      {/* Gem facets */}
      <linearGradient id="ft-f1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#2d1a5e" />
        <stop offset="100%" stopColor="#160a30" />
      </linearGradient>
      <linearGradient id="ft-f2" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#1e1150" />
        <stop offset="100%" stopColor="#0f0828" />
      </linearGradient>

      {/* Glow filter */}
      <filter id="ft-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Soft shine filter */}
      <filter id="ft-shine" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Ambient halo glow */}
    <circle cx="32" cy="32" r="32" fill="url(#ft-halo)" />

    {/* Outermost dashed orbit ring */}
    <circle
      cx="32" cy="32" r="30"
      stroke="url(#ft-ring)"
      strokeWidth="0.6"
      strokeDasharray="3 4"
      opacity="0.35"
    />

    {/* Outer solid ring */}
    <circle
      cx="32" cy="32" r="27"
      stroke="url(#ft-ring)"
      strokeWidth="1"
      fill="none"
      opacity="0.6"
    />

    {/* Inner accent ring */}
    <circle
      cx="32" cy="32" r="23.5"
      stroke="url(#ft-ring2)"
      strokeWidth="0.7"
      fill="#0f0a1e"
    />

    {/* ── Main gem body ── */}
    {/* Outer hexagonal gem */}
    <polygon
      points="32,10 46,19 46,37 32,46 18,37 18,19"
      fill="url(#ft-f1)"
    />

    {/* Facet highlights */}
    <polygon points="32,10 46,19 32,28"  fill="#3b2270" />
    <polygon points="32,10 18,19 32,28"  fill="#2d1960" />
    <polygon points="46,19 46,37 32,32"  fill="#261455" />
    <polygon points="18,19 18,37 32,32"  fill="#1e1048" />
    <polygon points="46,37 32,46 32,32"  fill="#2a1858" />
    <polygon points="18,37 32,46 32,32"  fill="#231245" />

    {/* Edge lines */}
    <polygon
      points="32,10 46,19 46,37 32,46 18,37 18,19"
      fill="none"
      stroke="url(#ft-ring)"
      strokeWidth="0.5"
      opacity="0.5"
    />
    <line x1="32" y1="10" x2="32" y2="32" stroke="#818cf8" strokeWidth="0.4" opacity="0.45" />
    <line x1="46" y1="19" x2="32" y2="32" stroke="#818cf8" strokeWidth="0.4" opacity="0.35" />
    <line x1="18" y1="19" x2="32" y2="32" stroke="#818cf8" strokeWidth="0.4" opacity="0.35" />
    <line x1="46" y1="37" x2="32" y2="32" stroke="#818cf8" strokeWidth="0.3" opacity="0.3"  />
    <line x1="18" y1="37" x2="32" y2="32" stroke="#818cf8" strokeWidth="0.3" opacity="0.3"  />

    {/* ── Inner gem (nested — more premium depth) ── */}
    <polygon
      points="32,15 41,22 41,34 32,41 23,34 23,22"
      fill="none"
      stroke="#a78bfa"
      strokeWidth="0.4"
      opacity="0.25"
    />

    {/* Top-left shine facet */}
    <polygon
      points="32,10 40,16 32,20"
      fill="#ffffff"
      opacity="0.07"
    />

    {/* Monogram */}
    <text
      x="32" y="37"
      textAnchor="middle"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="18"
      fontWeight="700"
      fill="url(#ft-glyph)"
      filter="url(#ft-shine)"
    >
      A
    </text>

    {/* ── Constellation star dots on outer ring ── */}
    {/* Top */}
    <circle cx="32"  cy="3"  r="2"   fill="#c4b5fd" filter="url(#ft-glow)" />
    {/* Top-right */}
    <circle cx="56"  cy="14" r="1.5" fill="#38bdf8"  filter="url(#ft-glow)" />
    {/* Right */}
    <circle cx="61"  cy="32" r="1.5" fill="#818cf8"  filter="url(#ft-glow)" />
    {/* Bottom-right */}
    <circle cx="56"  cy="50" r="1.5" fill="#38bdf8"  filter="url(#ft-glow)" />
    {/* Bottom */}
    <circle cx="32"  cy="61" r="2"   fill="#c4b5fd"  filter="url(#ft-glow)" />
    {/* Bottom-left */}
    <circle cx="8"   cy="50" r="1.5" fill="#818cf8"  filter="url(#ft-glow)" />
    {/* Left */}
    <circle cx="3"   cy="32" r="1.5" fill="#38bdf8"  filter="url(#ft-glow)" />
    {/* Top-left */}
    <circle cx="8"   cy="14" r="1.5" fill="#a78bfa"  filter="url(#ft-glow)" />

    {/* Connecting constellation lines */}
    <line x1="32" y1="3"  x2="56" y2="14" stroke="#818cf8" strokeWidth="0.3" opacity="0.2" />
    <line x1="56" y1="14" x2="61" y2="32" stroke="#818cf8" strokeWidth="0.3" opacity="0.2" />
    <line x1="61" y1="32" x2="56" y2="50" stroke="#818cf8" strokeWidth="0.3" opacity="0.2" />
    <line x1="56" y1="50" x2="32" y2="61" stroke="#818cf8" strokeWidth="0.3" opacity="0.2" />
    <line x1="32" y1="61" x2="8"  y2="50" stroke="#818cf8" strokeWidth="0.3" opacity="0.2" />
    <line x1="8"  y1="50" x2="3"  y2="32" stroke="#818cf8" strokeWidth="0.3" opacity="0.2" />
    <line x1="3"  y1="32" x2="8"  y2="14" stroke="#818cf8" strokeWidth="0.3" opacity="0.2" />
    <line x1="8"  y1="14" x2="32" y2="3"  stroke="#818cf8" strokeWidth="0.3" opacity="0.2" />
  </svg>
);

// ── Social icon SVGs ──────────────────────────────────────────────────────────
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

// ── Nav links data ────────────────────────────────────────────────────────────
const navLinks = [
  { path: "/",         label: "Home"     },
  { path: "/about",    label: "About"    },
  { path: "/projects", label: "Projects" },
  { path: "/skills",   label: "Skills"   },
  { path: "/contact",  label: "Contact"  },
];

// ── Footer component ──────────────────────────────────────────────────────────
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* Top border shimmer */}
      <div className="footer__shimmer" aria-hidden="true" />

      {/* Ambient glow orbs */}
      <div className="footer__orb footer__orb--left"  aria-hidden="true" />
      <div className="footer__orb footer__orb--right" aria-hidden="true" />

      <motion.div
        className="footer__container"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >

        {/* ── Brand block ── */}
        <div className="footer__brand">
          <motion.div
            className="footer__avatar"
            whileHover={{ scale: 1.05, rotate: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <AvatarConstellation />
          </motion.div>

          <div className="footer__brand-text">
            <span className="footer__name">Amara Naeem</span>
            <span className="footer__role">Full Stack Developer</span>
            <p className="footer__tagline">
              Crafting elegant digital experiences from idea to deployment.
            </p>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="footer__divider" aria-hidden="true" />

        {/* ── Nav + Social ── */}
        <div className="footer__cols">

          {/* Site map */}
          <div className="footer__col">
            <h3 className="footer__col-heading">Navigation</h3>
            <ul className="footer__nav">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <Link to={link.path} className="footer__nav-link">
                    <span className="footer__nav-num">0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact/social */}
          <div className="footer__col">
            <h3 className="footer__col-heading">Connect</h3>
            <ul className="footer__nav">
              <motion.li
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <a
                  href="https://www.linkedin.com/in/amara-naeem/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer__nav-link footer__nav-link--social"
                >
                  <span className="footer__social-icon"><LinkedInIcon /></span>
                  LinkedIn
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.17, duration: 0.4 }}
              >
                <a
                  href="https://github.com/AMARA-code"
                  target="_blank"
                  rel="noreferrer"
                  className="footer__nav-link footer__nav-link--social"
                >
                  <span className="footer__social-icon"><GitHubIcon /></span>
                  GitHub
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.24, duration: 0.4 }}
              >
                <Link to="/contact" className="footer__nav-link footer__nav-link--social">
                  <span className="footer__social-icon footer__social-icon--dot" />
                  Get in touch
                </Link>
              </motion.li>
            </ul>
          </div>

          {/* CTA card */}
          <div className="footer__col footer__col--cta">
            <div className="footer__cta-card">
              <div className="footer__cta-card-glow" aria-hidden="true" />
              <p className="footer__cta-eyebrow">Open to opportunities</p>
              <p className="footer__cta-text">
                Available for freelance projects and full-time roles.
              </p>
              <Link to="/contact" className="footer__cta-btn">
                <span className="footer__cta-btn-dot" aria-hidden="true" />
                Let's work together
              </Link>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} Amara Naeem. All rights reserved.
          </p>
          <p className="footer__made">
            Designed & built with{" "}
            <span className="footer__heart" aria-label="love">♥</span>{" "}
            in React
          </p>
        </div>

      </motion.div>
    </footer>
  );
};

export default Footer;




