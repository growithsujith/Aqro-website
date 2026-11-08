import type { MetadataRoute } from "next";
import { services, site } from "@/content/site";
import { projects } from "@/content/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", "/work", "/contact", ...services.map((s) => s.href), ...projects.map((p) => `/work/${p.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
