import { motion } from "framer-motion";

interface SkillBarProps {
  label: string;
  level: number; // 0-100
}

const SkillBar = ({ label, level }: SkillBarProps) => {
  return (
    <div className="skill-bar">
      <div className="skill-bar__header">
        <span className="skill-bar__label">{label}</span>
        <span className="skill-bar__value">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <motion.div
          className="skill-bar__fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default SkillBar;

