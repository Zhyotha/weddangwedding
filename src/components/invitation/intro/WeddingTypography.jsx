import { motion } from "framer-motion";
import { WEDDING } from "@/lib/wedding";
import { cn } from "@/lib/utils";

function NamesMarkup({ shine }) {
  const nameClass = cn(
    "font-script text-[clamp(3.2rem,15vw,6.4rem)] leading-[0.98]",
    shine
      ? "text-transparent text-shine"
      : "text-[#4A2222] drop-shadow-[0_2px_14px_rgba(253,251,247,0.9)]"
  );
  const ampClass = cn(
    "my-[0.12em] block font-display text-[clamp(1.5rem,5vw,2.4rem)] italic",
    shine ? "text-transparent text-shine" : "text-[#8A5A45]"
  );

  return (
    <div className="flex flex-col items-center">
      <h1 className={nameClass}>{WEDDING.groom.name}</h1>
      <span className={ampClass}>&amp;</span>
      <h1 className={nameClass}>{WEDDING.bride.name}</h1>
    </div>
  );
}

/**
 * The invitation title blooms in line by line, then a single diagonal shine
 * travels across the lettering itself (clipped to the glyphs).
 */
export default function WeddingTypography({ visible, shine, closing, instant }) {
  const lineTransition = (delay) => ({
    duration: instant ? 0 : 1.5,
    delay: instant ? 0 : delay,
    ease: [0.22, 1, 0.36, 1],
  });

  return (
    <div className="relative flex w-full flex-col items-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[58vh] w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(253,251,247,0.92),rgba(253,251,247,0.5)_58%,transparent_84%)]"
      />

      <div className="relative text-center">
        <motion.p
          className="text-[0.56rem] uppercase tracking-[0.5em] text-[#5C3A2E] sm:text-[0.68rem] sm:tracking-[0.55em]"
          initial={false}
          animate={visible && !closing ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={lineTransition(0)}
        >
          The Wedding of
        </motion.p>

        <div className="relative mt-4 overflow-hidden">
          <motion.div
            initial={false}
            animate={
              visible && !closing ? { y: "0%", opacity: 1 } : { y: "18%", opacity: 0 }
            }
            transition={lineTransition(0.15)}
          >
            <NamesMarkup />
          </motion.div>
          {shine && !closing && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <NamesMarkup shine />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}