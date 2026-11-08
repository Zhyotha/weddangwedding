import { motion, useReducedMotion } from "framer-motion";
import Sway from "@/components/invitation/motion/Sway";
import { EASE } from "@/components/invitation/motion/Reveal";
import { Cluster, Divider } from "@/components/invitation/ornaments/Botanicals";

/**
 * A watercolour floral spray anchored in a corner.
 *
 * Drawn as transparency-first SVG (see Botanicals), so it never shows the
 * paper-white rectangle the old JPG did. It sways on its own root and floats at
 * its own speed, so the edges of the page are never still.
 */
export function CornerFloral({
  className = "",
  flipX = false,
  flipY = false,
  opacity = 0.75,
  duration = 16,
  amplitude = 1.3,
  delay = 0,
  float = 5,
  origin = "50% 50%",
  tone = "sage",
  accent = "rose",
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <Sway
        className="h-full w-full"
        duration={duration}
        amplitude={amplitude}
        delay={delay}
        float={float}
        origin={origin}
        reverse={flipX}
      >
        <div
          className="h-full w-full"
          style={{
            transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
            opacity,
          }}
        >
          <Cluster tone={tone} accent={accent} className="h-full w-full" />
        </div>
      </Sway>
    </div>
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
      <Divider className="h-9 w-56 opacity-80 sm:w-72" />
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

/** Thin double frame used around framed content. */
export function OrnateFrame({ children, className = "" }) {
  return (
    <div className={`relative border border-accent/35 bg-card/60 p-2 ${className}`}>
      <div className="border border-accent/20 px-5 py-8 sm:px-8 sm:py-10">{children}</div>
    </div>
  );
}