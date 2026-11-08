import type { ServiceSlug } from "@/content/site";

/**
 * Service glyphs — simple line drawings in the logo's geometry (rings, bars,
 * square corners) with the red corner mark as the accent. Stroke inherits
 * currentColor, so a glyph works on blue, graphite or light surfaces.
 * Inner parts drift slightly when a parent `.group` is hovered.
 */
const move = "transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]";

export function Glyph({ slug, className = "w-full" }: { slug: ServiceSlug; className?: string }) {
  return (
    <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
      {slug === "creatives" && (
        <>
          <circle cx="78" cy="78" r="42" className={`${move} group-hover:-translate-x-2`} />
          <rect x="92" y="34" width="74" height="74" rx="4" className={`${move} group-hover:translate-x-2 group-hover:-translate-y-1`} />
          <path d="M36 126h128" strokeLinecap="round" opacity=".35" />
          <path d="M150 18h22v22h-11v-11h-11z" fill="#ED1C24" stroke="none" className={`${move} group-hover:translate-x-1 group-hover:-translate-y-1`} />
        </>
      )}
      {slug === "ai-video-production" && (
        <>
          <rect x="22" y="22" width="156" height="98" rx="8" />
          <path d="M88 52v38l32-19z" fill="currentColor" className={`${move} origin-[100px_71px] group-hover:scale-110`} />
          <path d="M22 108h156" opacity=".35" />
          <circle cx="62" cy="108" r="5" fill="currentColor" className={`${move} group-hover:translate-x-16`} />
          <path d="M156 6l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="#ED1C24" stroke="none" className={`${move} origin-[156px_18px] group-hover:rotate-45`} />
        </>
      )}
      {slug === "app-development" && (
        <>
          <rect x="66" y="10" width="68" height="130" rx="14" />
          <path d="M90 22h20" strokeLinecap="round" />
          <rect x="78" y="38" width="44" height="26" rx="4" className={`${move} group-hover:-translate-y-1`} />
          <path d="M78 76h44M78 88h30" strokeLinecap="round" opacity=".5" />
          <circle cx="100" cy="118" r="7" />
          <rect x="146" y="44" width="34" height="34" rx="4" opacity=".5" className={`${move} group-hover:translate-x-2`} />
          <rect x="20" y="70" width="34" height="34" rx="17" opacity=".5" className={`${move} group-hover:-translate-x-2`} />
          <path d="M120 30h22v22h-11v-11h-11z" fill="#ED1C24" stroke="none" className={`${move} group-hover:translate-x-1 group-hover:-translate-y-1`} />
        </>
      )}
      {slug === "web-development" && (
        <>
          <rect x="16" y="18" width="168" height="114" rx="8" />
          <path d="M16 40h168" />
          <circle cx="30" cy="29" r="3" fill="#ED1C24" stroke="none" />
          <circle cx="42" cy="29" r="3" fill="currentColor" stroke="none" opacity=".4" />
          <circle cx="54" cy="29" r="3" fill="currentColor" stroke="none" opacity=".4" />
          <rect x="32" y="56" width="72" height="44" rx="4" className={`${move} group-hover:-translate-y-1`} />
          <path d="M118 60h48M118 74h38M118 88h44" strokeLinecap="round" opacity=".5" />
          <path d="M32 114h134" strokeLinecap="round" opacity=".35" />
          <path d="M140 92l18 40 6-16 16-6z" fill="currentColor" className={`${move} group-hover:-translate-x-3 group-hover:-translate-y-3`} />
        </>
      )}
    </svg>
  );
}
