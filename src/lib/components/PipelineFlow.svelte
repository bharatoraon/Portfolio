<script>
  // Svelte 5 state using runes
  let activeStage = $state(1);
  let viewMode = $state('diagram'); // 'diagram' | 'ascii'

  const stages = [
    {
      id: 1,
      title: "1. Raw Input Datasets",
      subtitle: "Heterogeneous GTFS & Telemetry Ingestion",
      icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21 3.582 4 8 4s8-1.79 8-4",
      badge: "Ingestion Layer",
      color: "border-blue-500 bg-blue-50/50 text-blue-700",
      inputs: [
        "MTC Bus GTFS (routes.txt, trips.txt, stop_times.txt, frequencies.txt)",
        "CMRL Metro GTFS (routes.txt, trips.txt, stop_times.txt, parent_stations)",
        "GPS Telemetry (~5.5 GB CSVs: Vehicle IDs, Lat/Lon coordinates, speed vectors, timestamps)"
      ],
      details: "Converts raw static transit schedules and unstructured 5.5 GB GPS telemetry logs into standardized spatial spatial data structures."
    },
    {
      id: 2,
      title: "2. Parallel Precomputations",
      subtitle: "GTFS & GPS Spatial ETL Pipeline",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      badge: "ETL & Precompute",
      color: "border-purple-500 bg-purple-50/50 text-purple-700",
      scripts: [
        { name: "precompute_gtfs_metrics.py", task: "Filters by IST peak period, computes median headways & stop sequence distances." },
        { name: "precompute_gps_metrics.py", task: "Filters by UTC timestamp, builds 0.002° grid spatial index for O(1) candidate lookups & speed resolvers." }
      ],
      details: "Executes parallel spatial map-reduce workflows to aggregate raw telemetry and schedules into high-speed JSON data caches."
    },
    {
      id: 3,
      title: "3. Connectivity Modeling Engine",
      subtitle: "Multimodal RAPTOR & Scorecard Generator",
      icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
      badge: "Core Engine",
      color: "border-emerald-500 bg-emerald-50/50 text-emerald-700",
      scripts: [
        { name: "build_connectivity.py", task: "Generates walking transfer links (< 200m), runs Multimodal RAPTOR routing, computes PTAL & ΔNHI scorecards, and clips against CMA boundary." }
      ],
      details: "Performs graph construction and shortest-path reachability scans across bus, metro, and suburban rail networks."
    },
    {
      id: 4,
      title: "4. Spatial Map Dashboard",
      subtitle: "Core GIS Visualizer (index.html)",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      badge: "Map Interface",
      color: "border-amber-500 bg-amber-50/50 text-amber-700",
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
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      badge: "Analytics Layer",
      color: "border-red-500 bg-red-50/50 text-red-700",
      outputs: [
        "Summary JSON metrics feed",
        "Red-Gray-Green operational delta scale",
        "Top 5 Service Bottlenecks ranking list"
      ],
      details: "Highlights severe transit reliability deficits (ΔNHI < -10) caused by real-world traffic congestion."
    }
  ];

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

<div class="my-10 bg-white border border-border rounded-xl shadow-sm overflow-hidden font-sans">
  <!-- Header with View Mode Toggle -->
  <div class="border-b border-border bg-paper flex flex-wrap items-center justify-between px-6 py-4 gap-3">
    <div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono font-bold text-ink-muted">System Architecture</span>
        <span class="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-blue-100 text-blue-800 border border-blue-200">
          Decoupled Spatial ETL Pipeline
        </span>
      </div>
      <h4 class="text-xs md:text-sm font-sans font-semibold text-ink mt-1">
        Multimodal GTFS & Telemetry Data Processing Architecture
      </h4>
    </div>

    <div class="flex gap-1.5 p-1 bg-paper-mid rounded-lg border border-border text-xs">
      <button
        type="button"
        onclick={() => viewMode = 'diagram'}
        class="px-3 py-1.5 font-semibold rounded-md transition-all cursor-pointer {viewMode === 'diagram' ? 'bg-white text-ink shadow-xs border border-border' : 'text-ink-muted hover:text-ink border border-transparent'}"
      >
        Interactive Architecture
      </button>
      <button
        type="button"
        onclick={() => viewMode = 'ascii'}
        class="px-3 py-1.5 font-mono font-semibold rounded-md transition-all cursor-pointer {viewMode === 'ascii' ? 'bg-white text-ink shadow-xs border border-border' : 'text-ink-muted hover:text-ink border border-transparent'}"
      >
        ASCII Flow
      </button>
    </div>
  </div>

  <div class="p-6 md:p-8">
    {#if viewMode === 'diagram'}
      <!-- Interactive Pipeline Visualizer -->
      <div class="space-y-6">
        <!-- Stage Stepper Tabs -->
        <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {#each stages as stage}
            <button
              type="button"
              onclick={() => activeStage = stage.id}
              class="p-3 text-left rounded-lg border transition-all cursor-pointer flex flex-col justify-between gap-2 {activeStage === stage.id ? 'bg-white border-blue-600 ring-2 ring-blue-500/20 shadow-sm' : 'bg-paper hover:bg-white border-border'}"
            >
              <div class="flex items-center justify-between">
                <span class="w-6 h-6 rounded-full text-xs font-mono font-bold flex items-center justify-center {activeStage === stage.id ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}">
                  {stage.id}
                </span>
                <span class="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border {stage.color}">
                  {stage.badge}
                </span>
              </div>
              <div class="font-sans font-semibold text-xs text-ink line-clamp-1">
                {stage.title}
              </div>
            </button>
          {/each}
        </div>

        <!-- Flow Visualizer Cards -->
        <div class="relative bg-slate-900 text-slate-100 p-6 rounded-xl font-sans space-y-6 shadow-inner border border-slate-800">
          {@const curr = stages.find(s => s.id === activeStage)}
          {#if curr}
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span class="text-xs font-mono text-blue-400 font-semibold">{curr.badge} &bull; Stage {curr.id} of 5</span>
                <h3 class="text-base md:text-lg font-bold text-white mt-0.5">{curr.title}</h3>
                <p class="text-xs text-slate-400 font-mono mt-0.5">{curr.subtitle}</p>
              </div>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  disabled={activeStage === 1}
                  onclick={() => activeStage = Math.max(1, activeStage - 1)}
                  class="px-3 py-1.5 text-xs font-mono rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 cursor-pointer"
                >
                  &larr; Prev
                </button>
                <button
                  type="button"
                  disabled={activeStage === 5}
                  onclick={() => activeStage = Math.min(5, activeStage + 1)}
                  class="px-3 py-1.5 text-xs font-mono rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white border border-blue-500 cursor-pointer"
                >
                  Next &rarr;
                </button>
              </div>
            </div>

            <p class="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
              {curr.details}
            </p>

            <!-- Detailed Ingestion Files or Scripts -->
            {#if curr.inputs}
              <div class="space-y-2 pt-2">
                <h5 class="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">Input Data Streams</h5>
                <ul class="space-y-1.5">
                  {#each curr.inputs as inp}
                    <li class="text-xs font-mono text-emerald-300 bg-slate-800/80 px-3 py-2 rounded border border-slate-700 flex items-center gap-2">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      {inp}
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}

            {#if curr.scripts}
              <div class="space-y-2 pt-2">
                <h5 class="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">Python Execution Modules</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {#each curr.scripts as scr}
                    <div class="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-1">
                      <div class="text-xs font-mono font-bold text-purple-300">[{scr.name}]</div>
                      <div class="text-xs text-slate-300 font-sans leading-relaxed">{scr.task}</div>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}

            {#if curr.outputs}
              <div class="space-y-2 pt-2">
                <h5 class="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">Generated Artifacts & Output Layers</h5>
                <ul class="space-y-1.5">
                  {#each curr.outputs as out}
                    <li class="text-xs font-mono text-amber-300 bg-slate-800/80 px-3 py-2 rounded border border-slate-700 flex items-center gap-2">
                      <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      {out}
                    </li>
                  {/each}
                </ul>
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
          <span>5-Stage Execution Flow</span>
        </div>
        <pre class="bg-slate-900 text-slate-100 p-5 rounded-xl font-mono text-[11px] md:text-xs overflow-x-auto whitespace-pre leading-relaxed shadow-inner border border-slate-800">{asciiDiagram}</pre>
      </div>
    {/if}
  </div>
</div>
