<script>
  import { goto } from "$app/navigation";

  export let image = "";
  export let name = "User";
  export let is_active = false;
  export let last_active = "";
</script>

<section class="flex items-center gap-5">
  <div class="w-16 overflow-hidden rounded-full">
    <img src={image} alt="" />
  </div>
  <div class="cursor-pointer">
    <p class="font-medium">{name}</p>
    <p class="text-sm text-gray-500 font-medium select-none">
      {is_active ? "Active Now" : last_active}
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
