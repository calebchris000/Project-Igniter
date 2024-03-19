<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Profile from "../../../components/icons/Profile.svelte";
  export let image = "";
  export let name = "User";
  export let status = "Away";
  export let typing = false;
  export let last_active = "";
  export let clicked = () => {};

  $: image_load = false;

  onMount(() => {
    const img = new Image();
    img.src = image;

    img.onload = () => {
      image_load = true;
    };
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<section
  class="flex items-center gap-5"
  role="button"
  on:click={clicked}
  tabindex="0"
>
  <div class="w-16 overflow-hidden rounded-full">
    {#if image_load}
      <img src={image} alt="" />
    {:else}
      <Profile />
    {/if}
  </div>
  <div class="cursor-pointer">
    <p class="font-medium">{name}</p>

    <div class="flex items-center gap-3">
      <p class="text-sm text-blue-500 font-medium select-none">
        {status}
      </p>
      <p
        style={typing ? "opacity: 1" : "opacity: 0"}
        class="text-sm transition-all duration-75 text-blue-500 font-medium select-none"
      >
        Typing...
      </p>
    </div>
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
