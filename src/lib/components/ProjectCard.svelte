<script>
  /** @type {import('$lib/data/projects').Project} */
  export let project;
  /** @type {boolean} */
  export let compact = false;
</script>

<a
  href="/projects/{project.slug}"
  class="group block border border-border bg-white hover:border-ink-muted transition-colors duration-200 card-hover"
>
  <!-- Map placeholder / thumbnail -->
  <div class="relative w-full {compact ? 'h-36' : 'h-48'} bg-paper-mid overflow-hidden">
    <!-- Decorative grid pattern as map stand-in -->
    <div class="absolute inset-0 opacity-20"
      style="background-image: linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px); background-size: 20px 20px;">
    </div>
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="text-center">
        <svg class="w-8 h-8 text-ink-muted mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      </div>
    </div>
    <!-- Type badge -->
    <div class="absolute top-3 left-3">
      <span class="tag bg-white">{project.type.split('/')[0].trim()}</span>
    </div>
    <!-- Year badge -->
    <div class="absolute top-3 right-3">
      <span class="text-xs text-ink-muted font-mono">{project.year}</span>
    </div>
  </div>

  <!-- Content -->
  <div class="p-5">
    <div class="flex items-start justify-between gap-4 mb-2">
      <h3 class="text-base font-semibold text-ink leading-snug group-hover:text-accent transition-colors">
        {project.title}
      </h3>
    </div>

    <p class="text-xs text-ink-muted flex items-center gap-1.5 mb-3">
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      {project.city}
    </p>

    {#if !compact}
      <p class="text-sm text-ink-muted leading-relaxed line-clamp-3">{project.shortDescription}</p>
    {/if}

    <!-- Tags -->
    <div class="flex flex-wrap gap-1.5 mt-4">
      {#each project.tags.slice(0, 3) as tag}
        <span class="text-xs text-ink-muted bg-paper-mid px-2 py-0.5 font-mono">{tag}</span>
      {/each}
    </div>

    <div class="mt-4 flex items-center gap-1.5 text-xs font-medium text-ink group-hover:gap-2.5 transition-all">
      View case study
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </div>
  </div>
</a>
