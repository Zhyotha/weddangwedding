import { Sparkles } from "lucide-react";
import { useStudio } from "@/components/decor/StudioProvider";

export default function StudioLauncher() {
  const { isAdmin, open, openStudio } = useStudio();
  if (!isAdmin || open) return null;

  return (
    <button
      onClick={openStudio}
      className="fixed bottom-4 left-4 z-[84] flex items-center gap-1.5 rounded-full border border-border bg-card/95 px-3 py-2 text-[0.7rem] uppercase tracking-[0.16em] text-foreground/70 shadow-lg backdrop-blur transition-colors hover:text-foreground"
    >
      <Sparkles className="h-3.5 w-3.5" />
      Dekorasi
    </button>
  );
}