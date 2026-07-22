<script>
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import markedKatex from 'marked-katex-extension';
  import 'katex/dist/katex.min.css';

  import SEO from '$lib/components/SEO.svelte';
  import PipelineFlow from '$lib/components/PipelineFlow.svelte';
  import GridSimulator from '$lib/components/GridSimulator.svelte';
  import FormulaExplainer from '$lib/components/FormulaExplainer.svelte';
  import DigitalTwinFlow from '$lib/components/DigitalTwinFlow.svelte';
  import BuildingUseClassifier from '$lib/components/BuildingUseClassifier.svelte';
  import EVChargingSimulator from '$lib/components/EVChargingSimulator.svelte';

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeAttr(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/\n/g, '&#10;');
  }

  // Clean, minimal code block renderer without artificial window dots
  const renderer = new marked.Renderer();
  renderer.code = function({ text, lang }) {
    const rawLang = lang || '';
    let filename = '';
    let displayLang = '';

    if (rawLang.includes(':')) {
      const parts = rawLang.split(':');
      displayLang = parts[0].toUpperCase();
      filename = parts[1];
    } else if (rawLang) {
      displayLang = rawLang.toUpperCase();
      filename = `module.${rawLang === 'python' ? 'py' : rawLang}`;
    }

    const lines = text.split('\n');
    const linesHtml = lines.map((line, idx) => `
      <div class="table-row hover:bg-paper-mid/60 transition-colors">
        <div class="table-cell text-right pr-4 select-none text-ink-muted opacity-40 w-8">${idx + 1}</div>
        <div class="table-cell whitespace-pre">${escapeHtml(line)}</div>
      </div>
    `).join('');

    return `
      <div class="my-8 bg-white border border-border rounded-xl shadow-2xs overflow-hidden font-sans">
        <div class="bg-paper border-b border-border px-5 py-3.5 flex items-center justify-between gap-3 select-none">
          <div class="flex items-center gap-2.5">
            ${filename ? `<span class="text-xs font-mono font-semibold text-ink">${filename}</span>` : ''}
            ${displayLang ? `<span class="text-[11px] font-mono text-ink-muted bg-paper-mid px-2 py-0.5 rounded border border-border">${displayLang}</span>` : ''}
          </div>

          <button
            type="button"
            onclick="navigator.clipboard.writeText(this.getAttribute('data-code')); this.innerText = 'Copied!'; setTimeout(() => this.innerText = 'Copy', 2000);"
            data-code="${escapeAttr(text)}"
            class="px-2.5 py-1 text-xs font-mono text-ink-muted hover:text-ink bg-white border border-border hover:border-ink rounded transition-colors cursor-pointer"
          >
            Copy
          </button>
        </div>

        <div class="bg-paper-warm text-ink p-5 font-mono text-xs overflow-x-auto leading-relaxed border-t border-border">
          <div class="table w-full">
            ${linesHtml}
          </div>
        </div>
      </div>
    `;
  };

  // Configure marked with KaTeX math extension & custom code renderer
  marked.use(markedKatex({
    throwOnError: false,
    nonStandard: true
  }));

  marked.use({ renderer });

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
    // Strip horizontal rule dividers (---) for a seamless reading flow
    const cleanContent = article.content.replace(/^---\s*$/gm, '');
    const rawParts = cleanContent.split(/(?=\n##\s)/);
    return rawParts.map(part => {
      // Inline visual tag replacements for map scale badges
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

    <!-- Main Content Area with Marked HTML & Interactive Figures -->
    <main class="space-y-6 font-sans text-base md:text-lg leading-relaxed text-ink-light">
      {#each sections as section}
        <!-- Article 1 Component Triggers -->
        {#if section.raw.includes('1. System Architecture: Decoupled Spatial ETL Pipeline')}
          <PipelineFlow />
        {/if}

        {#if section.raw.includes('2. High-Performance Spatial Data Engineering')}
          <GridSimulator />
        {/if}

        {#if section.raw.includes('4. Mathematical Modeling: Measuring scheduled vs. empirical performance gap')}
          <FormulaExplainer />
        {/if}

        <!-- Article 2 Component Triggers -->
        {#if section.raw.includes('1. Streaming & Spatial Filtering of Big Geospatial Data')}
          <DigitalTwinFlow />
        {/if}

        {#if section.raw.includes('3. Classifying Building Use via Spatial Heuristics')}
          <BuildingUseClassifier />
        {/if}

        {#if section.raw.includes('5. High-Performance Client-Side Rendering & EV Simulation')}
          <EVChargingSimulator />
        {/if}

        <div class="prose-custom">
          {@html section.html}
        </div>
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
  :global(.prose-custom table) {
    width: 100%;
    text-align: left;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-collapse: collapse;
    background-color: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 0.5rem;
    overflow: hidden;
    font-size: 0.875rem;
  }
  :global(.prose-custom th) {
    background-color: #f5f4f0;
    padding: 0.75rem 1rem;
    border: 1px solid #e5e5e5;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-weight: 600;
    color: #1a1a1a;
  }
  :global(.prose-custom td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e5e5;
    color: #2d2d2d;
  }
  :global(.prose-custom tr:hover) {
    background-color: #fafafa;
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
    border-left: 4px solid #1a1a1a;
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    background-color: #f5f4f0;
    font-style: italic;
    color: #1a1a1a;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
  :global(.prose-custom hr) {
    display: none;
  }
  :global(.prose-custom strong) {
    font-weight: 600;
    color: #1a1a1a;
  }
  :global(.katex-display) {
    margin: 1.5rem 0;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0.5rem 0;
  }
</style>
