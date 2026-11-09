"use client";

import { useRef, type ReactNode } from "react";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";

/**
 * Masked word/line reveal for headings. Preserves React children (like colored
 * `<span className="text-blue">` accents) by wrapping text nodes into word masks
 * while keeping full accessibility on the heading element.
 */
export function SplitReveal({
  children,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.045,
  fade = true,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  /** Set false for above-the-fold LCP headings so opacity starts at 1 */
  fade?: boolean;
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

      const wrapTextNodes = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent ?? "";
          if (!text.trim()) return;
          const frag = document.createDocumentFragment();
          const parts = text.split(/(\s+)/);
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else {
              const mask = document.createElement("span");
              mask.className = "motion-word-mask";
              mask.setAttribute("aria-hidden", "true");
              const word = document.createElement("span");
              word.className = "motion-word";
              word.textContent = part;
              mask.appendChild(word);
              frag.appendChild(mask);
            }
          });
          node.parentNode?.replaceChild(frag, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          if (el.classList.contains("motion-word-mask")) return;
          Array.from(el.childNodes).forEach(wrapTextNodes);
        }
      };

      Array.from(root.childNodes).forEach(wrapTextNodes);

      const words = root.querySelectorAll(".motion-word");
      if (!words.length) {
        return () => {
          root.innerHTML = originalHTML;
        };
      }

      gsap.fromTo(
        words,
        fade ? { yPercent: 105, autoAlpha: 0 } : { yPercent: 105 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.9,
          delay,
          stagger,
          ease: "power4.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: root,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      return () => {
        root.innerHTML = originalHTML;
      };
    },
    { scope: ref, dependencies: [delay, stagger, fade] },
  );

  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
