<script>
  import { onMount, onDestroy } from 'svelte';

  /** @type {number} */
  export let lat = 16.5062;
  /** @type {number} */
  export let lng = 80.648;
  /** @type {number} */
  export let zoom = 11;
  /** @type {string} */
  export let height = '480px';
  /** @type {string} */
  export let title = 'Map';

  let mapContainer;
  let map;

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
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
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

  onMount(async () => {
    const maplibregl = (await import('maplibre-gl')).default;
    await import('maplibre-gl/dist/maplibre-gl.css');

    map = new maplibregl.Map({
      container: mapContainer,
      style: CARTO_STYLE,
      center: [lng, lat],
      zoom,
      attributionControl: true,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    return () => {
      if (map) map.remove();
    };
  });

  onDestroy(() => {
    if (map) map.remove();
  });
</script>

<div class="w-full">
  {#if title}
    <div class="flex items-center gap-2 mb-2">
      <svg class="w-3.5 h-3.5 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
      <span class="text-xs text-ink-muted font-medium uppercase tracking-widest">{title}</span>
    </div>
  {/if}
  <div
    bind:this={mapContainer}
    class="w-full border border-border"
    style="height: {height};"
  ></div>
</div>
