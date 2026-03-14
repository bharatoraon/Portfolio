<script>
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { projects } from '$lib/data/projects.js';
  import SEO from '$lib/components/SEO.svelte';

  const types = [...new Set(projects.map(p => p.type.split('/')[0].trim()))];
  let activeFilter = 'All';

  $: filtered = activeFilter === 'All' ? projects : projects.filter(p => p.type.includes(activeFilter));

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bharatoraon.com" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://bharatoraon.com/projects" }
    ]
  };
</script>

<SEO 
  title="Projects — Bharat Oraon"
  description="Explore urban planning and GIS projects by Bharat Oraon, including mobility analytics, spatial intelligence, and civic technology tools."
  jsonLd={breadcrumbsJsonLd}
/>

<!-- Header -->
<section class="section-padding border-b border-border bg-white">
  <div class="container-narrow">
    <p class="text-xs uppercase tracking-widest text-ink-muted font-semibold mb-4">Portfolio</p>
    <h1 class="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">Projects</h1>
    <p class="text-base text-ink-muted max-w-xl leading-relaxed">
      GIS analysis, spatial research, and urban planning work across Indian cities.
    </p>
  </div>
</section>

<!-- Filters + Grid -->
<section class="section-padding">
  <div class="container-wide">
    <!-- Filter chips -->
    <div class="flex flex-wrap gap-2 mb-10">
      <button
        class="text-xs px-3 py-1.5 border transition-colors {activeFilter === 'All' ? 'bg-ink text-white border-ink' : 'bg-white text-ink-muted border-border hover:border-ink-muted'}"
        on:click={() => (activeFilter = 'All')}
      >All</button>
      {#each types as type}
        <button
          class="text-xs px-3 py-1.5 border transition-colors {activeFilter === type ? 'bg-ink text-white border-ink' : 'bg-white text-ink-muted border-border hover:border-ink-muted'}"
          on:click={() => (activeFilter = type)}
        >{type}</button>
      {/each}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filtered as project (project.slug)}
        <ProjectCard {project} />
      {/each}
    </div>
  </div>
</section>
