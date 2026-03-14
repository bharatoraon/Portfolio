<script>
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import ResearchCard from '$lib/components/ResearchCard.svelte';
  import { projects } from '$lib/data/projects.js';
  import { research } from '$lib/data/research.js';
  import SEO from '$lib/components/SEO.svelte';

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const recentResearch = research.slice(0, 3);

  const focusAreas = [
    {
      icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`,
      title: 'Urban Governance',
      desc: 'Decentralisation, ULB reform, and institutional design for Indian cities.',
    },
    {
      icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>`,
      title: 'Spatial Intelligence',
      desc: 'GIS analysis, remote sensing, and spatial data infrastructure for planning.',
    },
    {
      icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
      title: 'Urban Mobility',
      desc: 'Transit accessibility, street design, and sustainable transport policy.',
    },
    {
      icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
      title: 'Civic Technology',
      desc: 'Data-driven tools and platforms for participatory urban governance.',
    },
  ];

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://bharatoraon.com"
    }]
  };
</script>

<SEO 
  title="Bharat Oraon — Urban Planning Researcher & GIS Developer"
  description="Portfolio of Bharat Oraon, an Urban Planning Researcher working at the intersection of spatial data, governance systems, and civic technology for Indian cities."
  jsonLd={breadcrumbsJsonLd}
/>

<!-- HERO -->
<section class="section-padding border-b border-border bg-white overflow-hidden">
  <div class="container-wide">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <!-- Image Column -->
      <div class="flex justify-center md:justify-start">
        <div class="relative max-w-sm lg:max-w-md">
          <img 
            src="/hero_home.png" 
            alt="Bharat Oraon Illustration" 
            class="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" 
          />
        </div>
      </div>
      
      <!-- Content Column -->
      <div>
        <p class="text-xs uppercase tracking-widest text-ink-muted font-semibold mb-6">Urban Planning Portfolio</p>
        <h1 class="text-4xl md:text-5xl lg:text-7xl font-bold text-ink leading-tight tracking-tight mb-6">
          Bharat<br />
          <span class="font-light italic">Oraon</span>
        </h1>
        <div class="w-16 h-px bg-ink mb-8"></div>
        <p class="text-base md:text-lg text-ink-muted leading-relaxed mb-4 max-w-2xl">
          Urban Planning Researcher · GIS Developer · Civic Technology Fellow
        </p>
        <p class="text-base text-ink-muted leading-relaxed mb-10 max-w-2xl">
          Urban planning researcher working at the intersection of spatial data, governance systems, and civic technology for Indian cities.
        </p>
        <div class="flex flex-wrap gap-4">
          <a href="/projects" class="btn-primary">View Projects</a>
          <a href="/resume" class="btn-outline">Download CV</a>
        </div>


      </div>
    </div>
  </div>
</section>

<!-- FOCUS AREAS -->
<section class="section-padding border-b border-border">
  <div class="container-wide">
    <SectionHeader
      label="Expertise"
      title="Focus Areas"
      description="Four intersecting domains of planning research and technical practice."
    />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each focusAreas as area}
        <div class="bg-white border border-border p-6 hover:border-ink-muted transition-colors">
          <div class="text-ink-muted mb-4">{@html area.icon}</div>
          <h3 class="text-base font-semibold text-ink mb-2">{area.title}</h3>
          <p class="text-sm text-ink-muted leading-relaxed">{area.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- FEATURED PROJECTS -->
<section class="section-padding border-b border-border bg-white">
  <div class="container-wide">
    <div class="flex items-end justify-between mb-12">
      <SectionHeader
        label="Work"
        title="Featured Projects"
        description="Spatial analysis, GIS, and urban planning research."
      />
      <a href="/projects" class="text-sm font-medium text-ink hover:text-accent transition-colors flex items-center gap-1.5 mb-12 flex-shrink-0">
        All projects
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each featuredProjects as project}
        <ProjectCard {project} />
      {/each}
    </div>
  </div>
</section>

<!-- RESEARCH HIGHLIGHTS -->
<section class="section-padding">
  <div class="container-narrow">
    <div class="flex items-end justify-between mb-10">
      <SectionHeader
        label="Writing"
        title="Research Highlights"
        description="Policy essays and planning research."
      />
      <a href="/research" class="text-sm font-medium text-ink hover:text-accent transition-colors flex items-center gap-1.5 mb-10 flex-shrink-0">
        All writing
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
    <div>
      {#each recentResearch as article}
        <ResearchCard {article} />
      {/each}
    </div>
  </div>
</section>

<!-- CTA STRIP -->
<section class="bg-ink text-white py-16">
  <div class="container-narrow text-center">
    <p class="text-xs uppercase tracking-widest text-white/50 font-semibold mb-4">Let's Collaborate</p>
    <h2 class="text-2xl md:text-3xl font-semibold mb-4">Working at the intersection of cities, data, and governance.</h2>
    <p class="text-white/60 text-sm mb-8 max-w-lg mx-auto">
      Open to research collaborations, GIS consulting, and urban planning fellowship opportunities.
    </p>
    <a href="/contact" class="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 text-sm font-medium hover:bg-white hover:text-ink transition-colors">
      Get in touch
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  </div>
</section>
