import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/invitation/motion/Reveal";

const LINKS = [
  { href: "#mempelai", label: "Mempelai" },
  { href: "#acara", label: "Acara" },
  { href: "#galeri", label: "Galeri" },
];

export default function SiteNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = LINKS.map((link) => ({
      href: link.href,
      el: document.querySelector(link.href),
    })).filter((section) => section.el);

    const sync = () => {
      const middle = window.innerHeight / 2;
      const current = sections.find((section) => {
        const rect = section.el.getBoundingClientRect();
        return rect.top <= middle && rect.bottom >= middle;
      });
      setActive(current ? current.href : "");
    };

    const observer = new IntersectionObserver(sync, {
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    });
    sections.forEach((section) => observer.observe(section.el));
    sync();
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      aria-label="Bagian undangan"
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 sm:bottom-6"
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.8, ease: EASE }}
    >
      <div className="flex items-center gap-0.5 rounded-full border border-accent/35 bg-background/92 px-2 py-1.5 shadow-[0_18px_40px_-26px_rgba(74,34,34,0.9)] backdrop-blur-md">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={active === link.href ? "true" : undefined}
            className="relative rounded-full px-3 py-2 text-[0.54rem] uppercase tracking-[0.18em] text-foreground/60 transition-colors duration-300 hover:text-[#4A2222]"
          >
            {active === link.href && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 rounded-full bg-accent/15"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <span className={`relative ${active === link.href ? "text-[#4A2222]" : ""}`}>
              {link.label}
            </span>
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
