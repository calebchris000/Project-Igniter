<script>
  import moment from "moment";
  import { goto } from "$app/navigation";
  export let image = "";
  export let name = "User";
  export let id = "123";
  export let preview = "";
  export let unread = 0;
  export let read = true;
  export let message_time = moment().subtract("30", "minutes").format("HH:mm");
</script>

<section
  on:keydown={() => goto(`/home/${id}`)}
  on:click={() => goto(`/home/${id}`)}
  tabindex={1}
  class="flex items-center gap-4 cursor-pointer hover:bg-gray-100 py-2 rounded-md transition-all duration-75"
  role="button"
>
  <div class="relative">
    <div class="w-16 rounded-full overflow-hidden">
      {#if image}
        <img src={image} alt="" class="w-full" />
      {:else}
        <svg
        class="text-5xl text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 48 48"
        >
          <g fill="currentColor">
            <path d="M32 20a8 8 0 1 1-16 0a8 8 0 0 1 16 0" />
            <path
              fill-rule="evenodd"
              d="M23.184 43.984C12.517 43.556 4 34.772 4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20a21.253 21.253 0 0 1-.274 0c-.181 0-.362-.006-.542-.016M11.166 36.62a3.028 3.028 0 0 1 2.523-4.005c7.796-.863 12.874-.785 20.632.018a2.99 2.99 0 0 1 2.498 4.002A17.942 17.942 0 0 0 42 24c0-9.941-8.059-18-18-18S6 14.059 6 24c0 4.916 1.971 9.373 5.166 12.621"
              clip-rule="evenodd"
            />
          </g>
        </svg>
      {/if}
    </div>
    {#if unread}
      <i
        class="absolute top-0 right-0 z-30 not-italic rounded-full w-6 h-6 flex justify-center items-center bg-red-500 text-white"
        >{unread}</i
      >
    {/if}
  </div>

  <div>
    <p class="text-lg font-medium text-gray-800">{name}</p>
    <p
      class="text-sm text-gray-600"
      style={read ? "font-weight: 400;" : "font-weight: 600"}
    >
      {preview.length > 25 ? preview.slice(0, 25) + "..." : preview}
    </p>
  </div>

  <div class="ms-auto">
    <p>{message_time}</p>
  </div>
</section>
