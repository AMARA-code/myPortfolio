import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <motion.div
        className="footer__container"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="footer__brand">
          <div className="footer__logo">AN</div>
          <div>
            <p className="footer__name">Amara Naeem</p>
            <p className="footer__role">Frontend & React Developer</p>
          </div>
        </div>

        <div className="footer__links">
          <Link to="/projects" className="footer__link">
            Projects
          </Link>
          <Link to="/skills" className="footer__link">
            Skills
          </Link>
          <Link to="/contact" className="footer__link">
            Contact
          </Link>
          <a
            href="http://www.linkedin.com/in/amara-naeem518a17360"
            target="_blank"
            rel="noreferrer"
            className="footer__link"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Amara%20Naeem"
            target="_blank"
            rel="noreferrer"
            className="footer__link"
          >
            GitHub
          </a>
        </div>

        <p className="footer__copy">
          © {year} Amara Naeem. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;

