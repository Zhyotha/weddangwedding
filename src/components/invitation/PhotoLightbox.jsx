import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Image } from "@/components/ui/image";
import { EASE } from "@/components/invitation/motion/Reveal";

export default function PhotoLightbox({ photos, index, onClose, onNavigate }) {
  const photo = photos[index];
  const [direction, setDirection] = useState(1);

  const step = (delta) => {
    setDirection(delta);
    onNavigate((index + delta + photos.length) % photos.length);
  };

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  });

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#22110f]/92 px-4 py-8 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Galeri foto"
    >
      <motion.div
        className="relative w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.55, ease: EASE }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="overflow-hidden border border-accent/40 p-2">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: direction * 42, scale: 0.99 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -42, scale: 0.99 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fittingType="fit"
                className="max-h-[74vh] w-full object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-4 text-center text-[0.6rem] uppercase tracking-[0.32em] text-[#F3E7D6]/70">
          {photo.alt}
        </p>
        <p className="mt-1 text-center text-[0.52rem] uppercase tracking-[0.3em] text-[#F3E7D6]/40">
          {index + 1} / {photos.length}
        </p>
      </motion.div>

      <motion.button
        type="button"
        onClick={onClose}
        aria-label="Tutup"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#E8D9C3]/40 text-[#F3E7D6] transition-colors hover:bg-[#F3E7D6]/10"
        whileHover={{ scale: 1.08, rotate: 90 }}
        whileTap={{ scale: 0.94 }}
      >
        <X size={18} />
      </motion.button>

      {photos.length > 1 && (
        <>
          <motion.button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            aria-label="Foto sebelumnya"
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E8D9C3]/40 text-[#F3E7D6] transition-colors hover:bg-[#F3E7D6]/10 sm:left-5"
            whileHover={{ scale: 1.08, x: -2 }}
            whileTap={{ scale: 0.94 }}
          >
            <ChevronLeft size={19} />
          </motion.button>
          <motion.button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            aria-label="Foto berikutnya"
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E8D9C3]/40 text-[#F3E7D6] transition-colors hover:bg-[#F3E7D6]/10 sm:right-5"
            whileHover={{ scale: 1.08, x: 2 }}
            whileTap={{ scale: 0.94 }}
          >
            <ChevronRight size={19} />
          </motion.button>
        </>
      )}
    </motion.div>
  );
}