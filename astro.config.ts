import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import rehypeFigureCaptions from "./src/utils/rehypeFigureCaptions";
import config from "./astro-paper.config";

export default defineConfig({
  site: config.site.url,
  output: "static",
  trailingSlash: "always",
  integrations: [
    mdx(),
    sitemap({ filter: page => !page.endsWith("/search/") }),
  ],
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, rehypeFigureCaptions],
    }),
    shikiConfig: {
      themes: { light: "github-light-high-contrast", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: true }),
        transformerNotationHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  image: { layout: "constrained", responsiveStyles: true },
  vite: { plugins: [tailwindcss()] },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
});
