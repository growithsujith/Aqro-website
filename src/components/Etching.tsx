import Image from "next/image";
import { ILLUSTRATIONS, type IllustrationName } from "@/lib/illustrations";

type Props = {
  name: IllustrationName;
  /** ink = graphite on paper (default); white = etched white on blue/graphite */
  tone?: "ink" | "white" | "ivory";
  className?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
};

/** One engraved element extracted from the AQRO illustration sheets. */
export function Etching({
  name,
  tone = "ink",
  className = "",
  alt = "",
  priority,
  sizes = "(max-width: 768px) 60vw, 30vw",
}: Props) {
  const { w, h } = ILLUSTRATIONS[name];
  const toneClass = tone === "white" ? "etch-white" : tone === "ivory" ? "etch-ivory" : "";
  return (
    <Image
      src={`/illustrations/${name}.webp`}
      width={w}
      height={h}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      priority={priority}
      sizes={sizes}
      draggable={false}
      className={`select-none ${toneClass} ${className}`}
    />
  );
}
