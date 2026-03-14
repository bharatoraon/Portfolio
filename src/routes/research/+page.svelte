<script>
  import ResearchCard from '$lib/components/ResearchCard.svelte';
  import { research } from '$lib/data/research.js';
  import SEO from '$lib/components/SEO.svelte';

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
  title="Research — Bharat Oraon"
  description="Academic research, policy essays, and urban planning highlights by Bharat Oraon."
  jsonLd={breadcrumbsJsonLd}
/>

<!-- Header -->
<section class="section-padding border-b border-border bg-white">
  <div class="container-narrow">
    <p class="text-xs uppercase tracking-widest text-ink-muted font-semibold mb-4">Writing</p>
    <h1 class="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">Research & Writing</h1>
    <p class="text-base text-ink-muted max-w-xl leading-relaxed">
      Policy essays, planning research, and urban systems analysis.
    </p>
  </div>
</section>

<!-- Research List -->
<section class="section-padding">
  <div class="container-narrow">
    <div>
      {#each research as article}
        <ResearchCard {article} />
      {/each}
    </div>
  </div>
</section>
