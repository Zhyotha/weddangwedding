import { Image } from "@/components/ui/image";
import { WEDDING } from "@/lib/wedding";

export default function CoverPanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-primary lg:sticky lg:top-0 lg:block lg:h-screen">
      <Image
        src={WEDDING.images.cover}
        alt="Romli dan Andini"
        fittingType="fill"
        focalPointY={0.35}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1e2b]/92 via-[#0f1e2b]/25 to-[#0f1e2b]/40" />

      <div className="absolute inset-x-0 bottom-0 px-12 pb-14">
        <p className="text-[0.55rem] uppercase tracking-[0.45em] text-[#d9be85]">
          The Wedding 000f
        </p>
        <div className="mt-4 flex w-full max-w-full flex-col items-center px-4 text-center font-display font-light text-white">
          <span className="w-full text-[clamp(1.5rem,4.5vw,2.5rem)] leading-tight">
            {WEDDING.groom.initial}
          </span>

          <span className="my-2 text-2xl leading-none text-[#d9be85]">
            &
          </span>

          <span className="w-full text-[clamp(1.5rem,4.5vw,2.5rem)] leading-tight">
            {WEDDING.bride.initial}
          </span>
        </div>
        <div className="mt-6 h-px w-16 bg-white/30" />
        <p className="mt-5 text-[0.68rem] uppercase tracking-[0.32em] text-white/80">
          {WEDDING.dateLabel}
        </p>
        <p className="mt-2 text-[0.58rem] uppercase tracking-[0.38em] text-white/50">
          {WEDDING.region}
        </p>
      </div>

      <p className="absolute bottom-14 right-10 rotate-180 text-[0.52rem] uppercase tracking-[0.5em] text-white/40 [writing-mode:vertical-rl]">
        Guling ke bawah
      </p>
    </aside>
  );
}