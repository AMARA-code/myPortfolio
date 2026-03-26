import { motion } from "framer-motion";
import SkillBar from "../components/skills/SkillBar";

const Skills = () => {
  return (
    <section className="page skills">
      <div className="container skills__container">
        <motion.div
          className="skills__intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="page-eyebrow">Skills</p>
          <h1 className="page-title">
            A stack designed for building modern, scalable, and visually rich
            web applications.
          </h1>
          <p className="page-lead">
            I combine strong frontend engineering with thoughtful design
            systems, ensuring every project is both technically solid and
            delightful to use.
          </p>
        </motion.div>

        <div className="skills__grid">
          <motion.div
            className="skills__card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <h2>Frontend Development</h2>
            <div className="skills__bars">
              <SkillBar label="React.js" level={92} />
              <SkillBar label="TypeScript" level={88} />
              <SkillBar label="JavaScript (ES6+)" level={90} />
              <SkillBar label="HTML5" level={95} />
              <SkillBar label="CSS3 / Sass" level={93} />
              <SkillBar label="Bootstrap" level={86} />
            </div>
          </motion.div>

          <motion.div
            className="skills__card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2>Backend / Tools</h2>
            <ul className="skills__tags">
              <li>Node.js</li>
              <li>Axios</li>
              <li>API Integration</li>
              <li>npm</li>
            </ul>
          </motion.div>

          <motion.div
            className="skills__card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2>UI/UX Design</h2>
            <ul className="skills__tags">
              <li>Responsive Design</li>
              <li>Modern Layouts</li>
              <li>User-Centered Design</li>
              <li>Interactive Components</li>
              <li>Animations & Micro-interactions</li>
            </ul>
          </motion.div>

          <motion.div
            className="skills__card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Soft Skills</h2>
            <ul className="skills__tags">
              <li>Adaptability</li>
              <li>Teamwork</li>
              <li>Communication</li>
              <li>Creativity</li>
              <li>Problem Solving</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

