import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/id";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/invitation/Reveal";
import SectionLabel from "@/components/invitation/SectionLabel";
import { guestNameFromUrl } from "@/lib/wedding";

moment.locale("id");

export default function WishesSection() {
  const [guestName, setGuestName] = useState(guestNameFromUrl());
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    base44.entities.Wish.list({ sort: "-created_date", limit: 100 })
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
    <section id="ucapan" className="border-t border-border/70 bg-secondary/40 px-6 py-20 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
      <Reveal>
        <SectionLabel>Ucapan &amp; Doa</SectionLabel>
        <p className="mt-7 max-w-md text-[0.92rem] leading-[1.95] text-foreground/75">
          Kirimkan doa dan harapan terbaik Anda untuk kami.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-9">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="wish-name"
              className="text-[0.55rem] uppercase tracking-[0.32em] text-muted-foreground"
            >
              Nama
            </label>
            <input
              id="wish-name"
              value={guestName}
              onChange={(event) => setGuestName(event.target.value)}
              placeholder="Nama Anda"
              className="mt-2 h-12 w-full border-0 border-b border-border bg-transparent px-0 text-[0.95rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
            />
          </div>

          <div>
            <label
              htmlFor="wish-message"
              className="text-[0.55rem] uppercase tracking-[0.32em] text-muted-foreground"
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
              className="mt-2 w-full resize-none border-0 border-b border-border bg-transparent px-0 py-3 text-[0.95rem] leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
            />
          </div>

          {error && <p className="text-[0.8rem] text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="flex min-h-[48px] w-full items-center justify-center bg-primary px-6 text-[0.6rem] uppercase tracking-[0.32em] text-primary-foreground transition-opacity duration-300 hover:opacity-90 disabled:opacity-50 sm:w-auto sm:px-10"
          >
            {submitting ? "Mengirim..." : "Kirim Ucapan"}
          </button>
        </form>
      </Reveal>

      <Reveal delay={0.15} className="mt-12">
        {wishes.length === 0 ? (
          <p className="text-sm italic text-muted-foreground">
            Belum ada yang mengirimkan ucapan, jadilah yang pertama.
          </p>
        ) : (
          <ul className="space-y-5">
            {wishes.map((wish) => (
              <li key={wish.id} className="flex gap-4 border-b border-border/80 pb-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/40 font-display text-base text-accent">
                  {(wish.guest_name || "?").charAt(0).toUpperCase()}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-sm font-medium text-foreground">{wish.guest_name}</p>
                    <p className="text-[0.55rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {wish.created_date ? moment(wish.created_date).fromNow() : "baru saja"}
                    </p>
                  </div>
                  <p className="mt-2 text-[0.9rem] leading-[1.85] text-foreground/75">
                    {wish.message}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </section>
  );
}