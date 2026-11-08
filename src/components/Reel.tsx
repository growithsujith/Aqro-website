import { site } from "@/content/site";
import { embedUrl } from "@/lib/media";
import { Mark } from "./ui";

/**
 * 16:9 showreel slot. Plays site.showreel (muted loop for an .mp4, embed for
 * YouTube/Vimeo). Until a reel is added it shows a branded placeholder panel.
 */
export function Reel({ className = "" }: { className?: string }) {
  const { src, poster } = site.showreel;
  const embed = src ? embedUrl(src) : null;
  return (
    <div className={`relative aspect-video overflow-hidden rounded-2xl bg-blue ${className}`}>
      {src ? (
        embed ? (
          <iframe src={embed.replace("autoplay=1", "autoplay=1&mute=1")} title="AQRO showreel" allow="autoplay; fullscreen" allowFullScreen className="size-full" />
        ) : (
          <video src={src} poster={poster || undefined} autoPlay muted loop playsInline className="size-full object-cover" />
        )
      ) : (
        <div className="relative grid size-full place-items-center text-white" aria-label="Showreel coming soon">
          <svg viewBox="0 0 800 450" className="absolute inset-0 size-full" aria-hidden>
            <circle cx="560" cy="225" r="150" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="56" />
            <rect x="700" y="80" width="56" height="320" fill="rgba(255,255,255,.12)" />
            {Array.from({ length: 5 }).flatMap((_, r) =>
              Array.from({ length: 9 }).map((__, c) => <circle key={`${r}-${c}`} cx={60 + c * 85} cy={50 + r * 88} r="2" fill="rgba(255,255,255,.25)" />),
            )}
          </svg>
          <div className="relative flex flex-col items-center gap-4">
            <span className="grid size-20 place-items-center rounded-full bg-white text-blue">
              <svg viewBox="0 0 20 20" className="ml-1 size-7" fill="currentColor" aria-hidden>
                <path d="M5 3l12 7-12 7z" />
              </svg>
            </span>
            <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">Showreel coming soon</span>
          </div>
          <Mark className="absolute right-6 top-6 size-6" />
        </div>
      )}
    </div>
  );
}
