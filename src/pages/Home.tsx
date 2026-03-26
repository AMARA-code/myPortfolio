import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

const heroTitleVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const heroSubtitleVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

const Home = () => {
  return (
    <section className="page home">
      <div className="container home__container">
        <div className="home__hero">
          <motion.p
            className="home__eyebrow"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frontend Developer · React Developer · UI/UX Focused
          </motion.p>

          <motion.h1
            className="home__title"
            variants={heroTitleVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            I craft modern, responsive and visually engaging web experiences.
          </motion.h1>

          <motion.p
            className="home__subtitle"
            variants={heroSubtitleVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            I&apos;m Amara, a frontend developer specializing in React,
            TypeScript and premium UI/UX. I build fast, accessible, and
            elegant digital products that feel as good as they look.
          </motion.p>

          <motion.div
            className="home__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/projects">
              <Button>View My Projects</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost">Let&apos;s Collaborate</Button>
            </Link>
          </motion.div>

          <motion.div
            className="home__meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="home__meta-item">
              <span className="home__meta-label">Focus</span>
              <span className="home__meta-value">
                Modern React · TypeScript · UI/UX
              </span>
            </div>
            <div className="home__meta-item">
              <span className="home__meta-label">Approach</span>
              <span className="home__meta-value">
                Clean code · User-centered design · Responsive layouts
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="home__visual"
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <div className="home__orb home__orb--primary" />
          <div className="home__orb home__orb--accent" />
          <div className="home__card">
            <p className="home__card-title">Frontend Developer</p>
            <p className="home__card-text">
              Building premium, production-ready interfaces with React, modern
              tooling, and a strong eye for detail.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;

