<script>
  import ResearchCard from '$lib/components/ResearchCard.svelte';
  import { research } from '$lib/data/research.js';
  import SEO from '$lib/components/SEO.svelte';

  const published = research.filter(a => a.externalUrl);
  const essays = research.filter(a => !a.externalUrl);

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bharatoraon.com" },
      { "@type": "ListItem", "position": 2, "name": "Research", "item": "https://bharatoraon.com/research" }
    ]
  };
</script>

<SEO
  title="Research & Writing — Bharat Oraon"
  description="Published articles, policy essays, and urban planning research by Bharat Oraon."
  jsonLd={breadcrumbsJsonLd}
/>

<!-- Header -->
<section class="section-padding border-b border-border bg-white">
  <div class="container-narrow">
    <p class="text-xs uppercase tracking-widest text-ink-muted font-semibold mb-4">Writing</p>
    <h1 class="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">Research & Writing</h1>
    <p class="text-base text-ink-muted max-w-xl leading-relaxed">
      Published articles, policy essays, and urban planning research.
    </p>
  </div>
</section>

<!-- Published Writing -->
<section class="pt-4 pb-0 border-b border-border">
  <div class="container-narrow">
    <div>
      {#each published as article}
        <ResearchCard {article} />
      {/each}
    </div>
  </div>
</section>

<!-- Essays & Research -->
<section class="section-padding">
  <div class="container-narrow">
    <p class="text-xs uppercase tracking-widest text-ink-muted font-semibold mb-8">Essays & Research</p>
    <div>
      {#each essays as article}
        <ResearchCard {article} />
      {/each}
    </div>
  </div>
</section>
