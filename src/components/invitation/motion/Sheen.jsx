
import { motion, useReducedMotion } from "framer-motion";

export default function Sheen({
  className = "",
  delay = 0,
  repeatDelay = 7,
  duration = 2.6,
}) {
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

export function SheenText({
  children,
  delay = 2.4,
  repeatDelay = 14,
}) {
  const reduced = useReducedMotion();

  return (
    <span className="relative inline-block">
      {children}

      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 whitespace-nowrap"
          style={{
            backgroundImage:
              "linear-gradient(110deg, transparent 43%, rgba(255,253,246,0.95) 50%, transparent 57%)",
            backgroundSize: "300% 100%",
            backgroundRepeat: "no-repeat",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ backgroundPosition: "150% 50%" }}
          animate={{ backgroundPosition: "-150% 50%" }}
          transition={{
            duration: 3.5,
            delay,
            repeat: Infinity,
            repeatDelay,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.span>
      )}
    </span>
  );
}