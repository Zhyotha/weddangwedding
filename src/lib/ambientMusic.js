export function createAmbientMusic() {
  let audio = null;
  let playing = false;

  function ensureAudio() {
    if (audio) return audio;

    audio = new Audio("/music/background.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.4;

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
      await player.play();
      playing = true;
      return true;
    } catch (error) {
      console.error("Background music failed to play:", error);
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