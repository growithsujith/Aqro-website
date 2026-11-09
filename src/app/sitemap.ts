import type { MetadataRoute } from "next";
import { services, site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/work", "/about", "/contact", ...services.map((s) => s.href)];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
