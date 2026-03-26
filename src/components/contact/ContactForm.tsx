import { FormEvent, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Button from "../common/Button";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  message: ""
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpqywzdr";

const ContactForm = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus("idle");
    setErrorMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      await axios.post(
        FORMSPREE_ENDPOINT,
        {
          name: form.name,
          email: form.email,
          message: form.message
        },
        {
          headers: {
            Accept: "application/json"
          }
        }
      );

      setForm(initialState);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        "Something went wrong while sending your message. Please try again in a moment."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      className="contact-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="contact-form__group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
        />
      </div>

      <div className="contact-form__group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="contact-form__group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project, idea, or opportunity..."
          rows={5}
          required
        />
      </div>

      <div className="contact-form__actions">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </div>

      {status === "success" && (
        <p className="contact-form__status contact-form__status--success">
          Thank you! Your message has been sent.
        </p>
      )}

      {status === "error" && (
        <p className="contact-form__status contact-form__status--error">
          {errorMessage}
        </p>
      )}
    </motion.form>
  );
};

export default ContactForm;

