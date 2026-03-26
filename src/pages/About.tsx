import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="page about">
      <div className="container about__container">
        <motion.div
          className="about__intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="page-eyebrow">About</p>
          <h1 className="page-title">
            I build modern, responsive and visually engaging web applications.
          </h1>
          <p className="page-lead">
            I&apos;m a frontend developer focused on translating ideas into
            elegant, production-ready interfaces. My work blends clean,
            maintainable code with thoughtful, user-centered design.
          </p>
        </motion.div>

        <div className="about__grid">
          <motion.div
            className="about__card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <h2>Frontend craft</h2>
            <p>
              I specialize in building rich, interactive interfaces with React,
              TypeScript, and modern tooling like Vite and Sass. I care deeply
              about performance, accessibility, and creating layouts that adapt
              beautifully across devices.
            </p>
            <p>
              My projects emphasize reusable components, clear architecture and
              strong separation of concerns, making it easy to iterate and scale
              over time.
            </p>
          </motion.div>

          <motion.div
            className="about__card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2>User-centered design</h2>
            <p>
              Every interface I design starts with the user. I focus on clear
              hierarchy, intuitive interactions, and micro-animations that guide
              rather than distract.
            </p>
            <p>
              Smooth transitions, thoughtful spacing, and premium visual details
              help the experiences I build feel polished and trustworthy —
              ideal for brands that care about first impressions.
            </p>
          </motion.div>

          <motion.div
            className="about__card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2>How I work</h2>
            <p>
              I value clear communication, reliable delivery, and continuous
              improvement. From concept to deployment, I&apos;m comfortable
              owning the frontend, integrating APIs, and collaborating closely
              with designers and backend engineers.
            </p>
            <p>
              Clean code, responsive layouts, and modern UI/UX are at the core
              of every project I take on.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

