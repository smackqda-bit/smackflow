import { MetadataRoute } from "next";
import { articlesDATA } from "@/data/articles_data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://smackflow.space",
      lastModified: new Date(),
    },
    ...articlesDATA.map((article) => ({
      url: `https://smackflow.space/blog/${article.slug}`,
      lastModified: article.date,
    })),
  ];
}