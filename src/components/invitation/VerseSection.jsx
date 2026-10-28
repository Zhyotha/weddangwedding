import Reveal from "@/components/invitation/Reveal";
import { WEDDING } from "@/lib/wedding";

export default function VerseSection() {
  return (
    <section className="border-y border-border/70 bg-secondary/40 px-6 py-20 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="font-display text-3xl leading-none text-accent">&ldquo;</p>
        <p className="mt-4 font-display text-lg italic leading-[1.85] text-foreground/85 sm:text-xl">
          {WEDDING.verse}
        </p>
        <div className="mx-auto mt-8 h-px w-10 bg-accent/50" />
        <p className="mt-5 text-[0.58rem] uppercase tracking-[0.38em] text-muted-foreground">
          {WEDDING.verseSource}
        </p>
      </Reveal>
    </section>
  );
}