import { motion, useReducedMotion } from "framer-motion";

/** A soft diagonal light that sweeps across important lettering now and then. */
export default function Sheen({ className = "", delay = 0, repeatDelay = 7, duration = 2.6 }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.span
        className="absolute -inset-y-6 w-1/3 rotate-[14deg] bg-gradient-to-r from-transparent via-[#fffdf6]/70 to-transparent blur-[6px]"
        initial={{ x: "-170%" }}
        animate={{ x: "420%" }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatDelay,
          ease: "easeInOut",
        }}
      />
    </span>
  );
}