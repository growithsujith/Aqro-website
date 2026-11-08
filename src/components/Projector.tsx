import Image from "next/image";

/**
 * The engraved projector from the AQRO sheet, with both reels spinning.
 * Each reel's spokes are a circular window onto the same artwork, rotated
 * about the hub — so the engraving itself turns, not a redrawn substitute.
 */
const W = 310;
const H = 428;
const REELS = [
  { x: 221, y: 89, r: 53, cls: "animate-reel" },
  { x: 232.5, y: 303.5, r: 44, cls: "animate-reel" },
];

export function Projector({
  className = "",
  flip = false,
  tone = "ink",
  surface = "#F5F1E8",
}: {
  className?: string;
  flip?: boolean;
  tone?: "ink" | "white";
  /** colour behind the projector, used to mask the static reels */
  surface?: string;
}) {
  const src = tone === "white" ? "/illustrations/projector-white.webp" : "/illustrations/projector.webp";
  return (
    <div
      className={`relative ${className}`}
      style={{ aspectRatio: `${W} / ${H}`, transform: flip ? "scaleX(-1)" : undefined }}
    >
      <Image
        src={src}
        alt="Engraved vintage film projector"
        fill
        priority
        sizes="(max-width: 1024px) 70vw, 36vw"
        className="select-none object-contain"
        draggable={false}
      />
      {REELS.map((reel, i) => (
        <div
          key={i}
          aria-hidden
          className={`absolute ${reel.cls}`}
          style={{
            left: `${((reel.x - reel.r) / W) * 100}%`,
            top: `${((reel.y - reel.r) / H) * 100}%`,
            width: `${((reel.r * 2) / W) * 100}%`,
            aspectRatio: "1",
            borderRadius: "50%",
            overflow: "hidden",
            WebkitMaskImage: "radial-gradient(circle, #000 80%, transparent 99%)",
            maskImage: "radial-gradient(circle, #000 80%, transparent 99%)",
            animationDuration: i === 0 ? "8s" : "6.5s",
          }}
        >
          {/* paint over the static reel underneath with the hero's surface */}
          <div className="absolute inset-0 rounded-full" style={{ background: surface }} />
          <Image
            src={src}
            alt=""
            width={W}
            height={H}
            priority
            className="absolute max-w-none select-none"
            draggable={false}
            style={{
              width: `${(W / (reel.r * 2)) * 100}%`,
              left: `${(-(reel.x - reel.r) / (reel.r * 2)) * 100}%`,
              top: `${(-(reel.y - reel.r) / (reel.r * 2)) * 100}%`,
              height: "auto",
            }}
          />
        </div>
      ))}
    </div>
  );
}
