import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/invitation/motion/Reveal";

/**
 * Headings and names dissolve in word by word (or letter by letter), each
 * lifting a few pixels with a whisper of rotation.
 */
export default function TextReveal({
  text,
  as: Tag = "span",
  className = "",
  mode = "words",
  delay = 0,
  stagger = 0.055,
  amount = 0.4,
  once = true,
}) {
  const reduced = useReducedMotion();
  const units = mode === "chars" ? Array.from(text) : text.split(" ");

  if (reduced) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        className="inline-block"
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {units.map((unit, index) => (
          <motion.span
            key={`${unit}-${index}`}
            className="inline-block whitespace-pre"
            variants={{
              hidden: { opacity: 0, y: 22, rotate: 2.5, filter: "blur(6px)" },
              show: { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.95, ease: EASE }}
          >
            {unit === " " ? "\u00A0" : unit}
            {mode === "words" && index < units.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}