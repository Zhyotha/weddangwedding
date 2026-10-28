import { Pause, Play, Trash2 } from "lucide-react";

export default function MusicTrackRow({
  track,
  previewing,
  onTogglePreview,
  onActivate,
  onDelete,
}) {
  return (
    <li className="flex flex-col gap-4 border-b border-border/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          onClick={onTogglePreview}
          aria-label={previewing ? `Hentikan pratinjau ${track.title}` : `Putar pratinjau ${track.title}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent transition-colors duration-300 hover:bg-accent/10"
        >
          {previewing ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <div className="min-w-0">
          <p className="truncate text-[0.95rem] text-foreground">{track.title}</p>
          <p className="mt-1 text-[0.52rem] uppercase tracking-[0.26em] text-muted-foreground">
            {track.is_active ? "Musik latar aktif" : track.file_name || "Tersimpan"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {track.is_active ? (
          <span className="text-[0.52rem] uppercase tracking-[0.26em] text-accent">
            Dipakai
          </span>
        ) : (
          <button
            type="button"
            onClick={onActivate}
            className="inline-flex min-h-[44px] items-center justify-center border border-foreground/15 px-5 text-[0.55rem] uppercase tracking-[0.26em] text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Pakai sebagai musik latar
          </button>
        )}
        <button
          type="button"
          onClick={onDelete}
          aria-label={`Hapus ${track.title}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors duration-300 hover:border-destructive hover:text-destructive"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </li>
  );
}