<script>
  // Svelte 5 state using runes
  let activeStage = $state(1);
  let viewMode = $state('diagram'); // 'diagram' | 'ascii'

  const stages = [
    {
      id: 1,
      title: "1. Input Datasets",
      subtitle: "Heterogeneous GTFS & Telemetry Ingestion",
      badge: "Ingestion",
      inputs: [
        "MTC Bus GTFS (routes.txt, trips.txt, stop_times.txt, frequencies.txt)",
        "CMRL Metro GTFS (routes.txt, trips.txt, stop_times.txt, parent_stations)",
        "GPS Telemetry (~5.5 GB CSV logs: vehicle IDs, lat/lon coordinates, speed vectors, timestamps)"
      ],
      details: "Converts raw static transit schedules and unstructured 5.5 GB GPS telemetry logs into standardized spatial data structures."
    },
    {
      id: 2,
      title: "2. Parallel Precomputations",
      subtitle: "GTFS & GPS Spatial ETL Pipeline",
      badge: "Precompute",
      scripts: [
        { name: "precompute_gtfs_metrics.py", task: "Filters by IST peak period, computes median headways & stop sequence distances." },
        { name: "precompute_gps_metrics.py", task: "Filters by UTC timestamp, builds 0.002° grid spatial index for O(1) candidate lookups & speed resolvers." }
      ],
      details: "Executes parallel spatial map-reduce workflows to aggregate raw telemetry and schedules into high-speed JSON data caches."
    },
    {
      id: 3,
      title: "3. Connectivity Engine",
      subtitle: "Multimodal RAPTOR & Scorecards",
      badge: "Core Engine",
      scripts: [
        { name: "build_connectivity.py", task: "Generates walking transfer links (< 200m), runs Multimodal RAPTOR routing, computes PTAL & ΔNHI scorecards, and clips against CMA boundary." }
      ],
      details: "Performs graph construction and shortest-path reachability scans across bus, metro, and suburban rail networks."
    },
    {
      id: 4,
      title: "4. Map Dashboard",
      subtitle: "Core GIS Visualizer (index.html)",
      badge: "GIS Interface",
      outputs: [
        "Stops Connectivity GeoJSON layer",
        "Metro Enriched GeoJSON layer",
        "Leaflet interactive map with KPI counters & sidebar bar charts"
      ],
      details: "Renders spatial accessibility indices (PTAL) across 500m grid cells with real-time period filtering."
    },
    {
      id: 5,
      title: "5. Performance Tracker",
      subtitle: "Operational Bottleneck Inspector (compare.html)",
      badge: "Analytics",
      outputs: [
        "Summary JSON metrics feed",
        "Red-Gray-Green operational delta scale",
        "Top 5 Service Bottlenecks ranking list"
      ],
      details: "Highlights severe transit reliability deficits (ΔNHI < -10) caused by real-world traffic congestion."
    }
  ];

  let curr = $derived(stages.find(s => s.id === activeStage));

  const asciiDiagram = `+-----------------------------------------------------------------------------------+
|                              1. RAW INPUT DATASETS                                |
|  - MTC Bus GTFS: routes.txt, trips.txt, stop_times.txt, frequencies.txt           |
|  - CMRL Metro GTFS: routes.txt, trips.txt, stop_times.txt, parent_stations        |
|  - GPS Telemetry: Raw coordinates, timestamps, vehicle IDs (~5.5 GB CSVs)        |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                        2. PERIOD-SPECIFIC PRECOMPUTATIONS                         |
|  [precompute_gtfs_metrics.py]                 [precompute_gps_metrics.py]         |
|  - Filter by active period (Local IST)        - Filter by active period (UTC)     |
|  - Calculate median peak headways            - Grid spatial index (O(1) lookups) |
|  - Reconstruct route stop distances           - Speed & Arrival visits resolver   |
+-----------------------------------------------------------------------------------+
                  |                                      |
                  v (gtfs_precomputed_{period}.json)     v (gps_precomputed_{period}.json)
+-----------------------------------------------------------------------------------+
|                          3. CONNECTIVITY MODELING ENGINE                          |
|  [build_connectivity.py]                                                          |
|  - Ingest precomputed schedule & empirical metrics & static layers                |
|  - Multimodal transfer graph generation (walking links < 200m)                    |
|  - Multimodal RAPTOR routing (hops to nearest terminals)                           |
|  - Calculate PTAL & NHI scorecard (Scheduled vs. GPS-Empirical)                    |
|  - Apply spatial clipping against CMA boundary polygon                            |
+-----------------------------------------------------------------------------------+
                  |
                  +----------------------------------+-----------------------------+
                  |                                  |                             |
                  v (stops connectivity GeoJSON)     v (metro enriched GeoJSON)    v (summary JSON)
+---------------------------------------------------+  +-------------------------------------------+
|       4. CORE MAP DASHBOARD (index.html)          |  |   5. PERFORMANCE TRACKER (compare.html)   |
| - Switch Period Dropdown toggles JS loads         |  | - Switch Period Dropdown recalculates deltas|
| - Render Leaflet layers (stops, routes, rail)     |  | - Colors stops on Red-Gray-Green scale    |
| - Render KPI counters and sidebar bar charts      |  | - Sidebar Top 5 Service Bottlenecks list  |
+---------------------------------------------------+  +-------------------------------------------+`;
</script>

<div class="my-10 bg-white border border-border rounded-xl shadow-2xs overflow-hidden font-sans">
  <!-- Minimal Header Matching Site Style -->
  <div class="border-b border-border bg-paper px-6 py-4 flex flex-wrap items-center justify-between gap-3">
    <div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono font-semibold text-ink-muted uppercase tracking-wider">Figure 1</span>
        <span class="text-xs font-mono text-ink-light bg-paper-mid border border-border px-2 py-0.5 rounded">
          Spatial ETL Pipeline
        </span>
      </div>
      <h4 class="text-sm font-sans font-semibold text-ink mt-1">
        Decoupled Multimodal GTFS & Telemetry Architecture
      </h4>
    </div>

    <div class="flex gap-1 bg-paper-mid p-1 rounded-md border border-border text-xs">
      <button
        type="button"
        onclick={() => viewMode = 'diagram'}
        class="px-3 py-1 font-sans font-medium rounded transition-colors cursor-pointer {viewMode === 'diagram' ? 'bg-ink text-white' : 'text-ink-muted hover:text-ink'}"
      >
        Interactive
      </button>
      <button
        type="button"
        onclick={() => viewMode = 'ascii'}
        class="px-3 py-1 font-mono font-medium rounded transition-colors cursor-pointer {viewMode === 'ascii' ? 'bg-ink text-white' : 'text-ink-muted hover:text-ink'}"
      >
        ASCII Flow
      </button>
    </div>
  </div>

  <div class="p-6 md:p-8 bg-paper">
    {#if viewMode === 'diagram'}
      <div class="space-y-6">
        <!-- Stage Selection Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {#each stages as stage}
            <button
              type="button"
              onclick={() => activeStage = stage.id}
              class="p-3 text-left rounded-lg border transition-all cursor-pointer flex flex-col justify-between gap-2 {activeStage === stage.id ? 'bg-white border-ink ring-1 ring-ink/10 shadow-xs' : 'bg-white/60 hover:bg-white border-border text-ink-muted'}"
            >
              <div class="flex items-center justify-between">
                <span class="w-5 h-5 rounded-full text-[11px] font-mono font-semibold flex items-center justify-center {activeStage === stage.id ? 'bg-ink text-white' : 'bg-paper-mid text-ink-muted'}">
                  {stage.id}
                </span>
                <span class="text-[10px] font-mono uppercase text-ink-muted">
                  {stage.badge}
                </span>
              </div>
              <div class="font-sans font-semibold text-xs text-ink line-clamp-1">
                {stage.title}
              </div>
            </button>
          {/each}
        </div>

        <!-- Active Stage Panel -->
        <div class="bg-white border border-border p-6 rounded-lg font-sans space-y-5 shadow-2xs">
          {#if curr}
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <div>
                <div class="text-xs font-mono text-ink-muted">Stage {curr.id} of 5 &bull; {curr.badge}</div>
                <h3 class="text-base font-bold text-ink mt-0.5">{curr.title}</h3>
                <p class="text-xs text-ink-muted font-sans mt-0.5">{curr.subtitle}</p>
              </div>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  disabled={activeStage === 1}
                  onclick={() => activeStage = Math.max(1, activeStage - 1)}
                  class="px-3 py-1 text-xs font-sans rounded bg-paper-warm hover:bg-paper-mid disabled:opacity-40 disabled:cursor-not-allowed text-ink border border-border cursor-pointer transition-colors"
                >
                  &larr; Previous
                </button>
                <button
                  type="button"
                  disabled={activeStage === 5}
                  onclick={() => activeStage = Math.min(5, activeStage + 1)}
                  class="px-3 py-1 text-xs font-sans rounded bg-ink hover:bg-ink-light disabled:opacity-40 disabled:cursor-not-allowed text-white cursor-pointer transition-colors"
                >
                  Next &rarr;
                </button>
              </div>
            </div>

            <p class="text-xs md:text-sm text-ink-light leading-relaxed font-sans">
              {curr.details}
            </p>

            <!-- Detailed Ingestion Files or Scripts -->
            {#if curr.inputs}
              <div class="space-y-2 pt-1">
                <h5 class="text-xs font-mono font-semibold text-ink-muted uppercase tracking-wider">Input Data Streams</h5>
                <div class="space-y-1.5">
                  {#each curr.inputs as inp}
                    <div class="text-xs font-mono text-ink-light bg-paper-warm px-3 py-2 rounded border border-border flex items-center gap-2">
                      <span class="w-1.5 h-1.5 rounded-full bg-ink-muted"></span>
                      {inp}
                    </div>
                  {/each}
                </div>
              </div>
            {/if}

            {#if curr.scripts}
              <div class="space-y-2 pt-1">
                <h5 class="text-xs font-mono font-semibold text-ink-muted uppercase tracking-wider">Python Execution Modules</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {#each curr.scripts as scr}
                    <div class="bg-paper-warm p-3 rounded border border-border space-y-1">
                      <div class="text-xs font-mono font-bold text-ink">[{scr.name}]</div>
                      <div class="text-xs text-ink-light font-sans leading-relaxed">{scr.task}</div>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}

            {#if curr.outputs}
              <div class="space-y-2 pt-1">
                <h5 class="text-xs font-mono font-semibold text-ink-muted uppercase tracking-wider">Generated Artifacts & Output Layers</h5>
                <div class="space-y-1.5">
                  {#each curr.outputs as out}
                    <div class="text-xs font-mono text-ink-light bg-paper-warm px-3 py-2 rounded border border-border flex items-center gap-2">
                      <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      {out}
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          {/if}
        </div>
      </div>
    {:else}
      <!-- Monospace ASCII View -->
      <div class="space-y-3">
        <div class="flex items-center justify-between text-xs text-ink-muted font-mono">
          <span>Decoupled Pipeline Architecture (ASCII Schematic)</span>
          <span>5-Stage Flow</span>
        </div>
        <pre class="bg-paper-warm text-ink p-5 rounded-lg font-mono text-[11px] md:text-xs overflow-x-auto whitespace-pre leading-relaxed border border-border">{asciiDiagram}</pre>
      </div>
    {/if}
  </div>
</div>
