import type { MetadataRoute } from "next";

import { clients, properties } from "./lib/homewatch";
import { getPublicSiteUrl } from "./lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getPublicSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/admin`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/clients`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/properties`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/subcontractors`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const clientRoutes: MetadataRoute.Sitemap = clients.map((client) => ({
    url: `${siteUrl}/clients/${client.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const propertyRoutes: MetadataRoute.Sitemap = properties.flatMap((property) => [
    {
      url: `${siteUrl}/properties/${property.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/portal/${property.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ]);

  return [...staticRoutes, ...clientRoutes, ...propertyRoutes];
}
