import { Etching } from "./Etching";
import type { IllustrationName } from "@/lib/illustrations";

const DEFAULT: { name: IllustrationName; label: string }[] = [
  { name: "cine-camera", label: "Brand films" },
  { name: "swatches", label: "Identity" },
  { name: "comp-app", label: "Apps" },
  { name: "clapper", label: "Commercials" },
  { name: "laptop", label: "Websites" },
  { name: "drone", label: "Aerial" },
  { name: "pen-nib", label: "Campaigns" },
  { name: "ai-chip", label: "AI production" },
  { name: "storyboard", label: "Storyboards" },
  { name: "cube", label: "Products" },
];

/**
 * A running strip of film. Each frame holds one engraved element; the strip
 * loops seamlessly (content is duplicated, then translated by -50%).
 */
export function FilmStrip({
  tone = "light",
  frames = DEFAULT,
  className = "",
  speed = 60,
}: {
  tone?: "light" | "ink";
  frames?: { name: IllustrationName; label: string }[];
  className?: string;
  speed?: number;
}) {
  const light = tone === "light";
  const edge = light ? "border-white/25" : "border-graphite/25";
  const hole = light ? "bg-white/25" : "bg-graphite/20";
  const strip = [...frames, ...frames];
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      <div className="animate-strip flex w-max" style={{ animationDuration: `${speed}s` }}>
        {strip.map((f, i) => (
          <div key={i} className={`relative shrink-0 border-y ${edge} px-0`}>
            <Sprockets className={hole} />
            <div className={`mx-[5px] flex h-[96px] w-[140px] flex-col items-center justify-center gap-1 border-x ${edge} sm:h-[112px] sm:w-[168px]`}>
              <Etching name={f.name} tone={light ? "white" : "ink"} className="h-[52px] w-auto opacity-85 sm:h-[62px]" sizes="180px" />
              <span className={`font-mono text-[9px] uppercase tracking-[0.2em] ${light ? "text-white/70" : "text-graphite/65"}`}>
                {String((i % frames.length) + 1).padStart(2, "0")} · {f.label}
              </span>
            </div>
            <Sprockets className={hole} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Sprockets({ className }: { className: string }) {
  return (
    <div className="flex h-4 items-center justify-around px-1">
      {Array.from({ length: 7 }).map((_, i) => (
        <span key={i} className={`h-2 w-3 rounded-[2px] ${className}`} />
      ))}
    </div>
  );
}
