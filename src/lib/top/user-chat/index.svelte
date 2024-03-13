<script>
  import { goto } from "$app/navigation";

  export let image = "";
  export let name = "User";
  export let status = "Away";
  export let last_active = "";
</script>

<section class="flex items-center gap-5">
  <div class="w-16 overflow-hidden rounded-full">
    {#if image}
      <img src={image} alt="" />
    {:else}
      <svg
        class="text-5xl"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 48 48"
      >
        <g fill="currentColor">
          <path d="M32 20a8 8 0 1 1-16 0a8 8 0 0 1 16 0" />
          <path
            fill-rule="evenodd"
            d="M23.184 43.984C12.517 43.556 4 34.772 4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20a21.253 21.253 0 0 1-.274 0c-.181 0-.362-.006-.542-.016M11.166 36.62a3.028 3.028 0 0 1 2.523-4.005c7.796-.863 12.874-.785 20.632.018a2.99 2.99 0 0 1 2.498 4.002A17.942 17.942 0 0 0 42 24c0-9.941-8.059-18-18-18S6 14.059 6 24c0 4.916 1.971 9.373 5.166 12.621"
            clip-rule="evenodd"
          />
        </g>
      </svg>
    {/if}
  </div>
  <div class="cursor-pointer">
    <p class="font-medium">{name}</p>
    <p class="text-sm text-gray-500 font-medium select-none">
      {status}
    </p>
  </div>
  <button on:click={() => goto("/home")} class="ms-auto bg-transparent">
    <svg
      class="text-4xl"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      ><path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
      /></svg
    >
  </button>
</section>
