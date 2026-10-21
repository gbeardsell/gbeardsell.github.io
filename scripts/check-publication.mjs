import assert from "node:assert/strict";
import { readdir, readFile, access, stat } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import { postFilter } from "../src/utils/postFilter.ts";

const now = Date.now();
const article = (draft, pubDatetime) => ({
  data: { draft, pubDatetime: new Date(pubDatetime) },
});
assert.equal(
  postFilter(article(false, now - 1000)),
  true,
  "Published articles must be visible."
);
assert.equal(
  postFilter(article(true, now - 1000)),
  false,
  "Drafts must be excluded."
);
assert.equal(
  postFilter(article(undefined, now - 1000)),
  false,
  "Missing draft status must not publish an article."
);
assert.equal(
  postFilter(article(false, now + 60_000)),
  false,
  "Future articles must be excluded, with no early-publish margin."
);

const output = new URL("../dist/", import.meta.url);
const outputPath = resolve(fileURLToPath(output));
await access(new URL("writing/index.html", output));
const homepage = await readFile(new URL("index.html", output), "utf8");
const canonical = homepage.match(
  /<link\b[^>]*\brel="canonical"[^>]*\bhref="([^"]+)"/
);
assert.ok(canonical, "The homepage needs an absolute canonical URL.");
const site = new URL(canonical[1]);
let localLinksChecked = 0;
const indexedUrls = new Set();

async function* files(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else yield path;
  }
}

for await (const path of files(outputPath)) {
  const raw = await readFile(path);
  // Pagefind stores article text in gzip-compressed fragment files.
  const content = raw[0] === 0x1f && raw[1] === 0x8b ? gunzipSync(raw) : raw;
  assert.equal(
    content.includes(Buffer.from("DRAFT_AUTHORING_EXAMPLE_8F2C")),
    false,
    `Draft body leaked into ${path}`
  );
  assert.equal(
    content.includes(Buffer.from("/writing/authoring-example/")),
    false,
    `Draft URL leaked into ${path}`
  );
  assert.equal(
    content.includes(Buffer.from("Authoring example")),
    false,
    `Draft title leaked into ${path}`
  );
  if (path.endsWith(".pf_fragment")) {
    const text = content.toString("utf8");
    const fragment = JSON.parse(text.slice(text.indexOf("{")));
    const url = new URL(fragment.url, site);
    assert.equal(
      indexedUrls.has(url.href),
      false,
      `Stale duplicate search fragment: ${url.href}`
    );
    indexedUrls.add(url.href);
    const route = resolve(
      outputPath,
      decodeURIComponent(url.pathname).replace(/^\/+/, "")
    );
    assert.ok(
      route === outputPath || route.startsWith(outputPath + sep),
      `Search URL escapes output: ${url.href}`
    );
    const destination = url.pathname.endsWith("/")
      ? join(route, "index.html")
      : route;
    let html;
    try {
      html = await readFile(destination, "utf8");
    } catch {
      assert.fail(`Stale search fragment points to missing page: ${url.href}`);
    }
    assert.ok(
      html.includes("data-pagefind-body"),
      `Search includes a page that is not public: ${url.href}`
    );
  }
  if (!path.endsWith(".html")) continue;
  const pagePath = relative(outputPath, path)
    .split(sep)
    .join("/")
    .replace(/index\.html$/, "");
  const pageUrl = new URL(pagePath, site);
  for (const match of content
    .toString("utf8")
    .matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replace(/&amp;/g, "&");
    if (value.startsWith("#")) continue;
    const target = new URL(value, pageUrl);
    if (!/^https?:$/.test(target.protocol) || target.origin !== site.origin)
      continue;
    const pathname = decodeURIComponent(target.pathname).replace(/^\/+/, "");
    const destination = resolve(outputPath, pathname);
    assert.ok(
      destination === outputPath || destination.startsWith(outputPath + sep),
      `Local link escapes output: ${value}`
    );
    const candidates = target.pathname.endsWith("/")
      ? [join(destination, "index.html")]
      : [destination, join(destination, "index.html"), `${destination}.html`];
    let exists = false;
    for (const candidate of candidates) {
      try {
        if ((await stat(candidate)).isFile()) {
          exists = true;
          break;
        }
      } catch {
        /* Try the next static route shape. */
      }
    }
    assert.ok(
      exists,
      `Broken local link in ${pagePath || "index.html"}: ${value}`
    );
    localLinksChecked += 1;
  }
}
for (const relative of [
  "writing/authoring-example/index.html",
  "writing/authoring-example/index.png",
  "posts/index.html",
  "tags/index.html",
  "archives/index.html",
]) {
  let exists = true;
  try {
    await access(new URL(relative, output));
  } catch {
    exists = false;
  }
  assert.equal(exists, false, `Unexpected public route: ${relative}`);
}
process.stdout.write(
  `Publication checks passed: drafts and future articles are excluded; the authoring example is absent from production output; ${localLinksChecked} local links resolve; ${indexedUrls.size} search fragments map to public pages.\n`
);
