<script>
  /** @type {string} */
  export let label = '';
  /** @type {string} */
  export let title = '';
  /** @type {string} */
  export let description = '';
  /** @type {'left' | 'center'} */
  export let align = 'left';
</script>

<div class="mb-12 {align === 'center' ? 'text-center' : ''}">
  {#if label}
    <p class="text-xs uppercase tracking-widest text-ink-muted font-semibold mb-3">{label}</p>
  {/if}
  {#if title}
    <h2 class="text-2xl md:text-3xl font-semibold text-ink leading-tight mb-3">{title}</h2>
  {/if}
  {#if description}
    <p class="text-base text-ink-muted max-w-2xl {align === 'center' ? 'mx-auto' : ''} leading-relaxed">{description}</p>
  {/if}
</div>
