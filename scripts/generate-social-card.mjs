import sharp from "sharp";
import { fileURLToPath } from "node:url";

await sharp(
  fileURLToPath(new URL("../src/assets/social-card.svg", import.meta.url))
)
  .png()
  .toFile(fileURLToPath(new URL("../public/social-card.png", import.meta.url)));
