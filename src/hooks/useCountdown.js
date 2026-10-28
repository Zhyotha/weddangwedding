import { useEffect, useState } from "react";

const pad = (value) => String(value).padStart(2, "0");

export default function useCountdown(target) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, new Date(target).getTime() - Date.now())
  );

  useEffect(() => {
    const tick = () =>
      setRemaining(Math.max(0, new Date(target).getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const totalSeconds = Math.floor(remaining / 1000);

  return {
    done: remaining <= 0,
    days: pad(Math.floor(totalSeconds / 86400)),
    hours: pad(Math.floor((totalSeconds % 86400) / 3600)),
    minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
    seconds: pad(totalSeconds % 60),
  };
}