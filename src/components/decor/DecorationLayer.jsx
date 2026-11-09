import { useStudio } from "@/components/decor/StudioProvider";
import DecorItem from "@/components/decor/DecorItem";

export default function DecorationLayer({ section }) {
  const { items, active, selectedId } = useStudio();
  const mine = items.filter((item) => item.section === section);

  if (!mine.length) return null;

  return (
    <div
      aria-hidden={!active}
      className={`pointer-events-none absolute inset-0 ${active ? "z-40" : "z-0"}`}
    >
      {mine.map((item) => (
        <DecorItem
          key={item.id}
          item={item}
          active={active}
          selected={active && selectedId === item.id}
        />
      ))}
    </div>
  );
}