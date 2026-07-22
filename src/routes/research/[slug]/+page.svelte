<script>
  import { onMount } from 'svelte';
  import SEO from '$lib/components/SEO.svelte';
  import GridSimulator from '$lib/components/GridSimulator.svelte';
  import FormulaExplainer from '$lib/components/FormulaExplainer.svelte';

  let { data } = $props();
  let article = $derived(data?.article);

  // Scroll Progress
  let scrollPercent = $state(0);

  function handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  }

  // Markdown parsing logic into blocks
  /**
   * @param {string} content
   * @returns {any[]}
   */
  function parseMarkdown(content) {
    if (!content) return [];
    const lines = content.split('\n');
    /** @type {any[]} */
    const blocks = [];
    /** @type {any} */
    let currentBlock = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // 1. Code Block parsing
      if (trimmed.startsWith('```')) {
        if (currentBlock && currentBlock.type === 'code') {
          blocks.push(currentBlock);
          currentBlock = null;
        } else {
          if (currentBlock) blocks.push(currentBlock);
          const lang = trimmed.slice(3).trim();
          currentBlock = { type: 'code', lang, code: [] };
        }
        continue;
      }

      if (currentBlock && currentBlock.type === 'code') {
        currentBlock.code.push(line);
        continue;
      }

      // 2. Math Block parsing
      if (trimmed.startsWith('$$')) {
        if (currentBlock && currentBlock.type === 'math') {
          currentBlock.formula += '\n' + trimmed.replace(/\$\$/g, '');
          blocks.push(currentBlock);
          currentBlock = null;
        } else {
          if (currentBlock) blocks.push(currentBlock);
          currentBlock = { type: 'math', formula: trimmed.replace(/\$\$/g, '') };
          if (trimmed.endsWith('$$') && trimmed.length > 2) {
            blocks.push(currentBlock);
            currentBlock = null;
          }
        }
        continue;
      }

      if (currentBlock && currentBlock.type === 'math') {
        currentBlock.formula += '\n' + line;
        continue;
      }

      // 3. Table parsing
      if (trimmed.startsWith('|')) {
        const cells = line.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (currentBlock && currentBlock.type === 'table') {
          if (trimmed.includes(':---') || trimmed.includes('---:')) {
            continue; // Skip separator line
          }
          currentBlock.rows.push(cells);
        } else {
          if (currentBlock) blocks.push(currentBlock);
          currentBlock = { type: 'table', headers: cells, rows: [] };
        }
        continue;
      } else {
        if (currentBlock && currentBlock.type === 'table') {
          blocks.push(currentBlock);
          currentBlock = null;
        }
      }

      if (trimmed === '') {
        if (currentBlock) {
          blocks.push(currentBlock);
          currentBlock = null;
        }
        continue;
      }

      // 4. Headings
      if (trimmed.startsWith('### ')) {
        if (currentBlock) blocks.push(currentBlock);
        const text = trimmed.slice(4);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        blocks.push({ type: 'h3', text, id });
        currentBlock = null;
        continue;
      }
      if (trimmed.startsWith('## ')) {
        if (currentBlock) blocks.push(currentBlock);
        const text = trimmed.slice(3);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        blocks.push({ type: 'h2', text, id });
        currentBlock = null;
        continue;
      }

      // 5. Unordered list items
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const itemText = trimmed.slice(2);
        if (currentBlock && currentBlock.type === 'ul') {
          currentBlock.items.push(itemText);
        } else {
          if (currentBlock) blocks.push(currentBlock);
          currentBlock = { type: 'ul', items: [itemText] };
        }
        continue;
      }

      // 6. Ordered list items
      if (/^\d+\.\s+/.test(trimmed)) {
        const itemText = trimmed.replace(/^\d+\.\s+/, '');
        if (currentBlock && currentBlock.type === 'ol') {
          currentBlock.items.push(itemText);
        } else {
          if (currentBlock) blocks.push(currentBlock);
          currentBlock = { type: 'ol', items: [itemText] };
        }
        continue;
      }

      // 7. Paragraphs
      if (currentBlock && currentBlock.type === 'p') {
        currentBlock.text += ' ' + trimmed;
      } else {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = { type: 'p', text: trimmed };
      }
    }

    if (currentBlock) {
      blocks.push(currentBlock);
    }

    blocks.forEach(b => {
      if (b.type === 'code') {
        b.code = b.code.join('\n');
      }
    });

    return blocks;
  }

  // Formatter for inline styling
  /**
   * @param {string} text
   * @returns {string}
   */
  function formatInline(text) {
    if (!text) return '';
    let formatted = text;
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-semibold">$1</strong>');
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-paper-mid px-1.5 py-0.5 rounded font-mono text-xs text-ink-light">$1</code>');
    formatted = formatted.replace(/\$([^\$]+)\$/g, '<code class="font-serif italic text-ink bg-paper-mid px-1 py-0.5 rounded">$1</code>');
    formatted = formatted.replace(/🔴 (.*)/g, '<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">🔴 $1</span>');
    formatted = formatted.replace(/🟡 (.*)/g, '<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">🟡 $1</span>');
    formatted = formatted.replace(/⚪ (.*)/g, '<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-paper-mid text-ink-muted border border-border">⚪ $1</span>');
    formatted = formatted.replace(/🟢 (.*)/g, '<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">🟢 $1</span>');
    
    return formatted;
  }

  let blocks = $derived(parseMarkdown(article?.content || ''));

  // Clipboard copy helper
  let copiedText = $state(/** @type {Record<number, boolean>} */ ({}));
  /**
   * @param {string} text
   * @param {number} id
   */
  async function copyToClipboard(text, id) {
    try {
      await navigator.clipboard.writeText(text);
      copiedText = { ...copiedText, [id]: true };
      setTimeout(() => {
        copiedText = { ...copiedText, [id]: false };
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

    <!-- Main Content Area -->
    <main class="space-y-6 text-ink-light font-sans text-base md:text-lg leading-relaxed">
      {#each blocks as block, idx}
        {#if block.type === 'h2'}
          <h2 id={block.id} class="text-xl md:text-2xl font-serif font-bold text-ink mt-12 mb-4 pt-4 border-t border-border/50 scroll-mt-24">
            {block.text}
          </h2>
          {#if block.text?.includes('4. Mathematical Modeling')}
            <FormulaExplainer />
          {/if}
        {:else if block.type === 'h3'}
          <h3 id={block.id} class="text-lg md:text-xl font-serif font-semibold text-ink mt-8 mb-3 scroll-mt-24">
            {block.text}
          </h3>
          {#if block.text?.includes('Spatial Grid Cell Partitioning')}
            <GridSimulator />
          {/if}
        {:else if block.type === 'p'}
          <p class="leading-relaxed mb-6">
            {@html formatInline(block.text)}
          </p>
        {:else if block.type === 'ul'}
          <ul class="list-disc list-outside pl-6 space-y-2 mb-6 text-base">
            {#each block.items as item}
              <li class="leading-relaxed">
                {@html formatInline(item)}
              </li>
            {/each}
          </ul>
        {:else if block.type === 'ol'}
          <ol class="list-decimal list-outside pl-6 space-y-2 mb-6 text-base">
            {#each block.items as item}
              <li class="leading-relaxed">
                {@html formatInline(item)}
              </li>
            {/each}
          </ol>
        {:else if block.type === 'code'}
          <div class="relative group my-8">
            <div class="flex items-center justify-between px-4 py-2 bg-paper-dark border-b border-border/20 rounded-t-lg">
              <span class="text-xs font-mono text-ink-muted">{block.lang || 'text'}</span>
              <button 
                onclick={() => copyToClipboard(block.code, idx)}
                class="text-xs font-mono text-ink-muted hover:text-white transition-colors"
              >
                {copiedText[idx] ? 'Copied! ✓' : 'Copy'}
              </button>
            </div>
            <pre class="p-4 bg-paper-dark text-paper rounded-b-lg overflow-x-auto font-mono text-xs md:text-sm leading-relaxed"><code>{block.code}</code></pre>
          </div>
        {:else if block.type === 'math'}
          <div class="my-8 py-5 px-6 bg-white border border-border rounded-lg text-center overflow-x-auto select-all font-serif italic text-base md:text-lg text-ink shadow-sm">
            {@html formatInline(block.formula)}
          </div>
        {:else if block.type === 'table'}
          <div class="my-8 overflow-x-auto border border-border rounded-lg shadow-2xs bg-white">
            <table class="w-full text-left text-xs md:text-sm">
              <thead class="bg-paper-mid border-b border-border font-mono text-ink font-semibold">
                <tr>
                  {#each block.headers as header}
                    <th class="p-3 border-r border-border last:border-r-0">{header}</th>
                  {/each}
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                {#each block.rows as row}
                  <tr class="hover:bg-paper-warm/50 transition-colors">
                    {#each row as cell}
                      <td class="p-3 border-r border-border last:border-r-0">
                        {@html formatInline(cell)}
                      </td>
                    {/each}
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
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
