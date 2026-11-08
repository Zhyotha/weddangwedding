import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import "moment/locale/id";
import { base44 } from "@/api/base44Client";
import SectionLabel from "@/components/invitation/SectionLabel";
import { Sprig } from "@/components/invitation/ornaments/Botanicals";
import SectionGarden from "@/components/invitation/ornaments/SectionGarden";
import Sway from "@/components/invitation/motion/Sway";
import Reveal, { EASE } from "@/components/invitation/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/invitation/motion/Stagger";
import useGuestName from "@/hooks/useGuestName";

moment.locale("id");

const TINTS = ["bg-card/70", "bg-blush/45", "bg-sage/10"];

export default function WishesSection() {
  const urlGuest = useGuestName();
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (urlGuest) setGuestName((current) => current || urlGuest);
  }, [urlGuest]);

  useEffect(() => {
    let active = true;
    base44.entities.Wish.list({ sort: "-created_date", limit: 50 })
      .then((page) => {
        if (!active) return;
        setWishes(Array.isArray(page) ? page : page.items || []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!guestName.trim() || !message.trim()) {
      setError("Nama dan ucapan perlu diisi.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const created = await base44.entities.Wish.create({
        guest_name: guestName.trim(),
        message: message.trim(),
      });
      setWishes((prev) => [created, ...prev]);
      setMessage("");
    } catch (err) {
      setError("Ucapan gagal dikirim. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="ucapan" className="tone-blush relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24">
      <SectionGarden seed={9} tone="rose" accent="sage" opacity={0.34} />

      <div className="relative z-10 mx-auto max-w-xl">
        <StaggerGroup className="text-center" stagger={0.18} amount={0.35}>
          <StaggerItem>
            <SectionLabel align="center">Ucapan &amp; Doa</SectionLabel>
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto mt-6 max-w-md text-[0.95rem] leading-[1.9] text-foreground/70">
              Kirimkan doa dan harapan terbaik Anda untuk kami.
            </p>
          </StaggerItem>
        </StaggerGroup>

        <Reveal delay={0.1} className="mt-9" variant="pop">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label
                htmlFor="wish-name"
                className="text-[0.55rem] uppercase tracking-[0.34em] text-foreground/50 transition-colors duration-500 group-focus-within:text-accent"
              >
                Nama
              </label>
              <input
                id="wish-name"
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                placeholder="Nama Anda"
                className="field-bloom mt-2 h-12 w-full border-0 border-b border-border bg-transparent px-1 font-display text-lg text-foreground outline-none placeholder:font-body placeholder:text-sm placeholder:text-foreground/35 focus:border-accent"
              />
            </div>

            <div className="group">
              <label
                htmlFor="wish-message"
                className="text-[0.55rem] uppercase tracking-[0.34em] text-foreground/50 transition-colors duration-500 group-focus-within:text-accent"
              >
                Ucapan
              </label>
              <textarea
                id="wish-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Tulis ucapan dan doa Anda..."
                className="field-bloom mt-2 w-full resize-none border-0 border-b border-border bg-transparent px-1 py-3 text-[0.95rem] leading-relaxed text-foreground outline-none placeholder:text-foreground/35 focus:border-accent"
              />
            </div>

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
              whileHover={submitting ? undefined : { y: -2 }}
              whileTap={submitting ? undefined : { scale: 0.98 }}
              className="flex min-h-[50px] w-full items-center justify-center rounded-full bg-[#4A2222] px-6 text-[0.6rem] uppercase tracking-[0.32em] text-[#FDFBF7] transition-opacity duration-500 hover:opacity-90 disabled:opacity-50 sm:w-auto sm:px-10"
            >
              {submitting ? "Mengirim..." : "Kirim Ucapan"}
            </motion.button>
          </form>
        </Reveal>

        <div className="mt-12">
          {wishes.length === 0 ? (
            <Reveal variant="fade">
              <p className="text-center text-sm italic text-foreground/50">
                Belum ada yang mengirimkan ucapan, jadilah yang pertama.
              </p>
            </Reveal>
          ) : (
            <ul className="space-y-4">
              <AnimatePresence initial={false}>
                {wishes.map((wish, index) => (
                  <motion.li
                    key={wish.id}
                    layout
                    initial={{ opacity: 0, y: -18, scale: 0.985 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.25 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.8, ease: EASE, delay: index < 5 ? index * 0.07 : 0 }}
                    className={`relative overflow-hidden border border-accent/20 px-5 py-5 ${TINTS[index % TINTS.length]}`}
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-2 -top-4 h-14 w-14 opacity-25"
                    >
                      <Sway
                        className="h-full w-full"
                        duration={13 + (index % 4) * 3}
                        amplitude={6}
                        delay={index * 0.7}
                        origin="70% 100%"
                      >
                        <Sprig
                          tone={index % 2 === 0 ? "rose" : "sage"}
                          className="h-full w-full"
                        />
                      </Sway>
                    </span>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-display text-[1.05rem] text-[#4A2222]">{wish.guest_name}</p>
                      <p className="text-[0.52rem] uppercase tracking-[0.22em] text-foreground/40">
                        {wish.created_date ? moment(wish.created_date).fromNow() : "baru saja"}
                      </p>
                    </div>
                    <p className="mt-2.5 text-[0.92rem] leading-[1.85] text-foreground/75">
                      {wish.message}
                    </p>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}