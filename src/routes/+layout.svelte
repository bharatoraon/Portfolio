<script>
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO />

<div class="min-h-screen flex flex-col bg-paper">
  <Navbar />
  <main class="flex-1 pt-16">
    <slot />
  </main>
  <Footer />
</div>
