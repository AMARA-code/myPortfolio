import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface SkillBarProps {
  label: string;
  level: number;
  index?: number;
}

const SkillBar = ({ label, level, index = 0 }: SkillBarProps) => {
  return (
    <motion.div
      className="skill-bar"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
    >
      <div className="skill-bar__header">
        <span className="skill-bar__label">{label}</span>
        <motion.span
          className="skill-bar__value"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.07 + 0.4 }}
        >
          <CountUp target={level} delay={index * 0.07} />%
        </motion.span>
      </div>
      <div className="skill-bar__track">
        <motion.div
          className="skill-bar__fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: index * 0.07 + 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span className="skill-bar__glow" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Animated counter
const CountUp = ({ target, delay }: { target: number; delay: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  return (
    <motion.span
      ref={nodeRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        const node = nodeRef.current;
        if (!node) return;
        const start = performance.now();
        const duration = 900;
        const startDelay = delay * 1000 + 100;

        setTimeout(() => {
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            node.textContent = String(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }, startDelay);
      }}
    >
      0
    </motion.span>
  );
};

export default SkillBar;