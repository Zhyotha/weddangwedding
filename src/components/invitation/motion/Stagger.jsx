import { motion, useReducedMotion } from "framer-motion";
import { EASE, VARIANTS } from "@/components/invitation/motion/Reveal";

/** A group that releases its children one after another, as it enters view. */
export function StaggerGroup({
  children,
  className = "",
  stagger = 0.14,
  delayChildren = 0.1,
  amount = 0.18,
  once = true,
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -6% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", variant = "up", duration = 1.05 }) {
  const reduced = useReducedMotion();
  const states = VARIANTS[variant] ?? VARIANTS.up;

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: states.hidden,
        show: { ...states.show, transition: { duration, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}