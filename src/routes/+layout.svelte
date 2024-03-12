<script>
  import "../app.css";

  /** @type {import('./$types').LayoutData} */
  export let data;
</script>

<main class="h-screen bg-gray-200 relative p-6 max-w-[30rem] mx-auto">
  <slot />
</main>
