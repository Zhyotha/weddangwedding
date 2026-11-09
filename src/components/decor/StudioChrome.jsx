import StudioBar from "@/components/decor/StudioBar";
import StudioGate from "@/components/decor/StudioGate";
import StudioPanel from "@/components/decor/StudioPanel";
import { useStudio } from "@/components/decor/StudioProvider";

export default function StudioChrome() {
  const { open, isAdmin } = useStudio();
  if (!open) return null;
  if (!isAdmin) return <StudioGate />;

  return (
    <>
      <StudioBar />
      <StudioPanel />
    </>
  );
}