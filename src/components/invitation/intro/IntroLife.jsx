import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const MIST = [
  { left: "26%", size: 46, dur: 17, delay: 0, x: "8px" },
  { left: "46%", size: 64, dur: 21, delay: 3.4, x: "-10px" },
  { left: "63%", size: 40, dur: 15, delay: 6.2, x: "6px" },
  { left: "38%", size: 30, dur: 19, delay: 9.1, x: "-6px" },
];

const BUTTERFLIES = [
  { className: "bottom-[12%] left-[14%] h-[6.4%] w-[11%]", dur: 17, delay: 0.4 },
  { className: "bottom-[20%] right-[17%] h-[5%] w-[8.5%]", dur: 21, delay: 1.8 },
  { className: "bottom-[8%] right-[33%] h-[4.4%] w-[7.5%]", dur: 15, delay: 3.2 },
];

function Butterfly({ className, dur, delay, alive }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={cn("absolute", className)}
      animate={
        alive && !reduced
          ? { x: [0, 16, -9, 5, 0], y: [0, -12, 5, -4, 0], rotate: [0, 7, -6, 3, 0] }
          : { x: 0, y: 0, rotate: 0 }
      }
      transition={
        alive && !reduced
          ? { duration: dur, delay, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.6 }
      }
    >
      <svg viewBox="0 0 40 32" className="h-full w-full overflow-visible">
        <g className="wing-flap wing-flap-l">
          <path d="M19 16C13 6 5 4 3 10c-2 6 6 11 16 9z" fill="#C9A44C" fillOpacity="0.8" stroke="#5A3A20" strokeWidth="0.8" />
          <path d="M19 17c-7 1-11 5-9 8 2 3 8 0 9-5z" fill="#B4873C" fillOpacity="0.75" stroke="#5A3A20" strokeWidth="0.7" />
        </g>
        <g className="wing-flap wing-flap-r">
          <path d="M21 16c6-10 14-12 16-6 2 6-6 11-16 9z" fill="#C9A44C" fillOpacity="0.8" stroke="#5A3A20" strokeWidth="0.8" />
          <path d="M21 17c7 1 11 5 9 8-2 3-8 0-9-5z" fill="#B4873C" fillOpacity="0.75" stroke="#5A3A20" strokeWidth="0.7" />
        </g>
        <path d="M20 11v13" stroke="#4A2F1A" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

/**
 * The living details that never stop: mist lifting off the basin beneath the
 * waterfall, and small butterflies working the flower bed.
 */
export default function IntroLife({ alive, instant }) {
  const reduced = useReducedMotion();
  const still = instant || reduced;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ zIndex: 14 }}>
      <div className="absolute left-1/2 top-[46%] h-[16%] w-[74%] -translate-x-1/2">
        {MIST.map((m, i) => (
          <span
            key={i}
            className={cn("absolute bottom-0 rounded-full bg-[#F7F1E2] blur-xl", !still && "mist-drift")}
            style={{
              left: m.left,
              width: `${m.size}px`,
              height: `${m.size * 0.62}px`,
              "--mist-dur": `${m.dur}s`,
              "--mist-delay": `${m.delay}s`,
              "--mist-x": m.x,
              opacity: still ? 0.35 : undefined,
            }}
          />
        ))}
      </div>

      {BUTTERFLIES.map((b, i) => (
        <Butterfly key={i} {...b} alive={alive && !still} />
      ))}
    </div>
  );
}