import { motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { CornerFloral, GoldRule } from "@/components/invitation/Ornaments";
import FallingPetals, { Butterfly } from "@/components/invitation/motion/Ambient";
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
    <section id="undangan" className="relative overflow-hidden px-5 pb-20 pt-20 sm:px-8 sm:pt-24">
      <CornerFloral
        className="-left-24 -top-24 h-72 w-72 sm:h-96 sm:w-96"
        opacity={0.32}
        duration={24}
        amplitude={2}
        float={10}
      />
      <CornerFloral
        className="-right-20 top-8 h-56 w-56 sm:h-72 sm:w-72"
        flipX
        opacity={0.42}
        duration={17}
        amplitude={1.5}
        delay={1.4}
        float={6}
      />
      <CornerFloral
        className="-left-12 bottom-6 h-44 w-44 sm:h-52 sm:w-52"
        flipY
        opacity={0.3}
        duration={20}
        amplitude={1.2}
        delay={2.2}
      />
      <FallingPetals count={7} seed={3} leafRatio={0.3} opacity={0.6} />
      <Butterfly className="left-[16%] top-[24%]" size={15} duration={26} delay={3} range={30} />

      <motion.div
        className="relative mx-auto max-w-xl text-center"
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
          className="mt-12 border-y border-accent/25 px-5 py-7"
        >
          <p className="text-[0.55rem] uppercase tracking-[0.42em] text-foreground/45">Kepada</p>
          <p className="mt-3 font-display text-xl italic text-foreground">
            {guest || "Bapak / Ibu / Saudara / i"}
          </p>
          <p className="mt-2 text-[0.8rem] leading-relaxed text-foreground/55">
            Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di hari bahagia kami.
          </p>
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