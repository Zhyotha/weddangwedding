import { motion, useReducedMotion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/** Every entrance used across the invitation, in one vocabulary. */
export const VARIANTS = {
  up: { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  pop: { hidden: { opacity: 0, scale: 0.92, y: 16 }, show: { opacity: 1, scale: 1, y: 0 } },
  soft: {
    hidden: { opacity: 0, y: 26, scale: 0.965, filter: "blur(12px)" },
    show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  },
  left: { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0 } },
  mask: {
    hidden: { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
    show: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
  },
};

/**
 * Scroll-triggered entrance. Fires the first time the element enters the
 * viewport and never replays while scrolling back up.
 */
export default function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  duration = 1.05,
  amount = 0.25,
  once = true,
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const states = VARIANTS[variant] ?? VARIANTS.up;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -6% 0px" }}
      variants={states}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}