<script>
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import { projects } from '$lib/data/projects.js';

  // Only projects that have embedded maps
  const mapProjects = projects.filter(p => p.mapEmbeds && p.mapEmbeds.length > 0);

  let activeProject = $state(mapProjects[0]);
  let activeMapIndex = $state(0);

  function selectProject(proj) {
    activeProject = proj;
    activeMapIndex = 0;
  }
</script>

<svelte:head>
  <title>Maps & Spatial Work — Bharat Oraon</title>
  <meta name="description" content="Interactive maps and spatial analysis by Bharat Oraon. GIS, remote sensing, and urban data visualization." />
</svelte:head>

<!-- Header -->
<section class="section-padding border-b border-border bg-white">
  <div class="container-narrow">
    <p class="text-xs uppercase tracking-widest text-ink-muted font-semibold mb-4">Spatial Work</p>
    <h1 class="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">Maps & GIS</h1>
    <p class="text-base text-ink-muted max-w-xl leading-relaxed">
      Interactive spatial visualizations and GIS analysis from urban planning research.
    </p>
  </div>
</section>

<!-- Map Explorer -->
<section class="section-padding border-b border-border">
  <div class="container-wide">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <h2 class="text-xs uppercase tracking-widest text-ink-muted font-semibold mb-4">Project Maps</h2>
        <div class="space-y-2">
          {#each mapProjects as proj}
            <button
              class="w-full text-left p-4 border transition-colors {activeProject.slug === proj.slug ? 'border-ink bg-white' : 'border-border bg-white hover:border-ink-muted'}"
              onclick={() => selectProject(proj)}
            >
              <div class="flex items-start justify-between gap-2">
                <h3 class="text-sm font-semibold text-ink leading-snug">{proj.title}</h3>
                {#if activeProject.slug === proj.slug}
                  <div class="w-1.5 h-1.5 bg-ink rounded-full flex-shrink-0 mt-1.5"></div>
                {/if}
              </div>
              <div class="flex items-center gap-2 mt-2">
                <span class="tag">{proj.type.split('/')[0].trim()}</span>
                <span class="text-xs font-mono text-ink-muted">{proj.year}</span>
              </div>
              {#if activeProject.slug === proj.slug}
                <p class="text-xs text-ink-muted mt-2 leading-relaxed">{proj.shortDescription}</p>
                <div class="flex flex-wrap gap-1 mt-2">
                  {#each proj.tags.slice(0, 4) as tag}
                    <span class="text-xs font-mono text-ink-muted bg-paper-mid px-1.5 py-0.5">{tag}</span>
                  {/each}
                </div>
                <div class="flex items-center gap-3 mt-3">
                  <a
                    href="/projects/{proj.slug}"
                    class="text-xs font-medium text-ink flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Case study
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </a>
                  {#if proj.liveUrl}
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-xs font-medium text-ink-muted flex items-center gap-1 hover:text-ink transition-colors"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      Live site
                    </a>
                  {/if}
                </div>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <!-- Map Panel -->
      <div class="lg:col-span-2">
        <!-- Tab bar for multiple maps -->
        {#if activeProject.mapEmbeds.length > 1}
          <div class="flex items-center gap-1 mb-3 flex-wrap">
            {#each activeProject.mapEmbeds as embed, i}
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
            <span class="text-xs text-ink-muted font-medium uppercase tracking-widest">{activeProject.mapEmbeds[0].label}</span>
          </div>
        {/if}

        <!-- iframes: show active, hide others (preserves loaded state) -->
        {#key activeProject.slug}
          {#each activeProject.mapEmbeds as embed, i}
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
        {/key}

        <div class="mt-3 p-4 bg-paper-warm border border-border flex items-center justify-between gap-4">
          <p class="text-xs text-ink-muted leading-relaxed">
            <strong class="text-ink font-medium">{activeProject.city}</strong> —
            {activeProject.shortDescription}
          </p>
          {#if activeProject.liveUrl}
            <a
              href={activeProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-medium bg-ink text-white px-3 py-1.5 hover:bg-ink-muted transition-colors"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Live site
            </a>
          {/if}
        </div>
      </div>

    </div>
  </div>
</section>

<!-- GIS Skills -->
<section class="section-padding">
  <div class="container-narrow">
    <SectionHeader label="Tools & Methods" title="Technical Spatial Skills" />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each [
        { cat: 'GIS Software', items: ['QGIS', 'ArcGIS Pro', 'GRASS GIS', 'gvSIG'] },
        { cat: 'Remote Sensing', items: ['Google Earth Engine', 'ERDAS Imagine', 'EnMAP-Box', 'SNAP'] },
        { cat: 'Programming', items: ['Python (GeoPandas, Shapely)', 'R (sf, tmap)', 'JavaScript (Leaflet, MapLibre)'] },
        { cat: 'Spatial Analysis', items: ['Network analysis', 'Raster analysis', 'Spatial statistics', 'Change detection'] },
        { cat: 'Data Sources', items: ['Sentinel-2', 'Landsat 8/9', 'SRTM DEM', 'OpenStreetMap', 'Census of India'] },
        { cat: 'Web Mapping', items: ['MapLibre GL JS', 'Leaflet', 'GeoServer', 'PostGIS / PostgreSQL'] },
      ] as group}
        <div class="bg-white border border-border p-5">
          <h3 class="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-3">{group.cat}</h3>
          <ul class="space-y-1.5">
            {#each group.items as item}
              <li class="text-sm text-ink-muted flex items-center gap-2">
                <span class="w-1 h-1 bg-border rounded-full flex-shrink-0"></span>
                {item}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>
