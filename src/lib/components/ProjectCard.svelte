<script>
  import { onMount, onDestroy } from 'svelte';

  /** @type {import('$lib/data/projects').Project} */
  export let project;
  /** @type {boolean} */
  export let compact = false;

  let mapContainer;
  let map;
  let observer;

  const CARTO_STYLE = {
    version: 8,
    sources: {
      'carto-light': {
        type: 'raster',
        tiles: [
          'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
          'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
          'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
        ],
        tileSize: 256,
        attribution: '© OpenStreetMap contributors © CARTO',
      },
    },
    layers: [
      {
        id: 'carto-light-layer',
        type: 'raster',
        source: 'carto-light',
        minzoom: 0,
        maxzoom: 22,
      },
    ],
  };

  async function initMap() {
    if (map || !mapContainer || !project.mapCenter) return;
    const { lat, lng, zoom = 11 } = project.mapCenter;
    const maplibregl = (await import('maplibre-gl')).default;
    await import('maplibre-gl/dist/maplibre-gl.css');

    map = new maplibregl.Map({
      container: mapContainer,
      style: CARTO_STYLE,
      center: [lng, lat],
      zoom,
      interactive: false,
      attributionControl: false,
    });

    // Add a small marker dot at the project location
    map.on('load', () => {
      map.addSource('pin', {
        type: 'geojson',
        data: { type: 'Feature', geometry: { type: 'Point', coordinates: [lng, lat] } },
      });
      map.addLayer({
        id: 'pin-outer',
        type: 'circle',
        source: 'pin',
        paint: {
          'circle-radius': 7,
          'circle-color': '#1a1a1a',
          'circle-opacity': 0.9,
        },
      });
      map.addLayer({
        id: 'pin-inner',
        type: 'circle',
        source: 'pin',
        paint: {
          'circle-radius': 3,
          'circle-color': '#ffffff',
        },
      });
    });
  }

  onMount(() => {
    if (!project.mapCenter) return;
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          initMap();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (mapContainer) observer.observe(mapContainer);
  });

  onDestroy(() => {
    if (observer) observer.disconnect();
    if (map) map.remove();
  });
</script>

<a
  href="/projects/{project.slug}"
  class="group block border border-border bg-white hover:border-ink-muted transition-colors duration-200 card-hover"
>
  <!-- Thumbnail / map -->
  <div class="relative w-full {compact ? 'h-36' : 'h-48'} bg-paper-mid overflow-hidden">
    {#if project.thumbnail}
      <img
        src={project.thumbnail}
        alt={project.title}
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
    {:else if project.mapCenter}
      <div bind:this={mapContainer} class="absolute inset-0 w-full h-full"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
    {:else}
      <div class="absolute inset-0 opacity-20"
        style="background-image: linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px); background-size: 20px 20px;">
      </div>
    {/if}

    <!-- Type badge -->
    <div class="absolute top-3 left-3 z-10">
      <span class="tag bg-white">{project.type.split('/')[0].trim()}</span>
    </div>
    <!-- Year badge -->
    <div class="absolute top-3 right-3 z-10">
      <span class="text-xs text-ink-muted font-mono bg-white/80 px-1.5 py-0.5">{project.year}</span>
    </div>
  </div>

  <!-- Content -->
  <div class="p-5">
    <div class="flex items-start justify-between gap-4 mb-2">
      <h3 class="text-base font-semibold text-ink leading-snug group-hover:text-accent transition-colors">
        {project.title}
      </h3>
    </div>

    <p class="text-xs text-ink-muted flex items-center gap-1.5 mb-3">
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      {project.city}
    </p>

    {#if !compact}
      <p class="text-sm text-ink-muted leading-relaxed line-clamp-3">{project.shortDescription}</p>
    {/if}

    <!-- Tags -->
    <div class="flex flex-wrap gap-1.5 mt-4">
      {#each project.tags.slice(0, 3) as tag}
        <span class="text-xs text-ink-muted bg-paper-mid px-2 py-0.5 font-mono">{tag}</span>
      {/each}
    </div>

    <div class="mt-4 flex items-center justify-between">
      <div class="flex items-center gap-1.5 text-xs font-medium text-ink group-hover:gap-2.5 transition-all">
        View case study
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
      {#if project.liveUrl}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onclick={(e) => e.stopPropagation()}
          class="flex items-center gap-1 text-xs text-ink-muted hover:text-ink transition-colors"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          Live
        </a>
      {/if}
    </div>
  </div>
</a>
