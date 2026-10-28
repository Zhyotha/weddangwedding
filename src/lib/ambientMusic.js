const CHORDS = [
  [261.63, 329.63, 392.0, 493.88],
  [220.0, 329.63, 392.0, 440.0],
  [174.61, 261.63, 349.23, 440.0],
  [196.0, 246.94, 293.66, 392.0],
];

const CHORD_DURATION = 6;

export function createAmbientMusic() {
  let ctx = null;
  let master = null;
  let timer = null;
  let nextTime = 0;
  let chordIndex = 0;
  let playing = false;

  function ensureContext() {
    if (ctx) return true;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;
    ctx = new AudioCtx();
    master = ctx.createGain();
    master.gain.value = 0.0001;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1900;
    filter.Q.value = 0.4;
    master.connect(filter);
    filter.connect(ctx.destination);
    return true;
  }

  function voice(freq, at, duration, peak, type) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(peak, at + 0.9);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
    osc.connect(gain);
    gain.connect(master);
    osc.start(at);
    osc.stop(at + duration + 0.2);
  }

  function scheduleChord(at, chord) {
    voice(chord[0] / 2, at, CHORD_DURATION * 1.1, 0.15, "sine");
    chord.forEach((freq, i) => {
      voice(freq, at + i * 0.46, 3.2, 0.07, "triangle");
    });
    voice(chord[2] * 2, at + 2.4, 2.8, 0.04, "sine");
  }

  function schedule() {
    if (!ctx) return;
    const horizon = ctx.currentTime + 2.5;
    while (nextTime < horizon) {
      scheduleChord(Math.max(nextTime, ctx.currentTime + 0.05), CHORDS[chordIndex % CHORDS.length]);
      nextTime += CHORD_DURATION;
      chordIndex += 1;
    }
  }

  function start() {
    if (!ensureContext()) return false;
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    if (playing) return true;
    const now = ctx.currentTime;
    nextTime = Math.max(nextTime, now + 0.2);
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
    master.gain.exponentialRampToValueAtTime(0.4, now + 2.5);
    schedule();
    timer = setInterval(schedule, 500);
    playing = true;
    return true;
  }

  function stop() {
    if (!ctx) return;
    playing = false;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function dispose() {
    stop();
    if (ctx) {
      const current = ctx;
      ctx = null;
      setTimeout(() => current.close().catch(() => {}), 1400);
    }
  }

  return { start, stop, dispose, isPlaying: () => playing };
}