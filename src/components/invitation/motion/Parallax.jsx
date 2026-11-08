import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Gentle depth: the child drifts against the scroll direction as its section
 * passes through the viewport. Used on photos and on foreground botanicals so
 * layers move at visibly different speeds.
 */
export default function Parallax({ children, className = "", distance = 26, scale = 1 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      {reduced ? (
        children
      ) : (
        <motion.div style={{ y, scale }} className="h-full w-full">
          {children}
        </motion.div>
      )}
    </div>
  );
}