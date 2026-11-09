"use client";

import { useRef } from "react";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";
import GlareHover from "@/components/reactbits/GlareHover/GlareHover";
import { Reel } from "@/components/Reel";

/**
 * Showreel stage that starts slightly inset and expands to full container width
 * as it scrolls into the center of the viewport. Tagged with `data-cursor="Play"`.
 */
export function ReelStage({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGSAP();
      const wrap = wrapRef.current;
      if (!wrap) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const stage = wrap.querySelector("[data-reel-stage]");
      if (!stage) return;

      gsap.fromTo(
        stage,
        { scale: 0.92 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top 85%",
            end: "top 25%",
            scrub: 0.9,
          },
        },
      );
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} data-cursor="Play" className={className}>
      <div data-reel-stage className="origin-center overflow-hidden rounded-2xl will-change-transform">
        <GlareHover
          width="100%"
          height="100%"
          borderRadius="1rem"
          borderColor="rgba(255, 255, 255, 0.14)"
          variant="sheen"
          glareColor="#f5f1e8"
          glareOpacity={0.26}
          blendMode="screen"
          glareAngle={-35}
          glareSize={38}
          softness={0.7}
          transitionDuration={700}
          style={{ display: "block", borderWidth: 0 }}
        >
          <Reel />
        </GlareHover>
      </div>
    </div>
  );
}
