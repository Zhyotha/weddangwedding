import { useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.error("Could not play music:", error);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <div>
      <audio
        ref={audioRef}
        src="/music/background.mp3"
        loop
        preload="auto"
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      <button type="button" onClick={toggleMusic}>
        {playing ? "Pause music" : "Play music"}
      </button>
    </div>
  );
}
