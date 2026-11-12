import type { ImageMetadata } from "astro";
import type { Publication } from "@/data/publications";

const images = import.meta.glob<ImageMetadata>(
  "/pictures/publications/*/*.{png,jpg,jpeg,webp,avif,gif,PNG,JPG,JPEG,WEBP,AVIF,GIF}",
  { eager: true, import: "default" }
);
const descriptions = import.meta.glob<string>(
  "/pictures/publications/*/alt.txt",
  { eager: true, query: "?raw", import: "default" }
);

export function getPublicationImage(
  publication: Publication
): Publication["image"] {
  if (!publication.imageFolder) return undefined;
  const directory = `/pictures/publications/${publication.imageFolder}/`;
  const match = Object.entries(images)
    .filter(([path]) => path.startsWith(directory))
    .sort(([a], [b]) => a.localeCompare(b, "en"))[0];
  if (!match) return undefined;

  return {
    src: match[1],
    alt:
      descriptions[`${directory}alt.txt`]?.trim() ||
      `Figure accompanying “${publication.title}”.`,
  };
}
