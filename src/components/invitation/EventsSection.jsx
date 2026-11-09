import { motion, useReducedMotion } from "framer-motion";
import { Gem, Heart } from "lucide-react";
import SectionLabel from "@/components/invitation/SectionLabel";
import { FloralAccent } from "@/components/invitation/Ornaments";
import SectionFlorals from "@/components/invitation/ornaments/Flora";
import { EASE } from "@/components/invitation/motion/Reveal";
import Sway from "@/components/invitation/motion/Sway";
import { StaggerGroup, StaggerItem } from "@/components/invitation/motion/Stagger";
import { WEDDING } from "@/lib/wedding";

const ICONS = { akad: Gem, resepsi: Heart };

export default function EventsSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="acara"
      className="tone-blush relative px-5 py-20 sm:px-8 sm:py-24"
    >
      <SectionFlorals variant="events" />

      <div className="relative z-10 mx-auto max-w-xl">
        <StaggerGroup className="text-center" stagger={0.18} amount={0.3}>
          <StaggerItem>
            <SectionLabel align="center">Rangkaian Acara</SectionLabel>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 text-[0.95rem] leading-[1.9] text-foreground/70">
              Kami bermaksud menyelenggarakan rangkaian acara pernikahan ini pada waktu berikut:
            </p>
          </StaggerItem>
        </StaggerGroup>

        <StaggerGroup
          className="mt-10 grid gap-5 sm:grid-cols-2"
          stagger={0.22}
          delayChildren={0.15}
          amount={0.2}
        >
          {WEDDING.events.map((event, index) => {
            const Icon = ICONS[event.key] || Heart;
            return (
              <StaggerItem key={event.key} variant={index % 2 === 0 ? "left" : "right"} duration={1.15}>
                <motion.div
                  className="group relative h-full border border-accent/30 bg-gradient-to-b from-card/95 via-card/80 to-background/70 px-6 py-9 text-center shadow-[0_24px_50px_-42px_rgba(74,34,34,0.9)] transition-colors duration-500 hover:border-accent/60"
                  whileHover={reduced ? undefined : { y: -4 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <FloralAccent
                    className="-right-4 -top-5 h-16 w-12"
                    art={index % 2 === 0 ? "sprig" : "blossom"}
                    tone={index % 2 === 0 ? "sage" : "rose"}
                    accent={index % 2 === 0 ? "rose" : "sage"}
                    opacity={0.62}
                    duration={12 + index * 3}
                  />
                  <span className="absolute left-2.5 top-2.5 h-4 w-4 border-l border-t border-accent/40" />
                  <span className="absolute bottom-2.5 right-2.5 h-4 w-4 border-b border-r border-accent/40" />

                  <Sway
                    className="mx-auto h-11 w-11"
                    duration={10 + index * 2}
                    amplitude={4}
                    origin="50% 100%"
                    float={4}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 text-accent transition-colors duration-500 group-hover:border-accent group-hover:bg-accent/10">
                      <motion.span
                        initial={reduced ? undefined : { opacity: 0, scale: 0.4, rotate: -25 }}
                        whileInView={reduced ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                        className="flex"
                      >
                        <Icon size={17} strokeWidth={1.4} />
                      </motion.span>
                    </span>
                  </Sway>

                  <p className="mt-5 font-display text-[0.72rem] uppercase tracking-[0.34em] text-foreground/60">
                    {event.label}
                  </p>
                  <motion.p
                    className="mt-4 font-display text-[1.4rem] leading-snug text-[#4A2222]"
                    initial={reduced ? undefined : { opacity: 0, y: 12 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
                  >
                    {event.day}
                  </motion.p>
                  <motion.span
                    aria-hidden="true"
                    className="mx-auto mt-4 block h-px w-8 origin-center bg-accent/50"
                    initial={reduced ? undefined : { scaleX: 0 }}
                    whileInView={reduced ? undefined : { scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6, ease: EASE }}
                  />
                  <p className="mt-4 text-[0.78rem] uppercase tracking-[0.18em] text-foreground/60">
                    {event.time}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}