import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionLabel from "@/components/invitation/SectionLabel";
import SectionGarden from "@/components/invitation/ornaments/SectionGarden";
import Parallax from "@/components/invitation/motion/Parallax";
import Reveal from "@/components/invitation/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/invitation/motion/Stagger";
import { WEDDING } from "@/lib/wedding";

export default function VenueSection() {
  return (
    <section id="lokasi" className="tone-cream relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24">
      <SectionGarden seed={6} tone="sage" accent="rose" opacity={0.4} />

      <div className="relative z-10 mx-auto max-w-xl">
        <Reveal variant="soft" duration={1.35}>
          <div className="border border-accent/30 p-2.5">
            <div className="overflow-hidden">
              <Parallax distance={16}>
                <Image
                  src={WEDDING.images.coast}
                  alt="Suasana lokasi acara"
                  fittingType="fill"
                  className="aspect-[16/11] w-full scale-[1.03] object-cover sepia-[0.18]"
                />
              </Parallax>
            </div>
          </div>
        </Reveal>

        <StaggerGroup className="mt-10 text-center" stagger={0.18} amount={0.3}>
          <StaggerItem>
            <SectionLabel align="center">Lokasi Acara</SectionLabel>
          </StaggerItem>
          <StaggerItem variant="soft">
            <p className="mt-6 font-script text-[2.4rem] leading-tight text-[#4A2222]">
              {WEDDING.venue.name}
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto mt-3 max-w-xs text-[0.92rem] leading-relaxed text-foreground/65">
              {WEDDING.venue.detail}
            </p>
          </StaggerItem>
          <StaggerItem variant="pop">
            <motion.a
              href={WEDDING.venue.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border border-accent/60 px-8 py-3 text-[0.6rem] uppercase tracking-[0.3em] text-[#4A2222] transition-colors duration-500 hover:bg-[#4A2222] hover:text-[#FDFBF7]"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-current opacity-20"
                  animate={{ scale: [1, 2.1], opacity: [0.35, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                />
                <MapPin size={14} />
              </span>
              Lihat Lokasi
            </motion.a>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}