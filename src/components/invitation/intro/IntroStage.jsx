import { motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { OPENING } from "@/components/invitation/intro/openingAssets";
import IntroCurtain from "@/components/invitation/intro/IntroCurtain";
import IntroDecor from "@/components/invitation/intro/IntroDecor";
import IntroLife from "@/components/invitation/intro/IntroLife";
import { WEDDING } from "@/lib/wedding";

// The couple's monogram, tiled faintly across the hazy sky of the engraving.
const MONOGRAM_TILE = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>
     <g fill='#A98B4B' stroke='#A98B4B'>
       <circle cx='70' cy='70' r='46' fill='none' stroke-width='0.7' opacity='0.85'/>
       <circle cx='70' cy='70' r='41' fill='none' stroke-width='0.4' opacity='0.6'/>
       <text x='70' y='78' font-family='Cormorant Garamond, Georgia, serif' font-size='24' letter-spacing='1' text-anchor='middle' stroke='none'>${WEDDING.initials}</text>
     </g>
   </svg>`
)}")`;

/**
 * The whole etched world, composed for a 9:16 vertical frame: the camera pulls
 * back off the venue, the decorations settle in front of it, and the branch
 * curtain opens over the top. Children (the lettering and controls) are placed
 * inside the same frame so everything shares one proportion.
 */
export default function IntroStage({ curtainOpen, closing, instant, children }) {
  const reduced = useReducedMotion();
  const still = instant || reduced;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#150E06]">
      <div
        aria-hidden="true"
        className="absolute inset-0 scale-125 bg-cover bg-center opacity-45 blur-3xl"
        style={{ backgroundImage: `url(${OPENING.scene})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_95%_at_50%_45%,transparent_28%,rgba(21,14,6,0.92)_100%)]"
      />

      <div
        className="relative aspect-[9/16] max-h-full overflow-hidden shadow-[0_50px_140px_-50px_rgba(0,0,0,0.95)]"
        style={{ width: "min(100%, calc(100dvh * 9 / 16))", containerType: "inline-size" }}
      >
        {/* The plate is a touch taller than the frame so the printer's mark at
            its very foot never reaches the invitation. */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[109%]"
          initial={false}
          animate={{ scale: curtainOpen && !closing ? 1 : 1.14 }}
          transition={{ duration: closing ? 1.6 : 3.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={OPENING.scene} alt="" fittingType="fill" className="h-full w-full" />
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: MONOGRAM_TILE,
            backgroundSize: "17cqw",
            opacity: 0.13,
            WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.95), transparent 82%)",
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0.95), transparent 82%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(243,232,208,0.22)_0%,transparent_38%,rgba(38,24,10,0.28)_100%)]"
          style={{ zIndex: 11 }}
        />

        <IntroDecor instant={still} />
        <IntroLife alive={curtainOpen || still} instant={still} />
        <IntroCurtain open={curtainOpen} closing={closing} instant={still} />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_88%_at_50%_50%,transparent_50%,rgba(31,19,7,0.52)_100%)]"
          style={{ zIndex: 25 }}
        />

        {children}
      </div>
    </div>
  );
}