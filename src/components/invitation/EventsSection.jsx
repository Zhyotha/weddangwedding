import Reveal from "@/components/invitation/Reveal";
import SectionLabel from "@/components/invitation/SectionLabel";
import { WEDDING } from "@/lib/wedding";

export default function EventsSection() {
  return (
    <section id="acara" className="px-6 py-20 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
      <Reveal>
        <SectionLabel>Rangkaian Acara</SectionLabel>

        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {WEDDING.events.map((event) => (
            <div key={event.key} className="bg-background px-7 py-9">
              <p className="text-[0.55rem] uppercase tracking-[0.38em] text-accent">
                {event.label}
              </p>
              <p className="mt-5 font-display text-[1.6rem] leading-snug text-foreground">
                {event.day}
              </p>
              <div className="mt-4 h-px w-8 bg-border" />
              <p className="mt-4 text-[0.8rem] uppercase tracking-[0.16em] text-muted-foreground">
                {event.time}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}