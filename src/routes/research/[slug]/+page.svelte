<script>
  import SEO from '$lib/components/SEO.svelte';
  /** @type {import('./$types').PageData} */
  export let data;
  $: article = data.article;
  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bharatoraon.com" },
      { "@type": "ListItem", "position": 2, "name": "Research", "item": "https://bharatoraon.com/research" },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://bharatoraon.com/research/${article.slug}` }
    ]
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.date,
    "author": {
      "@type": "Person",
      "name": "Bharat Oraon"
    }
  };
</script>

<SEO 
  title="{article.title} — Bharat Oraon"
  description={article.excerpt}
  jsonLd={[breadcrumbsJsonLd, articleJsonLd]}
/>

<!-- Header -->
<section class="section-padding border-b border-border bg-white">
  <div class="container-narrow">
    <div class="flex items-center gap-2 text-xs text-ink-muted mb-8">
      <a href="/" class="hover:text-ink transition-colors">Home</a>
      <span>/</span>
      <a href="/research" class="hover:text-ink transition-colors">Research</a>
      <span>/</span>
      <span class="text-ink truncate max-w-48">{article.title}</span>
    </div>

    <span class="tag mb-4 inline-block">{article.category}</span>
    <h1 class="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-2 leading-tight">
      {article.title}
    </h1>
    {#if article.subtitle}
      <p class="text-base text-ink-muted italic mb-4">{article.subtitle}</p>
    {/if}
    <div class="flex flex-wrap items-center gap-4 text-xs text-ink-muted mt-4">
      <span class="font-mono">
        {new Date(article.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
      </span>
      <span>· {article.readTime}</span>
    </div>

    <!-- Tags -->
    <div class="flex flex-wrap gap-1.5 mt-5">
      {#each article.tags as tag}
        <span class="text-xs text-ink-muted bg-paper-mid px-2 py-0.5 font-mono">{tag}</span>
      {/each}
    </div>
  </div>
</section>

<!-- Article Body -->
<article class="section-padding">
  <div class="container-narrow">
    <!-- Excerpt lead -->
    <p class="text-base text-ink-muted leading-relaxed border-l-2 border-ink pl-6 mb-10 italic">
      {article.excerpt}
    </p>

    <!-- Full content rendered as simple formatted text -->
    <div class="prose-content space-y-6 text-sm md:text-base text-ink-muted leading-relaxed">
      {#each article.content.trim().split('\n\n') as paragraph}
        {#if paragraph.startsWith('## ')}
          <h2 class="text-lg font-semibold text-ink mt-10 mb-3">{paragraph.replace('## ', '')}</h2>
        {:else if paragraph.startsWith('**') && paragraph.includes('**')}
          <p class="text-sm md:text-base leading-relaxed">{@html paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-medium">$1</strong>')}</p>
        {:else if paragraph.trim().startsWith('-')}
          <ul class="list-none space-y-2 pl-0">
            {#each paragraph.trim().split('\n') as item}
              {#if item.startsWith('- ')}
                <li class="flex items-start gap-3">
                  <span class="w-1.5 h-1.5 bg-ink-muted rounded-full mt-2 flex-shrink-0"></span>
                  <span>{@html item.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-medium">$1</strong>')}</span>
                </li>
              {/if}
            {/each}
          </ul>
        {:else if paragraph.trim().match(/^\d+\./)}
          <ol class="space-y-2 pl-0">
            {#each paragraph.trim().split('\n') as item}
              {#if item.trim().match(/^\d+\./)}
                <li class="flex items-start gap-3">
                  <span class="text-xs font-mono text-ink-muted mt-0.5 flex-shrink-0">{item.match(/^\d+/)?.[0]}.</span>
                  <span>{@html item.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-medium">$1</strong>')}</span>
                </li>
              {/if}
            {/each}
          </ol>
        {:else if paragraph.trim()}
          <p class="leading-relaxed">{@html paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-medium">$1</strong>')}</p>
        {/if}
      {/each}
    </div>

    <!-- Navigation -->
    <div class="mt-16 pt-8 border-t border-border flex items-center justify-between">
      <a href="/research" class="btn-outline text-sm">← All Research</a>
      <a href="/contact" class="text-sm text-ink-muted hover:text-ink transition-colors">Get in touch →</a>
    </div>
  </div>
</article>
