import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MailOpen } from "lucide-react";
import IntroStage from "@/components/invitation/intro/IntroStage";
import WeddingTypography from "@/components/invitation/intro/WeddingTypography";
import { INTRO_STEPS } from "@/components/invitation/intro/sceneAssets";
import { WEDDING } from "@/lib/wedding";

const LAST_STEP = INTRO_STEPS.length - 1;

/**
 * The opening experience: a choreographed watercolour painting that comes to
 * life, then parts to reveal the invitation below.
 */
export default function IntroExperience({ onEnter }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (reduced) {
      setSkipped(true);
      setStep(LAST_STEP);
      return undefined;
    }
    const timers = INTRO_STEPS.map((at, index) => setTimeout(() => setStep(index), at));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  const instant = Boolean(reduced) || skipped;
  const namesVisible = step >= 12;
  const shine = step >= 13;
  const buttonReady = step >= 14;

  const handleSkip = () => {
    if (buttonReady || closing) return;
    setSkipped(true);
    setStep(LAST_STEP);
  };

  const handleOpen = () => {
    if (closing) return;
    setClosing(true);
    onEnter();
  };

  return (
    <motion.div
      className={`fixed inset-0 z-[60] h-[100dvh] w-full overflow-hidden ${closing ? "pointer-events-none" : ""}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: closing ? 0 : 1, scale: closing ? 1.04 : 1 }}
      transition={{ duration: reduced ? 0.4 : 1.6, ease: "easeInOut" }}
    >
      <IntroStage step={step} closing={closing} instant={instant} />

      <div className="relative z-20 flex h-full flex-col items-center px-6 pb-8 pt-[9vh] sm:pb-12 sm:pt-[8vh]">
        <div className="flex w-full flex-1 items-center justify-center">
          <WeddingTypography
            visible={namesVisible}
            shine={shine}
            closing={closing}
            instant={instant}
          />
        </div>

        <div className="flex w-full flex-col items-center gap-5">
          <motion.button
            type="button"
            onClick={handleOpen}
            initial={false}
            animate={buttonReady ? { opacity: closing ? 0 : 1, y: 0 } : { opacity: 0, y: 16 }}
            whileHover={buttonReady && !reduced ? { y: -3, scale: 1.015 } : undefined}
            whileTap={buttonReady && !reduced ? { scale: 0.985 } : undefined}
            transition={{ duration: instant ? 0.3 : 1.2, ease: [0.22, 1, 0.36, 1] }}
            className={`group inline-flex min-h-[54px] items-center gap-3 rounded-full border border-[#A68A64] bg-[#FDFBF7]/92 px-7 py-3 text-[0.66rem] uppercase tracking-[0.34em] text-[#4A2222] shadow-[0_18px_40px_-24px_rgba(74,34,34,0.75)] backdrop-blur transition-colors duration-500 hover:bg-[#4A2222] hover:text-[#FDFBF7] ${
              buttonReady ? "" : "pointer-events-none"
            }`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current/40 font-script text-sm leading-none">
              {WEDDING.groom.initial}
            </span>
            <span>Open Invitation</span>
            <MailOpen size={14} className="opacity-70 transition-transform duration-500 group-hover:-rotate-12" />
          </motion.button>

          <span className="h-px w-24 bg-[#A68A64]/40" />

          <AnimatePresence>
            {!skipped && !closing && (
              <motion.button
                type="button"
                onClick={handleSkip}
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 1 ? 0.7 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: step >= 1 ? 1.6 : 0 }}
                className="min-h-[44px] px-4 text-[0.6rem] uppercase tracking-[0.3em] text-[#4A2222] underline decoration-[#A68A64]/60 underline-offset-8 transition-opacity hover:opacity-100"
              >
                Lewati intro
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        Selamat datang di undangan pernikahan {WEDDING.groom.name} dan {WEDDING.bride.name}.
        Sebuah lukisan cat air Jawa sedang ditampilkan. Tekan tombol Open Invitation untuk masuk.
      </p>
    </motion.div>
  );
}