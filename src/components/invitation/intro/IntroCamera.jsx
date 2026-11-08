import { motion, useReducedMotion } from "framer-motion";
import { SCENE } from "@/components/invitation/intro/sceneAssets";

/**
 * The painted valley, with the camera pushing forward through the opening
 * branches. A cream veil keeps the landscape hushed until then.
 */
export default function IntroCamera({ zoom, closing, instant }) {
  const reduced = useReducedMotion();
  const still = instant || reduced;

  return (
    <>
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={zoom && !closing ? { scale: 1.3, y: "-2.5%" } : { scale: 1.04, y: "1%" }}
        transition={{
          duration: still ? 0 : 7.4,
          delay: still ? 0 : 2.3,
          ease: [0.33, 0, 0.19, 1],
        }}
      >
        <picture className="block h-full w-full">
          <source media="(min-width: 768px)" srcSet={SCENE.bgWide} />
          <img
            src={SCENE.bgPortrait}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </picture>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-[#FBF3E6]"
        style={{ zIndex: 2 }}
        initial={false}
        animate={zoom ? { opacity: 0.06 } : { opacity: 0.55 }}
        transition={{ duration: still ? 0 : 3.2, ease: "easeInOut" }}
      />
    </>
  );
}