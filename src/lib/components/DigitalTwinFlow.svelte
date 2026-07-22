<script>
  let activeStage = $state(0);

  const stages = [
    {
      id: 1,
      title: "1. Streaming & Spatial Filtering",
      badge: "Python / Shell Pipe",
      sub: "Bypasses heavy downloads by filtering candidate footprints on-the-fly.",
      metrics: [
        { label: "Raw Dataset", val: "Google Open Buildings CSV.gz" },
        { label: "Stream Command", val: "curl | gunzip | awk bounding filter" },
        { label: "Index Engine", val: "Shapely Prepared Geometries (prep)" },
        { label: "CMA Candidate Count", val: "525,000+ Footprints" }
      ],
      details: "Command-line pipe filters coordinate streams before decompressing into Python memory. Prepared geometries accelerate complex polygon containment checks."
    },
    {
      id: 2,
      title: "2. Vectorized Height Intersection",
      badge: "NumPy + Rasterio Matrix Math",
      sub: "Replaces slow point-by-point spatial joins with affine matrix indexing.",
      metrics: [
        { label: "Satellite Height Source", val: "GEE 2023 GeoTIFF Height Raster" },
        { label: "Coordinate Mapping", val: "Affine rowcol transform" },
        { label: "Lookup Speed", val: "O(1) NumPy Array Slicing" },
        { label: "Default Normalization", val: "3.0m Single-Story Baseline" }
      ],
      details: "Direct memory slicing maps coordinate arrays to raster pixel rows and columns simultaneously in C, bypassing disk read loops."
    },
    {
      id: 3,
      title: "3. Urban Heuristic Classification",
      badge: "Spatial Rule-Engine",
      sub: "Translates geometry into urban land-use semantics.",
      metrics: [
        { label: "Floor Count Estimator", val: "Floors = max(1, round(Height / 3.5m))" },
        { label: "Classifications", val: "Low/Med/High Residential, Retail, Office, Industrial" },
        { label: "Color Standard", val: "UDPFI Town Planning Colors" },
        { label: "Attributes", val: "Height + Footprint Area" }
      ],
      details: "Estimates floor counts and runs a spatial decision tree to categorize buildings for urban planners."
    },
    {
      id: 4,
      title: "4. Compacting & Compression",
      badge: "96% Size Reduction",
      sub: "Compresses 1.5 GB GeoJSON down to 60 MB web payload.",
      metrics: [
        { label: "Coordinate Precision", val: "6 Decimal Places (10cm Accuracy)" },
        { label: "Attribute Shortening", val: "height → h, area → a, use → u" },
        { label: "JSON Serialization", val: "Separators (',', ':') without spaces" },
        { label: "Payload Output", val: "60 MB (.geojson.gz)" }
      ],
      details: "Trims sub-millimeter coordinate bloat, replaces verbose string keys with 2-char codes, and applies Gzip level 9 compression."
    },
    {
      id: 5,
      title: "5. Browser WebGL Rendering",
      badge: "Maplibre GL + fflate",
      sub: "Hardware-accelerated 60 FPS 3D extrusion engine.",
      metrics: [
        { label: "Decompression Engine", val: "fflate pure-JS (~2s in browser)" },
        { label: "Renderer", val: "WebGL GPU fill-extrusion shaders" },
        { label: "Simulators", val: "Non-linear EV charging BMS calculator" },
        { label: "Theme Engine", val: "Dynamic vector tile paint property swap" }
      ],
      details: "Client fetches compressed array buffer, decompresses via fflate, and hands polygons directly to WebGL vertex shaders."
    }
  ];

  let curr = $derived(stages[activeStage]);
</script>

<div class="my-10 bg-white border border-border rounded-xl shadow-2xs overflow-hidden font-sans">
  <!-- Top Bar Header -->
  <div class="bg-paper border-b border-border px-5 py-4 flex flex-wrap items-center justify-between gap-3">
    <div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono font-bold text-ink uppercase tracking-wider">Figure 1</span>
        <span class="text-xs text-ink-muted">&bull;</span>
        <span class="text-xs font-semibold text-ink">3D Digital Twin Architecture (525k Buildings)</span>
      </div>
      <p class="text-xs text-ink-muted mt-0.5">Interactive 5-Stage Spatial Data Engineering Pipeline</p>
    </div>

    <div class="flex items-center gap-1.5 bg-paper-mid p-1 rounded-lg border border-border">
      {#each stages as stage, idx}
        <button
          type="button"
          onclick={() => activeStage = idx}
          class="px-2.5 py-1 text-xs font-mono rounded transition-all cursor-pointer {activeStage === idx ? 'bg-ink text-white shadow-2xs font-semibold' : 'text-ink-muted hover:text-ink'}"
        >
          Stage {stage.id}
        </button>
      {/each}
    </div>
  </div>

  <!-- Main Display Body -->
  <div class="p-6 bg-paper-warm/50">
    <div class="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-border">
      <div>
        <h4 class="text-base font-bold text-ink font-serif">{curr.title}</h4>
        <p class="text-xs text-ink-muted mt-0.5">{curr.sub}</p>
      </div>
      <span class="text-xs font-mono px-2.5 py-1 bg-paper border border-border rounded text-ink font-medium">
        {curr.badge}
      </span>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
      {#each curr.metrics as m}
        <div class="bg-white p-3 rounded-lg border border-border">
          <span class="text-[11px] font-mono text-ink-muted block uppercase tracking-wider">{m.label}</span>
          <span class="text-xs font-mono font-semibold text-ink mt-1 block">{m.val}</span>
        </div>
      {/each}
    </div>

    <div class="bg-paper border border-border rounded-lg p-3.5 text-xs text-ink-light leading-relaxed">
      <strong class="font-semibold text-ink">Engineering Context:</strong> {curr.details}
    </div>
  </div>
</div>
