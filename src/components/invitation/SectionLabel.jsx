import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/invitation/motion/Reveal";

export default function SectionLabel({ children, className = "", align = "left" }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""} ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.16 } } }}
    >
      <motion.span
        className="h-px w-7 origin-right bg-accent/70"
        variants={{
          hidden: { scaleX: reduced ? 1 : 0, opacity: 0 },
          show: { scaleX: 1, opacity: 1, transition: { duration: 1, ease: EASE } },
        }}
      />
      <motion.span
        className="text-[0.6rem] uppercase tracking-[0.42em] text-foreground/55"
        variants={{
          hidden: { opacity: 0, y: reduced ? 0 : 8, letterSpacing: "0.5em" },
          show: {
            opacity: 1,
            y: 0,
            letterSpacing: "0.42em",
            transition: { duration: 1.1, ease: EASE },
          },
        }}
      >
        {children}
      </motion.span>
      <motion.span
        className="h-px w-7 origin-left bg-accent/70"
        variants={{
          hidden: { scaleX: reduced ? 1 : 0, opacity: 0 },
          show: { scaleX: 1, opacity: 1, transition: { duration: 1, ease: EASE } },
        }}
      />
    </motion.div>
  );
}