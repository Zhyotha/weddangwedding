import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import CoverGate from "@/components/invitation/CoverGate";
import CoverPanel from "@/components/invitation/CoverPanel";
import OpeningSection from "@/components/invitation/OpeningSection";
import VerseSection from "@/components/invitation/VerseSection";
import GreetingSection from "@/components/invitation/GreetingSection";
import CoupleSection from "@/components/invitation/CoupleSection";
import CountdownSection from "@/components/invitation/CountdownSection";
import EventsSection from "@/components/invitation/EventsSection";
import VenueSection from "@/components/invitation/VenueSection";
import RsvpSection from "@/components/invitation/RsvpSection";
import WishesSection from "@/components/invitation/WishesSection";
import ShareSection from "@/components/invitation/ShareSection";
import SiteFooter from "@/components/invitation/SiteFooter";
import MusicToggle from "@/components/invitation/MusicToggle";
import { createAmbientMusic } from "@/lib/ambientMusic";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const musicRef = useRef(null);

  useEffect(() => () => musicRef.current?.dispose(), []);

  useEffect(() => {
    if (opened) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [opened]);

  const handleOpen = () => {
    setOpened(true);
    window.scrollTo({ top: 0 });
    musicRef.current = createAmbientMusic();
    setPlaying(Boolean(musicRef.current.start()));
  };

  const handleToggleMusic = () => {
    if (!musicRef.current) {
      musicRef.current = createAmbientMusic();
      setPlaying(Boolean(musicRef.current.start()));
      return;
    }
    if (playing) {
      musicRef.current.stop();
      setPlaying(false);
    } else {
      setPlaying(Boolean(musicRef.current.start()));
    }
  };

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <AnimatePresence>{!opened && <CoverGate onOpen={handleOpen} />}</AnimatePresence>

      {opened && (
        <div className="lg:grid lg:grid-cols-2">
          <CoverPanel />
          <main className="relative border-border/70 lg:border-l">
            <OpeningSection />
            <VerseSection />
            <GreetingSection />
            <CoupleSection />
            <CountdownSection />
            <EventsSection />
            <VenueSection />
            <RsvpSection />
            <WishesSection />
            <ShareSection />
            <SiteFooter />
          </main>
        </div>
      )}

      {opened && <MusicToggle playing={playing} onToggle={handleToggleMusic} />}
    </div>
  );
}