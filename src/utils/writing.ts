import type { CollectionEntry } from "astro:content";
import { getSortedPosts } from "./getSortedPosts";
import { slugifyStr } from "./slugify";

type Post = CollectionEntry<"posts">;
export type WritingGroup = { name: string; slug: string; posts: Post[] };

export function getCategoryGroups(posts: Post[]): WritingGroup[] {
  const groups = new Map<string, WritingGroup>();
  for (const post of getSortedPosts(posts)) {
    for (const name of new Set(post.data.categories)) {
      const slug = slugifyStr(name);
      const group = groups.get(slug) ?? { name, slug, posts: [] };
      group.posts.push(post);
      groups.set(slug, group);
    }
  }
  return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function getSeriesGroups(posts: Post[]): WritingGroup[] {
  const groups = new Map<string, WritingGroup>();
  for (const post of getSortedPosts(posts)) {
    const series = post.data.series;
    if (!series) continue;
    const group = groups.get(series.slug) ?? {
      name: series.name,
      slug: series.slug,
      posts: [],
    };
    group.posts.push(post);
    groups.set(series.slug, group);
  }
  return [...groups.values()]
    .map(group => ({
      ...group,
      posts: group.posts.sort(
        (a, b) => a.data.series!.order - b.data.series!.order
      ),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function formatPostDate(date: Date, timeZone = "UTC"): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  }).format(date);
}
