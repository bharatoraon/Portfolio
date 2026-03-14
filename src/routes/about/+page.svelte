<script>
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import SEO from '$lib/components/SEO.svelte';

  const education = [
    {
      degree: "Bachelor of Planning",
      institution: "School of Planning and Architecture, Vijayawada",
      period: "2021 – 2026",
      details: "Major in Urban Planning. Focus areas: GIS & spatial analysis, GeoAI, transport planning, and urban science studio. Specializing in data-driven planning methodologies.",
    },
    {
      degree: "High School",
      institution: "Gyanasthali High School, Patna",
      period: "2019 – 2021",
      details: "Completed senior secondary education with a rigorous focus on Physics, Chemistry, and Mathematics, while maintaining a creative practice in Painting and English literature.",
    },
  ];

  const experience = [
    {
      role: "Build For Bharat Fellowship",
      org: "Bharat Digital",
      period: "Jan 2026 – July 2026",
      type: "Fellowship",
      desc: "Working on digital public infrastructure for urban development, building open-source spatial tools for CUMTA - Chennai Unified Metropolitian Transport Authority, and scaling civic tech solutions for Indian cities.",
    },
    {
      role: "GIS Integration Intern",
      org: "City Future Lab, IIT Kharagpur",
      period: "May 2025 – July 2025",
      type: "Technical",
      desc: "Contributed to MoHUA-sponsored urban mobility platforms (Pubbs WebGIS, Cycle, and Bus). Developed a full-stack spatial data platform with CRUD functionality using PHP, Leaflet, and GeoPandas. Improved mobility analytics by enhancing bike-share rebalancing models (Python, Gurobi) and visualizing bus scheduling scenarios to support data-driven transit planning.",
    },
    {
      role: "Research Intern",
      org: "Open City (Oorvani Foundation)",
      period: "May 2025 – July 2025",
      type: "Research",
      desc: "Contributed to urban climate and heat vulnerability analysis, including LST mapping for Mumbai and UHI studies for Bengaluru and Hyderabad. Supported heat resilience research by mapping national Heat Wave Action Plans and developing technical guides for environmental mapping (LST, NDVI, NDBI) using Google Earth Engine (GEE).",
    },
    {
      role: "Urban Planning Intern",
      org: "Patna Municipal Corporation",
      period: "May 2024 – July 2024",
      type: "Technical",
      desc: "Assisted in municipal redevelopment projects, property record digitization, and public infrastructure planning for Patna's urban expansion.",
    },
  ];

  const skills = [
    {
      category: 'Geospatial & RS',
      items: ['QGIS, ArcGIS Pro', 'Remote sensing (Landsat, Sentinel-2)', 'Google Earth Engine', 'CARTO'],
    },
    {
      category: 'Programming & Data Science',
      items: ['Python (GeoPandas, Pandas, Scikit-learn)', 'TensorFlow', 'JavaScript (SvelteKit)', 'R (sf, ggplot2)'],
    },
    {
      category: 'Web & Visualization',
      items: ['Mapbox GL JS, MapLibre', 'Kepler.gl, Folium', 'D3.js', 'Data visualization'],
    },
    {
      category: 'AI & Automation',
      items: ['LLM Engineering', 'Agentic AI Systems', 'Custom AI Agents'],
    },
    {
      category: 'Databases',
      items: ['PostGIS · Spatial SQL', 'NoSQL & Vector DBs'],
    },
    {
      category: 'Planning Research',
      items: ['Urban governance & institutional analysis', 'Land use planning & zoning', 'Transport planning & mobility', 'Housing policy'],
    },
  ];

  const interests = [
    "Urban governance reform and 74th CAA implementation",
    "Spatial data infrastructure for ULBs",
    "Mobility systems and transit-oriented development",
    "Data-driven urban policy and civic technology",
    "Land governance in periurban transit corridors",
  ];

  const responsibilities = [
    {
      role: "Public Relation Secretary",
      org: "Student Council, SPA Vijayawada",
      period: "2025 – 2026",
      achievements: [
        "Organized National level Sports meet between 3 SPAs (Bhopal, Delhi & Vijayawada)",
        "Organized 'Inyan 2026' - Annual fest of School of Planning and Architecture",
        "Handled comprehensive Public Relation responsibilities and stakeholder engagement"
      ]
    },
    {
      role: "Club Coordinator",
      org: "Club iO - Tech Club, SPA Vijayawada",
      period: "2024 – 2025",
      achievements: [
        "Conducted and managed technical activities for 'Inyan 2025'",
        "Handled Club Finance responsibilities and budget allocation for tech events"
      ]
    }
  ];

  const awards = [
    {
      title: "HPAIR Conference Delegate",
      issuer: "Harvard Project for Asian & International Relations",
      period: "2024/25",
      desc: "Selected as one of the top 300 global delegates for the HPAIR Conference, engaging in high-level dialogue on urban resilience, international cooperation, and Asian-Pacific development."
    },
    {
      title: "Certificate of Distinction: GO4Youth Olympiad",
      issuer: "The Energy and Resources Institute (TERI)",
      period: "Apr 2024",
      desc: "Awarded for exceptional performance in the national environmental studies olympiad. Covered critical urban issues including sustainable development, climate warming, and legislative environmental acts."
    },
    {
      title: "Indian Olympiad Qualifier in Mathematics (IOQM)",
      issuer: "Mathematics Teachers' Association (India)",
      period: "Jan 2020",
      desc: "Ranked among the top 60 students in the North Bihar and Patna region. The IOQM is the initial qualifying tier for India's participation in the International Mathematical Olympiad (IMO)."
    }
  ];

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Bharat Oraon",
    "description": "Urban Planning Researcher and GIS Developer focusing on Indian cities.",
    "url": "https://bharatoraon.com/about",
    "jobTitle": "Urban Planning Researcher & GIS Developer",
    "gender": "male",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "School of Planning and Architecture, Vijayawada"
    },
    "worksFor": [
      { "@type": "Organization", "name": "Bharat Digital" },
      { "@type": "Organization", "name": "City Future Lab, IIT Kharagpur" },
      { "@type": "Organization", "name": "Oorvani Foundation (Open City)" }
    ],
    "knowsAbout": [
      "Urban Governance", "GIS", "Spatial Analysis", "GeoAI", "Transport Planning", "Agentic AI", "LLM Engineering"
    ]
  };
</script>

<SEO 
  title="About & Profile — Bharat Oraon"
  description="Professional profile of Bharat Oraon. Urban planning researcher and GIS developer specializing in data-driven planning methodologies and civic technology."
  jsonLd={aboutJsonLd}
/>

<!-- BIO HEADER -->
<section class="section-padding border-b border-border bg-white">
  <div class="container-narrow">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
      <!-- Image Column -->
      <div class="md:col-span-1">
        <div class="w-full aspect-[4/5] overflow-hidden bg-paper border border-border shadow-sm">
          <img src="/profile.jpeg" alt="Bharat Oraon Profile Photo" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
        </div>
        <div class="mt-6 space-y-3">
          <div class="flex items-center gap-2 text-xs text-ink-muted">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Vijayawada, India
          </div>
          <div class="flex items-center gap-2 text-xs text-ink-muted">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.247 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Bachelor of Planning (B.Plan)
          </div>
          <div class="flex items-center gap-2 text-xs text-ink-muted">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            School of Planning & Architecture, Vijayawada
          </div>
          <div class="flex items-center gap-2 text-xs text-ink-muted group/link">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.172 13.828a4 4 0 015.656 0l4-4a4 4 0 115.656 5.656l-1.101 1.101" />
            </svg>
            <a href="https://buildsoc.in/" target="_blank" rel="noopener" class="hover:text-ink transition-colors">
              Co-founder <span class="font-bold underline decoration-border group-hover/link:decoration-ink">BuildSoc</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Text Column -->
      <div class="md:col-span-2">
        <p class="text-xs uppercase tracking-widest text-ink-muted font-semibold mb-6">Profile</p>
        <h1 class="text-3xl md:text-5xl font-bold text-ink mb-2 tracking-tight">Bharat Oraon</h1>
        <p class="text-ink-muted mb-8 text-base font-medium">Urban Planning Researcher · GIS Developer · Civic Technology Fellow</p>
        
        <div class="space-y-6 text-sm text-ink-muted leading-relaxed max-w-2xl">
          <p>
            I am a final-year Bachelor of Planning student at the School of Planning and Architecture, Vijayawada, with a focus on urban governance, spatial intelligence, and civic technology for Indian cities.
          </p>
          <p>
            My work sits at the intersection of urban planning research and geospatial technology — combining GIS analysis, remote sensing, and spatial data infrastructure with policy research on governance reform, mobility systems, and land use planning.
          </p>
          <p>
            I am interested in how spatial data and civic technology can strengthen planning systems and urban governance in Indian cities — making planning more evidence-based, participatory, and responsive to the needs of all urban residents.
          </p>
        </div>

        <div class="mt-10 flex flex-wrap gap-4">
          <a href="/resume.pdf" download class="btn-primary inline-flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Full CV
          </a>
          <a href="/contact" class="btn-outline">Get in touch</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- EXPERIENCE & EDUCATION -->
<section class="section-padding border-b border-border bg-paper">
  <div class="container-narrow">
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-16">
      <!-- Left: Experience -->
      <div class="lg:col-span-3">
        <SectionHeader label="Career" title="Professional Experience" />
        <div class="relative mt-8">
          <div class="absolute left-0 top-2 bottom-2 w-px bg-border"></div>
          <div class="space-y-10 pl-8">
            {#each experience as exp}
              <div class="relative">
                <div class="absolute -left-[34px] top-1.5 w-3 h-3 border-2 border-ink bg-white rounded-full"></div>
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div>
                    <h3 class="text-base font-bold text-ink">{exp.role}</h3>
                    <p class="text-sm font-medium text-ink-muted">{exp.org}</p>
                  </div>
                  <div class="flex items-center gap-2 flex-shrink-0">
                    <span class="tag">{exp.type}</span>
                    <span class="text-xs font-mono text-ink-muted">{exp.period}</span>
                  </div>
                </div>
                <p class="text-sm text-ink-muted leading-relaxed">{exp.desc}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Right: Education -->
      <div class="lg:col-span-2">
        <SectionHeader label="Academic" title="Education" />
        <div class="mt-8 space-y-8">
          {#each education as edu}
            <div class="border-border border p-6 bg-white shadow-sm">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-sm font-bold text-ink uppercase tracking-tight">{edu.degree}</h3>
                <span class="text-xs font-mono text-ink-muted">{edu.period}</span>
              </div>
              <p class="text-xs font-semibold text-ink-muted mb-4">{edu.institution}</p>
              <p class="text-xs text-ink-muted leading-relaxed">
                {edu.details}
              </p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SKILLS GRID -->
<section class="section-padding border-b border-border bg-white">
  <div class="container-narrow">
    <SectionHeader label="Competencies" title="Technical Skills" />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-8">
      {#each skills as group}
        <div>
          <h3 class="text-xs uppercase tracking-widest text-ink font-bold mb-5 border-b border-border pb-2">{group.category}</h3>
          <ul class="space-y-2.5">
            {#each group.items as item}
              <li class="text-sm text-ink-muted flex items-start gap-3">
                <span class="w-1.5 h-1.5 bg-ink/20 rounded-full mt-1.5 flex-shrink-0"></span>
                {item}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- POSITIONS OF RESPONSIBILITY -->
<section class="section-padding border-b border-border bg-paper">
  <div class="container-narrow">
    <SectionHeader label="Leadership" title="Positions of Responsibility" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {#each responsibilities as res}
        <div class="border border-border p-6 bg-white hover:border-ink transition-colors">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-base font-bold text-ink">{res.role}</h3>
              <p class="text-xs font-medium text-ink-muted">{res.org}</p>
            </div>
            <span class="text-xs font-mono text-ink-muted whitespace-nowrap ml-4">{res.period}</span>
          </div>
          <ul class="space-y-3">
            {#each res.achievements as achievement}
              <li class="text-sm text-ink-muted flex items-start gap-3">
                <span class="w-1.5 h-1.5 bg-ink/20 rounded-full mt-1.5 flex-shrink-0"></span>
                {achievement}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ACHIEVEMENTS & AWARDS -->
<section class="section-padding border-b border-border bg-white">
  <div class="container-narrow">
    <SectionHeader label="Recognition" title="Achievements & Awards" />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {#each awards as award}
        <div class="bg-paper border border-border p-6 shadow-sm hover:shadow-md transition-all flex flex-col">
          <div class="mb-4">
            <span class="text-[10px] uppercase tracking-widest font-mono text-ink-muted">{award.period}</span>
            <h3 class="text-sm font-bold text-ink mt-1 leading-tight">{award.title}</h3>
            <p class="text-[11px] font-semibold text-accent-dark mt-1">{award.issuer}</p>
          </div>
          <p class="text-xs text-ink-muted leading-relaxed">
            {award.desc}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- RESEARCH INTERESTS -->
<section class="section-padding bg-paper">
  <div class="container-narrow">
    <SectionHeader label="Focus" title="Research Interests" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      {#each interests as interest}
        <div class="bg-white border border-border p-5 hover:border-ink transition-colors group">
          <div class="flex items-center gap-4">
            <div class="w-2 h-2 bg-ink/10 rounded-full group-hover:bg-ink transition-colors"></div>
            <p class="text-sm text-ink-muted font-medium">{interest}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
