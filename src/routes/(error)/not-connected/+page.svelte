<script>
  /** @type {import('./$types').PageData} */
  export let data;

  const last_route = localStorage.getItem("last_route") ?? "/not";
</script>

<section
  class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
>
  <div class="text-center">
    <h1 class="text-6xl font-bold text-gray-800">No Internet</h1>
    <p class="text-2xl text-gray-600">You are not connected to the internet.</p>
    <p class="mt-4 text-gray-500">
      Please check your connection and try again.
    </p>
    <button
      class="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      on:click={() => window.location.reload()}
    >
      Try Again
    </button>
  </div>
</section>
