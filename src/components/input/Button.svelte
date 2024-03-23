<script>
  import "./style.css";
  export let className = "";
</script>

<button class="rounded-sm border-[#36453b] text-[#36453b] border-2 font-normal but w-fit py-3 px-10 {className}">
  <slot />
</button>
