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
    deltaNhi <= -10 ? { label: 'Severe Delay', color: 'text-red-700 bg-red-50 border-red-200' } :
    (deltaNhi <= -3 ? { label: 'Minor Delay', color: 'text-amber-700 bg-amber-50 border-amber-200' } :
    (deltaNhi < 3 ? { label: 'On Schedule', color: 'text-slate-700 bg-slate-100 border-slate-200' } :
    (deltaNhi < 10 ? { label: 'Minor Gain', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' } :
    { label: 'Optimal', color: 'text-emerald-800 bg-emerald-100 border-emerald-300' })))
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
      formula: 'Observed speed from GPS Telemetry',
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

<div class="my-10 bg-white border border-border rounded-xl shadow-sm overflow-hidden font-sans">
  <!-- Academic Header -->
  <div class="border-b border-border bg-paper flex flex-wrap items-center justify-between px-6 py-3.5 gap-3">
    <div class="flex items-center gap-2">
      <span class="text-xs font-mono font-bold text-ink-muted">Figure 2</span>
      <h4 class="text-xs md:text-sm font-sans font-semibold text-ink">
        Interactive Access Time & Performance Gap Model
      </h4>
    </div>
    <div class="flex gap-2">
      <button
        onclick={() => activeTab = 'ptal'}
        class="px-3 py-1.5 text-xs font-semibold rounded-md transition-all border {activeTab === 'ptal' ? 'bg-white text-ink border-border shadow-xs' : 'text-ink-muted border-transparent hover:text-ink'}"
      >
        PTAL Access Time Model
      </button>
      <button
        onclick={() => activeTab = 'nhi'}
        class="px-3 py-1.5 text-xs font-semibold rounded-md transition-all border {activeTab === 'nhi' ? 'bg-white text-ink border-border shadow-xs' : 'text-ink-muted border-transparent hover:text-ink'}"
      >
        Network Health Index (ΔNHI)
      </button>
    </div>
  </div>

  <div class="p-6 md:p-8">
    {#if activeTab === 'ptal'}
      <div class="space-y-6">
        <div>
          <h3 class="text-sm md:text-base font-semibold text-ink mb-1">
            Public Transport Accessibility Level (PTAL)
          </h3>
          <p class="text-xs text-ink-muted leading-relaxed">
            Models walk time to stop and scheduled wait time ($SWT$) based on headway and mode buffer.
          </p>
        </div>

        <!-- Formula interactive diagram -->
        <div class="bg-slate-900 text-slate-100 p-5 rounded-lg font-mono text-xs overflow-x-auto shadow-inner space-y-2">
          <div class="text-slate-400 border-b border-slate-800 pb-2 flex justify-between">
            <span>Mathematical Formula</span>
            <span>Variable Inspector (Click to inspect)</span>
          </div>

          <div class="pt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm md:text-base font-semibold">
            <span class="text-slate-300">AccessTime =</span>
            
            <button 
              onclick={() => selectVar('walktime')}
              class="px-2 py-0.5 rounded transition-all cursor-pointer {selectedVar === 'walktime' ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-slate-800 text-blue-400 hover:bg-slate-700'}"
            >
              WalkTime ({walkTime.toFixed(1)}m)
            </button>
            
            <span class="text-slate-300">+</span>

            <button 
              onclick={() => selectVar('swt')}
              class="px-2 py-0.5 rounded transition-all cursor-pointer {selectedVar === 'swt' ? 'bg-amber-600 text-white ring-2 ring-amber-400' : 'bg-slate-800 text-amber-400 hover:bg-slate-700'}"
            >
              SWT ({swt.toFixed(1)}m)
            </button>
          </div>

          <div class="pt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold">
            <span class="text-slate-300">Accessibility Index (AI) =</span>
            <button 
              onclick={() => selectVar('ai')}
              class="px-2 py-0.5 rounded transition-all cursor-pointer {selectedVar === 'ai' ? 'bg-emerald-600 text-white ring-2 ring-emerald-400' : 'bg-slate-800 text-emerald-400 hover:bg-slate-700'}"
            >
              30 / AccessTime ({accessibilityIndex})
            </button>
          </div>
        </div>

        <!-- Selected Variable Inspector -->
        {#if selectedVar && variables[selectedVar]}
          <div class="bg-blue-50/50 border border-blue-200 p-4 rounded-lg text-xs space-y-1">
            <div class="font-semibold text-blue-900">{variables[selectedVar].name}</div>
            <div class="font-mono text-blue-700 font-medium">{variables[selectedVar].formula}</div>
            <div class="text-blue-800/80 leading-relaxed pt-1">{variables[selectedVar].description}</div>
          </div>
        {/if}

        <!-- Interactive Sliders -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-paper p-5 rounded-lg border border-border">
          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <label for="walkDistance" class="font-medium text-ink">Walk Distance ($m$)</label>
              <span class="font-mono font-bold text-ink-light">{walkDistance} m</span>
            </div>
            <input
              id="walkDistance"
              type="range"
              min="50"
              max="800"
              step="25"
              bind:value={walkDistance}
              class="w-full accent-blue-600 cursor-pointer"
            />
            <div class="text-[11px] text-ink-muted">Walk Time: {walkTime.toFixed(1)} min</div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <label for="headway" class="font-medium text-ink">Headway ($min$)</label>
              <span class="font-mono font-bold text-ink-light">{headway} min</span>
            </div>
            <input
              id="headway"
              type="range"
              min="3"
              max="60"
              step="1"
              bind:value={headway}
              class="w-full accent-amber-600 cursor-pointer"
            />
            <div class="text-[11px] text-ink-muted">Scheduled Wait: {swt.toFixed(1)} min</div>
          </div>

          <div class="space-y-2">
            <label for="mode" class="block text-xs font-medium text-ink">Transit Mode Buffer</label>
            <select
              id="mode"
              bind:value={mode}
              class="w-full text-xs font-medium bg-white border border-border rounded-md px-3 py-2 text-ink shadow-2xs focus:ring-1 focus:ring-blue-500"
            >
              <option value="bus">Bus (Buffer: +2.0 min)</option>
              <option value="suburban">Suburban Rail (Buffer: +1.5 min)</option>
              <option value="metro">Metro Rail (Buffer: +0.75 min)</option>
            </select>
            <div class="text-[11px] text-ink-muted">Mode Margin: {margin} min</div>
          </div>
        </div>

        <!-- Calculated Summary Card -->
        <div class="bg-white border border-border p-4 rounded-lg flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <div>
            <div class="text-xs text-ink-muted">Total Access Time</div>
            <div class="text-xl font-bold font-mono text-ink">{accessTime.toFixed(1)} min</div>
          </div>
          <div class="h-8 w-px bg-border hidden sm:block"></div>
          <div>
            <div class="text-xs text-ink-muted">Accessibility Index (AI)</div>
            <div class="text-xl font-bold font-mono text-blue-700">{accessibilityIndex}</div>
          </div>
          <div class="h-8 w-px bg-border hidden sm:block"></div>
          <div>
            <div class="text-xs text-ink-muted">PTAL Access Score Category</div>
            <div class="text-xs font-semibold font-mono text-emerald-700 mt-1">
              {accessibilityIndex >= 5 ? 'High Access (Level 5)' : (accessibilityIndex >= 2.5 ? 'Moderate Access (Level 3-4)' : 'Low Access / Transit Desert')}
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div class="space-y-6">
        <div>
          <h3 class="text-sm md:text-base font-semibold text-ink mb-1">
            Network Health Index Gap ($\Delta NHI$)
          </h3>
          <p class="text-xs text-ink-muted leading-relaxed">
            Evaluates the gap between scheduled expectations ($NHI_{Sch}$) and empirical GPS telemetry ($NHI_{GPS}$).
          </p>
        </div>

        <!-- Formula interactive diagram -->
        <div class="bg-slate-900 text-slate-100 p-5 rounded-lg font-mono text-xs overflow-x-auto shadow-inner space-y-2">
          <div class="text-slate-400 border-b border-slate-800 pb-2 flex justify-between">
            <span>Mathematical Formula</span>
            <span>Components (Click to inspect)</span>
          </div>

          <div class="pt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold">
            <span class="text-slate-300">ΔNHI = NHI_GPS ({nhiGps.toFixed(1)}) - NHI_Sch ({nhiSch.toFixed(1)}) =</span>
            <span class="px-2.5 py-0.5 rounded font-mono text-base font-bold border {deltaClass.color}">
              {deltaNhi > 0 ? '+' : ''}{deltaNhi.toFixed(1)} ({deltaClass.label})
            </span>
          </div>
        </div>

        <!-- Interactive Sliders for GPS Telemetry -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-paper p-5 rounded-lg border border-border">
          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <label for="cv" class="font-medium text-ink">Headway Variation ($CV$)</label>
              <span class="font-mono font-bold text-ink-light">{cv}</span>
            </div>
            <input
              id="cv"
              type="range"
              min="0.0"
              max="1.2"
              step="0.05"
              bind:value={cv}
              class="w-full accent-blue-600 cursor-pointer"
            />
            <div class="text-[11px] text-ink-muted">
              {cv <= 0.2 ? 'Regular (On Time)' : (cv <= 0.6 ? 'Moderate Irregularity' : 'Severe Bunching')}
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <label for="speed" class="font-medium text-ink">Avg Travel Speed ($km/h$)</label>
              <span class="font-mono font-bold text-ink-light">{speed} km/h</span>
            </div>
            <input
              id="speed"
              type="range"
              min="6"
              max="25"
              step="1"
              bind:value={speed}
              class="w-full accent-emerald-600 cursor-pointer"
            />
            <div class="text-[11px] text-ink-muted">Speed Score: {sSpeed.toFixed(0)} / 100</div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <label for="routesCount" class="font-medium text-ink">Overlapping Routes</label>
              <span class="font-mono font-bold text-ink-light">{routesCount} routes</span>
            </div>
            <input
              id="routesCount"
              type="range"
              min="1"
              max="8"
              step="1"
              bind:value={routesCount}
              class="w-full accent-purple-600 cursor-pointer"
            />
            <div class="text-[11px] text-ink-muted">Resilience: {sResilience.toFixed(0)} / 100</div>
          </div>
        </div>

        <!-- Calculated Summary Card -->
        <div class="bg-white border border-border p-4 rounded-lg flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <div>
            <div class="text-xs text-ink-muted">Scheduled Index ($NHI_{Sch}$)</div>
            <div class="text-xl font-bold font-mono text-ink">{nhiSch.toFixed(1)}</div>
          </div>
          <div class="h-8 w-px bg-border hidden sm:block"></div>
          <div>
            <div class="text-xs text-ink-muted">GPS Telemetry Index ($NHI_{GPS}$)</div>
            <div class="text-xl font-bold font-mono text-blue-700">{nhiGps.toFixed(1)}</div>
          </div>
          <div class="h-8 w-px bg-border hidden sm:block"></div>
          <div>
            <div class="text-xs text-ink-muted">Performance Deficit ($\Delta NHI$)</div>
            <div class="text-sm font-semibold font-mono px-2 py-0.5 rounded border mt-1 inline-block {deltaClass.color}">
              {deltaNhi > 0 ? '+' : ''}{deltaNhi.toFixed(1)} ({deltaClass.label})
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
