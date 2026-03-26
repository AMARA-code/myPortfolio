import { motion } from "framer-motion";
import ContactForm from "../components/contact/ContactForm";

const Contact = () => {
  return (
    <section className="page contact">
      <div className="container contact__container">
        <motion.div
          className="contact__intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="page-eyebrow">Contact</p>
          <h1 className="page-title">
            Let&apos;s talk about your next project, product, or idea.
          </h1>
          <p className="page-lead">
            Whether you&apos;re looking to refresh an existing product or build
            something new, I&apos;d love to hear more. Share a few details and
            I&apos;ll get back to you as soon as possible.
          </p>

          <div className="contact__details">
            <a
              href="mailto:amaranaeem453@gmail.com"
              className="contact__detail"
            >
              <span className="contact__detail-label">Email</span>
              <span className="contact__detail-value">
                amaranaeem453@gmail.com
              </span>
            </a>
            <a href="tel:+923346445127" className="contact__detail">
              <span className="contact__detail-label">Phone</span>
              <span className="contact__detail-value">0334 6445127</span>
            </a>
            <a
              href="https://github.com/Amara%20Naeem"
              target="_blank"
              rel="noreferrer"
              className="contact__detail"
            >
              <span className="contact__detail-label">GitHub</span>
              <span className="contact__detail-value">
                github.com/Amara Naeem
              </span>
            </a>
            <a
              href="http://www.linkedin.com/in/amara-naeem518a17360"
              target="_blank"
              rel="noreferrer"
              className="contact__detail"
            >
              <span className="contact__detail-label">LinkedIn</span>
              <span className="contact__detail-value">
                linkedin.com/in/amara-naeem518a17360
              </span>
            </a>
          </div>
        </motion.div>

        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;

