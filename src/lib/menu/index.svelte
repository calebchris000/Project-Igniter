<script>
  export let options = [];
  export let message_id = "";
  export let x = 0;
  export let y = 0;
  export let show_context_menu = false;
  export let handle_click = () => {};
</script>

<section
  class="fixed w-fit z-50 flex flex-col transition-opacity rounded-lg bg-blue-300"
  style="left: {x - 70}px; top: {y}px; opacity: {show_context_menu
    ? '1'
    : '0'}; {show_context_menu ? 'user-select: all' : 'user-select: none'}"
>
  {#each options as option, i}
    {#if options.length !== i + 1}
      <button
        on:click={() => {
          handle_click({ option, message_id });
        }}
        id={i}
        class="border-b text-sm p-2 px-10 border-gray-500"
      >
        {option}
      </button>
    {:else}
      <button id={i} class=" rounded-lg text-sm p-2 px-10 border-gray-500;"
        >{option}</button
      >
    {/if}
  {/each}
</section>
