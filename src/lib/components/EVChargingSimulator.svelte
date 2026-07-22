<script>
  let batteryCapacity = $state(45); // kWh
  let chargerPower = $state(50); // kW
  let isDC = $state(true);
  let curPct = $state(20);
  let tgtPct = $state(90);

  let vehicles = [
    { name: "Tata Nexon EV", capacity: 30 },
    { name: "Tata Curvv.ev", capacity: 45 },
    { name: "MG ZS EV", capacity: 50.3 },
    { name: "Hyundai IONIQ 5", capacity: 72.6 }
  ];

  let chargers = [
    { name: "7.2 kW AC Type-2", power: 7.2, dc: false },
    { name: "30 kW DC Fast", power: 30, dc: true },
    { name: "50 kW DC Fast (CCS2)", power: 50, dc: true },
    { name: "120 kW Supercharger", power: 120, dc: true }
  ];

  let calculation = $derived.by(() => {
    let fastTimeMins = 0;
    let slowTimeMins = 0;
    
    if (isDC && tgtPct > 80) {
      // 1. Fast Phase (up to 80%)
      const fastKwh = batteryCapacity * (Math.min(80, tgtPct) - Math.min(80, curPct)) / 100;
      if (fastKwh > 0) {
        fastTimeMins = (fastKwh / chargerPower) * 60;
      }
      // 2. Slow Phase (80% to target)
      const slowKwh = batteryCapacity * (tgtPct - Math.max(80, curPct)) / 100;
      if (slowKwh > 0) {
        // Tapered BMS power is 20% of max power
        slowTimeMins = (slowKwh / (chargerPower * 0.2)) * 60;
      }
    } else {
      const kwhNeeded = batteryCapacity * Math.max(0, tgtPct - curPct) / 100;
      fastTimeMins = (kwhNeeded / chargerPower) * 60;
    }

    const totalMins = fastTimeMins + slowTimeMins;
    const hours = Math.floor(totalMins / 60);
    const mins = Math.round(totalMins % 60);

    return {
      fastTimeMins: Math.round(fastTimeMins),
      slowTimeMins: Math.round(slowTimeMins),
      totalMins: Math.round(totalMins),
      hours,
      mins
    };
  });
</script>

<div class="my-10 bg-white border border-border rounded-xl shadow-2xs overflow-hidden font-sans">
  <!-- Header -->
  <div class="bg-paper border-b border-border px-5 py-4 flex flex-wrap items-center justify-between gap-3">
    <div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono font-bold text-ink uppercase tracking-wider">Figure 3</span>
        <span class="text-xs text-ink-muted">&bull;</span>
        <span class="text-xs font-semibold text-ink">Non-Linear EV Battery Charging Simulator</span>
      </div>
      <p class="text-xs text-ink-muted mt-0.5">Calculates BMS cell protection taper phases (>80% State of Charge)</p>
    </div>
  </div>

  <div class="p-6 bg-paper-warm/50 grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Controls -->
    <div class="space-y-4">
      <div>
        <label for="vehicle-select" class="text-xs font-mono font-semibold text-ink block mb-1.5">Vehicle Profile</label>
        <div class="grid grid-cols-2 gap-2">
          {#each vehicles as v}
            <button
              type="button"
              onclick={() => batteryCapacity = v.capacity}
              class="px-2.5 py-1.5 text-xs font-mono rounded border text-left transition-all cursor-pointer {batteryCapacity === v.capacity ? 'bg-ink text-white border-ink font-semibold' : 'bg-white text-ink border-border hover:border-ink'}"
            >
              <div class="truncate">{v.name}</div>
              <div class="text-[10px] opacity-75">{v.capacity} kWh</div>
            </button>
          {/each}
        </div>
      </div>

      <div>
        <label for="charger-select" class="text-xs font-mono font-semibold text-ink block mb-1.5">Charger Type</label>
        <div class="grid grid-cols-2 gap-2">
          {#each chargers as c}
            <button
              type="button"
              onclick={() => { chargerPower = c.power; isDC = c.dc; }}
              class="px-2.5 py-1.5 text-xs font-mono rounded border text-left transition-all cursor-pointer {chargerPower === c.power ? 'bg-ink text-white border-ink font-semibold' : 'bg-white text-ink border-border hover:border-ink'}"
            >
              <div class="truncate">{c.name}</div>
              <div class="text-[10px] opacity-75">{c.dc ? 'DC Fast' : 'AC Standard'}</div>
            </button>
          {/each}
        </div>
      </div>

      <!-- Sliders -->
      <div class="space-y-3 pt-2">
        <div>
          <div class="flex justify-between items-center mb-1">
            <label for="cur-soc" class="text-xs font-mono text-ink-muted">Initial State of Charge (SoC)</label>
            <span class="text-xs font-mono font-bold text-ink">{curPct}%</span>
          </div>
          <input 
            id="cur-soc"
            type="range" 
            min="5" 
            max="75" 
            step="5" 
            bind:value={curPct}
            class="w-full h-1.5 bg-paper-mid rounded-lg appearance-none cursor-pointer accent-ink"
          />
        </div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label for="tgt-soc" class="text-xs font-mono text-ink-muted">Target State of Charge (SoC)</label>
            <span class="text-xs font-mono font-bold text-accent">{tgtPct}%</span>
          </div>
          <input 
            id="tgt-soc"
            type="range" 
            min="50" 
            max="100" 
            step="5" 
            bind:value={tgtPct}
            class="w-full h-1.5 bg-paper-mid rounded-lg appearance-none cursor-pointer accent-ink"
          />
        </div>
      </div>
    </div>

    <!-- Results Display -->
    <div class="bg-white border border-border rounded-lg p-5 flex flex-col justify-between">
      <div>
        <span class="text-[11px] font-mono text-ink-muted block uppercase tracking-wider mb-3">Estimated Charging Time</span>
        
        <div class="flex items-baseline gap-2 mb-4">
          <span class="text-3xl font-serif font-bold text-ink">
            {#if calculation.hours > 0}{calculation.hours}h {/if}{calculation.mins}m
          </span>
          <span class="text-xs font-mono text-ink-muted">total duration</span>
        </div>

        <div class="space-y-2.5 font-mono text-xs border-t border-border pt-3">
          <div class="flex justify-between items-center">
            <span class="text-ink-muted flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              Fast Phase ({curPct}% → {Math.min(80, tgtPct)}%):
            </span>
            <span class="font-semibold text-ink">{calculation.fastTimeMins} mins</span>
          </div>

          {#if isDC && tgtPct > 80}
            <div class="flex justify-between items-center">
              <span class="text-ink-muted flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                BMS Taper Phase (80% → {tgtPct}%):
              </span>
              <span class="font-semibold text-amber-700">{calculation.slowTimeMins} mins (5x Slowdown)</span>
            </div>
          {/if}
        </div>
      </div>

      <div class="mt-4 bg-paper-warm border border-border p-3 rounded text-[11px] text-ink-light leading-relaxed">
        <strong>BMS Physics Note:</strong> When charging above 80% on DC Fast Chargers, the Battery Management System (BMS) tapers current to prevent lithium plating and thermal degradation.
      </div>
    </div>
  </div>
</div>
