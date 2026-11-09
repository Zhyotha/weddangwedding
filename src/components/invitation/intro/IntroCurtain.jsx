import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { OPENING } from "@/components/invitation/intro/openingAssets";

const OPEN = { duration: 2.3, ease: [0.22, 1, 0.36, 1] };
const SHUT = { duration: 1.5, ease: [0.55, 0.06, 0.68, 0.19] };

/**
 * The etched branches are the curtain: they start pressed in over the whole
 * frame, pull back outward to reveal the venue, and at the very end slide in
 * again to frame-lock the picture.
 */
export default function IntroCurtain({ open, closing, instant }) {
  const side = (dir) => {
    const part = dir === "left" ? "-4%" : "4%";
    const shut = dir === "left" ? "24%" : "-24%";
    if (instant) return { x: part, y: "-2%", scale: 1.06, rotate: 0 };
    if (closing) return { x: shut, y: "3%", scale: 1.72, rotate: dir === "left" ? -3 : 3 };
    if (open) return { x: part, y: "-2%", scale: 1.06, rotate: 0 };
    return { x: shut, y: "3%", scale: 1.72, rotate: dir === "left" ? -3 : 3 };
  };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ zIndex: 20 }}>
      <motion.div
        className="absolute -left-[14%] top-[-8%] h-[112%] w-[86%]"
        initial={false}
        animate={side("left")}
        transition={closing ? SHUT : OPEN}
      >
        <Image src={OPENING.branchLeft} alt="" fittingType="fit" className="h-full w-full" />
      </motion.div>

      <motion.div
        className="absolute -right-[14%] top-[-8%] h-[112%] w-[86%]"
        initial={false}
        animate={side("right")}
        transition={closing ? SHUT : OPEN}
      >
        <Image src={OPENING.branchRight} alt="" fittingType="fit" className="h-full w-full" />
      </motion.div>

      <motion.div
        className="absolute -top-[6%] left-[-6%] h-[26%] w-[112%]"
        initial={false}
        animate={
          instant
            ? { y: "-8%", scale: 1.08 }
            : closing
              ? { y: "16%", scale: 1.7 }
              : open
                ? { y: "-8%", scale: 1.08 }
                : { y: "8%", scale: 1.7 }
        }
        transition={closing ? SHUT : OPEN}
      >
        <Image src={OPENING.branchTop} alt="" fittingType="fit" className="h-full w-full" />
      </motion.div>

      {/* Aged-paper veil: the picture is hushed until the curtain opens. */}
      <motion.div
        className="absolute inset-0 bg-[#E7DAC0]"
        initial={false}
        animate={{ opacity: instant ? 0 : closing ? 0.18 : open ? 0 : 0.94 }}
        transition={{ duration: instant ? 0 : closing ? 1.2 : 2.1, ease: "easeInOut" }}
      />
    </div>
  );
}