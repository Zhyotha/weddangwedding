import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionLabel from "@/components/invitation/SectionLabel";
import { FloralAccent } from "@/components/invitation/Ornaments";
import SectionFlorals from "@/components/invitation/ornaments/Flora";
import { EASE } from "@/components/invitation/motion/Reveal";
import Reveal from "@/components/invitation/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/invitation/motion/Stagger";
import useGuestName from "@/hooks/useGuestName";
import { getRsvpSummary } from "@/lib/server-fns";

const COUNTS = [1, 2, 3, 4, 5];

export default function RsvpSection() {
  const urlGuest = useGuestName();
  const reduced = useReducedMotion();
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("hadir");
  const [guestCount, setGuestCount] = useState(2);
  const [summary, setSummary] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (urlGuest) setGuestName((current) => current || urlGuest);
  }, [urlGuest]);

  const loadSummary = () => {
    getRsvpSummary()
      .then((data) => setSummary(data ?? null))
      .catch(() => setSummary(null));
  };

  useEffect(() => {
    loadSummary();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!guestName.trim()) {
      setError("Mohon isi nama Anda terlebih dahulu.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await base44.entities.Rsvp.create({
        guest_name: guestName.trim(),
        attendance,
        guest_count: attendance === "hadir" ? guestCount : 0,
      });
      setSubmitted(true);
      loadSummary();
    } catch (err) {
      setError("Konfirmasi gagal dikirim. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="tone-cream relative px-5 py-20 sm:px-8 sm:py-24">
      <SectionFlorals variant="rsvp" />

      <div className="relative z-10 mx-auto max-w-xl">
        <StaggerGroup className="text-center" stagger={0.18} amount={0.35}>
          <StaggerItem>
            <SectionLabel align="center">Konfirmasi Kehadiran</SectionLabel>
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto mt-6 max-w-md text-[0.95rem] leading-[1.95] text-foreground/70">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak / Ibu /
              Saudara / i berkenan hadir untuk memberikan do&apos;a restunya.
            </p>
          </StaggerItem>
        </StaggerGroup>

        <Reveal delay={0.1} className="mt-10" variant="pop" duration={1.2}>
          <div className="relative border border-accent/35 bg-card/60 px-5 py-8 sm:px-8 sm:py-10">
            <FloralAccent
              className="-right-4 -top-5 h-16 w-14 sm:h-20 sm:w-16"
              art="blossom"
              flipX
              opacity={0.66}
              duration={19}
            />
            <FloralAccent
              className="-bottom-4 -left-3 h-14 w-12 sm:h-16 sm:w-14"
              flipY
              opacity={0.6}
              duration={15}
            />
            <span className="absolute left-2.5 top-2.5 h-4 w-4 border-l border-t border-accent/40" />
            <span className="absolute bottom-2.5 right-2.5 h-4 w-4 border-b border-r border-accent/40" />

            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="flex flex-col items-center py-4 text-center"
                >
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: [0.4, 1.18, 1], opacity: 1 }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    className="text-accent"
                  >
                    <Heart size={24} strokeWidth={1.4} />
                  </motion.span>
                  <p className="mt-5 font-script text-3xl text-[#4A2222]">
                    Terima kasih, {guestName.trim()}.
                  </p>
                  <p className="mt-3 max-w-xs text-[0.9rem] leading-relaxed text-foreground/65">
                    {attendance === "hadir"
                      ? "Konfirmasi Anda sudah kami terima. Sampai jumpa di hari bahagia kami."
                      : "Terima kasih atas kabarnya. Doa Anda sangat berarti bagi kami."}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-7"
                >
                  <div className="group">
                    <label
                      htmlFor="rsvp-name"
                      className="text-[0.55rem] uppercase tracking-[0.34em] text-foreground/50 transition-colors duration-500 group-focus-within:text-accent"
                    >
                      Nama
                    </label>
                    <input
                      id="rsvp-name"
                      value={guestName}
                      onChange={(event) => setGuestName(event.target.value)}
                      placeholder="Nama Anda"
                      className="field-bloom mt-2 h-12 w-full border-0 border-b border-border bg-transparent px-1 font-display text-lg text-foreground outline-none placeholder:font-body placeholder:text-sm placeholder:text-foreground/35 focus:border-accent"
                    />
                  </div>

                  <div>
                    <p className="text-[0.55rem] uppercase tracking-[0.34em] text-foreground/50">
                      Kehadiran
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {[
                        { value: "hadir", label: "Hadir" },
                        { value: "tidak_hadir", label: "Tidak Hadir" },
                      ].map((option) => (
                        <motion.button
                          key={option.value}
                          type="button"
                          onClick={() => setAttendance(option.value)}
                          aria-pressed={attendance === option.value}
                          whileHover={reduced ? undefined : { y: -2 }}
                          whileTap={reduced ? undefined : { scale: 0.97 }}
                          className={`relative min-h-[48px] rounded-full border px-4 text-[0.6rem] uppercase tracking-[0.24em] transition-colors duration-500 ${
                            attendance === option.value
                              ? "border-[#4A2222] bg-[#4A2222] text-[#FDFBF7]"
                              : "border-accent/40 text-foreground/65 hover:border-accent"
                          }`}
                        >
                          {option.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {attendance === "hadir" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="text-[0.55rem] uppercase tracking-[0.34em] text-foreground/50">
                          Jumlah Tamu
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {COUNTS.map((count) => (
                            <motion.button
                              key={count}
                              type="button"
                              onClick={() => setGuestCount(count)}
                              aria-pressed={guestCount === count}
                              whileTap={reduced ? undefined : { scale: 0.92 }}
                              className={`h-11 w-11 rounded-full border text-sm transition-colors duration-300 ${
                                guestCount === count
                                  ? "border-accent bg-accent/20 text-[#4A2222]"
                                  : "border-border text-foreground/55 hover:border-accent/60"
                              }`}
                            >
                              {count}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[0.8rem] text-destructive"
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={submitting || reduced ? undefined : { y: -2 }}
                    whileTap={submitting || reduced ? undefined : { scale: 0.98 }}
                    className="flex min-h-[50px] w-full items-center justify-center rounded-full bg-[#4A2222] px-6 text-[0.6rem] uppercase tracking-[0.32em] text-[#FDFBF7] transition-opacity duration-500 hover:opacity-90 disabled:opacity-50"
                  >
                    {submitting ? "Mengirim..." : "Kirim Konfirmasi"}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {summary && summary.responses > 0 && (
          <Reveal delay={0.15} className="mt-8 text-center" variant="fade">
            <p className="text-[0.58rem] uppercase tracking-[0.28em] text-foreground/50">
              {summary.responses} tamu telah merespon · {summary.attending} akan hadir
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}