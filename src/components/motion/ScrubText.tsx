"use client";

import { useRef, type ReactNode } from "react";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";

/**
 * Scroll-scrubbed word illumination for manifesto statements.
 * Words start at `fromOpacity` and light up to 100% as the user scrolls past.
 */
export function ScrubText({
  children,
  as = "p",
  className = "",
  fromOpacity = 0.18,
}: {
  children: ReactNode;
  as?: "p" | "h2" | "div";
  className?: string;
  fromOpacity?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const Comp = as as React.ElementType;

  useGSAP(
    () => {
      ensureGSAP();
      const root = ref.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const originalHTML = root.innerHTML;

      const fullText = (root.textContent ?? "").replace(/\s+/g, " ").trim();
      if (fullText) root.setAttribute("aria-label", fullText);

      const splitNode = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent ?? "";
          if (!text.trim()) return;
          const frag = document.createDocumentFragment();
          text.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else {
              const span = document.createElement("span");
              span.className = "scrub-word inline-block";
              span.setAttribute("aria-hidden", "true");
              span.textContent = part;
              frag.appendChild(span);
            }
          });
          node.parentNode?.replaceChild(frag, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          if (el.classList.contains("scrub-word")) return;
          Array.from(el.childNodes).forEach(splitNode);
        }
      };

      Array.from(root.childNodes).forEach(splitNode);

      const words = root.querySelectorAll(".scrub-word");
      if (!words.length) {
        return () => {
          root.innerHTML = originalHTML;
        };
      }

      gsap.fromTo(
        words,
        { opacity: fromOpacity },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            end: "bottom 48%",
            scrub: 0.8,
          },
        },
      );

      return () => {
        root.innerHTML = originalHTML;
      };
    },
    { scope: ref, dependencies: [fromOpacity] },
  );

  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
