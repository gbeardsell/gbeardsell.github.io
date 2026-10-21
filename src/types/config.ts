/** Site configuration retained from AstroPaper, limited to supported options. */
interface SiteConfig {
  url: string;
  title: string;
  description: string;
  author: string;
  profile?: string;
  ogImage?: string;
  lang?: string;
  timezone?: string;
  dir?: "ltr" | "rtl" | "auto";
  googleVerification?: string;
}
interface AstroPaperConfig {
  site: SiteConfig;
  posts?: { perIndex?: number };
}
export interface ResolvedAstroPaperConfig {
  site: Required<Omit<SiteConfig, "profile" | "googleVerification">> &
    Pick<SiteConfig, "profile" | "googleVerification">;
  posts: { perIndex: number };
}
export function defineAstroPaperConfig(
  config: AstroPaperConfig
): AstroPaperConfig {
  return config;
}
