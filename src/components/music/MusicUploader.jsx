import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { base44 } from "@/api/base44Client";

const ACCEPTED = [".mp3", ".m4a", ".wav", ".ogg"];

export default function MusicUploader({ makeActive = false, onUploaded }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handlePick = (event) => {
    const picked = event.target.files?.[0] || null;
    setError("");
    if (!picked) {
      setFile(null);
      return;
    }
    const lower = picked.name.toLowerCase();
    if (!lower.endsWith(".mp3") && !picked.type.startsWith("audio/")) {
      setFile(null);
      setError("File harus berupa lagu MP3.");
      event.target.value = "";
      return;
    }
    setFile(picked);
    setTitle(picked.name.replace(/\.[^.]+$/, ""));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Pilih file MP3 terlebih dahulu.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      const created = await base44.entities.MusicTrack.create({
        title: title.trim() || file.name,
        file_url,
        file_name: file.name,
        is_active: makeActive,
      });
      setFile(null);
      setTitle("");
      if (inputRef.current) inputRef.current.value = "";
      onUploaded(created);
    } catch (err) {
      setError("Lagu gagal diunggah. Silakan coba lagi.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="track-file"
          className="text-[0.55rem] uppercase tracking-[0.32em] text-muted-foreground"
        >
          File lagu
        </label>
        <input
          id="track-file"
          ref={inputRef}
          type="file"
          accept={`${ACCEPTED.join(",")},audio/*`}
          onChange={handlePick}
          className="mt-3 block w-full cursor-pointer border border-border bg-background/60 px-4 py-3 text-[0.8rem] text-foreground/80 file:mr-4 file:cursor-pointer file:border-0 file:bg-primary file:px-4 file:py-2 file:text-[0.55rem] file:uppercase file:tracking-[0.24em] file:text-primary-foreground hover:border-accent/60"
        />
        <p className="mt-3 text-[0.72rem] leading-relaxed text-muted-foreground">
          Format MP3. Idealnya di bawah 10 MB agar undangan tetap cepat dibuka. File lagu
          disimpan publik — siapa pun yang memiliki tautannya dapat membukanya.
        </p>
      </div>

      <div>
        <label
          htmlFor="track-title"
          className="text-[0.55rem] uppercase tracking-[0.32em] text-muted-foreground"
        >
          Judul lagu
        </label>
        <input
          id="track-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Nama lagu"
          className="mt-2 h-12 w-full border-0 border-b border-border bg-transparent px-0 text-[0.95rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
        />
      </div>

      {error && <p className="text-[0.8rem] text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={uploading || !file}
        className="inline-flex min-h-[48px] items-center justify-center gap-2.5 bg-primary px-8 text-[0.58rem] uppercase tracking-[0.3em] text-primary-foreground transition-opacity duration-300 hover:opacity-90 disabled:opacity-40"
      >
        <Upload size={13} />
        {uploading ? "Mengunggah..." : makeActive ? "Unggah & pakai" : "Unggah lagu"}
      </button>
    </form>
  );
}