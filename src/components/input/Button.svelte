<script>
  import "./style.css";
  export let className = "";
</script>

<button class="rounded-[3rem] bg-[#36453b] text-[#f5f9e9] font-normal but w-fit py-3 px-10 {className}">
  <slot />
</button>
