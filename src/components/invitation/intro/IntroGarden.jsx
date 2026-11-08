import ArtLayer from "@/components/invitation/intro/ArtLayer";
import { SCENE, SWAY } from "@/components/invitation/intro/sceneAssets";

/**
 * The garden grows in, one arrangement at a time, each from its own direction:
 * bottom centre, bottom corners, both flanks, then the top corners.
 */
export default function IntroGarden({
  bottomCenter,
  bottomLeft,
  bottomRight,
  flankLeft,
  flankRight,
  cornerRight,
  cornerLeft,
  instant,
}) {
  return (
    <>
      <ArtLayer
        src={SCENE.bottomCenter}
        z={9}
        origin="bottom center"
        instant={instant}
        boxClass="inset-x-[2%] bottom-[-14%] h-[44%]"
        show={bottomCenter}
        from={{ y: "62%", scale: 0.84 }}
        to={{ y: "0%", scale: 1 }}
        spring
        delay={instant ? 0 : 0.1}
        sway={SWAY.bottomCenter}
      />

      <ArtLayer
        src={SCENE.bottomLeft}
        z={10}
        origin="left bottom"
        instant={instant}
        boxClass="bottom-[-10%] left-[-14%] h-[40%] w-[68%]"
        show={bottomLeft}
        from={{ x: "-46%", y: "34%", scale: 0.78 }}
        to={{ x: "0%", y: "0%", scale: 1 }}
        spring
        delay={instant ? 0 : 0.12}
        sway={SWAY.bottomLeft}
      />

      <ArtLayer
        src={SCENE.bottomRight}
        z={10}
        origin="right bottom"
        instant={instant}
        boxClass="bottom-[-10%] right-[-14%] h-[40%] w-[68%]"
        show={bottomRight}
        from={{ x: "46%", y: "34%", scale: 0.78 }}
        to={{ x: "0%", y: "0%", scale: 1 }}
        spring
        delay={instant ? 0 : 0.12}
        sway={SWAY.bottomRight}
      />

      <ArtLayer
        src={SCENE.vegLeft}
        z={9}
        origin="left bottom"
        instant={instant}
        boxClass="bottom-[6%] left-[-6%] h-[46%] w-[52%]"
        show={flankLeft}
        from={{ x: "-58%", scale: 0.82 }}
        to={{ x: "0%", scale: 1 }}
        spring
        delay={instant ? 0 : 0.1}
        sway={SWAY.vegLeft}
      />

      <ArtLayer
        src={SCENE.vegRight}
        z={9}
        origin="right bottom"
        instant={instant}
        boxClass="bottom-[6%] right-[-6%] h-[46%] w-[52%]"
        show={flankRight}
        from={{ x: "58%", scale: 0.82 }}
        to={{ x: "0%", scale: 1 }}
        spring
        delay={instant ? 0 : 0.1}
        sway={SWAY.vegRight}
      />

      <ArtLayer
        src={SCENE.cornerUR}
        z={9}
        origin="right top"
        instant={instant}
        boxClass="right-[-10%] top-[-9%] h-[34%] w-[48%]"
        show={cornerRight}
        from={{ x: "28%", y: "-46%", scale: 0.78 }}
        to={{ x: "0%", y: "0%", scale: 1 }}
        spring
        delay={instant ? 0 : 0.1}
        sway={SWAY.cornerUR}
      />

      <ArtLayer
        src={SCENE.cornerUL}
        z={9}
        origin="left top"
        instant={instant}
        boxClass="left-[-10%] top-[-9%] h-[34%] w-[48%]"
        show={cornerLeft}
        from={{ x: "-28%", y: "-46%", scale: 0.78 }}
        to={{ x: "0%", y: "0%", scale: 1 }}
        spring
        delay={instant ? 0 : 0.1}
        sway={SWAY.cornerUL}
      />
    </>
  );
}