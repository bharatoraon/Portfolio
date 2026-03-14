<script>
  import { onMount } from 'svelte';
  import MapViewer from '$lib/components/MapViewer.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';

  const spatialProjects = [
    {
      id: 'transit',
      title: 'Transit Accessibility — Hyderabad',
      description: 'Public transit catchment zones and accessibility gaps across Hyderabad metropolitan region.',
      lat: 17.385,
      lng: 78.4867,
      zoom: 11,
      type: 'Network Analysis',
      tools: ['GTFS', 'OSRM', 'QGIS', 'Python'],
    },
    {
      id: 'heat',
      title: 'Urban Heat Island — Vijayawada',
      description: 'Land surface temperature mapping using Landsat 8 imagery. Summer 2024.',
      lat: 16.5062,
      lng: 80.648,
      zoom: 12,
      type: 'Remote Sensing',
      tools: ['Landsat 8', 'NDVI', 'LST', 'QGIS'],
    },
    {
      id: 'street',
      title: 'Street Network Analysis — Vijayawada',
      description: 'Walkability scoring and pedestrian infrastructure assessment across 14 planning zones.',
      lat: 16.5062,
      lng: 80.648,
      zoom: 13,
      type: 'Network Analysis',
      tools: ['OSMnx', 'Python', 'QGIS', 'Field Survey'],
    },
    {
      id: 'landuse',
      title: 'Land Use Change — Periurban Fringe',
      description: 'Agricultural land conversion to urban uses in Vijayawada\'s periurban belt, 2015–2023.',
      lat: 16.45,
      lng: 80.6,
      zoom: 10,
      type: 'LULC Classification',
      tools: ['Sentinel-2', 'Google Earth Engine', 'Random Forest'],
    },
  ];

  let activeMap = spatialProjects[0];
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
        <h2 class="text-xs uppercase tracking-widest text-ink-muted font-semibold mb-4">Spatial Projects</h2>
        <div class="space-y-2">
          {#each spatialProjects as proj}
            <button
              class="w-full text-left p-4 border transition-colors {activeMap.id === proj.id ? 'border-ink bg-white' : 'border-border bg-white hover:border-ink-muted'}"
              on:click={() => (activeMap = proj)}
            >
              <div class="flex items-start justify-between gap-2">
                <h3 class="text-sm font-semibold text-ink leading-snug">{proj.title}</h3>
                {#if activeMap.id === proj.id}
                  <div class="w-1.5 h-1.5 bg-ink rounded-full flex-shrink-0 mt-1.5"></div>
                {/if}
              </div>
              <span class="tag mt-2 inline-block">{proj.type}</span>
              {#if activeMap.id === proj.id}
                <p class="text-xs text-ink-muted mt-2 leading-relaxed">{proj.description}</p>
                <div class="flex flex-wrap gap-1 mt-2">
                  {#each proj.tools as tool}
                    <span class="text-xs font-mono text-ink-muted bg-paper-mid px-1.5 py-0.5">{tool}</span>
                  {/each}
                </div>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <!-- Map Panel -->
      <div class="lg:col-span-2">
        {#key activeMap.id}
          <MapViewer
            lat={activeMap.lat}
            lng={activeMap.lng}
            zoom={activeMap.zoom}
            height="520px"
            title={activeMap.title}
          />
        {/key}
        <div class="mt-3 p-4 bg-paper-warm border border-border">
          <p class="text-xs text-ink-muted leading-relaxed">
            <strong class="text-ink font-medium">Note:</strong> {activeMap.description} Analysis conducted using {activeMap.tools.join(', ')}.
          </p>
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
