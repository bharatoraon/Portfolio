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
    if (isDragging) {
      handleMove(e.clientX, e.clientY);
    }
  }

  function handleTouchStart(/** @type {TouchEvent} */ e) {
    isDragging = true;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  function handleTouchMove(/** @type {TouchEvent} */ e) {
    if (isDragging && e.touches.length > 0) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  onMount(() => {
    const globalMouseUp = () => {
      isDragging = false;
    };
    window.addEventListener('mouseup', globalMouseUp);
    window.addEventListener('touchend', globalMouseUp);
    return () => {
      window.removeEventListener('mouseup', globalMouseUp);
      window.removeEventListener('touchend', globalMouseUp);
    };
  });
</script>

<div class="my-8 bg-paper-warm border border-border rounded-xl overflow-hidden shadow-sm">
  <div class="px-6 py-4 bg-white border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-3">
    <div>
      <h4 class="text-sm font-semibold text-ink font-sans">Interactive Spatial Grid Index Visualizer</h4>
      <p class="text-xs text-ink-muted">Drag the red GPS ping to see the lookup search space change dynamically.</p>
    </div>
    <span class="text-xs bg-accent-subtle text-accent font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
      Interactive Demo
    </span>
  </div>

  <div class="p-6 flex flex-col lg:flex-row gap-8 items-center justify-center">
    <div class="relative select-none touch-none">
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <svg
        bind:this={svgElement}
        width={width}
        height={height}
        class="bg-white border border-border rounded-lg cursor-crosshair shadow-inner"
        onmousedown={handleMouseDown}
        onmousemove={handleMouseMove}
        ontouchstart={handleTouchStart}
        ontouchmove={handleTouchMove}
      >
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
                ? 'rgba(37, 99, 235, 0.15)' 
                : (isHigh ? 'rgba(37, 99, 235, 0.05)' : 'transparent')}
              class="transition-colors duration-150"
            />
          {/each}
        {/each}

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

        {#each stopStatuses as stop}
          <circle
            cx={stop.x}
            cy={stop.y}
            r={stop.isEvaluated ? 4.5 : 3.5}
            fill={stop.isEvaluated ? '#2563eb' : '#9ca3af'}
            opacity={stop.isEvaluated ? 1 : 0.4}
            class="transition-all duration-150"
          />
          {#if stop.isEvaluated}
            <circle
              cx={stop.x}
              cy={stop.y}
              r="8"
              fill="transparent"
              stroke="#2563eb"
              stroke-width="1"
              opacity="0.3"
              class="animate-ping"
            />
          {/if}
        {/each}

        {#if activeCell.cx >= 0 && activeCell.cx < cols && activeCell.cy >= 0 && activeCell.cy < rows}
          <rect
            x={padding + activeCell.cx * gridSize}
            y={padding + activeCell.cy * gridSize}
            width={gridSize}
            height={gridSize}
            fill="transparent"
            stroke="#2563eb"
            stroke-width="2"
            class="pointer-events-none"
          />
        {/if}

        <circle
          cx={pingX}
          cy={pingY}
          r="10"
          fill="#ef4444"
          stroke="#fff"
          stroke-width="2"
          class="shadow-md cursor-grab active:cursor-grabbing"
        />
        <circle
          cx={pingX}
          cy={pingY}
          r="18"
          fill="transparent"
          stroke="#ef4444"
          stroke-width="1"
          opacity="0.4"
          class="animate-ping pointer-events-none"
        />
      </svg>
    </div>

    <div class="flex-1 w-full max-w-[280px] flex flex-col gap-4">
      <div class="bg-white border border-border p-4 rounded-lg shadow-sm">
        <h5 class="text-xs uppercase tracking-wider font-semibold text-ink-muted mb-3 font-mono">Operations Audit</h5>
        <div class="space-y-3.5">
          <div class="flex items-center justify-between">
            <span class="text-xs text-ink-light flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
              GPS Ping Location
            </span>
            <span class="text-xs font-mono font-semibold text-ink bg-paper-mid px-1.5 py-0.5 rounded">
              X:{pingX.toFixed(0)}, Y:{pingY.toFixed(0)}
            </span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-xs text-ink-light flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded bg-accent inline-block opacity-70"></span>
              Active Grid Cell
            </span>
            <span class="text-xs font-mono font-semibold text-accent">
              [C{activeCell.cx}, R{activeCell.cy}]
            </span>
          </div>
        </div>
      </div>

      <div class="bg-white border border-border p-4 rounded-lg shadow-sm">
        <h5 class="text-xs uppercase tracking-wider font-semibold text-ink-muted mb-3 font-mono">Performance Impact</h5>
        
        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-xs text-ink-light mb-1">
              <span>Naive O(N × M) Method</span>
              <span class="font-semibold">{totalStops} calculations</span>
            </div>
            <div class="w-full bg-paper-mid h-2 rounded overflow-hidden">
              <div class="bg-ink-muted h-full rounded" style="width: 100%"></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between text-xs text-ink-light mb-1">
              <span>Spatial Grid Index</span>
              <span class="font-semibold text-accent">{evaluatedCount} calculations</span>
            </div>
            <div class="w-full bg-paper-mid h-2 rounded overflow-hidden">
              <div class="bg-accent h-full rounded transition-all duration-300" style="width: {(evaluatedCount / totalStops) * 100}%"></div>
            </div>
          </div>

          <div class="border-t border-border pt-3 mt-1 flex items-center justify-between">
            <span class="text-xs font-semibold text-ink">Calculation Load Saved</span>
            <span class="text-sm font-bold text-emerald-600 font-mono">
              -{efficiency}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
