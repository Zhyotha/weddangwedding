import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import MusicUploader from "@/components/music/MusicUploader";
import MusicTrackRow from "@/components/music/MusicTrackRow";
import SectionLabel from "@/components/invitation/SectionLabel";

export default function MusicLibrary() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewId, setPreviewId] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    const clearPreview = () => setPreviewId("");
    audio.addEventListener("ended", clearPreview);
    return () => {
      audio.pause();
      audio.removeEventListener("ended", clearPreview);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    let active = true;
    base44.entities.MusicTrack.list({ sort: "-created_date", limit: 50 })
      .then((page) => {
        if (!active) return;
        setTracks(Array.isArray(page) ? page : page.items || []);
      })
      .catch(() => {
        if (active) setError("Daftar lagu gagal dimuat.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const hasActive = tracks.some((track) => track.is_active);

  const handleUploaded = (created) => {
    setTracks((prev) => [created, ...prev]);
  };

  const handleTogglePreview = (track) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (previewId === track.id) {
      audio.pause();
      setPreviewId("");
      return;
    }
    audio.src = track.file_url;
    audio.currentTime = 0;
    const attempt = audio.play();
    if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
    setPreviewId(track.id);
  };

  const handleActivate = async (track) => {
    setError("");
    try {
      await base44.entities.MusicTrack.updateMany(
        { is_active: true },
        { $set: { is_active: false } }
      );
      await base44.entities.MusicTrack.update(track.id, { is_active: true });
      setTracks((prev) =>
        prev.map((item) => ({ ...item, is_active: item.id === track.id }))
      );
    } catch (err) {
      setError("Musik latar gagal diubah. Silakan coba lagi.");
    }
  };

  const handleDelete = async (track) => {
    setError("");
    try {
      await base44.entities.MusicTrack.delete(track.id);
      setTracks((prev) => prev.filter((item) => item.id !== track.id));
      if (previewId === track.id) {
        audioRef.current?.pause();
        setPreviewId("");
      }
    } catch (err) {
      setError("Lagu gagal dihapus. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-14 sm:px-10 lg:py-20">
        <Link
          to="/"
          className="inline-flex min-h-[40px] items-center gap-2 text-[0.52rem] uppercase tracking-[0.32em] text-muted-foreground transition-colors duration-300 hover:text-accent"
        >
          <ArrowLeft size={12} />
          Kembali ke undangan
        </Link>

        <div className="mt-9">
          <SectionLabel>Musik Latar</SectionLabel>
        </div>

        <h1 className="mt-6 font-display text-[2.4rem] font-light leading-[1.1] text-foreground sm:text-5xl">
          Perpustakaan Musik
        </h1>
        <p className="mt-5 max-w-xl text-[0.92rem] leading-[1.95] text-foreground/75">
          Unggah lagu MP3 Anda, lalu pilih satu lagu sebagai musik latar undangan. Lagu
          pilihan diputar otomatis saat tamu membuka undangan. Jika belum ada lagu yang
          dipilih, undangan memakai musik bawaan.
        </p>

        <div className="mt-10 border border-border bg-card/70 p-6 sm:p-8">
          <MusicUploader makeActive={!hasActive} onUploaded={handleUploaded} />
        </div>

        {error && <p className="mt-6 text-[0.8rem] text-destructive">{error}</p>}

        <div className="mt-10">
          {loading ? (
            <p className="text-sm italic text-muted-foreground">Memuat lagu...</p>
          ) : tracks.length === 0 ? (
            <p className="text-sm italic text-muted-foreground">
              Belum ada lagu. Unggah file MP3 pertama Anda.
            </p>
          ) : (
            <ul className="space-y-5">
              {tracks.map((track) => (
                <MusicTrackRow
                  key={track.id}
                  track={track}
                  previewing={previewId === track.id}
                  onTogglePreview={() => handleTogglePreview(track)}
                  onActivate={() => handleActivate(track)}
                  onDelete={() => handleDelete(track)}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}