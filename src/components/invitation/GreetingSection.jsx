import Reveal from "@/components/invitation/Reveal";
import SectionLabel from "@/components/invitation/SectionLabel";

export default function GreetingSection() {
  return (
    <section className="px-6 py-20 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
      <Reveal className="max-w-lg">
        <SectionLabel>Undangan</SectionLabel>
        <p className="mt-8 font-display text-2xl italic text-foreground sm:text-[1.75rem]">
          Assalamualaikum Wr. Wb.
        </p>
        <p className="mt-6 text-[0.95rem] leading-[1.95] text-foreground/75">
          Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara untuk hadir
          di hari pernikahan kami.
        </p>
      </Reveal>
    </section>
  );
}