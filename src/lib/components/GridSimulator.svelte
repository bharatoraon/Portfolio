<script>
  import { onMount } from 'svelte';

  // State using Svelte 5 runes
  let pingX = $state(175);
  let pingY = $state(175);
  let isDragging = $state(false);
  let svgElement = $state(/** @type {SVGSVGElement|null} */ (null));

  // Constants
  const width = 350;
  const height = 350;
  const gridSize = 50;
  const padding = 25;
  const cols = 6;
  const rows = 6;

  // Generate deterministic pseudo-random stops
  const stops = [];
  const totalStops = 60;
  for (let i = 0; i < totalStops; i++) {
    const seedX = Math.sin(i * 12.9898) * 43758.5453 % 1;
    const seedY = Math.cos(i * 78.233) * 43758.5453 % 1;
    
    stops.push({
      id: i,
      x: padding + 10 + Math.abs(seedX) * (width - 2 * padding - 20),
      y: padding + 10 + Math.abs(seedY) * (height - 2 * padding - 20),
    });
  }

  // Helper: get cell index
  function getCell(/** @type {number} */ x, /** @type {number} */ y) {
    const cx = Math.floor((x - padding) / gridSize);
    const cy = Math.floor((y - padding) / gridSize);
    return { cx, cy };
  }

  let activeCell = $derived(getCell(pingX, pingY));

  function isCellHighlighted(/** @type {number} */ cx, /** @type {number} */ cy) {
    const dx = Math.abs(cx - activeCell.cx);
    const dy = Math.abs(cy - activeCell.cy);
    return dx <= 1 && dy <= 1;
  }

  function isCellPrimary(/** @type {number} */ cx, /** @type {number} */ cy) {
    return cx === activeCell.cx && cy === activeCell.cy;
  }

  let stopStatuses = $derived(
    stops.map(stop => {
      const stopCell = getCell(stop.x, stop.y);
      const isEvaluated = isCellHighlighted(stopCell.cx, stopCell.cy);
      return { ...stop, isEvaluated };
    })
  );

  let evaluatedCount = $derived(stopStatuses.filter(s => s.isEvaluated).length);
  let efficiency = $derived(((1 - evaluatedCount / totalStops) * 100).toFixed(1));

  function handleMove(/** @type {number} */ clientX, /** @type {number} */ clientY) {
    if (!svgElement) return;
    const rect = svgElement.getBoundingClientRect();
    let x = clientX - rect.left;
    let y = clientY - rect.top;

    x = Math.max(padding, Math.min(width - padding, x));
    y = Math.max(padding, Math.min(height - padding, y));

    pingX = x;
    pingY = y;
  }

  function handleMouseDown(/** @type {MouseEvent} */ e) {
    isDragging = true;
    handleMove(e.clientX, e.clientY);
  }

  function handleMouseMove(/** @type {MouseEvent} */ e) {
    if (!isDragging) return;
    handleMove(e.clientX, e.clientY);
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleTouchStart(/** @type {TouchEvent} */ e) {
    if (e.touches.length === 1) {
      isDragging = true;
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  function handleTouchMove(/** @type {TouchEvent} */ e) {
    if (isDragging && e.touches.length === 1) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  onMount(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  });
</script>

<div class="my-10 bg-white border border-border rounded-xl shadow-2xs overflow-hidden font-sans">
  <!-- Minimal Header Matching Site Style -->
  <div class="bg-paper border-b border-border px-6 py-4 flex flex-wrap items-center justify-between gap-3">
    <div class="flex items-center gap-2">
      <span class="text-xs font-mono font-semibold text-ink-muted uppercase tracking-wider">Figure 3</span>
      <h4 class="text-sm font-sans font-semibold text-ink">
        Spatial Grid Indexing & Candidate Stop Filtering (500m × 500m)
      </h4>
    </div>
    <span class="text-xs font-mono text-ink-muted hidden sm:inline">
      Drag coordinate target to evaluate 3x3 search space
    </span>
  </div>

  <div class="p-6 flex flex-col lg:flex-row gap-8 items-center justify-center bg-paper">
    <div class="relative select-none touch-none">
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <svg
        bind:this={svgElement}
        width={width}
        height={height}
        class="bg-white border border-border rounded-lg cursor-crosshair shadow-2xs"
        onmousedown={handleMouseDown}
        onmousemove={handleMouseMove}
        ontouchstart={handleTouchStart}
        ontouchmove={handleTouchMove}
      >
        <!-- Grid Cells -->
        {#each Array(rows) as _, r}
          {#each Array(cols) as _, c}
            {@const cx = c}
            {@const cy = r}
            {@const isPrim = isCellPrimary(cx, cy)}
            {@const isHigh = isCellHighlighted(cx, cy)}
            <rect
              x={padding + cx * gridSize}
              y={padding + cy * gridSize}
              width={gridSize}
              height={gridSize}
              stroke="#e5e5e5"
              stroke-width="1"
              stroke-dasharray={isHigh && !isPrim ? "3,3" : undefined}
              fill={isPrim 
                ? 'rgba(26, 26, 26, 0.08)' 
                : (isHigh ? 'rgba(26, 26, 26, 0.02)' : 'transparent')}
              class="transition-colors duration-150"
            />
          {/each}
        {/each}

        <!-- Axis Labels -->
        {#each Array(cols) as _, c}
          <text 
            x={padding + c * gridSize + gridSize/2} 
            y={padding - 8} 
            text-anchor="middle" 
            class="text-[9px] font-mono fill-ink-muted"
          >
            C{c}
          </text>
        {/each}
        {#each Array(rows) as _, r}
          <text 
            x={padding - 8} 
            y={padding + r * gridSize + gridSize/2 + 3} 
            text-anchor="end" 
            class="text-[9px] font-mono fill-ink-muted"
          >
            R{r}
          </text>
        {/each}

        <!-- Stops -->
        {#each stopStatuses as stop}
          <circle
            cx={stop.x}
            cy={stop.y}
            r={stop.isEvaluated ? 4.5 : 3}
            fill={stop.isEvaluated ? '#1a1a1a' : '#9ca3af'}
            opacity={stop.isEvaluated ? 1 : 0.4}
            class="transition-all duration-150"
          />
        {/each}

        <!-- Active Primary Cell Highlight -->
        {#if activeCell.cx >= 0 && activeCell.cx < cols && activeCell.cy >= 0 && activeCell.cy < rows}
          <rect
            x={padding + activeCell.cx * gridSize}
            y={padding + activeCell.cy * gridSize}
            width={gridSize}
            height={gridSize}
            fill="transparent"
            stroke="#1a1a1a"
            stroke-width="2"
            class="pointer-events-none"
          />
        {/if}

        <!-- GIS Reticle Crosshair -->
        <line x1={pingX - 12} y1={pingY} x2={pingX + 12} y2={pingY} stroke="#1a1a1a" stroke-width="1.5" />
        <line x1={pingX} y1={pingY - 12} x2={pingX} y2={pingY + 12} stroke="#1a1a1a" stroke-width="1.5" />
        <circle
          cx={pingX}
          cy={pingY}
          r="4"
          fill="#1a1a1a"
          stroke="#ffffff"
          stroke-width="1.5"
          class="shadow-2xs cursor-grab active:cursor-grabbing"
        />
      </svg>
    </div>

    <div class="flex-1 w-full max-w-[280px] flex flex-col gap-4">
      <div class="bg-white border border-border p-4 rounded-lg shadow-2xs space-y-3">
        <h5 class="text-xs font-mono font-semibold text-ink-muted">Spatial Query State</h5>
        <div class="space-y-2.5">
          <div class="flex items-center justify-between text-xs">
            <span class="text-ink-light flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-ink inline-block"></span>
              GPS Location Target
            </span>
            <span class="font-mono font-semibold text-ink bg-paper-mid px-1.5 py-0.5 rounded">
              [{pingX.toFixed(0)}, {pingY.toFixed(0)}]
            </span>
          </div>

          <div class="flex items-center justify-between text-xs">
            <span class="text-ink-light flex items-center gap-1.5">
              <span class="w-2 h-2 rounded bg-ink-light inline-block opacity-70"></span>
              Primary Cell & Neighborhood
            </span>
            <span class="font-mono font-semibold text-ink">
              C{activeCell.cx}, R{activeCell.cy}
            </span>
          </div>
        </div>
      </div>

      <div class="bg-white border border-border p-4 rounded-lg shadow-2xs space-y-3">
        <h5 class="text-xs font-mono font-semibold text-ink-muted">Computation Reduction</h5>
        
        <div class="space-y-3">
          <div>
            <div class="flex justify-between text-xs text-ink-light mb-1">
              <span>Full Search Space</span>
              <span class="font-semibold">{totalStops} stops</span>
            </div>
            <div class="w-full bg-paper-mid h-2 rounded overflow-hidden">
              <div class="bg-ink-muted h-full rounded" style="width: 100%"></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between text-xs text-ink-light mb-1">
              <span>Indexed Candidate Stops</span>
              <span class="font-semibold text-ink">{evaluatedCount} stops</span>
            </div>
            <div class="w-full bg-paper-mid h-2 rounded overflow-hidden">
              <div class="bg-ink h-full rounded transition-all duration-300" style="width: {(evaluatedCount / totalStops) * 100}%"></div>
            </div>
          </div>

          <div class="border-t border-border pt-2.5 mt-1 flex items-center justify-between text-xs">
            <span class="font-semibold text-ink">Distance Calcs Saved</span>
            <span class="font-mono font-bold text-ink">
              -{efficiency}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
