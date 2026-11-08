import IntroCamera from "@/components/invitation/intro/IntroCamera";
import IntroBranches from "@/components/invitation/intro/IntroBranches";
import IntroGarden from "@/components/invitation/intro/IntroGarden";
import IntroNature from "@/components/invitation/intro/IntroNature";

/**
 * The whole painted world, layer by layer: camera, branches, garden, vines,
 * leaves and butterflies. Each layer knows its own entrance and its own sway;
 * `step` only decides which phases have begun.
 */
export default function IntroStage({ step, closing, instant }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#FBF4E6]">
      <IntroCamera zoom={step >= 1} closing={closing} instant={instant} />

      <IntroBranches spread={step >= 1} sideBranches={step >= 2} instant={instant} />

      <IntroGarden
        bottomCenter={step >= 3}
        bottomLeft={step >= 4}
        bottomRight={step >= 5}
        flankLeft={step >= 6}
        flankRight={step >= 7}
        cornerRight={step >= 8}
        cornerLeft={step >= 9}
        instant={instant}
      />

      <IntroNature vines={step >= 10} alive={step >= 11} instant={instant} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_100%_at_50%_45%,transparent_48%,rgba(74,34,34,0.16)_100%)]"
        style={{ zIndex: 13 }}
      />
    </div>
  );
}