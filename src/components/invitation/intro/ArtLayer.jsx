import { motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

const SOFT = [0.22, 1, 0.36, 1];

/**
 * One painted layer of the scene: enters from `from` to `to` (or springs into
 * place), then keeps swaying on its own axis without ever restarting.
 */
export default function ArtLayer({
  src,
  boxClass,
  imgClass,
  show,
  from = {},
  to = {},
  duration = 1.7,
  delay = 0,
  spring = false,
  sway,
  origin = "center",
  z = 5,
  instant = false,
}) {
  const reduced = useReducedMotion();
  const skip = instant || reduced;

  const transition =
    spring && !skip
      ? { type: "spring", stiffness: 46, damping: 10.5, mass: 1.2, delay }
      : { duration: skip ? 0 : duration, delay: skip ? 0 : delay, ease: SOFT };

  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute mix-blend-multiply", boxClass)}
      style={{ zIndex: z }}
      initial={{ opacity: 0, x: "0%", y: "0%", scale: 1, rotate: 0, ...from }}
      animate={show ? { opacity: 1, x: "0%", y: "0%", scale: 1, rotate: 0, ...to } : { opacity: 0, ...from }}
      transition={transition}
    >
      <motion.div
        className="h-full w-full"
        style={{ transformOrigin: origin }}
        animate={show && sway && !skip ? sway.animate : { x: "0%", rotate: 0 }}
        transition={show && sway && !skip ? sway.transition : { duration: 0.4 }}
      >
        <Image src={src} alt="" fittingType="fit" className={cn("h-full w-full", imgClass)} />
      </motion.div>
    </motion.div>
  );
}