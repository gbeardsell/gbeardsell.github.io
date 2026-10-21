# Guillaume Beardsell's website

A static personal website and technical writing archive, built with AstroPaper. The initial address is `https://gbeardsell.github.io`; `gbeardsell.com` is the later custom domain. Fogcast is presented as work in progress. Its code and live forecast belong in separate projects.

## Local setup

Use **Node.js 24** and **pnpm 11.3.0**, pinned in `package.json`. The supported Node minimum is 22.12.0. Run these commands from the repository root:

```sh
node --version
corepack pnpm --version
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

Open the address printed by Astro, normally `http://localhost:4321`. Stop the server with `Ctrl+C`.

Commands use `corepack pnpm` so they also work on Windows when a standalone `pnpm` command has not been enabled. Node 24 includes Corepack. If it is missing from your installation, use the following prefix in place of `corepack pnpm`; it does not require a global installation:

```sh
npm exec --yes --package=corepack@latest -- corepack pnpm install --frozen-lockfile
```

See [Corepack's installation and usage documentation](https://github.com/nodejs/corepack#readme). Keep `pnpm-lock.yaml` in version control. Use pnpm when adding or updating dependencies.

## Checks and production preview

```sh
corepack pnpm check
corepack pnpm lint
corepack pnpm format:check
corepack pnpm build
corepack pnpm check:publication
corepack pnpm preview --host 127.0.0.1 --port 4321
```

`build` checks Astro/TypeScript, generates the static site in `dist/`, and builds the Pagefind search index. `check:publication` inspects that production output for publication leaks and broken internal links. Run it after a fresh build. The preview serves the built site, so rebuild after editing. Search should be checked in this production preview.

Use `corepack pnpm format` to apply the project's formatting. Review the changed files afterward. Before publishing, inspect the main pages at desktop and mobile widths, keyboard navigation, and any new article's equations, figures, and code blocks.

The site uses local system fonts. To update the social preview image, edit `src/assets/social-card.svg` and run `node scripts/generate-social-card.mjs`; commit the resulting `public/social-card.png` with the source change.

## Where to edit

| Location                       | Purpose                                                                     |
| ------------------------------ | --------------------------------------------------------------------------- |
| `astro-paper.config.ts`        | Site name, description, public URL, and recent article count.               |
| `src/pages/`                   | Home, Projects, Fogcast, Writing, About, and generated indexes.             |
| `src/content/posts/`           | Markdown articles.                                                          |
| `src/content.config.ts`        | Article frontmatter schema.                                                 |
| `src/assets/figures/`          | Article figures referenced from Markdown.                                   |
| `src/styles/`                  | Global and article styles.                                                  |
| `public/`                      | Assets copied directly to the public site.                                  |
| `astro.config.ts`              | Astro integrations and Markdown processing.                                 |
| `.github/workflows/deploy.yml` | Build, checks, and GitHub Pages deployment.                                 |
| `TODO.md`                      | Content and publication tasks that still need decisions or source material. |

The site uses `/`, `/projects/`, `/projects/fogcast/`, `/writing/`, and `/about/`. There is no repository-name base path because the target repository is `gbeardsell/gbeardsell.github.io`.

## Write an article

Create `src/content/posts/your-article-slug.md`. The filename determines its URL, `/writing/your-article-slug/`. Start with this frontmatter, changing the title, summary, and publication date:

```yaml
---
title: "Article title"
pubDatetime: 2026-10-21T12:00:00-07:00
description: "A concise summary of what the article explains."
draft: true
categories:
  - Fogcast
series:
  name: "Fogcast notes"
  slug: "fogcast-notes"
  order: 1
---
```

`title`, `pubDatetime`, and `description` are required. `draft` defaults to `true`; set it explicitly. `categories` groups articles by subject. `series` is optional: omit the whole block for a standalone article, or use the same name and slug with increasing positive order numbers for a sequence. Tags and `modDatetime` are optional.

Category and series pages are generated from published articles, such as `/writing/category/fogcast/` and `/writing/series/fogcast-notes/`. Initially there are no published articles, and the writing page has an empty state.

The unpublished [authoring example](src/content/posts/authoring-example.md) demonstrates headings, highlighted code, equations, a captioned figure, and series metadata. With `corepack pnpm dev` running, open `/writing/authoring-example/` to inspect it. Keep this instructional example as a draft.

### Equations, code, and figures

Use `$...$` for inline LaTeX and a separate `$$` block for display equations:

```md
The cell area is $A = (\Delta x)^2$.

$$
\frac{\partial u}{\partial t} = \alpha \nabla^2 u
$$
```

Use fenced code blocks with a language, such as `python`, for syntax highlighting. For an article directly inside `src/content/posts/`, reference a figure in `src/assets/figures/` as follows:

```md
![Describe what the figure shows.](../../assets/figures/example-grid.svg "A caption explaining the figure.")
```

The image title becomes a visible figure caption. Write useful alt text independently of the caption. Images scale to the article width; long equations and code can scroll horizontally. Adjust relative image paths when nesting article files.

### Publish deliberately

1. Write and inspect the article with `draft: true` using the development server.
2. Confirm its facts, links, figure labels, alt text, and metadata.
3. Set `draft: false` and choose a publication timestamp at or before the intended build time.
4. Run the checks and production preview above. Verify the article, category/series links, RSS, and search.
5. Commit and push the reviewed source when ready to publish.

Production excludes drafts and future-dated articles from article routes, listings, RSS, sitemap, social-image routes, and search. They remain directly viewable in development. This is a static site: a future-dated article requires another build once its publication time arrives; the workflow does not schedule that build automatically.

Draft status controls the generated site, not access to source files in a public repository. Assets under `public/` are copied to every production build, regardless of article draft status.

## First deployment to GitHub Pages

The workflow follows [Astro's official GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/). It uses Node 24 and the pinned pnpm version, runs lint, formatting, build, and publication checks, then uploads `dist/` and deploys it.

1. In `gbeardsell/gbeardsell.github.io`, open **Settings → Pages** and choose **GitHub Actions** as the source.
2. Keep `site.url` in `astro-paper.config.ts` set to `https://gbeardsell.github.io`. Leave Astro's `base` unset.
3. After reviewing the local result, commit the source and lockfile and push to `main`. The push triggers the workflow. You can also run **Deploy to GitHub Pages** manually from the Actions tab.
4. Wait for both jobs to succeed, then check the public home page, navigation, article URLs, and assets.

This implementation prepares deployment; publishing and DNS changes are separate steps. The first successful deployment should use the GitHub address before changing the domain.

To deploy an already reviewed local commit:

```sh
git status --short --branch
git push origin main
```

For later edits, stage the files you reviewed and commit them before pushing:

```sh
git add src public astro-paper.config.ts astro.config.ts package.json pnpm-lock.yaml
git diff --cached
git commit -m "Update website"
git push origin main
```

Include any other intentionally changed files, such as the workflow or README, in the staging command.

## Later migration to gbeardsell.com

First verify ownership in your **GitHub account Settings → Pages → Add a domain**. Enter `gbeardsell.com`, add GitHub's exact TXT record at Porkbun, then complete verification. Keep that TXT record. [GitHub domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)

In the repository's **Settings → Pages**, save `gbeardsell.com` as the custom domain before pointing website DNS at GitHub. This custom Actions workflow does not require a `CNAME` file. [GitHub custom-domain settings](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

At Porkbun, open **Domain Management → gbeardsell.com → DNS**. Add the records below, replacing conflicting website parking records while preserving the verification TXT record and any email records. Porkbun also offers a GitHub preset under **Quick DNS Config**. [Porkbun's GitHub Pages guide](https://kb.porkbun.com/article/64-how-to-connect-your-domain-to-github-pages)

| Type  | Host         | Answer                 |
| ----- | ------------ | ---------------------- |
| A     | Apex / blank | `185.199.108.153`      |
| A     | Apex / blank | `185.199.109.153`      |
| A     | Apex / blank | `185.199.110.153`      |
| A     | Apex / blank | `185.199.111.153`      |
| CNAME | `www`        | `gbeardsell.github.io` |

These are GitHub's documented IPv4 records; optional IPv6 records are in the [GitHub DNS instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain). Recheck that source when making the change.

Change `site.url` to `https://gbeardsell.com`, keep `base` unset, rebuild, check, and redeploy. Once GitHub's DNS check and certificate provisioning finish, enable **Enforce HTTPS**. Allow up to 24 hours for DNS/certificate availability. Confirm HTTPS, `www` redirection, canonical URLs, RSS, and sitemap. [GitHub custom-domain guidance](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

On Windows, inspect DNS with:

```powershell
Resolve-DnsName gbeardsell.com -Type A
Resolve-DnsName www.gbeardsell.com -Type CNAME
Resolve-DnsName _github-pages-challenge-gbeardsell.gbeardsell.com -Type TXT
```

Use the exact challenge hostname GitHub supplies if it differs.

## Attribution

Adapted from [AstroPaper v6.1.0](https://github.com/satnaing/astro-paper/releases/tag/v6.1.0), upstream commit `4c33a60529f9c443145a89fe526ff231c009272d`. The upstream MIT notice is retained in [LICENSE](LICENSE).
