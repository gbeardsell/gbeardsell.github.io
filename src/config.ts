import userConfig from "@/astro-paper.config";
import type { ResolvedAstroPaperConfig } from "./types/config";
import { PUBLIC_GOOGLE_SITE_VERIFICATION } from "astro:env/client";

const config: ResolvedAstroPaperConfig = {
  site: {
    ...userConfig.site,
    ogImage: userConfig.site.ogImage ?? "social-card.png",
    lang: userConfig.site.lang ?? "en",
    timezone: userConfig.site.timezone ?? "UTC",
    dir: userConfig.site.dir ?? "ltr",
    googleVerification:
      userConfig.site.googleVerification || PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  posts: { perIndex: userConfig.posts?.perIndex ?? 3 },
};
export default config;
