import data from '../data/events.json';
export interface Show {
  slug: string; title: string; date: string; venue: string; city: string;
  videoUrl?: string;
}
const shows = data as Show[];
const slugs = new Set<string>();
for (const show of shows) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(show.slug) || slugs.has(show.slug)) {
    throw new Error(`Invalid or duplicate event slug: ${show.slug}`);
  }
  if (!show.title?.trim() || !show.venue?.trim() ||
      !/^\d{4}-\d{2}-\d{2}$/.test(show.date) ||
      !Number.isFinite(Date.parse(show.date)) ||
      new Date(show.date).toISOString().slice(0, 10) !== show.date) {
    throw new Error(`Event ${show.slug} needs a title, venue, and valid YYYY-MM-DD date.`);
  }
  slugs.add(show.slug);
}
export const events = [...shows].sort((a, b) => b.date.localeCompare(a.date));
export const displayDate = (date: string) => date.replaceAll('-', '.');
