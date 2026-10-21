import type { CollectionEntry } from "astro:content";

/** The single publication rule used by routes, indexes, feeds, and navigation. */
export function postFilter({ data }: CollectionEntry<"posts">): boolean {
  return data.draft === false && data.pubDatetime.getTime() <= Date.now();
}
