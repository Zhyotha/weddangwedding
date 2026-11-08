import Sway from "@/components/invitation/motion/Sway";
import { Plant, Vine } from "@/components/invitation/ornaments/Botanicals";

/**
 * The garden that frames a section.
 *
 * Vines hang from the section's top edge (their stem starts exactly at y=0) and
 * plants grow out of the bottom edge, each anchored to the boundary itself and
 * cropped by the section's `overflow-hidden`, so nothing ever floats. Every
 * instance is offset by `seed`, so no two sections breathe in the same rhythm.
 *
 * Positioning lives on the outer div; the Sway wrapper owns the transform, so
 * the two never fight over it.
 */
const PLANTS = [
  { side: "left", inset: "-8%", size: "h-[8rem] sm:h-[10rem]", tone: "sage", delay: 0, dur: 17 },
  { side: "left", inset: "17%", size: "h-[6rem] sm:h-[8rem]", tone: "rose", delay: 1.6, dur: 21, wide: true },
  { side: "right", inset: "17%", size: "h-[6.5rem] sm:h-[9rem]", tone: "sage", delay: 2.4, dur: 19, wide: true },
  { side: "right", inset: "-8%", size: "h-[8.5rem] sm:h-[11rem]", tone: "rose", delay: 0.9, dur: 23 },
];

export default function SectionGarden({
  seed = 0,
  tone = "sage",
  accent = "rose",
  vines = true,
  ground = true,
  className = "",
  opacity = 0.4,
}) {
  const drift = seed * 1.7;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {vines && (
        <>
          <div className="absolute -top-px left-[-4%] h-[10.5rem] w-[4.2rem] sm:left-[3%] sm:h-[15rem] sm:w-[6rem]">
            <Sway
              className="h-full w-full"
              duration={17 + (seed % 5)}
              amplitude={1.9}
              shift={5}
              delay={drift}
              origin="50% 0%"
            >
              <Vine tone={tone} className="h-full w-full opacity-45" />
            </Sway>
          </div>
          <div className="absolute -top-px right-[-5%] h-[8.5rem] w-[3.6rem] sm:right-[5%] sm:h-[12.5rem] sm:w-[5rem]">
            <Sway
              className="h-full w-full"
              duration={22 + (seed % 4)}
              amplitude={2.3}
              shift={-5}
              delay={drift + 2.3}
              origin="50% 0%"
              reverse
            >
              <Vine tone={accent} className="h-full w-full opacity-30" />
            </Sway>
          </div>
        </>
      )}

      {ground &&
        PLANTS.map((plant, index) => {
          const position = plant.side === "left" ? { left: plant.inset } : { right: plant.inset };
          return (
            <div
              key={`${plant.side}-${plant.inset}`}
              className={`absolute -bottom-px ${plant.size} ${plant.wide ? "hidden sm:block" : ""}`}
              style={{ ...position, width: "auto", aspectRatio: "120 / 262" }}
            >
              <Sway
                className="h-full w-full"
                duration={plant.dur + (seed % 4)}
                amplitude={1.5}
                shift={3}
                lift={2}
                delay={plant.delay + drift}
                origin="50% 100%"
                reverse={index % 2 === 1}
              >
                <div className="h-full w-full" style={{ opacity }}>
                  <Plant
                    tone={plant.tone === "rose" ? accent : tone}
                    accent={plant.tone === "rose" ? tone : accent}
                    className="h-full w-full"
                  />
                </div>
              </Sway>
            </div>
          );
        })}
    </div>
  );
}