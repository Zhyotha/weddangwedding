import { motion } from "framer-motion";
import { BotanicalDivider } from "@/components/invitation/Ornaments";
import SectionGarden from "@/components/invitation/ornaments/SectionGarden";
import FallingPetals from "@/components/invitation/motion/Ambient";
import Reveal, { EASE } from "@/components/invitation/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/invitation/motion/Stagger";
import { WEDDING } from "@/lib/wedding";

export default function VerseSection() {
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24">
      <SectionGarden seed={1} tone="sage" accent="blush" ground={false} opacity={0.34} />
      <FallingPetals count={4} seed={11} leafRatio={0.5} opacity={0.45} />

      <Reveal className="relative mx-auto max-w-xl" variant="soft">
        <div className="relative border border-accent/30 bg-card/50 px-6 py-12 text-center sm:px-10 sm:py-14">
          <motion.span
            aria-hidden="true"
            className="absolute left-4 top-3 font-display text-4xl leading-none text-accent/50"
            initial={{ opacity: 0, scale: 0.5, rotate: -14 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            &ldquo;
          </motion.span>
          <motion.span
            aria-hidden="true"
            className="absolute bottom-3 right-4 font-display text-4xl leading-none text-accent/50"
            initial={{ opacity: 0, scale: 0.5, rotate: 14 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          >
            &rdquo;
          </motion.span>

          <StaggerGroup stagger={0.22} amount={0.35}>
            <StaggerItem>
              <p className="text-[0.55rem] uppercase tracking-[0.42em] text-foreground/45">
                Q.S. Ar-Rum : 21
              </p>
            </StaggerItem>
            <StaggerItem duration={1.3}>
              <p className="mt-6 font-display text-[1.05rem] italic leading-[1.95] text-foreground/85 sm:text-[1.15rem]">
                {WEDDING.verse}
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-7 text-[0.58rem] uppercase tracking-[0.38em] text-foreground/50">
                {WEDDING.verseSource}
              </p>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </Reveal>

      <BotanicalDivider className="mt-12" />
    </section>
  );
}