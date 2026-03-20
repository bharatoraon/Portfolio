<script>
  import MapViewer from '$lib/components/MapViewer.svelte';
  import SEO from '$lib/components/SEO.svelte';

  let { data } = $props();
  let project = $derived(data?.project);

  const cityCoords = {
    "Hyderabad, Telangana": { lat: 17.385, lng: 78.4867 },
    "Vijayawada, Andhra Pradesh": { lat: 16.5062, lng: 80.648 },
    "Vijayawada Region, AP": { lat: 16.5062, lng: 80.648 },
    "Chennai, Tamil Nadu": { lat: 13.0827, lng: 80.2707 },
    "Karur, Tamil Nadu": { lat: 10.9416, lng: 78.0188 },
    "Italy": { lat: 41.8719, lng: 12.5674 },
    "India": { lat: 20.5937, lng: 78.9629 },
  };

  let coords = $derived(project
    ? (project.mapCenter ?? cityCoords[project.city] ?? { lat: 17.0, lng: 79.0 })
    : { lat: 17.0, lng: 79.0 });

  let activeMapIndex = $state(0);

  const sections = [
    { key: 'context', label: 'Context' },
    { key: 'problem', label: 'Problem Statement' },
    { key: 'methodology', label: 'Methodology' },
    { key: 'analysis', label: 'Analysis' },
    { key: 'insights', label: 'Insights' },
    { key: 'outcome', label: 'Outcome' },
  ];

  let breadcrumbsJsonLd = $derived(project ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bharatoraon.com" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://bharatoraon.com/projects" },
      { "@type": "ListItem", "position": 3, "name": project.title, "item": `https://bharatoraon.com/projects/${project.slug}` }
    ]
  } : null);
</script>

{#if project}
<SEO
  title="{project.title} — Bharat Oraon"
  description={project.shortDescription}
  jsonLd={breadcrumbsJsonLd}
/>

<!-- Breadcrumb + Header -->
<section class="section-padding border-b border-border bg-white">
  <div class="container-narrow">
    <div class="flex items-center gap-2 text-xs text-ink-muted mb-8">
      <a href="/" class="hover:text-ink transition-colors">Home</a>
      <span>/</span>
      <a href="/projects" class="hover:text-ink transition-colors">Projects</a>
      <span>/</span>
      <span class="text-ink">{project.title}</span>
    </div>

    <span class="tag mb-4 inline-block">{project.type}</span>
    <h1 class="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4 leading-tight">
      {project.title}
    </h1>
    <div class="flex flex-wrap items-center gap-4 text-sm text-ink-muted">
      <span class="flex items-center gap-1.5">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        {project.city}
      </span>
      <span class="font-mono">{project.year}</span>
    </div>

    <p class="text-base text-ink-muted leading-relaxed mt-6 max-w-2xl">
      {project.shortDescription}
    </p>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2 mt-6">
      {#each project.tags as tag}
        <span class="text-xs text-ink-muted bg-paper-mid px-2 py-0.5 font-mono">{tag}</span>
      {/each}
    </div>

    <!-- Live link -->
    {#if project.liveUrl}
      <div class="mt-6">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm font-medium bg-ink text-white px-4 py-2 hover:bg-ink-muted transition-colors"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          Visit Live Site
        </a>
      </div>
    {/if}
  </div>
</section>

<!-- Map Section: project output maps or fallback city locator -->
<section class="py-8 border-b border-border">
  <div class="container-narrow">
    {#if project.mapEmbeds && project.mapEmbeds.length > 0}
      <!-- Tab bar (only if multiple maps) -->
      {#if project.mapEmbeds.length > 1}
        <div class="flex items-center gap-1 mb-3 flex-wrap">
          {#each project.mapEmbeds as embed, i}
            <button
              class="text-xs px-3 py-1.5 border transition-colors {activeMapIndex === i ? 'bg-ink text-white border-ink' : 'bg-white text-ink-muted border-border hover:border-ink-muted'}"
              onclick={() => activeMapIndex = i}
            >{embed.label}</button>
          {/each}
        </div>
      {:else}
        <div class="flex items-center gap-2 mb-3">
          <svg class="w-3.5 h-3.5 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <span class="text-xs text-ink-muted font-medium uppercase tracking-widest">{project.mapEmbeds[0].label}</span>
        </div>
      {/if}

      <!-- iframe for the active map -->
      {#each project.mapEmbeds as embed, i}
        <div class="{activeMapIndex === i ? 'block' : 'hidden'}">
          <iframe
            src={embed.file}
            title={embed.label}
            class="w-full border border-border"
            style="height: 520px;"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
          ></iframe>
        </div>
      {/each}

      <p class="text-xs text-ink-muted mt-2">Interactive map — scroll and click to explore.</p>
    {:else}
      <!-- Fallback: city location viewer -->
      <MapViewer lat={coords.lat} lng={coords.lng} zoom={coords.zoom ?? 12} height="380px" title="Location: {project.city}" />
    {/if}
  </div>
</section>

<!-- Case Study Body -->
<section class="section-padding">
  <div class="container-narrow">
    <div class="space-y-12">
      {#each sections as section}
        {#if project[section.key]}
          <div>
            <h2 class="text-xs uppercase tracking-widest text-ink-muted font-semibold mb-4 flex items-center gap-3">
              <span class="w-6 h-px bg-border inline-block"></span>
              {section.label}
            </h2>
            <p class="text-sm md:text-base text-ink-muted leading-relaxed">
              {project[section.key]}
            </p>
          </div>
        {/if}
      {/each}
    </div>

    <!-- Navigation -->
    <div class="mt-16 pt-8 border-t border-border flex items-center justify-between">
      <a href="/projects" class="btn-outline text-sm">← All Projects</a>
      <a href="/contact" class="text-sm text-ink-muted hover:text-ink transition-colors">Get in touch →</a>
    </div>
  </div>
</section>
{/if}
