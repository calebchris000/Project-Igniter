<script>
  import { invalidate, invalidateAll, goto } from "$app/navigation";
  import Preview from "../../../lib/chat-preview/index.svelte";
  import NavBar from "../../../lib/top/index.svelte";
  import { parseCookie } from "../../../core/utils/index";
  import { initializeConnection, socket } from "../../../core/chat-core/index";
  import moment from "moment";
  import { onDestroy } from "svelte";
  /** @type {import('./$types').PageData} */
  export let data;

  const params = data.params;
  const all_users = params.all_users.data.filter(
    (u) => u._id !== params.userId
  );

  let search = "";
  const _data = typeof window !== "undefined" ? parseCookie("user") : "";

  $: users = data.data
    ?.map((u) => {
      return {
        name: u.fullName,
        _id: u._id,
        image: u.profileImg ?? "",
        preview: u.lastMessage.content ?? "",
        read: u.lastMessage.read,
        message_time: moment(u.lastMessage.date).format("HH:mm A"),
        unread: Number(u.unread),
        status: u.status,
      };
    })
    .filter((u) => u._id !== _data._id);
  const full_name = _data.fullName;

  socket.emit("update_status", {
    id: params.userId,
    status: "active",
    lastActive: "now",
  });

  socket.on("user_disconnected", () => {
    invalidate("api:users");
  });
  socket.on("new_user", () => {
    invalidate("api:users");
  });
  socket.on("new_message", () => {
    invalidate("api:users");
  });

  onDestroy(() => {
    socket.off("new_user");
    socket.off("new_message");
    socket.off("user_disconnected");
  });

  let open_modal = false;
</script>

<main class="p-10 flex flex-col gap-14">
  <NavBar {full_name} />
  <div class="body flex flex-col gap-10">
    <div>
      <input
        bind:value={search}
        placeholder="Search"
        class="bg-transparent placeholder:text-black placeholder:text-3xl focus:placeholder:text-lg placeholder:transition-all h-14 placeholder:opacity-70 transition-all focus:border-opacity-100 border-opacity-30 border-b border-black outline-none w-full"
        type="text"
      />
    </div>

    <div class="flex flex-col gap-4">
      {#if users.length}
        {#each users as { image, unread, _id: id, name, status, preview, read, message_time }}
          <Preview
            {image}
            {unread}
            {name}
            {status}
            {id}
            {preview}
            {read}
            {message_time}
          />
        {/each}
      {:else}
        <p>No recent chats. Start by clicking on the "+" button.</p>
      {/if}
    </div>
  </div>

  {#if open_modal}
    <div
      class="absolute flex flex-col gap-16 inset-0 p-16 w-full h-full bg-gray-300 z-50"
    >
      <NavBar
        full_name="Start Chat"
        show_cancel="false"
        on_close={(b) => (open_modal = !b)}
      />

      <section class="all_users flex flex-col gap-2">
        {#each all_users as each_user}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-interactive-supports-focus -->
          <div
            class="py-2 flex items-center gap-4 border"
            role="button"
            on:click={() => goto(`/home/${each_user._id}`)}
          >
            <div class="w-16 rounded-full bg-gray-700 h-16"></div>
            <div>
              <p class="text-lg font-medium text-gray-800">
                {each_user.fullName}
              </p>
              <p class="">Blessed</p>
            </div>
          </div>
        {/each}
      </section>
    </div>
  {/if}
  <button
    style={open_modal ? "transform: rotate(45deg)" : ""}
    on:click={() => {
      open_modal = !open_modal;
    }}
    class="bg-gray-500 transition-all ease-in z-50 text-white h-16 w-16 rounded-2xl flex items-center justify-center text-4xl absolute bottom-14 right-14"
  >
    +
  </button>
</main>
