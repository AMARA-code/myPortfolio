import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export interface Project {
  title: string;
  description: string;
  liveUrl: string;
  image: string;
  technologies: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

const ProjectCard = ({ project, index, featured = false }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["-30%", "130%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["-30%", "130%"]);
  const scale = useSpring(isHovered ? 1.02 : 1, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const techColors: Record<string, string> = {
    "Next.js": "#000000",
    "React.js": "#61DAFB",
    "TypeScript": "#3178C6",
    "Node.js": "#339933",
    "postgresql": "#4169E1",
    "Tailwind": "#06B6D4",
    "Sass": "#CC6699",
    "RestAPIs": "#FF6B35",
    "Supabase": "#3ECF8E",
    "Bootstrap": "#7952B3",
  };

  return (
    <motion.div
      className={`project-card-wrapper ${featured ? "project-card-wrapper--featured" : ""}`}
      initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.7,
        delay: index * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        ref={cardRef}
        className="project-card"
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Spotlight glare effect */}
        {isHovered && (
          <motion.div
            className="project-card__glare"
            style={{ left: glareX, top: glareY }}
          />
        )}

        {/* Magnetic cursor blob */}
        {isHovered && (
          <div
            className="project-card__cursor-blob"
            style={{ left: cursorPos.x, top: cursorPos.y }}
          />
        )}

        {/* Corner accent lines */}
        <div className="project-card__corner project-card__corner--tl" />
        <div className="project-card__corner project-card__corner--tr" />
        <div className="project-card__corner project-card__corner--bl" />
        <div className="project-card__corner project-card__corner--br" />

        {/* Image section */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card__image-link"
          tabIndex={0}
        >
          <div className="project-card__image-wrapper">
            <motion.img
              src={project.image}
              alt={`${project.title} preview`}
              className="project-card__image"
              loading="lazy"
              animate={{ scale: isHovered ? 1.07 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Scan line overlay */}
            <div className="project-card__scanlines" />

            {/* Hover overlay */}
            <motion.div
              className="project-card__image-overlay"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="project-card__visit-btn"
                animate={{
                  y: isHovered ? 0 : 12,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.35, delay: 0.05 }}
              >
                <span className="project-card__visit-text">View Live</span>
                <span className="project-card__visit-arrow">↗</span>
              </motion.div>
            </motion.div>

            {/* Index badge */}
            <div className="project-card__index">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Live indicator */}
            <div className="project-card__live-badge">
              <span className="project-card__live-dot" />
              LIVE
            </div>
          </div>
        </a>

        {/* Card body */}
        <div className="project-card__body" style={{ transform: "translateZ(20px)" }}>
          <div className="project-card__meta">
            <motion.h2
              className="project-card__title"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h2>
          </div>

          <p className="project-card__description">{project.description}</p>

          {/* Tech pills */}
          <div className="project-card__tech">
            {project.technologies.map((tech: string, i: number) => (
              <motion.span
                key={tech}
                className="project-card__tech-pill"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 + i * 0.04 + 0.3 }}
                style={{
                  borderColor: techColors[tech]
                    ? `${techColors[tech]}40`
                    : undefined,
                  color: techColors[tech] || undefined,
                }}
                whileHover={{ scale: 1.08, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Footer */}
          <div className="project-card__footer">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
            >
              <span>Live Project</span>
              <motion.span
                className="project-card__link-arrow"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ↗
              </motion.span>
            </a>
            <div className="project-card__divider" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;