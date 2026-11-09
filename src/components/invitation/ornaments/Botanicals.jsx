import { useId } from "react";

/**
 * Hand-drawn watercolour botanicals, as transparent SVG.
 *
 * Why SVG instead of painted JPGs: a JPG carries the white paper it was painted
 * on, so it only ever looks pasted-on. These draw with translucent layered
 * shapes, so they sit on ivory, blush or cream alike, scale to any size, and
 * leave no rectangle behind.
 *
 * Every illustration is anchored to the edge it is meant to grow from:
 * `Vine` starts at y=0 (top edge), `Plant`/`Fern` at y=max (bottom edge),
 * `Cluster`/`Bouquet`/`RoseCluster` at 0,0 (a corner).
 *
 * A soft Gaussian blur washes every shape into a true watercolour bloom, so the
 * edges feather instead of reading as crisp vector clip-art. Each flower also
 * carries a faint halo behind its petals — the pigment-bleed that makes a
 * watercolour feel painted, not printed.
 */

const TONES = {
  sage: ["#8C9E82", "#71856A"],
  olive: ["#9AA383", "#869070"],
  rose: ["#C08D82", "#A9776C"],
  blush: ["#D5B1A4", "#C69E92"],
  gold: ["#B9A183", "#A78F72"],
  silver: ["#A9B9A6", "#879B87"],
};

const LEAF = "M0 0 C 6 -5.5, 18 -5.5, 26 0 C 18 5.5, 6 5.5, 0 0 Z";
const FERN_LEAF = "M0 0 C 4 -3.2, 12 -3.8, 19 0 C 12 3.8, 4 3.2, 0 0 Z";
const PETAL = "M0 0 C 5 4, 5.4 10, 0 14 C -5.4 10, -5 4, 0 0 Z";

const palette = (name) => TONES[name] ?? TONES.sage;

/* --- cubic helpers: leaves are placed along a real curve, so branches bend -- */
function point([ax, ay], [bx, by], [cx, cy], [dx, dy], t) {
  const u = 1 - t;
  return [
    u * u * u * ax + 3 * u * u * t * bx + 3 * u * t * t * cx + t * t * t * dx,
    u * u * u * ay + 3 * u * u * t * by + 3 * u * t * t * cy + t * t * t * dy,
  ];
}

function tangent([ax, ay], [bx, by], [cx, cy], [dx, dy], t) {
  const u = 1 - t;
  const dxdt = 3 * u * u * (bx - ax) + 6 * u * t * (cx - bx) + 3 * t * t * (dx - cx);
  const dydt = 3 * u * u * (by - ay) + 6 * u * t * (cy - by) + 3 * t * t * (dy - cy);
  return (Math.atan2(dydt, dxdt) * 180) / Math.PI;
}

function stem(p0, p1, p2, p3, color, width = 1.7, key = "stem") {
  return (
    <path
      key={key}
      d={`M${p0[0]} ${p0[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${p3[0]} ${p3[1]}`}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      opacity="0.56"
    />
  );
}

function leavesAlong(
  p0,
  p1,
  p2,
  p3,
  { count = 7, light, dark, spread = 36, scale = 1, key = "l", shape = LEAF, start = 0.1, end = 0.95 }
) {
  return Array.from({ length: count }, (_, i) => {
    const t = start + ((end - start) * i) / Math.max(count - 1, 1);
    const [x, y] = point(p0, p1, p2, p3, t);
    const angle = tangent(p0, p1, p2, p3, t);
    const side = i % 2 === 0 ? 1 : -1;
    const size = scale * (0.72 + 0.32 * (1 - t));
    return (
      <path
        key={`${key}-${i}`}
        d={shape}
        fill={i % 2 === 0 ? dark : light}
        opacity="0.72"
        transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(angle + side * spread).toFixed(1)}) scale(${size.toFixed(2)})`}
      />
    );
  });
}

/* A single bloom: a soft pigment halo, then two rings of petals and a gold
   centre. The halo is the bleed of wet paint into the paper. */
function flower(cx, cy, r, light, dark, key = "f") {
  return (
    <g key={key} transform={`translate(${cx} ${cy})`}>
      <circle r={r * 1.15} fill={dark} opacity="0.18" />
      {[0, 72, 144, 216, 288].map((a, i) => (
        <ellipse
          key={a}
          cx="0"
          cy={-r * 0.52}
          rx={r * 0.42}
          ry={r * 0.56}
          fill={i % 2 === 0 ? dark : light}
          opacity="0.6"
          transform={`rotate(${a})`}
        />
      ))}
      {[36, 108, 180, 252, 324].map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy={-r * 0.32}
          rx={r * 0.26}
          ry={r * 0.34}
          fill={light}
          opacity="0.44"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r={r * 0.16} fill="#B9A183" opacity="0.85" />
      <circle r={r * 0.78} fill="none" stroke={dark} strokeWidth={r * 0.04} opacity="0.22" />
    </g>
  );
}

/* A garden rose: a wide ruffled outer ring, a tighter middle ring and a warm
   heart, so it reads as depth rather than a flat rosette. */
function rose(cx, cy, r, light, dark, key = "r") {
  return (
    <g key={key} transform={`translate(${cx} ${cy})`}>
      <circle r={r * 1.2} fill={dark} opacity="0.16" />
      {[8, 62, 116, 170, 224, 278].map((a, i) => (
        <ellipse
          key={a}
          cx="0"
          cy={-r * 0.58}
          rx={r * 0.5}
          ry={r * 0.62}
          fill={i % 2 === 0 ? dark : light}
          opacity="0.46"
          transform={`rotate(${a})`}
        />
      ))}
      {[34, 88, 142, 196, 250, 304].map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy={-r * 0.34}
          rx={r * 0.33}
          ry={r * 0.42}
          fill={light}
          opacity="0.58"
          transform={`rotate(${a})`}
        />
      ))}
      {[0, 120, 240].map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy={-r * 0.18}
          rx={r * 0.19}
          ry={r * 0.25}
          fill={dark}
          opacity="0.46"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r={r * 0.13} fill="#B58A5E" opacity="0.7" />
      <circle r={r * 0.82} fill="none" stroke={dark} strokeWidth={r * 0.03} opacity="0.26" />
      <circle r={r * 0.52} fill="none" stroke={dark} strokeWidth={r * 0.03} opacity="0.3" />
    </g>
  );
}

/* A small open blossom: five round petals around a gold heart. */
function blossom(cx, cy, r, light, dark, key = "b") {
  return (
    <g key={key} transform={`translate(${cx} ${cy})`}>
      <circle r={r * 1.14} fill={dark} opacity="0.12" />
      {[0, 72, 144, 216, 288].map((a) => (
        <circle
          key={a}
          cy={-r * 0.56}
          r={r * 0.5}
          fill={light}
          opacity="0.66"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r={r * 0.3} fill={light} opacity="0.5" />
      <circle r={r * 0.17} fill="#C6A56B" opacity="0.85" />
    </g>
  );
}

/* Eucalyptus: round, powdery leaves stepping along a branch. */
function eucalyptusLeaves(p0, p1, p2, p3, { count = 13, light, dark, scale = 1, key = "e" }) {
  return Array.from({ length: count }, (_, i) => {
    const t = 0.05 + (0.92 * i) / Math.max(count - 1, 1);
    const [x, y] = point(p0, p1, p2, p3, t);
    const angle = tangent(p0, p1, p2, p3, t);
    const side = i % 2 === 0 ? 1 : -1;
    const size = scale * (0.55 + 0.55 * (1 - t));
    return (
      <ellipse
        key={`${key}-${i}`}
        rx={13 * size}
        ry={9.5 * size}
        fill={i % 2 === 0 ? light : dark}
        opacity="0.62"
        transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(angle + side * 26).toFixed(1)}) translate(${(side * 10 * size).toFixed(1)} 0)`}
      />
    );
  });
}

/* The shared watercolour wash: every shape is blurred just enough that its
   edge feathers, then composited on the paper. One filter id per instance so
   sibling SVGs never collide. */
function Watercolour({ children, blur = 0.45 }) {
  const id = useId();
  return (
    <>
      <defs>
        <filter id={id} x="-12%" y="-12%" width="124%" height="124%">
          <feGaussianBlur stdDeviation={blur} />
        </filter>
      </defs>
      <g filter={`url(${id})`}>{children}</g>
    </>
  );
}

/* ------------------------------- single sprig ------------------------------ */
export function Sprig({ tone = "sage", className = "" }) {
  const [light, dark] = palette(tone);
  const p0 = [4, 96];
  const p1 = [24, 70];
  const p2 = [48, 40];
  const p3 = [96, 8];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <Watercolour>
        {stem(p0, p1, p2, p3, dark, 1.6)}
        {leavesAlong(p0, p1, p2, p3, { count: 7, light, dark, scale: 0.82 })}
        {flower(96, 8, 15, light, dark, "tip")}
      </Watercolour>
    </svg>
  );
}

/* --------------------------- hanging vine (top) --------------------------- */
export function Vine({ tone = "sage", className = "" }) {
  const [light, dark] = palette(tone);
  const p0 = [60, 0];
  const p1 = [18, 120];
  const p2 = [100, 268];
  const p3 = [48, 418];
  return (
    <svg viewBox="0 0 120 420" className={className} aria-hidden="true" preserveAspectRatio="xMidYMin meet">
      <Watercolour>
        {stem(p0, p1, p2, p3, dark, 1.8)}
        {leavesAlong(p0, p1, p2, p3, { count: 13, light, dark, spread: 42, scale: 0.9 })}
        {flower(30, 132, 13, light, dark, "v1")}
        {flower(74, 300, 11, light, dark, "v2")}
      </Watercolour>
    </svg>
  );
}

/* --------------- trailing vine that spills sideways from a corner ---------- */
export function TrailVine({ tone = "sage", accent = "rose", className = "" }) {
  const [light, dark] = palette(tone);
  const [a1, a2] = palette(accent);
  const p0 = [6, 4];
  const p1 = [96, 26];
  const p2 = [150, 74];
  const p3 = [196, 118];
  return (
    <svg viewBox="0 0 208 132" className={className} aria-hidden="true" preserveAspectRatio="xMinYMin meet">
      <Watercolour>
        {stem(p0, p1, p2, p3, dark, 1.7)}
        {leavesAlong(p0, p1, p2, p3, { count: 9, light, dark, spread: 40, scale: 0.78 })}
        {blossom(150, 74, 13, a1, a2, "tv1")}
        {blossom(196, 118, 10, a1, a2, "tv2")}
      </Watercolour>
    </svg>
  );
}

/* ------------------- upright plant growing out of a bottom edge ------------ */
export function Plant({ tone = "sage", accent = "rose", className = "" }) {
  const [light, dark] = palette(tone);
  const [a1, a2] = palette(accent);
  const base = [60, 262];
  const arms = [
    { p1: [56, 200], p2: [58, 130], p3: [60, 56], light, dark, scale: 0.95, key: "p1" },
    { p1: [42, 210], p2: [26, 168], p3: [18, 116], light: a1, dark: a2, scale: 0.85, key: "p2" },
    { p1: [80, 206], p2: [98, 170], p3: [104, 126], light: a1, dark: a2, scale: 0.85, key: "p3" },
  ];
  return (
    <svg viewBox="0 0 120 262" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <Watercolour>
        {arms.map((arm) => (
          <g key={arm.key}>
            {stem(base, arm.p1, arm.p2, arm.p3, arm.dark, 1.8, `${arm.key}s`)}
            {leavesAlong(base, arm.p1, arm.p2, arm.p3, {
              count: 6,
              light: arm.light,
              dark: arm.dark,
              spread: 40,
              scale: arm.scale,
              key: `${arm.key}l`,
            })}
          </g>
        ))}
        {flower(60, 56, 26, light, dark, "pf1")}
        {flower(18, 116, 18, a1, a2, "pf2")}
        {flower(104, 126, 20, a1, a2, "pf3")}
        {leavesAlong(base, [50, 240], [26, 236], [2, 240], {
          count: 4,
          light,
          dark,
          spread: 26,
          scale: 0.8,
          key: "pfl",
        })}
        {leavesAlong(base, [72, 240], [96, 238], [118, 242], {
          count: 4,
          light: a1,
          dark: a2,
          spread: 26,
          scale: 0.8,
          key: "pfr",
        })}
      </Watercolour>
    </svg>
  );
}

/* ----------------------- corner spray (anchored at 0,0) ------------------- */
export function Cluster({ tone = "sage", accent = "rose", className = "" }) {
  const [light, dark] = palette(tone);
  const [a1, a2] = palette(accent);
  const A = [[2, 8], [36, 26], [80, 40], [138, 52]];
  const B = [[6, 12], [24, 52], [46, 96], [82, 138]];
  const C = [[8, 4], [44, 8], [82, 2], [122, -6]];
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" preserveAspectRatio="xMinYMin meet">
      <Watercolour>
        {stem(A[0], A[1], A[2], A[3], dark, 1.8, "cA")}
        {leavesAlong(A[0], A[1], A[2], A[3], { count: 6, light, dark, scale: 1, key: "cAl" })}
        {stem(B[0], B[1], B[2], B[3], a2, 1.8, "cB")}
        {leavesAlong(B[0], B[1], B[2], B[3], { count: 6, light: a1, dark: a2, scale: 1, key: "cBl" })}
        {stem(C[0], C[1], C[2], C[3], dark, 1.5, "cC")}
        {leavesAlong(C[0], C[1], C[2], C[3], { count: 5, light, dark, scale: 0.9, key: "cCl" })}
        {flower(138, 52, 36, a1, a2, "cF1")}
        {flower(82, 138, 30, a1, a2, "cF2")}
        {flower(122, -6, 26, light, dark, "cF3")}
        {flower(58, 62, 17, light, dark, "cF4")}
        {flower(106, 96, 14, a1, a2, "cF5")}
      </Watercolour>
    </svg>
  );
}

/* ----------------- lush corner bouquet (anchored at 0,0) ------------------ *
 * Denser and more asymmetric than Cluster: an extra wandering branch, more
 * blooms of varied size, and a couple of small bud accents — for the spots that
 * need a major botanical arrangement. */
export function Bouquet({ tone = "sage", accent = "rose", className = "" }) {
  const [light, dark] = palette(tone);
  const [a1, a2] = palette(accent);
  const [g1, g2] = palette("gold");
  const A = [[0, 14], [34, 30], [82, 44], [150, 58]];
  const B = [[4, 18], [22, 58], [48, 104], [92, 156]];
  const C = [[6, 6], [44, 12], [86, 6], [134, -10]];
  const D = [[10, 24], [56, 64], [104, 96], [168, 112]];
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true" preserveAspectRatio="xMinYMin meet">
      <Watercolour blur={0.5}>
        {stem(A[0], A[1], A[2], A[3], dark, 1.8, "bA")}
        {leavesAlong(A[0], A[1], A[2], A[3], { count: 7, light, dark, scale: 1.05, key: "bAl" })}
        {stem(B[0], B[1], B[2], B[3], a2, 1.8, "bB")}
        {leavesAlong(B[0], B[1], B[2], B[3], { count: 7, light: a1, dark: a2, scale: 1.05, key: "bBl" })}
        {stem(C[0], C[1], C[2], C[3], dark, 1.5, "bC")}
        {leavesAlong(C[0], C[1], C[2], C[3], { count: 5, light, dark, scale: 0.95, key: "bCl" })}
        {stem(D[0], D[1], D[2], D[3], g2, 1.4, "bD")}
        {leavesAlong(D[0], D[1], D[2], D[3], { count: 5, light: g1, dark: g2, spread: 30, scale: 0.7, key: "bDl" })}
        {flower(150, 58, 42, a1, a2, "bF1")}
        {flower(92, 156, 34, a1, a2, "bF2")}
        {flower(134, -10, 30, light, dark, "bF3")}
        {flower(168, 112, 22, g1, g2, "bF4")}
        {flower(60, 70, 19, light, dark, "bF5")}
        {flower(110, 104, 15, a1, a2, "bF6")}
        {flower(40, 130, 13, light, dark, "bF7")}
      </Watercolour>
    </svg>
  );
}

/* --------------------- rose cluster (anchored at 0,0) --------------------- *
 * The heaviest arrangement in the library: three garden roses of different
 * ages, two buds and a fan of foliage. Used for the moments that should feel
 * painted at full strength — the cover, the profiles, the RSVP card and the
 * closing bed of the footer. */
export function RoseCluster({ tone = "sage", accent = "rose", className = "" }) {
  const [light, dark] = palette(tone);
  const [a1, a2] = palette(accent);
  const [b1, b2] = palette("blush");
  const A = [[0, 30], [40, 44], [96, 56], [170, 66]];
  const B = [[4, 36], [24, 84], [54, 136], [100, 182]];
  const C = [[8, 12], [58, 22], [116, 16], [180, 26]];
  const D = [[14, 40], [74, 64], [134, 82], [200, 94]];
  return (
    <svg viewBox="0 0 300 300" className={className} aria-hidden="true" preserveAspectRatio="xMinYMin meet">
      <Watercolour blur={0.5}>
        {stem(A[0], A[1], A[2], A[3], dark, 2, "rA")}
        {leavesAlong(A[0], A[1], A[2], A[3], { count: 7, light, dark, scale: 1.05, key: "rAl" })}
        {stem(B[0], B[1], B[2], B[3], a2, 1.9, "rB")}
        {leavesAlong(B[0], B[1], B[2], B[3], { count: 7, light: a1, dark: a2, scale: 1, key: "rBl" })}
        {stem(C[0], C[1], C[2], C[3], dark, 1.5, "rC")}
        {leavesAlong(C[0], C[1], C[2], C[3], { count: 6, light, dark, scale: 0.85, key: "rCl" })}
        {stem(D[0], D[1], D[2], D[3], a2, 1.3, "rD")}
        {leavesAlong(D[0], D[1], D[2], D[3], { count: 5, light: b1, dark: b2, spread: 30, scale: 0.7, key: "rDl" })}
        {rose(170, 66, 46, a1, a2, "rR1")}
        {rose(100, 182, 36, b1, b2, "rR2")}
        {rose(236, 152, 30, a1, a2, "rR3")}
        {rose(150, 124, 21, light, dark, "rR4")}
        {flower(252, 62, 16, a1, a2, "rF1")}
        {flower(58, 116, 14, b1, b2, "rF2")}
        {blossom(196, 220, 13, b1, b2, "rB1")}
      </Watercolour>
    </svg>
  );
}

/* ------------------ eucalyptus branch (grows from the left) --------------- */
export function Eucalyptus({ tone = "silver", accent = "sage", className = "" }) {
  const [light, dark] = palette(tone);
  const [a1, a2] = palette(accent);
  const main = [[2, 124], [72, 92], [156, 56], [276, 26]];
  const low = [[8, 142], [62, 132], [118, 122], [178, 112]];
  return (
    <svg viewBox="0 0 292 164" className={className} aria-hidden="true" preserveAspectRatio="xMinYMid meet">
      <Watercolour blur={0.4}>
        {stem(main[0], main[1], main[2], main[3], dark, 1.9, "euA")}
        {eucalyptusLeaves(main[0], main[1], main[2], main[3], { count: 14, light, dark, scale: 1, key: "euAl" })}
        {stem(low[0], low[1], low[2], low[3], a2, 1.5, "euB")}
        {eucalyptusLeaves(low[0], low[1], low[2], low[3], { count: 9, light: a1, dark: a2, scale: 0.8, key: "euBl" })}
        {blossom(276, 26, 11, a1, a2, "euF1")}
        {blossom(178, 112, 9, a1, a2, "euF2")}
      </Watercolour>
    </svg>
  );
}

/* --------------- blossom branch (grows up from the lower left) ------------ *
 * Delicate and airy: a thin arching branch with a handful of open five-petal
 * blossoms and buds. For the quiet moments that need one accent, not a bed. */
export function BlossomBranch({ tone = "sage", accent = "rose", className = "" }) {
  const [light, dark] = palette(tone);
  const [a1, a2] = palette(accent);
  const b1 = "#E4CFC3";
  const b2 = "#CBA79A";
  const main = [[26, 250], [40, 176], [96, 94], [182, 30]];
  const twig = [[112, 106], [150, 92], [186, 96], [214, 106]];
  return (
    <svg viewBox="0 0 226 262" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <Watercolour blur={0.42}>
        {stem(main[0], main[1], main[2], main[3], dark, 1.9, "blA")}
        {leavesAlong(main[0], main[1], main[2], main[3], { count: 9, light, dark, spread: 44, scale: 0.8, key: "blAl" })}
        {stem(twig[0], twig[1], twig[2], twig[3], dark, 1.3, "blB")}
        {leavesAlong(twig[0], twig[1], twig[2], twig[3], { count: 4, light, dark, spread: 38, scale: 0.6, key: "blBl" })}
        {blossom(182, 30, 20, b1, b2, "blF1")}
        {blossom(140, 74, 15, b1, b2, "blF2")}
        {blossom(96, 120, 13, a1, a2, "blF3")}
        {blossom(214, 106, 12, b1, b2, "blF4")}
        {blossom(64, 178, 10, a1, a2, "blF5")}
        {blossom(38, 232, 8, b1, b2, "blF6")}
      </Watercolour>
    </svg>
  );
}

/* ------------------------------ fern frond ------------------------------- */
export function Fern({ tone = "sage", className = "" }) {
  const [light, dark] = palette(tone);
  const rib = [[62, 246], [54, 178], [76, 96], [108, 14]];
  return (
    <svg viewBox="0 0 168 254" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <Watercolour blur={0.4}>
        {stem(rib[0], rib[1], rib[2], rib[3], dark, 1.7, "feR")}
        {leavesAlong(rib[0], rib[1], rib[2], rib[3], {
          count: 17,
          light,
          dark,
          spread: 52,
          scale: 0.62,
          shape: FERN_LEAF,
          start: 0.06,
          end: 0.98,
          key: "feL",
        })}
        {leavesAlong(rib[0], rib[1], rib[2], rib[3], {
          count: 15,
          light,
          dark,
          spread: 62,
          scale: 0.44,
          shape: FERN_LEAF,
          start: 0.12,
          end: 0.96,
          key: "feL2",
        })}
      </Watercolour>
    </svg>
  );
}

/* ---------------------------- loose petals ------------------------------- */
const SCATTER = [
  [24, 42, 15, 22],
  [74, 20, 12, 64],
  [124, 56, 14, -28],
  [172, 28, 11, 40],
  [200, 92, 13, -14],
  [56, 112, 17, 30],
  [116, 134, 12, -52],
  [164, 152, 14, 18],
  [28, 162, 11, -22],
  [202, 166, 10, 52],
];

export function PetalScatter({ tone = "rose", accent = "blush", className = "" }) {
  const [light] = palette(accent);
  const [dark] = palette(tone);
  return (
    <svg viewBox="0 0 224 186" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <Watercolour blur={0.3}>
        {SCATTER.map(([x, y, r, a], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${a}) scale(${r / 12})`}>
            <path d={PETAL} fill={i % 3 === 0 ? dark : light} opacity="0.6" />
          </g>
        ))}
      </Watercolour>
    </svg>
  );
}

/* ---------------------- bottom-spanning garland --------------------------- *
 * A horizontal arrangement that anchors a section's lower edge: a central
 * bloom flanked by foliage that trails away to each side. */
export function Garland({ tone = "sage", accent = "rose", className = "" }) {
  const [light, dark] = palette(tone);
  const [a1, a2] = palette(accent);
  const [g1, g2] = palette("gold");
  const left = [[6, 30], [70, 44], [140, 30], [210, 38]];
  const right = [[514, 30], [450, 44], [380, 30], [310, 38]];
  const mid = [[210, 38], [240, 64], [280, 64], [310, 38]];
  return (
    <svg viewBox="0 0 520 96" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <Watercolour blur={0.5}>
        {stem(left[0], left[1], left[2], left[3], dark, 1.6, "gL")}
        {leavesAlong(left[0], left[1], left[2], left[3], { count: 7, light, dark, spread: 30, scale: 0.78, key: "gLl" })}
        {stem(right[0], right[1], right[2], right[3], dark, 1.6, "gR")}
        {leavesAlong(right[0], right[1], right[2], right[3], { count: 7, light, dark, spread: 30, scale: 0.78, key: "gRl" })}
        {stem(mid[0], mid[1], mid[2], mid[3], a2, 1.7, "gM")}
        {leavesAlong(mid[0], mid[1], mid[2], mid[3], { count: 6, light: a1, dark: a2, spread: 34, scale: 0.8, key: "gMl" })}
        {rose(260, 38, 32, a1, a2, "gFm")}
        {flower(150, 30, 18, light, dark, "gFl")}
        {flower(370, 30, 18, g1, g2, "gFr")}
        {flower(96, 34, 13, a1, a2, "gFl2")}
        {flower(424, 34, 13, light, dark, "gFr2")}
      </Watercolour>
    </svg>
  );
}

/* ---------------------------- botanical divider --------------------------- */
export function Divider({ className = "" }) {
  const [light, dark] = palette("sage");
  const [a1, a2] = palette("rose");
  const left = [[8, 20], [46, 20], [78, 12], [108, 20]];
  const right = [[232, 20], [194, 20], [162, 12], [132, 20]];
  return (
    <svg viewBox="0 0 240 40" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <Watercolour blur={0.35}>
        {stem(left[0], left[1], left[2], left[3], dark, 1.3, "dL")}
        {stem(right[0], right[1], right[2], right[3], dark, 1.3, "dR")}
        {leavesAlong(left[0], left[1], left[2], left[3], {
          count: 5,
          light,
          dark,
          spread: 26,
          scale: 0.6,
          key: "dLl",
        })}
        {leavesAlong(right[0], right[1], right[2], right[3], {
          count: 5,
          light,
          dark,
          spread: 26,
          scale: 0.6,
          key: "dRl",
        })}
        {blossom(120, 20, 15, a1, a2, "dF")}
        <circle cx="104" cy="20" r="1.6" fill={dark} opacity="0.6" />
        <circle cx="136" cy="20" r="1.6" fill={dark} opacity="0.6" />
      </Watercolour>
    </svg>
  );
}