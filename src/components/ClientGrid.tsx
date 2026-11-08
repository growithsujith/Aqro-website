import Image from "next/image";
import { clients } from "@/content/data";

/**
 * An editorial logo archive: equal cells separated by hairlines (the 1px gap
 * shows the rule colour behind), logos centred and optically balanced.
 * Logos render monochrome and reveal their colour on hover.
 */
export function ClientGrid() {
  const empty = clients.length === 0;
  const cells = empty ? Array.from({ length: 14 }, () => null) : clients;
  return (
    <div className="relative">
      <ul className="grid grid-cols-2 gap-px border-y border-graphite/15 bg-graphite/15 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7">
        {cells.map((c, i) => (
          <li
            key={c?.name ?? i}
            className={`group relative flex h-32 items-center justify-center bg-ivory px-8 sm:h-36 ${
              /* hide the 14th empty cell where it would orphan a row */ empty && i > 11 ? "hidden xl:flex" : ""
            }`}
          >
            <span className="absolute left-3 top-3 font-mono text-[9px] tracking-[0.2em] text-graphite/50">
              No.{String(i + 1).padStart(2, "0")}
            </span>
            {c ? (
              <Image
                src={c.logo}
                alt={c.name}
                width={160}
                height={64}
                className="h-auto max-h-12 w-auto max-w-[72%] object-contain opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                style={{ transform: `scale(${c.scale ?? 1})` }}
              />
            ) : (
              <span className="h-px w-8 bg-graphite/15" aria-hidden />
            )}
          </li>
        ))}
      </ul>

      {empty && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
          <div className="grain pointer-events-auto relative max-w-md border border-graphite/20 bg-paper px-8 py-7 text-center shadow-[0_24px_50px_-30px_#29292955]">
            <Image src="/illustrations/corner.webp" alt="" width={68} height={59} className="absolute left-2 top-2 h-7 w-auto opacity-60" aria-hidden />
            <Image src="/illustrations/corner.webp" alt="" width={68} height={59} className="absolute bottom-2 right-2 h-7 w-auto rotate-180 opacity-60" aria-hidden />
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-red-ink">The archive</p>
            <p className="mt-3 font-serif text-2xl leading-snug">Each drawer is kept for a brand we&apos;ve worked with.</p>
            <p className="mt-2 text-sm leading-relaxed text-graphite/70">
              Client marks are added here as each partnership is confirmed for publication.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
