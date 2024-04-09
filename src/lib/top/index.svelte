<script>
  import Search from "../../components/icons/Search.svelte";
  import Text from "../../components/input/Text.svelte";
  export let full_name = "User";
  export let getText = () => {};
  export let on_close = () => {};

  $: if (full_name.length >= 32) {
    full_name = full_name.slice(0, 32);
  }
</script>

<nav class="flex items-center justify-between gap-5 transition-all">
  <p class="text-3xl text-nowrap font-medium select-none transition-all">
    {full_name}
  </p>
</nav>
