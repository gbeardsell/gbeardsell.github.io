# Personal website Codex implementation brief

## Purpose and scope

Build Guillaume Beardsell’s personal website using [AstroPaper](https://github.com/satnaing/astro-paper). The site should present his work in scientific computing and mechanical engineering, host technical articles, and connect Fogcast’s explanation, public code, and live forecast. Deliver a working local site and deployment configuration.

**Repository:** `gbeardsell/gbeardsell.github.io`. **Initial address:** `https://gbeardsell.github.io`. **Purchased domain:** `gbeardsell.com`, registered at Porkbun. The Fogcast code belongs in a separate repository; its live app will be hosted separately.

## Initialize the project

Work in the website repository’s local checkout; clone it if needed. Read applicable repository instructions and inspect existing files first. Import the current stable AstroPaper template into the project root while preserving Git history, the remote, and existing user content. Retain required upstream license notices; remove template branding and demonstration posts. Use the template’s supported Node version and package manager, commit its lockfile, and keep dependencies minimal. Use static output without a backend.

## Pages and initial content

| Route | Requirements |
|---|---|
| `/` | Short introduction, featured Fogcast project, recent published writing, and GitHub link. |
| `/projects/` | Project listing, initially featuring Fogcast. |
| `/projects/fogcast/` | Explain the Bay Area clear-sky forecasting problem, intended 500 m grid, satellite observations and weather-model inputs, and planned evaluation against persistence and NBM. Provide links to available articles, code, and app. |
| `/writing/` | List published articles; support a Fogcast category and a series index as posts become available. |
| `/about/` | Concise background: Caltech PhD in mechanical engineering, reacting-flow simulation, numerical methods, and scientific computing. |

Navigation must read **Home · Projects · Writing · About**. Use “Guillaume Beardsell” as the site name and “Computational scientist and mechanical engineer” as a starting description. Draft concise copy from these facts. Present Fogcast as work in progress; invent no results, credentials, article text, or launch status. Put unknown URLs and missing assets in internal TODOs, and render only working public links. Use `https://github.com/gbeardsell` for GitHub.

## Design and authoring

Use a restrained light default, dark text, one accent color, readable typography, and generous space for figures. Preserve accessibility, responsive navigation, and visible keyboard focus. Support Markdown articles with titles, dates, summaries, categories, and draft status. Exclude drafts from production pages, feeds, and search. Include code highlighting, rendered LaTeX equations, figure captions, and responsive images. Supply an unpublished example demonstrating these features. Keep the layout useful when no articles are published.

## Deployment and completion

Prepare GitHub Pages deployment using the [official Astro workflow](https://docs.astro.build/en/guides/deploy/github/). Initially set Astro’s site URL to `https://gbeardsell.github.io` with no repository-name base path. Document the later change to `https://gbeardsell.com`, GitHub domain verification and custom-domain settings, Porkbun DNS, and HTTPS. Domain configuration follows a successful initial deployment.

Run the production build and applicable project checks; inspect desktop and mobile layouts and navigation. In the README, document exact setup, preview, build, article-authoring, and deployment commands, plus remaining manual GitHub and DNS steps. Report completed work and outstanding TODOs. Finish with a local preview; pushing, publishing, and DNS changes remain separate steps.

