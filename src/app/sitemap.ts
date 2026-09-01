import type { MetadataRoute } from "next";
import { siteUrl } from "./layout";
import { site } from "@/content/site";
import { caseStudies } from "@/content/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const projectPages = site.projects
    .filter((project) => caseStudies[project.slug])
    .map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectPages,
  ];
}
