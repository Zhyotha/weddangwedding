import { useRef, useState } from "react";
import { useStudio } from "@/components/decor/StudioProvider";
import { Image } from "@/components/ui/image";

export default function DecorItem({ item, active, selected }) {
  const { updateItem, select } = useStudio();
  const drag = useRef(null);
  const [ratio, setRatio] = useState(1);

  const startMove = (event) => {
    if (!active) return;
    event.preventDefault();
    event.stopPropagation();
    select(item.id);
    const section = event.currentTarget.closest("[data-decor-section]");
    if (!section) return;
    drag.current = {
      mode: "move",
      startX: event.clientX,
      startY: event.clientY,
      x: item.x,
      y: item.y,
      rect: section.getBoundingClientRect(),
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const startResize = (event) => {
    if (!active) return;
    event.preventDefault();
    event.stopPropagation();
    select(item.id);
    drag.current = { mode: "resize", startX: event.clientX, width: item.width };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleMove = (event) => {
    const state = drag.current;
    if (!state) return;
    if (state.mode === "resize") {
      const width = Math.round(Math.min(1600, Math.max(24, state.width + (event.clientX - state.startX) * 2)));
      updateItem(item.id, { width });
      return;
    }
    const deltaX = ((event.clientX - state.startX) / Math.max(1, state.rect.width)) * 100;
    updateItem(item.id, {
      x: Math.round(Math.min(100, Math.max(0, state.x + deltaX)) * 10) / 10,
      y: Math.round(Math.max(0, state.y + (event.clientY - state.startY))),
    });
  };

  const handleEnd = (event) => {
    drag.current = null;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      onPointerDown={startMove}
      onPointerMove={handleMove}
      onPointerUp={handleEnd}
      onPointerCancel={handleEnd}
      className={`absolute ${active ? "pointer-events-auto cursor-move touch-none" : "pointer-events-none"} ${
        selected ? "outline-dashed outline-1 outline-offset-4 outline-accent" : ""
      }`}
      style={{
        left: `${item.x}%`,
        top: `${item.y}px`,
        width: `min(${item.width}px, 88vw)`,
        transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
        opacity: item.opacity,
      }}
    >
      <Image
        src={item.image_url}
        alt={item.label || "Dekorasi"}
        fittingType="fit"
        draggable={false}
        onLoad={(event) => {
          const node = event.currentTarget;
          if (node.naturalWidth && node.naturalHeight) {
            const next = node.naturalWidth / node.naturalHeight;
            if (Math.abs(next - ratio) > 0.01) setRatio(next);
          }
        }}
        style={{ aspectRatio: ratio }}
        className="block w-full select-none"
      />
      {selected && (
        <span
          onPointerDown={startResize}
          onPointerMove={handleMove}
          onPointerUp={handleEnd}
          onPointerCancel={handleEnd}
          className="absolute -bottom-2 -right-2 h-3.5 w-3.5 cursor-nwse-resize rounded-full border border-accent bg-background"
        />
      )}
    </div>
  );
}