import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://gbeardsell.com",
    title: "Guillaume Beardsell",
    description:
      "Computational physicist. Numerical methods, reacting flows, and scientific computing.",
    author: "Guillaume Beardsell",
    profile: "https://github.com/gbeardsell",
    ogImage: "social-card.png",
    lang: "en",
    timezone: "America/Los_Angeles",
    dir: "ltr",
  },
  posts: { perIndex: 3 },
});
