/**
 * Hand-drawn watercolour botanicals, as transparent SVG.
 *
 * Why SVG instead of the original JPG paintings: the JPGs carried the white
 * paper they were painted on, so they only ever looked pasted-on. These draw
 * with translucent layered shapes, so they sit on ivory, blush or cream alike,
 * scale to any size, and leave no rectangle behind.
 *
 * Every illustration is anchored to the edge it is meant to grow from:
 * `Vine` starts at y=0 (top edge), `Plant` at y=max (bottom edge),
 * `Cluster` at 0,0 (corner).
 */

const TONES = {
  sage: ["#8C9E82", "#71856A"],
  olive: ["#9AA383", "#869070"],
  rose: ["#C08D82", "#A9776C"],
  blush: ["#D5B1A4", "#C69E92"],
  gold: ["#B9A183", "#A78F72"],
};

const LEAF = "M0 0 C 6 -5.5, 18 -5.5, 26 0 C 18 5.5, 6 5.5, 0 0 Z";

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
      opacity="0.5"
    />
  );
}

function leavesAlong(p0, p1, p2, p3, { count = 7, light, dark, spread = 36, scale = 1, key = "l" }) {
  return Array.from({ length: count }, (_, i) => {
    const t = 0.1 + (0.85 * i) / Math.max(count - 1, 1);
    const [x, y] = point(p0, p1, p2, p3, t);
    const angle = tangent(p0, p1, p2, p3, t);
    const side = i % 2 === 0 ? 1 : -1;
    const size = scale * (0.72 + 0.32 * (1 - t));
    return (
      <path
        key={`${key}-${i}`}
        d={LEAF}
        fill={i % 2 === 0 ? dark : light}
        opacity="0.62"
        transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(angle + side * spread).toFixed(1)}) scale(${size.toFixed(2)})`}
      />
    );
  });
}

function flower(cx, cy, r, light, dark, key = "f") {
  return (
    <g key={key} transform={`translate(${cx} ${cy})`}>
      {[0, 72, 144, 216, 288].map((a, i) => (
        <ellipse
          key={a}
          cx="0"
          cy={-r * 0.52}
          rx={r * 0.42}
          ry={r * 0.56}
          fill={i % 2 === 0 ? dark : light}
          opacity="0.52"
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
          opacity="0.34"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r={r * 0.16} fill="#B9A183" opacity="0.85" />
    </g>
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
      {stem(p0, p1, p2, p3, dark, 1.6)}
      {leavesAlong(p0, p1, p2, p3, { count: 7, light, dark, scale: 0.82 })}
      {flower(96, 8, 15, light, dark, "tip")}
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
      {stem(p0, p1, p2, p3, dark, 1.8)}
      {leavesAlong(p0, p1, p2, p3, { count: 13, light, dark, spread: 42, scale: 0.9 })}
      {flower(30, 132, 13, light, dark, "v1")}
      {flower(74, 300, 11, light, dark, "v2")}
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
      {flower(120, 20, 15, a1, a2, "dF")}
      <circle cx="104" cy="20" r="1.6" fill={dark} opacity="0.6" />
      <circle cx="136" cy="20" r="1.6" fill={dark} opacity="0.6" />
    </svg>
  );
}