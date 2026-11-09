import { motion, useReducedMotion } from "framer-motion";
import Sway from "@/components/invitation/motion/Sway";
import { EASE } from "@/components/invitation/motion/Reveal";
import { BlossomBranch, Divider, Garland, Sprig } from "@/components/invitation/ornaments/Botanicals";

/** A small botanical that grows out of a card's corner. */
export function FloralAccent({
  className = "",
  art = "sprig",
  tone = "sage",
  accent = "rose",
  flipX = false,
  flipY = false,
  opacity = 0.62,
  duration = 18,
  amplitude = 2.4,
}) {
  const Art = art === "blossom" ? BlossomBranch : Sprig;

  return (
    <span aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <Sway className="h-full w-full" duration={duration} amplitude={amplitude} origin="50% 90%" float={3}>
        <span
          className="block h-full w-full"
          style={{
            opacity,
            transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
          }}
        >
          <Art tone={tone} accent={accent} className="h-full w-full" />
        </span>
      </Sway>
    </span>
  );
}

/** Delicate botanical separator that unfurls from its centre. */
export function BotanicalDivider({ className = "" }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`flex w-full justify-center ${className}`}
      initial={reduced ? undefined : { opacity: 0, scaleX: 0.55 }}
      whileInView={reduced ? undefined : { opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.4, ease: EASE }}
    >
      <Divider className="h-9 w-56 opacity-85 sm:w-72" />
    </motion.div>
  );
}

/** Fine gold rule that draws itself outward from the lozenge at its centre. */
export function GoldRule({ className = "" }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden="true" className={`flex items-center justify-center gap-3 ${className}`}>
      <motion.span
        className="h-px w-14 origin-right bg-gradient-to-r from-transparent to-accent/60"
        initial={reduced ? undefined : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      <motion.span
        className="block h-1.5 w-1.5 rotate-45 border border-accent/70"
        initial={reduced ? undefined : { opacity: 0, scale: 0 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
      />
      <motion.span
        className="h-px w-14 origin-left bg-gradient-to-l from-transparent to-accent/60"
        initial={reduced ? undefined : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      />
    </div>
  );
}

/**
 * The garland that closes the page. It sits above the footer's lower edge, so
 * its blooms stay whole instead of being trimmed by the section boundary.
 */
export function BottomGarland({ className = "", opacity = 0.9, duration = 22, delay = 0.6 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center ${className}`}
    >
      <Sway className="h-full w-full max-w-3xl" duration={duration} amplitude={1} origin="50% 100%" delay={delay}>
        <div className="h-full w-full" style={{ opacity }}>
          <Garland tone="sage" accent="rose" className="h-full w-full" />
        </div>
      </Sway>
    </div>
  );
}

/** Thin double frame used around framed content. */
export function OrnateFrame({ children, className = "" }) {
  return (
    <div className={`relative border border-accent/35 bg-card/60 p-2 ${className}`}>
      <div className="border border-accent/20 px-5 py-8 sm:px-8 sm:py-10">{children}</div>
    </div>
  );
}