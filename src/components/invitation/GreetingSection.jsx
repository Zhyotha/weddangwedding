import SectionLabel from "@/components/invitation/SectionLabel";
import Sheen from "@/components/invitation/motion/Sheen";
import { StaggerGroup, StaggerItem } from "@/components/invitation/motion/Stagger";
import SectionFlorals from "@/components/invitation/ornaments/Flora";

export default function GreetingSection() {
  return (
    <section className="relative px-5 pb-20 sm:px-8 sm:pb-24">
      <SectionFlorals variant="greeting" />

      <StaggerGroup className="relative z-10 mx-auto max-w-xl text-center" stagger={0.2} amount={0.4}>
        <StaggerItem>
          <SectionLabel align="center">Undangan</SectionLabel>
        </StaggerItem>
        <StaggerItem variant="soft" duration={1.3}>
          <p className="mt-8 font-display text-[1.6rem] italic leading-snug text-[#4A2222] sm:text-[1.85rem]">
            Assalamualaikum Wr. Wb.
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mx-auto mt-6 max-w-md text-[0.98rem] leading-[1.95] text-foreground/75">
            Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara untuk hadir
            di hari pernikahan kami.
          </p>
        </StaggerItem>
        <StaggerItem variant="fade">
          <div className="mx-auto mt-7 flex items-center justify-center gap-2.5 opacity-60">
            <span className="h-px w-7 bg-accent/50" />
            <span className="block h-2.5 w-2.5 rotate-45 border border-accent/60" />
            <span className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-foreground/45">
              R &amp; A
            </span>
            <span className="block h-2.5 w-2.5 rotate-45 border border-accent/60" />
            <span className="h-px w-7 bg-accent/50" />
          </div>
        </StaggerItem>
        <StaggerItem variant="pop">
          <div className="relative mx-auto mt-6 inline-block">
            <p className="font-script text-3xl text-accent">Romli &amp; Andini</p>
            <Sheen delay={1.2} repeatDelay={8} />
          </div>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}