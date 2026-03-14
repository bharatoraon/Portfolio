<script>
  /** @type {any} */
  export let article;
</script>

<a
  href="/research/{article.slug}"
  class="group block border-b border-border py-8 hover:border-ink-muted transition-colors"
>
  <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
    <div class="flex-1">
      <div class="flex items-center gap-3 mb-3">
        <span class="tag">{article.category}</span>
        <span class="text-xs text-ink-muted font-mono">
          {new Date(article.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
        <span class="text-xs text-ink-muted">· {article.readTime}</span>
      </div>

      <h3 class="text-lg font-semibold text-ink leading-snug mb-1 group-hover:text-accent transition-colors">
        {article.title}
      </h3>
      {#if article.subtitle}
        <p class="text-sm text-ink-muted italic mb-3">{article.subtitle}</p>
      {/if}
      <p class="text-sm text-ink-muted leading-relaxed line-clamp-2">{article.excerpt}</p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5 mt-4">
        {#each article.tags.slice(0, 4) as tag}
          <span class="text-xs text-ink-muted bg-paper-mid px-2 py-0.5 font-mono">{tag}</span>
        {/each}
      </div>
    </div>

    <div class="flex-shrink-0 mr-2 hidden sm:flex items-center self-center">
      <svg class="w-4 h-4 text-ink-muted group-hover:text-ink group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </div>
  </div>
</a>
