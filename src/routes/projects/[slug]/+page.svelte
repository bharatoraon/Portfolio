<script>
  import MapViewer from '$lib/components/MapViewer.svelte';
  import SEO from '$lib/components/SEO.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
  $: project = data.project;

  const cityCoords = {
    "Hyderabad, Telangana": { lat: 17.385, lng: 78.4867 },
    "Vijayawada, Andhra Pradesh": { lat: 16.5062, lng: 80.648 },
    "Vijayawada Region, AP": { lat: 16.5062, lng: 80.648 },
  };

  $: coords = cityCoords[project.city] || { lat: 17.0, lng: 79.0 };

  const sections = [
    { key: 'context', label: 'Context' },
    { key: 'problem', label: 'Problem Statement' },
    { key: 'methodology', label: 'Methodology' },
    { key: 'analysis', label: 'Analysis' },
    { key: 'insights', label: 'Insights' },
    { key: 'outcome', label: 'Outcome' },
  ];
  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bharatoraon.com" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://bharatoraon.com/projects" },
      { "@type": "ListItem", "position": 3, "name": project.title, "item": `https://bharatoraon.com/projects/${project.slug}` }
    ]
  };
</script>

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
  </div>
</section>

<!-- Interactive Map -->
<section class="py-8 border-b border-border">
  <div class="container-narrow">
    <MapViewer lat={coords.lat} lng={coords.lng} zoom={12} height="380px" title="Location: {project.city}" />
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
