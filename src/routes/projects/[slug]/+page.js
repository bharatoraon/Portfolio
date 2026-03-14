import { projects } from '$lib/data/projects.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const project = projects.find(p => p.slug === params.slug);
  if (!project) throw error(404, 'Project not found');
  return { project };
}
