import { createFileRoute } from "@tanstack/react-router";
import Invitation from "@/components/invitation/Invitation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Romli & Andini — Undangan Pernikahan" },
      {
        name: "description",
        content:
          "Undangan pernikahan Romli & Andini, Jumat 6 November 2026 di Tajinan, Malang. Sebuah undangan bergaya cat air Jawa klasik.",
      },
    ],
  }),
  component: Invitation,
});