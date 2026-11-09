"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

let registered = false;

export function ensureGSAP() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);
  CustomEase.create("aqro", "0.22, 1, 0.36, 1");
  gsap.defaults({ ease: "aqro", duration: 0.85 });
  registered = true;
}

if (typeof window !== "undefined") {
  ensureGSAP();
}

export { gsap, ScrollTrigger, useGSAP };
