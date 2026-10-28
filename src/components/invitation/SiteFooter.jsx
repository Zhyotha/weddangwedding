import { WEDDING } from "@/lib/wedding";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/70 px-6 py-14 text-center sm:px-10 lg:py-16">
      <p className="font-display text-[1.7rem] text-foreground">
        {WEDDING.groom.name} <span className="text-accent">&</span> {WEDDING.bride.name}
      </p>
      <p className="mt-3 text-[0.55rem] uppercase tracking-[0.38em] text-muted-foreground">
        {WEDDING.dateShort} · {WEDDING.region}
      </p>
      <p className="mt-9 text-[0.52rem] uppercase tracking-[0.32em] text-muted-foreground/60">
        Dibuat dengan cinta
      </p>
    </footer>
  );
}