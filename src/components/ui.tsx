import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "./motion/Magnetic";

/** The official AQRO wordmark (traced from the supplied logo). */
export function Logo({ reverse = false, className = "h-8" }: { reverse?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={reverse ? "/brand/aqro-logo-reverse.svg" : "/brand/aqro-logo.svg"}
      alt="aqro"
      width={888}
      height={302}
      className={`w-auto ${className}`}
    />
  );
}

/**
 * The red corner mark from the "a" in the logo — AQRO's signature shape.
 * Used as a section marker, bullet and accent throughout the site.
 */
export function Mark({ className = "size-3", color = "#ED1C24" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 94" className={className} aria-hidden>
      <path d="M0 0H100V94H51V52H0Z" fill={color} />
    </svg>
  );
}

/** Small section label led by the corner mark. */
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.16em] ${
        light ? "text-white/80" : "text-graphite/70"
      }`}
    >
      <Mark className="size-3" />
      {children}
    </p>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "red" | "blue" | "white" | "outline" | "outline-light";
  magnetic?: boolean;
  className?: string;
};

/** Pill button with a fill sweep, vertical text roll, arrow shift and optional magnetic pull. */
export function Button({ href, children, variant = "red", magnetic = true, className = "" }: BtnProps) {
  const base: Record<string, string> = {
    red: "bg-red text-white border-red",
    blue: "bg-blue text-white border-blue",
    white: "bg-white text-blue border-white",
    outline: "border-graphite/25 text-graphite",
    "outline-light": "border-white/40 text-white",
  };
  const sweep: Record<string, string> = {
    red: "bg-graphite",
    blue: "bg-graphite",
    white: "bg-red",
    outline: "bg-graphite",
    "outline-light": "bg-white",
  };
  const hoverText: Record<string, string> = {
    red: "group-hover:text-white",
    blue: "group-hover:text-white",
    white: "group-hover:text-white",
    outline: "group-hover:text-white",
    "outline-light": "group-hover:text-blue",
  };

  const inner = (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full border px-6 py-3.5 text-[15px] font-medium transition-colors ${base[variant]} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 ${sweep[variant]}`}
      />
      <span className={`relative inline-flex overflow-hidden transition-colors duration-500 ${hoverText[variant]}`}>
        <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className={`relative size-4 transition-all duration-500 group-hover:translate-x-1 ${hoverText[variant]}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 10h11M11 5l5 5-5 5" />
      </svg>
    </Link>
  );

  return magnetic ? <Magnetic>{inner}</Magnetic> : inner;
}

export function TextLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 text-[15px] font-medium ${light ? "text-white" : "text-graphite"}`}>
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full bg-current opacity-25" />
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100" />
      </span>
      <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

/** Shared heading scale so every page reads the same. */
export const H1 = "font-display text-[clamp(2.6rem,6.4vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-balance";
export const H2 = "font-display text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance";
