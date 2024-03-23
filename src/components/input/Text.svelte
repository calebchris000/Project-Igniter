<script>
  import "./style.css";
  export let label = "";
  export let placeholder = "Placeholder";
  export let type = "text";
  export let maxlength = 32;
  export let getText = () => {};
  export let show_border = false;
  export let border_color = "rgb(239 68 68)";

  function handleText(e) {
    getText(e.target.value);
    show_border = true;
    setTimeout(() => {}, 2000);
    show_border = false;
  }
</script>

<input
  style=""
  {type}
  on:input={(e) => {
    handleText(e);
  }}
  name={label}
  id={label}
  {maxlength}
  class="outline-none input p-2 py-4 bg-transparent border-2 border-[#515751] transition-all rounded-sm text-[#515751] placeholder:text-[#515751] placeholder:font-normal"
  {placeholder}
/>
