import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://gbeardsell.github.io",
    title: "Guillaume Beardsell",
    description: "Computational scientist and mechanical engineer",
    author: "Guillaume Beardsell",
    profile: "https://github.com/gbeardsell",
    ogImage: "social-card.png",
    lang: "en",
    timezone: "America/Los_Angeles",
    dir: "ltr",
  },
  posts: { perIndex: 3 },
});
