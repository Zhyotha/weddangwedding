import { useEffect, useState } from "react";
import { guestNameFromUrl } from "@/lib/wedding";

/** The guest name from ?to=… resolved after mount. */
export default function useGuestName() {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(guestNameFromUrl());
  }, []);

  return name;
}