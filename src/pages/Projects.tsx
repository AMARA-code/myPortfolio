import { motion } from "framer-motion";
import ProjectCard, { Project } from "../components/projects/ProjectCard";

const projects: Project[] = [
  {
    title: "Blossom Beauty Salon Website",
    liveUrl: "https://responsive-beautysalon-website.netlify.app/",
    description:
      "A fully responsive and visually elegant salon website focused on premium UI/UX, smooth animations, and engaging service presentation.",
    technologies: [
      "React.js",
      "TypeScript",
      "Sass",
      "Bootstrap",
      "Responsive Design",
      "Animations"
    ]
  },
  {
    title: "ECLAT Restaurant Website",
    liveUrl: "https://restaurant-website-22.netlify.app/",
    description:
      "An interactive restaurant platform with elegant UI, animated menu sections, and a highly polished browsing experience.",
    technologies: [
      "React.js",
      "TypeScript",
      "Sass",
      "Bootstrap",
      "Interactive Components",
      "Modern Layouts"
    ]
  },
  {
    title: "MCKTIN Software Company Landing Page",
    liveUrl: "https://mcktin-softwarecompany.netlify.app/",
    description:
      "A modern SaaS-style landing page with reusable components, smooth scrolling, and refined animations for a software brand.",
    technologies: [
      "React.js",
      "TypeScript",
      "Sass",
      "Reusable Components",
      "Smooth Animations",
      "UI/UX Design"
    ]
  },
  {
    title: "EliteSmile Dental Clinic Website",
    liveUrl: "https://responsive-dentalclinic-website.netlify.app/",
    description:
      "A modern dental clinic website with an appointment booking flow, medical-inspired UI, and a user-friendly responsive layout.",
    technologies: [
      "React.js",
      "TypeScript",
      "Sass",
      "Node.js",
      "Form Handling",
      "Full Stack"
    ]
  }
];

const Projects = () => {
  return (
    <section className="page projects">
      <div className="container projects__container">
        <motion.div
          className="projects__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="page-eyebrow">Projects</p>
          <h1 className="page-title">
            Selected work that reflects my focus on modern frontend development
            and UI/UX.
          </h1>
          <p className="page-lead">
            Each project pairs clean architecture with a premium visual
            experience, highlighting my ability to ship production-ready
            interfaces for real products and brands.
          </p>
        </motion.div>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

