import Reveal from "@/components/invitation/Reveal";
import SectionLabel from "@/components/invitation/SectionLabel";
import useCountdown from "@/hooks/useCountdown";
import { WEDDING } from "@/lib/wedding";

export default function CountdownSection() {
  const { days, hours, minutes, seconds, done } = useCountdown(WEDDING.countdownTarget);

  const units = [
    { label: "Hari", value: days },
    { label: "Jam", value: hours },
    { label: "Menit", value: minutes },
    { label: "Detik", value: seconds },
  ];

  return (
    <section className="border-y border-border/70 bg-secondary/40 px-6 py-20 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
      <Reveal>
        <SectionLabel>Hari yang dinanti</SectionLabel>
        <p className="mt-7 font-display text-3xl leading-tight text-foreground sm:text-4xl">
          {WEDDING.dateLabel}
        </p>

        {done ? (
          <p className="mt-8 font-display text-xl italic text-accent">
            Alhamdulillah, kami telah menikah.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-4 divide-x divide-border border-y border-border">
            {units.map((unit) => (
              <div key={unit.label} className="px-1 py-7 text-center">
                <p className="font-mono text-2xl tabular-nums text-foreground sm:text-3xl">
                  {unit.value}
                </p>
                <p className="mt-3 text-[0.5rem] uppercase tracking-[0.3em] text-muted-foreground">
                  {unit.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}