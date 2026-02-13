<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} Error - GMMCCK</title>
</svelte:head>

<div class="hero">
  <div class="hero-content ">
    <div class="mwmd">
      <h1>{$page.status} Error</h1>
      <p>
        The page you are looking for either doesn't exists or causing a error.
      </p>
      <a class="btn btn-primary" href="/">Back to Home</a>
    </div>
  </div>
</div>

<!-- TAILWIND CSS CLASSES DOESNT WORK ON THIS PAGE -->
<style lang="postcss">
  @reference 'tailwindcss';
  .hero { @apply min-h-[calc(100vh-180px)]; }
  .hero-content { @apply text-center; }
  .mwmd { @apply max-w-md; }
  h1 { @apply text-5xl font-bold; }
  p { @apply py-6; }
</style>