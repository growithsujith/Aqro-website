import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/** The AQRO wordmark. Swap /public/brand/aqro-logo*.png for the official files. */
export function Logo({ reverse = false, className = "h-8" }: { reverse?: boolean; className?: string }) {
  return (
    <Image
      src={reverse ? "/brand/aqro-logo-reverse.png" : "/brand/aqro-logo.png"}
      alt="AQRO"
      width={684}
      height={272}
      priority
      className={`w-auto ${className}`}
    />
  );
}

/**
 * Slate label — AQRO's section marker, borrowed from the film clapperboard:
 * a scene number and a title in small mono caps, with a red tally dot.
 */
export function Slate({
  scene,
  children,
  tone = "ink",
  className = "",
}: {
  scene: string;
  children: ReactNode;
  tone?: "ink" | "light";
  className?: string;
}) {
  const muted = tone === "light" ? "text-white/75" : "text-graphite/75";
  const rule = tone === "light" ? "bg-white/30" : "bg-graphite/25";
  return (
    <div className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] ${className}`}>
      <span className="inline-block size-1.5 rounded-full bg-red" aria-hidden />
      <span className={`whitespace-nowrap ${muted}`}>Sc. {scene}</span>
      <span className={`h-px w-8 ${rule}`} aria-hidden />
      <span className={tone === "light" ? "text-white" : "text-graphite"}>{children}</span>
    </div>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "red" | "blue" | "outline" | "outline-light" | "white";
  className?: string;
};

/** Pill button. The arrow travels and a fill sweeps in on hover. */
export function Button({ href, children, variant = "red", className = "" }: BtnProps) {
  const styles: Record<string, string> = {
    red: "bg-red text-white border-red",
    blue: "bg-blue text-white border-blue",
    white: "bg-white text-blue border-white",
    outline: "border-graphite/30 text-graphite",
    "outline-light": "border-white/40 text-white",
  };
  const sweep: Record<string, string> = {
    red: "bg-graphite",
    blue: "bg-graphite",
    white: "bg-ivory",
    outline: "bg-graphite",
    "outline-light": "bg-white",
  };
  const hoverText: Record<string, string> = {
    red: "group-hover:text-white",
    blue: "group-hover:text-white",
    white: "group-hover:text-blue",
    outline: "group-hover:text-ivory",
    "outline-light": "group-hover:text-blue",
  };
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full border px-6 py-3.5 text-[15px] font-medium tracking-tight transition-colors duration-500 ${styles[variant]} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 ${sweep[variant]}`}
      />
      <span className={`relative transition-colors duration-500 ${hoverText[variant]}`}>{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className={`relative size-4 transition-all duration-500 group-hover:translate-x-1 ${hoverText[variant]}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M4 10h11M11 5l5 5-5 5" />
      </svg>
    </Link>
  );
}

/** Underlined text link with an arrow. */
export function TextLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-medium ${light ? "text-white" : "text-graphite"}`}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-current opacity-30" />
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100" />
      </span>
      <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Ornamental hairline divider using the engraved flower mark. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-graphite/20" />
      <Image src="/illustrations/flower.webp" alt="" width={60} height={55} className="h-6 w-auto opacity-70" />
      <span className="h-px flex-1 bg-graphite/20" />
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}
