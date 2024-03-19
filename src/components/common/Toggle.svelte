<script>
  export let status = 0;
  export let get_status = () => status;
</script>

<button
  style={status ? "justify-content: flex-end" : ""}
  type="button"
  on:click={() => {
    status = status === 0 ? 1 : 0;
    get_status(status)
  }}
  class="bg-gray-500 flex w-10 transition-all rounded-xl"
>
  <div class="bg-black transition-all h-5 w-5 rounded-xl"></div>
</button>
