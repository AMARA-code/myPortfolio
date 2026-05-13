import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ProjectCard, { type Project } from "../components/projects/ProjectCard";

const projects: Project[] = [
  {
    title: "Grand-Azure-HotelsSystem-SAAS-webApp",
    liveUrl: "https://grand-azure-hotels-system.vercel.app/",
    image: "/images/projects/grand-azure-hotels.png",
    description:
      "Grand Azure Hotel Management System is a modern full-stack SaaS platform built for multi-property hotel operations. The system features a powerful admin dashboard for bookings, finance, inventory, conference management, and analytics, alongside a premium guest portal for hotel browsing and reservations.",
    technologies: ["Next.js","Node.js","RestAPIs","postgresql","React.js","TypeScript","Sass","Tailwind","Responsive Design"],
  },
  {
    title: "Devfolio-portfolioBuilder-SAAS-WebApp",
    liveUrl: "https://devfolio-portfolio-builder.vercel.app",
    image: "/images/projects/devfolio-portfolio-builder.png",
    description:
      "A full-stack portfolio builder that enables developers to create and publish personalized portfolios using modern templates. It features a guided onboarding flow and one-click publishing to generate a live portfolio URL.",
    technologies: ["Next.js","Node.js","RestAPIs","postgresql","React.js","TypeScript","Sass","Tailwind","Responsive Design"],
  },
  {
    title: "Products-Description-SAAS-Web",
    liveUrl: "https://products-description-saas-web-six.vercel.app",
    image: "/images/projects/products-description-saas.png",
    description:
      "A full-stack SaaS platform that generates AI-powered, SEO-optimized product descriptions in seconds. Built with Next.js, Node.js, and Supabase — featuring role-based access control, usage limits, subscription payments via JazzCash & Easypaisa, and a secure admin panel.",
    technologies: ["Next.js","Node.js","RestAPIs","postgresql","React.js","TypeScript","Sass","Tailwind","Responsive Design"],
  },
  {
    title: "Blossom Beauty Salon Website",
    liveUrl: "https://responsive-beautysalon-website.netlify.app/",
    image: "/images/projects/blossom-beauty-salon.png",
    description:
      "A fully responsive and visually elegant salon website focused on premium UI/UX, smooth animations, and engaging service presentation.",
    technologies: ["React.js","TypeScript","Sass","Bootstrap","Responsive Design","Animations"],
  },
  {
    title: "ECLAT Restaurant Website",
    liveUrl: "https://restaurant-website-22.netlify.app/",
    image: "/images/projects/eclat-restaurant.png",
    description:
      "An interactive restaurant platform with elegant UI, animated menu sections, and a highly polished browsing experience.",
    technologies: ["React.js","TypeScript","Sass","Bootstrap","Interactive Components","Modern Layouts"],
  },
  {
    title: "FreshCart-E-commerce-Website",
    liveUrl: "https://grocerry-store.netlify.app",
    image: "/images/projects/Fresh-cart.png",
    description:
      "A full-stack e-commerce platform for a grocery store, featuring a modern UI, product filtering, and a seamless shopping experience.",
    technologies: ["Next.js","Node.js","RestAPIs","postgresql","React.js","TypeScript","Sass","Tailwind","Responsive Design"],
  },
  {
    title: "MCKTIN Software Company Landing Page",
    liveUrl: "https://mcktin-softwarecompany.netlify.app/",
    image: "/images/projects/mcktin-software.png",
    description:
      "A modern SaaS-style landing page with reusable components, smooth scrolling, and refined animations for a software brand.",
    technologies: ["React.js","TypeScript","Sass","Reusable Components","Smooth Animations","UI/UX Design"],
  },
  {
    title: "EliteSmile Dental Clinic Website",
    liveUrl: "https://responsive-dentalclinic-website.netlify.app/",
    image: "/images/projects/elitesmile-dental.png",
    description:
      "A modern dental clinic website with an appointment booking flow, medical-inspired UI, and a user-friendly responsive layout.",
    technologies: ["React.js","TypeScript","Sass","Node.js","Form Handling","Full Stack"],
  },
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const totalProjects = projects.length;

  return (
    <section className="page projects" ref={containerRef}>

      {/* Ambient background orbs */}
      <div className="projects__bg-orbs" aria-hidden="true">
        <div className="projects__orb projects__orb--1" />
        <div className="projects__orb projects__orb--2" />
        <div className="projects__orb projects__orb--3" />
      </div>

      {/* Noise texture overlay */}
      <div className="projects__noise" aria-hidden="true" />

      <div className="container projects__container">

        {/* Parallax header */}
        <motion.div
          className="projects__header"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          {/* Eyebrow with animated line */}
          <motion.div
            className="projects__eyebrow"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="projects__eyebrow-line" />
            <span className="page-eyebrow">Projects</span>
            <span className="projects__count-badge">{totalProjects}</span>
          </motion.div>

          {/* Animated title with word reveal */}
          <div className="projects__title-wrapper">
            {["Selected", "work", "spanning", "full-stack", "SaaS", "platforms,", "modern", "frontends,", "and", "production-ready", "web", "applications."].map((word, i) => (
              <motion.span
                key={i}
                className="projects__title-word"
                initial={{ opacity: 0, y: 40, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.p
            className="page-lead projects__lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Each project pairs clean architecture with a premium visual
            experience — from scalable backends and real-time data to polished
            interfaces built for real products and brands.
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="projects__stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {[
              { value: "8+", label: "Live Projects" },
              { value: "5+", label: "Tech Stacks" },
              { value: "3", label: "SaaS Platforms" },
              { value: "100%", label: "Production Ready" },
            ].map((stat) => (
              <div className="projects__stat" key={stat.label}>
                <span className="projects__stat-value">{stat.value}</span>
                <span className="projects__stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="projects__divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Projects grid */}
        <div className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          className="projects__footer-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <p className="projects__footer-text">
            More projects on the way — building something new every week.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="projects__github-btn"
          >
            <span>View GitHub</span>
            <span className="projects__github-arrow">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;