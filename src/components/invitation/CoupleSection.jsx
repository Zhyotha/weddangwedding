import { Image } from "@/components/ui/image";
import SectionLabel from "@/components/invitation/SectionLabel";
import SectionFlorals from "@/components/invitation/ornaments/Flora";
import Parallax from "@/components/invitation/motion/Parallax";
import Reveal from "@/components/invitation/motion/Reveal";
import Sway from "@/components/invitation/motion/Sway";
import { StaggerGroup, StaggerItem } from "@/components/invitation/motion/Stagger";
import { WEDDING } from "@/lib/wedding";

function Person({ person, role }) {
  return (
    <StaggerItem className="text-center">
      <Sway className="mx-auto h-16 w-16" duration={11} amplitude={3} origin="50% 100%" float={4}>
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/50 bg-card/70 font-script text-3xl text-[#4A2222] shadow-[0_10px_30px_-20px_rgba(74,34,34,0.8)]">
          {person.initial}
        </span>
      </Sway>
      <p className="mt-5 text-[0.55rem] uppercase tracking-[0.4em] text-foreground/45">{role}</p>
      <p className="mt-2 font-script text-[2.6rem] leading-tight text-[#4A2222]">{person.name}</p>
      <p className="mt-4 text-[0.58rem] uppercase tracking-[0.32em] text-foreground/45">
        {person.order}
      </p>
      <p className="mt-2 text-[0.95rem] leading-[1.85] text-foreground/75">
        {person.father}
        <br />
        &amp; {person.mother}
      </p>
    </StaggerItem>
  );
}

export default function CoupleSection() {
  return (
    <section
      id="mempelai"
      className="tone-blush relative px-5 py-20 sm:px-8 sm:py-24"
    >
      <SectionFlorals variant="couple" />

      <div className="relative z-10 mx-auto max-w-xl">
        <Reveal variant="soft" duration={1.4}>
          <div className="relative border border-accent/30 p-2.5">
            <div className="relative overflow-hidden">
              <Parallax distance={20}>
                <div className="ken-burns">
                  <Image
                    src={WEDDING.images.hands}
                    alt="Kebersamaan Andini dan Romli "
                    fittingType="fill"
                    focalPointY={0.4}
                    className="aspect-[4/5] w-full object-cover sm:aspect-[3/2]"
                  />
                </div>
              </Parallax>
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4A2222]/12 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>

        <div className="mt-12 text-center">
          <SectionLabel align="center">Mempelai</SectionLabel>
        </div>

        <StaggerGroup
          className="mt-10 grid gap-12 sm:grid-cols-2 sm:gap-8"
          stagger={0.22}
          amount={0.15}
        >
          <Person person={WEDDING.groom} role="Mempelai Wanita" />
          <div className="hidden items-center justify-center sm:flex">
            <Sway duration={13} amplitude={4} origin="50% 50%" float={5}>
              <span className="font-script text-4xl text-accent/70">&amp;</span>
            </Sway>
          </div>
          <Person person={WEDDING.bride} role="Mempelai Pria" />
        </StaggerGroup>
      </div>
    </section>
  );
}