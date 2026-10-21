import { getRelativeLocaleUrl } from "astro:i18n";
import config from "@/config";

/** Collection IDs retain nested folders and omit Markdown extensions. */
export function getPostSlug(id: string, _filePath?: string): string {
  return id.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
}

export function getPostUrl(
  id: string,
  filePath?: string,
  locale: string | undefined = config.site.lang
): string {
  const path = getRelativeLocaleUrl(
    locale,
    `writing/${getPostSlug(id, filePath)}`
  );
  return `${path.replace(/\/+$/, "")}/`;
}
