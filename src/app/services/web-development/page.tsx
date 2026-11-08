import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { serviceBySlug } from "@/content/site";

const s = serviceBySlug("web-development");

export const metadata: Metadata = {
  title: "Web Development",
  description: `${s.hero.title} ${s.hero.accent} ${s.hero.body}`,
};

export default function Page() {
  return <ServicePage slug="web-development" />;
}
