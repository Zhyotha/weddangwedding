import Sway from "@/components/invitation/motion/Sway";
import FallingPetals, { Butterfly } from "@/components/invitation/motion/Ambient";
import {
  BlossomBranch,
  Bouquet,
  Cluster,
  Eucalyptus,
  Fern,
  Garland,
  PetalScatter,
  Plant,
  RoseCluster,
  Sprig,
  TrailVine,
  Vine,
} from "@/components/invitation/ornaments/Botanicals";

const ART = {
  bouquet: Bouquet,
  cluster: Cluster,
  rose: RoseCluster,
  euca: Eucalyptus,
  blossom: BlossomBranch,
  fern: Fern,
  vine: Vine,
  trail: TrailVine,
  plant: Plant,
  sprig: Sprig,
  petals: PetalScatter,
  garland: Garland,
};

/**
 * One botanical, placed and animated on its own.
 *
 * `opacity` is the piece's role in the composition, not a global setting:
 * foreground blooms sit near 0.85 so their pigment reads, mid-ground foliage
 * around 0.65–0.72 builds depth, and background washes stay near 0.4.
 */
export function FloralPiece({
  art,
  className = "",
  tone = "sage",
  accent = "rose",
  opacity = 0.82,
  flipX = false,
  flipY = false,
  rotate = 0,
  duration = 20,
  amplitude = 1.6,
  shift = 4,
  float = 6,
  delay = 0,
  origin = "50% 100%",
}) {
  const Art = ART[art];
  if (!Art) return null;

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <Sway
        className="h-full w-full"
        duration={duration}
        amplitude={amplitude}
        shift={shift}
        float={float}
        delay={delay}
        origin={origin}
        reverse={flipX}
      >
        <div
          className="h-full w-full"
          style={{
            opacity,
            transform: `rotate(${rotate}deg) scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
            transformOrigin: origin,
          }}
        >
          <Art tone={tone} accent={accent} className="h-full w-full" />
        </div>
      </Sway>
    </div>
  );
}

/** A soft pigment pool in the paper, well under the content. */
function Wash({ className = "", tone = "blush", strength = 0.4 }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute block rounded-full blur-2xl ${className}`}
      style={{
        background: `radial-gradient(50% 50% at 50% 50%, hsl(var(--${tone}) / ${strength}) 0%, transparent 72%)`,
      }}
    />
  );
}

/**
 * Every section gets its own composition — a different mix of species, a
 * different corner, a different density — so the page never repeats the same
 * arrangement twice. Nothing is cropped: each illustration is anchored just
 * inside the section edge it grows from, and only its stem ends run off.
 */
const COMPOSITIONS = {
  /* Cover: the fullest moment on the page. */
  hero: [
    { kind: "wash", className: "-left-40 -top-44 h-[34rem] w-[34rem]", tone: "blush", strength: 0.5 },
    { kind: "wash", className: "-right-36 top-24 h-[26rem] w-[26rem]", tone: "sage", strength: 0.26 },
    {
      art: "rose",
      className: "-left-10 -top-12 h-44 w-44 sm:-left-8 sm:-top-16 sm:h-[26rem] sm:w-[26rem]",
      opacity: 0.88,
      tone: "sage",
      accent: "rose",
      duration: 26,
      amplitude: 1.2,
      float: 9,
      origin: "15% 15%",
    },
    {
      art: "blossom",
      className: "-right-8 top-4 h-40 w-32 sm:-right-4 sm:top-8 sm:h-64 sm:w-48",
      opacity: 0.84,
      tone: "sage",
      accent: "rose",
      duration: 21,
      amplitude: 1.8,
      delay: 1.2,
      origin: "85% 90%",
    },
    {
      art: "euca",
      className: "left-0 top-[18rem] h-14 w-44 sm:left-2 sm:top-[24rem] sm:h-24 sm:w-[22rem]",
      opacity: 0.66,
      tone: "silver",
      accent: "sage",
      duration: 23,
      amplitude: 2,
      delay: 2.1,
      origin: "0% 100%",
    },
    {
      art: "vine",
      className: "-top-1 right-[8%] h-32 w-9 sm:h-52 sm:w-14",
      opacity: 0.74,
      tone: "sage",
      duration: 19,
      amplitude: 2.4,
      shift: 6,
      delay: 0.6,
      origin: "50% 0%",
    },
    {
      art: "petals",
      className: "right-[23%] top-[3%] h-20 w-24 sm:h-28 sm:w-36",
      opacity: 0.7,
      tone: "rose",
      accent: "blush",
      duration: 24,
      amplitude: 3,
      origin: "50% 50%",
    },
    { kind: "petals", props: { count: 7, seed: 3, leafRatio: 0.3, opacity: 0.62 } },
    { kind: "butterfly", props: { className: "left-[16%] top-[26%]", size: 15, duration: 26, delay: 3, range: 30 } },
  ],

  /* Greeting: small roses opening from the lower corner, one branch above. */
  greeting: [
    {
      art: "rose",
      className: "-left-12 -bottom-14 h-40 w-40 sm:-left-10 sm:-bottom-16 sm:h-64 sm:w-64",
      opacity: 0.85,
      tone: "sage",
      accent: "rose",
      flipY: true,
      duration: 22,
      amplitude: 1.5,
      float: 6,
      origin: "20% 85%",
    },
    {
      art: "fern",
      className: "-right-6 -bottom-8 h-32 w-20 sm:right-0 sm:-bottom-10 sm:h-48 sm:w-28",
      opacity: 0.64,
      tone: "sage",
      flipX: true,
      duration: 25,
      amplitude: 1.4,
      delay: 1.4,
      origin: "80% 100%",
    },
    {
      art: "euca",
      className: "-right-16 top-2 h-12 w-44 sm:-right-10 sm:top-4 sm:h-16 sm:w-64",
      opacity: 0.56,
      tone: "silver",
      flipX: true,
      duration: 24,
      amplitude: 1.8,
      delay: 2.2,
      origin: "100% 50%",
    },
    { kind: "butterfly", props: { className: "right-[16%] top-8", size: 14, duration: 28, delay: 1.5, range: -24 } },
  ],

  /* Quran verse: one delicate branch, and plenty of untouched paper. */
  verse: [
    { kind: "wash", className: "-left-24 top-0 h-72 w-72", tone: "sage", strength: 0.22 },
    {
      art: "blossom",
      className: "-right-5 -top-6 h-32 w-24 sm:-right-2 sm:-top-8 sm:h-48 sm:w-36",
      opacity: 0.66,
      tone: "sage",
      accent: "blush",
      flipX: true,
      duration: 23,
      amplitude: 2,
      origin: "85% 85%",
    },
    {
      art: "sprig",
      className: "-left-3 -bottom-4 h-20 w-16 sm:-left-1 sm:-bottom-6 sm:h-28 sm:w-24",
      opacity: 0.6,
      tone: "sage",
      flipY: true,
      duration: 20,
      amplitude: 2.2,
      delay: 1.1,
      origin: "20% 80%",
    },
  ],

  /* Profiles: asymmetric — a branch above left, roses below right. */
  couple: [
    {
      art: "blossom",
      className: "-left-14 top-4 h-44 w-32 sm:-left-10 sm:top-8 sm:h-64 sm:w-44",
      opacity: 0.82,
      tone: "sage",
      accent: "rose",
      duration: 24,
      amplitude: 1.6,
      float: 7,
      origin: "25% 95%",
    },
    {
      art: "rose",
      className: "-right-12 -bottom-16 h-44 w-44 sm:-right-8 sm:-bottom-20 sm:h-72 sm:w-72",
      opacity: 0.86,
      tone: "sage",
      accent: "rose",
      flipX: true,
      flipY: true,
      duration: 27,
      amplitude: 1.3,
      delay: 1.3,
      origin: "80% 15%",
    },
    {
      art: "fern",
      className: "-left-4 -bottom-6 h-28 w-16 sm:left-0 sm:-bottom-8 sm:h-40 sm:w-24",
      opacity: 0.58,
      tone: "sage",
      duration: 21,
      amplitude: 1.6,
      delay: 2,
      origin: "40% 100%",
    },
    {
      art: "petals",
      className: "right-[8%] top-[10%] h-16 w-20 sm:h-24 sm:w-28",
      opacity: 0.62,
      tone: "rose",
      accent: "blush",
      duration: 22,
      amplitude: 2.6,
      delay: 0.8,
      origin: "50% 50%",
    },
    { kind: "petals", props: { count: 5, seed: 23, leafRatio: 0.6, opacity: 0.5 } },
  ],

  /* Schedule: a curved branch on each side, framing the two event cards. */
  events: [
    {
      art: "euca",
      className: "-left-20 top-[22%] h-16 w-56 sm:-left-14 sm:top-[24%] sm:h-24 sm:w-[24rem]",
      opacity: 0.64,
      tone: "silver",
      rotate: -8,
      duration: 24,
      amplitude: 1.8,
      float: 6,
      origin: "0% 50%",
    },
    {
      art: "blossom",
      className: "-right-10 -bottom-10 h-40 w-28 sm:-right-6 sm:-bottom-12 sm:h-56 sm:w-40",
      opacity: 0.74,
      tone: "sage",
      accent: "blush",
      flipX: true,
      duration: 22,
      amplitude: 1.5,
      delay: 1.6,
      origin: "85% 90%",
    },
    {
      art: "sprig",
      className: "-left-2 top-6 h-16 w-14 sm:h-20 sm:w-16",
      opacity: 0.52,
      tone: "sage",
      flipY: true,
      duration: 18,
      amplitude: 3,
      delay: 0.5,
      origin: "30% 80%",
    },
  ],

  /* Countdown: a trailing sprig from the upper corner and one low fern. */
  countdown: [
    {
      art: "trail",
      className: "-left-10 -top-4 h-16 w-32 sm:-left-6 sm:-top-6 sm:h-20 sm:w-40",
      opacity: 0.62,
      tone: "sage",
      accent: "rose",
      duration: 23,
      amplitude: 2,
      origin: "0% 0%",
    },
    {
      art: "fern",
      className: "-right-4 -bottom-4 h-28 w-16 sm:right-0 sm:-bottom-6 sm:h-40 sm:w-24",
      opacity: 0.55,
      tone: "sage",
      flipX: true,
      duration: 21,
      amplitude: 1.4,
      delay: 1.7,
      origin: "70% 100%",
    },
    {
      art: "petals",
      className: "right-[14%] top-[14%] h-14 w-16 sm:h-20 sm:w-24",
      opacity: 0.5,
      tone: "rose",
      accent: "blush",
      duration: 25,
      amplitude: 2.8,
      delay: 1.1,
      origin: "50% 50%",
    },
  ],

  /* Venue: restrained foliage low on both sides, address and map untouched. */
  venue: [
    {
      art: "euca",
      className: "-left-14 -bottom-2 h-14 w-48 sm:-left-8 sm:-bottom-4 sm:h-20 sm:w-64",
      opacity: 0.56,
      tone: "silver",
      duration: 25,
      amplitude: 1.6,
      origin: "0% 50%",
    },
    {
      art: "fern",
      className: "-right-4 -bottom-4 h-28 w-16 sm:right-0 sm:-bottom-6 sm:h-40 sm:w-24",
      opacity: 0.54,
      tone: "sage",
      flipX: true,
      duration: 22,
      amplitude: 1.4,
      delay: 1.8,
      origin: "70% 100%",
    },
    { kind: "wash", className: "-right-20 bottom-0 h-72 w-72", tone: "sage", strength: 0.26 },
  ],

  /* Gallery: only the outer corners, so no photograph is ever covered. */
  gallery: [
    {
      art: "blossom",
      className: "-left-10 top-2 h-28 w-20 sm:-left-6 sm:top-4 sm:h-40 sm:w-28",
      opacity: 0.58,
      tone: "sage",
      accent: "blush",
      duration: 24,
      amplitude: 2,
      origin: "25% 95%",
    },
    {
      art: "sprig",
      className: "-right-3 -bottom-3 h-20 w-16 sm:-right-1 sm:-bottom-4 sm:h-28 sm:w-20",
      opacity: 0.56,
      tone: "sage",
      flipX: true,
      flipY: true,
      duration: 19,
      amplitude: 2.4,
      delay: 1.2,
      origin: "75% 80%",
    },
    {
      art: "petals",
      className: "left-[6%] top-[46%] h-14 w-16 sm:h-20 sm:w-24",
      opacity: 0.5,
      tone: "rose",
      accent: "blush",
      duration: 26,
      amplitude: 3,
      delay: 2,
      origin: "50% 50%",
    },
  ],

  /* RSVP: the second fullest moment — an elaborate frame around the form. */
  rsvp: [
    {
      art: "bouquet",
      className: "-right-12 -top-14 h-48 w-48 sm:-right-10 sm:-top-16 sm:h-72 sm:w-72",
      opacity: 0.86,
      tone: "sage",
      accent: "rose",
      flipX: true,
      duration: 26,
      amplitude: 1.4,
      float: 8,
      origin: "85% 15%",
    },
    {
      art: "rose",
      className: "-left-12 -bottom-14 h-44 w-44 sm:-left-10 sm:-bottom-16 sm:h-64 sm:w-64",
      opacity: 0.86,
      tone: "sage",
      accent: "rose",
      flipY: true,
      duration: 23,
      amplitude: 1.4,
      delay: 1.1,
      float: 7,
      origin: "15% 85%",
    },
    {
      art: "trail",
      className: "right-[18%] -top-6 h-16 w-28 sm:h-20 sm:w-36",
      opacity: 0.6,
      tone: "sage",
      accent: "rose",
      flipX: true,
      duration: 21,
      amplitude: 2.2,
      delay: 1.8,
      origin: "100% 0%",
    },
    {
      art: "petals",
      className: "left-[14%] top-[10%] h-16 w-16 sm:h-24 sm:w-24",
      opacity: 0.58,
      tone: "rose",
      accent: "blush",
      duration: 24,
      amplitude: 3,
      delay: 2.4,
      origin: "50% 50%",
    },
  ],

  /* Wishes: mid-weight, kept clear of the message list. */
  wishes: [
    {
      art: "euca",
      className: "-left-16 -top-2 h-14 w-44 sm:-left-10 sm:-top-4 sm:h-20 sm:w-60",
      opacity: 0.6,
      tone: "silver",
      duration: 24,
      amplitude: 1.8,
      origin: "0% 50%",
    },
    {
      art: "blossom",
      className: "-right-8 -bottom-8 h-32 w-24 sm:-right-4 sm:-bottom-10 sm:h-48 sm:w-32",
      opacity: 0.7,
      tone: "sage",
      accent: "rose",
      flipX: true,
      duration: 23,
      amplitude: 1.6,
      delay: 1.5,
      origin: "85% 90%",
    },
    {
      art: "vine",
      className: "-top-1 left-[12%] h-24 w-8 sm:h-36 sm:w-10",
      opacity: 0.5,
      tone: "sage",
      duration: 20,
      amplitude: 2.6,
      delay: 0.9,
      origin: "50% 0%",
    },
  ],

  /* Sharing: almost bare — two sprigs at the lower corners. */
  share: [
    {
      art: "sprig",
      className: "-left-4 -bottom-2 h-20 w-16 sm:-left-2 sm:-bottom-3 sm:h-28 sm:w-20",
      opacity: 0.54,
      tone: "sage",
      duration: 21,
      amplitude: 2.2,
      origin: "30% 90%",
    },
    {
      art: "sprig",
      className: "-right-4 -bottom-2 h-16 w-14 sm:-right-2 sm:-bottom-3 sm:h-24 sm:w-16",
      opacity: 0.5,
      tone: "sage",
      flipX: true,
      duration: 18,
      amplitude: 2.4,
      delay: 1.4,
      origin: "70% 90%",
    },
  ],

  /* The closing bed: a layered composition that ends the invitation. */
  footer: [
    {
      art: "rose",
      className: "-left-10 -bottom-12 h-44 w-44 sm:-left-8 sm:-bottom-14 sm:h-64 sm:w-64",
      opacity: 0.86,
      tone: "sage",
      accent: "rose",
      flipY: true,
      duration: 24,
      amplitude: 1.4,
      float: 7,
      origin: "15% 85%",
    },
    {
      art: "rose",
      className: "-right-10 -bottom-12 h-40 w-40 sm:-right-8 sm:-bottom-14 sm:h-60 sm:w-60",
      opacity: 0.86,
      tone: "sage",
      accent: "blush",
      flipX: true,
      flipY: true,
      duration: 27,
      amplitude: 1.3,
      delay: 1.6,
      float: 8,
      origin: "85% 85%",
    },
    {
      art: "euca",
      className: "left-[16%] -bottom-3 h-12 w-40 sm:left-[20%] sm:-bottom-4 sm:h-16 sm:w-52",
      opacity: 0.5,
      tone: "silver",
      duration: 26,
      amplitude: 1.8,
      delay: 0.9,
      origin: "50% 100%",
    },
    {
      art: "blossom",
      className: "-left-6 top-0 h-32 w-24 sm:-left-2 sm:top-2 sm:h-44 sm:w-32",
      opacity: 0.62,
      tone: "sage",
      accent: "rose",
      duration: 23,
      amplitude: 1.8,
      delay: 2.1,
      origin: "25% 95%",
    },
    { kind: "petals", props: { count: 6, seed: 41, leafRatio: 0.4, opacity: 0.5 } },
  ],
};

export default function SectionFlorals({ variant = "share", className = "" }) {
  const items = COMPOSITIONS[variant] ?? [];

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
      {items.map((item, index) => {
        if (item.kind === "wash") return <Wash key={`wash-${index}`} {...item} />;
        if (item.kind === "petals") return <FallingPetals key={`petals-${index}`} {...item.props} />;
        if (item.kind === "butterfly") return <Butterfly key={`butterfly-${index}`} {...item.props} />;
        return <FloralPiece key={`${item.art}-${index}`} {...item} />;
      })}
    </div>
  );
}