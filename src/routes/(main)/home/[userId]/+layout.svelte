<script>
  /** @type {import('./$types').LayoutData} */
  export let data;


  $: if (data?.status === 401) {
    window.location.replace("/login");
  }
</script>

<section>
  <slot />
</section>
