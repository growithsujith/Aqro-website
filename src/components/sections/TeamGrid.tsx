"use client";

import { founders, teamGroups } from "@/content/data";
import { SectionHead } from "@/components/blocks";
import { RevealGroup } from "@/components/motion/Reveal";
import { Container } from "@/components/ui";

/**
 * Renders Founders and Team groups on `/about` only when `founders` or
 * `teamGroups` in `src/content/data.ts` are populated. Returns `null` when empty.
 */
export function TeamGrid() {
  const populatedGroups = teamGroups.filter((g) => g.members.length > 0);
  if (founders.length === 0 && populatedGroups.length === 0) return null;

  return (
    <section className="bg-ivory py-20 md:py-28">
      <Container>
        <SectionHead eyebrow="People" title="The team behind the work." />

        {founders.length > 0 && (
          <RevealGroup as="ul" className="mb-16 grid gap-8 md:grid-cols-2">
            {founders.map((f) => (
              <li
                key={f.name}
                data-reveal-item
                className="grid gap-6 rounded-2xl bg-white p-6 sm:grid-cols-12 sm:items-center"
              >
                <div className="aspect-square overflow-hidden rounded-xl bg-graphite/10 sm:col-span-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.photo} alt={f.name} className="size-full object-cover" />
                </div>
                <div className="sm:col-span-7">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-red-ink">
                    {f.role}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{f.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-graphite/75">{f.bio}</p>
                </div>
              </li>
            ))}
          </RevealGroup>
        )}

        {populatedGroups.map((group) => (
          <div key={group.title} className="mt-12 first:mt-0">
            <h3 className="mb-6 text-xs font-medium uppercase tracking-[0.14em] text-graphite/60">
              {group.title}
            </h3>
            <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {group.members.map((m) => (
                <li key={m.name} data-reveal-item className="rounded-2xl bg-white p-4">
                  <div className="aspect-square overflow-hidden rounded-xl bg-graphite/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.photo} alt={m.name} className="size-full object-cover" />
                  </div>
                  <p className="mt-4 font-display text-lg font-semibold">{m.name}</p>
                  <p className="text-sm text-graphite/70">{m.role}</p>
                </li>
              ))}
            </RevealGroup>
          </div>
        ))}
      </Container>
    </section>
  );
}
