<script lang="ts">
  import Blank from "./../icons/Blank.svelte";
  import "./style.css";
  export let className: string = ""
  export let label = "";
  export let placeholder = "Placeholder";
  export let type = "text";
  export let Icon: typeof Blank | null = null;
  export let icon_position: "left" | "right" = "left";
  export let maxlength = 32;
  export let getText = (val: string) => {
    val;
  };
  export let show_border = false;
  let value = "";
  let backup_value = "";
  $: password_visible = false;

  function handleText(e: any) {
    getText(e.target.value);
    show_border = true;
    setTimeout(() => {}, 2000);
    show_border = false;
  }
</script>

<div class="relative">
  <input
    style=""
    {type}
    on:input={(e) => {
      handleText(e);
    }}
    name={label}
    id={label}
    {maxlength}
    class="outline-none input p-6 {Icon && "px-16"} py-4 transition-all bg-transparent  text-[#36453b] font-medium placeholder:text-[#36453b] placeholder:font-medium border-b-2 border-[#36453b] {className}"
    {placeholder}
    required={true}
  />

  {#if Icon}
    <div class="absolute top-[50%] translate-y-[-50%] text-white {icon_position === "left" ? "left-5": "right-5"}">
      <Icon className="text-[#36453b] text-3xl" />
    </div>
  {/if}
</div>
