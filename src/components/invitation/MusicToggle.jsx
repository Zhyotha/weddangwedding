import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

function Equalizer() {
  return (
    <span className="flex h-4 items-end gap-[3px]">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="w-[2px] rounded-full bg-current"
          animate={{ height: [5, 14, 7, 12, 5] }}
          transition={{
            duration: 1.6 + index * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.14,
          }}
        />
      ))}
    </span>
  );
}

export default function MusicToggle({ playing, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={playing ? "Matikan musik" : "Nyalakan musik"}
      className="fixed bottom-5 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-accent/50 bg-background/90 text-[#4A2222] shadow-[0_16px_34px_-22px_rgba(74,34,34,0.9)] backdrop-blur transition-colors duration-500 hover:bg-accent/15 sm:right-6"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      {playing ? <Equalizer /> : <Music2 size={15} />}
      {playing && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full border border-accent/50"
          animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className="sr-only">{playing ? "Musik menyala" : "Musik mati"}</span>
    </motion.button>
  );
}