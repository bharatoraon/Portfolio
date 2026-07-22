<script>
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import markedKatex from 'marked-katex-extension';
  import 'katex/dist/katex.min.css';

  import SEO from '$lib/components/SEO.svelte';
  import GridSimulator from '$lib/components/GridSimulator.svelte';
  import FormulaExplainer from '$lib/components/FormulaExplainer.svelte';

  // Configure marked with KaTeX math extension for inline $...$ and block $$...$$ formulas
  marked.use(markedKatex({
    throwOnError: false,
    nonStandard: true
  }));

  marked.setOptions({
    gfm: true,
    breaks: true
  });

  let { data } = $props();
  let article = $derived(data?.article);

  // Scroll Progress
  let scrollPercent = $state(0);

  function handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  // Split content into logical sections by `## ` so we can insert interactive tools cleanly
  let sections = $derived.by(() => {
    if (!article?.content) return [];
    // Split by top-level section headings (## )
    const rawParts = article.content.split(/(?=\n##\s)/);
    return rawParts.map(part => {
      // Inline visual tag replacements for map scale emojis
      let formattedPart = part
        .replace(/🔴 (.*)/g, '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">🔴 $1</span>')
        .replace(/🟡 (.*)/g, '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">🟡 $1</span>')
        .replace(/⚪ (.*)/g, '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-paper-mid text-ink-muted border border-border">⚪ $1</span>')
        .replace(/🟢 (.*)/g, '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">🟢 $1</span>');

      return {
        raw: part,
        html: marked.parse(formattedPart)
      };
    });
  });

  let breadcrumbsJsonLd = $derived(article ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bharatoraon.com" },
      { "@type": "ListItem", "position": 2, "name": "Research", "item": "https://bharatoraon.com/research" },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://bharatoraon.com/research/${article.slug}` }
    ]
  } : null);

  let articleJsonLd = $derived(article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.date,
    "author": {
      "@type": "Person",
      "name": "Bharat Oraon",
      "url": "https://bharatoraon.com"
    }
  } : null);
</script>

<!-- Top Scroll Progress Indicator -->
<div class="fixed top-0 left-0 right-0 h-1 bg-paper-mid z-50">
  <div 
    class="h-full bg-accent transition-all duration-150 ease-out" 
    style="width: {scrollPercent}%"
  ></div>
</div>

{#if article}
  <SEO 
    title={article.title}
    description={article.excerpt}
    jsonLd={[breadcrumbsJsonLd, articleJsonLd]}
  />

  <article class="max-w-3xl mx-auto px-6 py-12 md:py-20">
    <!-- Back to Research -->
    <a 
      href="/research" 
      class="inline-flex items-center gap-2 text-xs font-mono text-ink-muted hover:text-ink transition-colors mb-10 group"
    >
      <svg class="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Research
    </a>

    <!-- Header -->
    <header class="mb-12 border-b border-border pb-10">
      <div class="flex flex-wrap items-center gap-3 text-xs font-mono text-ink-muted mb-4">
        <span class="px-2.5 py-1 bg-paper-mid rounded text-ink font-sans font-medium">
          {article.category}
        </span>
        <span>&bull;</span>
        <time datetime={article.date}>
          {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </time>
        <span>&bull;</span>
        <span>{article.readTime}</span>
      </div>

      <h1 class="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-ink leading-tight tracking-tight mb-4">
        {article.title}
      </h1>

      {#if article.subtitle}
        <p class="text-base md:text-xl text-ink-muted font-sans font-normal leading-relaxed">
          {article.subtitle}
        </p>
      {/if}

      <!-- Tags -->
      {#if article.tags?.length}
        <div class="flex flex-wrap gap-2 mt-6">
          {#each article.tags as tag}
            <span class="text-xs font-mono text-ink-muted bg-paper px-2 py-0.5 border border-border rounded">
              #{tag}
            </span>
          {/each}
        </div>
      {/if}
    </header>

    <!-- Main Content Area with Marked HTML & KaTeX Math Rendering -->
    <main class="space-y-6 font-sans text-base md:text-lg leading-relaxed text-ink-light">
      {#each sections as section}
        <div class="prose-custom">
          {@html section.html}
        </div>

        {#if section.raw.includes('Spatial Grid Cell Partitioning') || section.raw.includes('2. High-Performance Spatial Data Engineering')}
          <GridSimulator />
        {/if}

        {#if section.raw.includes('4. Mathematical Modeling') || section.raw.includes('Performance Gap')}
          <FormulaExplainer />
        {/if}
      {/each}

      <!-- Footer Callout -->
      <div class="mt-16 pt-8 border-t border-border text-sm text-ink-muted flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p>Published in Research & Policy Essays</p>
        <a href="/contact" class="text-accent font-semibold hover:underline">
          Discuss this methodology &rarr;
        </a>
      </div>
    </main>
  </article>
{:else}
  <div class="max-w-4xl mx-auto px-6 py-20 text-center">
    <h1 class="text-2xl font-serif font-bold text-ink mb-4">Article Not Found</h1>
    <p class="text-ink-muted mb-8">The research article you are looking for does not exist.</p>
    <a href="/research" class="text-accent font-semibold hover:underline">&larr; Back to Research</a>
  </div>
{/if}

<style>
  :global(.prose-custom h1) {
    font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
    font-size: 1.875rem;
    font-weight: 700;
    color: #111827;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.25;
  }
  :global(.prose-custom h2) {
    font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    margin-top: 3rem;
    margin-bottom: 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(229, 231, 235, 0.8);
    line-height: 1.3;
  }
  :global(.prose-custom h3) {
    font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }
  :global(.prose-custom h4) {
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
  :global(.prose-custom p) {
    margin-bottom: 1.25rem;
    line-height: 1.75;
    color: #374151;
  }
  :global(.prose-custom pre) {
    background-color: #0f172a;
    color: #f8fafc;
    padding: 1.25rem;
    border-radius: 0.75rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.8125rem;
    line-height: 1.6;
    margin-top: 1.75rem;
    margin-bottom: 1.75rem;
    overflow-x: auto;
    white-space: pre;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  :global(.prose-custom code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    background-color: #f1f5f9;
    color: #0f172a;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.85em;
  }
  :global(.prose-custom pre code) {
    background-color: transparent;
    color: inherit;
    padding: 0;
    border-radius: 0;
    font-size: inherit;
    white-space: pre;
  }
  :global(.prose-custom table) {
    width: 100%;
    text-align: left;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-collapse: collapse;
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    overflow: hidden;
    font-size: 0.875rem;
  }
  :global(.prose-custom th) {
    background-color: #f8fafc;
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-weight: 600;
    color: #0f172a;
  }
  :global(.prose-custom td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    color: #334155;
  }
  :global(.prose-custom tr:hover) {
    background-color: #f8fafc;
  }
  :global(.prose-custom ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }
  :global(.prose-custom ol) {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }
  :global(.prose-custom li) {
    margin-bottom: 0.5rem;
    line-height: 1.65;
  }
  :global(.prose-custom blockquote) {
    border-left: 4px solid #2563eb;
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    background-color: #f8fafc;
    font-style: italic;
    color: #1e293b;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
  :global(.prose-custom hr) {
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
    border-color: #e2e8f0;
  }
  :global(.prose-custom strong) {
    font-weight: 600;
    color: #0f172a;
  }
  :global(.katex-display) {
    margin: 1.5rem 0;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0.5rem 0;
  }
</style>
