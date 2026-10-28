import { motion } from "framer-motion";
import { Music2, Pause } from "lucide-react";

function Equalizer() {
  return (
    <span className="flex h-4 items-end gap-[3px]">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="w-[2px] rounded-full bg-current"
          animate={{ height: [5, 14, 7, 12, 5] }}
          transition={{
            duration: 1.4 + index * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.12,
          }}
        />
      ))}
    </span>
  );
}

export default function MusicToggle({ playing, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? "Matikan musik" : "Nyalakan musik"}
      className="fixed bottom-6 right-5 z-40 flex min-h-[48px] items-center gap-3 rounded-full border border-border bg-background/85 px-4 py-2 shadow-[0_10px_30px_-18px_rgba(26,43,60,0.6)] backdrop-blur transition-colors hover:border-accent/60 sm:right-8"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
        {playing ? <Equalizer /> : <Music2 size={13} />}
      </span>
      <span className="pr-1 text-[0.58rem] uppercase tracking-[0.32em] text-muted-foreground">
        {playing ? "Musik" : "Putar"}
      </span>
      <Pause size={11} className={playing ? "text-muted-foreground" : "hidden"} />
    </button>
  );
}