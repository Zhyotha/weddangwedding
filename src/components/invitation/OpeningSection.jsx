import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/invitation/Reveal";
import { WEDDING } from "@/lib/wedding";

export default function OpeningSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-16 sm:px-10 lg:px-14 lg:pb-24 lg:pt-24 xl:px-20">
      <span className="pointer-events-none absolute -right-6 top-6 select-none font-display text-[8rem] leading-none text-foreground/[0.04] sm:text-[11rem]">
        R&amp;A
      </span>

      <Reveal>
        <p className="text-[0.58rem] uppercase tracking-[0.45em] text-muted-foreground">
          The Wedding Of
        </p>
        <h1 className="mt-6 font-display text-[2.9rem] font-light leading-[1.02] text-foreground sm:text-6xl xl:text-[4.4rem]">
          {WEDDING.groom.name}
          <br />
          <span className="text-accent">&</span> {WEDDING.bride.name}
        </h1>
        <div className="mt-8 h-px w-16 bg-accent/60" />
        <p className="mt-7 text-[0.72rem] uppercase tracking-[0.34em] text-foreground/75">
          {WEDDING.dateLabel}
        </p>
        <p className="mt-3 text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">
          {WEDDING.region}
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-12 lg:hidden">
        <div className="overflow-hidden rounded-sm">
          <Image
            src={WEDDING.images.cover}
            alt="Romli dan Andini"
            fittingType="fill"
            focalPointY={0.32}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </Reveal>

      <Reveal delay={0.25} className="mt-14 lg:mt-20">
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="text-[0.55rem] uppercase tracking-[0.38em]">Scroll ke bawah</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={15} />
          </motion.span>
        </div>
      </Reveal>
    </section>
  );
}