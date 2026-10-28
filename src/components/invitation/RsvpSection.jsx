import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/invitation/Reveal";
import SectionLabel from "@/components/invitation/SectionLabel";
import { guestNameFromUrl } from "@/lib/wedding";

const COUNTS = [1, 2, 3, 4, 5];

export default function RsvpSection() {
  const [guestName, setGuestName] = useState(guestNameFromUrl());
  const [attendance, setAttendance] = useState("hadir");
  const [guestCount, setGuestCount] = useState(2);
  const [responses, setResponses] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    base44.entities.Rsvp.list({ sort: "-created_date", limit: 100 })
      .then((page) => {
        if (!active) return;
        setResponses(Array.isArray(page) ? page : page.items || []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const totalGuests = responses.reduce(
    (sum, item) => sum + (item.attendance === "hadir" ? item.guest_count || 1 : 0),
    0
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!guestName.trim()) {
      setError("Mohon isi nama Anda terlebih dahulu.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const created = await base44.entities.Rsvp.create({
        guest_name: guestName.trim(),
        attendance,
        guest_count: attendance === "hadir" ? guestCount : 0,
      });
      setResponses((prev) => [created, ...prev]);
      setSubmitted(true);
    } catch (err) {
      setError("Konfirmasi gagal dikirim. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="border-t border-border/70 px-6 py-20 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
      <Reveal>
        <SectionLabel>Konfirmasi Kehadiran</SectionLabel>
        <p className="mt-7 max-w-lg text-[0.92rem] leading-[1.95] text-foreground/75">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak / Ibu /
          Saudara / i berkenan hadir untuk memberikan do&apos;a restunya. Kami
          ucapkan terima kasih.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-9">
        <div className="border border-border bg-card/70 p-6 backdrop-blur-sm sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center py-6 text-center"
              >
                <motion.span
                  initial={{ scale: 0.6 }}
                  animate={{ scale: [0.6, 1.15, 1] }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="text-accent"
                >
                  <Heart size={26} strokeWidth={1.4} />
                </motion.span>
                <p className="mt-5 font-display text-2xl text-foreground">
                  Terima kasih, {guestName.trim()}.
                </p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
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
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="text-[0.55rem] uppercase tracking-[0.32em] text-muted-foreground"
                  >
                    Nama
                  </label>
                  <input
                    id="rsvp-name"
                    value={guestName}
                    onChange={(event) => setGuestName(event.target.value)}
                    placeholder="Nama Anda"
                    className="mt-2 h-12 w-full border-0 border-b border-border bg-transparent px-0 text-[0.95rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
                  />
                </div>

                <div>
                  <p className="text-[0.55rem] uppercase tracking-[0.32em] text-muted-foreground">
                    Kehadiran
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {[
                      { value: "hadir", label: "Hadir" },
                      { value: "tidak_hadir", label: "Tidak Hadir" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setAttendance(option.value)}
                        className={`min-h-[48px] border px-4 text-[0.6rem] uppercase tracking-[0.24em] transition-colors duration-300 ${
                          attendance === option.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-foreground/70 hover:border-accent/70"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {attendance === "hadir" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[0.55rem] uppercase tracking-[0.32em] text-muted-foreground">
                        Jumlah Tamu
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {COUNTS.map((count) => (
                          <button
                            key={count}
                            type="button"
                            onClick={() => setGuestCount(count)}
                            className={`h-11 w-11 border text-sm transition-colors duration-300 ${
                              guestCount === count
                                ? "border-accent bg-accent/15 text-foreground"
                                : "border-border text-foreground/60 hover:border-accent/60"
                            }`}
                          >
                            {count}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {error && <p className="text-[0.8rem] text-destructive">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex min-h-[48px] w-full items-center justify-center bg-primary px-6 text-[0.6rem] uppercase tracking-[0.32em] text-primary-foreground transition-opacity duration-300 hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? "Mengirim..." : "Kirim Konfirmasi"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-9">
        {responses.length === 0 ? (
          <p className="text-sm italic text-muted-foreground">
            Belum ada yang merespon, jadilah yang pertama.
          </p>
        ) : (
          <>
            <p className="text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">
              {responses.length} tamu telah merespon · {totalGuests} akan hadir
            </p>
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {responses.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="text-sm text-foreground/85">{item.guest_name}</span>
                  <span
                    className={`text-[0.52rem] uppercase tracking-[0.24em] ${
                      item.attendance === "hadir" ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {item.attendance === "hadir" ? "Hadir" : "Tidak hadir"}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </Reveal>
    </section>
  );
}