import DecorationLayer from "@/components/decor/DecorationLayer";

/** Wraps a section so custom decorations can be anchored to it. */
export default function SectionShell({ id, children }) {
  return (
    <div data-decor-section={id} className="relative">
      {children}
      <DecorationLayer section={id} />
    </div>
  );
}