<script>
  export let click = (b) => {b};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg
  on:click={() => click()}
  tabindex="0"
  class="text-2xl absolute right-2 top-2"
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  role="button"
  height="1em"
  viewBox="0 0 24 24"
>
  <path
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="1.5"
    d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
  />
</svg>
