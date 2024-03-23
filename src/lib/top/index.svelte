<script>
  import "./index.css";
  export let full_name = "User";
  export let show_cancel = false;
  export let on_close = () => {};

  $: if (full_name.length >= 32) {
    full_name = full_name.slice(0, 32);
  }
</script>

<nav class="flex items-center justify-between">
  <p class="name text-3xl font-medium select-none transition-all">
    {full_name}
  </p>
</nav>
