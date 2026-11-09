import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { OPENING } from "@/components/invitation/intro/openingAssets";

const SOFT = [0.22, 1, 0.36, 1];

/**
 * The ceremonial base of the frame: two tiered umbrellas in the bottom corners
 * and the flower bed that lines the very bottom edge.
 */
export default function IntroDecor({ instant }) {
  const rise = (delay) => ({
    initial: instant ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: instant ? 0 : 2.2, delay: instant ? 0 : delay, ease: SOFT },
  });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ zIndex: 12 }}>
      <motion.div className="absolute bottom-[-3%] left-[-14%] h-[34%] w-[42%]" {...rise(1.5)}>
        <Image src={OPENING.umbrella} alt="" fittingType="fit" className="h-full w-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-[-3%] right-[-14%] h-[34%] w-[42%]"
        style={{ transform: "scaleX(-1)" }}
        {...rise(1.65)}
      >
        <Image src={OPENING.umbrella} alt="" fittingType="fit" className="h-full w-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-[-5%] left-1/2 h-[26%] w-[146%] -translate-x-1/2"
        initial={instant ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: instant ? 0 : 2.4, delay: instant ? 0 : 1.35, ease: SOFT }}
      >
        <Image
          src={OPENING.florals}
          alt=""
          fittingType="fill"
          focalPointY={1}
          className="h-full w-full"
        />
      </motion.div>
    </div>
  );
}