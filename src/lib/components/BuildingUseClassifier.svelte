<script>
  let height = $state(18.5);
  let area = $state(450);

  let floors = $derived(Math.max(1, Math.round(height / 3.5)));

  let classification = $derived.by(() => {
    if (floors === 1) {
      if (area < 150) return { title: "Residential (Low Density)", code: "RL", color: "bg-amber-400 text-amber-950 border-amber-500" };
      if (area < 600) return { title: "Commercial / Retail", code: "CR", color: "bg-blue-500 text-white border-blue-600" };
      return { title: "Industrial / Warehouse", code: "IW", color: "bg-purple-500 text-white border-purple-600" };
    } else if (floors <= 3) {
      if (area < 250) return { title: "Residential / Independent House", code: "RH", color: "bg-amber-400 text-amber-950 border-amber-500" };
      if (area < 600) return { title: "Apartments / Mixed-Use", code: "AM", color: "bg-emerald-500 text-white border-emerald-600" };
      return { title: "Commercial / Office / Retail", code: "CO", color: "bg-blue-600 text-white border-blue-700" };
    } else if (floors <= 6) {
      if (area < 500) return { title: "Apartments (Medium Rise)", code: "AM", color: "bg-emerald-600 text-white border-emerald-700" };
      if (area < 1200) return { title: "Commercial / Office", code: "CO", color: "bg-blue-600 text-white border-blue-700" };
      return { title: "Institutional / Public Building", code: "IP", color: "bg-red-500 text-white border-red-600" };
    } else {
      if (area < 800) return { title: "Apartments (High Rise)", code: "AH", color: "bg-emerald-700 text-white border-emerald-800" };
      return { title: "Commercial Office Tower / Corporate Hub", code: "CT", color: "bg-blue-800 text-white border-blue-900" };
    }
  });

  let geojsonSnippet = $derived(`{
  "type": "Feature",
  "properties": {
    "h": ${height.toFixed(1)},
    "a": ${Math.round(area)},
    "u": "${classification.code}"
  }
}`);
</script>

<div class="my-10 bg-white border border-border rounded-xl shadow-2xs overflow-hidden font-sans">
  <!-- Header -->
  <div class="bg-paper border-b border-border px-5 py-4 flex flex-wrap items-center justify-between gap-3">
    <div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono font-bold text-ink uppercase tracking-wider">Figure 2</span>
        <span class="text-xs text-ink-muted">&bull;</span>
        <span class="text-xs font-semibold text-ink">Urban Heuristic Rule-Tree Simulator</span>
      </div>
      <p class="text-xs text-ink-muted mt-0.5">Test real-time building floor count & UDPFI classification</p>
    </div>
  </div>

  <div class="p-6 bg-paper-warm/50 grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Controls -->
    <div class="space-y-5">
      <div>
        <div class="flex justify-between items-center mb-1.5">
          <label for="height-range" class="text-xs font-mono font-semibold text-ink">Building Height</label>
          <span class="text-xs font-mono font-bold text-accent">{height}m ({floors} Floors)</span>
        </div>
        <input 
          id="height-range"
          type="range" 
          min="3" 
          max="45" 
          step="0.5" 
          bind:value={height}
          class="w-full h-1.5 bg-paper-mid rounded-lg appearance-none cursor-pointer accent-ink"
        />
        <div class="flex justify-between text-[10px] font-mono text-ink-muted mt-1">
          <span>3.0m (1 Flr)</span>
          <span>21m (6 Flrs)</span>
          <span>45m (13 Flrs)</span>
        </div>
      </div>

      <div>
        <div class="flex justify-between items-center mb-1.5">
          <label for="area-range" class="text-xs font-mono font-semibold text-ink">Footprint Area</label>
          <span class="text-xs font-mono font-bold text-accent">{area} m²</span>
        </div>
        <input 
          id="area-range"
          type="range" 
          min="50" 
          max="1500" 
          step="25" 
          bind:value={area}
          class="w-full h-1.5 bg-paper-mid rounded-lg appearance-none cursor-pointer accent-ink"
        />
        <div class="flex justify-between text-[10px] font-mono text-ink-muted mt-1">
          <span>50 m²</span>
          <span>600 m²</span>
          <span>1500 m²</span>
        </div>
      </div>

      <!-- Classification Result -->
      <div class="bg-white p-4 rounded-lg border border-border">
        <span class="text-[11px] font-mono text-ink-muted block uppercase tracking-wider mb-2">UDPFI Urban Land-Use Class</span>
        <div class="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold border shadow-2xs {classification.color}">
          <span>[{classification.code}]</span>
          <span>{classification.title}</span>
        </div>
      </div>
    </div>

    <!-- Output Code JSON -->
    <div class="bg-white border border-border rounded-lg p-4 flex flex-col justify-between">
      <div>
        <span class="text-[11px] font-mono text-ink-muted block uppercase tracking-wider mb-2">Compact GeoJSON Output (96% Compressed)</span>
        <pre class="bg-paper-warm text-ink p-3 rounded border border-border font-mono text-xs overflow-x-auto leading-relaxed"><code>{geojsonSnippet}</code></pre>
      </div>
      <p class="text-[11px] font-sans text-ink-muted mt-3">
        Short keys (<code class="font-mono text-ink">h</code>, <code class="font-mono text-ink">a</code>, <code class="font-mono text-ink">u</code>) and 2-character land-use codes allow Maplibre GL vertex shaders to style 525,000 extruded 3D features dynamically in WebGL memory.
      </p>
    </div>
  </div>
</div>
