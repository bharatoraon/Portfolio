<script>
  let copied = $state(false);

  let { 
    filename = "spatial_grid_indexing.py",
    language = "PYTHON 3.11",
    complexity = "O(1) Spatial Cell Lookup",
    code = `# Grid size definition (~220m cells near Chennai lat ~13N)
grid_size = 0.002
grid = defaultdict(list)

# Ingest and bin stops into spatial cells
for stop in stops_raw["features"]:
    lon, lat = stop["geometry"]["coordinates"]
    stop_node = {
        "id": stop["properties"]["Stop Id"],
        "name": stop["properties"]["Stop Name"],
        "lon": lon, 
        "lat": lat,
        "routes": set(route_list(stop["properties"]["route name"]))
    }
    
    # Calculate cell keys
    cell = (int(lon / grid_size), int(lat / grid_size))
    grid[cell].append(stop_node)`
  } = $props();

  function copyCode() {
    navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => copied = false, 2000);
  }
</script>

<div class="my-8 bg-white border border-border rounded-xl shadow-2xs overflow-hidden font-sans">
  <!-- Minimal Header -->
  <div class="bg-paper border-b border-border px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 select-none">
    <div class="flex items-center gap-2.5">
      <span class="text-xs font-mono font-bold text-ink">{filename}</span>
      <span class="text-[11px] font-mono text-ink-muted bg-paper-mid px-2 py-0.5 rounded border border-border">
        {language}
      </span>
    </div>

    <div class="flex items-center gap-3">
      <span class="text-xs font-mono text-ink-muted hidden sm:inline">{complexity}</span>
      <button
        type="button"
        onclick={copyCode}
        class="px-2.5 py-1 text-xs font-mono text-ink-muted hover:text-ink bg-white border border-border hover:border-ink rounded transition-colors cursor-pointer flex items-center gap-1.5"
      >
        {#if copied}
          <span class="text-emerald-600 font-semibold">Copied!</span>
        {:else}
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy</span>
        {/if}
      </button>
    </div>
  </div>

  <!-- Code Content with Line Numbers -->
  <div class="bg-paper-warm text-ink p-5 font-mono text-xs overflow-x-auto leading-relaxed border-t border-border">
    <div class="table w-full">
      {#each code.split('\n') as line, idx}
        <div class="table-row hover:bg-paper-mid/60 transition-colors">
          <div class="table-cell text-right pr-4 select-none text-ink-muted opacity-40 w-8">{idx + 1}</div>
          <div class="table-cell whitespace-pre">{line}</div>
        </div>
      {/each}
    </div>
  </div>
</div>
