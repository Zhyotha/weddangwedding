import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import IntroExperience from "@/components/invitation/IntroExperience";
import OpeningSection from "@/components/invitation/OpeningSection";
import VerseSection from "@/components/invitation/VerseSection";
import GreetingSection from "@/components/invitation/GreetingSection";
import CoupleSection from "@/components/invitation/CoupleSection";
import CountdownSection from "@/components/invitation/CountdownSection";
import EventsSection from "@/components/invitation/EventsSection";
import VenueSection from "@/components/invitation/VenueSection";
import GallerySection from "@/components/invitation/GallerySection";
import RsvpSection from "@/components/invitation/RsvpSection";
import WishesSection from "@/components/invitation/WishesSection";
import ShareSection from "@/components/invitation/ShareSection";
import SiteFooter from "@/components/invitation/SiteFooter";
import SiteNav from "@/components/invitation/SiteNav";
import MusicToggle from "@/components/invitation/MusicToggle";
import { createAmbientMusic } from "@/lib/ambientMusic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Romli & Andini — Undangan Pernikahan" },
      {
        name: "description",
        content:
          "Undangan pernikahan Romli & Andini, Jumat 6 November 2026 di Tajinan, Malang. Sebuah undangan bergaya cat air Jawa klasik.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [entered, setEntered] = useState(false);
  const [introMounted, setIntroMounted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const musicRef = useRef(null);

  useEffect(() => () => musicRef.current?.dispose(), []);

  useEffect(() => {
    if (!introMounted) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [introMounted]);

  const handleEnter = () => {
    if (entered) return;
    setEntered(true);
    window.scrollTo(0, 0);
    musicRef.current = createAmbientMusic();
    musicRef.current.start().then((ok) => setPlaying(Boolean(ok)));
    window.setTimeout(() => setIntroMounted(false), 1700);
  };

  const handleToggleMusic = () => {
    if (!musicRef.current) {
      musicRef.current = createAmbientMusic();
      musicRef.current.start().then((ok) => setPlaying(Boolean(ok)));
      return;
    }
    if (playing) {
      musicRef.current.stop();
      setPlaying(false);
    } else {
      musicRef.current.start().then((ok) => setPlaying(Boolean(ok)));
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background font-body text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-[0.13]"
      />

      <div
        aria-hidden={introMounted}
        className={`relative z-10 watercolor-wash transition-opacity duration-1000 ${
          entered ? "opacity-100" : "opacity-0"
        }`}
      >
        <main className="mx-auto w-full max-w-[46rem] pb-32">
          <OpeningSection />
          <VerseSection />
          <GreetingSection />
          <CoupleSection />
          <CountdownSection />
          <EventsSection />
          <VenueSection />
          <GallerySection />
          <RsvpSection />
          <WishesSection />
          <ShareSection />
          <SiteFooter />
        </main>

        {entered && (
          <>
            <SiteNav />
            <MusicToggle playing={playing} onToggle={handleToggleMusic} />
          </>
        )}
      </div>

      {introMounted && <IntroExperience onEnter={handleEnter} />}
    </div>
  );
}