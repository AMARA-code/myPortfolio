import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";

type NativeButtonProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  keyof MotionProps | "onAnimationStart" | "onDragStart" | "onDrag" | "onDragEnd"
>;

interface ButtonProps extends NativeButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
}

const Button = ({ variant = "primary", children, className = "", ...rest }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={`btn btn--${variant} ${className}`}
      {...rest}
    >
      <span className="btn__inner">{children}</span>
      <span className="btn__glow" aria-hidden="true" />
    </motion.button>
  );
};

export default Button;