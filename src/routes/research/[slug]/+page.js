import { research } from '$lib/data/research.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const article = research.find(r => r.slug === params.slug);
  if (!article) throw error(404, 'Article not found');
  return { article };
}
