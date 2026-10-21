import { rm } from "node:fs/promises";
import { resolve, relative, join, sep } from "node:path";
import { fileURLToPath } from "node:url";

// Earlier builds copied the search index into public/. Never let that generated
// content enter a new build: Pagefind retains files from previous indexes.
const workspace = resolve(fileURLToPath(new URL("../", import.meta.url)));
const generatedSearch = resolve(workspace, "public", "pagefind");
if (
  !generatedSearch.startsWith(workspace + sep) ||
  relative(workspace, generatedSearch) !== join("public", "pagefind")
) {
  throw new Error("Refusing to remove search output outside public/pagefind.");
}
await rm(generatedSearch, { recursive: true, force: true });
