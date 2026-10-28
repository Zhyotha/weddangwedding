import { useEffect, useState } from "react";
import { Check, Copy, MessageCircle } from "lucide-react";
import Reveal from "@/components/invitation/Reveal";
import SectionLabel from "@/components/invitation/SectionLabel";
import { WEDDING } from "@/lib/wedding";

export default function ShareSection() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(id);
  }, [copied]);

  const shareUrl = window.location.href;
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
    <section className="border-t border-border/70 px-6 py-20 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
      <Reveal>
        <SectionLabel>Bagikan momentmu</SectionLabel>
        <p className="mt-7 max-w-md text-[0.92rem] leading-[1.95] text-foreground/75">
          Opsional — bagikan undangan ini kepada keluarga dan sahabat yang mungkin
          belum kami kabari.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 border border-foreground/15 px-6 text-[0.58rem] uppercase tracking-[0.28em] text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Tautan tersalin" : "Salin tautan"}
          </button>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 bg-primary px-6 text-[0.58rem] uppercase tracking-[0.28em] text-primary-foreground transition-opacity duration-300 hover:opacity-90"
          >
            <MessageCircle size={13} />
            WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  );
}