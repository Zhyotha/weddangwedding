import { WEDDING } from "@/lib/wedding";
import { BotanicalDivider, CornerFloral } from "@/components/invitation/Ornaments";
import FallingPetals from "@/components/invitation/motion/Ambient";
import Reveal from "@/components/invitation/motion/Reveal";
import Sheen from "@/components/invitation/motion/Sheen";

export default function SiteFooter() {
  return (
    <footer className="tone-cream relative overflow-hidden px-5 pb-16 pt-16 text-center sm:px-8">
      <CornerFloral
        className="-left-14 -top-10 h-48 w-48 sm:h-60 sm:w-60"
        opacity={0.5}
        duration={19}
        amplitude={1.5}
        float={6}
        flipY
      />
      <CornerFloral
        className="-right-14 -top-10 h-48 w-48 sm:h-60 sm:w-60"
        opacity={0.5}
        duration={23}
        amplitude={1.3}
        delay={1.5}
        float={7}
        flipX
        flipY
      />
      <FallingPetals count={5} seed={41} leafRatio={0.4} opacity={0.45} />

      <div className="relative mx-auto max-w-md">
        <Reveal variant="fade">
          <p className="text-[0.55rem] uppercase tracking-[0.45em] text-foreground/45">
            The Wedding of
          </p>
        </Reveal>

        <Reveal delay={0.15} variant="soft" duration={1.3}>
          <div className="relative mt-4 inline-block">
            <p className="font-script text-[2.9rem] leading-tight text-[#4A2222]">
              {WEDDING.groom.name} &amp; {WEDDING.bride.name}
            </p>
            <Sheen delay={1.8} repeatDelay={8} />
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-3 text-[0.58rem] uppercase tracking-[0.36em] text-foreground/55">
            {WEDDING.dateShort} · {WEDDING.region}
          </p>
        </Reveal>

        <BotanicalDivider className="mt-8" />

        <Reveal delay={0.1}>
          <p className="mt-6 text-[0.9rem] leading-[1.9] text-foreground/65">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i
            berkenan hadir dan memberikan do&apos;a restu kepada kedua mempelai.
          </p>
        </Reveal>

        <Reveal delay={0.2} variant="fade">
          <p className="mt-8 text-[0.52rem] uppercase tracking-[0.32em] text-foreground/40">
            Dibuat dengan cinta
          </p>
        </Reveal>
      </div>
    </footer>
  );
}