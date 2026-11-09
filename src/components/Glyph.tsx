import type { ServiceSlug } from "@/content/site";

/**
 * Service icons — glossy crystal artwork in /public/icons.
 * `tone="blue"` suits light surfaces (white, ivory, paper);
 * `tone="silver"` (silver + red) suits blue and graphite surfaces.
 * Lifts slightly when a parent `.group` is hovered.
 */
export function Glyph({ slug, className = "w-full", tone = "blue" }: { slug: ServiceSlug; className?: string; tone?: "blue" | "silver" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/icons/${slug}-${tone}.webp`}
      alt=""
      aria-hidden
      draggable={false}
      className={`${className} select-none object-contain transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1 group-hover:scale-105`}
    />
  );
}
