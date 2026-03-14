<script>
  import SEO from '$lib/components/SEO.svelte';
  let name = '';
  let email = '';
  let subject = '';
  let message = '';
  let submitted = false;

  function handleSubmit(e) {
    e.preventDefault();
    // Basic form handling — connect to a form service like Formspree in production
    submitted = true;
  }
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Bharat Oraon",
    "url": "https://bharatoraon.com/contact",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "work@bharatoraon.com",
      "contactType": "professional",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://linkedin.com/in/bharatoraon",
      "https://github.com/bharatoraon"
    ]
  };
</script>

<SEO 
  title="Contact — Bharat Oraon"
  description="Get in touch with Bharat Oraon for research collaborations, GIS consulting, and urban planning fellowship opportunities."
  jsonLd={contactJsonLd}
/>

<!-- Header -->
<section class="section-padding border-b border-border bg-white">
  <div class="container-narrow">
    <p class="text-xs uppercase tracking-widest text-ink-muted font-semibold mb-4">Contact</p>
    <h1 class="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">Get in Touch</h1>
    <p class="text-base text-ink-muted max-w-xl leading-relaxed">
      Open to research collaborations, GIS consulting, and urban planning fellowship opportunities.
    </p>
  </div>
</section>

<!-- Contact Content -->
<section class="section-padding">
  <div class="container-narrow">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
      <!-- Left: Direct contact -->
      <div>
        <h2 class="text-xs uppercase tracking-widest text-ink-muted font-semibold mb-6">Direct Contact</h2>
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 border border-border flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-xs uppercase tracking-widest text-ink-muted font-medium mb-1">Email</p>
              <a href="mailto:work@bharatoraon.com" class="text-sm text-ink hover:text-accent transition-colors">
                work@bharatoraon.com
              </a>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-8 h-8 border border-border flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-ink-muted" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </div>
            <div>
              <p class="text-xs uppercase tracking-widest text-ink-muted font-medium mb-1">LinkedIn</p>
              <a href="https://linkedin.com/in/bharatoraon" target="_blank" rel="noopener" class="text-sm text-ink hover:text-accent transition-colors">
                linkedin.com/in/bharatoraon
              </a>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-8 h-8 border border-border flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-ink-muted" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
            </div>
            <div>
              <p class="text-xs uppercase tracking-widest text-ink-muted font-medium mb-1">GitHub</p>
              <a href="https://github.com/bharatoraon" target="_blank" rel="noopener" class="text-sm text-ink hover:text-accent transition-colors">
                github.com/bharatoraon
              </a>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-8 h-8 border border-border flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="text-xs uppercase tracking-widest text-ink-muted font-medium mb-1">Location</p>
              <p class="text-sm text-ink-muted">Vijayawada, Andhra Pradesh, India</p>
            </div>
          </div>
        </div>

        <div class="mt-10 p-6 bg-paper-warm border border-border">
          <p class="text-xs uppercase tracking-widest text-ink-muted font-semibold mb-2">Currently open to</p>
          <ul class="space-y-1.5">
            {#each ['Research collaborations', 'GIS analysis projects', 'Urban planning consulting', 'Fellowship opportunities', 'Academic partnerships'] as item}
              <li class="text-sm text-ink-muted flex items-center gap-2">
                <span class="w-1 h-1 bg-ink-muted rounded-full flex-shrink-0"></span>
                {item}
              </li>
            {/each}
          </ul>
        </div>
      </div>

      <!-- Right: Contact form -->
      <div>
        <h2 class="text-xs uppercase tracking-widest text-ink-muted font-semibold mb-6">Send a Message</h2>

        {#if submitted}
          <div class="p-6 bg-paper-warm border border-border text-center">
            <svg class="w-8 h-8 text-ink mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm font-semibold text-ink mb-1">Message sent</p>
            <p class="text-xs text-ink-muted">Thank you for reaching out. I'll get back to you shortly.</p>
          </div>
        {:else}
          <form on:submit={handleSubmit} class="space-y-4">
            <div>
              <label for="name" class="block text-xs uppercase tracking-widest text-ink-muted font-medium mb-1.5">Name</label>
              <input
                id="name"
                type="text"
                bind:value={name}
                required
                class="w-full border border-border bg-white px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label for="email" class="block text-xs uppercase tracking-widest text-ink-muted font-medium mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                bind:value={email}
                required
                class="w-full border border-border bg-white px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label for="subject" class="block text-xs uppercase tracking-widest text-ink-muted font-medium mb-1.5">Subject</label>
              <input
                id="subject"
                type="text"
                bind:value={subject}
                required
                class="w-full border border-border bg-white px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink transition-colors"
                placeholder="Research collaboration / GIS project / ..."
              />
            </div>
            <div>
              <label for="message" class="block text-xs uppercase tracking-widest text-ink-muted font-medium mb-1.5">Message</label>
              <textarea
                id="message"
                bind:value={message}
                required
                rows="5"
                class="w-full border border-border bg-white px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink transition-colors resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button type="submit" class="btn-primary w-full justify-center">
              Send Message
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        {/if}
      </div>
    </div>
  </div>
</section>
