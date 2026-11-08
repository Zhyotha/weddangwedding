import { motion, useReducedMotion } from "framer-motion";

const VINES = [
  { left: 3, width: 46, height: 224, lean: 1, delay: 0.1, speed: 13 },
  { left: 15, width: 36, height: 152, lean: -1, delay: 0.32, speed: 11 },
  { left: 27, width: 30, height: 116, lean: 1, delay: 0.5, speed: 15 },
  { left: 42, width: 24, height: 88, lean: -1, delay: 0.64, speed: 10 },
  { left: 57, width: 30, height: 126, lean: 1, delay: 0.44, speed: 14 },
  { left: 72, width: 38, height: 170, lean: -1, delay: 0.26, speed: 12 },
  { left: 88, width: 48, height: 232, lean: 1, delay: 0.14, speed: 16 },
];

const LEAVES = [
  { left: 9, size: 11, drift: 22, duration: 17, delay: 0, tone: "#8C9A78" },
  { left: 21, size: 8, drift: -18, duration: 21, delay: 3.4, tone: "#A8996F" },
  { left: 33, size: 13, drift: 26, duration: 15, delay: 7.2, tone: "#8C9A78" },
  { left: 46, size: 9, drift: -24, duration: 19, delay: 1.8, tone: "#B98D7B" },
  { left: 58, size: 10, drift: 20, duration: 18, delay: 5.6, tone: "#8C9A78" },
  { left: 69, size: 12, drift: -26, duration: 16, delay: 9.4, tone: "#A8996F" },
  { left: 79, size: 9, drift: 18, duration: 20, delay: 2.6, tone: "#B98D7B" },
  { left: 90, size: 12, drift: -20, duration: 18, delay: 6.8, tone: "#8C9A78" },
];

// Paths stay in the lower band, rising from the bottom vegetation toward the
// right-hand foliage, so they never cross the wedding names.
const FLIGHTS = [
  {
    left: "4%",
    top: "86%",
    size: 18,
    delay: 0.2,
    duration: 22,
    x: ["0vw", "13vw", "25vw", "40vw", "55vw", "71vw"],
    y: ["0vh", "-3vh", "-5vh", "-3vh", "-7vh", "-13vh"],
  },
  {
    left: "24%",
    top: "90%",
    size: 14,
    delay: 4.6,
    duration: 19,
    x: ["0vw", "10vw", "22vw", "35vw", "48vw"],
    y: ["0vh", "-4vh", "-2vh", "-6vh", "-11vh"],
  },
  {
    left: "52%",
    top: "88%",
    size: 16,
    delay: 9.1,
    duration: 24,
    x: ["0vw", "8vw", "18vw", "28vw", "36vw"],
    y: ["0vh", "-5vh", "-3vh", "-8vh", "-12vh"],
  },
];

function Vine({ width, height }) {
  const cx = width / 2;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true">
      <path
        d={`M${cx} 0 C ${width * 0.78} ${height * 0.28}, ${width * 0.22} ${height * 0.58}, ${cx} ${height}`}
        stroke="#7A5238"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.72"
      />
      {[0.18, 0.36, 0.54, 0.72, 0.88].map((t, i) => {
        const side = i % 2 === 0 ? 0.34 : 0.66;
        return (
          <ellipse
            key={t}
            cx={width * side}
            cy={height * t}
            rx={width * 0.17}
            ry={width * 0.08}
            fill="#8C9A78"
            opacity="0.62"
            transform={`rotate(${i % 2 === 0 ? 26 : -26} ${width * side} ${height * t})`}
          />
        );
      })}
    </svg>
  );
}

function Leaf({ tone }) {
  return (
    <svg viewBox="0 0 12 18" className="block h-auto w-full" aria-hidden="true">
      <path d="M6 0 C 11 4, 12.4 11, 6 18 C -0.4 11, 1 4, 6 0 Z" fill={tone} opacity="0.78" />
      <path d="M6 2.5 L 6 15.5" stroke="#6B5334" strokeWidth="0.5" opacity="0.45" />
    </svg>
  );
}

function Butterfly({ flight, alive, instant }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute mix-blend-multiply"
      style={{ left: flight.left, top: flight.top, width: flight.size, zIndex: 14 }}
      initial={false}
      animate={
        alive
          ? {
              x: flight.x,
              y: flight.y,
              opacity: [0, 0.95, 0.95, 0.95, 0.9, 0],
              rotate: [-6, 5, -4, 6, -3, 2],
            }
          : { x: "0vw", y: "0vh", opacity: 0 }
      }
      transition={{
        duration: instant ? 0 : flight.duration,
        delay: instant ? 0 : flight.delay,
        repeat: instant ? 0 : Infinity,
        repeatDelay: instant ? 0 : 1.5,
        ease: "easeInOut",
        times: [0, 0.2, 0.45, 0.68, 0.86, 1],
      }}
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

/**
 * Thin brown vines dropping from the top edge with leaves letting go, plus
 * butterflies drifting out of the bottom vegetation.
 */
export default function IntroNature({ vines, alive, instant }) {
  const reduced = useReducedMotion();

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0" style={{ zIndex: 11 }}>
        {VINES.map((vine) => (
          <motion.div
            key={vine.left}
            className="absolute top-0 mix-blend-multiply"
            style={{ left: `${vine.left}%`, transformOrigin: "top center" }}
            initial={false}
            animate={
              vines
                ? { y: "0%", opacity: 0.95, rotate: 0 }
                : { y: "-104%", opacity: 0, rotate: vine.lean * 4 }
            }
            transition={{
              duration: instant ? 0 : 1.9,
              delay: instant ? 0 : vine.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              style={{ transformOrigin: "top center" }}
              animate={
                vines && !instant && !reduced
                  ? { rotate: [0, vine.lean * 1.9, vine.lean * -1.2, 0] }
                  : { rotate: 0 }
              }
              transition={
                vines && !instant && !reduced
                  ? { duration: vine.speed, repeat: Infinity, ease: "easeInOut", delay: vine.delay }
                  : { duration: 0.4 }
              }
            >
              <Vine width={vine.width} height={vine.height} />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 12 }}>
        {LEAVES.map((leaf) => (
          <motion.span
            key={`${leaf.left}-${leaf.delay}`}
            aria-hidden="true"
            className="absolute top-0 block mix-blend-multiply"
            style={{ left: `${leaf.left}%`, width: leaf.size }}
            initial={false}
            animate={
              alive
                ? {
                    y: ["-10vh", "32vh", "72vh", "112vh"],
                    x: [0, leaf.drift, -leaf.drift * 0.5, leaf.drift * 0.4],
                    rotate: [0, 130, 260, 360],
                    opacity: [0, 0.85, 0.85, 0.85],
                  }
                : { y: "-10vh", x: 0, rotate: 0, opacity: 0 }
            }
            transition={{
              duration: instant ? 0 : leaf.duration,
              delay: instant ? 0 : leaf.delay,
              repeat: instant ? 0 : Infinity,
              ease: "linear",
            }}
          >
            <Leaf tone={leaf.tone} />
          </motion.span>
        ))}
      </div>

      {FLIGHTS.map((flight) => (
        <Butterfly key={flight.left} flight={flight} alive={alive} instant={instant} />
      ))}
    </>
  );
}