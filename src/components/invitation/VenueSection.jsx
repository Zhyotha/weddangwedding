import { MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/invitation/Reveal";
import SectionLabel from "@/components/invitation/SectionLabel";
import { WEDDING } from "@/lib/wedding";

export default function VenueSection() {
  return (
    <section id="lokasi" className="px-6 pb-20 sm:px-10 lg:px-14 lg:pb-24 xl:px-20">
      <Reveal>
        <div className="overflow-hidden rounded-sm">
          <Image
            src={WEDDING.images.coast}
            alt="Pesisir Tanimbar"
            fittingType="fill"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>

        <div className="mt-9 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Lokasi Acara</SectionLabel>
            <p className="mt-5 font-display text-[2.1rem] leading-none text-foreground">
              {WEDDING.venue.name}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{WEDDING.venue.detail}</p>
          </div>

          <a
            href={WEDDING.venue.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 border border-foreground/15 px-7 py-3.5 text-[0.58rem] uppercase tracking-[0.3em] text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <MapPin size={13} />
            Lihat Lokasi
          </a>
        </div>
      </Reveal>
    </section>
  );
}