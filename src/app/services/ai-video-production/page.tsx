import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { serviceBySlug } from "@/content/site";

const s = serviceBySlug("ai-video-production");

export const metadata: Metadata = {
  title: "AI Video Production",
  description: `${s.hero.title} ${s.hero.accent} ${s.hero.body}`,
};

export default function Page() {
  return <ServicePage slug="ai-video-production" />;
}
