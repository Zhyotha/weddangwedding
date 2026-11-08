import { motion, useReducedMotion } from "framer-motion";

/** Stable pseudo-random values so petals never jump between renders. */
function seeded(seed) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
}

function Petal({ tone }) {
  return (
    <svg viewBox="0 0 14 12" className="block h-auto w-full" aria-hidden="true">
      <path d="M7 0 C 12 2.5, 13.5 8, 7 12 C 0.5 8, 2 2.5, 7 0 Z" fill={tone} opacity="0.7" />
    </svg>
  );
}

function Leaf({ tone }) {
  return (
    <svg viewBox="0 0 12 18" className="block h-auto w-full" aria-hidden="true">
      <path d="M6 0 C 11 4, 12.4 11, 6 18 C -0.4 11, 1 4, 6 0 Z" fill={tone} opacity="0.72" />
      <path d="M6 2.5 L 6 15.5" stroke="#6B5334" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

const TONES = ["#C08D82", "#B9A183", "#8FA084", "#C9A18C"];

/**
 * A handful of petals and leaves drifting slowly down through a section.
 * Pure CSS transforms, so it stays cheap even on a phone.
 */
export default function FallingPetals({
  count = 6,
  seed = 7,
  className = "",
  leafRatio = 0.35,
  opacity = 0.72,
}) {
  const reduction = useReducedMotion();
  if (reduction) return null;

  const random = seeded(seed);
  const petals = Array.from({ length: count }, (_, index) => {
    const isLeaf = random() < leafRatio;
    return {
      key: index,
      isLeaf,
      left: 4 + random() * 92,
      size: isLeaf ? 9 + random() * 7 : 8 + random() * 7,
      drift: 14 + random() * 34,
      duration: 20 + random() * 16,
      delay: random() * 18,
      tone: TONES[Math.floor(random() * TONES.length)],
    };
  });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {petals.map((petal) => (
        <span
          key={petal.key}
          className="leaf-fall absolute top-0 block mix-blend-multiply"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            "--fall-dur": `${petal.duration}s`,
            "--fall-delay": `${petal.delay}s`,
            "--fall-drift": `${petal.drift}px`,
            "--fall-opacity": opacity,
          }}
        >
          <span
            className="petal-sway block"
            style={{
              "--petal-dur": `${6 + petal.duration / 5}s`,
              "--petal-reach": `${8 + petal.drift / 3}px`,
              "--petal-delay": `${petal.delay / 3}s`,
            }}
          >
            {petal.isLeaf ? <Leaf tone={petal.tone} /> : <Petal tone={petal.tone} />}
          </span>
        </span>
      ))}
    </div>
  );
}

/** A single watercolour butterfly wandering slowly through a section. */
export function Butterfly({ className = "", size = 18, duration = 26, delay = 0, range = 40 }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute mix-blend-multiply ${className}`}
      style={{ width: size }}
      animate={{
        x: [0, range * 0.6, range * 1.2, range * 0.4, 0],
        y: [0, -12, -4, -18, 0],
        rotate: [-5, 4, -3, 5, -2],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 26 22" className="h-auto w-full" aria-hidden="true">
        <g className="wing-flap wing-flap-l">
          <path d="M13 11 C 7 1, 0 3, 1.5 9.5 C 2.8 15, 8 16, 13 12 Z" fill="#B98D7B" opacity="0.85" />
          <path d="M13 12 C 9 18, 3 19, 3 15 C 3.2 12.6, 7 12, 13 13 Z" fill="#C9A18C" opacity="0.8" />
        </g>
        <g className="wing-flap wing-flap-r">
          <path d="M13 11 C 19 1, 26 3, 24.5 9.5 C 23.2 15, 18 16, 13 12 Z" fill="#B98D7B" opacity="0.85" />
          <path d="M13 12 C 17 18, 23 19, 23 15 C 22.8 12.6, 19 12, 13 13 Z" fill="#C9A18C" opacity="0.8" />
        </g>
        <path d="M13 7 C 13.8 11, 13.4 15, 13 17.5" stroke="#6B4A34" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
      </svg>
    </motion.div>
  );
}