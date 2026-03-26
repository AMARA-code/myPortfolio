import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const Button = ({ variant = "primary", children, ...rest }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`btn btn--${variant}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;

