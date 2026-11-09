import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DECOR_SECTIONS, useStudio } from "@/components/decor/StudioProvider";

function Control({ label, value, children }) {
  return (
    <div className="mt-3">
      <div className="flex items-baseline justify-between">
        <span className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
        <span className="font-body text-[0.72rem] tabular-nums text-foreground/70">{value}</span>
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export default function StudioPanel() {
  const { items, selectedId, select, updateItem, removeItem } = useStudio();
  const item = items.find((entry) => entry.id === selectedId);
  if (!item) return null;

  const sectionEl =
    typeof document !== "undefined"
      ? document.querySelector(`[data-decor-section="${item.section}"]`)
      : null;
  const maxY = Math.max(400, Math.round((sectionEl?.offsetHeight || 900) * 1.1));

  return (
    <div className="fixed right-4 top-4 z-[86] max-h-[85vh] w-[17rem] overflow-y-auto rounded-lg border border-border bg-card p-4 shadow-2xl">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-lg leading-none text-foreground">Atur Dekorasi</p>
          <p className="mt-1 max-w-[11rem] truncate text-[0.7rem] text-muted-foreground">
            {item.label || "Gambar"}
          </p>
        </div>
        <button onClick={() => select(null)} className="text-foreground/50 hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3">
        <span className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">Bagian</span>
        <select
          value={item.section}
          onChange={(event) => updateItem(item.id, { section: event.target.value })}
          className="mt-1 w-full rounded border border-border bg-background px-2 py-1.5 font-body text-xs text-foreground"
        >
          {DECOR_SECTIONS.map((section) => (
            <option key={section.id} value={section.id}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      <Control label="Posisi X" value={`${Math.round(item.x)}%`}>
        <Slider
          value={[item.x]}
          min={0}
          max={100}
          step={0.5}
          onValueChange={([value]) => updateItem(item.id, { x: value })}
        />
      </Control>

      <Control label="Posisi Y" value={`${Math.round(item.y)} px`}>
        <Slider
          value={[Math.min(item.y, maxY)]}
          min={0}
          max={maxY}
          step={4}
          onValueChange={([value]) => updateItem(item.id, { y: value })}
        />
      </Control>

      <Control label="Ukuran" value={`${Math.round(item.width)} px`}>
        <Slider
          value={[item.width]}
          min={24}
          max={900}
          step={4}
          onValueChange={([value]) => updateItem(item.id, { width: value })}
        />
      </Control>

      <Control label="Rotasi" value={`${Math.round(item.rotation)}°`}>
        <Slider
          value={[item.rotation]}
          min={-180}
          max={180}
          step={1}
          onValueChange={([value]) => updateItem(item.id, { rotation: value })}
        />
      </Control>

      <Control label="Opasitas" value={`${Math.round(item.opacity * 100)}%`}>
        <Slider
          value={[item.opacity]}
          min={0.05}
          max={1}
          step={0.05}
          onValueChange={([value]) => updateItem(item.id, { opacity: value })}
        />
      </Control>

      <Button
        variant="outline"
        size="sm"
        onClick={() => removeItem(item.id)}
        className="mt-4 w-full text-destructive"
      >
        <Trash2 className="mr-1.5 h-3.5 w-3.5" />
        Hapus dekorasi
      </Button>
    </div>
  );
}