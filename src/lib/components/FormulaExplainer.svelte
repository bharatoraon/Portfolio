<script>
  // Svelte 5 runes
  let activeTab = $state('ptal');

  // PTAL Simulator States
  let walkDistance = $state(200);
  let headway = $state(15);
  let mode = $state('bus');

  let margin = $derived(
    mode === 'bus' ? 2.0 : (mode === 'metro' ? 0.75 : 1.50)
  );

  let walkTime = $derived(walkDistance / 80);
  let swt = $derived(0.5 * headway + margin);
  let accessTime = $derived(walkTime + swt);
  let accessibilityIndex = $derived((30.0 / accessTime).toFixed(2));

  // NHI Simulator States
  let cv = $state(0.4);
  let speed = $state(18);
  let routesCount = $state(3);

  const sDirectness = 85;
  const sTransfer = 70;
  const sMultimodal = 0;

  let sReliability = $derived(
    Math.max(0.0, Math.min(100.0, 100.0 * ((1.2 - cv) / 1.0)))
  );
  let sSpeed = $derived(
    Math.max(0.0, Math.min(100.0, 100.0 * ((speed - 6.0) / 19.0)))
  );
  let sResilience = $derived(
    100.0 * (1.0 - Math.exp(-0.3 * (routesCount - 1)))
  );

  let nhiSch = $derived(
    0.3 * sDirectness + 0.3 * sTransfer + 0.2 * sMultimodal + 0.2 * sResilience
  );
  let nhiGps = $derived(
    0.3 * sDirectness + 0.3 * sTransfer + 0.2 * sMultimodal + 0.1 * sReliability + 0.1 * sSpeed
  );
  let deltaNhi = $derived(nhiGps - nhiSch);

  let deltaClass = $derived(
    deltaNhi <= -10 ? { label: 'Much Worse 🔴', color: 'text-red-600 bg-red-50 border-red-200' } :
    (deltaNhi <= -3 ? { label: 'Worse 🟡', color: 'text-amber-600 bg-amber-50 border-amber-200' } :
    (deltaNhi < 3 ? { label: 'On Schedule ⚪', color: 'text-ink-muted bg-paper-mid border-border' } :
    (deltaNhi < 10 ? { label: 'Better 🟢', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' } :
    { label: 'Much Better 🟢', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' })))
  );

  let selectedVar = $state(/** @type {string|null} */ (null));

  /** @type {Record<string, {name: string, formula: string, description: string}>} */
  const variables = {
    walktime: {
      name: 'WalkTime (Walking Access Time)',
      formula: 'WalkTime = Distance / 80',
      description: 'The time taken to walk to the stop. Calculated using the straight-line or projected network distance in meters, divided by a standard walking speed of 80 meters per minute (approx. 4.8 km/h).'
    },
    swt: {
      name: 'SWT (Scheduled Wait Time)',
      formula: 'SWT = (0.5 × Headway) + ModeMargin',
      description: 'The expected time a commuter waits at a stop. It assumes average wait time is half the vehicle headway, added to a mode-specific operational buffer (2 mins for bus, 45 seconds for metro) representing transit boarding overhead.'
    },
    ai: {
      name: 'AI (Accessibility Index)',
      formula: 'AI = (30 / AT_dom) + 0.5 × Sum(30 / AT_k)',
      description: 'The composite accessibility score for a stop. The route with the lowest access time (dominant) is weighted fully, while all other routes are halved (50%) to model the diminishing returns of duplicate options.'
    },
    cv: {
      name: 'CV (Coefficient of Variation)',
      formula: 'CV = Standard Deviation / Mean',
      description: 'A mathematical measure of headway reliability. A CV of 0 means buses arrive exactly on schedule (perfectly regular). A CV above 1.0 indicates severe bus bunching, where multiple buses arrive together followed by a long gap.'
    },
    speed: {
      name: 'V_avg (Average Travel Speed)',
      formula: 'Observed speed from GPSTelemetry',
      description: 'The actual speed of transit vehicles along the segment. Segment speeds below 6 km/h (severe traffic) receive zero score, while speeds above 25 km/h receive a maximum score of 100.'
    },
    resilience: {
      name: 'S_resilience (Network Resilience)',
      formula: 'S_resilience = 100 × (1 - e^(-0.3 × (RoutesCount - 1)))',
      description: 'Represents schedule redundancy. A stop with more overlapping routes is less vulnerable to single-route breakdowns. The score models logarithmic utility returns as routes count increases.'
    }
  };

  function selectVar(/** @type {string} */ key) {
    selectedVar = key;
  }
</script>

<div class="my-8 bg-white border border-border rounded-xl shadow-sm overflow-hidden font-sans">
  <div class="border-b border-border bg-paper flex items-center justify-between px-6 py-3">
    <div class="flex gap-2">
      <button
        onclick={() => activeTab = 'ptal'}
        class="px-4 py-2 text-xs font-semibold rounded-lg transition-all border {activeTab === 'ptal' ? 'bg-white text-ink border-border shadow-xs' : 'text-ink-muted border-transparent hover:text-ink'}"
      >
        1. PTAL Access Time & Weighting
      </button>
      <button
        onclick={() => activeTab = 'nhi'}
        class="px-4 py-2 text-xs font-semibold rounded-lg transition-all border {activeTab === 'nhi' ? 'bg-white text-ink border-border shadow-xs' : 'text-ink-muted border-transparent hover:text-ink'}"
      >
        2. NHI Schedule vs GPS Performance
      </button>
    </div>
    <span class="text-xs text-ink-muted font-mono hidden md:inline">Click variables for details</span>
  </div>

  <div class="p-6">
    {#if activeTab === 'ptal'}
      <div class="space-y-6">
        <div>
          <h4 class="text-sm font-semibold text-ink mb-1">Public Transport Accessibility Level (PTAL) Model</h4>
          <p class="text-xs text-ink-muted">
            The PTAL score quantifies walking access and wait times to nearby transit stops. Click on highlighted variables below to see their definition.
          </p>
        </div>

        <div class="bg-paper-warm border border-border p-4 rounded-lg font-serif italic text-sm md:text-base text-ink flex flex-wrap items-center gap-x-2 gap-y-1 select-none">
          <span>AT =</span>
          <button
            onclick={() => selectVar('walktime')}
            class="px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800 font-sans font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
          >
            WalkTime
          </button>
          <span>+</span>
          <button
            onclick={() => selectVar('swt')}
            class="px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-800 font-sans font-semibold hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            SWT
          </button>
          <span class="ml-4 font-sans font-normal text-xs text-ink-muted">where</span>
          <button
            onclick={() => selectVar('ai')}
            class="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-sans font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            AI Score = (30 / AT_dom) + 0.5 × ∑(30 / AT_k)
          </button>
        </div>

        {#if selectedVar && variables[selectedVar]}
          <div class="bg-paper border-l-4 border-accent p-4 rounded-r-lg shadow-2xs space-y-1 transition-all">
            <div class="flex items-center justify-between">
              <h5 class="text-xs font-bold text-ink font-mono uppercase">{variables[selectedVar].name}</h5>
              <button onclick={() => selectedVar = null} class="text-xs text-ink-muted hover:text-ink">Close ✕</button>
            </div>
            <p class="text-xs font-mono text-accent font-semibold">{variables[selectedVar].formula}</p>
            <p class="text-xs text-ink-light leading-relaxed">{variables[selectedVar].description}</p>
          </div>
        {/if}

        <div class="border-t border-border pt-5 space-y-4">
          <h5 class="text-xs uppercase tracking-wider font-mono font-semibold text-ink">Simulate PTAL Access Score</h5>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div class="flex justify-between text-xs mb-1.5">
                <span class="text-ink-light">Walking Distance</span>
                <span class="font-mono font-bold text-ink">{walkDistance} m</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                bind:value={walkDistance}
                class="w-full accent-accent cursor-pointer"
              />
              <span class="text-[10px] text-ink-muted">Walk time: {walkTime.toFixed(1)} mins</span>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1.5">
                <span class="text-ink-light">Scheduled Headway</span>
                <span class="font-mono font-bold text-ink">{headway} mins</span>
              </div>
              <input
                type="range"
                min="3"
                max="45"
                step="1"
                bind:value={headway}
                class="w-full accent-accent cursor-pointer"
              />
              <span class="text-[10px] text-ink-muted">Wait time (SWT): {swt.toFixed(1)} mins</span>
            </div>

            <div>
              <label for="transit-mode-select" class="block text-xs text-ink-light mb-1.5">Transit Mode Margin</label>
              <select
                id="transit-mode-select"
                bind:value={mode}
                class="w-full bg-paper border border-border rounded p-2 text-xs text-ink focus:outline-none focus:border-accent"
              >
                <option value="bus">Bus (+2.00 min margin)</option>
                <option value="metro">Metro Rail (+0.75 min margin)</option>
                <option value="suburban">Suburban Rail (+1.50 min margin)</option>
              </select>
              <span class="text-[10px] text-ink-muted">Mode operational overhead</span>
            </div>
          </div>

          <div class="bg-paper p-4 rounded-lg border border-border flex items-center justify-between mt-4">
            <div>
              <span class="text-xs text-ink-muted block">Total Access Time (AT)</span>
              <span class="text-lg font-bold font-mono text-ink">{accessTime.toFixed(1)} minutes</span>
            </div>
            <div class="text-right">
              <span class="text-xs text-ink-muted block">Calculated AI Contribution</span>
              <span class="text-lg font-bold font-mono text-accent">+{accessibilityIndex} index points</span>
            </div>
          </div>
        </div>
      </div>

    {:else if activeTab === 'nhi'}
      <div class="space-y-6">
        <div>
          <h4 class="text-sm font-semibold text-ink mb-1">Network Health Index (NHI): Schedule vs. Observed GPS</h4>
          <p class="text-xs text-ink-muted">
            Static schedules assume 100% reliability. This model calculates the performance gap when actual vehicle telemetry is incorporated.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 select-none">
          <div class="bg-paper p-4 rounded-lg border border-border space-y-2">
            <h5 class="text-xs font-mono font-bold text-ink-muted uppercase">NHI Scheduled (Static Model)</h5>
            <p class="text-xs font-serif italic text-ink">
              0.3 × S_dir + 0.3 × S_trans + 0.2 × S_multi + <button onclick={() => selectVar('resilience')} class="text-indigo-600 font-sans font-semibold underline underline-offset-2">0.2 × S_resilience</button>
            </p>
            <div class="pt-2 border-t border-border flex justify-between items-baseline">
              <span class="text-xs text-ink-muted">Static Score</span>
              <span class="text-base font-mono font-bold text-ink">{nhiSch.toFixed(1)} / 100</span>
            </div>
          </div>

          <div class="bg-paper p-4 rounded-lg border border-accent/40 space-y-2">
            <h5 class="text-xs font-mono font-bold text-accent uppercase">NHI GPS (Observed Model)</h5>
            <p class="text-xs font-serif italic text-ink">
              0.3 × S_dir + 0.3 × S_trans + 0.2 × S_multi + <button onclick={() => selectVar('cv')} class="text-amber-600 font-sans font-semibold underline underline-offset-2">0.1 × S_reliability</button> + <button onclick={() => selectVar('speed')} class="text-emerald-600 font-sans font-semibold underline underline-offset-2">0.1 × S_speed</button>
            </p>
            <div class="pt-2 border-t border-border flex justify-between items-baseline">
              <span class="text-xs text-ink-muted">Dynamic Telemetry Score</span>
              <span class="text-base font-mono font-bold text-accent">{nhiGps.toFixed(1)} / 100</span>
            </div>
          </div>
        </div>

        {#if selectedVar && variables[selectedVar]}
          <div class="bg-paper border-l-4 border-accent p-4 rounded-r-lg shadow-2xs space-y-1 transition-all">
            <div class="flex items-center justify-between">
              <h5 class="text-xs font-bold text-ink font-mono uppercase">{variables[selectedVar].name}</h5>
              <button onclick={() => selectedVar = null} class="text-xs text-ink-muted hover:text-ink">Close ✕</button>
            </div>
            <p class="text-xs font-mono text-accent font-semibold">{variables[selectedVar].formula}</p>
            <p class="text-xs text-ink-light leading-relaxed">{variables[selectedVar].description}</p>
          </div>
        {/if}

        <div class="border-t border-border pt-5 space-y-4">
          <h5 class="text-xs uppercase tracking-wider font-mono font-semibold text-ink">Adjust Real-World Telemetry Variables</h5>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div class="flex justify-between text-xs mb-1.5">
                <span class="text-ink-light">Headway CV (Irregularity)</span>
                <span class="font-mono font-bold text-ink">{cv.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.5"
                step="0.05"
                bind:value={cv}
                class="w-full accent-accent cursor-pointer"
              />
              <span class="text-[10px] text-ink-muted">0.0 = Regular, >1.0 = Bunching</span>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1.5">
                <span class="text-ink-light">Average Bus Speed</span>
                <span class="font-mono font-bold text-ink">{speed} km/h</span>
              </div>
              <input
                type="range"
                min="4"
                max="35"
                step="1"
                bind:value={speed}
                class="w-full accent-accent cursor-pointer"
              />
              <span class="text-[10px] text-ink-muted">&lt;6 km/h = Severe Traffic</span>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1.5">
                <span class="text-ink-light">Overlapping Routes</span>
                <span class="font-mono font-bold text-ink">{routesCount} routes</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                bind:value={routesCount}
                class="w-full accent-accent cursor-pointer"
              />
              <span class="text-[10px] text-ink-muted">Network redundancy</span>
            </div>
          </div>

          <div class="bg-paper p-4 rounded-lg border border-border flex items-center justify-between mt-4">
            <div>
              <span class="text-xs text-ink-muted block">Performance Gap (Δ NHI)</span>
              <span class="text-base font-bold font-mono text-ink">
                {deltaNhi >= 0 ? '+' : ''}{deltaNhi.toFixed(1)} points
              </span>
            </div>
            <div>
              <span class="text-xs text-ink-muted block text-right">Status Classification</span>
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold border font-mono mt-0.5 {deltaClass.color}">
                {deltaClass.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
