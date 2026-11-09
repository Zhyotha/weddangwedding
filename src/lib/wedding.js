import cover from "@/img/cover.jpeg";
import sampul from "@/img/sampul.jpeg";
import berdua from "@/img/berdua.jpeg";
import lokasi from "@/img/lokasi.jpeg";
import pria1 from "@/img/pria1.jpeg";
import pria2 from "@/img/pria2.jpeg";
import wanita1 from "@/img/wanita1.jpeg";
import wanita2 from "@/img/wanita2.jpeg";
import momen from "@/img/IMG-20260914-WA0200.jpg";

export const WEDDING = {
  groom: {
    name: "Romli",
    initial: "R",
    order: "Putra dari",
    father: "Bapak Solikin",
    mother: "Ibu Henik Yunaita",
  },
  bride: {
    name: "Andini",
    initial: "A",
    order: "Putri dari",
    father: "Bapak Hermanto",
    mother: "Ibu Antik Suifiyah",
  },
  initials: "R & A",
  dateLabel: "Jumat, 6 Desember 2026",
  dateShort: "06 · 12 · 2026",
  region: "Tajinan, Malang",
  countdownTarget: "2026-12-06T09:00:00+07:00",
  verse:
    "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
  verseSource: "Surah Ar-Rum Ayat 21",
  events: [
    {
      key: "akad",
      label: "Akad Nikah",
      day: "Jumat, 6 Desember 2026",
      time: "08:00 WIB - selesai",
    },
    {
      key: "resepsi",
      label: "Resepsi",
      day: "Jumat, 7 Desember 2026",
      time: "08:00 WIB - selesai",
    },
  ],
  venue: {
    name: "Jl. Sido Makmur",
    detail: "Desa Gunung Ronggo, RT 29 / RW 005, Tajinan, Malang",
    mapsUrl: "https://maps.app.goo.gl/FuGsKYYwbf2eD4Gj9?g_st=aw",
  },
  images: {
    cover,
    hands: berdua,
    coast: lokasi,
    invitation: sampul,
  },
  gallery: [
    { src: sampul, alt: "Romli dan Andini" },
    { src: cover, alt: "Potret Romli dan Andini" },
    { src: berdua, alt: "Kebersamaan Romli dan Andini" },
    { src: pria1, alt: "Romli" },
    { src: wanita1, alt: "Andini" },
    { src: pria2, alt: "Momen Romli" },
    { src: wanita2, alt: "Momen Andini" },
    { src: momen, alt: "Momen menjelang hari bahagia" },
  ],
};

export const guestNameFromUrl = () => {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("to") || params.get("kepada") || "";
  return raw.replace(/\+/g, " ").trim();
};