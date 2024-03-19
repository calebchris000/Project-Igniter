<script lang="ts">
  import { onDestroy } from "svelte";
  import { store } from "../index";
  import Cancel from "./Cancel.svelte";
  import Error from "./Error.svelte";
  import Info from "./Info.svelte";
  import Success from "./Success.svelte";

  $: title = $store.notification.title;
  $: message = $store.notification.message;
  $: status = $store.notification.status;
  $: timeout = $store.notification.timeout;
  export let cancel: boolean = true;
  $: show = $store.notification.show;

  let timeout_id = null;

  $: if (show) {
    timeout_id = setTimeout(() => {
      store.update((curr) => {
        curr.notification.show = false;
        curr.notification.title = "";
        curr.notification.message = "";
        return curr;
      });
    }, timeout);
  }

  onDestroy(() => {
    clearTimeout(timeout_id);
  });
</script>

<section
  style={show ? "top: 2.5rem;" : "top: -8rem"}
  class="fixed {status === 'success'
    ? 'bg-green-500'
    : status === 'error'
      ? 'bg-red-500'
      : status === 'info'
        ? 'bg-blue-500'
        : ''} z-50 px-4 left-[50%] transition-all select-none flex items-center gap-3 translate-x-[-50%] w-[26rem] text-white py-4 rounded-md"
>
  {#if cancel}
    <Cancel
      click={() => {
        store.update((curr) => {
          curr.notification.show = false;
          return curr;
        });
        clearTimeout(timeout_id)
      }}
    />
  {/if}
  <div class="w-fit flex justify-center m-0 p-0">
    {#if status === "info"}
      <Info />
    {:else if status === "success"}
      <Success />
    {:else}
      <Error />
    {/if}
  </div>
  <div>
    <p class="text-lg font-medium">{title}</p>
    <p class="text-lg">{message}</p>
  </div>
</section>
