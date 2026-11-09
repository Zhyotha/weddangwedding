import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MailOpen } from "lucide-react";
import IntroStage from "@/components/invitation/intro/IntroStage";
import WeddingTypography from "@/components/invitation/intro/WeddingTypography";
import { CLOSING_MS, OPENING_CUES } from "@/components/invitation/intro/openingAssets";
import { WEDDING } from "@/lib/wedding";

const CUES = [
  [OPENING_CUES.curtain, 1], // curtain parts, camera pulls back
  [OPENING_CUES.eyebrow, 2], // "The Wedding of"
  [OPENING_CUES.names, 3], // the couple's names
  [OPENING_CUES.button, 4], // invitation ready to open
];

/**
 * The opening film: an etched Javanese landscape behind a curtain of branches.
 * The curtain parts, the lettering fades in, the picture holds still while the
 * water and butterflies keep moving, and the branches close again as the
 * invitation opens.
 */
export default function IntroExperience({ onEnter }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (reduced) {
      setSkipped(true);
      setStep(4);
      return undefined;
    }
    const timers = CUES.map(([at, value]) =>
      setTimeout(() => setStep((current) => Math.max(current, value)), at)
    );
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  const instant = Boolean(reduced) || skipped;

  const handleSkip = () => {
    if (closing) return;
    setSkipped(true);
    setStep(4);
  };

  const handleOpen = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(onEnter, CLOSING_MS - 150);
  };

  return (
    <motion.div
      className={`fixed inset-0 z-[60] h-[100dvh] w-full overflow-hidden ${closing ? "pointer-events-none" : ""}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: closing ? 0 : 1 }}
      transition={{ duration: closing ? 0.9 : 0.6, delay: closing ? CLOSING_MS / 1000 - 0.35 : 0, ease: "easeInOut" }}
    >
      <IntroStage curtainOpen={step >= 1} closing={closing} instant={instant}>
        <WeddingTypography
          eyebrow={step >= 2}
          names={step >= 3}
          closing={closing}
          instant={instant}
        />

        <div className="absolute inset-x-0 bottom-[7%] flex flex-col items-center gap-[3cqw]" style={{ zIndex: 35 }}>
          <motion.button
            type="button"
            onClick={handleOpen}
            initial={false}
            animate={step >= 4 ? { opacity: closing ? 0 : 1, y: 0 } : { opacity: 0, y: 14 }}
            whileHover={step >= 4 && !reduced ? { y: -2 } : undefined}
            whileTap={step >= 4 && !reduced ? { scale: 0.985 } : undefined}
            transition={{ duration: instant ? 0.3 : 1.3, ease: [0.22, 1, 0.36, 1] }}
            className={`group inline-flex min-h-[48px] items-center gap-[2.4cqw] rounded-full border border-[#B08D4F] bg-[#FBF5E6]/94 px-[6cqw] py-[2.6cqw] font-heading uppercase text-[#4A3220] shadow-[0_18px_44px_-26px_rgba(60,38,16,0.9)] backdrop-blur transition-colors duration-500 hover:bg-[#4A3220] hover:text-[#FBF5E6] ${
              step >= 4 ? "" : "pointer-events-none"
            }`}
            style={{ fontSize: "clamp(0.56rem, 2.9cqw, 0.86rem)", letterSpacing: "0.32em" }}
          >
            <span className="flex h-[7cqw] w-[7cqw] min-h-[22px] min-w-[22px] items-center justify-center rounded-full border border-current/40 font-script text-[0.9em] leading-none normal-case tracking-normal">
              {WEDDING.groom.initial}
            </span>
            <span>Open Invitation</span>
            <MailOpen size={13} className="opacity-70 transition-transform duration-500 group-hover:-rotate-12" />
          </motion.button>

          <AnimatePresence>
            {!skipped && !closing && (
              <motion.button
                type="button"
                onClick={handleSkip}
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 1 ? 0.66 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: step >= 1 ? 1.4 : 0 }}
                className="min-h-[36px] px-3 font-heading uppercase underline decoration-[#8A6A3A]/50 underline-offset-[6px] transition-opacity hover:opacity-100"
                style={{ color: "#F4E9D2", fontSize: "clamp(0.52rem, 2.4cqw, 0.72rem)", letterSpacing: "0.3em" }}
              >
                Lewati intro
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </IntroStage>

      <p aria-live="polite" className="sr-only">
        Selamat datang di undangan pernikahan {WEDDING.groom.name} dan {WEDDING.bride.name}.
        Sebuah pemandangan ukir Jawa dengan rumah Joglo dan air terjun sedang ditampilkan. Tekan
        tombol Open Invitation untuk masuk.
      </p>
    </motion.div>
  );
}