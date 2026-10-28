import { motion } from "framer-motion";
import { MailOpen } from "lucide-react";
import { Image } from "@/components/ui/image";
import { WEDDING, guestNameFromUrl } from "@/lib/wedding";

export default function CoverGate({ onOpen }) {
  const guest = guestNameFromUrl();

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-primary"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 26, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      >
        <Image
          src={WEDDING.images.cover}
          alt="Romli dan Andini"
          fittingType="fill"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#132433]/85 via-[#132433]/55 to-[#132433]/92" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 py-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="text-[0.58rem] uppercase tracking-[0.5em] text-[#d9be85]"
        >
          The Wedding Of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5 }}
          className="mt-7 font-display text-[2.9rem] font-light leading-[1.05] text-white sm:text-6xl"
        >
          {WEDDING.groom.name}{" "}
          <span className="text-[#d9be85]">&</span> {WEDDING.bride.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 h-px w-24 bg-[#d9be85]/70"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.95 }}
          className="mt-7 text-[0.72rem] uppercase tracking-[0.32em] text-white/85"
        >
          {WEDDING.dateLabel}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-3 text-[0.6rem] uppercase tracking-[0.4em] text-white/55"
        >
          {WEDDING.region}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.25 }}
          className="mt-12 max-w-xs"
        >
          <p className="text-[0.55rem] uppercase tracking-[0.4em] text-white/45">Kepada</p>
          <p className="mt-3 font-display text-xl italic text-white/95">
            {guest || "Bapak / Ibu / Saudara / i"}
          </p>
        </motion.div>

        <motion.button
          type="button"
          onClick={onOpen}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.45 }}
          className="mt-11 inline-flex min-h-[48px] items-center gap-3 border border-[#d9be85]/60 px-8 py-4 text-[0.6rem] uppercase tracking-[0.35em] text-white transition-colors duration-300 hover:bg-[#d9be85] hover:text-[#132433]"
        >
          <MailOpen size={14} />
          Buka Undangan
        </motion.button>
      </div>
    </motion.div>
  );
}