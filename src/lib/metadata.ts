import { property } from "@/data/property";

const brand = property.name;

export function pageHead(title: string, description: string) {
  const full = title.includes(brand) ? title : `${title} — ${brand}`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
