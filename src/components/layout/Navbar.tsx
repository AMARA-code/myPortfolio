import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { path: "/",        label: "Home"     },
  { path: "/about",   label: "About"    },
  { path: "/projects",label: "Projects" },
  { path: "/skills",  label: "Skills"   },
  { path: "/contact", label: "Contact"  },
];

// ── Premium geometric avatar SVG ─────────────────────────────────────────────
const AvatarGem = () => (
  <svg
    className="navbar__avatar-svg"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="av-ring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#a78bfa" />
        <stop offset="50%"  stopColor="#818cf8" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
      <linearGradient id="av-glyph" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#c4b5fd" />
        <stop offset="100%" stopColor="#67e8f9" />
      </linearGradient>
      <linearGradient id="av-f1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#2d1a5e" />
        <stop offset="100%" stopColor="#1a0d35" />
      </linearGradient>
      <linearGradient id="av-f2" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#251550" />
        <stop offset="100%" stopColor="#160a30" />
      </linearGradient>
    </defs>

    {/* Outer spinning ring */}
    <circle
      cx="24" cy="24" r="22"
      stroke="url(#av-ring)"
      strokeWidth="1"
      strokeDasharray="4 3"
      opacity="0.5"
    />

    {/* Solid inner ring */}
    <circle
      cx="24" cy="24" r="19"
      stroke="url(#av-ring)"
      strokeWidth="1.2"
      fill="#0f0a1e"
    />

    {/* Gem facets */}
    <polygon points="24,7 36,17 35,32 24,38 13,32 12,17" fill="url(#av-f1)" />
    <polygon points="24,7  36,17 24,22"  fill="#3b2270" />
    <polygon points="24,7  12,17 24,22"  fill="#301d62" />
    <polygon points="36,17 35,32 24,27"  fill="#261450" />
    <polygon points="12,17 13,32 24,27"  fill="#201040" />
    <polygon points="35,32 24,38 24,27"  fill="#2a1858" />
    <polygon points="13,32 24,38 24,27"  fill="#221245" />

    {/* Facet edge lines */}
    <polygon
      points="24,7 36,17 35,32 24,38 13,32 12,17"
      fill="none"
      stroke="#a78bfa"
      strokeWidth="0.4"
      opacity="0.45"
    />
    <line x1="24" y1="7"  x2="24" y2="27" stroke="#818cf8" strokeWidth="0.3" opacity="0.4" />
    <line x1="36" y1="17" x2="24" y2="27" stroke="#818cf8" strokeWidth="0.3" opacity="0.4" />
    <line x1="12" y1="17" x2="24" y2="27" stroke="#818cf8" strokeWidth="0.3" opacity="0.4" />

    {/* Monogram */}
    <text
      x="24" y="28"
      textAnchor="middle"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="14"
      fontWeight="700"
      fill="url(#av-glyph)"
    >
      A
    </text>

    {/* Corner accent dots on ring */}
    <circle cx="24"  cy="2"  r="1.5" fill="#a78bfa" />
    <circle cx="44"  cy="18" r="1.2" fill="#38bdf8" />
    <circle cx="44"  cy="30" r="1.2" fill="#818cf8" />
    <circle cx="24"  cy="46" r="1.5" fill="#a78bfa" />
    <circle cx="4"   cy="30" r="1.2" fill="#38bdf8" />
    <circle cx="4"   cy="18" r="1.2" fill="#818cf8" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [isMobileOpen,  setIsMobileOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar__container">

        {/* ── Brand ── */}
        <Link to="/" className="navbar__brand">
          <div className="navbar__avatar">
            <AvatarGem />
          </div>
          <div className="navbar__brand-text">
            <span className="navbar__title">Amara Naeem</span>
            <span className="navbar__subtitle">Full Stack Developer</span>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="navbar__desktop">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
            >
              {link.label}
              <span className="navbar__link-dot" aria-hidden="true" />
            </NavLink>
          ))}
        </nav>

        {/* ── CTA pill ── */}
        <Link to="/contact" className="navbar__cta" aria-label="Hire me">
          <span className="navbar__cta-dot" aria-hidden="true" />
          Hire me
        </Link>

        {/* ── Hamburger ── */}
        <button
          className={`navbar__toggle ${isMobileOpen ? "navbar__toggle--open" : ""}`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen((p) => !p)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.nav
              className="navbar__mobile"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,   scale: 1    }}
              exit={{    opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* mobile avatar header */}
              <div className="navbar__mobile-header">
                <div className="navbar__mobile-avatar">
                  <AvatarGem />
                </div>
                <div>
                  <p className="navbar__mobile-name">Amara Naeem</p>
                  <p className="navbar__mobile-role">Full Stack Developer</p>
                </div>
              </div>

              <div className="navbar__mobile-links">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0   }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NavLink
                      to={link.path}
                      end={link.path === "/"}
                      className={({ isActive }) =>
                        `navbar__mobile-link ${isActive ? "navbar__mobile-link--active" : ""}`
                      }
                    >
                      <span className="navbar__mobile-link-num">0{i + 1}</span>
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <Link to="/contact" className="navbar__mobile-cta">
                <span className="navbar__cta-dot" aria-hidden="true" />
                Let's work together
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>

      </div>
    </motion.header>
  );
};

export default Navbar;