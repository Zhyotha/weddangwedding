import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

export const DECOR_SECTIONS = [
  { id: "opening", label: "Pembuka" },
  { id: "verse", label: "Ayat Suci" },
  { id: "greeting", label: "Salam" },
  { id: "couple", label: "Mempelai" },
  { id: "countdown", label: "Hitung Hari" },
  { id: "events", label: "Rangkaian Acara" },
  { id: "venue", label: "Lokasi" },
  { id: "gallery", label: "Galeri" },
  { id: "share", label: "Bagikan" },
  { id: "footer", label: "Penutup" },
];

const StudioContext = createContext(null);

export function useStudio() {
  return useContext(StudioContext);
}

const toItem = (record) => ({
  id: record.id,
  label: record.label || "",
  image_url: record.image_url,
  section: record.section,
  x: Number(record.x ?? 50),
  y: Number(record.y ?? 120),
  width: Number(record.width ?? 220),
  rotation: Number(record.rotation ?? 0),
  opacity: Number(record.opacity ?? 1),
  _dirty: false,
  _new: false,
});

const toPayload = (item) => ({
  label: item.label || "",
  image_url: item.image_url,
  section: item.section,
  x: item.x,
  y: item.y,
  width: item.width,
  rotation: item.rotation,
  opacity: item.opacity,
});

export function StudioProvider({ children }) {
  const { user, isLoadingAuth } = useAuth();
  const isAdmin = user?.role === "admin";
  const [items, setItems] = useState([]);
  const [removed, setRemoved] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [addTarget, setAddTarget] = useState("couple");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const reload = useCallback(async () => {
    try {
      const page = await base44.entities.Decoration.list({ sort: "created_date", limit: 200 });
      const list = Array.isArray(page) ? page : page?.items || [];
      setItems(list.map(toItem));
    } catch {
      setItems([]);
    }
    setRemoved([]);
    setSelectedId(null);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("studio") === "1") setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "e") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const updateItem = useCallback((id, patch) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch, _dirty: true } : item))
    );
  }, []);

  const addDecoration = useCallback(
    ({ image_url, label }) => {
      const id = `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const section = document.querySelector(`[data-decor-section="${addTarget}"]`);
      const height = section?.offsetHeight || 600;
      setItems((prev) => [
        ...prev,
        {
          id,
          label: label || "",
          image_url,
          section: addTarget,
          x: 50,
          y: Math.round(height * 0.35),
          width: 220,
          rotation: 0,
          opacity: 1,
          _dirty: true,
          _new: true,
        },
      ]);
      setSelectedId(id);
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [addTarget]
  );

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedId((current) => (current === id ? null : current));
    if (!id.startsWith("tmp-")) setRemoved((prev) => [...prev, id]);
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    setNotice("");
    try {
      const fresh = items.filter((item) => item._new);
      const changed = items.filter((item) => !item._new && item._dirty);
      if (fresh.length) await base44.entities.Decoration.bulkCreate(fresh.map(toPayload));
      if (changed.length)
        await base44.entities.Decoration.bulkUpdate(
          changed.map((item) => ({ id: item.id, ...toPayload(item) }))
        );
      if (removed.length) await Promise.all(removed.map((id) => base44.entities.Decoration.delete(id)));
      await reload();
      setNotice("Dekorasi tersimpan.");
    } catch {
      setNotice("Gagal menyimpan. Pastikan Anda masuk sebagai admin.");
    } finally {
      setSaving(false);
    }
  }, [items, removed, reload]);

  const cancel = useCallback(async () => {
    setNotice("");
    await reload();
  }, [reload]);

  const active = open && isAdmin;
  const dirty = items.some((item) => item._dirty) || removed.length > 0;

  const value = {
    items,
    active,
    open,
    isAdmin,
    isLoadingAuth,
    setOpen,
    openStudio: () => setOpen(true),
    closeStudio: () => setOpen(false),
    selectedId,
    select: setSelectedId,
    addTarget,
    setAddTarget,
    updateItem,
    addDecoration,
    removeItem,
    save,
    cancel,
    saving,
    notice,
    setNotice,
    dirty,
  };

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}
