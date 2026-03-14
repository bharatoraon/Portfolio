<script>
  export let title = "Bharat Oraon — Urban Planning & GIS";
  export let description = "Portfolio of Bharat Oraon, an Urban Planning Researcher and GIS Developer specializing in civic technology, mobility analytics, and spatial data infrastructure.";
  export let type = "website";
  export let image = "/og-image.png"; // Fallback to a default OG image if exists
  export let canonical = "https://bharatoraon.com"; // Default to root
  export let jsonLd = null;

  const siteName = "Bharat Oraon";
  const twitterHandle = "@bharatoraon"; // Assuming this based on common patterns
</script>

<svelte:head>
  <!-- Basic Meta -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />

  <!-- OpenGraph -->
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content={type} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={image} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={twitterHandle} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  <!-- Structured Data for LLMs and Search Engines -->
  {#if jsonLd}
    <script type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </script>
  {:else}
    <!-- Default Person Schema for the site -->
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Bharat Oraon",
        "url": "https://bharatoraon.com",
        "jobTitle": "Urban Planning Researcher & GIS Developer",
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "School of Planning and Architecture, Vijayawada"
        },
        "knowsAbout": [
          "Urban Planning",
          "Geospatial Information Systems (GIS)",
          "Civic Technology",
          "Mobility Analytics",
          "Spatial Data Science",
          "Agentic AI",
          "LLM Engineering"
        ],
        "sameAs": [
          "https://linkedin.com/in/bharatoraon",
          "https://github.com/bharatoraon"
        ]
      })}
    </script>
  {/if}
</svelte:head>
