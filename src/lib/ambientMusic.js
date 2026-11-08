export function createAmbientMusic() {
  let audio = null;
  let playing = false;

  function ensureAudio() {
    if (audio) return audio;

    audio = new Audio("/music/background.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.42;

    audio.addEventListener("play", () => {
      playing = true;
    });
    audio.addEventListener("pause", () => {
      playing = false;
    });
    audio.addEventListener("ended", () => {
      playing = false;
    });

    return audio;
  }

  async function start() {
    const player = ensureAudio();
    try {
      player.volume = 0;
      await player.play();
      // gentle fade-in so the music never startles a guest
      const steps = 24;
      let step = 0;
      const target = 0.42;
      const fade = setInterval(() => {
        step += 1;
        player.volume = Math.min(target, (target * step) / steps);
        if (step >= steps) clearInterval(fade);
      }, 90);
      playing = true;
      return true;
    } catch (error) {
      playing = false;
      return false;
    }
  }

  function stop() {
    if (!audio) return;
    audio.pause();
    playing = false;
  }

  function dispose() {
    if (!audio) return;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    audio = null;
    playing = false;
  }

  return {
    start,
    stop,
    dispose,
    isPlaying: () => playing,
  };
}