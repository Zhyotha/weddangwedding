import { motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { GoldRule } from "@/components/invitation/Ornaments";
import SectionFlorals from "@/components/invitation/ornaments/Flora";
import Parallax from "@/components/invitation/motion/Parallax";
import Sheen from "@/components/invitation/motion/Sheen";
import { EASE } from "@/components/invitation/motion/Reveal";
import useGuestName from "@/hooks/useGuestName";
import { WEDDING } from "@/lib/wedding";

const rise = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function OpeningSection() {
  const guest = useGuestName();
  const reduced = useReducedMotion();
  const still = { hidden: { opacity: 1 }, show: { opacity: 1 } };
  const item = reduced ? still : rise;

  return (
    <section id="undangan" className="relative px-5 pb-20 pt-20 sm:px-8 sm:pt-24">
      <SectionFlorals variant="hero" />

      <motion.div
        className="relative z-10 mx-auto max-w-xl text-center"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } } }}
      >
        <motion.p
          variants={item}
          transition={{ duration: 1.1, ease: EASE }}
          className="text-[0.6rem] uppercase tracking-[0.5em] text-foreground/55"
        >
          The Wedding of
        </motion.p>

        <motion.div
          variants={item}
          transition={{ duration: 1.3, ease: EASE }}
          className="relative mt-5"
        >
          <h1 className="font-script text-[clamp(3.4rem,16vw,5.2rem)] leading-[1.02] text-[#4A2222]">
            {WEDDING.groom.name}
            <span className="mx-2 font-display text-3xl italic text-accent">&amp;</span>
            {WEDDING.bride.name}
          </h1>
          <Sheen delay={2.4} repeatDelay={9} />
        </motion.div>

        <motion.div variants={item} transition={{ duration: 1.1, ease: EASE }}>
          <GoldRule className="mt-7" />
        </motion.div>

        <motion.p
          variants={item}
          transition={{ duration: 1.1, ease: EASE }}
          className="mt-7 font-display text-[1.05rem] uppercase tracking-[0.28em] text-foreground/80"
        >
          {WEDDING.dateLabel}
        </motion.p>
        <motion.p
          variants={item}
          transition={{ duration: 1.1, ease: EASE }}
          className="mt-3 text-[0.62rem] uppercase tracking-[0.4em] text-foreground/50"
        >
          {WEDDING.region}
        </motion.p>

        <motion.figure
          variants={item}
          transition={{ duration: 1.5, ease: EASE }}
          className="relative mx-auto mt-12 w-full max-w-[19rem]"
        >
          <motion.span
            aria-hidden="true"
            className="absolute -inset-2 -z-10 block rounded-t-[999px] border border-accent/30"
            initial={reduced ? undefined : { opacity: 0, scale: 0.94 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, delay: 0.4, ease: EASE }}
          />
          <div className="overflow-hidden rounded-t-[999px] shadow-[0_30px_70px_-40px_rgba(74,34,34,0.6)]">
            <Parallax distance={14}>
              <div className="ken-burns">
                <Image
                  src={WEDDING.images.cover}
                  alt={`${WEDDING.groom.name} dan ${WEDDING.bride.name}`}
                  fittingType="fill"
                  focalPointY={0.32}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </Parallax>
          </div>
          <figcaption className="mt-6 font-script text-2xl text-foreground/70">
            {WEDDING.initials}
          </figcaption>
        </motion.figure>

        <motion.div
          variants={item}
          transition={{ duration: 1.2, ease: EASE }}
        
        >
        </motion.div>

        <motion.div
          variants={item}
          transition={{ duration: 1.2, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-2 text-foreground/45"
        >
          <span className="text-[0.55rem] uppercase tracking-[0.4em]">Gulir ke bawah</span>
          <span className="scroll-cue h-10 w-px bg-gradient-to-b from-accent/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}