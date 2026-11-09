import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Image } from "@/components/ui/image";
import SectionLabel from "@/components/invitation/SectionLabel";
import PhotoLightbox from "@/components/invitation/PhotoLightbox";
import SectionFlorals from "@/components/invitation/ornaments/Flora";
import { StaggerGroup, StaggerItem } from "@/components/invitation/motion/Stagger";
import { WEDDING } from "@/lib/wedding";

export default function GallerySection() {
  const [openIndex, setOpenIndex] = useState(null);
  const photos = WEDDING.gallery;

  return (
    <section id="galeri" className="tone-blush relative px-5 py-20 sm:px-8 sm:py-24">
      <SectionFlorals variant="gallery" />

      <div className="relative z-10 mx-auto max-w-xl">
        <StaggerGroup className="text-center" stagger={0.18} amount={0.35}>
          <StaggerItem>
            <SectionLabel align="center">Galeri</SectionLabel>
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto mt-6 max-w-sm text-[0.95rem] leading-[1.9] text-foreground/70">
              Sepotong cerita kami, sebelum hari bahagia itu tiba.
            </p>
          </StaggerItem>
        </StaggerGroup>

        <StaggerGroup className="mt-10 columns-2 gap-3 sm:columns-3" stagger={0.12} amount={0.08}>
          {photos.map((photo, index) => (
            <StaggerItem key={`${photo.src}-${index}`} variant="soft" duration={1.15}>
              <div
                className="float-y mb-3 break-inside-avoid"
                style={{
                  "--float-dur": `${14 + (index % 4) * 3}s`,
                  "--float-delay": `${index * 0.9}s`,
                  "--float-reach": `${4 + (index % 3) * 2}px`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  aria-label={`Buka foto: ${photo.alt}`}
                  className="group relative block w-full break-inside-avoid overflow-hidden border border-accent/25 bg-card/40 p-1.5 shadow-[0_20px_40px_-38px_rgba(74,34,34,0.9)] transition-colors duration-500 hover:border-accent/70"
                >
                  <span className="block overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fittingType="fill"
                      className="aspect-[3/4] w-full object-cover transition-transform [transition-duration:1.4s] ease-out group-hover:scale-[1.06]"
                    />
                  </span>
                  <span className="pointer-events-none absolute inset-1.5 bg-gradient-to-t from-[#4A2222]/35 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <PhotoLightbox
            key="lightbox"
            photos={photos}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNavigate={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}