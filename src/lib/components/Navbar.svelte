<script>
  import { page } from '$app/stores';

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/research', label: 'Research' },
    { href: '/maps', label: 'Maps' },
    { href: '/contact', label: 'Contact' },
  ];

  let mobileOpen = false;
</script>

<nav class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
  <div class="container-wide">
    <div class="flex items-center justify-between h-16">
      <!-- Logo / Name -->
      <a href="/" class="group flex items-center gap-2">
        <span class="text-xl signature font-bold text-accent-dark sm:block pt-1 transition-all duration-500 group-hover:text-accent animate-signature"> -- Hii Welcome!! - </span>
      </a>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-8">
        {#each navLinks as link}
          <a
            href={link.href}
            class="text-sm tracking-wide transition-colors duration-200 {$page.url.pathname === link.href
              ? 'text-ink font-semibold border-b-2 border-ink pb-0.5'
              : 'text-ink-muted hover:text-ink'}"
          >
            {link.label}
          </a>
        {/each}
      </div>

      <!-- Mobile menu toggle -->
      <button
        class="md:hidden p-2 text-ink"
        on:click={() => (mobileOpen = !mobileOpen)}
        aria-label="Toggle menu"
      >
        {#if mobileOpen}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        {/if}
      </button>
    </div>

    <!-- Mobile menu -->
    {#if mobileOpen}
      <div class="md:hidden border-t border-border py-4 flex flex-col gap-1">
        {#each navLinks as link}
          <a
            href={link.href}
            class="px-0 py-2 text-sm tracking-wide transition-colors {$page.url.pathname === link.href
              ? 'text-ink font-semibold'
              : 'text-ink-muted hover:text-ink'}"
            on:click={() => (mobileOpen = false)}
          >
            {link.label}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</nav>

<style>
  .animate-signature {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    border-right: 3px solid theme('colors.ink.DEFAULT');
    width: 0;
    animation: 
      typing 4s steps(19, end) infinite alternate,
      blink 0.75s step-end infinite;
  }

  @keyframes typing {
    0%, 20% { width: 0 }
    80%, 100% { width: 100% }
  }

  @keyframes blink {
    from, to { border-color: transparent }
    50% { border-color: theme('colors.ink.DEFAULT') }
  }
</style>
