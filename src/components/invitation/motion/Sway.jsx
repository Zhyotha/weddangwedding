import { cn } from "@/lib/utils";

/**
 * A continuous organically swaying wrapper. Each instance gets its own
 * amplitude, reach, duration and delay — no two botanicals ever move alike.
 * An optional second layer adds a slow vertical float, so leaves can breathe
 * and drift at once.
 */
export default function Sway({
  children,
  className = "",
  amplitude = 1.2,
  shift = 3,
  lift = 3,
  duration = 14,
  delay = 0,
  origin = "50% 100%",
  reverse = false,
  float = 4,
  floatDuration = 18,
  style,
}) {
  return (
    <div
      className={cn("sway", reverse && "sway-reverse", className)}
      style={{
        "--sway-amp": `${amplitude}deg`,
        "--sway-x": `${shift}px`,
        "--sway-y": `${lift}px`,
        "--sway-dur": `${duration}s`,
        "--sway-delay": `${delay}s`,
        "--sway-origin": origin,
        ...style,
      }}
    >
      {float ? (
        <div
          className="float-y h-full w-full"
          style={{
            "--float-dur": `${floatDuration}s`,
            "--float-delay": `${delay / 2}s`,
            "--float-reach": `${float}px`,
          }}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}