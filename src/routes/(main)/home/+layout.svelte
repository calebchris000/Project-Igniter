<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { parseCookie } from "../../../core/utils";

  /** @type {import('./$types').LayoutData} */
  export let data;

  $: if (typeof window !== "undefined" && !parseCookie("token")) {
    goto("/login");
  }


</script>

<section>
  <slot />
</section>
