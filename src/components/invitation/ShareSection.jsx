import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, MessageCircle } from "lucide-react";
import SectionLabel from "@/components/invitation/SectionLabel";
import SectionFlorals from "@/components/invitation/ornaments/Flora";
import { StaggerGroup, StaggerItem } from "@/components/invitation/motion/Stagger";
import { WEDDING } from "@/lib/wedding";

export default function ShareSection() {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!copied) return undefined;
    const id = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(id);
  }, [copied]);

  const shareMessage = `Undangan pernikahan ${WEDDING.groom.name} & ${WEDDING.bride.name} — ${WEDDING.dateLabel}. ${shareUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <section className="relative px-5 py-20 sm:px-8 sm:py-24">
      <SectionFlorals variant="share" />

      <StaggerGroup className="relative z-10 mx-auto max-w-xl text-center" stagger={0.2} amount={0.4}>
        <StaggerItem>
          <SectionLabel align="center">Bagikan undangan</SectionLabel>
        </StaggerItem>
        <StaggerItem>
          <p className="mx-auto mt-6 max-w-sm text-[0.95rem] leading-[1.9] text-foreground/70">
            Opsional — bagikan undangan ini kepada keluarga dan sahabat yang mungkin
            belum kami kabari.
          </p>
        </StaggerItem>

        <StaggerItem variant="pop">
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <motion.button
              type="button"
              onClick={handleCopy}
              whileHover={reduced ? undefined : { y: -2 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border border-accent/50 px-6 text-[0.58rem] uppercase tracking-[0.28em] text-[#4A2222] transition-colors duration-500 hover:border-accent hover:bg-accent/10"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "check" : "copy"}
                  initial={{ scale: 0.4, opacity: 0, rotate: -25 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.4, opacity: 0, rotate: 25 }}
                  transition={{ duration: 0.3 }}
                  className="flex"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                </motion.span>
              </AnimatePresence>
              {copied ? "Tautan tersalin" : "Salin tautan"}
            </motion.button>

            <motion.a
              href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
              target="_blank"
              rel="noreferrer"
              whileHover={reduced ? undefined : { y: -2 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-[#4A2222] px-6 text-[0.58rem] uppercase tracking-[0.28em] text-[#FDFBF7] transition-opacity duration-500 hover:opacity-90"
            >
              <MessageCircle size={13} />
              WhatsApp
            </motion.a>
          </div>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}