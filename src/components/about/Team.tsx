import Image from "next/image";
import { team, type TeamMember } from "@/content/data";
import { Etching } from "../Etching";
import { Reveal } from "../motion";

/** Department chairs shown until the real team profiles are added. */
const CHAIRS = [
  { dept: "Creative Direction", note: "Brand, campaigns & design" },
  { dept: "AI Production", note: "Films, commercials & VFX" },
  { dept: "Engineering", note: "Apps, web & platforms" },
];

export function Team() {
  if (team.length === 0) {
    return (
      <div>
        <ul className="grid gap-5 sm:grid-cols-3">
          {CHAIRS.map((c, i) => (
            <Reveal as="li" key={c.dept} delay={i * 0.12}>
              <figure className="grain group relative flex aspect-[3/4] flex-col justify-between border border-graphite/15 bg-paper p-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/65">
                  Chair {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 items-center justify-center">
                  <Etching
                    name="director-chair"
                    className="h-[55%] w-auto transition-transform duration-700 group-hover:-rotate-2 group-hover:scale-105"
                    sizes="240px"
                  />
                </div>
                <figcaption className="border-t border-graphite/15 pt-4">
                  <p className="font-display text-2xl font-semibold tracking-tight">{c.dept}</p>
                  <p className="mt-1 text-sm text-graphite/70">{c.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
        <p className="mt-8 max-w-xl font-serif text-xl italic text-graphite/70">
          Every chair has a name. The people behind AQRO&apos;s work will be introduced here shortly.
        </p>
      </div>
    );
  }

  const groups = team.reduce<Record<string, TeamMember[]>>((acc, m) => {
    (acc[m.group] ||= []).push(m);
    return acc;
  }, {});

  return (
    <div className="space-y-20">
      {Object.entries(groups).map(([group, members]) => (
        <div key={group}>
          <h3 className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-graphite/65">
            <span className="size-1.5 rounded-full bg-red" aria-hidden /> {group}
          </h3>
          <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m, i) => (
              <Reveal as="li" key={m.name} delay={(i % 4) * 0.08}>
                <figure className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-graphite/10">
                    <Image
                      src={m.photo}
                      alt={`Portrait of ${m.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-graphite/15 pt-3">
                    <span className="font-display text-xl font-semibold tracking-tight">{m.name}</span>
                    <span className="text-right text-sm text-graphite/70">{m.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
