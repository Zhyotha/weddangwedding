import { motion } from "framer-motion";
import { WEDDING } from "@/lib/wedding";

const SOFT = [0.22, 1, 0.36, 1];

const INK = "#3E2A18";
const INK_SOFT = "#5A422A";
const HALO = "0 2px 16px rgba(249,242,227,0.92), 0 1px 21px rgba(249,242,227,0.72)";

/**
 * The lettering of the opening frame, set upper-centre: a quiet line of serif
 * capitals, then the couple's names in a large script, in deep brown ink with a
 * soft halo so it stays legible against the engraving.
 */
export default function WeddingTypography({ eyebrow, names, closing, instant }) {
  const showEyebrow = eyebrow && !closing;
  const showNames = names && !closing;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-[15%] flex flex-col items-center px-[8cqw] text-center"
      style={{ zIndex: 30 }}
    >
      <motion.p
        initial={false}
        animate={showEyebrow ? { opacity: 1, y: 0 } : { opacity: 0, y: instant ? 0 : 14 }}
        transition={{ duration: instant ? 0 : 1.6, ease: SOFT }}
        className="font-heading uppercase"
        style={{
          color: INK_SOFT,
          fontSize: "clamp(0.6rem, 3.1cqw, 1.05rem)",
          letterSpacing: "0.42em",
          textShadow: HALO,
        }}
      >
        The Wedding of
      </motion.p>

      <motion.div
        initial={false}
        animate={showNames ? { opacity: 1, y: 0 } : { opacity: 0, y: instant ? 0 : 18 }}
        transition={{ duration: instant ? 0 : 1.8, delay: instant ? 0 : 0.1, ease: SOFT }}
        className="mt-[3cqw] flex w-full flex-col items-center justify-center gap-[1.5cqw]"
      >
        <span
          className="font-script leading-[1]"
          style={{ color: INK, fontSize: "clamp(2.5rem, 15cqw, 5.6rem)", textShadow: HALO }}
        >
          {WEDDING.groom.name}
        </span>
        <span
          className="font-heading italic leading-none"
          style={{ color: INK_SOFT, fontSize: "clamp(1.1rem, 5cqw, 2rem)", textShadow: HALO }}
        >
          &amp;
        </span>
        <span
          className="font-script leading-[1]"
          style={{ color: INK, fontSize: "clamp(2.5rem, 15cqw, 5.6rem)", textShadow: HALO }}
        >
          {WEDDING.bride.name}
        </span>
      </motion.div>
    </div>
  );
}