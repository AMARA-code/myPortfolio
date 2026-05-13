import { FormEvent, useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import Button from "../common/Button";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", subject: "", message: "" };
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpqywzdr";

// ─── 3D Tilt Card Wrapper ─────────────────────────────────────────────────────
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const cardRef   = useRef<HTMLDivElement>(null);
  const rotateX   = useMotionValue(0);
  const rotateY   = useMotionValue(0);
  const glowX     = useMotionValue(50);
  const glowY     = useMotionValue(50);
  const springX   = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY   = useSpring(rotateY, { stiffness: 150, damping: 20 });
  const glowXPct  = useTransform(glowX, (v) => `${v}%`);
  const glowYPct  = useTransform(glowY, (v) => `${v}%`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 5);
    rotateY.set( ((e.clientX - cx) / (rect.width  / 2)) * 5);
    glowX.set(((e.clientX - rect.left) / rect.width)  * 100);
    glowY.set(((e.clientY - rect.top)  / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0); rotateY.set(0);
    glowX.set(50);  glowY.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      className="form-card-3d-wrapper"
      id="contact-form"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="form-card-3d-glow"
        style={{ "--glow-x": glowXPct, "--glow-y": glowYPct } as React.CSSProperties}
      />
      {children}
    </motion.div>
  );
};

// ─── Floating Label Field ─────────────────────────────────────────────────────
const FloatingField = ({
  id, name, type = "text", label, placeholder,
  value, onChange, required, isTextarea, rows, icon,
}: {
  id: string; name: string; type?: string; label: string;
  placeholder: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean; isTextarea?: boolean; rows?: number; icon?: string;
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className={`cf-group${active ? " is-active" : ""}${focused ? " is-focused" : ""}`}>
      <motion.label
        htmlFor={id}
        className="cf-label"
        animate={{
          y:     active ? -22 : 0,
          x:     active ? -2  : 0,
          scale: active ? 0.78 : 1,
          color: focused
            ? "#38bdf8"
            : active
            ? "#7dd3fc"
            : "rgba(148,163,184,0.75)",
        }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        {icon && <span className="cf-label-icon">{icon}</span>}
        {label}
      </motion.label>

      {isTextarea ? (
        <textarea
          id={id} name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={active ? placeholder : ""}
          rows={rows ?? 5} required={required}
        />
      ) : (
        <input
          id={id} name={name} type={type} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={active ? placeholder : ""}
          required={required}
        />
      )}

      {/* Animated underline */}
      <span className="cf-underline">
        <motion.span
          className="cf-underline-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>

      {/* Floating hint below field */}
      <AnimatePresence>
        {active && !isTextarea && (
          <motion.span
            className="cf-hint"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 0.5, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
          >
            {placeholder}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── ContactForm ──────────────────────────────────────────────────────────────
const ContactForm = () => {
  const [form, setForm]               = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus]           = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        { name: form.name, email: form.email, subject: form.subject, message: form.message },
        { headers: { Accept: "application/json" } }
      );
      setForm(initialState);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TiltCard>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form__shimmer" />

        <motion.p
          className="contact-form__title"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Send me a <span>message</span>
        </motion.p>

        {/* Row: Name + Email side by side */}
        <div className="contact-form__row">
          {[
            { id: "name",  name: "name",  type: "text",  label: "Name",  placeholder: "Your full name",    icon: "✦" },
            { id: "email", name: "email", type: "email", label: "Email", placeholder: "you@example.com",   icon: "@" },
          ].map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (i + 2), duration: 0.5 }}
            >
              <FloatingField
                id={f.id} name={f.name} type={f.type}
                label={f.label} placeholder={f.placeholder} icon={f.icon}
                value={form[f.name as keyof FormState]}
                onChange={handleChange} required
              />
            </motion.div>
          ))}
        </div>

        {/* Subject */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.28, duration: 0.5 }}
        >
          <FloatingField
            id="subject" name="subject" label="Subject" icon="◈"
            placeholder="Project title or topic"
            value={form.subject} onChange={handleChange}
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.36, duration: 0.5 }}
        >
          <FloatingField
            id="message" name="message" label="Message" icon="✎"
            placeholder="Tell me about your project, idea, or opportunity…"
            value={form.message} onChange={handleChange}
            isTextarea rows={5} required
          />
        </motion.div>

        {/* Submit */}
        <motion.div
          className="contact-form__actions"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.44, duration: 0.5 }}
        >
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="contact-form__sending">
                <span className="contact-form__spinner" />
                Sending…
              </span>
            ) : (
              "Send Message →"
            )}
          </Button>
        </motion.div>

        {/* Status messages */}
        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.p
              key="success"
              className="contact-form__status contact-form__status--success"
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              ✓ Thank you! Your message has been sent successfully.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              key="error"
              className="contact-form__status contact-form__status--error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              ✕ {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </TiltCard>
  );
};

export default ContactForm;