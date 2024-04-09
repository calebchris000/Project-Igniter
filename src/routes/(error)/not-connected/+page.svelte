<script>
  import LinkBroken from '../../../components/icons/LinkBroken.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  const last_route = localStorage.getItem("last_route") ?? "/not";
</script>

<section
  class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
>
<div>
  <LinkBroken _class="text-gray-800" />
</div>
  <div class="text-center">
    <h1 class="text-6xl font-bold text-gray-800">No Internet</h1>
    <p class="text-2xl text-gray-600">You are not connected to the internet.</p>
    <p class="mt-4 text-gray-500">
      This page will reload when you connect back to the internet
    </p>

  </div>
</section>
