<script>
  import moment from "moment";
  export let image = "";
  export let name = "User";
  export let preview = "";
  export let read = true;
  export let message_time = moment().subtract("30", "minutes").format("HH:mm");
</script>

<section
  class="flex items-center gap-4 cursor-pointer hover:bg-gray-100 py-2 rounded-md transition-all duration-75"
  role="button"
>
  <div class="w-16 rounded-full overflow-hidden">
    <img src={image} alt="" class="w-full" />
  </div>

  <div>
    <p class="text-xl">{name}</p>
    <p
      class="text-lg text-gray-600"
      style={read ? "font-weight: 400;" : "font-weight: 600"}
    >
      {preview.length > 25 ? preview.slice(0, 25) + "..." : preview}
    </p>
  </div>

  <div class="ms-auto">
    <p>{message_time}</p>
  </div>
</section>
