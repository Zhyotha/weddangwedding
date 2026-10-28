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
  dateLabel: "Jumat, 6 November 2026",
  dateShort: "06 · 11 · 2026",
  region: "Tajinan, Malang",
  countdownTarget: "2026-11-06T09:00:00+07:00",
  verse:
    "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
  verseSource: "Surah Ar-Rum Ayat 21",
  events: [
    {
      key: "akad",
      label: "Akad Nikah",
      day: "Jumat, 6 November 2026",
      time: "09:00 WIB - selesai",
    },
    {
      key: "resepsi",
      label: "Resepsi",
      day: "Jumat, 6 November 2026",
      time: "09:00 WIB - selesai",
    },
  ],
  venue: {
    name: "Jl. Sido Makmur",
    detail: "Desa Gunung Ronggo, RT 29 / RW 005, Tajinan, Malang",
    mapsUrl: "https://maps.app.goo.gl/FuGsKYYwbf2eD4Gj9?g_st=aw",
  },
  images: {
    cover:
      "/src/img/sampul.jpeg",
    hands:
      "/src/img/berdua.jpeg",
    coast:
      "/src/img/lokasi.jpeg",
  },
};

export const guestNameFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("to") || params.get("kepada") || "";
  return raw.replace(/\+/g, " ").trim();
};