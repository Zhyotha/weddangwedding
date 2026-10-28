import { Image } from "@/components/ui/image";
import Reveal from "@/components/invitation/Reveal";
import SectionLabel from "@/components/invitation/SectionLabel";
import { WEDDING } from "@/lib/wedding";

function Person({ person }) {
  return (
    <div>
      <p className="font-display text-[2.1rem] leading-none text-foreground">{person.name}</p>
      <div className="mt-5 h-px w-10 bg-accent/60" />
      <p className="mt-5 text-[0.55rem] uppercase tracking-[0.32em] text-muted-foreground">
        {person.order}
      </p>
      <p className="mt-3 text-[0.95rem] leading-[1.9] text-foreground/80">
        {person.father}
        <br />
        &amp; {person.mother}
      </p>
    </div>
  );
}

export default function CoupleSection() {
  return (
    <section className="px-6 pb-20 sm:px-10 lg:px-14 lg:pb-24 xl:px-20">
      <Reveal>
        <div className="overflow-hidden rounded-sm">
          <Image
            src={WEDDING.images.hands}
            alt="Tangan Romli dan Andini"
            fittingType="fill"
            className="aspect-[3/2] w-full object-cover"
          />
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-14">
        <SectionLabel>Mempelai</SectionLabel>

        <div className="mt-10 grid gap-12 sm:grid-cols-2 sm:gap-10">
          <Person person={WEDDING.groom} />
          <Person person={WEDDING.bride} />
        </div>
      </Reveal>
    </section>
  );
}