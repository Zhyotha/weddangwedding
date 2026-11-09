import { AnimatePresence, motion } from "framer-motion";
import SectionLabel from "@/components/invitation/SectionLabel";
import { GoldRule } from "@/components/invitation/Ornaments";
import SectionFlorals from "@/components/invitation/ornaments/Flora";
import { EASE } from "@/components/invitation/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/invitation/motion/Stagger";
import useCountdown from "@/hooks/useCountdown";
import { WEDDING } from "@/lib/wedding";

function Digit({ value }) {
  return (
    <span className="relative block h-[1.15em] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.span
          key={value}
          className="absolute inset-0 flex items-center justify-center tabular-nums"
          initial={{ y: "65%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-65%", opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function CountdownSection() {
  const { days, hours, minutes, seconds, done } = useCountdown(WEDDING.countdownTarget);

  const units = [
    { label: "Hari", value: days },
    { label: "Jam", value: hours },
    { label: "Menit", value: minutes },
    { label: "Detik", value: seconds },
  ];

  return (
    <section className="tone-cream relative px-5 py-20 sm:px-8 sm:py-24">
      <SectionFlorals variant="countdown" />

      <div className="relative z-10 mx-auto max-w-xl text-center">
        <SectionLabel align="center">Hari yang dinanti</SectionLabel>

        <StaggerGroup className="mt-8" stagger={0.16}>
          <StaggerItem>
            <p className="font-display text-[1.9rem] leading-tight text-[#4A2222] sm:text-[2.3rem]">
              {WEDDING.dateLabel}
            </p>
          </StaggerItem>
          <StaggerItem variant="fade">
            <GoldRule className="mt-6" />
          </StaggerItem>
          {done ? (
            <StaggerItem>
              <p className="mt-10 font-display text-xl italic text-accent">
                Alhamdulillah, kami telah menikah.
              </p>
            </StaggerItem>
          ) : (
            <StaggerItem variant="pop">
              <div className="mt-10 grid grid-cols-4 gap-2 sm:gap-3">
                {units.map((unit) => (
                  <motion.div
                    key={unit.label}
                    className="relative border border-accent/25 bg-card/60 px-1 py-5 sm:py-6"
                    whileHover={{ y: -3, borderColor: "hsl(var(--accent) / 0.5)" }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <span
                      aria-hidden="true"
                      className="breathe pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_120%,hsl(var(--blush)/0.7),transparent_70%)]"
                      style={{ "--breathe-dur": `${7 + units.indexOf(unit)}s` }}
                    />
                    <p className="relative font-display text-[1.9rem] leading-none text-[#4A2222] sm:text-4xl">
                      <Digit value={unit.value} />
                    </p>
                    <p className="relative mt-2.5 text-[0.5rem] uppercase tracking-[0.26em] text-foreground/45 sm:text-[0.55rem]">
                      {unit.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </StaggerItem>
          )}
        </StaggerGroup>
      </div>
    </section>
  );
}