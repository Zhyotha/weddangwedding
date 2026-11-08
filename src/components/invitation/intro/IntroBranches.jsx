import ArtLayer from "@/components/invitation/intro/ArtLayer";
import { SCENE, SWAY } from "@/components/invitation/intro/sceneAssets";

/**
 * Four branches lean inward and almost close the view, then spread outward as
 * the camera pushes in (parallax). Two slender side branches spring in after.
 */
export default function IntroBranches({ spread, sideBranches, instant }) {
  return (
    <>
      <ArtLayer
        src={SCENE.branchTL}
        z={7}
        origin="left top"
        instant={instant}
        boxClass="left-[-12%] top-[-9%] h-[66%] w-[92%]"
        show
        from={{ x: "-34%", y: "-30%", scale: 0.84, rotate: -7 }}
        to={spread ? { x: "-9%", y: "-9%", scale: 1.18, rotate: -2 } : { x: "8%", y: "7%", scale: 1.03, rotate: 0 }}
        duration={spread ? 3 : 1.9}
        delay={instant ? 0 : 0.05}
        sway={SWAY.branchTL}
      />

      <ArtLayer
        src={SCENE.branchTR}
        z={7}
        origin="right top"
        instant={instant}
        boxClass="right-[-12%] top-[-9%] h-[66%] w-[92%]"
        show
        from={{ x: "34%", y: "-30%", scale: 0.84, rotate: 7 }}
        to={spread ? { x: "9%", y: "-9%", scale: 1.18, rotate: 2 } : { x: "-8%", y: "7%", scale: 1.03, rotate: 0 }}
        duration={spread ? 3 : 1.9}
        delay={instant ? 0 : 0.18}
        sway={SWAY.branchTR}
      />

      <ArtLayer
        src={SCENE.branchBL}
        z={8}
        origin="left bottom"
        instant={instant}
        boxClass="bottom-[-8%] left-[-12%] h-[58%] w-[84%]"
        show
        from={{ x: "-32%", y: "32%", scale: 0.84, rotate: 6 }}
        to={spread ? { x: "-10%", y: "12%", scale: 1.16, rotate: 2 } : { x: "9%", y: "-8%", scale: 1.03, rotate: 0 }}
        duration={spread ? 3 : 1.9}
        delay={instant ? 0 : 0.3}
        sway={SWAY.branchBL}
      />

      <ArtLayer
        src={SCENE.branchBR}
        z={8}
        origin="right bottom"
        instant={instant}
        boxClass="bottom-[-8%] right-[-12%] h-[58%] w-[84%]"
        show
        from={{ x: "32%", y: "32%", scale: 0.84, rotate: -6 }}
        to={spread ? { x: "10%", y: "12%", scale: 1.16, rotate: -2 } : { x: "-9%", y: "-8%", scale: 1.03, rotate: 0 }}
        duration={spread ? 3 : 1.9}
        delay={instant ? 0 : 0.42}
        sway={SWAY.branchBR}
      />

      <ArtLayer
        src={SCENE.sideLeft}
        z={6}
        origin="left center"
        instant={instant}
        boxClass="left-[-14%] top-[17%] h-[34%] w-[52%]"
        show={sideBranches}
        from={{ x: "-88%", scale: 0.6 }}
        to={{ x: "0%", scale: 1 }}
        spring
        delay={instant ? 0 : 0.15}
        sway={SWAY.sideLeft}
      />

      <ArtLayer
        src={SCENE.sideRight}
        z={6}
        origin="right center"
        instant={instant}
        boxClass="right-[-14%] top-[17%] h-[34%] w-[52%]"
        show={sideBranches}
        from={{ x: "88%", scale: 0.6 }}
        to={{ x: "0%", scale: 1 }}
        spring
        delay={instant ? 0 : 0.35}
        sway={SWAY.sideRight}
      />
    </>
  );
}