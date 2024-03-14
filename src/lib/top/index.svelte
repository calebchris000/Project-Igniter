<script>
  import "./index.css";
  export let full_name = "User";
  export let show_cancel = false;
  export let on_close = () => {};
</script>

<nav class="flex items-center justify-between">
  <p class="name text-5xl font-normal">{full_name}</p>
</nav>
