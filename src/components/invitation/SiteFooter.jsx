import { WEDDING } from "@/lib/wedding";
import { BotanicalDivider, BottomGarland } from "@/components/invitation/Ornaments";
import SectionFlorals from "@/components/invitation/ornaments/Flora";
import Reveal from "@/components/invitation/motion/Reveal";
import Sheen from "@/components/invitation/motion/Sheen";

export default function SiteFooter() {
  return (
    <footer className="tone-cream relative px-5 pb-32 pt-16 text-center sm:px-8">
      <SectionFlorals variant="footer" />

      <div className="relative z-10 mx-auto max-w-md">
        <Reveal variant="fade">
          <p className="text-[0.55rem] uppercase tracking-[0.45em] text-foreground/45">
            The Wedding of
          </p>
        </Reveal>

        <Reveal delay={0.15} variant="soft" duration={1.3}>
          <div className="relative mt-4 inline-block">
            <span className="font-script text-[2.9rem] leading-tight text-[#4A2222]">
              {WEDDING.groom.name}
            </span>

            <span className="font-script text-[2.9rem] leading-tight text-[#4A2222]">
            <br></br> & <br></br>
            </span>

            <span className="font-script text-[2.9rem] leading-tight text-[#4A2222]">
              {WEDDING.bride.name}
            </span>

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
            berkenan hadir dan memberikan do'a restu kepada kedua mempelai.
          </p>
        </Reveal>

        <Reveal delay={0.2} variant="fade">
          <p className="mt-8 text-[0.52rem] uppercase tracking-[0.32em] text-foreground/40">
            Dibuat dengan cinta
          </p>
        </Reveal>
      </div>

      {/* A bottom-spanning watercolour garland that closes the invitation. Its
          baseline sits on the footer's lower edge, so the blooms stay whole. */}
      <BottomGarland className="h-16 sm:h-24" opacity={0.92} duration={22} delay={0.6} />
    </footer>
  );
}