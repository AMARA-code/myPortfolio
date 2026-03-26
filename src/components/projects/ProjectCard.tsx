import { motion } from "framer-motion";
import Button from "../common/Button";

export interface Project {
  title: string;
  description: string;
  liveUrl: string;
  technologies: string[];
  imageUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="project-card__preview">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="project-card__image"
          />
        ) : (
          <>
            <div className="project-card__gradient" />
            <div className="project-card__badge">Featured Project</div>
          </>
        )}
      </div>

      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>

        <ul className="project-card__tags">
          {project.technologies.map((tech) => (
            <li key={tech} className="project-card__tag">
              {tech}
            </li>
          ))}
        </ul>

        <div className="project-card__actions">
          <Button
            variant="primary"
            onClick={() => window.open(project.liveUrl, "_blank", "noreferrer")}
          >
            View Live Demo
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;

