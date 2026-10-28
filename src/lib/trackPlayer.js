const TARGET_VOLUME = 0.6;

export function createTrackPlayer(url) {
  let audio = null;
  let fade = null;
  let playing = false;

  function fadeTo(target, duration) {
    if (!audio) return;
    if (fade) {
      clearInterval(fade);
      fade = null;
    }
    const steps = Math.max(1, Math.round(duration / 50));
    const step = (target - audio.volume) / steps;
    let count = 0;
    fade = setInterval(() => {
      count += 1;
      const next = count >= steps ? target : audio.volume + step;
      audio.volume = Math.min(1, Math.max(0, next));
      if (count >= steps) {
        clearInterval(fade);
        fade = null;
      }
    }, 50);
  }

  function start() {
    if (!url) return false;
    if (!audio) {
      audio = new Audio(url);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0;
    }
    const attempt = audio.play();
    if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
    playing = true;
    fadeTo(TARGET_VOLUME, 1800);
    return true;
  }

  function stop() {
    if (!audio) return;
    playing = false;
    fadeTo(0, 700);
    setTimeout(() => {
      if (!playing && audio) audio.pause();
    }, 750);
  }

  function dispose() {
    if (fade) {
      clearInterval(fade);
      fade = null;
    }
    playing = false;
    if (audio) {
      const current = audio;
      audio = null;
      current.pause();
    }
  }

  return { start, stop, dispose, isPlaying: () => playing };
}