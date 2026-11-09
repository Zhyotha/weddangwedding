import { useEffect, useState } from "react";
import IntroExperience from "@/components/invitation/intro/IntroExperience";
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
import { StudioProvider } from "@/components/decor/StudioProvider";
import SectionShell from "@/components/decor/SectionShell";
import StudioChrome from "@/components/decor/StudioChrome";
import StudioLauncher from "@/components/decor/StudioLauncher";

export default function Invitation() {
  const [entered, setEntered] = useState(false);
  const [introMounted, setIntroMounted] = useState(true);

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
    window.setTimeout(() => setIntroMounted(false), 1600);
  };

  return (
    <StudioProvider>
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
              <SectionShell id="opening"><OpeningSection /></SectionShell>
              <SectionShell id="verse"><VerseSection /></SectionShell>
              <SectionShell id="greeting"><GreetingSection /></SectionShell>
              <SectionShell id="couple"><CoupleSection /></SectionShell>
              <SectionShell id="countdown"><CountdownSection /></SectionShell>
              <SectionShell id="events"><EventsSection /></SectionShell>
              <SectionShell id="venue"><VenueSection /></SectionShell>
              <SectionShell id="gallery"><GallerySection /></SectionShell>
              <SectionShell id="rsvp"><RsvpSection /></SectionShell>
              <SectionShell id="wishes"><WishesSection /></SectionShell>
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
          <StudioLauncher />
          <StudioChrome />
        </>
      )}
    </div>
    </StudioProvider>
  );
}