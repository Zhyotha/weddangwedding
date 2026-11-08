import { useEffect, useRef, useState } from "react";
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
import { WEDDING } from "@/lib/wedding";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [introMounted, setIntroMounted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const musicRef = useRef(null);

  useEffect(() => {
    document.title = `${WEDDING.groom.name} & ${WEDDING.bride.name} — Undangan Pernikahan`;
  }, []);

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
    window.setTimeout(() => setIntroMounted(false), 1600);
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
        {/* Full-bleed: sections span the viewport so edge decorations can reach
            the real screen boundary; each section centres its own content. */}
        <main className="relative w-full pb-32">
          {entered && (
            <>
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
            </>
          )}
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