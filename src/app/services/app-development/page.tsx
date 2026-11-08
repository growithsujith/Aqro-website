import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { serviceBySlug } from "@/content/site";

const s = serviceBySlug("app-development");

export const metadata: Metadata = {
  title: "App Development",
  description: `${s.hero.title} ${s.hero.accent} ${s.hero.body}`,
};

export default function Page() {
  return <ServicePage slug="app-development" />;
}
