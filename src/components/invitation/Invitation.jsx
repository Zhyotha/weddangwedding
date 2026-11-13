import { useEffect, useRef, useState } from "react";
import IntroExperience from "@/components/invitation/intro/IntroExperience";
import OpeningSection from "@/components/invitation/OpeningSection";
import VerseSection from "@/components/invitation/VerseSection";
import GreetingSection from "@/components/invitation/GreetingSection";
import CoupleSection from "@/components/invitation/CoupleSection";
import CountdownSection from "@/components/invitation/CountdownSection";
import EventsSection from "@/components/invitation/EventsSection";
import VenueSection from "@/components/invitation/VenueSection";
import GallerySection from "@/components/invitation/GallerySection";
import ShareSection from "@/components/invitation/ShareSection";
import SiteFooter from "@/components/invitation/SiteFooter";
import SiteNav from "@/components/invitation/SiteNav";
import MusicToggle from "@/components/invitation/MusicToggle";
import { createAmbientMusic } from "@/lib/ambientMusic";
import { StudioProvider } from "@/components/decor/StudioProvider";
import SectionShell from "@/components/decor/SectionShell";
import StudioChrome from "@/components/decor/StudioChrome";
import StudioLauncher from "@/components/decor/StudioLauncher";

export default function Invitation() {
  const [entered, setEntered] = useState(false);
  const [introMounted, setIntroMounted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const musicRef = useRef(null);

  useEffect(() => {
    if (!introMounted) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [introMounted]);

  useEffect(() => {
    return () => {
      musicRef.current?.dispose();
      musicRef.current = null;
    };
  }, []);

  const handleToggleMusic = async () => {
    if (!musicRef.current) musicRef.current = createAmbientMusic();
    if (musicRef.current.isPlaying()) {
      musicRef.current.stop();
      setPlaying(false);
      return;
    }
    const success = await musicRef.current.start();
    setPlaying(success);
  };

  const handleEnter = async () => {
    if (entered) return;
    setEntered(true);
    window.scrollTo(0, 0);
    if (!musicRef.current) musicRef.current = createAmbientMusic();
    const success = await musicRef.current.start();
    setPlaying(success);
    window.setTimeout(() => setIntroMounted(false), 1600);
  };

  return (
    <StudioProvider>
      <div className="relative min-h-screen overflow-x-clip bg-background font-body text-foreground">
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
          <main className="relative w-full pb-32">
            {entered && (
              <>
                <SectionShell id="opening"><OpeningSection /></SectionShell>
                <SectionShell id="verse"><VerseSection /></SectionShell>
                <SectionShell id="greeting"><GreetingSection /></SectionShell>
                <SectionShell id="couple"><CoupleSection /></SectionShell>
                <SectionShell id="countdown"><CountdownSection /></SectionShell>
                <SectionShell id="events"><EventsSection /></SectionShell>
                <SectionShell id="venue"><VenueSection /></SectionShell>
                <SectionShell id="gallery"><GallerySection /></SectionShell>
                <SectionShell id="share"><ShareSection /></SectionShell>
                <SectionShell id="footer"><SiteFooter /></SectionShell>
              </>
            )}
          </main>
          {entered && <SiteNav />}
        </div>

        {introMounted && <IntroExperience onEnter={handleEnter} />}

        {entered && (
          <>
            <MusicToggle playing={playing} onToggle={handleToggleMusic} />
            <StudioLauncher />
            <StudioChrome />
          </>
        )}
      </div>
    </StudioProvider>
  );
}
