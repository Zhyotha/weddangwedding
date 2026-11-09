import { useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { DECOR_SECTIONS, useStudio } from "@/components/decor/StudioProvider";

export default function StudioBar() {
  const {
    addTarget,
    setAddTarget,
    addDecoration,
    save,
    cancel,
    saving,
    dirty,
    notice,
    setNotice,
    closeStudio,
  } = useStudio();
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    setNotice("");
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      addDecoration({ image_url: file_url, label: file.name.replace(/\.[^.]+$/, "") });
      setNotice("Dekorasi ditambahkan — seret untuk mengatur posisinya.");
    } catch {
      setNotice("Gagal mengunggah gambar.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[85] flex justify-center px-4">
      <div className="pointer-events-auto w-full max-w-3xl rounded-lg border border-border bg-card/95 px-3 py-2.5 shadow-2xl backdrop-blur">
        <div className="flex flex-wrap items-center gap-2">
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <Button
            size="sm"
            onClick={() => inputRef.current?.click()}
            disabled={uploading || saving}
            className="rounded-full"
          >
            <ImagePlus className="mr-1.5 h-3.5 w-3.5" />
            {uploading ? "Mengunggah…" : "Tambah Dekorasi"}
          </Button>

          <label className="flex items-center gap-1.5 text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
            di
            <select
              value={addTarget}
              onChange={(event) => setAddTarget(event.target.value)}
              className="rounded border border-border bg-background px-1.5 py-1 font-body text-[0.72rem] normal-case tracking-normal text-foreground"
            >
              {DECOR_SECTIONS.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.label}
                </option>
              ))}
            </select>
          </label>

          <div className="ml-auto flex items-center gap-1.5">
            <Button size="sm" variant="ghost" onClick={cancel} disabled={saving}>
              Batal
            </Button>
            <Button size="sm" onClick={save} disabled={saving || !dirty}>
              {saving ? "Menyimpan…" : "Simpan"}
            </Button>
            <Button size="sm" variant="ghost" onClick={closeStudio} aria-label="Tutup">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="mt-1.5 text-[0.7rem] text-muted-foreground">
          {notice || "Klik dekorasi untuk mengatur ukuran, rotasi, dan opasitasnya."}
        </p>
      </div>
    </div>
  );
}