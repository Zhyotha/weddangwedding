import SectionLabel from "@/components/invitation/SectionLabel";
import Sheen from "@/components/invitation/motion/Sheen";
import { Butterfly } from "@/components/invitation/motion/Ambient";
import { StaggerGroup, StaggerItem } from "@/components/invitation/motion/Stagger";
import SectionGarden from "@/components/invitation/ornaments/SectionGarden";

export default function GreetingSection() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 sm:px-8 sm:pb-24">
      <SectionGarden seed={2} tone="rose" accent="sage" vines={false} opacity={0.36} />
      <Butterfly className="right-[14%] top-6" size={14} duration={28} delay={1.5} range={-24} />

      <StaggerGroup className="relative mx-auto max-w-xl text-center" stagger={0.2} amount={0.4}>
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